import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  icon: string;
  color: string;
  popular?: boolean;
  imageUrl?: string;
}

const menuData: Record<string, MenuItem[]> = {
  "Breakfast Tacos": [
    { id: "black-bean-cheese", name: "Black Bean And Cheese", description: "Slow cooked whole black beans topped with shredded Monterrey jack cheese", price: "$2.25", icon: "🫘", color: "bg-warm-gold", imageUrl: "https://picsum.photos/seed/beans/800/600" },
    { id: "bacon-egg", name: "Bacon And Egg", description: "Crispy bacon and egg", price: "$2.55", icon: "🥓", color: "bg-primary-red", popular: true, imageUrl: "https://picsum.photos/seed/bacon-egg/800/600" },
    { id: "ham-egg", name: "Ham And Egg", description: "Smoked ham and egg", price: "$2.55", icon: "🍖", color: "bg-warm-gold", imageUrl: "https://picsum.photos/seed/ham-egg/800/600" },
    { id: "chorizo-egg", name: "Chorizo And Egg", description: "Mexican style chorizo and egg", price: "$2.55", icon: "🌶️", color: "bg-primary-red", imageUrl: "https://picsum.photos/seed/chorizo/800/600" },
    { id: "sausage-egg", name: "Sausage And Egg", description: "Spicy sausage and cheese", price: "$2.55", icon: "🌭", color: "bg-warm-gold", imageUrl: "https://picsum.photos/seed/sausage/800/600" },
    { id: "nopal-egg", name: "Nopal And Egg", description: "Cactus and egg", price: "$2.55", icon: "🌵", color: "bg-primary-green", imageUrl: "https://picsum.photos/seed/cactus/800/600" },
    { id: "migas-taco", name: "Migas", description: "Crispy tortillas strips, egg, topped with pico de gallo, cheese and avocado", price: "$2.95", icon: "🍳", color: "bg-primary-red", popular: true, imageUrl: "https://picsum.photos/seed/migas/800/600" },
  ],
  "Tacos": [
    { id: "crispy-taco", name: "Crispy Taco", description: "Seasoned ground beef with lettuce, cheese, and pico de gallo", price: "$3.25", icon: "🌮", color: "bg-warm-gold", imageUrl: "https://picsum.photos/seed/crispy-taco/800/600" },
    { id: "campechano-taco", name: "Campechano", description: "Chorizo and Beef Fajita mix topped with onions and cilantro", price: "$3.75", icon: "🥩", color: "bg-primary-red", popular: true, imageUrl: "https://picsum.photos/seed/campechano/800/600" },
    { id: "pastor-taco", name: "Pastor", description: "Marinated pork grilled with pineapple", price: "$3.55", icon: "🍍", color: "bg-warm-gold", imageUrl: "https://picsum.photos/seed/al-pastor/800/600" },
    { id: "shrimp-taco", name: "Shrimp Taco", description: "Grilled shrimp, grilled cabbage slaw, topped with pickled onions, fresh mangos cilantro and lime", price: "$3.95", icon: "🍤", color: "bg-accent-teal", popular: true, imageUrl: "https://picsum.photos/seed/shrimp-taco/800/600" },
    { id: "beef-fajita-taco", name: "Beef Fajita", description: "Marinated Beef fajita grilled with peppers and onions, garnished with cilantro and a slice of lime", price: "$3.95", icon: "🥩", color: "bg-primary-red", imageUrl: "https://picsum.photos/seed/beef-fajita/800/600" },
    { id: "chicken-fajita-taco", name: "Chicken Fajita", description: "Marinated chicken fajita, grilled with peppers and onions, garnished with cilantro and a slice of lime", price: "$3.55", icon: "🍗", color: "bg-primary-green", imageUrl: "https://picsum.photos/seed/chicken-fajita/800/600" },
    { id: "veggie-1-taco", name: "Veggie #1", description: "Grilled mushrooms, zucchini, bell peppers, onions, and carrots. Garnished with cilantro and a slice of lime", price: "$3.55", icon: "🍄", color: "bg-primary-green", imageUrl: "https://picsum.photos/seed/veggie-taco/800/600" },
    { id: "veggie-2-taco", name: "Veggie #2", description: "Roasted corn, black beans, pico de gallo, grilled peppers, and onions. Garnished with a slice of avocado, cilantro and a slice of lime.", price: "$3.55", icon: "🥑", color: "bg-accent-teal", imageUrl: "https://picsum.photos/seed/avocado-taco/800/600" },
  ],
  "Bowls": [
    { id: "beef-bowl", name: "Beef Bowl", description: "Marinated grilled Beef, bell pepper, onions, served on a bed of rice, black beans roasted corn, pico de gallo, topped with fresh avocado, cilantro and a slice of lime. Side of chips, flour or corn tortillas.", price: "$8.95", icon: "🥣", color: "bg-primary-red", popular: true, imageUrl: "https://picsum.photos/seed/beef-bowl/800/600" },
    { id: "chicken-bowl", name: "Chicken Bowl", description: "Marinated grilled Chicken, bell pepper, onions, served on a bed of rice, black beans roasted corn, pico de gallo, topped with fresh avocado, cilantro and a slice of lime. Side of chips, flour or corn tortillas.", price: "$7.95", icon: "🍗", color: "bg-primary-green", imageUrl: "https://picsum.photos/seed/chicken-bowl/800/600" },
    { id: "pastor-bowl", name: "Pastor Bowl", description: "Marinated pork, grilled pineapple, served on a bed of rice, black beans roasted corn, pico de gallo, topped with fresh avocado, cilantro and a slice of lime. Side of chips, flour or corn tortillas.", price: "$7.95", icon: "🍍", color: "bg-warm-gold", imageUrl: "https://picsum.photos/seed/pastor-bowl/800/600" },
    { id: "shrimp-bowl", name: "Shrimp Bowl", description: "Marinated grilled Shrimp, cabbage slaw served on a bed of rice, black beans roasted corn, pico de gallo, topped with pickled onions, mangos, fresh avocado, cilantro and a slice of lime. Side of chips, flour or corn tortillas.", price: "$8.95", icon: "🍤", color: "bg-accent-teal", imageUrl: "https://picsum.photos/seed/shrimp-bowl/800/600" },
    { id: "veggie-bowl", name: "Veggie Bowl", description: "Marinated grilled zucchini, mushrooms, carrots, bell pepper, onions, served on a bed of rice, black beans roasted corn, pico de gallo, topped with fresh avocado, cilantro and a slice of lime. Side of chips, flour or corn tortillas.", price: "$6.95", icon: "🍄", color: "/bg-primary-green", imageUrl: "https://picsum.photos/seed/veggie-bowl/800/600" },
  ],
  "Quesadillas": [
    { id: "cheese-quesadilla", name: "Cheese", description: "Shredded jack and cheddar crisped to perfections inside a 12\" flour tortilla paired with side of lettuce, pico and sour cream", price: "$5.95", icon: "🧀", color: "bg-warm-gold", imageUrl: "https://picsum.photos/seed/cheese-quesadilla/800/600" },
    { id: "chicken-fajita-quesadilla", name: "Chicken Fajita", description: "Marinated grilled chicken, bell peppers and onions, shredded jack and cheddar crisped to perfection inside a 12\" flour tortilla paired with side of lettuce, pico and sour cream", price: "$6.95", icon: "🍗", color: "bg-primary-green", imageUrl: "https://picsum.photos/seed/chicken-quesadilla/800/600" },
    { id: "beef-fajita-quesadilla", name: "Beef Fajita", description: "Grilled marinated Beef fajita, Shredded jack and cheddar crisped to perfections inside a 12\" flour tortilla paired with side of lettuce, pico and sour cream", price: "$7.95", icon: "🥩", color: "bg-primary-red", popular: true, imageUrl: "https://picsum.photos/seed/beef-quesadilla/800/600" },
    { id: "shrimp-quesadilla", name: "Shrimp", description: "Seasoned grilled shrimp, Shredded jack and cheddar crisped to perfections inside a 12\" flour tortilla paired with side of lettuce, pico and sour cream", price: "$7.95", icon: "🍤", color: "bg-accent-teal", imageUrl: "https://picsum.photos/seed/shrimp-quesadilla/800/600" },
    { id: "pastor-quesadilla", name: "Pastor", description: "Marinated pork, grilled pineapple, Shredded jack and cheddar crisped to perfections inside a 12\" flour tortilla paired with side of lettuce, pico and sour cream", price: "$6.95", icon: "🍍", color: "bg-warm-gold", imageUrl: "https://picsum.photos/seed/pastor-quesadilla/800/600" },
    { id: "veggie-quesadilla", name: "Veggie", description: "Grilled mushrooms, carrots, zucchini, bell peppers, and onions, Shredded jack and cheddar crisped to perfections inside a 12\" flour tortilla paired with side of lettuce, pico and sour cream", price: "$6.55", icon: "🍄", color: "bg-primary-green", imageUrl: "https://picsum.photos/seed/veggie-quesadilla/800/600" },
  ],
  "Sides": [
    { id: "chips-queso", name: "Chips And Queso", description: "Delicious queso topped with pico de gallo", price: "$3.95", icon: "🧀", color: "bg-warm-gold", popular: true, imageUrl: "https://picsum.photos/seed/chips-queso/800/600" },
    { id: "queso-compuesto", name: "Queso Compuesto", description: "Queso on roids, steroids that is. Our delicious queso topped off with fresh avocado, pico de gallo, seasoned ground beef and cilantro.", price: "$4.95", icon: "🧀", color: "bg-primary-red", imageUrl: "https://picsum.photos/seed/queso/800/600" },
    { id: "street-corn", name: "Street Corn", description: "Roasted corn in a cup, topped off with queso, fresh avocado, pickled onions, fresh avocado, Valentina, tajin and cilantro.", price: "$3.95", icon: "🌽", color: "bg-warm-gold", imageUrl: "https://picsum.photos/seed/street-corn/800/600" },
    { id: "rice-side", name: "Rice", description: "vegan - 8oz side of Spanish rice", price: "$1.95", icon: "🍚", color: "bg-warm-gold", imageUrl: "https://picsum.photos/seed/mexican-rice/800/600" },
    { id: "black-beans-side", name: "Black Beans", description: "vegan - Slow roasted whole black beans", price: "$1.95", icon: "🫘", color: "bg-primary-red", imageUrl: "https://picsum.photos/seed/black-beans/800/600" },
    { id: "chips-salsa", name: "Chips And Salsa", description: "8oz of fresh made daily roja or tomatillo salsa", price: "$2.95", icon: "🌶️", color: "bg-primary-green", imageUrl: "https://picsum.photos/seed/chips-salsa/800/600" },
    { id: "nachos", name: "Nachos", description: "vegetarian - Tostadas smothered in homemade queso, pico de gallo, black beans, fresh avocado and cilantro", price: "$5.95", icon: "🧀", color: "bg-primary-red", imageUrl: "https://picsum.photos/seed/nachos/800/600" },
  ],
  "Drinks": [
    { id: "jarritos", name: "Jarritos", description: "Natural flavored sodas with real sugar", price: "$2.95", icon: "🥤", color: "bg-warm-gold", imageUrl: "https://picsum.photos/seed/jarritos/800/600" },
    { id: "sidral-mundet", name: "Sidral Mundet", description: "Apple flavored soda with real sugar", price: "$2.95", icon: "🍎", color: "bg-primary-red", imageUrl: "https://picsum.photos/seed/apple-soda/800/600" },
    { id: "sangria", name: "Sangria", description: "Non alcoholic sangria", price: "$2.95", icon: "🍷", color: "bg-primary-red", imageUrl: "https://picsum.photos/seed/sangria/800/600" },
    { id: "mexican-coke", name: "Mexican Coke", description: "Bottled coke with real cane sugar", price: "$2.95", icon: "🥤", color: "bg-dark-charcoal", imageUrl: "https://picsum.photos/seed/mexican-coke/800/600" },
    { id: "mineragua", name: "Mineragua", description: "Sparkling water", price: "$2.95", icon: "🫧", color: "bg-accent-teal", imageUrl: "https://picsum.photos/seed/sparkling-water/800/600" },
    { id: "water-bottle", name: "Water Bottle", description: "Bottled water", price: "$1.00", icon: "💧", color: "bg-accent-teal", imageUrl: "https://picsum.photos/seed/water-bottle/800/600" },
  ]
};

