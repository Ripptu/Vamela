import React from 'react';
import { PenTool, MoveDiagonal } from 'lucide-react';
import { DraggableContainer, GridBody, GridItem } from './ui/infinite-drag-scroll';

// Using only project-specific assets found in the codebase
// Repeated to fill the grid for the infinite scroll effect
const GALLERY_ITEMS = [
  { image: "https://i.postimg.cc/MKfgVYQk/html.png", text: "VAMELA" },
  { image: "https://i.postimg.cc/mDKysVKh/ssss.png", text: "Signet" },
  { image: "https://i.postimg.cc/MKfgVYQk/html.png", text: "Corporate" },
  { image: "https://i.postimg.cc/mDKysVKh/ssss.png", text: "Identity" },
  { image: "https://i.postimg.cc/MKfgVYQk/html.png", text: "Brand" },
  { image: "https://i.postimg.cc/mDKysVKh/ssss.png", text: "Symbol" },
  { image: "https://i.postimg.cc/MKfgVYQk/html.png", text: "Design" },
  { image: "https://i.postimg.cc/mDKysVKh/ssss.png", text: "Vektoren" },
  { image: "https://i.postimg.cc/MKfgVYQk/html.png", text: "Logomark" },
  { image: "https://i.postimg.cc/mDKysVKh/ssss.png", text: "Icon" },
  { image: "https://i.postimg.cc/MKfgVYQk/html.png", text: "Studio" },
  { image: "https://i.postimg.cc/mDKysVKh/ssss.png", text: "Graphic" },
];

export const LogoPortfolio: React.FC = () => {
  return (
    <section className="relative bg-[#020204] border-t border-white/5 overflow-hidden h-screen">
      
      {/* Header Overlay */}
      <div className="absolute top-0 left-0 right-0 z-30 pt-10 md:pt-20 px-6 text-center pointer-events-none">
         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-orange-500 font-medium mb-4 backdrop-blur-sm">
             <PenTool className="w-3 h-3" /> INFINITE GALLERY
         </div>
         <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 shadow-black drop-shadow-md">
             Visuelle Identitäten
         </h2>
         <p className="text-white/60 text-sm max-w-lg mx-auto flex items-center gap-2 justify-center shadow-black drop-shadow-md">
             <MoveDiagonal className="w-4 h-4" /> 
             Drag to explore
         </p>
      </div>

      {/* Top Gradient Fade */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#020204] via-[#020204]/80 to-transparent z-20 pointer-events-none" />

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#020204] via-[#020204]/80 to-transparent z-20 pointer-events-none" />

      {/* Infinite Drag Container */}
      <DraggableContainer variant="masonry" className="bg-[#020204]">
        <GridBody>
           {GALLERY_ITEMS.map((item, index) => (
             <GridItem key={index} className="relative h-48 w-full md:h-80 md:w-64 bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors">
                {/* 
                    UPDATED: Used 'object-contain' and 'p-8' padding.
                    This is crucial for Logos to ensure they aren't cropped 
                    and have breathing room.
                */}
                <img
                  src={item.image}
                  alt={item.text}
                  className="pointer-events-none absolute inset-0 h-full w-full object-contain p-10 opacity-60 hover:opacity-100 transition-opacity duration-500 grayscale hover:grayscale-0"
                  loading="lazy"
                />
                
                {/* Subtle Text Label on Hover */}
                <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 hover:opacity-100 transition-opacity duration-300 flex justify-center">
                    <span className="text-white/40 font-mono text-[10px] uppercase tracking-widest bg-black/50 px-2 py-1 rounded">{item.text}</span>
                </div>
             </GridItem>
           ))}
        </GridBody>
      </DraggableContainer>

    </section>
  );
};