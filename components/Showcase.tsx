import React, { useRef, useState, useEffect } from 'react';
import { Check, Plus, Mic, Camera, Phone, Video, ChevronLeft } from 'lucide-react';
import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion';

const chatMessages = [
  { sender: 'client', text: "Hallo Christian! Ich habe deine Website gesehen und fand die super sympathisch. Ich bräuchte eine neue Website für mein Unternehmen.", time: "10:30" },
  { sender: 'me', text: "Hi! Danke dir, das freut mich sehr 🙌 Erzähl gern ein bisschen. Was machst du genau und was soll die Website für dich erreichen?", time: "10:32" },
  { sender: 'client', text: "Ich bin selbstständig als Coach und meine aktuelle Website ist ehrlich gesagt ziemlich in die Jahre gekommen. Ich möchte etwas Modernes.", time: "10:35" },
  { sender: 'me', text: "Verstehe ich total. Gerade als Coach ist der erste Eindruck extrem wichtig. Soll die Website eher informieren oder auch direkt Anfragen generieren?", time: "10:36" },
  { sender: 'client', text: "Am liebsten beides. Die Leute sollen direkt ein Gefühl für mich bekommen und sich trauen, Kontakt aufzunehmen.", time: "10:40" },
  { sender: 'me', text: "Perfekt. Arbeiten wir mit klaren Texten, viel Persönlichkeit und einem ruhigen, hochwertigen Design. Hast du schon Inhalte?", time: "10:42" },
  { sender: 'client', text: "Ein paar Texte gibt es, aber die dürfen gern überarbeitet werden. Designmäßig habe ich noch keine konkrete Vorstellung.", time: "10:45" },
  { sender: 'me', text: "Kein Problem 😊 Ich entwickle das Design Schritt für Schritt mit dir zusammen. Am Anfang stelle ich dir ein paar Fragen zu Stil und Zielgruppe.", time: "10:46" },
  { sender: 'client', text: "Klingt gut. Wie läuft die Zusammenarbeit zeitlich ab?", time: "11:00" },
  { sender: 'me', text: "Nach unserem Startgespräch erstelle ich ein Konzept. Dann Design, Feedback, Feinschliff und Umsetzung. Du bist die ganze Zeit eingebunden.", time: "10:52" },
  { sender: 'client', text: "Das hört sich sehr entspannt an. Und preislich?", time: "10:55" },
  { sender: 'me', text: "Ich mache dir nach dem Gespräch ein klares Festpreis-Angebot. Ohne versteckte Kosten, versprochen.", time: "10:56" },
  { sender: 'client', text: "Super. Dann lass uns gern einen Termin ausmachen.", time: "11:00" },
  { sender: 'me', text: "Sehr gern! Schick mir zwei, drei Termine, die für dich passen 🚀", time: "11:01" },
  { sender: 'client', text: "Perfekt, danke dir Christian. Ich habe ein richtig gutes Gefühl dabei.", time: "11:05" },
  { sender: 'me', text: "Ich freue mich drauf! Bis dann.", time: "11:06" }
];

