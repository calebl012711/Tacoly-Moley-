import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { db, auth, signInWithGoogle, logout } from '../lib/firebase';
import { collection, query, orderBy, onSnapshot, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { Check, Clock, X, LogOut, ShieldCheck, Phone, User } from 'lucide-react';

export default function WorkerDashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });

    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const unsubscribeOrders = onSnapshot(q, (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOrders(ordersData);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeOrders();
    };
  }, []);

  const updateStatus = async (orderId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), { status: newStatus });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const deleteOrder = async (orderId: string) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await deleteDoc(doc(db, 'orders', orderId));
      } catch (error) {
        console.error("Error deleting order:", error);
      }
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-off-white">Loading...</div>;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-charcoal p-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-12 rounded-[3rem] shadow-2xl text-center max-w-md w-full"
        >
          <div className="w-20 h-20 bg-primary-red rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-xl">
            <ShieldCheck size={40} />
          </div>
          <h2 className="text-4xl font-display font-black text-dark-charcoal mb-4">Worker Portal</h2>
          <p className="text-dark-charcoal/60 mb-8">Please sign in with your authorized Google account to view orders.</p>
          <button 
            onClick={signInWithGoogle}
            className="w-full bg-primary-red text-white py-4 rounded-2xl font-black text-xl hover:bg-dark-charcoal transition-all shadow-lg flex items-center justify-center gap-3"
          >
            Sign In with Google
          </button>
        </motion.div>
      </div>
    );
  }

  // Simple admin check (hardcoded for now, but firestore rules protect the data)
  const isAdmin = user.email === "calebl012711@gmail.com";

  return (
    <div className="min-h-screen bg-off-white">
      {/* Header */}
      <header className="bg-white border-b border-dark-charcoal/5 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-primary-red p-2 rounded-xl text-white">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-display font-black text-dark-charcoal">Tacoly Moly Dashboard</h1>
              <p className="text-xs text-dark-charcoal/40 font-bold uppercase tracking-widest">Live Order Stream</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-sm font-bold text-dark-charcoal/60">
              <User size={16} /> {user.displayName}
            </div>
            <button 
              onClick={logout}
              className="p-2 rounded-xl hover:bg-primary-red/10 text-primary-red transition-colors"
              title="Logout"
            >
              <LogOut size={24} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {orders.map((order) => (
              <motion.div
                key={order.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`bg-white rounded-[2.5rem] shadow-xl overflow-hidden border-2 transition-all ${
                  order.status === 'pending' ? 'border-primary-red shadow-primary-red/10' :
                  order.status === 'preparing' ? 'border-warm-gold shadow-warm-gold/10' :
                  order.status === 'ready' ? 'border-primary-green shadow-primary-green/10' :
                  'border-transparent'
                }`}
              >
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-display font-bold text-dark-charcoal">{order.customerName}</h3>
                      <a href={`tel:${order.customerPhone}`} className="text-sm font-bold text-primary-red flex items-center gap-1 mt-1">
                        <Phone size={14} /> {order.customerPhone}
                      </a>
                    </div>
                    <div className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      order.status === 'pending' ? 'bg-primary-red text-white' :
                      order.status === 'preparing' ? 'bg-warm-gold text-dark-charcoal' :
                      order.status === 'ready' ? 'bg-primary-green text-white' :
                      'bg-dark-charcoal/10 text-dark-charcoal/40'
                    }`}>
                      {order.status}
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    {order.items.map((item: any, i: number) => (
                      <div key={i} className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-3">
                          <span className="font-black text-primary-red">x{item.quantity}</span>
                          <span className="font-bold text-dark-charcoal">{item.name}</span>
                        </div>
                        <span className="text-dark-charcoal/40">{item.price}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-dark-charcoal/5 pt-6 flex flex-wrap gap-2">
                    {order.status === 'pending' && (
                      <button 
                        onClick={() => updateStatus(order.id, 'preparing')}
                        className="flex-1 bg-warm-gold text-dark-charcoal py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-dark-charcoal hover:text-white transition-all flex items-center justify-center gap-2"
                      >
                        <Clock size={16} /> Start Cooking
                      </button>
                    )}
                    {order.status === 'preparing' && (
                      <button 
                        onClick={() => updateStatus(order.id, 'ready')}
                        className="flex-1 bg-primary-green text-white py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-dark-charcoal transition-all flex items-center justify-center gap-2"
                      >
                        <Check size={16} /> Ready!
                      </button>
                    )}
                    {order.status === 'ready' && (
                      <button 
                        onClick={() => updateStatus(order.id, 'completed')}
                        className="flex-1 bg-dark-charcoal text-white py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-primary-green transition-all flex items-center justify-center gap-2"
                      >
                        <Check size={16} /> Complete
                      </button>
                    )}
                    {isAdmin && (
                      <button 
                        onClick={() => deleteOrder(order.id)}
                        className="p-3 rounded-xl bg-primary-red/10 text-primary-red hover:bg-primary-red hover:text-white transition-all"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {orders.length === 0 && (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🌮</div>
            <h2 className="text-3xl font-display font-bold text-dark-charcoal/40">No active orders.</h2>
            <p className="text-dark-charcoal/20">Time to prep some salsa!</p>
          </div>
        )}
      </main>
    </div>
  );
}
