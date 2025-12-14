import React, { useEffect, useRef } from 'react';

export const FluidBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const particles: any[] = [];
    const mouse = { x: -1000, y: -1000 };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      life: number;
      maxLife: number;
      alpha: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 0.5;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed - 0.5; // Drift upwards slightly
        this.size = Math.random() * 100 + 50;
        this.maxLife = Math.random() * 100 + 100;
        this.life = this.maxLife;
        this.alpha = 0;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life--;

        // Interaction with mouse
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 300) {
            const force = (300 - distance) / 300;
            const angle = Math.atan2(dy, dx);
            this.vx -= Math.cos(angle) * force * 0.2;
            this.vy -= Math.sin(angle) * force * 0.2;
        }

        // Fade in and out
        if (this.life > this.maxLife - 50) {
            this.alpha = (this.maxLife - this.life) / 50;
        } else {
            this.alpha = this.life / (this.maxLife - 50);
        }
      }

      draw(context: CanvasRenderingContext2D) {
        context.save();
        context.globalAlpha = this.alpha * 0.15; // Low opacity for smoke effect
        context.translate(this.x, this.y);
        context.beginPath();
        // Draw a soft gradient circle
        const gradient = context.createRadialGradient(0, 0, 0, 0, 0, this.size);
        gradient.addColorStop(0, 'rgba(100, 100, 120, 1)'); // Blueish-Grey smoke
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        context.fillStyle = gradient;
        context.arc(0, 0, this.size, 0, Math.PI * 2);
        context.fill();
        context.restore();
      }
    }

    const init = () => {
        // Create initial particles
        for(let i = 0; i < 20; i++) {
             particles.push(new Particle(Math.random() * width, Math.random() * height));
        }
    };

    const animate = () => {
        ctx.clearRect(0, 0, width, height);
        
        // Randomly spawn new particles
        if (Math.random() < 0.2) {
            particles.push(new Particle(Math.random() * width, height + 100));
        }
        
        // Spawn particles at mouse position on move
        if (mouse.x > 0 && Math.random() < 0.5) {
             particles.push(new Particle(mouse.x, mouse.y));
        }

        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw(ctx);
            if (particles[i].life <= 0) {
                particles.splice(i, 1);
            }
        }
        requestAnimationFrame(animate);
    };

    const handleResize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    init();
    animate();

    return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas 
        ref={canvasRef} 
        className="fixed inset-0 z-0 pointer-events-none opacity-60 mix-blend-screen"
        style={{ filter: 'blur(30px)' }} // Heavy blur creates the fluid look
    />
  );
};