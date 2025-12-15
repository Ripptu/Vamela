import React, { useState } from 'react';
import { Monitor, Layers, Code2, PenTool, LayoutTemplate, Printer, CreditCard, Utensils, ExternalLink, Cpu } from 'lucide-react';
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
    title: 'High-Performance Onepager', 
    desc: 'Eine Seite, ein Ziel: Verkaufen. Perfekt für Launches, Events oder Personenmarken. Keine Ablenkung, pure Conversion.',
    icon: LayoutTemplate
  },
  { 
    id: 'corporate', 
    title: 'Corporate Websites', 
    desc: 'Mehrseitige, skalierbare Architekturen für Unternehmen. CMS-basiert (du kannst Texte ändern), SEO-optimiert und sicher.',
    icon: Monitor
  },
  { 
    id: 'tech', 
    title: 'React & Next.js Dev', 
    desc: 'Kein Baukasten-Limit. Ich code individuelle Funktionen, Kalkulatoren und interaktive Erlebnisse, die WordPress nicht kann.',
    icon: Code2
  }
];

const graphicServices: ServiceDetail[] = [
  { 
    id: 'branding', 
    title: 'Logo & Identity', 
    desc: 'Das Gesicht deiner Marke. Einzigartige Logos, die Professionalität ausstrahlen und im Gedächtnis bleiben.',
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
    title: 'Visitenkarten', 
    desc: 'Der erste Eindruck zählt. Veredelte Visitenkarten mit modernem Layout, die man gerne in die Hand nimmt.',
    icon: CreditCard
  },
  { 
    id: 'menu', 
    title: 'Speisekarten', 
    desc: 'Appetit auf den ersten Blick. Stilvolles Gastronomie-Design für Restaurants, Bars und Cafés.',
    icon: Utensils
  }
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
            title: "Architekturbüro H.", 
            url: "#", 
            displayUrl: "architektur-h.de",
            category: "Minimalist Architecture",
            status: "Concept",
             color: "gray"
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
    return (
        <div className="w-full h-full bg-[#1A1A1D] rounded-xl border border-white/10 relative overflow-hidden flex items-center justify-center shadow-2xl">
             {/* Background Texture */}
             <div className="absolute inset-0 bg-[#1A1A1D]" />
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_70%)]" />
             
             {/* 4 Floating Reference Placeholders - Refined "Paper" Look */}
             <div className="relative w-full h-full perspective-[800px]">
                 
                 {/* 1. Flyer - Portrait, White Paper style */}
                 <motion.div 
                    animate={{ y: [0, -10, 0], rotateZ: [-15, -12, -15] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-12 left-12 w-24 h-36 bg-white rounded shadow-xl flex flex-col p-2 z-10 origin-bottom-left will-change-transform"
                    style={{ rotate: -15 }}
                 >
                     <div className="w-full h-1/2 bg-gray-200 rounded-sm mb-2 overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-orange-400 to-red-500 opacity-80"></div>
                     </div>
                     <div className="w-full h-1.5 bg-gray-200 rounded-full mb-1"></div>
                     <div className="w-2/3 h-1.5 bg-gray-200 rounded-full mb-1"></div>
                     <div className="mt-auto flex justify-end">
                        <div className="w-4 h-4 rounded-full bg-black/10"></div>
                     </div>
                 </motion.div>

                 {/* 2. Logo - Square, High Contrast */}
                 <motion.div 
                    animate={{ y: [0, -15, 0], scale: [1, 1.05, 1] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute top-20 right-16 w-28 h-28 bg-[#000] rounded-xl border border-gray-800 shadow-2xl flex items-center justify-center z-20 will-change-transform"
                    style={{ rotate: 10 }}
                 >
                     <div className="w-16 h-16 border-2 border-white/20 rounded-full flex items-center justify-center">
                         <div className="w-8 h-8 border border-white/40 transform rotate-45"></div>
                     </div>
                 </motion.div>

                 {/* 3. Business Cards - Overlapping Stack */}
                 <motion.div 
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute bottom-24 left-24 z-30 will-change-transform"
                 >
                      {/* Card Bottom */}
                      <div className="absolute top-2 left-2 w-32 h-20 bg-gray-100 rounded shadow-md transform rotate-6 border border-gray-200"></div>
                      {/* Card Top */}
                      <div className="relative w-32 h-20 bg-white rounded shadow-xl transform -rotate-3 border border-gray-100 p-3 flex flex-col justify-between">
                          <div className="flex justify-between items-start">
                             <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                             <div className="w-8 h-1 bg-gray-200"></div>
                          </div>
                          <div>
                              <div className="w-16 h-1.5 bg-gray-800 mb-1"></div>
                              <div className="w-10 h-1 bg-gray-400"></div>
                          </div>
                      </div>
                 </motion.div>

                 {/* 4. Menu / Tall Card - Elegant */}
                 <motion.div 
                    animate={{ y: [0, -12, 0], rotateZ: [5, 8, 5] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="absolute bottom-10 right-24 w-20 h-40 bg-[#F5F5F0] rounded shadow-lg p-2 z-10 flex flex-col items-center border border-gray-200 will-change-transform"
                    style={{ rotate: 5 }}
                 >
                     <div className="text-[6px] tracking-[2px] uppercase mb-3 mt-1 text-gray-500 font-serif">Menu</div>
                     <div className="w-12 h-0.5 bg-black/10 mb-2"></div>
                     <div className="space-y-1.5 w-full px-1">
                         <div className="flex justify-between w-full"><div className="w-8 h-0.5 bg-gray-300"></div><div className="w-2 h-0.5 bg-gray-300"></div></div>
                         <div className="flex justify-between w-full"><div className="w-6 h-0.5 bg-gray-300"></div><div className="w-2 h-0.5 bg-gray-300"></div></div>
                         <div className="flex justify-between w-full"><div className="w-9 h-0.5 bg-gray-300"></div><div className="w-2 h-0.5 bg-gray-300"></div></div>
                     </div>
                 </motion.div>

             </div>

             {/* UI Overlay Label */}
             <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-black/50 border border-white/10 backdrop-blur-md text-[10px] text-gray-400 uppercase tracking-widest z-40">
                Print & Identity
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
                Wähle deinen Fokus. Ich liefere keine halben Sachen, sondern spezialisierte Lösungen in zwei Kernbereichen.
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
                                    <span className="text-gray-500">Nicht nur existieren.</span>
                                </h3>
                                <p className="text-gray-400 mb-8 leading-relaxed">
                                    Deine Website ist dein bester Mitarbeiter. Sie muss schnell sein, bei Google gefunden werden und Besucher psychologisch zur Anfrage führen. Ich programmiere individuelle Lösungen, keine Baukasten-Kompromisse.
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