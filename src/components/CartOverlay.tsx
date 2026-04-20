import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, X, Trash2, Phone, ClipboardList } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function CartOverlay() {
  const { cart, removeFromCart, clearCart, total } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isOrdering, setIsOrdering] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    try {
      await addDoc(collection(db, 'orders'), {
        items: cart,
        total: total,
        status: 'pending',
        customerName,
        customerPhone,
        createdAt: serverTimestamp(),
      });
      setOrderSuccess(true);
      clearCart();
      setTimeout(() => {
        setOrderSuccess(false);
        setIsOpen(false);
        setIsOrdering(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Something went wrong. Please try calling us instead!");
    }
  };

  if (cart.length === 0 && !isOpen) return null;

  return (
    <>
      {/* Floating Cart Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-[60] bg-primary-red text-white p-4 rounded-full shadow-2xl flex items-center gap-2 hover:bg-warm-gold transition-colors group"
      >
        <ShoppingCart size={24} />
        <span className="bg-white text-primary-red px-2 py-0.5 rounded-full text-xs font-bold">
          {cart.reduce((sum, item) => sum + item.quantity, 0)}
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-dark-charcoal/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-dark-charcoal/5 flex justify-between items-center bg-primary-red text-white">
                <h3 className="text-2xl font-display font-bold">Your Order</h3>
                <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 max-h-[60vh] overflow-y-auto">
                {orderSuccess ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🎉</div>
                    <h4 className="text-3xl font-display font-bold text-primary-green mb-2">¡Gracias!</h4>
                    <p className="text-dark-charcoal/60">Your order has been sent to Ygor. We'll start cooking soon!</p>
                  </div>
                ) : isOrdering ? (
                  <form onSubmit={handleSubmitOrder} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-dark-charcoal/60 uppercase">Your Name</label>
                      <input 
                        required
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full p-4 bg-off-white rounded-xl border-2 border-transparent focus:border-warm-gold outline-none transition-all"
                        placeholder="e.g. Juan Taco"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-dark-charcoal/60 uppercase">Phone Number</label>
                      <input 
                        required
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full p-4 bg-off-white rounded-xl border-2 border-transparent focus:border-warm-gold outline-none transition-all"
                        placeholder="e.g. (512) 555-0123"
                      />
                    </div>
                    <div className="pt-4">
                      <button 
                        type="submit"
                        className="w-full bg-primary-green text-white py-4 rounded-xl font-black text-xl shadow-lg hover:bg-dark-charcoal transition-all"
                      >
                        Confirm Order (${total.toFixed(2)})
                      </button>
                      <button 
                        type="button"
                        onClick={() => setIsOrdering(false)}
                        className="w-full mt-2 text-dark-charcoal/40 font-bold hover:text-primary-red transition-colors"
                      >
                        Back to Cart
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="space-y-4 mb-8">
                      {cart.map((item) => (
                        <div key={item.id} className="flex justify-between items-center group">
                          <div className="flex items-center gap-4">
                            <div className="w-8 h-8 bg-warm-gold/20 rounded-lg flex items-center justify-center font-bold text-warm-gold">
                              {item.quantity}
                            </div>
                            <div>
                              <div className="font-bold text-dark-charcoal">{item.name}</div>
                              <div className="text-sm text-dark-charcoal/40">{item.price} each</div>
                            </div>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-dark-charcoal/20 hover:text-primary-red transition-colors"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-dark-charcoal/5 pt-6 space-y-4">
                      <div className="flex justify-between items-center text-2xl font-display font-black">
                        <span>Total</span>
                        <span className="text-primary-green">${total.toFixed(2)}</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <button 
                          onClick={() => setIsOrdering(true)}
                          className="bg-primary-red text-white py-4 rounded-xl font-black shadow-lg hover:bg-dark-charcoal transition-all flex items-center justify-center gap-2"
                        >
                          <ClipboardList size={20} /> Checkout
                        </button>
                        <a 
                          href="tel:5126203333"
                          className="bg-warm-gold text-dark-charcoal py-4 rounded-xl font-black shadow-lg hover:bg-white transition-all flex items-center justify-center gap-2"
                        >
                          <Phone size={20} /> Call Now
                        </a>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
