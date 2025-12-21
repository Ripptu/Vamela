import React from 'react';
import { cn } from "../../lib/utils";

interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'whatsapp' | 'glass';
  href?: string;
  target?: string;
  rel?: string;
}

export const LiquidButton: React.FC<LiquidButtonProps> = ({ 
  children, 
  className, 
  variant = 'primary', 
  href,
  ...props 
}) => {
  const Component = href ? 'a' : 'button';

  // Base Layout & Animation
  const baseStyles = "relative inline-flex items-center justify-center gap-2 px-8 py-4 font-bold text-sm md:text-base rounded-full transition-all duration-300 overflow-hidden group hover:scale-[1.03] active:scale-[0.98]";

  // Aesthetic Variants - Rule 5: Make interactive states obvious (Stronger shadows/glows on hover)
  const variants = {
    // Standard High-Contrast (White)
    primary: "bg-white text-black border border-white shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_35px_rgba(255,255,255,0.5)]",
    
    // Brand Accent (Orange Gradient) - Desaturated orange border
    secondary: "bg-gradient-to-r from-orange-500 to-red-600 text-white border border-orange-400/50 shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_50px_rgba(249,115,22,0.6)]",
    
    // WhatsApp Specific (Green Gradient)
    whatsapp: "bg-[#25D366] text-black hover:text-white border border-[#25D366] shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_50px_rgba(37,211,102,0.6)]",

    // Glass / Dark
    glass: "bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
  };

  // Adjust shimmer color for visibility on light vs dark backgrounds
  const shimmerColor = variant === 'primary' 
    ? "from-transparent via-gray-400/30 to-transparent" // Darker shimmer for white button
    : "from-transparent via-white/40 to-transparent";    // White shimmer for colored buttons

  return (
    // @ts-ignore
    <Component 
      href={href}
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {/* Continuous Shimmer Animation - Optimized for visibility */}
      <div className={`absolute top-0 -left-[100%] w-[100%] h-full bg-gradient-to-r ${shimmerColor} -skew-x-12 animate-button-shine pointer-events-none`} />
      
      {/* Hover Flash Overlay */}
      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2 tracking-wide">
        {children}
      </span>
    </Component>
  );
};