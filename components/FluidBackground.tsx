import React from 'react';

export const FluidBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden transform-gpu">
      {/* 
        OPTIMIZED IMPLEMENTATION: 
        We use will-change-transform to inform the browser that these elements will move.
        This promotes them to their own compositor layer, preventing main-thread layout thrashing.
      */}
      
      {/* Background Base */}
      <div className="absolute inset-0 bg-[#050505]" />

      <div className="absolute inset-0 opacity-40">
          {/* Blob 1 - Purple/Blue */}
          <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-blob will-change-transform transform-gpu" />
          
          {/* Blob 2 - Orange/Red */}
          <div className="absolute top-0 -right-4 w-96 h-96 bg-orange-500 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-blob animation-delay-2000 will-change-transform transform-gpu" />
          
          {/* Blob 3 - Pink (Bottom) */}
          <div className="absolute -bottom-32 left-20 w-96 h-96 bg-pink-600 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-blob animation-delay-4000 will-change-transform transform-gpu" />
          
          {/* Blob 4 - Blue (Floating Mid) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-900/30 rounded-full mix-blend-screen filter blur-[120px] opacity-30 animate-pulse will-change-transform transform-gpu" />
      </div>
      
      {/* Noise Texture Overlay for grain effect - Static, so no animation needed, just blend mode */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/stardust.png')" }} />
    </div>
  );
};