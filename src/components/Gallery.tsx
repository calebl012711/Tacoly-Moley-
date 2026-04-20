import { motion } from 'motion/react';

const photos = [
  {
    url: "https://truckster-storage.s3.amazonaws.com/trucks/61ae573c91461-Tacoly-Moly.jpg",
    caption: "The Tacoly Moly Trailer in Austin",
    source: "Tacoly Moly"
  },
  {
    url: "https://picsum.photos/seed/al-pastor-real/800/600",
    caption: "Al Pastor Costras (Cheese Crust)",
    source: "Tacoly Moly"
  },
  {
    url: "https://picsum.photos/seed/griddle-fresh/800/600",
    caption: "Fresh Tacos on the Griddle",
    source: "Tacoly Moly"
  },
  {
    url: "https://picsum.photos/seed/taco-platter/800/600",
    caption: "Our Signature Taco Platter",
    source: "Tacoly Moly"
  },
  {
    url: "https://picsum.photos/seed/ygor-cooking/800/600",
    caption: "Authentic Mexican Flavors",
    source: "Tacoly Moly"
  },
  {
    url: "https://picsum.photos/seed/street-tacos-variety/800/600",
    caption: "Variety of Street Tacos",
    source: "Tacoly Moly"
  }
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="font-accent text-warm-gold text-3xl mb-4 block transform rotate-2">¡Qué Chulada!</span>
          <h2 className="text-5xl md:text-6xl font-display font-black text-dark-charcoal mb-4">
            A Taste of <span className="text-primary-red">Tacoly Moly</span>
          </h2>
          <p className="text-xl text-dark-charcoal/60 font-semibold uppercase tracking-widest">
            Real photos from our amazing customers
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-xl"
            >
              <img 
                src={photo.url} 
                alt={photo.caption}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <p className="text-white font-display font-bold text-xl mb-1">{photo.caption}</p>
                <p className="text-warm-gold text-xs font-black uppercase tracking-widest">Via {photo.source}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
