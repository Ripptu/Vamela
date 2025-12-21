import React from 'react';
import { motion } from 'framer-motion';

const TECH_STACK = [
  { name: "Next.js", icon: "https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_light_background.png" }, // Using generic path or reliable CDN
  { name: "React", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" },
  { name: "TypeScript", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png" },
  { name: "Tailwind CSS", icon: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" },
  { name: "Framer Motion", icon: "https://pagepro.co/blog/wp-content/uploads/2020/03/framer-motion.png" },
  { name: "Node.js", icon: "https://static-00.iconduck.com/assets.00/node-js-icon-454x512-nztofx17.png" },
  { name: "Vercel", icon: "https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png" },
  { name: "Figma", icon: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg" },
];

export const TechStack: React.FC = () => {
  // Duplicate list for seamless loop
  const logos = [...TECH_STACK, ...TECH_STACK, ...TECH_STACK];

  return (
    <section className="py-8 bg-[#020204] border-b border-white/5 overflow-hidden relative z-20">
      <div className="absolute inset-0 z-10 pointer-events-none bg-[linear-gradient(to_right,#020204_0%,transparent_20%,transparent_80%,#020204_100%)]" />
      
      <div className="max-w-7xl mx-auto px-6 mb-4 text-center">
        <p className="text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-white/30">
          Powered by modern Technology stack
        </p>
      </div>

      <div className="flex overflow-hidden relative">
        <motion.div
          className="flex gap-12 md:gap-20 items-center pr-12"
          animate={{
            x: ["0%", "-33.33%"],
          }}
          transition={{
            ease: "linear",
            duration: 20, // Fast speed as requested
            repeat: Infinity,
          }}
          style={{ width: "max-content" }}
        >
          {logos.map((tech, index) => (
            <div 
                key={index} 
                className="flex items-center gap-3 opacity-30 grayscale hover:grayscale-0 hover:opacity-80 transition-all duration-300 cursor-default group"
            >
                <img 
                    src={tech.icon} 
                    alt={tech.name} 
                    className="h-6 w-auto object-contain md:h-8"
                />
                <span className="text-sm font-bold text-white hidden md:block group-hover:text-white transition-colors">{tech.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};