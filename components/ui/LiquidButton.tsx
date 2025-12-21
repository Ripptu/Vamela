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

  // Aesthetic Variants - Adaptive
  const variants = {
    // Primary: Dark on Light Mode, White on Dark Mode
    primary: "bg-gray-900 text-white dark:bg-white dark:text-black border border-transparent shadow-lg hover:shadow-xl",
    
    // Secondary: Orange Gradient (Works on both)
    secondary: "bg-gradient-to-r from-orange-500 to-red-600 text-white border border-orange-400/50 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50",
    
    // WhatsApp: Brand Color
    whatsapp: "bg-[#25D366] text-white dark:text-black border border-[#25D366] shadow-lg shadow-green-500/30 hover:shadow-green-500/50",

    // Glass: Adaptive
    glass: "bg-black/5 dark:bg-white/10 backdrop-blur-md text-gray-900 dark:text-white border border-black/10 dark:border-white/20 hover:bg-black/10 dark:hover:bg-white/20"
  };

  const shimmerColor = variant === 'primary' 
    ? "from-transparent via-white/20 to-transparent" 
    : "from-transparent via-white/40 to-transparent";

  return (
    // @ts-ignore
    <Component 
      href={href}
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {/* Shimmer Animation */}
      <div className={`absolute top-0 -left-[100%] w-[100%] h-full bg-gradient-to-r ${shimmerColor} -skew-x-12 animate-button-shine pointer-events-none`} />
      
      {/* Content */}
      <span className="relative z-10 flex items-center gap-2 tracking-wide">
        {children}
      </span>
    </Component>
  );
};