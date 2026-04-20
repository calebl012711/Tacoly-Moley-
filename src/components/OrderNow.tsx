import { motion } from 'motion/react';
import { Phone, Store, ClipboardList } from 'lucide-react';

export default function OrderNow() {
  return (
    <section id="order" className="py-24 bg-primary-red relative overflow-hidden">
      {/* Decorative SVG Pattern - Mexican Tile feel */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ 
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 30 L60 60 M30 30 L0 60 M30 30 L30 0' stroke='%23fff' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
        backgroundSize: '30px 30px' 
      }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-accent text-warm-gold text-3xl mb-4 block transform -rotate-2">¡Buen Provecho!</span>
          <h2 className="text-5xl md:text-7xl font-display font-black text-white mb-6 drop-shadow-lg">
            Ready to Eat? <br className="md:hidden" /> <span className="text-warm-gold">Order Now!</span>
          </h2>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-12 font-medium">
            Skip the line! Call us directly or use our quick online form to place your order for pickup.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <a 
              href="tel:5126203333" 
              className="w-full md:w-auto bg-white text-dark-charcoal px-12 py-6 rounded-full font-black text-2xl hover:bg-warm-gold transition-all flex items-center justify-center gap-4 shadow-[0_15px_30px_rgba(0,0,0,0.3)] group hover:-translate-y-1"
            >
              <Phone className="group-hover:rotate-12 transition-transform" size={32} /> <span className="font-accent text-3xl">¡Llámanos!</span>
            </a>
            
            {/* Integrated Online Ordering */}
            <a 
              href="#menu"
              className="w-full md:w-auto bg-accent-teal text-white px-12 py-6 rounded-full font-black text-2xl hover:bg-white hover:text-accent-teal transition-all flex items-center justify-center gap-4 shadow-[0_15px_30px_rgba(0,0,0,0.3)] group hover:-translate-y-1"
            >
              <ClipboardList className="group-hover:scale-110 transition-transform" size={32} /> <span className="font-accent text-3xl">¡Pide Ya!</span>
            </a>

            <a 
              href="#find-us" 
              className="w-full md:w-auto bg-warm-gold text-dark-charcoal px-12 py-6 rounded-full font-black text-2xl hover:bg-white transition-all flex items-center justify-center gap-4 shadow-[0_15px_30px_rgba(0,0,0,0.3)] group hover:-translate-y-1"
            >
              <Store className="group-hover:-rotate-12 transition-transform" size={32} /> <span className="font-accent text-3xl">¡Visítanos!</span>
            </a>
          </div>
          
          <div className="mt-12 flex items-center justify-center gap-4 text-white/80">
            <div className="h-px w-12 bg-white/30"></div>
            <p className="font-accent text-xl">Freshly made by Ygor</p>
            <div className="h-px w-12 bg-white/30"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
