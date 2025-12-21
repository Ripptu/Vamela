import React, { useState, useRef, useEffect } from 'react';
import { Monitor, Layers, Code2, PenTool, LayoutTemplate, Printer, CreditCard, Utensils, ExternalLink, Cpu, MoveLeft, MoveRight, Smartphone, Tablet, Laptop } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types & Data ---

type ServiceMode = 'web' | 'graphic';

interface ServiceDetail {
  id: string;
  title: string;
  desc: string;
  icon: React.ElementType;
}

const webServices: ServiceDetail[] = [
  { 
    id: 'onepager', 
    title: 'Günstige Onepager Website', 
    desc: 'Eine Seite, ein Ziel: Verkaufen. Perfekt, wenn du eine professionelle Website günstig erstellen lassen möchtest. Ideal für Launches & Events.',
    icon: LayoutTemplate
  },
  { 
    id: 'corporate', 
    title: 'Firmen Website kaufen', 
    desc: 'Mehrseitige, skalierbare Architekturen für Unternehmen. CMS-basiert (selbst pflegbar), SEO-optimiert und sicher.',
    icon: Monitor
  },
  { 
    id: 'tech', 
    title: 'React & Next.js Dev', 
    desc: 'Kein Baukasten-Limit. Ich programmiere individuelle Web-Apps, Kalkulatoren und interaktive Erlebnisse, die WordPress nicht kann.',
    icon: Code2
  }
];

const graphicServices: ServiceDetail[] = [
  { 
    id: 'branding', 
    title: 'Logo Design & Identity', 
    desc: 'Das Gesicht deiner Marke. Einzigartige Logos kaufen, die Professionalität ausstrahlen und im Gedächtnis bleiben.',
    icon: Layers
  },
  { 
    id: 'print', 
    title: 'Flyer & Broschüren', 
    desc: 'Printmedien, die nicht im Müll landen. Hochwertige Haptik und klares Layout für deine Werbebotschaft.',
    icon: Printer
  },
  { 
    id: 'cards', 
    title: 'Visitenkarten Design', 
    desc: 'Der erste Eindruck zählt. Veredelte Visitenkarten mit modernem Layout, die man gerne in die Hand nimmt.',
    icon: CreditCard
  },
  { 
    id: 'menu', 
    title: 'Speisekarten Gestaltung', 
    desc: 'Appetit auf den ersten Blick. Stilvolles Gastronomie-Design für Restaurants, Bars und Cafés.',
    icon: Utensils
  }
];

// --- Shared Data (from Hero) ---
const REFERENCE_LOGOS = [
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
  "https://www.inkyy.com/wp-content/uploads/2018/12/suitcase.png",
  "https://i.postimg.cc/mDKysVKh/ssss.png"
];

// --- Components ---

const ServiceList = ({ items, color }: { items: ServiceDetail[], color: string }) => (
  <div className="space-y-6">
    {items.map((item, idx) => (
      <motion.div 
        key={item.id}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: idx * 0.1 }}
        className="group relative pl-6 border-l border-white/10 hover:border-white/30 transition-colors"
      >
         <div className={`absolute left-[-1px] top-0 bottom-0 w-[1px] bg-${color}-500 scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300`} />
         
         <div className="flex items-center gap-3 mb-2">
            <item.icon className={`w-5 h-5 text-${color}-500`} />
            <h3 className="text-lg font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                {item.title}
            </h3>
         </div>
         {/* Rule 4: Use white with opacity */}
         <p className="text-sm text-white/50 leading-relaxed max-w-md">
            {item.desc}
         </p>
      </motion.div>
    ))}
  </div>
);

