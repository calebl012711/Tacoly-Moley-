import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, UtensilsCrossed, Phone } from 'lucide-react';
import PapelPicado from './PapelPicado';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Our Story', href: '#about' },
    { name: 'Menu', href: '#menu' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Find Us', href: '#find-us' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-primary-red/90 backdrop-blur-md py-2 shadow-lg' : 'bg-primary-red py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group">
            <div className="bg-warm-gold p-1.5 rounded-full transform group-hover:rotate-12 transition-transform">
              <UtensilsCrossed className="text-primary-red w-6 h-6" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-warm-gold text-2xl font-display font-black tracking-tight">Tacoly Moly</span>
              <span className="text-white text-sm font-accent ml-auto">By Ygor</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-white hover:text-warm-gold font-semibold transition-colors text-sm uppercase tracking-wider"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="tel:5126203333"
              className="bg-primary-red text-white px-6 py-2 rounded-full font-bold hover:bg-warm-gold transition-all transform hover:scale-105 shadow-md flex items-center gap-2 group"
            >
              <Phone size={16} className="group-hover:rotate-12 transition-transform" /> <span className="font-accent text-lg">¡Llámanos!</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2"
            >
              {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 md:hidden bg-primary-red flex flex-col items-center justify-center gap-8"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-white z-50"
            >
              <X size={40} />
            </button>
            <div className="absolute top-0 left-0 right-0 opacity-30">
              <PapelPicado />
            </div>
            <div className="absolute bottom-0 left-0 right-0 opacity-30 transform rotate-180">
              <PapelPicado />
            </div>
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-white text-3xl font-display font-bold hover:text-warm-gold transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="tel:5126203333"
              onClick={() => setIsOpen(false)}
              className="bg-primary-red text-white px-10 py-4 rounded-full text-2xl font-bold shadow-xl flex items-center gap-3 group"
            >
              <Phone size={24} className="group-hover:rotate-12 transition-transform" /> <span className="font-accent text-3xl">¡Llámanos!</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
