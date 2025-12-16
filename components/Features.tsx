import React, { useState, useRef } from 'react';
import { Monitor, Layers, Code2, PenTool, LayoutTemplate, Printer, CreditCard, Utensils, ExternalLink, Cpu, MoveLeft, MoveRight } from 'lucide-react';
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
         <p className="text-sm text-gray-400 leading-relaxed max-w-md">
            {item.desc}
         </p>
      </motion.div>
    ))}
  </div>
);

const WebProjectsVisual = () => {
    const projects = [
        { 
            title: "Thomas Rott", 
            url: "https://thomasrott.de",
            displayUrl: "thomasrott.de",
            category: "Portfolio & Corporate",
            status: "Live",
            color: "emerald"
        },
        { 
            title: "Neustädter Barber", 
            url: "https://barbermoosburg.netlify.app", 
            displayUrl: "barbermoosburg.app",
            category: "Barbershop Website",
            status: "Live",
             color: "orange"
        },
        { 
            title: "Startup X", 
            url: "#", 
            displayUrl: "startup-x.io",
            category: "SaaS Landing Page",
            status: "In Dev",
             color: "blue"
        }
    ];

    return (
        <div className="w-full h-full flex flex-col justify-center gap-4 px-4 sm:px-0">
             <div className="text-sm text-gray-500 font-mono mb-2 uppercase tracking-widest pl-1">Ausgewählte Projekte</div>
             {projects.map((p, i) => (
                <a 
                    key={i} 
                    href={p.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-5 rounded-xl border border-white/10 bg-[#0A0A0C] hover:bg-white/5 hover:border-green-500/30 transition-all duration-300 hover:scale-[1.01]"
                >
                    <div className="flex flex-col">
                        <span className="text-white font-bold text-lg group-hover:text-green-400 transition-colors">{p.title}</span>
                        <span className="text-xs text-gray-500 font-mono mt-0.5">{p.category}</span>
                    </div>
                    <div className="flex items-center gap-3">
                         <span className="text-xs text-gray-600 hidden sm:block font-mono">{p.displayUrl}</span>
                         <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-green-500/20 group-hover:text-green-400 transition-all">
                             <ExternalLink className="w-4 h-4" />
                         </div>
                    </div>
                </a>
             ))}
        </div>
    );
};

const GraphicReferencesVisual = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div className="w-full h-full bg-[#1A1A1D] rounded-xl border border-white/10 relative overflow-hidden flex flex-col shadow-2xl">
             {/* Background Texture */}
             <div className="absolute inset-0 bg-[#1A1A1D]" />
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,165,0,0.05),transparent_70%)]" />
             
             {/* Header */}
             <div className="relative z-10 p-6 flex justify-between items-center border-b border-white/5 bg-[#1A1A1D]/80 backdrop-blur-sm">
                 <div className="flex items-center gap-2 text-xs text-orange-500 font-mono uppercase tracking-widest">
                    <Layers className="w-4 h-4" /> Branding Gallery
                 </div>
                 <div className="flex items-center gap-2 text-gray-500 text-[10px] uppercase tracking-wide">
                     <MoveLeft className="w-3 h-3" /> Swipe <MoveRight className="w-3 h-3" />
                 </div>
             </div>

             {/* Swipable Carousel */}
             <div className="flex-1 relative overflow-hidden flex items-center" ref={containerRef}>
                <motion.div 
                    drag="x"
                    dragConstraints={{ left: -1000, right: 0 }} // Simplified constraints allowing free movement
                    whileTap={{ cursor: "grabbing" }}
                    className="flex gap-6 px-8 cursor-grab active:cursor-grabbing items-center"
                >
                    {REFERENCE_LOGOS.map((src, idx) => (
                        <motion.div
                            key={idx}
                            className="relative min-w-[200px] h-[200px] rounded-2xl overflow-hidden group border border-white/10 bg-[#0F0F11] shadow-xl"
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
                    <div className="min-w-[150px] flex flex-col items-center justify-center gap-2 opacity-50">
                        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                            <PenTool className="w-5 h-5 text-gray-400" />
                        </div>
                        <span className="text-xs text-gray-500 uppercase tracking-widest">Dein Projekt?</span>
                    </div>

                </motion.div>
             </div>

             {/* UI Overlay Label */}
             <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-black/50 border border-white/10 backdrop-blur-md text-[10px] text-gray-400 uppercase tracking-widest z-40 pointer-events-none">
                Interactive Showcase
             </div>
        </div>
    );
};

export const Features: React.FC = () => {
  const [mode, setMode] = useState<ServiceMode>('web');

  return (
    <section id="services" className="py-24 px-6 bg-[#050505] relative overflow-hidden min-h-screen flex items-center">
      
      {/* Dynamic Background based on Mode */}
      <AnimatePresence>
        {mode === 'web' && (
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,255,100,0.03),transparent_50%)] pointer-events-none"
            />
        )}
        {mode === 'graphic' && (
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,100,0,0.03),transparent_50%)] pointer-events-none"
            />
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Header Area */}
        <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Deine digitale <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">
                    Vollausstattung.
                </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Wähle deinen Fokus. Website kaufen oder Branding gestalten lassen? Ich liefere spezialisierte Lösungen in zwei Kernbereichen.
            </p>
        </div>

        {/* THE COMMAND CENTER INTERFACE */}
        <div className="bg-[#0F0F11] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:min-h-[500px]">
            
            {/* Top Bar / Switcher */}
            <div className="flex border-b border-white/5">
                <button 
                    onClick={() => setMode('web')}
                    className={`flex-1 py-6 text-sm md:text-base font-bold uppercase tracking-widest transition-all relative ${mode === 'web' ? 'text-white bg-white/5' : 'text-gray-600 hover:text-gray-400 hover:bg-white/[0.02]'}`}
                >
                    <div className="flex items-center justify-center gap-3">
                        <Code2 className={`w-5 h-5 ${mode === 'web' ? 'text-green-500' : 'text-gray-600'}`} />
                        Web Development
                    </div>
                    {mode === 'web' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500" />}
                </button>
                <div className="w-[1px] bg-white/5" />
                <button 
                    onClick={() => setMode('graphic')}
                    className={`flex-1 py-6 text-sm md:text-base font-bold uppercase tracking-widest transition-all relative ${mode === 'graphic' ? 'text-white bg-white/5' : 'text-gray-600 hover:text-gray-400 hover:bg-white/[0.02]'}`}
                >
                    <div className="flex items-center justify-center gap-3">
                        <PenTool className={`w-5 h-5 ${mode === 'graphic' ? 'text-orange-500' : 'text-gray-600'}`} />
                        Graphic Design
                    </div>
                    {mode === 'graphic' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500" />}
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
                                <div className="inline-block px-3 py-1 mb-6 rounded bg-green-900/20 border border-green-500/20 text-green-400 text-xs font-mono font-bold">
                                    SYSTEM STATUS: ONLINE
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-4">
                                    Websites, die arbeiten. <br/>
                                    <span className="text-gray-500">Und verkaufen.</span>
                                </h3>
                                <p className="text-gray-400 mb-8 leading-relaxed">
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
                                <div className="inline-block px-3 py-1 mb-6 rounded bg-orange-900/20 border border-orange-500/20 text-orange-400 text-xs font-mono font-bold">
                                    VISUAL IMPACT: HIGH
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-4">
                                    Design, das hängen bleibt. <br/>
                                    <span className="text-gray-500">In Millisekunden.</span>
                                </h3>
                                <p className="text-gray-400 mb-8 leading-relaxed">
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
        <div className="text-center mt-12 flex justify-center items-center gap-2 opacity-50 text-sm font-mono">
            <Cpu className="w-4 h-4" />
            <span>Beide Disziplinen greifen nahtlos ineinander.</span>
        </div>

      </div>
    </section>
  );
};