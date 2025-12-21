import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, HelpCircle } from 'lucide-react';

const QUESTIONS = [
  {
    question: "Wie läuft die Zusammenarbeit ab?",
    answer: "Wir starten mit einem unverbindlichen Gespräch (WhatsApp oder Call). Danach erstelle ich ein Konzept. Wenn dir das gefällt, geht's an die Umsetzung. Du bekommst regelmäßige Updates und bist voll eingebunden, ohne dass es stressig wird."
  },
  {
    question: "Muss ich Texte und Bilder liefern?",
    answer: "Nein, nicht zwingend. Wenn du Material hast: Super! Wenn nicht, unterstütze ich dich bei der Bildauswahl und schreibe professionelle Texte, die deine Kunden überzeugen (Copywriting)."
  },
  {
    question: "Wie lange dauert eine Website-Erstellung?",
    answer: "Ein Onepager ist oft in 3-5 Tagen fertig. Größere Unternehmens-Websites brauchen meist 1-2 Wochen. Ich arbeite schnell, aber gründlich."
  },
  {
    question: "Machst du auch SEO?",
    answer: "Absolut. Jede Website wird technisch sauber gebaut (das ist die Basis für SEO). Zusätzlich biete ich spezielle SEO-Setups an (Keywords, Meta-Tags, Struktur), damit du bei Google auch wirklich gefunden wirst."
  },
  {
    question: "Kann ich die Website später selbst ändern?",
    answer: "Ja! Ich baue Websites so, dass du Texte und Bilder später selbst austauschen kannst. Du bekommst von mir eine kurze Einweisung und bist unabhängig."
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 px-6 bg-[#020204] relative">
      <div className="max-w-3xl mx-auto relative z-10">
        
        <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400 font-medium mb-4">
                <HelpCircle className="w-3 h-3" /> HÄUFIGE FRAGEN
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Alles klar?
            </h2>
            <p className="text-white/60">
                Die wichtigsten Antworten vorab. Für alles andere: Schreib mir einfach.
            </p>
        </div>

        <div className="space-y-4">
            {QUESTIONS.map((item, index) => (
                <div 
                    key={index}
                    className="border border-white/5 rounded-2xl bg-white/[0.02] overflow-hidden transition-colors hover:border-white/10"
                >
                    <button 
                        onClick={() => toggle(index)}
                        className="w-full flex items-center justify-between p-6 text-left"
                    >
                        <span className={`font-bold text-lg transition-colors ${openIndex === index ? 'text-white' : 'text-white/80'}`}>
                            {item.question}
                        </span>
                        
                        {/* Playful Plus/X Animation */}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${openIndex === index ? 'bg-orange-500 border-orange-500 rotate-[135deg]' : 'border-white/20 bg-transparent rotate-0'}`}>
                            <Plus className={`w-5 h-5 transition-colors ${openIndex === index ? 'text-black' : 'text-white'}`} />
                        </div>
                    </button>

                    <AnimatePresence>
                        {openIndex === index && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                <div className="px-6 pb-6 pt-0 text-white/60 leading-relaxed">
                                    {item.answer}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>

      </div>
    </section>
  );
};