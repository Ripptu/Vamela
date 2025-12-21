import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle } from 'lucide-react';
import { LiquidButton } from './ui/LiquidButton';

interface ExitIntentModalProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

export const ExitIntentModal: React.FC<ExitIntentModalProps> = ({ isOpen, setIsOpen }) => {
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check session storage to only show once per session
    const shownInSession = sessionStorage.getItem('vamela_exit_intent_shown');
    if (shownInSession) {
        setHasShown(true);
        return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // If mouse leaves the top of the window (clientY < 0 or small number)
      // We increased the threshold slightly to catch fast movements better
      if (e.clientY < 20 && !hasShown) {
        setIsOpen(true);
        setHasShown(true);
        sessionStorage.setItem('vamela_exit_intent_shown', 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShown, setIsOpen]);

  // Animation Variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 25,
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    },
    exit: { opacity: 0, scale: 0.9, y: 30, transition: { duration: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
            className="fixed inset-0 z-[100] flex items-center justify-center px-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
          {/* Backdrop with Blur */}
          <motion.div 
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />
          
          <motion.div 
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-sm bg-[#0A0A0C] border border-white/10 rounded-[2rem] p-8 shadow-2xl overflow-hidden"
          >
             {/* Background Effects */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[60px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
             <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/5 rounded-full blur-[40px] pointer-events-none translate-y-1/2 -translate-x-1/2" />

             {/* Close Button */}
             <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full text-white/40 hover:text-white hover:bg-white/5 transition-all z-20"
                aria-label="Schließen"
             >
                <X className="w-5 h-5" />
             </button>

             {/* Profile Image with Status Dot */}
             <motion.div variants={itemVariants} className="relative w-20 h-20 mx-auto mb-6">
                 <div className="w-full h-full rounded-full p-[2px] bg-gradient-to-br from-orange-400 to-purple-600">
                    <img 
                        src="https://i.ibb.co/23LgZg8X/christian-jpg.png" 
                        alt="Christian Stockmeier" 
                        className="w-full h-full rounded-full object-cover border-2 border-[#0A0A0C]"
                    />
                 </div>
                 {/* Online Status Dot */}
                 <div className="absolute bottom-1 right-1 w-5 h-5 bg-[#0A0A0C] rounded-full flex items-center justify-center">
                     <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
                 </div>
             </motion.div>

             {/* Text Content */}
             <div className="text-center relative z-10">
                 <motion.h3 variants={itemVariants} id="modal-title" className="text-2xl font-bold text-white mb-3">
                    Darf ich kurz helfen?
                 </motion.h3>
                 
                 <motion.p variants={itemVariants} className="text-sm text-gray-400 mb-8 leading-relaxed px-2">
                    Bevor du gehst: Falls du eine Frage zum Ablauf oder Preis hast, schreib mir einfach kurz. <br/>
                    <span className="text-orange-400 font-medium">Kein Sales-Call, nur eine ehrliche Antwort.</span>
                 </motion.p>

                 <motion.div variants={itemVariants}>
                    <LiquidButton 
                        href="https://wa.me/4917624200179?text=Hi Christian, ich war gerade auf deiner Website und habe eine kurze Frage..."
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="whatsapp"
                        className="w-full justify-center group"
                    >
                        <MessageCircle className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" /> 
                        Frage per WhatsApp stellen
                    </LiquidButton>
                 </motion.div>
                 
                 <motion.button 
                    variants={itemVariants}
                    onClick={() => setIsOpen(false)}
                    className="mt-6 text-xs text-white/30 hover:text-white/60 transition-colors uppercase tracking-wider font-medium"
                 >
                    Nein danke, ich schaue nur
                 </motion.button>
             </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};