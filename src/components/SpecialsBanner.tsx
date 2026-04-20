import { motion } from 'motion/react';
import { Sparkles, X } from 'lucide-react';
import { useState } from 'react';

export default function SpecialsBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <motion.div 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-warm-gold text-dark-charcoal py-2 px-4 relative z-[60] flex items-center justify-center gap-4 text-sm font-bold shadow-sm"
    >
      <div className="flex items-center gap-2">
        <Sparkles size={16} className="animate-pulse text-primary-red" />
        <span className="font-accent text-lg mr-2">¡Especial del Día!</span>
        <span>Ygor's Secret Salsa Shrimp Bowl only <span className="text-primary-red font-black">$12!</span></span>
      </div>
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute right-4 hover:rotate-90 transition-transform"
        aria-label="Close banner"
      >
        <X size={16} />
      </button>
    </motion.div>
  );
}