export default function Menu() {
  const [activeTab, setActiveTab] = useState("Breakfast Tacos");
  const { addToCart } = useCart();

  return (
    <section id="menu" className="py-24 bg-off-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="font-accent text-primary-red text-3xl mb-4 block transform rotate-2">¡Qué Rico!</span>
          <h2 className="text-5xl md:text-6xl font-display font-black text-dark-charcoal mb-4">
            What We're Serving <span className="text-primary-red">🌮</span>
          </h2>
          <p className="text-xl text-dark-charcoal/60 font-semibold uppercase tracking-widest">
            Fresh. Bold. Made to Order. Always.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {Object.keys(menuData).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-full font-bold transition-all ${
                activeTab === tab 
                ? 'bg-warm-gold text-dark-charcoal shadow-lg scale-105' 
                : 'bg-white text-dark-charcoal/60 hover:bg-white/80'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {menuData[activeTab].map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  ease: [0.215, 0.610, 0.355, 1.000] // Cubic bezier for smooth entrance
                }}
                className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all border border-dark-charcoal/5 group relative overflow-hidden flex flex-col h-full"
              >
                {/* Item Image */}
                {item.imageUrl && (
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={item.imageUrl} 
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                )}

                <div className="p-6 flex flex-col flex-grow">
                  {item.popular && (
                    <div className="absolute top-4 right-4 bg-primary-red text-white text-[10px] font-black uppercase tracking-tighter px-2 py-1 rounded-md shadow-sm z-10">
                      🔥 Popular
                    </div>
                  )}
                  <div className="flex justify-between items-start mb-4">
                    <div className={`w-12 h-12 ${item.color} rounded-2xl flex items-center justify-center text-2xl shadow-inner group-hover:rotate-12 transition-transform`}>
                      {item.icon}
                    </div>
                    <span className="text-primary-green font-bold text-lg">{item.price}</span>
                  </div>
                  <h3 className="text-2xl font-display font-bold text-dark-charcoal mb-2 group-hover:text-primary-red transition-colors flex items-center gap-2">
                    {item.name} <span className="text-xl opacity-0 group-hover:opacity-100 transition-opacity">🌮</span>
                  </h3>
                  <p className="text-dark-charcoal/60 text-sm leading-relaxed mb-4 flex-grow">
                    {item.description}
                  </p>
                  
                  <div className="mb-4">
                    <span className="font-accent text-primary-green text-lg">Ygor's Choice!</span>
                  </div>

                  <button 
                    onClick={() => addToCart(item)}
                    className="w-full py-3 rounded-xl bg-off-white text-dark-charcoal/40 text-xs font-black uppercase tracking-widest group-hover:bg-primary-red group-hover:text-white transition-all shadow-sm group-hover:shadow-md"
                  >
                    Add to Order
                  </button>
                </div>

                {/* Bottom Border Accent */}
                <div className={`absolute bottom-0 left-0 right-0 h-1.5 ${item.color} opacity-50`}></div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="mt-16 text-center">
          <p className="text-dark-charcoal/50 italic text-sm">
            "Menu items and availability may vary. Ask Ygor about today's specials! 🌮"
          </p>
        </div>
      </div>
    </section>
  );
}
