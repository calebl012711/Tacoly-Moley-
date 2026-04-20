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
    { id: "black-bean-cheese", name: "Black Bean And Cheese", description: "Slow cooked whole black beans topped with shredded Monterrey jack cheese", price: "$2.25", icon: "🫘", color: "bg-warm-gold", imageUrl: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&q=80&w=800" },
    { id: "bacon-egg", name: "Bacon And Egg", description: "Crispy bacon and egg", price: "$2.55", icon: "🥓", color: "bg-primary-red", popular: true, imageUrl: "https://images.unsplash.com/photo-1525351326368-efbb5cb6814d?auto=format&fit=crop&q=80&w=800" },
    { id: "ham-egg", name: "Ham And Egg", description: "Smoked ham and egg", price: "$2.55", icon: "🍖", color: "bg-warm-gold", imageUrl: "https://images.unsplash.com/photo-1596560548464-f2bb1e89addc?auto=format&fit=crop&q=80&w=800" },
    { id: "chorizo-egg", name: "Chorizo And Egg", description: "Mexican style chorizo and egg", price: "$2.55", icon: "🌶️", color: "bg-primary-red", imageUrl: "https://images.unsplash.com/photo-1624300629298-e9ad39c13bc0?auto=format&fit=crop&q=80&w=800" },
    { id: "sausage-egg", name: "Sausage And Egg", description: "Spicy sausage and cheese", price: "$2.55", icon: "🌭", color: "bg-warm-gold", imageUrl: "https://images.unsplash.com/photo-1613514785445-ba7e8e58d949?auto=format&fit=crop&q=80&w=800" },
    { id: "nopal-egg", name: "Nopal And Egg", description: "Cactus and egg", price: "$2.55", icon: "🌵", color: "bg-primary-green", imageUrl: "https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?auto=format&fit=crop&q=80&w=800" },
    { id: "migas-taco", name: "Migas", description: "Crispy tortillas strips, egg, topped with pico de gallo, cheese and avocado", price: "$2.95", icon: "🍳", color: "bg-primary-red", popular: true, imageUrl: "https://images.unsplash.com/photo-1551504734-b4631abbb7ea?auto=format&fit=crop&q=80&w=800" },
  ],
  "Tacos": [
    { id: "crispy-taco", name: "Crispy Taco", description: "Seasoned ground beef with lettuce, cheese, and pico de gallo", price: "$3.25", icon: "🌮", color: "bg-warm-gold", imageUrl: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=800" },
    { id: "campechano-taco", name: "Campechano", description: "Chorizo and Beef Fajita mix topped with onions and cilantro", price: "$3.75", icon: "🥩", color: "bg-primary-red", popular: true, imageUrl: "https://images.gotruckster.com/foodtruck/1486/categories/2053QQXAFao3OXSYt4OX1e4NAJdBXz8EdLZqcWRJsly2.jpeg" },
    { id: "pastor-taco", name: "Pastor", description: "Marinated pork grilled with pineapple", price: "$3.55", icon: "🍍", color: "bg-warm-gold", imageUrl: "https://images.gotruckster.com/foodtruck/1486/categories/2053oTR5ft85DHbsPCmyONCxFQAaQPGI9aQxN0fOx18Y.jpeg" },
    { id: "shrimp-taco", name: "Shrimp Taco", description: "Grilled shrimp, grilled cabbage slaw, topped with pickled onions, fresh mangos cilantro and lime", price: "$3.95", icon: "🍤", color: "bg-accent-teal", popular: true, imageUrl: "https://images.gotruckster.com/foodtruck/1486/categories/2053hpoWp58vysGEWLbFeNuWjthhy2gKNtSQFzE4MV41.jpeg" },
    { id: "beef-fajita-taco", name: "Beef Fajita", description: "Marinated Beef fajita grilled with peppers and onions, garnished with cilantro and a slice of lime", price: "$3.95", icon: "🥩", color: "bg-primary-red", imageUrl: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&q=80&w=800" },
    { id: "chicken-fajita-taco", name: "Chicken Fajita", description: "Marinated chicken fajita, grilled with peppers and onions, garnished with cilantro and a slice of lime", price: "$3.55", icon: "🍗", color: "bg-primary-green", imageUrl: "https://images.gotruckster.com/foodtruck/1486/categories/20546omirlHpLuCCiwEsQeO34OT0imNirtHcgXtiHepx.jpeg" },
    { id: "veggie-1-taco", name: "Veggie #1", description: "Grilled mushrooms, zucchini, bell peppers, onions, and carrots. Garnished with cilantro and a slice of lime", price: "$3.55", icon: "🍄", color: "bg-primary-green", imageUrl: "https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?auto=format&fit=crop&q=80&w=800" },
    { id: "veggie-2-taco", name: "Veggie #2", description: "Roasted corn, black beans, pico de gallo, grilled peppers, and onions. Garnished with a slice of avocado, cilantro and a slice of lime.", price: "$3.55", icon: "🥑", color: "bg-accent-teal", imageUrl: "https://images.unsplash.com/photo-1541513200777-628dcd981ebc?auto=format&fit=crop&q=80&w=800" },
  ],
  "Bowls": [
    { id: "beef-bowl", name: "Beef Bowl", description: "Marinated grilled Beef, bell pepper, onions, served on a bed of rice, black beans roasted corn, pico de gallo, topped with fresh avocado, cilantro and a slice of lime. Side of chips, flour or corn tortillas.", price: "$8.95", icon: "🥣", color: "bg-primary-red", popular: true, imageUrl: "https://images.gotruckster.com/foodtruck/1486/categories/2054gQj8LYz5pS2S05OtBNt0RlBENS6Y3Ep0Y6UJ3JOf.jpeg" },
    { id: "chicken-bowl", name: "Chicken Bowl", description: "Marinated grilled Chicken, bell pepper, onions, served on a bed of rice, black beans roasted corn, pico de gallo, topped with fresh avocado, cilantro and a slice of lime. Side of chips, flour or corn tortillas.", price: "$7.95", icon: "🍗", color: "bg-primary-green", imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800" },
    { id: "pastor-bowl", name: "Pastor Bowl", description: "Marinated pork, grilled pineapple, served on a bed of rice, black beans roasted corn, pico de gallo, topped with fresh avocado, cilantro and a slice of lime. Side of chips, flour or corn tortillas.", price: "$7.95", icon: "🍍", color: "bg-warm-gold", imageUrl: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=800" },
    { id: "shrimp-bowl", name: "Shrimp Bowl", description: "Marinated grilled Shrimp, cabbage slaw served on a bed of rice, black beans roasted corn, pico de gallo, topped with pickled onions, mangos, fresh avocado, cilantro and a slice of lime. Side of chips, flour or corn tortillas.", price: "$8.95", icon: "🍤", color: "bg-accent-teal", imageUrl: "https://images.unsplash.com/photo-1559564114-f58eeccf5fce?auto=format&fit=crop&q=80&w=800" },
    { id: "veggie-bowl", name: "Veggie Bowl", description: "Marinated grilled zucchini, mushrooms, carrots, bell pepper, onions, served on a bed of rice, black beans roasted corn, pico de gallo, topped with fresh avocado, cilantro and a slice of lime. Side of chips, flour or corn tortillas.", price: "$6.95", icon: "🍄", color: "bg-primary-green", imageUrl: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&q=80&w=800" },
  ],
  "Quesadillas": [
    { id: "cheese-quesadilla", name: "Cheese", description: "Shredded jack and cheddar crisped to perfections inside a 12\" flour tortilla paired with side of lettuce, pico and sour cream", price: "$5.95", icon: "🧀", color: "bg-warm-gold", imageUrl: "https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?auto=format&fit=crop&q=80&w=800" },
    { id: "chicken-fajita-quesadilla", name: "Chicken Fajita", description: "Marinated grilled chicken, bell peppers and onions, shredded jack and cheddar crisped to perfection inside a 12\" flour tortilla paired with side of lettuce, pico and sour cream", price: "$6.95", icon: "🍗", color: "bg-primary-green", imageUrl: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&q=80&w=800" },
    { id: "beef-fajita-quesadilla", name: "Beef Fajita", description: "Grilled marinated Beef fajita, Shredded jack and cheddar crisped to perfections inside a 12\" flour tortilla paired with side of lettuce, pico and sour cream", price: "$7.95", icon: "🥩", color: "bg-primary-red", popular: true, imageUrl: "https://images.unsplash.com/photo-1618063363346-60721245fae8?auto=format&fit=crop&q=80&w=800" },
    { id: "shrimp-quesadilla", name: "Shrimp", description: "Seasoned grilled shrimp, Shredded jack and cheddar crisped to perfections inside a 12\" flour tortilla paired with side of lettuce, pico and sour cream", price: "$7.95", icon: "🍤", color: "bg-accent-teal", imageUrl: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&q=80&w=800" },
    { id: "pastor-quesadilla", name: "Pastor", description: "Marinated pork, grilled pineapple, Shredded jack and cheddar crisped to perfections inside a 12\" flour tortilla paired with side of lettuce, pico and sour cream", price: "$6.95", icon: "🍍", color: "bg-warm-gold", imageUrl: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=800" },
    { id: "veggie-quesadilla", name: "Veggie", description: "Grilled mushrooms, carrots, zucchini, bell peppers, and onions, Shredded jack and cheddar crisped to perfections inside a 12\" flour tortilla paired with side of lettuce, pico and sour cream", price: "$6.55", icon: "🍄", color: "bg-primary-green", imageUrl: "https://images.unsplash.com/photo-1541513200777-628dcd981ebc?auto=format&fit=crop&q=80&w=800" },
  ],
  "Sides": [
    { id: "chips-queso", name: "Chips And Queso", description: "Delicious queso topped with pico de gallo", price: "$3.95", icon: "🧀", color: "bg-warm-gold", popular: true, imageUrl: "https://images.unsplash.com/photo-1513442542250-854d436a73f2?auto=format&fit=crop&q=80&w=800" },
    { id: "queso-compuesto", name: "Queso Compuesto", description: "Queso on roids, steroids that is. Our delicious queso topped off with fresh avocado, pico de gallo, seasoned ground beef and cilantro.", price: "$4.95", icon: "🧀", color: "bg-primary-red", imageUrl: "https://images.unsplash.com/photo-1582169505937-b9992bd01ed9?auto=format&fit=crop&q=80&w=800" },
    { id: "street-corn", name: "Street Corn", description: "Roasted corn in a cup, topped off with queso, fresh avocado, pickled onions, fresh avocado, Valentina, tajin and cilantro.", price: "$3.95", icon: "🌽", color: "bg-warm-gold", imageUrl: "https://images.unsplash.com/photo-1559132179-8804cb7aeb7e?auto=format&fit=crop&q=80&w=800" },
    { id: "rice-side", name: "Rice", description: "vegan - 8oz side of Spanish rice", price: "$1.95", icon: "🍚", color: "bg-warm-gold", imageUrl: "https://images.unsplash.com/photo-1613407981503-4c91b1bd6878?auto=format&fit=crop&q=80&w=800" },
    { id: "black-beans-side", name: "Black Beans", description: "vegan - Slow roasted whole black beans", price: "$1.95", icon: "🫘", color: "bg-primary-red", imageUrl: "https://images.unsplash.com/photo-1502013898695-09c3132e1d7d?auto=format&fit=crop&q=80&w=800" },
    { id: "chips-salsa", name: "Chips And Salsa", description: "8oz of fresh made daily roja or tomatillo salsa", price: "$2.95", icon: "🌶️", color: "bg-primary-green", imageUrl: "https://images.unsplash.com/photo-1586511925558-a4c6376fe65f?auto=format&fit=crop&q=80&w=800" },
    { id: "nachos", name: "Nachos", description: "vegetarian - Tostadas smothered in homemade queso, pico de gallo, black beans, fresh avocado and cilantro", price: "$5.95", icon: "🧀", color: "bg-primary-red", imageUrl: "https://images.unsplash.com/photo-1513442542250-854d436a73f2?auto=format&fit=crop&q=80&w=800" },
  ],
  "Drinks": [
    { id: "jarritos", name: "Jarritos", description: "Natural flavored sodas with real sugar", price: "$2.95", icon: "🥤", color: "bg-warm-gold", imageUrl: "https://images.unsplash.com/photo-1581008061453-6bb30358e658?auto=format&fit=crop&q=80&w=800" },
    { id: "sidral-mundet", name: "Sidral Mundet", description: "Apple flavored soda with real sugar", price: "$2.95", icon: "🍎", color: "bg-primary-red", imageUrl: "https://images.unsplash.com/photo-1601006509531-df13bdf2cfd1?auto=format&fit=crop&q=80&w=800" },
    { id: "sangria", name: "Sangria", description: "Non alcoholic sangria", price: "$2.95", icon: "🍷", color: "bg-primary-red", imageUrl: "https://images.unsplash.com/photo-1622320141670-36203cf3ea5c?auto=format&fit=crop&q=80&w=800" },
    { id: "mexican-coke", name: "Mexican Coke", description: "Bottled coke with real cane sugar", price: "$2.95", icon: "🥤", color: "bg-dark-charcoal", imageUrl: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800" },
    { id: "mineragua", name: "Mineragua", description: "Sparkling water", price: "$2.95", icon: "🫧", color: "bg-accent-teal", imageUrl: "https://images.unsplash.com/photo-1517594589252-9b2f672322a0?auto=format&fit=crop&q=80&w=800" },
    { id: "water-bottle", name: "Water Bottle", description: "Bottled water", price: "$1.00", icon: "💧", color: "bg-accent-teal", imageUrl: "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&q=80&w=800" },
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
                className="bg-white rounded-[32px] hover:-translate-y-2 shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300 border border-dark-charcoal/5 group relative overflow-hidden flex flex-col h-full"
              >
                {/* Item Image */}
                {item.imageUrl && (
                  <div className="h-56 overflow-hidden relative m-2 rounded-[24px]">
                    <img 
                      src={item.imageUrl} 
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-charcoal/40 to-transparent"></div>
                  </div>
                )}

                <div className="p-8 flex flex-col flex-grow">
                  {item.popular && (
                    <div className="absolute top-6 right-6 bg-primary-red text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg z-10 flex items-center gap-1">
                      🔥 Popular
                    </div>
                  )}
                  <div className="flex justify-between items-start mb-6">
                    <div className={`w-14 h-14 ${item.color} rounded-[20px] flex items-center justify-center text-2xl shadow-inner group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300`}>
                      {item.icon}
                    </div>
                    <span className="text-primary-green font-display font-black text-2xl">{item.price}</span>
                  </div>
                  <h3 className="text-2xl font-display font-black text-dark-charcoal mb-3 group-hover:text-primary-red transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-dark-charcoal/60 text-sm leading-relaxed mb-6 font-medium flex-grow">
                    {item.description}
                  </p>
                  
                  <button 
                    onClick={() => addToCart(item)}
                    className="w-full py-4 rounded-2xl bg-off-white set-dark-charcoal font-bold text-sm uppercase tracking-widest group-hover:bg-primary-red group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-xl active:scale-95"
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
