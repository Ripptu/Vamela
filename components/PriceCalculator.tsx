import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Check, Zap } from 'lucide-react';

export const PriceCalculator: React.FC = () => {
  const [pages, setPages] = useState(1);
  const [designLevel, setDesignLevel] = useState<'standard' | 'premium' | 'high-end'>('standard');
  const [features, setFeatures] = useState({
    seo: false,
    cms: false,
    copywriting: false,
    legal: false
  });
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let basePrice = 350;
    const pagePrice = 50;
    basePrice += pages * pagePrice;

    if (features.seo) basePrice += 120;
    if (features.cms) basePrice += 200;
    if (features.copywriting) basePrice += 150;
    if (features.legal) basePrice += 40;

    let multiplier = 1;
    if (designLevel === 'premium') multiplier = 1.3;
    if (designLevel === 'high-end') multiplier = 1.8;

    setTotal(Math.round(basePrice * multiplier));
  }, [pages, designLevel, features]);

  const toggleFeature = (key: keyof typeof features) => {
    setFeatures(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const getWhatsAppLink = () => {
      const designNames = {
          'standard': 'Clean & Basic',
          'premium': 'Custom Brand',
          'high-end': 'High-End'
      };
      
      const featureList = Object.entries(features)
        .filter(([_, active]) => active)
        .map(([key]) => key.toUpperCase())
        .join(', ');

      const text = `Hi Christian, ich habe den Kalkulator genutzt:%0A%0A` +
                   `📄 Seiten: ${pages}%0A` +
                   `🎨 Design: ${designNames[designLevel]}%0A` +
                   `✨ Extras: ${featureList || 'Keine'}%0A%0A` +
                   `💰 Schätzung: ca. ${total}€%0A%0A` +
                   `Lass uns mal sprechen!`;
                   
      return `https://wa.me/4917624200179?text=${text}`;
  };

  const getPriceStyle = () => {
      if (total > 2500) {
          return "text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600";
      } else if (total > 1000) {
          return "text-orange-400";
      } else {
          return "text-white";
      }
  };

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-[#030005] border-y border-white/5 relative overflow-hidden">
        
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[80px] pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-orange-500/10 rounded-full blur-[80px] pointer-events-none mix-blend-screen" />

        <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-10 md:mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs text-purple-400 font-medium mb-4">
                    <Calculator className="w-3 h-3" /> WEBSITE KOSTEN RECHNER
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                    Was kostet eine <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-white">
                        günstige Website?
                    </span>
                </h2>
                <p className="text-white/60 max-w-2xl mx-auto text-sm md:text-base">
                    Transparenz von Anfang an. Du möchtest eine Website billig erstellen lassen, aber nicht an Qualität sparen? Kalkuliere hier deinen fairen Festpreis.
                </p>
            </div>

            <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 md:gap-12">
                
                {/* Controls Area */}
                <div className="lg:col-span-2 space-y-6 md:space-y-10 order-1 lg:order-1">
                    
                    {/* 1. Pages Slider */}
                    <div className="bg-white/[0.02] p-5 md:p-6 rounded-2xl border border-white/5 shadow-xl">
                        <div className="flex justify-between mb-6">
                            <label className="text-white font-bold">Anzahl Unterseiten</label>
                            <span className="text-orange-400 font-mono">{pages} Seiten</span>
                        </div>
                        
                        <div className="relative h-6 w-full flex items-center group">
                            <div className="absolute w-full h-2 bg-white/10 rounded-lg">
                                <div 
                                    className="h-full bg-orange-500 rounded-lg transition-all" 
                                    style={{ width: `${(pages / 20) * 100}%` }} 
                                />
                            </div>
                            <input 
                                type="range" 
                                min="1" 
                                max="20" 
                                value={pages} 
                                onChange={(e) => setPages(parseInt(e.target.value))}
                                className="absolute w-full h-full opacity-0 cursor-pointer z-10"
                                aria-label="Anzahl der Seiten"
                            />
                            {/* Thumb Visual */}
                            <div 
                                className="absolute w-6 h-6 bg-white rounded-full shadow-md pointer-events-none transition-all group-active:scale-125"
                                style={{ left: `calc(${(pages / 20) * 100}% - 12px)` }}
                            />
                        </div>

                        <div className="flex justify-between text-xs text-white/40 mt-4 font-mono">
                            <span>Günstiger Onepager</span>
                            <span>Corporate Site</span>
                        </div>
                    </div>

                    {/* 2. Design Level */}
                    <div className="bg-white/[0.02] p-5 md:p-6 rounded-2xl border border-white/5 shadow-xl">
                        <label className="text-white font-bold block mb-4 md:mb-6">Design Anspruch</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                            {[
                                { id: 'standard', label: 'Clean & Preiswert', desc: 'Funktional, basierend auf Best Practices. Perfekt für den Start.' },
                                { id: 'premium', label: 'Custom Brand', desc: 'Individuelle Icons, Animationen, starke Identität.' },
                                { id: 'high-end', label: 'High-End', desc: 'Awwwards-Level, 3D, WebGL, kompromisslos.' }
                            ].map((level) => (
                                <button
                                    key={level.id}
                                    onClick={() => setDesignLevel(level.id as any)}
                                    className={`text-left p-4 rounded-xl border transition-all duration-300 active:scale-[0.98] ${
                                        designLevel === level.id 
                                        ? 'bg-white/5 border-orange-400' 
                                        : 'bg-transparent border-white/10 hover:border-white/30'
                                    }`}
                                >
                                    <div className={`font-bold mb-1 ${designLevel === level.id ? 'text-orange-400' : 'text-white'}`}>
                                        {level.label}
                                    </div>
                                    <div className="text-xs text-white/50 leading-snug">{level.desc}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 3. Features */}
                    <div className="bg-white/[0.02] p-5 md:p-6 rounded-2xl border border-white/5 shadow-xl">
                        <label className="text-white font-bold block mb-4 md:mb-6">Features & Add-ons</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                            {[
                                { key: 'seo', label: 'SEO Basis-Setup', price: '+120€' },
                                { key: 'cms', label: 'CMS (Selbst bearbeitbar)', price: '+200€' },
                                { key: 'copywriting', label: 'Professionelle Texte', price: '+150€' },
                                { key: 'legal', label: 'Rechtstexte (Datenschutz)', price: '+40€' },
                            ].map((feat) => (
                                <button
                                    key={feat.key}
                                    onClick={() => toggleFeature(feat.key as any)}
                                    className={`flex items-center justify-between p-4 rounded-xl border transition-all active:scale-[0.98] ${
                                        features[feat.key as keyof typeof features]
                                        ? 'bg-green-500/10 border-green-500/50'
                                        : 'bg-transparent border-white/10 hover:border-white/30'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                                            features[feat.key as keyof typeof features] 
                                            ? 'bg-green-500 border-green-500' 
                                            : 'border-white/30'
                                        }`}>
                                            {features[feat.key as keyof typeof features] && <Check className="w-4 h-4 text-black" />}
                                        </div>
                                        <span className="text-sm font-medium text-gray-200">{feat.label}</span>
                                    </div>
                                    <span className="text-xs text-white/40 font-mono">{feat.price}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Total Price Card (Sticky) */}
                <div className="lg:col-span-1 order-2 lg:order-2 mb-8 lg:mb-0">
                    <div className="sticky top-4 md:top-10 bg-[#0A0A0C] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-[50px] pointer-events-none mix-blend-screen"></div>
                        
                        <div className="text-sm text-white/40 font-mono uppercase tracking-widest mb-2">Geschätztes Invest</div>
                        <div className="flex items-baseline gap-1 mb-6">
                            <AnimatePresence mode="wait">
                                <motion.span 
                                    key={total}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className={`text-4xl md:text-5xl font-bold tracking-tight transition-all duration-500 ${getPriceStyle()}`}
                                >
                                    {total.toLocaleString('de-DE')}€
                                </motion.span>
                            </AnimatePresence>
                            <span className="text-white/40">*</span>
                        </div>

                        <div className="space-y-4 mb-8 border-t border-white/10 pt-6 text-sm text-white/60">
                            <div className="flex justify-between">
                                <span>Setup & Design</span>
                                <span>Inklusive</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Responsive</span>
                                <span>Inklusive</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Ladezeit-Optimierung</span>
                                <span>Inklusive</span>
                            </div>
                        </div>

                        <a 
                            href={getWhatsAppLink()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-200 text-black font-bold py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                        >
                            <Zap className="w-4 h-4 fill-current" /> Angebot anfordern
                        </a>
                        <p className="text-[10px] text-white/40 text-center mt-4">
                            *Dies ist eine unverbindliche Schätzung.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    </section>
  );
};