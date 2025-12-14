import React, { useRef, useState, useEffect } from 'react';
import { PenTool, Globe, Smartphone, Layout, Code2, Rocket, Search, MonitorCheck, MapPin, Clock } from 'lucide-react';
import { motion, useMotionTemplate, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion';

// 3D Tilt Card Component
const TiltCard = ({ children, className, glowColor = "rgba(255, 255, 255, 0.1)" }: { children?: React.ReactNode, className?: string, glowColor?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set(clientX - left);
    y.set(clientY - top);
    
    const xPct = (clientX - left) / width - 0.5;
    const yPct = (clientY - top) / height - 0.5;
    
    if (ref.current) {
        ref.current.style.transform = `perspective(1000px) rotateX(${-yPct * 10}deg) rotateY(${xPct * 10}deg)`;
    }
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
    if (ref.current) {
        ref.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    }
  }

  return (
    <motion.div
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div 
        ref={ref} 
        className="relative h-full w-full rounded-2xl md:rounded-3xl bg-[#0F0F11] border border-white/5 transition-all duration-200 ease-out overflow-hidden hover:border-white/10 will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                650px circle at ${mouseX}px ${mouseY}px,
                ${glowColor},
                transparent 80%
              )
            `,
          }}
        />
        <div className="relative z-10 h-full p-6 md:p-8" style={{ transform: "translateZ(20px)" }}>
            {children}
        </div>
      </div>
    </motion.div>
  );
};

// Live Clock Component
const LiveTime = () => {
    const [time, setTime] = useState("");
    
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Berlin' }));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return <span className="font-mono">{time}</span>;
}

export const Features: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax effects
  const yText = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const yBackground = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section ref={containerRef} id="services" className="px-6 py-20 md:py-32 max-w-7xl mx-auto perspective-1000 relative">
      
      {/* Background Parallax Decoration */}
      <motion.div 
        style={{ y: yBackground }}
        className="absolute top-0 right-0 text-[120px] md:text-[200px] font-bold text-white/[0.02] pointer-events-none select-none z-0 leading-none overflow-hidden"
      >
        SERVICES
      </motion.div>

      {/* Section Header with Parallax */}
      <div className="mb-12 md:mb-20 relative z-10">
        <motion.div style={{ y: yText }}>
            <motion.h2 
                initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
                whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-3xl md:text-6xl font-bold text-white mb-6 leading-tight"
            >
              <span className="block mb-2">Spezialisierung statt</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 pb-2">
                  Bauchladen.
              </span>
            </motion.h2>
            
            <motion.p 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed border-l-2 border-orange-500 pl-4 md:pl-6"
            >
              Ich mache nicht "ein bisschen alles". Ich biete exzellentes Handwerk in zwei Kernbereichen, die untrennbar zusammengehören: 
              Starke Markenidentität und modernste Web-Technologie.
            </motion.p>
        </motion.div>
      </div>

      {/* Bento Grid with 3D Tilt */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 relative z-10">
        
        {/* Card 1: Branding (Large Vertical) */}
        <TiltCard className="md:col-span-1 md:row-span-2 group h-full" glowColor="rgba(249, 115, 22, 0.15)">
            <div className="absolute top-0 right-0 p-32 bg-orange-500/5 rounded-full blur-[80px] group-hover:bg-orange-500/10 transition-all pointer-events-none" />
            
            <div className="flex flex-col h-full">
                <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mb-6 border border-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.1)]">
                  <PenTool className="w-6 h-6 text-orange-500" />
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Branding &<br/>Visual Identity</h3>
                <p className="text-gray-300 mb-8 leading-relaxed text-sm md:text-base">
                  Eine Marke ist mehr als ein Logo. Es ist das Bauchgefühl, das Kunden haben, wenn sie an dich denken. Ich entwickle visuelle Systeme, die Vertrauen schaffen.
                </p>

                <ul className="space-y-4 mt-auto">
                  <FeatureItem icon={<Layout className="w-4 h-4" />} text="Logo Design & Redesign" />
                  <FeatureItem icon={<Search className="w-4 h-4" />} text="Typografie & Farbpsychologie" />
                  <FeatureItem icon={<MonitorCheck className="w-4 h-4" />} text="Social Media Assets" />
                  <FeatureItem icon={<Rocket className="w-4 h-4" />} text="Print & Geschäftsausstattung" />
                </ul>
            </div>
        </TiltCard>

        {/* Card 2: Web Dev (Wide Horizontal) */}
        <TiltCard className="md:col-span-2 group h-full" glowColor="rgba(59, 130, 246, 0.15)">
           <div className="absolute -bottom-10 -right-10 p-32 bg-blue-500/5 rounded-full blur-[80px] group-hover:bg-blue-500/10 transition-all pointer-events-none" />
           
           <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                  <Code2 className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white">High-End Web Development</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                  Keine Baukästen, keine Kompromisse. Ich programmiere Websites, die extrem schnell laden, bei Google gefunden werden und auf jedem Gerät perfekt aussehen.
                </p>
                <div className="space-y-3">
                   <div className="flex items-center gap-3 text-sm text-gray-300">
                      <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span>
                      <span>React & TypeScript (Interaktive UIs)</span>
                   </div>
                   <div className="flex items-center gap-3 text-sm text-gray-300">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"></span>
                      <span>Tailwind CSS (Pixel-perfektes Design)</span>
                   </div>
                   <div className="flex items-center gap-3 text-sm text-gray-300">
                      <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></span>
                      <span>Framer Motion (High-End Animationen)</span>
                   </div>
                </div>
              </div>
           </div>
        </TiltCard>

        {/* Card 3: UI/UX (Standard) */}
        <TiltCard className="group h-full" glowColor="rgba(34, 197, 94, 0.15)">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-24 bg-green-500/5 rounded-full blur-[60px] group-hover:bg-green-500/10 transition-all pointer-events-none" />
           <div className="relative z-10">
              <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-6 border border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                <Smartphone className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-3">UI & UX Design</h3>
              <p className="text-sm text-gray-300 leading-relaxed mb-4">
                Schöne Websites bringen nichts, wenn sie keiner bedienen kann. Ich gestalte Nutzerführungen, die Besucher intuitiv zu Kunden machen.
              </p>
           </div>
        </TiltCard>

        {/* Card 4: Live Status & Widgets (REPLACED GENERIC CARD) */}
        <TiltCard className="group h-full" glowColor="rgba(255, 255, 255, 0.05)">
            <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                   <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Live Status</h3>
                   
                   <div className="flex items-center gap-4 mb-4">
                       <div className="relative">
                           <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                           <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
                       </div>
                       <div>
                           <div className="text-white font-bold text-sm">Available for work</div>
                           <div className="text-[10px] text-gray-500">Nehme neue Projekte an</div>
                       </div>
                   </div>
                   
                   <div className="flex items-center gap-3 text-gray-400 text-sm">
                       <MapPin className="w-4 h-4 text-orange-500" />
                       <span>Germany (Remote)</span>
                   </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-white font-mono text-xl">
                        <Clock className="w-5 h-5 text-gray-500" />
                        <LiveTime />
                    </div>
                    <div className="text-[10px] text-gray-600 font-mono">
                        LOCAL TIME
                    </div>
                </div>
           </div>
        </TiltCard>

      </div>
    </section>
  );
};

const FeatureItem: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
  <li className="flex items-center gap-3 text-sm font-medium text-gray-300 bg-white/5 p-3 rounded-lg border border-white/5 group-hover:border-orange-500/20 transition-colors">
    <span className="text-orange-500">{icon}</span>
    {text}
  </li>
);