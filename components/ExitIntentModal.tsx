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
      if (e.clientY < 10 && !hasShown) {
        setIsOpen(true);
        setHasShown(true);
        sessionStorage.setItem('vamela_exit_intent_shown', 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShown, setIsOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-sm bg-[#0F0F11] border border-orange-500/20 rounded-3xl p-6 shadow-[0_0_50px_rgba(251,146,60,0.15)] text-center overflow-hidden"
          >
             {/* Glow Effect */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-[40px] pointer-events-none" />

             <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
             >
                <X className="w-5 h-5" />
             </button>

             <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                <span className="text-3xl">👋</span>
             </div>

             <h3 className="text-xl font-bold text-white mb-2">Noch unsicher?</h3>
             <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                Falls du eine schnelle Frage hast, schreib mir einfach direkt. Kein Call, kein Verkaufsgespräch. Einfach eine Antwort.
             </p>

             <LiquidButton 
                href="https://wa.me/4917624200179?text=Hi Christian, ich habe eine kurze Frage zur Website..."
                target="_blank"
                rel="noopener noreferrer"
                variant="whatsapp"
                className="w-full text-sm"
             >
                <MessageCircle className="w-4 h-4 fill-current" /> Private WhatsApp
             </LiquidButton>
             
             <button 
                onClick={() => setIsOpen(false)}
                className="mt-4 text-xs text-gray-600 hover:text-gray-400 underline decoration-gray-700 underline-offset-4"
             >
                Nein danke, ich schaue nur.
             </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};