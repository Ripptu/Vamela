import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Sparkles, RefreshCcw, Eraser } from 'lucide-react';

export const LogoReveal: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const initCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }

      // Fill with "Old/Dusty" Texture
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add Noise/Sketch Effect
      for (let i = 0; i < 5000; i++) {
        ctx.fillStyle = Math.random() > 0.5 ? '#333' : '#222';
        ctx.fillRect(
            Math.random() * canvas.width, 
            Math.random() * canvas.height, 
            2, 2
        );
      }

      // Add Text overlay on the dusty layer
      ctx.font = 'bold 24px Inter, sans-serif';
      ctx.fillStyle = '#555';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText("ALTE MARKE", canvas.width / 2, canvas.height / 2);
      ctx.font = '14px Inter, sans-serif';
      ctx.fillText("(Hier rubbeln)", canvas.width / 2, canvas.height / 2 + 30);
      
      // Reset state
      setProgress(0);
      controls.start({ opacity: 1, scale: 1 });
    };

    initCanvas();

    const handleResize = () => initCanvas();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [controls]);

  const draw = (e: MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    let x, y;

    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = (e as MouseEvent).clientX - rect.left;
      y = (e as MouseEvent).clientY - rect.top;
    }

    // Erase Logic
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 40, 0, Math.PI * 2);
    ctx.fill();

    // Check Progress
    setProgress(prev => prev + 0.5);
  };

  const reset = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    
    // Re-init logic
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Re-add noise
     for (let i = 0; i < 5000; i++) {
        ctx.fillStyle = Math.random() > 0.5 ? '#333' : '#222';
        ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2);
      }
      
    ctx.font = 'bold 24px Inter, sans-serif';
    ctx.fillStyle = '#555';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText("ALTE MARKE", canvas.width / 2, canvas.height / 2);
    ctx.font = '14px Inter, sans-serif';
    ctx.fillText("(Hier rubbeln)", canvas.width / 2, canvas.height / 2 + 30);

    setProgress(0);
    controls.start({ opacity: 1, scale: 1 });
  };

  // Text Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { 
        type: "spring", 
        stiffness: 50,
        damping: 20
      }
    }
  };

  return (
    <section className="py-24 px-6 bg-[#050505] relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        
        {/* Text Side - Animated Entrance */}
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex-1 order-2 md:order-1"
        >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-orange-500 font-medium mb-6">
                <Eraser className="w-3 h-3" /> REBRANDING MAGIC
            </motion.div>
            
            <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Leg den Staub <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-white">
                    der Vergangenheit ab.
                </span>
            </motion.h2>
            
            <motion.p variants={itemVariants} className="text-gray-400 leading-relaxed mb-8 text-lg">
                Viele Marken haben einen brillanten Kern, der unter veralteter Optik und staubigen Strukturen verborgen liegt. Wir radieren das Durchschnittliche weg und legen deine wahre Identität frei.
            </motion.p>
            
            <motion.button 
                variants={itemVariants}
                onClick={reset}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-white"
            >
                <RefreshCcw className="w-4 h-4" /> Animation zurücksetzen
            </motion.button>
        </motion.div>

        {/* Interactive Canvas Side */}
        <div className="flex-1 order-1 md:order-2 flex justify-center w-full">
            <div 
                ref={containerRef}
                className="relative w-full max-w-[400px] aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl group cursor-none"
            >
                {/* BACK LAYER (The New Brand) */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-purple-600 flex items-center justify-center p-8">
                    <motion.div 
                        initial={{ scale: 0.9 }}
                        animate={{ scale: [0.95, 1.05, 0.95] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="text-center transform rotate-[-5deg]"
                    >
                        <Sparkles className="w-16 h-16 text-white mx-auto mb-4 animate-pulse" />
                        <h3 className="text-4xl font-black text-white tracking-tighter mb-2">NEUE ÄRA</h3>
                        <p className="text-white/80 font-mono text-xs uppercase tracking-widest">Premium Brand Identity</p>
                    </motion.div>
                    {/* Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent translate-x-[-100%] animate-[shimmer_3s_infinite]" />
                </div>

                {/* FRONT LAYER (Canvas Eraser) */}
                <motion.canvas
                    ref={canvasRef}
                    animate={controls}
                    onMouseMove={(e: any) => draw(e)}
                    onTouchMove={(e: any) => draw(e)}
                    className="absolute inset-0 w-full h-full z-10 touch-none"
                />

                {/* Custom Cursor for this area */}
                <motion.div 
                    className="absolute pointer-events-none w-10 h-10 rounded-full border-2 border-white bg-white/20 backdrop-blur-sm z-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ 
                        left: -20, // Center offset
                        top: -20,  // Center offset
                    }}
                >
                    <Eraser className="w-4 h-4 text-white" />
                </motion.div>
                
                {/* Instruction Overlay (fades out on interaction) */}
                {progress < 5 && (
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none text-white/50 text-xs uppercase tracking-widest animate-pulse">
                        Rubbeln zum Freilegen
                    </div>
                )}
            </div>
        </div>

      </div>
    </section>
  );
};