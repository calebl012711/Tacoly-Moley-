/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useSpring } from 'motion/react';
import { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import FindUs from './components/FindUs';
import OrderNow from './components/OrderNow';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import SpecialsBanner from './components/SpecialsBanner';
import PapelPicado from './components/PapelPicado';
import CartOverlay from './components/CartOverlay';
import WorkerDashboard from './components/WorkerDashboard';

export default function App() {
  const [view, setView] = useState<'customer' | 'worker'>('customer');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('view') === 'worker') {
      setView('worker');
    }
  }, []);

  if (view === 'worker') {
    return <WorkerDashboard />;
  }

  return (
    <CartProvider>
      <div className="min-h-screen selection:bg-warm-gold selection:text-dark-charcoal relative">
        <motion.div
          className="fixed top-0 left-0 right-0 h-1.5 bg-warm-gold z-[70] origin-left"
          style={{ scaleX }}
        />
        <Navbar />
        <main>
          <Hero />
          <About />
          <div className="bg-off-white py-4">
            <PapelPicado />
          </div>
          <Menu />
          <Gallery />
          <Reviews />
          <FindUs />
          <OrderNow />
        </main>
        <Footer />
        <BackToTop />
        <CartOverlay />
      </div>
    </CartProvider>
  );
}
