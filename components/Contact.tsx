import React from 'react';
import { Mail, MessageCircle } from 'lucide-react';
import { LiquidButton } from './ui/LiquidButton';

interface ContactProps {
    onOpenContact?: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenContact }) => {
  return (
    <section id="contact" className="py-20 md:py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Bereit für den <br />
            <span className="text-orange-400">nächsten Schritt?</span>
          </h2>
          <p className="text-white/60 leading-relaxed mb-10 text-base md:text-lg">
            Genug gewartet. Lass uns deine Marke auf das Level heben, das sie verdient. Skalierbar, professionell und visuell beeindruckend. Schreib mir und wir besprechen deine Vision.
          </p>

        <div className="flex flex-col sm:flex-row items-center gap-6 w-full justify-center">
             <LiquidButton 
                href="https://wa.me/4917624200179"
                variant="whatsapp"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
             >
                <MessageCircle className="w-5 h-5 fill-current" /> WHATSAPP STARTEN
             </LiquidButton>
             
             <LiquidButton 
                onClick={onOpenContact}
                variant="primary"
                className="w-full sm:w-auto cursor-pointer"
             >
                <Mail className="w-5 h-5" /> PROJEKT ANFRAGEN
             </LiquidButton>
        </div>
      </div>
    </section>
  );
};