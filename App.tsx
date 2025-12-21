import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Showcase } from './components/Showcase';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { About } from './components/About';
import { Impressum, Datenschutz } from './components/Legal';
import { PriceCalculator } from './components/PriceCalculator';
import { ContactModal } from './components/ContactModal';
import { ExitIntentModal } from './components/ExitIntentModal';
import { FAQ } from './components/FAQ';
import Lenis from 'lenis';

function App() {
  const [view, setView] = useState<string>('home');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);

  // Dynamic Title Logic
  useEffect(() => {
    const originalTitle = document.title;
    const handleVisibilityChange = () => {
        if (document.hidden) {
            document.title = "Lass uns starten 🚀 | VAMELA";
        } else {
            document.title = originalTitle;
        }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // PERFORMANCE OPTIMIZATION: Scroll Progress Favicon Logic
  // Disabled on mobile devices to prevent scroll jank
  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;

    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (!ctx || !link) return;

    let ticking = false;

    const updateFavicon = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.body.offsetHeight;
        const winHeight = window.innerHeight;
        const scrollPercent = scrollTop / (docHeight - winHeight);
        
        ctx.clearRect(0, 0, 32, 32);
        
        // Background Circle
        ctx.beginPath();
        ctx.arc(16, 16, 14, 0, 2 * Math.PI);
        ctx.fillStyle = '#020204';
        ctx.fill();
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 4;
        ctx.stroke();

        // Progress Arc (Orange)
        ctx.beginPath();
        ctx.arc(16, 16, 14, -0.5 * Math.PI, (2 * Math.PI * scrollPercent) - 0.5 * Math.PI);
        ctx.strokeStyle = '#f97316';
        ctx.lineWidth = 4;
        ctx.stroke();

        link.href = canvas.toDataURL('image/png');
        ticking = false;
    };

    const onScroll = () => {
        if (!ticking) {
            window.requestAnimationFrame(updateFavicon);
            ticking = true;
        }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // PERFORMANCE OPTIMIZATION: Smooth Scroll (Lenis)
  // Disable on mobile to use native, performant scrolling
  useEffect(() => {
     const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
     
     if (isMobile) return; 

     const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
     });
     
     const raf = (time: number) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
     };
     requestAnimationFrame(raf);
     return () => lenis.destroy();
  }, []);

  // Handle navigation
  const handleNavigate = (target: string) => {
    if (target === 'home') {
      setView('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (['impressum', 'datenschutz', 'agb'].includes(target)) {
      setView(target);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setView('home');
      setTimeout(() => {
        const element = document.getElementById(target);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-[#020204] text-white">
      
      {/* Contact Modal */}
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
      
      {/* Smart Exit Intent Modal */}
      <ExitIntentModal isOpen={isExitModalOpen} setIsOpen={setIsExitModalOpen} />

      {/* Optimized Noise Texture - HIDDEN ON MOBILE to save GPU */}
      <div className="fixed inset-0 pointer-events-none z-[50] opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay hidden md:block"></div>
      
      <main className="relative z-10">
        {view === 'home' && (
          <>
            <Hero onOpenContact={() => setIsContactModalOpen(true)} />
            <Features />
            <Showcase />
            <PriceCalculator />
            <Testimonials />
            <About />
            <FAQ />
            <Contact onOpenContact={() => setIsContactModalOpen(true)} />
          </>
        )}
        {view === 'impressum' && <Impressum onBack={() => handleNavigate('home')} />}
        {view === 'datenschutz' && <Datenschutz onBack={() => handleNavigate('home')} />}
        {view === 'agb' && <Datenschutz onBack={() => handleNavigate('home')} />} 
      </main>

      {view === 'home' && <Footer onNavigate={handleNavigate} />}
      
    </div>
  );
}

export default App;