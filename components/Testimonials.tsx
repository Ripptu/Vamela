import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { TestimonialsColumn } from './ui/testimonials-columns-1';

const testimonials = [
  {
    text: "Endlich habe ich einen professionellen Auftritt für meine Töpferei. Christian hat genau verstanden, wie ich meine Keramik präsentieren möchte – schlicht und hochwertig.",
    image: "https://images.unsplash.com/photo-1554151228-14d9def656ec?fit=crop&w=150&h=150",
    name: "Lisa",
    role: "Inhaberin, Lisa's Keramikstudio",
  },
  {
    text: "Für meinen Food-Blog brauchte ich ein Logo, das Appetit macht. Das Ergebnis ist fantastisch und meine Leser lieben das neue, frische Design.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=crop&w=150&h=150",
    name: "Markus",
    role: "Food-Blogger, 'Genuss-Reise'",
  },
  {
    text: "Als Fitnesstrainerin ist meine Website mein wichtigstes Tool. Die Buchungsanfragen sind seit dem Relaunch spürbar gestiegen. Danke!",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fit=crop&w=150&h=150",
    name: "Julia",
    role: "Personal Trainerin",
  },
  {
    text: "Wir sind ein kleines Start-up für nachhaltige Mode. Das Branding passt perfekt zu unserer Philosophie – klar, natürlich und ohne Schnickschnack.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=150&h=150",
    name: "Tom",
    role: "Co-Founder, GreenThread",
  },
  {
    text: "Mein Portfolio als Fotograf wirkt jetzt viel professioneller. Die Zusammenarbeit war super entspannt und Christian hatte tolle Ideen.",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?fit=crop&w=150&h=150",
    name: "Hannes",
    role: "Freelance Fotograf",
  },
  {
    text: "Für unseren kleinen Handwerksbetrieb war der Schritt ins Digitale riesig. VAMELA hat uns an die Hand genommen und toll unterstützt.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=crop&w=150&h=150",
    name: "Familie Schmidt",
    role: "Bäckerei Schmidt",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = [testimonials[0], testimonials[4], testimonials[1]]; // Reusing for demo

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 px-6 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(255,100,0,0.05),transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center mb-16 relative z-10"
        >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-900/20 border border-orange-500/20 text-xs text-orange-500 font-bold mb-4">
            <Star className="w-3 h-3 fill-orange-500" /> KUNDENSTIMMEN
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Echte Geschichten, <span className="text-gray-500">echte Erfolge</span>
            </h2>
             <p className="text-gray-400 max-w-2xl mx-auto mt-4">
                Von leidenschaftlichen Hobby-Projekten bis zu lokalen Unternehmen.
            </p>
        </motion.div>

        {/* Scrolling Columns */}
        <div className="flex justify-center gap-6 mb-24 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] max-h-[600px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={25} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={35} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={28} />
        </div>
      </div>
    </section>
  );
};