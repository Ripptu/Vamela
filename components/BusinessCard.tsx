import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { QrCode, Scan, MousePointerClick } from 'lucide-react';

export const BusinessCard: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Drag Motion Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for physics feel
  const rotateX = useSpring(useTransform(y, [-100, 100], [30, -30]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-30, 30]), { stiffness: 150, damping: 20 });

  // Glare effect logic based on rotation
  const glareOpacity = useTransform(rotateY, [-30, 30], [0, 0.4]);
  const glarePosition = useTransform(rotateY, [-30, 30], ["0%", "100%"]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <section className="py-24 px-6 relative flex flex-col items-center justify-center bg-[#050505] overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,100,0,0.03),transparent_70%)] pointer-events-none" />

      <div className="text-center mb-12 relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Connect <span className="text-orange-500">Digital.</span>
        </h2>
        <p className="text-gray-400 text-sm md:text-base flex items-center justify-center gap-2">
            <MousePointerClick className="w-4 h-4 animate-bounce" /> 
            Karte drehen & klicken zum Scannen.
        </p>
      </div>

      {/* 3D Scene Container */}
      <div className="relative w-full max-w-[360px] h-[220px] md:w-[500px] md:h-[300px] perspective-1000 cursor-grab active:cursor-grabbing">
        
        {/* The Card Object */}
        <motion.div
          style={{ 
            rotateX: rotateX, 
            rotateY: rotateY, 
            x, 
            y,
            transformStyle: "preserve-3d",
          }}
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={0.2}
          onDragEnd={() => {
            x.set(0);
            y.set(0);
          }}
          animate={{
            rotateY: isFlipped ? 180 : 0
          }}
          transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }} // Snap flip
          onClick={handleFlip}
          className="w-full h-full relative"
        >
          
          {/* --- FRONT SIDE --- */}
          <div 
            className="absolute inset-0 w-full h-full bg-[#0F0F11] rounded-2xl border border-white/10 shadow-2xl overflow-hidden backface-hidden"
            style={{ backfaceVisibility: 'hidden' }}
          >
            {/* Texture / Noise */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
            
            {/* Holographic Sheen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 via-purple-500/10 to-blue-500/10 mix-blend-overlay" />

            {/* Dynamic Glare */}
            <motion.div 
                style={{ 
                    background: `linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.2) 45%, rgba(255,255,255,0.0) 50%)`,
                    opacity: glareOpacity,
                    left: glarePosition,
                }}
                className="absolute inset-0 w-[200%] h-full pointer-events-none -ml-[50%]"
            />

            {/* Content Front */}
            <div className="relative z-10 p-8 flex flex-col justify-between h-full">
                <div className="flex justify-between items-start">
                    <img src="https://i.postimg.cc/MKfgVYQk/html.png" alt="VAMELA" className="h-8 md:h-12 w-auto object-contain" />
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
                        <Scan className="w-5 h-5 text-gray-400" />
                    </div>
                </div>

                <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Christian Stockmeier</h3>
                    <p className="text-orange-500 font-mono text-xs md:text-sm uppercase tracking-widest mt-1">Founder & Lead Designer</p>
                </div>

                <div className="flex justify-between items-end border-t border-white/10 pt-4">
                    <div className="text-[10px] md:text-xs text-gray-500 font-mono">
                        VAMELA STUDIO <br/>
                        GERMANY
                    </div>
                    <div className="text-[10px] md:text-xs text-gray-500 font-mono text-right">
                        EST. 2012 <br/>
                        DESIGN & CODE
                    </div>
                </div>
            </div>
          </div>

          {/* --- BACK SIDE --- */}
          <div 
            className="absolute inset-0 w-full h-full bg-[#0F0F11] rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
            style={{ 
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)' 
            }}
          >
             {/* Texture */}
             <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
             
             {/* Content Back */}
             <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-6 text-center">
                <div className="bg-white p-3 rounded-xl mb-4 shadow-lg ring-4 ring-white/5">
                    {/* QR Code generating WhatsApp Link */}
                    <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://wa.me/4917624200179`} 
                        alt="WhatsApp QR" 
                        className="w-24 h-24 md:w-32 md:h-32" 
                    />
                </div>
                <h3 className="text-white font-bold text-lg mb-1">Let's chat!</h3>
                <p className="text-gray-400 text-xs mb-4">Scan mich für WhatsApp</p>
                
                <a 
                    href="https://wa.me/4917624200179" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-orange-500 border border-orange-500/30 px-3 py-1.5 rounded-full hover:bg-orange-500/10 transition-colors pointer-events-auto"
                    onClick={(e) => e.stopPropagation()} // Prevent card flip on link click
                >
                    <QrCode className="w-3 h-3" />
                     Direktlink öffnen
                </a>
             </div>
          </div>

        </motion.div>
      </div>

    </section>
  );
};