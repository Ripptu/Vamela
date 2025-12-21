import React from 'react';
import { Instagram, ArrowUp, Mail } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
  // Note: We could add onOpenContact here, but for the footer email link, 
  // sometimes users actually expect a mailto. 
  // However, keeping it consistent with the user request:
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#020204] relative pt-20 pb-10 px-6 overflow-hidden">
      {/* Massive Background Text Decoration */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none select-none overflow-hidden flex justify-center opacity-[0.03]">
          <span className="text-[15vw] md:text-[18vw] font-black leading-none text-white whitespace-nowrap -mb-[4vw]">
            VAMELA
          </span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 border-t border-white/10 pt-20">
        
        <div className="grid lg:grid-cols-2 gap-16 mb-24">
            
            {/* Left: Massive CTA */}
            <div>
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter mb-8 leading-[0.9]">
                    Let's make <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-white">
                        it happen.
                    </span>
                </h2>
                <div className="flex flex-col md:flex-row gap-6 mt-12">
                     <a 
                        href="mailto:stockmeier.ch@gmail.com" 
                        className="group flex items-center gap-4 text-xl md:text-2xl text-white font-medium hover:text-orange-400 transition-colors"
                     >
                        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-orange-400 group-hover:border-orange-400 group-hover:text-black transition-all">
                            <Mail className="w-5 h-5" />
                        </div>
                        stockmeier.ch@gmail.com
                     </a>
                </div>
            </div>

            {/* Right: Navigation Links */}
            <div className="flex flex-col md:flex-row gap-12 lg:justify-end items-start pt-4">
                <div className="space-y-6">
                    <h4 className="text-xs font-mono text-white/40 uppercase tracking-widest">Menu</h4>
                    <ul className="space-y-3 text-lg font-medium text-white/80">
                        <li><button onClick={() => onNavigate('home')} className="hover:text-white hover:translate-x-2 transition-transform block">Startseite</button></li>
                        <li><button onClick={() => {onNavigate('home'); setTimeout(() => document.getElementById('services')?.scrollIntoView({behavior:'smooth'}), 100)}} className="hover:text-white hover:translate-x-2 transition-transform block">Leistungen</button></li>
                        <li><button onClick={() => {onNavigate('home'); setTimeout(() => document.getElementById('about')?.scrollIntoView({behavior:'smooth'}), 100)}} className="hover:text-white hover:translate-x-2 transition-transform block">Über Mich</button></li>
                    </ul>
                </div>

                <div className="space-y-6">
                    <h4 className="text-xs font-mono text-white/40 uppercase tracking-widest">Socials</h4>
                    <ul className="space-y-3 text-lg font-medium text-white/80">
                        <li>
                            <a href="https://instagram.com/vamela_studio" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:translate-x-2 transition-transform block">
                                Instagram
                            </a>
                        </li>
                        <li>
                            <a href="https://wa.me/4917624200179" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:translate-x-2 transition-transform block">
                                WhatsApp
                            </a>
                        </li>
                    </ul>
                </div>
                
                 <div className="space-y-6">
                    <h4 className="text-xs font-mono text-white/40 uppercase tracking-widest">Rechtliches</h4>
                    <ul className="space-y-3 text-lg font-medium text-white/80">
                        <li><button onClick={() => onNavigate('impressum')} className="hover:text-white hover:translate-x-2 transition-transform block">Impressum</button></li>
                        <li><button onClick={() => onNavigate('datenschutz')} className="hover:text-white hover:translate-x-2 transition-transform block">Datenschutz</button></li>
                    </ul>
                </div>
            </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/5 pt-8">
            <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                 <span className="text-xs text-white/40 uppercase tracking-wider font-mono">Systems Operational</span>
            </div>
            
            <div className="text-xs text-white/40 font-mono">
                © {currentYear} VAMELA STUDIO. MADE IN GERMANY.
            </div>

            <button 
                onClick={scrollToTop} 
                className="group flex items-center gap-2 text-xs font-bold text-white uppercase tracking-widest hover:text-orange-400 transition-colors"
            >
                Back to Top 
                <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            </button>
        </div>
      </div>
    </footer>
  );
};