import React, { useEffect, useRef } from 'react';
import { MousePointer2, MessageSquareHeart } from 'lucide-react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

// Minimalist Stat Component
const MinimalStat = ({ value, label, delay }: { value: number; label: string; delay: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-20px" });
    
    const spring = useSpring(0, { mass: 1, stiffness: 60, damping: 20 });
    const displayValue = useTransform(spring, (current) => Math.round(current));

    useEffect(() => {
        if (isInView) {
            spring.set(value);
        }
    }, [isInView, value, spring]);

    return (
        <div ref={ref} className="flex flex-col">
            <div className="flex items-baseline gap-1 mb-1">
                <motion.span className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                    {displayValue}
                </motion.span>
                <span className="text-xl text-orange-500 font-bold">+</span>
            </div>
            <span className="text-xs text-gray-500 uppercase tracking-widest font-medium border-t border-white/10 pt-2 block w-full max-w-[120px]">
                {label}
            </span>
        </div>
    );
};

export const About: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-20 px-6 relative overflow-hidden bg-[#0A0A0A] border-t border-white/5">
      
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-16 items-center relative z-10">
        
        {/* Image Section - Slightly smaller aspect ratio */}
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
                <p className="text-orange-500 text-[10px] font-mono uppercase tracking-widest">Founder / Designer</p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-orange-500 font-medium mb-4">
              <MousePointer2 className="w-3 h-3" /> BEHIND THE SCREENS
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
              Aus Begeisterung wurde <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-white">
                echte Expertise.
              </span>
            </h2>
          </div>

          <div className="space-y-4 text-gray-400 text-base leading-relaxed font-light">
            <p>
              Hi, ich bin Christian. Angefangen hat alles nicht in einer schicken Agentur, sondern in meinem Kinderzimmer. Damals habe ich <strong>Minecraft-Banner für YouTuber</strong> gestaltet. Was als Spielerei begann, wurde zur Obsession für gutes Design.
            </p>
            <p>
              Ich bin kein Freund von "Business-Sprech" oder anonymen Abläufen. Ich bin dein direkter Ansprechpartner, der deine Vision versteht, weil ich diesen Weg selbst gegangen bin.
            </p>
            
            <div className="bg-[#121214] border border-white/5 rounded-xl p-5 mt-4 relative overflow-hidden flex gap-4 items-start">
                 <div className="shrink-0 p-2 bg-orange-500/10 rounded-lg text-orange-500">
                    <MessageSquareHeart className="w-5 h-5" />
                 </div>
                 <div>
                    <h3 className="text-white font-bold text-xs uppercase tracking-wide mb-1">Mein Ansatz</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                    "Ich glaube daran, dass gutes Design Probleme löst. Es geht nicht um mein Ego als Künstler, sondern darum, dass du dich mit deinem Auftritt wohlfühlst und er für dein Business funktioniert."
                    </p>
                 </div>
            </div>
          </div>

          {/* Minimalist Stats Grid */}
          <div className="flex gap-12 mt-8 pt-8 border-t border-white/5">
             <MinimalStat 
                value={12} 
                label="Jahre Design" 
                delay={0}
             />
             <MinimalStat 
                value={3} 
                label="Jahre Dev" 
                delay={0.2}
             />
          </div>
        </div>

      </div>
    </section>
  );
};