import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const reviews = [
  {
    name: "A Tacoly Moly Fan",
    text: "Tacoly Moly is incredible! The shrimp taco is seriously one of the best I've ever had — perfectly seasoned, super fresh, and packed with flavor. You can tell they really care about quality.",
    stars: 5
  },
  {
    name: "Joshua M.",
    text: "This place is amazing. Boy was it tasty! The beef burrito and chicken bowl both had great flavor and were packed full of all the good stuff. Very passionate about their food, and it shows.",
    stars: 5
  },
  {
    name: "A Rainy Wednesday Visitor",
    text: "We came on a rainy Wednesday and were absolutely blown away! Ygor is a real sweetheart — he brought our food inside the coffee shop so we didn't have to come out in the rain. The salsa was so fresh and the bowls were incredibly flavorful.",
    stars: 5
  },
  {
    name: "Breakfast Taco Lover",
    text: "Super friendly, brought the tacos out with a couple of sauces to try. Really good sized breakfast tacos. Definitely not overpriced. Will be back every time I'm on this side of town!",
    stars: 5
  },
  {
    name: "Tres Leches Stan",
    text: "The tres leches was absolutely amazing. I drove 45 minutes just to come back for it. If you haven't been — what are you waiting for?!",
    stars: 5
  }
];

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrentIndex((prev) => (prev + 1) % reviews.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  return (
    <section id="reviews" className="py-24 bg-dark-charcoal relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary-red/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-warm-gold/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="font-accent text-warm-gold text-3xl mb-4 block transform rotate-2">¡Nuestros Fans!</span>
          <h2 className="text-5xl md:text-6xl font-display font-black text-white mb-4">
            Don't Just Take <span className="text-warm-gold">Our Word For It 💬</span>
          </h2>
          <p className="text-xl text-white/60 font-semibold uppercase tracking-widest">
            Austin's been talking. Here's what they're saying.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 md:p-12 rounded-[2rem] shadow-2xl relative"
            >
              <Quote className="absolute top-6 right-8 text-warm-gold/20" size={80} />
              
              <div className="flex gap-1 mb-6">
                {[...Array(reviews[currentIndex].stars)].map((_, i) => (
                  <Star key={i} size={24} fill="#F39C12" className="text-warm-gold" />
                ))}
              </div>

              <p className="text-2xl md:text-3xl font-display italic text-dark-charcoal leading-relaxed mb-8">
                "{reviews[currentIndex].text}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-red rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {reviews[currentIndex].name[0]}
                </div>
                <div>
                  <div className="font-bold text-dark-charcoal text-lg">{reviews[currentIndex].name}</div>
                  <div className="text-sm text-dark-charcoal/50 uppercase tracking-widest font-bold">Google Review</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-12">
            <button 
              onClick={prev}
              className="p-3 rounded-full bg-white/10 text-white hover:bg-warm-gold hover:text-dark-charcoal transition-all border border-white/20"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={next}
              className="p-3 rounded-full bg-white/10 text-white hover:bg-warm-gold hover:text-dark-charcoal transition-all border border-white/20"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className="mt-16 text-center">
          <a 
            href="https://maps.google.com/?cid=14972221591552880305"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-warm-gold text-dark-charcoal px-8 py-3 rounded-full font-bold hover:bg-white transition-all shadow-lg group"
          >
            See All Reviews on Google <Star size={18} fill="currentColor" className="group-hover:rotate-12 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
