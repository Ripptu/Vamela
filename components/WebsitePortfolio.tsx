import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Code2, ArrowUpRight } from 'lucide-react';
import { cn } from '../lib/utils';

interface Project {
  id: string;
  title: string;
  category: string;
  url: string;
  description: string;
  className?: string; // For Bento sizing
  gradient: string;
  isExternalLink?: boolean;
}

const PROJECTS: Project[] = [
  { 
    id: 'barber', 
    title: "Barber Moosburg", 
    category: "Dienstleistung", 
    url: "https://barbermoosburg.netlify.app",
    description: "Dark Mode Design mit Termin-Buchungssystem. Stilvoll und effektiv.",
    className: "md:col-span-2 md:row-span-2", // Big feature item
    gradient: "from-gray-500/20 via-gray-900/10 to-transparent"
  },
  { 
    id: 'pushmma', 
    title: "Push MMA", 
    category: "Sport & Verein", 
    url: "https://pushmma.netlify.app", 
    description: "Kompletter Relaunch mit Kursplan-Integration und Mitgliederbereich.",
    className: "md:col-span-1 md:row-span-1",
    gradient: "from-red-500/20 via-red-900/10 to-transparent"
  },
  { 
    id: 'kleeb', 
    title: "Kleeb Bau", 
    category: "Handwerk & Bau", 
    url: "https://kleeb.netlify.app",
    description: "Seriosität trifft Moderne. Lead-Generierung für Bauprojekte.",
    className: "md:col-span-1 md:row-span-1",
    gradient: "from-yellow-500/20 via-yellow-900/10 to-transparent"
  },
  { 
    id: 'thomasrott', 
    title: "Thomas Rott", 
    category: "Portfolio", 
    url: "https://thomasrott.de",
    description: "Minimalismus pur für kreative Freelancer.",
    className: "md:col-span-1 md:row-span-2",
    gradient: "from-blue-500/20 via-blue-900/10 to-transparent"
  },
  { 
    id: 'coremis', 
    title: "Coremis", 
    category: "Corporate", 
    url: "https://coremis2.netlify.app",
    description: "Mehrsprachige Corporate Identity Plattform.",
    className: "md:col-span-1 md:row-span-1",
    gradient: "from-purple-500/20 via-purple-900/10 to-transparent"
  },
  { 
    id: 'comingsoon', 
    title: "Dein Projekt?", 
    category: "Next Up", 
    url: "https://wa.me/4917624200179?text=Hi%20Christian,%20ich%20habe%20Interesse%20an%20einem%20Projekt!",
    description: "Lass uns gemeinsam etwas Großartiges bauen. Schreib mir via WhatsApp.",
    className: "md:col-span-1 md:row-span-1",
    gradient: "from-green-500/20 via-green-900/10 to-transparent",
    isExternalLink: true
  }
];

export const WebsitePortfolio: React.FC = () => {
  return (
    <section className="py-20 md:py-32 px-4 md:px-6 bg-[#020204] relative">
      
      <div className="max-w-7xl mx-auto mb-16">
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
             <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-xs text-green-400 font-medium mb-6">
                    <Code2 className="w-3 h-3" /> WEB DEVELOPMENT
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                    Ausgewählte <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
                        Meisterwerke.
                    </span>
                </h2>
             </div>
             <p className="text-white/60 max-w-sm text-sm md:text-base leading-relaxed">
                Jedes Pixel hat einen Zweck. Entdecke Websites, die nicht nur gut aussehen, sondern performen.
             </p>
         </div>

         {/* BENTO GRID */}
         <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-4 h-auto md:h-[800px]">
            {PROJECTS.map((project, idx) => (
                <motion.a
                    key={project.id}
                    href={project.url}
                    target={project.isExternalLink || project.url.startsWith('http') ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className={cn(
                        "group relative rounded-3xl overflow-hidden border border-white/10 bg-[#0A0A0C] hover:border-white/20 transition-all duration-500 flex flex-col",
                        project.className
                    )}
                >
                    {/* Background Gradient */}
                    <div className={cn("absolute inset-0 bg-gradient-to-br opacity-50 group-hover:opacity-100 transition-opacity duration-500", project.gradient)} />
                    
                    {/* Iframe / Image Preview - Simulating a live window */}
                    <div className="absolute top-16 left-6 right-6 bottom-0 rounded-t-xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.02] group-hover:-translate-y-2 border border-white/10 bg-[#020204]">
                        {/* Fake Browser Bar */}
                        <div className="h-6 bg-[#1a1a1a] flex items-center px-3 gap-1.5 border-b border-white/5">
                            <div className="w-2 h-2 rounded-full bg-red-500/50" />
                            <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                            <div className="w-2 h-2 rounded-full bg-green-500/50" />
                        </div>
                        {/* Iframe Content */}
                        <div className="w-full h-full bg-white relative">
                             {project.id === 'comingsoon' ? (
                                 <div className="w-full h-full bg-[#0A0A0C] flex flex-col items-center justify-center text-white/20 font-bold text-2xl uppercase gap-4">
                                    <span>VAMELA</span>
                                    <div className="px-4 py-2 rounded-full border border-green-500/20 bg-green-500/10 text-green-500 text-xs flex items-center gap-2">
                                        WhatsApp Chat
                                    </div>
                                 </div>
                             ) : (
                                <iframe 
                                    src={project.url} 
                                    title={project.title}
                                    className="w-[200%] h-[200%] border-0 transform scale-50 origin-top-left pointer-events-none grayscale group-hover:grayscale-0 transition-all duration-700"
                                    loading="lazy"
                                />
                             )}
                             {/* Click Overlay */}
                             <div className="absolute inset-0 z-10 bg-transparent" />
                        </div>
                    </div>

                    {/* Content Overlay (Text) */}
                    <div className="relative z-20 p-6 flex flex-col h-full pointer-events-none">
                        <div className="flex justify-between items-start mb-auto">
                            <div className="inline-block px-2 py-1 bg-black/50 backdrop-blur-md rounded border border-white/10 text-[10px] font-mono uppercase tracking-wider text-white/70">
                                {project.category}
                            </div>
                            <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                                <ArrowUpRight className="w-4 h-4" />
                            </div>
                        </div>

                        <div className="mt-auto pt-32 md:pt-0"> {/* Ensure spacing on mobile */}
                            <h3 className="text-xl font-bold text-white mb-1 drop-shadow-md">{project.title}</h3>
                            <p className="text-sm text-white/60 line-clamp-2 drop-shadow-md max-w-[90%]">
                                {project.description}
                            </p>
                        </div>
                    </div>
                </motion.a>
            ))}
         </div>

      </div>
    </section>
  );
};