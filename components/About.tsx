import React, { useEffect, useRef, useState } from 'react';
import { MousePointer2, MessageSquareHeart, Layers, Code } from 'lucide-react';
import { motion, useInView, useSpring } from 'framer-motion';

// --- ROLLING NUMBER COMPONENT ---
// Creates a slot-machine style vertical roll effect
const RollingDigit: React.FC<{ digit: string; delay: number }> = ({ digit, delay }) => {
  // We repeat numbers to create the illusion of a long scroll
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const target = parseInt(digit);
  
  // Calculate how far to scroll (e.g. if target is 2, we need to shift 20% of the total height)
  // Since there are 10 numbers, each number is 10% of the height.
  const finalY = -(target * 10); 

  return (
    <div className="h-[1em] overflow-hidden relative inline-block mx-[1px]">
        <motion.div
            initial={{ y: "0%" }}
            whileInView={{ y: `${finalY}%` }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
                duration: 2.5, 
                ease: [0.2, 0.8, 0.2, 1], // Custom cubic bezier for smooth "landing"
                delay: delay 
            }}
            className="flex flex-col text-center"
        >
            {/* Render sequence of numbers */}
            {numbers.map((n) => (
                <span key={n} className="h-[1em] flex items-center justify-center leading-none">
                    {n}
                </span>
            ))}
        </motion.div>
    </div>
  );
};

const RollingStats: React.FC<{ value: number; label: string; icon: React.ElementType; delay: number }> = ({ value, label, icon: Icon, delay }) => {
    const digits = value.toString().split("");

    return (
        <div className="relative group">
            {/* Glass Card Background */}
            <div className="absolute inset-0 bg-white/[0.03] border border-white/5 rounded-2xl -skew-x-3 transition-transform group-hover:skew-x-0 group-hover:bg-white/[0.05]" />
            
            <div className="relative p-6 flex flex-col items-start gap-2">
                
                {/* Icon Badge */}
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center border border-orange-500/20 mb-2">
                    <Icon className="w-4 h-4 text-orange-400" />
                </div>

                {/* The Number */}
                <div className="flex items-baseline text-4xl md:text-5xl font-bold text-white tracking-tight h-[1em] overflow-hidden">
                    {digits.map((digit, i) => (
                        <RollingDigit key={i} digit={digit} delay={delay + (i * 0.1)} />
                    ))}
                    <motion.span 
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: delay + 1.5, type: "spring" }}
                        className="text-orange-500 ml-1"
                    >
                        +
                    </motion.span>
                </div>

                {/* The Label */}
                <span className="text-xs text-white/50 font-mono uppercase tracking-widest pl-1">
                    {label}
                </span>
            </div>
        </div>
    );
};

export const About: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-20 px-6 relative overflow-hidden bg-[#020204] border-t border-white/5">
      
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-16 items-center relative z-10">
        
        {/* Image Section */}
        <div className="relative group max-w-md mx-auto lg:max-w-none w-full">
          <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-[4/5] bg-black shadow-2xl">
            <img 
              src="https://i.postimg.cc/HLRRnZY1/4995ad88-01bd-465e-9b20-c3178ee83d1e.png" 
              alt="Christian Stockmeier" 
              loading="eager"
              className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
            />
            
            {/* Minimal Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />
            
            <div className="absolute bottom-6 left-6">
                <p className="text-white font-bold text-lg">Christian Stockmeier</p>
                <p className="text-orange-400 text-[10px] font-mono uppercase tracking-widest">Founder / Designer</p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-orange-400 font-medium mb-4">
              <MousePointer2 className="w-3 h-3" /> BEHIND THE SCREENS
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
              Aus Begeisterung wurde <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-white">
                echte Expertise.
              </span>
            </h2>
          </div>

          <div className="space-y-4 text-white/60 text-base leading-relaxed font-light">
            <p>
              Hi, ich bin Christian. Angefangen hat alles nicht in einer schicken Agentur, sondern in meinem Kinderzimmer. Damals habe ich <strong>Minecraft-Banner für YouTuber</strong> gestaltet. Was als Spielerei begann, wurde zur Obsession für gutes Design.
            </p>
            <p>
              Ich bin kein Freund von "Business-Sprech" oder anonymen Abläufen. Ich bin dein direkter Ansprechpartner, der deine Vision versteht, weil ich diesen Weg selbst gegangen bin.
            </p>
            
            {/* Quote Box */}
            <div className="bg-white/[0.03] border border-white/5 rounded-xl p-5 mt-4 relative overflow-hidden flex gap-4 items-start shadow-xl">
                 <div className="shrink-0 p-2 bg-orange-500/10 rounded-lg text-orange-400">
                    <MessageSquareHeart className="w-5 h-5" />
                 </div>
                 <div>
                    <h3 className="text-white font-bold text-xs uppercase tracking-wide mb-1">Mein Ansatz</h3>
                    <p className="text-xs text-white/50 leading-relaxed">
                    "Ich glaube daran, dass gutes Design Probleme löst. Es geht nicht um mein Ego als Künstler, sondern darum, dass du dich mit deinem Auftritt wohlfühlst und er für dein Business funktioniert."
                    </p>
                 </div>
            </div>
          </div>
          
          {/* New Rolling Stats Grid */}
          <div className="grid grid-cols-2 gap-6 mt-8 pt-8 border-t border-white/5">
             <RollingStats 
                value={12} 
                label="Jahre Design" 
                icon={Layers}
                delay={0}
             />
             <RollingStats 
                value={3} 
                label="Jahre Webdesign" 
                icon={Code}
                delay={0.2}
             />
          </div>
        </div>

      </div>
    </section>
  );
};