import { UtensilsCrossed, Instagram, MapPin, Phone, Star } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-dark-charcoal text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Column 1: Logo & Tagline */}
          <div className="space-y-6">
            <a href="#home" className="flex items-center gap-2 group">
              <div className="bg-warm-gold p-1.5 rounded-full group-hover:rotate-12 transition-transform">
                <UtensilsCrossed className="text-primary-red w-6 h-6" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-warm-gold text-2xl font-display font-black tracking-tight">Tacoly Moly</span>
                <span className="text-white text-sm font-accent ml-auto">By Ygor</span>
              </div>
            </a>
            <p className="text-white/60 text-lg leading-relaxed max-w-xs">
              Austin's Favorite Food Truck serving authentic Mexican street food with love. 🌮
            </p>
            <div className="pt-4">
              <span className="font-accent text-warm-gold text-2xl transform -rotate-3 block">¡Hasta Pronto!</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-warm-gold font-display font-bold text-xl mb-6 uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-4">
              {['Our Story', 'Menu', 'Reviews', 'Find Us', 'Order Now'].map((link) => (
                <li key={link}>
                  <a 
                    href={`#${link.toLowerCase().replace(' ', '-')}`} 
                    className="text-white/60 hover:text-warm-gold transition-colors font-semibold"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Connect */}
          <div>
            <h4 className="text-warm-gold font-display font-bold text-xl mb-6 uppercase tracking-widest">Connect</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/60">
                <MapPin className="text-primary-red shrink-0" size={20} />
                <span>3505 Country White Ln, Austin TX 78749</span>
              </li>
              <li className="flex items-center gap-3 text-white/60">
                <Phone className="text-primary-green shrink-0" size={20} />
                <a href="tel:5126203333" className="hover:text-white transition-colors">(512) 620-3333</a>
              </li>
              <li className="flex items-center gap-3 text-white/60">
                <Instagram className="text-accent-teal shrink-0" size={20} />
                <a href="https://instagram.com/tacolymolytacos" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">@tacolymolytacos</a>
              </li>
              <li className="flex items-center gap-3 text-white/60">
                <Star className="text-warm-gold shrink-0" size={20} fill="currentColor" />
                <a href="https://maps.google.com/?cid=14972221591552880305" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Leave Us a Review</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-10 text-center space-y-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Tacoly Moly By Ygor · Made with ❤️ in Austin, TX
          </p>
          <a 
            href="?view=worker" 
            className="inline-block text-[10px] font-black uppercase tracking-widest text-white/10 hover:text-white transition-colors"
          >
            Worker Login
          </a>
        </div>
      </div>
    </footer>
  );
}
