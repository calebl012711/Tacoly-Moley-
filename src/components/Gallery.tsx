import { motion } from 'motion/react';

const photos = [
  {
    url: "https://truckster-storage.s3.amazonaws.com/trucks/61ae573c91461-Tacoly-Moly.jpg",
    caption: "The Tacoly Moly Trailer in Austin",
    source: "Tacoly Moly"
  },
  {
    url: "https://images.gotruckster.com/foodtruck/cover_photos/BMD2mydWuRs7FQIPjYlEsASuzItYYWsb9AcGgL2T.png",
    caption: "Real Authentic Tacos",
    source: "Tacoly Moly"
  },
  {
    url: "https://images.unsplash.com/photo-1551504734-b4631abbb7ea?auto=format&fit=crop&q=80&w=800",
    caption: "Fresh Ingredients Daily",
    source: "Instagram"
  },
  {
    url: "https://images.gotruckster.com/foodtruck/1486/categories/2053QQXAFao3OXSYt4OX1e4NAJdBXz8EdLZqcWRJsly2.jpeg",
    caption: "Fresh Tacos on the Griddle",
    source: "Tacoly Moly"
  },
  {
    url: "https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?auto=format&fit=crop&q=80&w=800",
    caption: "Perfect Breakfast Tacos",
    source: "Yelp Reviews"
  },
  {
    url: "https://images.gotruckster.com/foodtruck/1486/categories/2053hpoWp58vysGEWLbFeNuWjthhy2gKNtSQFzE4MV41.jpeg",
    caption: "Our Signature Taco Platter",
    source: "Tacoly Moly"
  },
  {
    url: "https://images.gotruckster.com/foodtruck/1486/categories/2053oTR5ft85DHbsPCmyONCxFQAaQPGI9aQxN0fOx18Y.jpeg",
    caption: "Authentic Mexican Flavors",
    source: "Tacoly Moly"
  },
  {
    url: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=800",
    caption: "Street Taco Perfection",
    source: "Instagram"
  },
  {
    url: "https://images.gotruckster.com/foodtruck/1486/categories/20546omirlHpLuCCiwEsQeO34OT0imNirtHcgXtiHepx.jpeg",
    caption: "Variety of Street Tacos",
    source: "Tacoly Moly"
  }
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 relative">
          <span className="font-accent text-warm-gold text-4xl mb-6 block transform rotate-2 drop-shadow-sm">¡Qué Chulada!</span>
          <h2 className="text-6xl md:text-8xl font-display font-black text-dark-charcoal mb-4 tracking-tighter">
            THE <span className="text-primary-red italic">GALLERY</span>
          </h2>
          <p className="text-md text-dark-charcoal/60 font-bold uppercase tracking-[0.2em]">
            Real Food. Real Flavor.
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className="group relative overflow-hidden rounded-[2rem] shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 break-inside-avoid"
            >
              <img 
                src={photo.url} 
                alt={photo.caption}
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-charcoal via-dark-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                <p className="text-white font-display font-black text-2xl mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{photo.caption}</p>
                <div className="w-12 h-1 bg-primary-red mb-3 rounded-full translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75"></div>
                <p className="text-warm-gold text-xs font-black uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">Via {photo.source}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
