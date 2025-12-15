import React, { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { Mail, MessageCircle } from 'lucide-react';
import { LiquidButton } from './ui/LiquidButton';
import { cn } from "../lib/utils";

// Images for the Marquee
const HERO_IMAGES = [
  "https://mir-s3-cdn-cf.behance.net/project_modules/hd/f8e7b5105213155.5f742224dbf68.jpg",
  "https://mir-s3-cdn-cf.behance.net/project_modules/max_632_webp/309826105213155.5f742224de498.jpg",
  "https://i.ytimg.com/vi/RPgOaElGsGc/maxresdefault.jpg",
  "https://cdn.dribbble.com/userupload/41573963/file/original-ac839f228c8ebe7139e7a9cfcae7d3fa.png?resize=400x0",
  "https://marketplace.canva.com/EAFLXoWGglA/2/0/1600w/canva-beige-and-black-trendy-minimalist-new-abstract-store-logo-u5oX0PaKeUM.jpg",
  "https://cdn.dribbble.com/userupload/43854809/file/original-2983c03c67efe234428ea8a83df572a2.png?resize=400x0",
  "https://i0.wp.com/graphicdesignjunction.com/wp-content/uploads/2024/08/mountain_%26_dog_logo.jpg?resize=890%2C668&ssl=1",
  "https://www.logoai.com/uploads/output/2025/06/20/1aaf5e339a9a9bb5c0a92b728316e901.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBhMSVfRmiE-2ghs82gymc4luLqKdEWYk6jQ&s",
  "https://cdn.dribbble.com/userupload/45066279/file/d44190eb7835505a9882ef81e92530c0.png?resize=400x0",
  "https://www.inkyy.com/wp-content/uploads/2018/12/suitcase.png"
];

interface HeroProps {
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact }) => {
  const FADE_IN_VARIANTS = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
  };

  // Mouse Tracking Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth out the mouse movement for the effect
  const springConfig = { damping: 25, stiffness: 150 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  // Create a mask that moves with the mouse to reveal the grid
  const maskImage = useMotionTemplate`radial-gradient(350px circle at ${mouseXSpring}px ${mouseYSpring}px, black, transparent)`;

  // Duplicate images for seamless loop
  const duplicatedImages = [...HERO_IMAGES, ...HERO_IMAGES];

  return (
    <section 
        className="relative w-full h-screen overflow-hidden bg-[#050505] flex flex-col items-center justify-center text-center px-4 group"
        onMouseMove={handleMouseMove}
    >
       
       {/* Background Effects */}
       
       {/* Static Warm White Glow (Center) */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(255,245,235,0.08),transparent_70%)] blur-[80px] pointer-events-none z-0" />

       {/* Mouse Revealed Grid Effect */}
       <motion.div
            className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
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
       
       <div className="z-20 flex flex-col items-center max-w-5xl mb-24 md:mb-12">
          
          {/* Logo Section (Larger & Static) */}
          <motion.div
             initial="hidden"
             animate="show"
             variants={FADE_IN_VARIANTS}
             className="mb-8"
          >
             <img 
                src="https://i.postimg.cc/MKfgVYQk/html.png" 
                alt="VAMELA Logo" 
                className="w-56 h-auto md:w-80 object-contain drop-shadow-[0_0_40px_rgba(255,255,255,0.1)]"
            />
          </motion.div>

          {/* Title */}
           <motion.h1
            initial="hidden"
            animate="show"
            variants={{
                hidden: {},
                show: {
                    transition: {
                        staggerChildren: 0.1,
                    },
                },
            }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[0.95]"
            >
             <motion.span variants={FADE_IN_VARIANTS} className="block text-gray-100">Webdesign</motion.span>
             <motion.span variants={FADE_IN_VARIANTS} className="block text-transparent bg-clip-text bg-gradient-to-br from-orange-400 via-orange-200 to-white pb-2">& Grafikdesign.</motion.span>
           </motion.h1>

          {/* Description */}
          <motion.p
            initial="hidden"
            animate="show"
            variants={FADE_IN_VARIANTS}
            transition={{ delay: 0.5 }}
            className="mt-6 max-w-2xl text-lg text-gray-400 leading-relaxed"
          >
            Ich verwandle komplexe Ideen in digitale Erlebnisse. Visuelle Exzellenz für Marken, die nicht nur gesehen, sondern verstanden werden wollen.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={FADE_IN_VARIANTS}
            transition={{ delay: 0.7 }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <LiquidButton 
                onClick={onOpenContact}
                variant="secondary"
                className="w-full sm:w-auto cursor-pointer"
            >
                <Mail className="w-5 h-5" /> PROJEKT ANFRAGEN
            </LiquidButton>

            <LiquidButton 
                href="https://wa.me/4917624200179" 
                variant="whatsapp"
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
            >
                <MessageCircle className="w-5 h-5 fill-current" /> WHATSAPP
            </LiquidButton>
          </motion.div>
       </div>

       {/* Marquee at Bottom */}
       <div className="absolute bottom-0 left-0 w-full h-40 md:h-56 z-10 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_100%)] pointer-events-none">
        <motion.div
          className="flex gap-6 pl-4"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
              ease: "linear",
              duration: 60,
              repeat: Infinity,
          }}
          style={{ width: "max-content" }}
        >
             {duplicatedImages.map((src, index) => (
            <div
              key={index}
              className="relative aspect-[4/3] h-32 md:h-44 flex-shrink-0 grayscale-[50%] opacity-60"
              style={{
                rotate: `${index % 2 === 0 ? -2 : 2}deg`,
              }}
            >
              <img
                src={src}
                alt={`Showcase image ${index + 1}`}
                className="w-full h-full object-cover rounded-xl border border-white/10 shadow-lg"
              />
            </div>
          ))}
        </motion.div>
       </div>
    </section>
  );
};