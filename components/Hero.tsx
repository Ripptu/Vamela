import React from 'react';
import { Mail, MessageCircle } from 'lucide-react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { LiquidButton } from './ui/LiquidButton';

const ToolItem: React.FC<{ name: string }> = ({ name }) => (
  <div className="flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]"></div>
    <span className="text-sm md:text-base font-medium text-gray-300">{name}</span>
  </div>
);

// --- Main Hero Component ---

interface HeroProps {
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Use MotionTemplate to update background without React renders
  const background = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.03), transparent 40%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const services = [
    "High-End Webdesign",
    "Branding & Logo",
    "SEO Strategie",
    "Online Shops",
    "Performance Tuning",
    "Corporate Identity",
    "React Development",
    "UI/UX Design",
    "Conversion Optimierung"
  ];

  const easing = [0.22, 1, 0.36, 1]; // Custom cubic-bezier for high-end smooth feel

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative pt-20 pb-16 md:pt-32 md:pb-20 px-6 flex flex-col items-center text-center overflow-hidden group min-h-[90vh] justify-center"
    >
      {/* Interactive Spotlight Effect - Optimized with MotionValue */}
      <motion.div 
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{ background }}
      />

      {/* Background Grid Effect */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Content Wrapper for Staggered Animation */}
      <div className="relative z-10 flex flex-col items-center w-full">
        
        {/* LOGO */}
        <motion.img 
          src="https://i.postimg.cc/MKfgVYQk/html.png" 
          alt="VAMELA Logo" 
          width="800"
          height="200"
          className="w-full max-w-[280px] sm:max-w-sm md:max-w-3xl h-auto mb-6 mx-auto block object-contain"
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.0, ease: easing }}
          fetchPriority="high"
        />

        {/* CLARITY BADGE: Explicitly state what this is */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease: easing }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] md:text-xs font-bold tracking-widest uppercase text-gray-300 mb-8 backdrop-blur-md"
        >
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
            Webdesign & Branding Studio • Germany
        </motion.div>

        {/* Heading - MORE DIRECT */}
        <motion.h1 
          className="max-w-5xl text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1] md:leading-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.35, ease: easing }}
        >
          High-End Webdesign. <br />
          <span 
            className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-500 via-white to-neutral-500 animate-shimmer bg-[length:200%_100%]"
            style={{ '--shimmer-width': '200%' } as any}
          >
            Marken, die verkaufen.
          </span>
        </motion.h1>

        {/* Subtext - EXPLAIN FOR WHOM */}
        <motion.p 
          className="max-w-2xl text-base md:text-lg text-gray-400 mb-10 leading-relaxed px-4 md:px-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.5, ease: easing }}
        >
          Ich entwickle maßgeschneiderte Websites und visuelle Identitäten für ambitionierte Selbstständige & KMUs. 
          Keine Baukästen. Keine Kompromisse. Dein digitaler Auftritt, der Besucher zu Kunden macht.
        </motion.p>

        {/* Actions - Using new LiquidButton */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto px-6 sm:px-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.65, ease: easing }}
        >
          {/* Main Action triggers modal now */}
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

      {/* Services - Infinite Marquee (Replaced Tech Stack with Value Props) */}
      <motion.div 
        className="relative z-10 mt-20 pt-10 border-t border-white/5 w-full max-w-6xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
      >
        <p className="text-center text-xs text-gray-500 uppercase tracking-widest mb-6 md:mb-8">
          LEISTUNGEN & EXPERTISE
        </p>
        
        <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
          <div className="flex shrink-0 animate-marquee whitespace-nowrap gap-8 md:gap-12 items-center pr-8 md:pr-12">
            {services.map((service, index) => (
               <ToolItem key={`list1-${index}`} name={service} />
            ))}
          </div>
          <div className="flex shrink-0 animate-marquee whitespace-nowrap gap-8 md:gap-12 items-center pr-8 md:pr-12">
            {services.map((service, index) => (
               <ToolItem key={`list2-${index}`} name={service} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};