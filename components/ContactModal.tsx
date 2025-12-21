import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, MessageSquare, Wallet, Sparkles } from 'lucide-react';
import { LiquidButton } from './ui/LiquidButton';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    budget: 1500, // Sensible default within new range
    message: ''
  });

  const MIN_BUDGET = 250;
  const MAX_BUDGET = 5000;

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, budget: parseInt(e.target.value) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct the "Bot Message"
    const text = `🤖 *Neue Projektanfrage via Website*%0A%0A` +
                 `👤 *Name:* ${formData.name}%0A` +
                 `💰 *Budget:* ca. ${formData.budget.toLocaleString('de-DE')}€%0A%0A` +
                 `💬 *Nachricht:*%0A${formData.message}`;

    // Open WhatsApp
    window.open(`https://wa.me/4917624200179?text=${text}`, '_blank');
    
    // Reset and close
    setFormData({ name: '', budget: 1500, message: '' });
    onClose();
  };

  // Calculate percentage for slider styling
  const budgetPercentage = ((formData.budget - MIN_BUDGET) / (MAX_BUDGET - MIN_BUDGET)) * 100;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 sm:px-6">
          
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="relative w-full max-w-md bg-[#0F0F11] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90dvh]"
          >
                
                {/* Header */}
                <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5 shrink-0">
                    <div>
                        <h3 className="text-xl font-bold text-white">Projekt starten</h3>
                        <p className="text-xs text-gray-500 mt-1">Direkt via WhatsApp verbinden.</p>
                    </div>
                    <button 
                        type="button"
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 transition-all cursor-pointer"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Form - Scrollable Area */}
                <div className="overflow-y-auto custom-scrollbar p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        {/* Name */}
                        <div className="space-y-1">
                            <label className="text-xs text-gray-500 uppercase font-bold tracking-wider ml-1">Dein Name</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-orange-500 transition-colors" />
                                <input 
                                    type="text" 
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Vorname Nachname"
                                    className="w-full bg-[#1A1A1D] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-orange-500 focus:bg-white/5 transition-all"
                                />
                            </div>
                        </div>

                        {/* High-End Budget Slider */}
                        <div className="space-y-4 bg-[#1A1A1D] p-5 rounded-2xl border border-white/5 relative overflow-hidden group">
                             {/* Ambient Glow behind slider */}
                             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-orange-500/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                             <div className="flex justify-between items-center relative z-10">
                                <label className="text-xs text-gray-500 uppercase font-bold tracking-wider flex items-center gap-2">
                                    <Wallet className="w-3 h-3 text-orange-500" /> Investment
                                </label>
                                <div className="text-white font-bold font-mono text-xl tracking-tight flex items-center gap-1">
                                    {formData.budget.toLocaleString('de-DE')}€
                                    {formData.budget === MAX_BUDGET && <span className="text-orange-500 text-sm">+</span>}
                                </div>
                            </div>
                            
                            <div className="relative h-10 flex items-center z-10">
                                {/* Invisible Native Input for accessible interaction */}
                                <input 
                                    type="range" 
                                    name="budget"
                                    min={MIN_BUDGET}
                                    max={MAX_BUDGET}
                                    step="50"
                                    value={formData.budget}
                                    onChange={handleBudgetChange}
                                    className="absolute w-full h-full opacity-0 cursor-pointer z-30"
                                />

                                {/* Custom Track Background */}
                                <div className="absolute w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                                    {/* Active Fill Gradient */}
                                    <div 
                                        className="h-full bg-gradient-to-r from-orange-600 to-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.5)]"
                                        style={{ width: `${budgetPercentage}%` }}
                                    />
                                </div>

                                {/* Custom Thumb (Knob) */}
                                <div 
                                    className="absolute h-6 w-6 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)] border-4 border-[#1A1A1D] z-20 pointer-events-none flex items-center justify-center transition-transform duration-100 ease-out"
                                    style={{ 
                                        left: `calc(${budgetPercentage}% - 12px)` // Center the 24px thumb
                                    }}
                                >
                                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                                </div>
                                
                                {/* Floating Tooltip above thumb */}
                                <div 
                                    className="absolute -top-4 transform -translate-x-1/2 transition-all duration-100 ease-out pointer-events-none opacity-0 group-hover:opacity-100"
                                    style={{ left: `${budgetPercentage}%` }}
                                >
                                    <div className="bg-orange-500 text-black text-[10px] font-bold px-2 py-0.5 rounded shadow-lg whitespace-nowrap">
                                        {formData.budget}€
                                    </div>
                                    <div className="w-2 h-2 bg-orange-500 transform rotate-45 mx-auto -mt-1"></div>
                                </div>

                            </div>

                            <div className="flex justify-between text-[10px] text-gray-600 font-mono relative z-10">
                                <span>{MIN_BUDGET}€</span>
                                <div className="flex items-center gap-1">
                                    <Sparkles className="w-3 h-3 text-orange-500/50" />
                                    <span>High Impact</span>
                                </div>
                                <span>{MAX_BUDGET}€+</span>
                            </div>
                        </div>

                        {/* Message */}
                        <div className="space-y-1">
                            <label className="text-xs text-gray-500 uppercase font-bold tracking-wider ml-1">Deine Vision</label>
                            <div className="relative group">
                                <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-gray-500 group-focus-within:text-orange-500 transition-colors" />
                                <textarea 
                                    name="message"
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Kurz: Worum geht es? (z.B. Redesign, Neue Brand, Online Shop...)"
                                    rows={3}
                                    className="w-full bg-[#1A1A1D] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-orange-500 focus:bg-white/5 transition-all resize-none"
                                />
                            </div>
                        </div>

                        <div className="pt-2">
                            <LiquidButton className="w-full" type="submit">
                                <Send className="w-4 h-4" /> Jetzt via WhatsApp anfragen
                            </LiquidButton>
                            <p className="text-[10px] text-center text-gray-500 mt-3">
                                Startet einen Chat. Keine E-Mail nötig.
                            </p>
                        </div>

                    </form>
                </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};