const WebProjectsVisual = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const projects = [
        { 
            title: "Thomas Rott", 
            url: "https://thomasrott.de",
            displayUrl: "thomasrott.de",
            category: "Portfolio",
        },
        { 
            title: "Neustädter Barber", 
            url: "https://barbermoosburg.netlify.app", 
            displayUrl: "barbermoosburg.app",
            category: "Business",
        },
        { 
            title: "Coremis", 
            url: "https://coremis2.netlify.app", 
            displayUrl: "coremis2.app",
            category: "Corporate",
        }
    ];

    const activeProject = projects[activeIndex];

    return (
        <div className="w-full h-full flex flex-col gap-8 justify-center items-center">
             
             {/* MacBook Mockup */}
             <div className="relative group w-full max-w-[650px] mx-auto perspective-[2000px]">
                
                {/* 1. The Screen Lid */}
                <div className="relative w-full aspect-[16/10] bg-[#0d0d0d] rounded-t-[18px] rounded-b-[6px] shadow-2xl border-[3px] border-[#1a1a1a] ring-1 ring-white/10 overflow-hidden transform-gpu transition-transform duration-500 group-hover:rotate-x-1">
                    
                    {/* Bezel & Content */}
                    <div className="absolute inset-[3px] sm:inset-[8px] bg-black rounded-[10px] sm:rounded-[12px] overflow-hidden relative border border-white/5">
                        
                        {/* Notch */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[16%] h-[16px] sm:h-[22px] bg-black z-50 rounded-b-lg flex justify-center items-center">
                             {/* Camera Dot */}
                             <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#1a1a1a] border border-[#222]"></div>
                        </div>

                        {/* Iframe Container - SCALED FOR DESKTOP VIEW */}
                        <div className="w-full h-full relative bg-white">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeProject.url}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="w-[200%] h-[200%] origin-top-left scale-[0.5]"
                                >
                                    <iframe
                                        src={activeProject.url}
                                        className="w-full h-full border-none"
                                        title={activeProject.title}
                                        loading="lazy"
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Gloss Overlay */}
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-transparent z-40 opacity-50" />
                </div>

                {/* 2. The Base (Keyboard Area Hinge) */}
                <div className="relative mx-auto w-[104%] -ml-[2%] h-[14px] bg-[#1a1a1a] rounded-b-[16px] rounded-t-[2px] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.6)] border-t border-[#333] flex justify-center">
                     {/* Thumb Indent */}
                     <div className="w-[15%] h-[4px] bg-[#0d0d0d] rounded-b-md border-t border-white/5"></div>
                </div>

             </div>

             {/* Project Switcher Tabs */}
             <div className="w-full max-w-[650px] grid grid-cols-3 gap-3">
                 {projects.map((p, i) => (
                     <button
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        className={`p-3 rounded-lg border transition-all text-left group ${
                            activeIndex === i 
                            ? 'bg-white/10 border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.1)]' // Rule 5: Obvious state
                            : 'bg-white/[0.03] border-white/5 hover:border-white/20' // Rule 1: Tinted black
                        }`}
                     >
                         <div className={`text-xs font-bold mb-0.5 transition-colors ${activeIndex === i ? 'text-white' : 'text-white/60 group-hover:text-white/80'}`}>
                             {p.title}
                         </div>
                         <div className="flex items-center justify-between">
                            <span className="text-[10px] text-white/40 font-mono hidden sm:inline">{p.category}</span>
                            {activeIndex === i && <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />}
                         </div>
                     </button>
                 ))}
             </div>

             {/* Link */}
             <div className="w-full max-w-[650px] flex justify-end">
                <a 
                    href={activeProject.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-white/50 hover:text-white flex items-center gap-2 transition-colors"
                >
                    <Laptop className="w-3 h-3" /> Website besuchen <ExternalLink className="w-3 h-3" />
                </a>
             </div>
        </div>
    );
};

