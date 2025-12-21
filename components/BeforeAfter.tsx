import React, { useRef, useEffect } from 'react';
import { motion, useInView, useMotionValue, useTransform, useMotionTemplate, animate } from 'framer-motion';
import { ArrowLeftRight, MousePointer2, Zap, Layout, TrendingUp } from 'lucide-react';

export const BeforeAfter: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  // Performance Optimization: Use MotionValue instead of State to avoid re-renders on drag
  const x = useMotionValue(50); // Represents percentage 0-100
  const isDragging = useRef(false);

  // Derived transforms for styling
  const clipPathStyle = useMotionTemplate`inset(0 ${useTransform(x, val => 100 - val)}% 0 0)`;
  const leftStyle = useMotionTemplate`${x}%`;
  const glareLeftStyle = useMotionTemplate`calc(${x}% - 32px)`;

  const updateX = (clientX: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const newX = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percentage = (newX / rect.width) * 100;
      x.set(percentage);
    }
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging.current) updateX(e.clientX);
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isDragging.current) updateX(e.touches[0].clientX);
  };

  const handleInteractionStart = () => { isDragging.current = true; };
  const handleInteractionEnd = () => { isDragging.current = false; };
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    updateX(e.clientX);
  };

  // Demo Animation
  useEffect(() => {
    if (isInView) {
       // Animate from 50 -> 65 -> 50 smoothly
       const controls = animate(x, [50, 65, 50], {
           duration: 1.5,
           ease: "easeInOut",
           delay: 0.5,
           onUpdate: (latest) => {
               // Only update if user isn't interacting
               if (isDragging.current) controls.stop();
           }
       });
       return () => controls.stop();
    }
  }, [isInView, x]);

  return (
    <section ref={sectionRef} className="py-20 md:py-32 px-6 relative bg-[#050505] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-orange-500/10 rounded-full blur-[100px] md:blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10 md:mb-16 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-orange-500 font-medium mb-6 animate-pulse">
                <ArrowLeftRight className="w-3 h-3" /> DIRECT COMPARISON
            </div>
            <h2 className="text-3xl md:text-6xl font-bold text-white mb-6">
                Nicht nur hübsch. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-white drop-shadow-[0_0_15px_rgba(251,146,60,0.3)]">
                    Sondern performant.
                </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Der direkte Vergleich zeigt: Struktur, Klarheit und modernes Design machen aus Besuchern Kunden. Schieb den Regler.
            </p>
        </div>

        {/* The Comparison Component */}
        <div className="relative max-w-5xl mx-auto">
            
            {/* Browser Frame */}
            <div className="relative rounded-xl md:rounded-3xl border border-white/10 bg-[#121214] shadow-2xl overflow-hidden aspect-video group select-none ring-1 ring-white/5">
                
                {/* Fake Browser Toolbar */}
                <div className="absolute top-0 left-0 right-0 h-10 md:h-12 bg-[#0A0A0C] border-b border-white/5 flex items-center px-4 z-20">
                    <div className="flex gap-2 opacity-60">
                        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#FF5F57]" />
                        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#FEBC2E]" />
                        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#28C840]" />
                    </div>
                    <div className="ml-6 flex-1 max-w-xl mx-auto hidden md:block opacity-40">
                         <div className="h-7 bg-[#1A1A1D] rounded-md flex items-center justify-center text-[10px] text-gray-400 font-mono border border-white/5">
                            https://vamela.de/case-study/redesign-2025
                        </div>
                    </div>
                </div>

                {/* Interaction Area - TOUCH ACTION NONE IS CRITICAL HERE */}
                <div 
                    ref={containerRef}
                    className="absolute top-10 md:top-12 bottom-0 left-0 right-0 cursor-ew-resize overflow-hidden touch-none"
                    style={{ touchAction: 'none' }}
                    onMouseDown={handleInteractionStart}
                    onMouseUp={handleInteractionEnd}
                    onTouchStart={handleInteractionStart}
                    onTouchEnd={handleInteractionEnd}
                    onMouseMove={onMouseMove}
                    onTouchMove={onTouchMove}
                    onClick={handleClick}
                    onMouseLeave={handleInteractionEnd}
                >
                    {/* AFTER Image (Background) - Full Color, Vibrant */}
                    <img 
                        src="https://i.postimg.cc/MZQtb0w0/Screenshot-5.jpg" 
                        alt="Website Nachher" 
                        className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none select-none"
                    />

                    {/* BEFORE Image (Foreground) - Clipped - Slight Grayscale/Dim to emphasize After */}
                    <motion.div 
                        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none bg-[#050505] will-change-[clip-path]"
                        style={{ clipPath: clipPathStyle }}
                    >
                         <img 
                            src="https://i.postimg.cc/fWppMTzF/e18b5b0f-e05f-4366-88e1-0687c98eacaf.png" 
                            alt="Website Vorher" 
                            className="absolute inset-0 w-full h-full object-cover object-top filter grayscale-[30%] brightness-[0.7] contrast-[1.1]"
                        />
                    </motion.div>

                    {/* Labels */}
                    <div className="absolute top-4 left-4 md:top-6 md:left-6 pointer-events-none z-10">
                        <span className="px-2 py-1 md:px-3 md:py-1.5 bg-black/60 backdrop-blur-md border border-white/10 rounded text-[9px] md:text-[10px] font-bold text-gray-300 tracking-wider shadow-lg">
                            VORHER
                        </span>
                    </div>
                     <div className="absolute top-4 right-4 md:top-6 md:right-6 pointer-events-none z-10">
                        <span className="px-2 py-1 md:px-3 md:py-1.5 bg-green-500/20 backdrop-blur-md border border-green-500/40 rounded text-[9px] md:text-[10px] font-bold text-green-400 tracking-wider shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                            NACHHER
                        </span>
                    </div>

                    {/* The Divider Line (Laser Beam) */}
                    <motion.div 
                        className="absolute top-0 bottom-0 w-0.5 z-30 pointer-events-none will-change-[left]"
                        style={{ left: leftStyle }}
                    >
                         {/* Glowing Line */}
                         <div className="absolute inset-0 bg-white shadow-[0_0_15px_2px_rgba(255,255,255,0.5)]"></div>
                         
                         {/* Handle */}
                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 bg-white/10 backdrop-blur-md rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5)] flex items-center justify-center border border-white/30 z-40">
                             <div className="absolute inset-0 rounded-full bg-white/5 animate-ping opacity-20"></div>
                             <ArrowLeftRight className="w-3 h-3 md:w-5 md:h-5 text-white drop-shadow-md" />
                         </div>
                    </motion.div>
                    
                    {/* Lighting/Glare Effect along the cut */}
                     <motion.div 
                        className="absolute top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none mix-blend-overlay z-20 will-change-[left]"
                        style={{ left: glareLeftStyle }}
                    />

                </div>
            </div>

            {/* Stats Grid - Below */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-8">
                 <div className="bg-[#121214] border border-white/5 p-4 rounded-xl text-center group hover:border-green-500/30 transition-colors">
                    <TrendingUp className="w-5 h-5 text-green-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <div className="text-xl md:text-2xl font-bold text-white">+240%</div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider">Leads</div>
                 </div>
                 <div className="bg-[#121214] border border-white/5 p-4 rounded-xl text-center group hover:border-yellow-500/30 transition-colors">
                    <Zap className="w-5 h-5 text-yellow-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <div className="text-xl md:text-2xl font-bold text-white">0.8s</div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider">Ladezeit</div>
                 </div>
                 <div className="bg-[#121214] border border-white/5 p-4 rounded-xl text-center group hover:border-blue-500/30 transition-colors">
                    <Layout className="w-5 h-5 text-blue-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <div className="text-xl md:text-2xl font-bold text-white">100%</div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider">Responsive</div>
                 </div>
                 <div className="bg-[#121214] border border-white/5 p-4 rounded-xl text-center group hover:border-purple-500/30 transition-colors">
                    <MousePointer2 className="w-5 h-5 text-purple-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <div className="text-xl md:text-2xl font-bold text-white">High</div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider">UX Score</div>
                 </div>
            </div>

        </div>
      </div>
    </section>
  );
};