export const Showcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(0);
  const isInView = useInView(containerRef, { margin: "-20%" });

  // 3D Motion Logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });
  
  // Floating & Tilting Effect - refined for mobile
  // On mobile, we reduce the movement to prevent overflow issues
  const y = useTransform(smoothProgress, [0, 1], [40, 0]);
  const rotateX = useTransform(smoothProgress, [0, 1], [10, 0]);
  const rotateY = useTransform(smoothProgress, [0, 1], [-5, -2]); 
  const scale = useTransform(smoothProgress, [0, 1], [0.95, 1]);
  
  // Glare movement across screen
  const glarePos = useTransform(smoothProgress, [0, 1], ["0%", "120%"]);

  // Chat Auto-Reveal Logic
  useEffect(() => {
    if (isInView && visibleCount < chatMessages.length) {
      const interval = setInterval(() => {
        setVisibleCount((prev) => {
          if (prev >= chatMessages.length) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isInView, visibleCount]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (scrollContainerRef.current) {
        setTimeout(() => {
            if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollTo({
                    top: scrollContainerRef.current.scrollHeight,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }
  }, [visibleCount]);

  return (
    <section ref={containerRef} className="py-20 md:py-40 bg-[#020204] overflow-hidden min-h-screen flex items-center relative perspective-[2000px]">
      
      {/* Background Ambience */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-green-500/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none mix-blend-screen" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-12 md:gap-16 items-center w-full relative z-10">
        
        {/* Left: Text Content */}
        <div className="order-2 lg:order-1 text-center lg:text-left">
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <div className="text-orange-400 font-mono text-xs md:text-sm mb-4">● PROZESS & KOMMUNIKATION</div>
                <h2 className="text-3xl md:text-6xl font-bold text-white mb-6 leading-tight">
                    Vom "Hallo" <br/>
                    zum <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-200">Launch.</span>
                </h2>
                <p className="text-lg md:text-xl text-white/60 leading-relaxed mb-8">
                    Kein Fachchinesisch. Keine Blackbox. <br />
                    Wir entwickeln deine Vision im direkten Austausch.
                </p>
                
                <div className="flex flex-col gap-4 items-center lg:items-start">
                     <div className="flex items-center gap-3 text-white/80">
                        <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 shadow-[0_0_10px_rgba(34,197,94,0.1)]">
                            <Check className="w-5 h-5" />
                        </div>
                        <span>100% Persönlicher Ansprechpartner</span>
                     </div>
                     <div className="flex items-center gap-3 text-white/80">
                        <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 shadow-[0_0_10px_rgba(34,197,94,0.1)]">
                            <Check className="w-5 h-5" />
                        </div>
                        <span>Schnelle Updates & direkte WhatsApp-Line</span>
                     </div>
                </div>
            </motion.div>
        </div>

        {/* Right: iPhone 17 Pro */}
        <div className="order-1 lg:order-2 flex justify-center relative z-10 py-6 md:py-10">
             
             <motion.div
                style={{ y, rotateX, rotateY, scale }}
                className="relative w-[300px] h-[620px] md:w-[340px] md:h-[700px] bg-[#1a1a1a] rounded-[50px] md:rounded-[60px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8),0_0_0_2px_rgba(255,255,255,0.05)] border-[6px] border-[#323232]"
             >
                {/* --- CHASSIS DETAILS --- */}
                
                {/* Side Buttons (Left) */}
                <div className="absolute top-28 -left-[8px] w-[2px] h-8 bg-[#2a2a2a] rounded-l-md"></div>
                <div className="absolute top-40 -left-[8px] w-[2px] h-14 bg-[#2a2a2a] rounded-l-md"></div>
                <div className="absolute top-56 -left-[8px] w-[2px] h-14 bg-[#2a2a2a] rounded-l-md"></div>

                {/* Side Button (Right) */}
                <div className="absolute top-44 -right-[8px] w-[2px] h-20 bg-[#2a2a2a] rounded-r-md"></div>

                {/* Inner Bezel (Black Border) */}
                <div className="absolute inset-0 bg-black rounded-[44px] md:rounded-[54px] border-[6px] md:border-[8px] border-black overflow-hidden flex flex-col z-20">
                    
                    {/* Glass Reflection/Glare */}
                    <motion.div 
                        style={{ 
                            background: `linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.02) 55%, transparent 60%)`,
                            left: glarePos,
                            opacity: 0.7
                        }}
                        className="absolute inset-0 w-[200%] h-full pointer-events-none z-[60] -ml-[50%]"
                    />

                    {/* --- STATUS BAR --- */}
                    <div className="h-[44px] w-full bg-[#0b141a] relative z-50 flex justify-between items-center px-6 pt-2 select-none shrink-0">
                        <span className="text-white text-[14px] font-semibold tracking-wide">9:41</span>
                        
                        {/* Dynamic Island */}
                        <div className="absolute top-[8px] left-1/2 -translate-x-1/2 h-[30px] w-[100px] bg-black rounded-full z-50 flex items-center justify-center">
                             <div className="flex gap-2 opacity-30">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a]"></div>
                             </div>
                        </div>

                        <div className="flex gap-1.5 items-center">
                             <div className="flex flex-col gap-[2px] items-end">
                                <div className="w-4 h-[2px] bg-white rounded-full"></div>
                                <div className="w-3 h-[2px] bg-white rounded-full"></div>
                                <div className="w-2 h-[2px] bg-white rounded-full"></div>
                             </div>
                             <div className="w-[18px] h-[9px] border border-gray-400 rounded-[3px] relative ml-1">
                                <div className="bg-white absolute inset-[1.5px] rounded-[1px] w-[60%]"></div>
                             </div>
                        </div>
                    </div>

                    {/* --- WHATSAPP APP BAR --- */}
                    <div className="bg-[#1f2c34] h-[60px] flex items-center px-2 z-40 relative shrink-0 border-b border-[#2a3942]/50">
                         <div className="flex items-center text-[#53bdeb] pl-1">
                             <ChevronLeft className="w-6 h-6" />
                             <span className="text-[16px] leading-none -ml-1 pt-[1px]">42</span>
                         </div>
                         
                         <div className="ml-1 mr-2 w-[34px] h-[34px] rounded-full overflow-hidden border border-white/5 bg-gray-700 shrink-0">
                             <img 
                                src="https://i.ibb.co/23LgZg8X/christian-jpg.png" 
                                alt="Christian Stockmeier" 
                                className="w-full h-full object-cover" 
                             />
                         </div>
                         
                         <div className="flex-1 flex flex-col justify-center overflow-hidden min-w-0 pr-2">
                             <span className="text-white font-semibold text-[15px] leading-tight truncate">Christian Stockmeier</span>
                             <span className="text-[#889a9e] text-[10px] truncate leading-tight">zuletzt online heute</span>
                         </div>
                         
                         <div className="flex items-center gap-4 text-[#53bdeb] pr-2 shrink-0">
                             <Video className="w-5 h-5 stroke-[1.5]" />
                             <Phone className="w-5 h-5 stroke-[1.5]" />
                         </div>
                    </div>

                    {/* --- CHAT AREA --- */}
                    <div 
                        className="flex-1 bg-[#0b141a] relative overflow-hidden flex flex-col"
                    >
                         <div className="absolute inset-0 opacity-[0.06] bg-[url('https://i.pinimg.com/originals/97/c0/07/97c00759d90d786d9b6096d274ad3e07.png')] bg-repeat bg-[length:350px]"></div>
                         
                         <div 
                            ref={scrollContainerRef}
                            className="flex-1 overflow-y-auto px-3 py-4 space-y-3 no-scrollbar relative z-10"
                         >
                            <div className="flex justify-center mb-6 sticky top-0 z-20">
                                <span className="bg-[#1f2c34]/90 backdrop-blur-sm text-[#8696a0] text-[10px] font-medium px-2 py-1 rounded-lg shadow-sm border border-white/5">Heute</span>
                            </div>

                            <div className="bg-[#1f2c34] p-2 rounded-lg mb-6 text-center mx-auto max-w-[90%] border border-[#2a3942] shadow-sm">
                                <p className="text-[9px] text-[#ffd279] leading-tight">
                                    VAMELA: Nachrichten sind Ende-zu-Ende verschlüsselt.
                                </p>
                            </div>

                            {chatMessages.map((msg, idx) => {
                                if (idx > visibleCount) return null;
                                return (
                                    <motion.div 
                                        key={idx}
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{ duration: 0.3 }}
                                        className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'} mb-1`}
                                    >
                                        <div 
                                            className={`relative max-w-[85%] px-3 py-1.5 text-[14px] leading-snug shadow-[0_1px_0.5px_rgba(0,0,0,0.13)] group ${
                                                msg.sender === 'me' 
                                                ? 'bg-[#005c4b] text-[#e9edef] rounded-lg rounded-tr-none' 
                                                : 'bg-[#202c33] text-[#e9edef] rounded-lg rounded-tl-none'
                                            }`}
                                        >
                                            {msg.sender === 'me' ? (
                                                <svg viewBox="0 0 8 13" height="13" width="8" className="absolute top-0 -right-[8px] fill-[#005c4b]"><path d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z"></path></svg>
                                            ) : (
                                                <svg viewBox="0 0 8 13" height="13" width="8" className="absolute top-0 -left-[8px] fill-[#202c33] scale-x-[-1]"><path d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z"></path></svg>
                                            )}

                                            <span className="block mb-1">{msg.text}</span>
                                            <div className="flex justify-end items-center gap-1 opacity-60 min-w-[50px]">
                                                <span className="text-[9px] tracking-wide">{msg.time}</span>
                                                {msg.sender === 'me' && (
                                                    <div className="flex -space-x-1.5">
                                                        <Check className="w-3 h-3 text-[#53bdeb]" />
                                                        <Check className="w-3 h-3 text-[#53bdeb] -ml-2" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                            <div className="h-4"></div>
                         </div>
                    </div>

                    {/* --- INPUT BAR --- */}
                    <div className="bg-[#1f2c34] flex items-end pt-2 px-2 gap-2 z-40 pb-[25px] border-t border-[#2a3942]/50 shrink-0">
                         <div className="mb-2 p-1">
                             <Plus className="w-6 h-6 text-[#8696a0]" />
                         </div>
                         
                         <div className="flex-1 bg-[#2a3942] min-h-[34px] rounded-2xl px-3 py-1.5 flex items-center justify-between mb-2">
                             <div className="w-[2px] h-4 bg-[#00a884] animate-pulse"></div>
                             <div className="flex gap-3"></div>
                         </div>
                         
                         <div className="flex gap-3 pr-1 mb-2">
                             <Camera className="w-6 h-6 text-[#8696a0]" />
                             <div className="w-9 h-9 bg-[#00a884] rounded-full flex items-center justify-center shadow-lg">
                                <Mic className="w-5 h-5 text-white" />
                             </div>
                         </div>
                    </div>

                    {/* Home Indicator */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[120px] h-[4px] bg-white rounded-full z-[60] opacity-60"></div>

                </div>
             </motion.div>
        </div>

      </div>
    </section>
  );
};