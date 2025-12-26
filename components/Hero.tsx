import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { Mail, MessageCircle, Play } from 'lucide-react';
import { LiquidButton } from './ui/LiquidButton';

// Images for the Marquee - STRICTLY VAMELA ASSETS
const HERO_IMAGES = [
  "https://i.postimg.cc/MKfgVYQk/html.png",
  "https://i.postimg.cc/mDKysVKh/ssss.png",
  "https://i.postimg.cc/MKfgVYQk/html.png",
  "https://i.postimg.cc/mDKysVKh/ssss.png",
  "https://i.postimg.cc/MKfgVYQk/html.png",
  "https://i.postimg.cc/mDKysVKh/ssss.png",
  "https://i.postimg.cc/MKfgVYQk/html.png",
  "https://i.postimg.cc/mDKysVKh/ssss.png",
];

interface HeroProps {
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact }) => {
  
  const FADE_IN_VARIANTS = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: "spring", stiffness: 100, damping: 20 } },
  };

  // Mouse Tracking Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const maskImage = useMotionTemplate`radial-gradient(350px circle at ${mouseXSpring}px ${mouseYSpring}px, black, transparent)`;
  const duplicatedImages = [...HERO_IMAGES, ...HERO_IMAGES, ...HERO_IMAGES]; // Tripled for smoother loop

  return (
    <header 
        className="relative w-full h-screen overflow-hidden bg-[#020204] flex flex-col items-center justify-center text-center px-4 group"
        onMouseMove={handleMouseMove}
    >
       
       {/* Background Effects */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[700px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(255,245,235,0.1),transparent_70%)] blur-[80px] pointer-events-none z-0 mix-blend-screen" />

       {/* Grid Effect - Hidden on mobile to save GPU */}
       <motion.div
            className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100 will-change-[mask-image] hidden md:block"
            style={{ 
                maskImage,
                WebkitMaskImage: maskImage,
                backgroundImage: `
                    linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px'
            }}
       />
       
       <div className="z-20 flex flex-col items-center max-w-5xl mb-24 md:mb-12 w-full">
          
          <motion.div
             initial="hidden"
             animate="show"
             variants={FADE_IN_VARIANTS}
             className="mb-6 md:mb-8"
          >
             <img 
                src="https://i.postimg.cc/MKfgVYQk/html.png" 
                alt="VAMELA Logo - Webdesign & Branding" 
                className="w-40 md:w-56 lg:w-80 h-auto object-contain drop-shadow-[0_0_40px_rgba(255,255,255,0.1)]"
            />
          </motion.div>

          {/* Tagline */}
          <motion.div 
            initial="hidden"
            animate="show"
            variants={FADE_IN_VARIANTS}
            className="mb-4 md:mb-6 inline-flex items-center gap-2 px-3 py-1.5 md:px-4 rounded-full bg-white/5 border border-white/10 text-orange-400 text-xs md:text-sm font-medium tracking-wide"
          >
             <span className="flex h-2 w-2 rounded-full bg-orange-400 animate-pulse shadow-[0_0_10px_rgb(251,146,60)]"></span>
             Webdesign <span className="font-signature text-lg leading-none mx-1 text-orange-400">&</span> Grafikdesign
          </motion.div>

          {/* Title - Responsive Font Sizes */}
           <motion.h1
            initial="hidden"
            animate="show"
            variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.15 } },
            }}
            className="text-4xl md:text-7xl lg:text-8xl tracking-tight leading-[1.1] w-full"
            >
             <motion.span 
                variants={FADE_IN_VARIANTS} 
                className="block text-white font-sans font-bold mb-2"
             >
                Websites <span className="font-signature text-4xl md:text-5xl lg:text-6xl text-orange-400 font-normal px-2 align-middle relative -top-1">&</span> Logos,
             </motion.span>
             
             <motion.span 
                variants={FADE_IN_VARIANTS} 
                className="block font-signature text-5xl md:text-6xl lg:text-8xl text-orange-400 drop-shadow-[0_0_15px_rgba(251,146,60,0.3)] p-1"
             >
                die im Kopf bleiben.
             </motion.span>
           </motion.h1>

          {/* Description */}
          <motion.p
            initial="hidden"
            animate="show"
            variants={FADE_IN_VARIANTS}
            transition={{ delay: 0.5 }}
            className="mt-6 max-w-2xl text-base md:text-lg text-white/60 leading-relaxed font-sans px-4"
          >
            Dein Partner für digitalen Erfolg und visuelle Identität. 
            Ich erstelle professionelle Websites, einzigartige Logos und Grafiken, die dein Business unverwechselbar machen.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="show"
            variants={FADE_IN_VARIANTS}
            transition={{ delay: 0.7 }}
            className="mt-10 flex flex-col w-full px-8 md:w-auto md:flex-row items-center gap-4 font-sans"
          >
            <LiquidButton 
                onClick={onOpenContact}
                variant="primary"
                className="w-full md:w-auto cursor-pointer"
            >
                Angebot anfordern
            </LiquidButton>

             {/* Keeping WhatsApp as secondary option */}
            <LiquidButton 
                href="https://wa.me/4917624200179" 
                variant="glass"
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full md:w-auto"
            >
                <MessageCircle className="w-5 h-5 fill-current" /> WhatsApp
            </LiquidButton>
          </motion.div>
       </div>

       {/* Marquee at Bottom */}
       <div className="absolute bottom-0 left-0 w-full h-32 md:h-56 z-10 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_100%)] pointer-events-none">
        <motion.div
          className="flex gap-4 md:gap-6 pl-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 60, repeat: Infinity }}
          style={{ width: "max-content" }}
        >
             {duplicatedImages.map((src, index) => (
            <div
              key={index}
              className="relative aspect-[4/3] h-24 md:h-44 flex-shrink-0 opacity-40 transition-all duration-500 pointer-events-auto bg-white/5 border border-white/5 rounded-xl p-4 md:p-8"
              style={{ rotate: `${index % 2 === 0 ? -2 : 2}deg` }}
            >
              <img
                src={src}
                alt={`VAMELA Brand Asset ${index + 1}`}
                loading="lazy"
                className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          ))}
        </motion.div>
       </div>
    </header>
  );
};