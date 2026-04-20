import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Clock, ExternalLink, Copy, Check } from 'lucide-react';

export default function FindUs() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const address = "3505 Country White Ln, Austin, TX 78749";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const austinTime = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Chicago',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
        weekday: 'long'
      }).formatToParts(now);

      const day = austinTime.find(p => p.type === 'weekday')?.value;
      const hour = parseInt(austinTime.find(p => p.type === 'hour')?.value || '0');

      if (day === 'Monday') {
        setIsOpen(false);
      } else {
        setIsOpen(hour >= 8 && hour < 22);
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const hours = [
    { day: "Monday", time: "Closed" },
    { day: "Tuesday", time: "8:00 AM – 10:00 PM" },
    { day: "Wednesday", time: "8:00 AM – 10:00 PM" },
    { day: "Thursday", time: "8:00 AM – 10:00 PM" },
    { day: "Friday", time: "8:00 AM – 10:00 PM" },
    { day: "Saturday", time: "8:00 AM – 10:00 PM" },
    { day: "Sunday", time: "8:00 AM – 10:00 PM" },
  ];

  return (
    <section id="find-us" className="py-24 bg-[#E8F8F0] overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-green/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-accent text-primary-green text-3xl mb-4 block transform -rotate-2">¿Dónde Estamos?</span>
            <h2 className="text-5xl md:text-6xl font-display font-black text-dark-charcoal mb-8">
              Come Find Us <span className="text-primary-green">📍</span>
            </h2>

            <div className="space-y-8 mb-12">
              <div className="group bg-white/50 p-6 rounded-3xl border border-primary-green/10 hover:bg-white transition-all shadow-sm hover:shadow-md">
                <div className="flex gap-4 items-start">
                  <div className="bg-primary-green/10 p-3 rounded-2xl text-primary-green group-hover:scale-110 transition-transform">
                    <MapPin size={28} />
                  </div>
                  <div className="flex-1">
                    <div className="text-xl font-bold text-dark-charcoal">3505 Country White Ln</div>
                    <div className="text-dark-charcoal/60">Austin, TX 78749</div>
                    <div className="font-accent text-primary-red text-xl mt-1">¡En Nomadic Beerworks!</div>
                    <button 
                      onClick={copyToClipboard}
                      className="mt-3 flex items-center gap-2 text-sm font-bold text-primary-green hover:text-dark-charcoal transition-colors"
                    >
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                      {copied ? "Copied!" : "Copy Address"}
                    </button>
                  </div>
                </div>
              </div>

              <div className="group bg-white/50 p-6 rounded-3xl border border-primary-green/10 hover:bg-white transition-all shadow-sm hover:shadow-md">
                <div className="flex gap-4 items-start">
                  <div className="bg-primary-green/10 p-3 rounded-2xl text-primary-green group-hover:scale-110 transition-transform">
                    <Phone size={28} />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-dark-charcoal">Call Us Now</div>
                    <a href="tel:5126203333" className="text-2xl font-display font-bold text-primary-red hover:text-dark-charcoal transition-colors tracking-tight flex items-center gap-2">
                      (512) 620-3333 <span className="font-accent text-warm-gold text-lg">¡Llama ya!</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="group bg-white/50 p-6 rounded-3xl border border-primary-green/10 hover:bg-white transition-all shadow-sm hover:shadow-md">
                <div className="flex gap-4 items-start">
                  <div className="bg-primary-green/10 p-3 rounded-2xl text-primary-green group-hover:scale-110 transition-transform">
                    <Clock size={28} />
                  </div>
                  <div className="w-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-xl font-bold text-dark-charcoal">Our Hours</div>
                      {isOpen ? (
                        <span className="bg-primary-green text-white text-xs px-3 py-1 rounded-full font-bold animate-pulse">¡Estamos Abiertos! 🟢</span>
                      ) : (
                        <span className="bg-primary-red text-white text-xs px-3 py-1 rounded-full font-bold">Cerrado Hoy 🔴</span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-y-2 max-w-sm">
                      {hours.map((h) => (
                        <div key={h.day} className="contents">
                          <div className={`text-sm ${h.day === 'Monday' ? 'text-dark-charcoal/40' : 'text-dark-charcoal/80 font-semibold'}`}>{h.day}</div>
                          <div className={`text-sm text-right ${h.day === 'Monday' ? 'text-dark-charcoal/40' : 'text-dark-charcoal/60'}`}>{h.time}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://www.google.com/maps/dir/?api=1&destination=3505+Country+White+Ln,+Austin,+TX+78749"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary-red text-white px-10 py-4 rounded-full font-bold hover:bg-dark-charcoal transition-all flex items-center justify-center gap-2 shadow-xl hover:-translate-y-1 group"
              >
                <span className="font-accent text-xl">¡Vamos!</span> Get Directions <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="tel:5126203333"
                className="bg-primary-green text-white px-10 py-4 rounded-full font-bold hover:bg-dark-charcoal transition-all flex items-center justify-center gap-2 shadow-xl hover:-translate-y-1 group"
              >
                <span className="font-accent text-xl">¡Llama!</span> Call Us Now <Phone size={18} className="group-hover:rotate-12 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-primary-green rounded-[3rem] rotate-3 -z-10 opacity-20 shadow-2xl"></div>
            <div className="absolute inset-0 bg-warm-gold rounded-[3rem] -rotate-2 -z-10 opacity-10 shadow-2xl"></div>
            <div className="bg-white p-4 rounded-[3rem] shadow-2xl overflow-hidden border-8 border-white group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3448.974514210434!2d-97.8488!3d30.2056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x865b4b7c8c8c8c8c%3A0x8c8c8c8c8c8c8c8c!2s3505%20Country%20White%20Ln%2C%20Austin%2C%20TX%2078749!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                width="100%"
                height="500"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                className="rounded-[2.5rem] grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
