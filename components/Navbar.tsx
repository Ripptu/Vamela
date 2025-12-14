import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LiquidButton } from './ui/LiquidButton';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-2 pointer-events-none">
      <motion.nav
        initial={{ width: "100%", y: -20, opacity: 0 }}
        animate={{ 
          width: isScrolled ? "auto" : "100%",
          y: 0,
          opacity: 1
        }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 20 }}
        className={`
          pointer-events-auto
          flex items-center justify-between
          transition-all duration-500 ease-in-out
          ${isScrolled 
            ? 'mx-auto px-2 pl-4 py-2 bg-[#0F0F11]/80 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.5)] gap-8' 
            : 'max-w-7xl px-6 py-0 bg-transparent border-none'
          }
        `}
      >
        {/* Logo Area */}
        <div 
            className="flex items-center gap-3 cursor-pointer group shrink-0" 
            onClick={() => onNavigate('home')}
        >
            <img 
              src="https://i.postimg.cc/MKfgVYQk/html.png" 
              alt="VAMELA Logo" 
              className={`object-contain transition-all duration-500 ${isScrolled ? 'h-8' : 'h-10 md:h-12'}`} 
            />
        </div>

        {/* Action Area */}
        <div className="flex items-center gap-3">
            {/* Contextual Link (Only visible when big) */}
            <AnimatePresence>
                {!isScrolled && (
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10, width: 0, overflow: 'hidden' }}
                        className="hidden md:flex items-center gap-6 mr-4"
                    >
                         {['Services', 'About', 'Contact'].map((item) => (
                           <button 
                            key={item}
                            onClick={() => onNavigate(item.toLowerCase())}
                            className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
                           >
                             {item}
                           </button>
                         ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <LiquidButton 
                href="https://wa.me/4917624200179"
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                className={`
                  transition-all duration-500
                  ${isScrolled ? 'px-4 py-2 text-xs' : 'px-6 py-2.5 text-sm'}
                `}
            >
              <MessageCircle className={`fill-current transition-all ${isScrolled ? 'w-3.5 h-3.5' : 'w-4 h-4'}`} />
              <span className={`${isScrolled ? 'hidden sm:inline' : 'inline'}`}>Start Project</span>
            </LiquidButton>
        </div>
      </motion.nav>
    </div>
  );
};