import React, { useRef, useState, useEffect } from 'react';
import { Mail, MessageCircle, Search, Loader2, AlertTriangle, Terminal, ArrowRight, Zap, ShieldAlert, Cpu, Monitor, PenTool } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from 'framer-motion';
import { LiquidButton } from './ui/LiquidButton';

// --- Audit Simulation Logic ---
const AUDIT_RESULTS = [
  {
    score: 64,
    title: "Performance Engpass",
    description: "Der First Contentful Paint (FCP) ist kritisch. Mobile Nutzer im 4G-Netz springen ab, bevor die Seite lädt. Du verlierst Umsatz.",
    color: "text-orange-500",
    icon: Zap
  },
  {
    score: 58,
    title: "Conversion-Killer",
    description: "Der Nutzerführung fehlt der rote Faden. Call-to-Actions (CTAs) gehen im Design unter. Besucher wissen nicht, was sie tun sollen.",
    color: "text-orange-500",
    icon: AlertTriangle
  },
  {
    score: 45,
    title: "Mobile UX Kritisch",
    description: "Touch-Targets sind zu klein, Abstände inkonsistent. Auf dem iPhone wirkt die Seite nicht 'native'. Das kostet Vertrauen.",
    color: "text-red-500",
    icon: ShieldAlert
  },
  {
    score: 67,
    title: "Austauschbares Branding",
    description: "Technisch okay, aber emotional flach. Es fehlt der 'Signature-Look'. Kunden vergleichen dich nur über den Preis.",
    color: "text-orange-400",
    icon: Cpu
  }
];

const SCAN_LOGS = [
  "Initializing Handshake...",
  "Parsing DOM Structure...",
  "Analyzing Core Web Vitals...",
  "Checking Mobile Viewport...",
  "Evaluating UI Contrast...",
  "Detecting Conversion Leaks...",
  "Compiling Final Report..."
];

const AuditTool = () => {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<'idle' | 'scanning' | 'result'>('idle');
  const [currentLog, setCurrentLog] = useState(0);
  const [result, setResult] = useState<typeof AUDIT_RESULTS[0] | null>(null);

  const startScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    setStatus('scanning');
    setCurrentLog(0);
    setResult(null);

    // Simulate Logs
    let logIndex = 0;
    const logInterval = setInterval(() => {
      logIndex++;
      setCurrentLog(prev => prev + 1);
      if (logIndex >= SCAN_LOGS.length) {
        clearInterval(logInterval);
        finishScan();
      }
    }, 350); 
  };

  const finishScan = () => {
    const randomResult = AUDIT_RESULTS[Math.floor(Math.random() * AUDIT_RESULTS.length)];
    setResult(randomResult);
    setStatus('result');
  };

  return (
    <div className="w-full max-w-[420px] mx-auto relative z-30">
      <AnimatePresence mode="wait">
        
        {/* STATE: IDLE - Minimalistic Colorful Pill */}
        {status === 'idle' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, height: 0 }}
            className="relative"
          >
            {/* Colorful Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-purple-500 to-red-500 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            
            <form onSubmit={startScan} className="relative group">
                {/* Gradient Border Wrapper */}
                <div className="p-[1.5px] rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 shadow-lg">
                    <div className="relative flex items-center bg-black/95 backdrop-blur-md rounded-full pl-4 pr-1.5 py-1.5 h-12">
                        <Terminal className="w-4 h-4 text-gray-500 mr-3 group-focus-within:text-orange-500 transition-colors" />
                        
                        <input 
                            type="text" 
                            placeholder="deine-website.de" 
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-500 text-sm font-medium"
                        />
                        
                        <button 
                            type="submit"
                            disabled={!url}
                            className="bg-white text-black font-bold p-2 px-4 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs flex items-center gap-2"
                        >
                            AI SCAN
                        </button>
                    </div>
                </div>
            </form>
          </motion.div>
        )}

        {/* STATE: SCANNING - Technical Look */}
        {status === 'scanning' && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0 }}
            className="bg-[#050505]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-left font-mono text-xs shadow-2xl relative overflow-hidden flex flex-col min-h-[180px]"
          >
            {/* Animated Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:14px_14px]"></div>
            
            <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2 relative z-10">
                <div className="flex items-center gap-2 text-orange-500">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="uppercase tracking-widest font-bold">SCANNING</span>
                </div>
                <div className="text-gray-600 truncate max-w-[150px]">{url}</div>
            </div>
            
            <div className="space-y-2 text-gray-400 z-10 font-mono">
              {SCAN_LOGS.map((log, index) => (
                <div key={index} className={`${index <= currentLog ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'} transition-all duration-300 flex items-center gap-2`}>
                   <span className="text-orange-500/50">{`>`}</span> 
                   <span className={index === currentLog ? "text-white" : "text-gray-500"}>{log}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* STATE: RESULT - High End Card */}
        {status === 'result' && result && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0F0F11] border border-white/10 rounded-2xl overflow-hidden shadow-2xl text-left relative group w-full"
          >
             {/* Top accent line */}
             <div className="h-1 w-full bg-gradient-to-r from-orange-500 via-red-500 to-orange-500"></div>

             <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1 font-bold">Ergebnis</div>
                        <div className="flex items-baseline gap-1">
                             <span className={`text-4xl font-bold text-white tracking-tighter`}>{result.score}</span>
                             <span className="text-xs text-gray-600 font-medium">/100</span>
                        </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                        <result.icon className={`w-5 h-5 ${result.color}`} />
                    </div>
                </div>

                <h3 className="text-white font-bold text-base mb-2">{result.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed mb-6">
                    {result.description}
                </p>

                <a 
                    href={`https://wa.me/4917624200179?text=${encodeURIComponent(`Hi Christian, ich habe den Check auf deiner Website gemacht (Score: ${result.score}/100) und würde das gerne fixen lassen.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-white hover:bg-gray-100 text-black font-bold py-3 rounded-xl text-xs text-center transition-all flex items-center justify-center gap-2 group-hover:scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                >
                    <MessageCircle className="w-3.5 h-3.5" /> Lass uns das fixen
                </a>
             </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};


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

  // REPLACED: Tech stack with Customer Benefits/Services to make value prop clear
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
      className="relative pt-24 pb-16 md:pt-32 md:pb-20 px-6 flex flex-col items-center text-center overflow-hidden group min-h-[90vh] justify-center"
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

        {/* AI WEBSITE CHECKER */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: easing }}
          className="mb-8 w-full relative z-50"
        >
           <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 font-mono">Gratis Website Check</div>
           <AuditTool />
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

const ToolItem: React.FC<{ name: string }> = ({ name }) => (
  <div className="flex items-center gap-8 md:gap-12">
    <span className="text-lg md:text-2xl font-bold text-gray-700 uppercase tracking-wider hover:text-white transition-colors duration-300 cursor-default select-none">
      {name}
    </span>
    <span className="text-gray-800 text-base md:text-lg select-none">•</span>
  </div>
);