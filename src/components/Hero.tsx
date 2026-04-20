import { motion } from 'motion/react';
import { Star, ArrowRight, MapPin } from 'lucide-react';
import PapelPicado from './PapelPicado';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-20">
      <div className="absolute top-0 left-0 right-0 z-[30]">
        <PapelPicado />
      </div>
      {/* Background with Mexican Textile Pattern feel */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://truckster-storage.s3.amazonaws.com/trucks/61ae573c91461-Tacoly-Moly.jpg" 
          alt="Tacoly Moly Food Truck" 
          className="w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-red/90 via-[#D35400]/80 to-warm-gold/70"></div>
        <div className="absolute inset-0 opacity-10" style={{ 
          backgroundImage: `
            linear-gradient(30deg, #fff 12%, transparent 12.5%, transparent 87%, #fff 87.5%, #fff),
            linear-gradient(150deg, #fff 12%, transparent 12.5%, transparent 87%, #fff 87.5%, #fff),
            linear-gradient(30deg, #fff 12%, transparent 12.5%, transparent 87%, #fff 87.5%, #fff),
            linear-gradient(150deg, #fff 12%, transparent 12.5%, transparent 87%, #fff 87.5%, #fff),
            linear-gradient(60deg, #fff 25%, transparent 25.5%, transparent 75%, #fff 75%, #fff),
            linear-gradient(60deg, #fff 25%, transparent 25.5%, transparent 75%, #fff 75%, #fff)
          `,
          backgroundSize: '80px 140px',
          backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px'
        }}></div>
      </div>

      <div className="relative z-20 max-w-5xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-6 py-2 rounded-full text-white text-sm font-black mb-8 border border-white/30 shadow-xl"
        >
          <div className="flex text-warm-gold">
            {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
          </div>
          <span className="uppercase tracking-widest">5.0 Stars on Google · Austin's #1 Taco Truck</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, rotate: -5 }}
          animate={{ opacity: 1, rotate: -2 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-4"
        >
          <span className="font-accent text-warm-gold text-4xl md:text-5xl drop-shadow-lg">¡Hola Amigos!</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-9xl font-display font-black text-white leading-[0.9] mb-8 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]"
        >
          Holy Moly, <br />
          <span className="text-warm-gold italic">You Had Me <br className="md:hidden" /> At Taco.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-3xl text-white/95 max-w-3xl mx-auto mb-12 font-medium leading-relaxed drop-shadow-md"
        >
          Authentic Mexican street food crafted with love by <span className="font-accent text-warm-gold text-4xl align-middle">Ygor</span>, served fresh from our truck in Southwest Austin.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <a 
            href="#menu" 
            className="w-full sm:w-auto bg-warm-gold text-dark-charcoal px-12 py-5 rounded-full text-xl font-black hover:bg-white transition-all flex items-center justify-center gap-3 shadow-[0_10px_20px_rgba(0,0,0,0.3)] group hover:-translate-y-1"
          >
            See Our Menu <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </a>
          <a 
            href="#find-us" 
            className="w-full sm:w-auto border-2 border-white/50 bg-white/10 backdrop-blur-sm text-white px-12 py-5 rounded-full text-xl font-black hover:bg-white hover:text-primary-red transition-all flex items-center justify-center gap-3 shadow-xl hover:-translate-y-1"
          >
            Get Directions <MapPin size={24} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