const GraphicReferencesVisual = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);

    // Calculate draggable constraints based on content
    useEffect(() => {
        if (containerRef.current) {
            // Rough estimation: (Card Width 200 + Gap 24) * Count - Container Width
            const contentWidth = REFERENCE_LOGOS.length * 224 + 150; // +150 for end card
            setWidth(contentWidth - containerRef.current.offsetWidth);
        }
    }, []);

    return (
        <div className="w-full h-full bg-[#0A0A0C] rounded-xl border border-white/10 relative overflow-hidden flex flex-col shadow-2xl">
             {/* Background Texture - Rule 2: Blending modes */}
             <div className="absolute inset-0 bg-[#0A0A0C]" />
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,165,0,0.08),transparent_70%)] mix-blend-screen" />
             
             {/* Header */}
             <div className="relative z-10 p-6 flex justify-between items-center border-b border-white/5 bg-[#0A0A0C]/80 backdrop-blur-sm">
                 <div className="flex items-center gap-2 text-xs text-orange-400 font-mono uppercase tracking-widest">
                    <Layers className="w-4 h-4" /> Branding Gallery
                 </div>
                 <div className="flex items-center gap-2 text-white/40 text-[10px] uppercase tracking-wide">
                     <MoveLeft className="w-3 h-3" /> Swipe <MoveRight className="w-3 h-3" />
                 </div>
             </div>

             {/* Swipable Carousel */}
             <div className="flex-1 relative overflow-hidden flex items-center" ref={containerRef}>
                <motion.div 
                    drag="x"
                    dragConstraints={{ left: -3000, right: 0 }} // Large negative value to ensure full scroll
                    whileTap={{ cursor: "grabbing" }}
                    className="flex gap-6 px-8 cursor-grab active:cursor-grabbing items-center"
                >
                    {REFERENCE_LOGOS.map((src, idx) => (
                        <motion.div
                            key={idx}
                            className="relative min-w-[200px] h-[200px] rounded-2xl overflow-hidden group border border-white/10 bg-white/[0.03] shadow-xl shrink-0"
                            whileHover={{ scale: 1.05, y: -5 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Darken Overlay initially */}
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                            
                            {/* The Image */}
                            <img 
                                src={src} 
                                alt={`Graphic Design Reference ${idx}`}
                                className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                            />

                            {/* Hover Badge */}
                            <div className="absolute bottom-3 left-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                                <span className="px-2 py-1 bg-white text-black text-[10px] font-bold rounded shadow-lg uppercase tracking-wide">
                                    Project {idx + 1}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                    
                    {/* End Card */}
                    <div className="min-w-[150px] flex flex-col items-center justify-center gap-2 opacity-50 shrink-0">
                        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                            <PenTool className="w-5 h-5 text-white/40" />
                        </div>
                        <span className="text-xs text-white/40 uppercase tracking-widest">Dein Projekt?</span>
                    </div>

                </motion.div>
             </div>

             {/* UI Overlay Label */}
             <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-black/50 border border-white/10 backdrop-blur-md text-[10px] text-white/60 uppercase tracking-widest z-40 pointer-events-none">
                Interactive Showcase
             </div>
        </div>
    );
};

export const Features: React.FC = () => {
  const [mode, setMode] = useState<ServiceMode>('web');

  return (
    <section id="services" className="py-24 px-6 bg-[#020204] relative overflow-hidden min-h-screen flex items-center">
      
      {/* Dynamic Background based on Mode */}
      <AnimatePresence>
        {mode === 'web' && (
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,255,100,0.06),transparent_50%)] pointer-events-none mix-blend-screen"
            />
        )}
        {mode === 'graphic' && (
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,100,0,0.06),transparent_50%)] pointer-events-none mix-blend-screen"
            />
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Header Area */}
        <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Deine digitale <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">
                    Vollausstattung.
                </span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
                Wähle deinen Fokus. Website kaufen oder Branding gestalten lassen? Ich liefere spezialisierte Lösungen in zwei Kernbereichen.
            </p>
        </div>

        {/* THE COMMAND CENTER INTERFACE - Rule 1: Lighter Black / Tinted */}
        <div className="bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:min-h-[500px]">
            
            {/* Top Bar / Switcher */}
            <div className="flex border-b border-white/5">
                <button 
                    onClick={() => setMode('web')}
                    className={`flex-1 py-6 text-sm md:text-base font-bold uppercase tracking-widest transition-all relative ${mode === 'web' ? 'text-white bg-white/5 shadow-[inset_0_-2px_20px_rgba(255,255,255,0.05)]' : 'text-white/40 hover:text-white/70 hover:bg-white/[0.02]'}`}
                >
                    <div className="flex items-center justify-center gap-3">
                        <Code2 className={`w-5 h-5 ${mode === 'web' ? 'text-green-500' : 'text-white/30'}`} />
                        Web Development
                    </div>
                    {mode === 'web' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500 shadow-[0_0_10px_rgb(34,197,94)]" />}
                </button>
                <div className="w-[1px] bg-white/5" />
                <button 
                    onClick={() => setMode('graphic')}
                    className={`flex-1 py-6 text-sm md:text-base font-bold uppercase tracking-widest transition-all relative ${mode === 'graphic' ? 'text-white bg-white/5 shadow-[inset_0_-2px_20px_rgba(255,255,255,0.05)]' : 'text-white/40 hover:text-white/70 hover:bg-white/[0.02]'}`}
                >
                    <div className="flex items-center justify-center gap-3">
                        {/* Rule 3: Desaturate orange */}
                        <PenTool className={`w-5 h-5 ${mode === 'graphic' ? 'text-orange-400' : 'text-white/30'}`} />
                        Graphic Design
                    </div>
                    {mode === 'graphic' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-400 shadow-[0_0_10px_rgb(251,146,60)]" />}
                </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-6 md:p-12 relative">
                <AnimatePresence mode="wait">
                    
                    {/* WEB MODE CONTENT */}
                    {mode === 'web' && (
                        <motion.div 
                            key="web"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="grid lg:grid-cols-2 gap-12 h-full items-center"
                        >
                            <div className="order-2 lg:order-1">
                                <div className="inline-block px-3 py-1 mb-6 rounded bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-mono font-bold shadow-[0_0_10px_rgba(34,197,94,0.1)]">
                                    SYSTEM STATUS: ONLINE
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-4">
                                    Websites, die arbeiten. <br/>
                                    <span className="text-white/50">Und verkaufen.</span>
                                </h3>
                                <p className="text-white/60 mb-8 leading-relaxed">
                                    Deine Website ist dein bester Mitarbeiter. Sie muss schnell sein, bei Google gefunden werden und Besucher psychologisch zur Anfrage führen. Du willst eine Website günstig erstellen lassen, die trotzdem High-End performt? Dann bist du hier richtig.
                                </p>
                                <ServiceList items={webServices} color="green" />
                            </div>
                            <div className="order-1 lg:order-2 flex flex-col justify-center">
                                <WebProjectsVisual />
                            </div>
                        </motion.div>
                    )}

                    {/* GRAPHIC MODE CONTENT */}
                    {mode === 'graphic' && (
                        <motion.div 
                            key="graphic"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="grid lg:grid-cols-2 gap-12 h-full items-center"
                        >
                            <div className="order-2 lg:order-1">
                                {/* Rule 3: Orange-400 instead of 500 */}
                                <div className="inline-block px-3 py-1 mb-6 rounded bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono font-bold shadow-[0_0_10px_rgba(251,146,60,0.1)]">
                                    VISUAL IMPACT: HIGH
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-4">
                                    Design, das hängen bleibt. <br/>
                                    <span className="text-white/50">In Millisekunden.</span>
                                </h3>
                                <p className="text-white/60 mb-8 leading-relaxed">
                                    Menschen kaufen mit den Augen. Ob Speisekarte, Logo oder Visitenkarte: Ich gestalte Visuals, die Vertrauen schaffen und deine Marke wertvoll aussehen lassen.
                                </p>
                                <ServiceList items={graphicServices} color="orange" />
                            </div>
                            <div className="order-1 lg:order-2 h-[400px] lg:h-[500px]">
                                <GraphicReferencesVisual />
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12 flex justify-center items-center gap-2 text-white/40 text-sm font-mono">
            <Cpu className="w-4 h-4" />
            <span>Beide Disziplinen greifen nahtlos ineinander.</span>
        </div>

      </div>
    </section>
  );
};