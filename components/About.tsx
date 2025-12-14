import React, { useEffect, useRef } from 'react';
import { MousePointer2, Heart, Layers, Code } from 'lucide-react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

// Enhanced StatCard with High-End Design
const StatCard = ({ value, label, subtext, icon: Icon, delay }: { value: number; label: string; subtext: string; icon: any; delay: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    
    // Smoother spring for the number count up
    const spring = useSpring(0, { mass: 1, stiffness: 50, damping: 25 });
    const displayValue = useTransform(spring, (current) => Math.round(current));
    
    // Progress bar animation
    const progressSpring = useSpring(0, { stiffness: 30, damping: 20 });
    const width = useTransform(progressSpring, (current) => `${current}%`);

    useEffect(() => {
        if (isInView) {
            spring.set(value);
            progressSpring.set(100);
        }
    }, [isInView, value, spring, progressSpring]);

    return (
        <motion.div 
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: delay, ease: [0.2, 0.65, 0.3, 0.9] }}
            className="group relative bg-[#0F0F11] border border-white/10 rounded-3xl p-6 md:p-8 overflow-hidden hover:border-orange-500/40 transition-all duration-500 shadow-2xl"
        >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-[60px] group-hover:bg-orange-500/15 transition-all duration-700 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col h-full justify-between min-h-[160px]">
                <div className="flex justify-between items-start mb-6">
                    {/* Icon Container */}
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-orange-500 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-500 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                        <Icon className="w-6 h-6" />
                    </div>
                    
                    {/* Progress Indicator */}
                    <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden mt-2">
                        <motion.div style={{ width }} className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full" />
                    </div>
                </div>
                
                <div>
                    <div className="flex items-baseline gap-1 mb-2">
                         {/* Massive Number */}
                        <motion.span className="text-6xl md:text-7xl font-bold text-white tracking-tighter leading-none group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-gray-400 transition-all duration-500">
                            {displayValue}
                        </motion.span>
                        <span className="text-2xl md:text-3xl text-orange-500 font-bold mb-auto">+</span>
                    </div>
                    
                    <div className="space-y-1">
                        <h4 className="text-sm font-bold text-white uppercase tracking-widest">{label}</h4>
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider group-hover:text-gray-400 transition-colors">{subtext}</p>
                    </div>
                </div>
            </div>
            
            {/* Background Icon Watermark */}
             <div className="absolute -bottom-6 -right-6 opacity-[0.02] group-hover:opacity-[0.06] transition-opacity duration-500 transform rotate-12 pointer-events-none scale-150">
                 <Icon className="w-40 h-40 text-white" />
            </div>
        </motion.div>
    );
};

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-24 px-6 relative overflow-hidden bg-[#0A0A0A]">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-orange-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-16 items-center relative z-10">
        
        {/* Image Section */}
        <div className="relative group">
          <div className="relative rounded-3xl overflow-hidden border border-white/10 aspect-[3/4] bg-black">
            <img 
              src="https://i.postimg.cc/HLRRnZY1/4995ad88-01bd-465e-9b20-c3178ee83d1e.png" 
              alt="Christian Stockmeier" 
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700"
            />
            
            {/* Overlay Gradient for text readability at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
            
            <div className="absolute bottom-6 left-6">
                <p className="text-white font-bold text-xl">Christian Stockmeier</p>
                <p className="text-orange-500 text-sm font-mono uppercase tracking-widest">Founder / Designer</p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-orange-500 font-medium mb-6">
              <MousePointer2 className="w-3 h-3" /> BEHIND THE SCREENS
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
              Aus Begeisterung wurde <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-white">
                echte Expertise.
              </span>
            </h2>
          </div>

          <div className="space-y-6 text-gray-400 text-lg leading-relaxed font-light">
            <p>
              Hi, ich bin Christian. Angefangen hat alles nicht in einer schicken Agentur, sondern in meinem Kinderzimmer. Damals habe ich <strong>Minecraft-Banner für YouTuber</strong> gestaltet. Was als Spielerei begann, wurde zur Obsession für gutes Design.
            </p>
            <p>
              Mittlerweile blicke ich auf <strong>12 Jahre Erfahrung im Grafikdesign</strong> zurück. Vor <strong>3 Jahren</strong> kam dann die Faszination für Code dazu, weil ich nicht wollte, dass meine Designs an technischen Grenzen scheitern.
            </p>
            <p>
              Ich bin kein Freund von "Business-Sprech" oder anonymen Abläufen. Ich bin dein direkter Ansprechpartner, der deine Vision versteht, weil ich diesen Weg selbst gegangen bin. Authentisch, direkt und mit verdammt viel Herzblut.
            </p>
            
            <div className="bg-[#121214] border border-white/5 rounded-2xl p-6 mt-8 relative overflow-hidden group hover:border-orange-500/20 transition-colors">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Heart className="w-16 h-16 text-orange-500" />
                </div>
                <h3 className="text-white font-bold mb-2 text-sm uppercase tracking-wide flex items-center gap-2">
                   <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span> My Philosophy
                </h3>
                <p className="text-sm text-gray-500">
                  "Design muss nicht nur gut aussehen, es muss sich gut anfühlen. Egal ob Logo oder Website – am Ende geht es um die Verbindung zwischen Menschen."
                </p>
            </div>
          </div>

          {/* New Animated Stats Grid - Now visually stunning */}
          <div className="grid grid-cols-2 gap-6 mt-8 pt-8 border-t border-white/5">
             <StatCard 
                value={12} 
                label="Jahre Experience" 
                subtext="Grafik & Branding"
                icon={Layers}
                delay={0}
             />
             <StatCard 
                value={3} 
                label="Jahre Dev" 
                subtext="React & Frontend"
                icon={Code}
                delay={0.2}
             />
          </div>
        </div>

      </div>
    </section>
  );
};