import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
    // Weitere Preisreduktion (ca. 20%)
    let basePrice = 350; // Vorher 450
    
    // Page calculation
    const pagePrice = 50; // Vorher 60
    basePrice += pages * pagePrice;

    // Features (reduziert)
    if (features.seo) basePrice += 120; // Vorher 150
    if (features.cms) basePrice += 200; // Vorher 250
    if (features.copywriting) basePrice += 150; // Vorher 200
    if (features.legal) basePrice += 40; // Vorher 50

    // Design Multiplier
    let multiplier = 1;
    if (designLevel === 'premium') multiplier = 1.3;
    if (designLevel === 'high-end') multiplier = 1.8;

    setTotal(Math.round(basePrice * multiplier));
  }, [pages, designLevel, features]);

  const toggleFeature = (key: keyof typeof features) => {
    setFeatures(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const getWhatsAppLink = () => {
      const selectedFeatures = [
          features.seo && "SEO Setup",
          features.cms && "CMS (Selbstpflege)",
          features.copywriting && "Texterstellung",
          features.legal && "Rechtstexte"
      ].filter(Boolean).join(", ");

      const designNames = {
          'standard': 'Clean & Basic',
          'premium': 'Custom Brand',
          'high-end': 'High-End'
      };

      const message = `Hi Christian, ich habe den Preiskalkulator genutzt:%0A` +
                      `• ${pages} Unterseiten%0A` +
                      `• Design: ${designNames[designLevel]}%0A` +
                      `• Extras: ${selectedFeatures || "Keine"}%0A` +
                      `--------------------%0A` +
                      `Geschätzter Preis: ca. ${total.toLocaleString('de-DE')}€%0A%0A` +
                      `Ich würde gerne darüber sprechen.`;

      return `https://wa.me/4917624200179?text=${message}`;
  };

  return (
    <section className="py-24 px-6 bg-[#030005] border-y border-white/5 relative overflow-hidden">
        {/* Background blobs - Rule 2: Blending Modes */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

        <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs text-purple-400 font-medium mb-4 shadow-[0_0_10px_rgba(168,85,247,0.2)]">
                    <Calculator className="w-3 h-3" /> WEBSITE KOSTEN RECHNER
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                    Was kostet eine <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-white">
                        günstige Website?
                    </span>
                </h2>
                <p className="text-white/60 max-w-2xl mx-auto">
                    Transparenz von Anfang an. Du möchtest eine Website billig erstellen lassen, aber nicht an Qualität sparen? Kalkuliere hier deinen fairen Festpreis.
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
                
                {/* Controls Area */}
                <div className="lg:col-span-2 space-y-10">
                    
                    {/* 1. Pages Slider */}
                    <div className="bg-white/[0.02] p-6 rounded-2xl border border-white/5 shadow-xl">
                        <div className="flex justify-between mb-6">
                            <label className="text-white font-bold">Anzahl Unterseiten</label>
                            {/* Rule 3: Desaturated orange */}
                            <span className="text-orange-400 font-mono">{pages} Seiten</span>
                        </div>
                        
                        {/* Custom Slider with Glow */}
                        <div className="relative h-2 w-full bg-white/10 rounded-lg">
                            <div 
                                className="absolute h-full bg-orange-500 rounded-lg shadow-[0_0_10px_rgba(249,115,22,0.5)]" 
                                style={{ width: `${(pages / 20) * 100}%` }} 
                            />
                            <input 
                                type="range" 
                                min="1" 
                                max="20" 
                                value={pages} 
                                onChange={(e) => setPages(parseInt(e.target.value))}
                                className="absolute w-full h-full opacity-0 cursor-pointer z-10"
                            />
                        </div>

                        <div className="flex justify-between text-xs text-white/40 mt-4 font-mono">
                            <span>Günstiger Onepager</span>
                            <span>Corporate Site</span>
                        </div>
                    </div>

                    {/* 2. Design Level */}
                    <div className="bg-white/[0.02] p-6 rounded-2xl border border-white/5 shadow-xl">
                        <label className="text-white font-bold block mb-6">Design Anspruch</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { id: 'standard', label: 'Clean & Preiswert', desc: 'Funktional, basierend auf Best Practices. Perfekt für den Start.' },
                                { id: 'premium', label: 'Custom Brand', desc: 'Individuelle Icons, Animationen, starke Identität.' },
                                { id: 'high-end', label: 'High-End', desc: 'Awwwards-Level, 3D, WebGL, kompromisslos.' }
                            ].map((level) => (
                                <button
                                    key={level.id}
                                    onClick={() => setDesignLevel(level.id as any)}
                                    className={`text-left p-4 rounded-xl border transition-all duration-300 ${
                                        designLevel === level.id 
                                        ? 'bg-white/5 border-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.1)]' // Rule 5: Obvious state
                                        : 'bg-transparent border-white/10 hover:border-white/30 hover:bg-white/[0.02]'
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
                    <div className="bg-white/[0.02] p-6 rounded-2xl border border-white/5 shadow-xl">
                        <label className="text-white font-bold block mb-6">Features & Add-ons</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { key: 'seo', label: 'SEO Basis-Setup', price: '+120€' },
                                { key: 'cms', label: 'CMS (Selbst bearbeitbar)', price: '+200€' },
                                { key: 'copywriting', label: 'Professionelle Texte', price: '+150€' },
                                { key: 'legal', label: 'Rechtstexte (Datenschutz)', price: '+40€' },
                            ].map((feat) => (
                                <button
                                    key={feat.key}
                                    onClick={() => toggleFeature(feat.key as any)}
                                    className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                                        features[feat.key as keyof typeof features]
                                        ? 'bg-green-500/10 border-green-500/50 shadow-[0_0_10px_rgba(34,197,94,0.1)]'
                                        : 'bg-transparent border-white/10 hover:border-white/30 hover:bg-white/[0.02]'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                                            features[feat.key as keyof typeof features] ? 'bg-green-500 border-green-500' : 'border-white/30'
                                        }`}>
                                            {features[feat.key as keyof typeof features] && <Check className="w-3 h-3 text-black" />}
                                        </div>
                                        <span className="text-sm font-medium text-gray-200">{feat.label}</span>
                                    </div>
                                    <span className="text-xs text-white/40 font-mono">{feat.price}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Total Price Card (Sticky) - Rule 1: Use tinted black card */}
                <div className="lg:col-span-1">
                    <div className="sticky top-10 bg-[#0A0A0C] border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-[50px] pointer-events-none mix-blend-screen"></div>
                        
                        <div className="text-sm text-white/40 font-mono uppercase tracking-widest mb-2">Geschätztes Invest</div>
                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-5xl font-bold text-white tracking-tight">
                                {total.toLocaleString('de-DE')}€
                            </span>
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
                            className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-200 text-black font-bold py-4 rounded-xl transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                        >
                            <Zap className="w-4 h-4 fill-black" /> Angebot anfordern
                        </a>
                        <p className="text-[10px] text-white/40 text-center mt-4">
                            *Dies ist eine unverbindliche Schätzung. Der finale Preis hängt von den genauen Anforderungen ab. Günstig und fair.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    </section>
  );
};