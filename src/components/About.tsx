import { motion } from 'motion/react';
import { ChefHat, Clock, Heart, Star } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Column: Visual Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square bg-warm-gold rounded-3xl rotate-3 absolute inset-0 -z-10 shadow-2xl"></div>
            <div className="aspect-square bg-primary-red rounded-3xl -rotate-3 flex items-center justify-center shadow-2xl relative overflow-hidden border-8 border-white">
              <img 
                src="https://truckster-storage.s3.amazonaws.com/trucks/61ae573c91461-Tacoly-Moly.jpg" 
                alt="Tacoly Moly Food Truck" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {/* Decorative SVG Pattern */}
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 text-center text-white z-10">
                <div className="font-accent text-4xl mb-1">Ygor's Kitchen</div>
                <div className="font-display font-bold text-sm uppercase tracking-widest">Est. 2021</div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute top-4 left-4 text-4xl drop-shadow-lg">🌶️</div>
              <div className="absolute bottom-4 right-4 text-4xl drop-shadow-lg">🥑</div>
              <div className="absolute top-1/2 right-4 text-4xl drop-shadow-lg">🍋</div>
            </div>

            {/* Handwritten Note */}
            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl border-2 border-primary-green transform rotate-2 max-w-[220px] z-20">
              <p className="font-accent text-primary-green text-xl leading-tight">"The secret is in the salsa!" - Ygor</p>
            </div>
          </motion.div>

          {/* Right Column: Copy */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-accent text-primary-red text-3xl mb-4 block transform -rotate-2">Nuestra Historia</span>
            <h2 className="text-4xl md:text-6xl font-display font-black text-dark-charcoal mb-8 leading-tight">
              Meet Ygor. The Heart <br />
              <span className="text-primary-green">Behind Every Taco.</span>
            </h2>
            
            <div className="space-y-6 text-lg text-dark-charcoal/80 leading-relaxed">
              <p>
                Born from a lifelong passion for authentic Mexican street food, <span className="font-bold text-dark-charcoal">Tacoly Moly By Ygor</span> isn't just a food truck—it's a celebration of flavor, family, and the vibrant culture of Mexico.
              </p>
              <p>
                Ygor brings years of tradition to every taco, using only the freshest local ingredients and family recipes passed down through generations. From our slow-marinated Al Pastor to our house-made salsas, every bite is a testament to our commitment to quality.
              </p>
              <p className="font-bold text-primary-red italic">
                "I don't just make food; I make memories. When you eat at my truck, you're eating at my home."
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-12">
              <div className="text-center p-4 bg-off-white rounded-2xl border border-dark-charcoal/5">
                <Star className="mx-auto text-warm-gold mb-2" size={24} fill="currentColor" />
                <div className="font-bold text-sm">5.0 Stars</div>
                <div className="text-[10px] uppercase tracking-tighter opacity-60">441+ Reviews</div>
              </div>
              <div className="text-center p-4 bg-off-white rounded-2xl border border-dark-charcoal/5">
                <Clock className="mx-auto text-primary-green mb-2" size={24} />
                <div className="font-bold text-sm">Open 6 Days</div>
                <div className="text-[10px] uppercase tracking-tighter opacity-60">Tue - Sun</div>
              </div>
              <div className="text-center p-4 bg-off-white rounded-2xl border border-dark-charcoal/5">
                <Heart className="mx-auto text-primary-red mb-2" size={24} fill="currentColor" />
                <div className="font-bold text-sm">Local Fav</div>
                <div className="text-[10px] uppercase tracking-tighter opacity-60">Austin, TX</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
