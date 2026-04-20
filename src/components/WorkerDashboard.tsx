import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { db, auth, signInWithGoogle, logout } from '../lib/firebase';
import { collection, query, orderBy, onSnapshot, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { Check, Clock, X, LogOut, ShieldCheck, Phone, User, LockKeyhole } from 'lucide-react';

export default function WorkerDashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [pinInput, setPinInput] = useState('');

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

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '2026') {
      setIsAuthorized(true);
      setPinInput('');
    } else {
      alert("Incorrect PIN");
      setPinInput('');
    }
  };

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

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#E4E3E0] font-mono text-xl">System Booting...</div>;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#141414] p-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-[#E4E3E0] p-12 rounded-lg shadow-2xl text-center max-w-md w-full border border-[#141414]"
        >
          <div className="w-20 h-20 bg-[#141414] rounded-lg flex items-center justify-center text-[#E4E3E0] mx-auto mb-6 shadow-xl">
            <User size={40} />
          </div>
          <h2 className="text-3xl font-display font-black text-[#141414] mb-2 uppercase tracking-widest">TAC-OS</h2>
          <p className="text-[#141414]/60 font-mono text-xs mb-8 uppercase tracking-widest">Operator Identity Check Required</p>
          <button 
            onClick={signInWithGoogle}
            className="w-full bg-[#141414] text-[#E4E3E0] py-4 rounded-md font-mono font-bold text-sm uppercase tracking-widest hover:bg-[#FF4444] hover:text-[#141414] transition-colors border-2 border-[#141414] flex items-center justify-center gap-3"
          >
            Authenticate
          </button>
        </motion.div>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#141414] p-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-[#E4E3E0] p-12 rounded-lg shadow-2xl text-center max-w-md w-full border border-[#141414]"
        >
          <div className="w-20 h-20 bg-[#141414] rounded-lg flex items-center justify-center text-[#FF4444] mx-auto mb-6 shadow-xl">
            <LockKeyhole size={40} />
          </div>
          <h2 className="text-3xl font-display font-black text-[#141414] mb-2 uppercase tracking-widest">System Locked</h2>
          <p className="text-[#141414]/60 font-mono text-xs mb-8 uppercase tracking-widest">Authorized Personnel Only</p>
          <form onSubmit={handlePinSubmit}>
            <input 
              type="password"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              placeholder="Enter PIN"
              className="w-full bg-[#141414] text-[#E4E3E0] p-4 text-center text-2xl font-mono tracking-[0.5em] rounded-md outline-none focus:border-[#FF4444] border-2 border-transparent transition-all mb-4"
              autoFocus
            />
            <button 
              type="submit"
              className="w-full bg-[#141414] text-[#E4E3E0] py-4 rounded-md font-mono font-bold text-sm uppercase tracking-widest hover:bg-[#FF4444] transition-colors border-2 border-[#141414]"
            >
              Unlock Terminal
            </button>
          </form>
          <button 
            onClick={logout}
            className="w-full mt-4 text-[#141414]/40 font-mono text-xs uppercase tracking-widest hover:text-[#141414] transition-colors"
          >
            Switch User
          </button>
        </motion.div>
      </div>
    );
  }

  const isAdmin = user.email === "calebl012711@gmail.com";

  return (
    <div className="min-h-screen bg-[#E4E3E0] font-sans">
      {/* Header */}
      <header className="bg-[#141414] text-[#E4E3E0] border-b-4 border-[#FF4444] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-[#FF4444] p-2 rounded-sm text-[#141414]">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h1 className="text-xl font-mono font-bold tracking-widest uppercase">TAC-OS</h1>
              <p className="text-[#E4E3E0]/50 font-mono text-[10px] uppercase tracking-widest">Active Connection</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#E4E3E0]/70 uppercase">
              <User size={14} /> {user.displayName}
            </div>
            <button 
              onClick={logout}
              className="p-2 rounded-sm text-[#E4E3E0]/50 hover:bg-[#FF4444] hover:text-[#141414] transition-colors"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto p-4 sm:p-8">
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-2xl font-mono font-bold text-[#141414] uppercase">Live Command Center</h2>
          <div className="text-sm font-mono text-[#141414]/60 bg-[#141414]/10 px-4 py-2 rounded-md">
            Orders Total: <span className="font-bold">{orders.length}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {orders.map((order) => (
              <motion.div
                key={order.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`bg-[#FFFFFF] border-2 shadow-sm rounded-none overflow-hidden transition-all relative ${
                  order.status === 'pending' ? 'border-[#FF4444]' :
                  order.status === 'preparing' ? 'border-[#FFAA00]' :
                  order.status === 'ready' ? 'border-[#00CC44]' :
                  'border-[#141414]/10 opacity-60 grayscale'
                }`}
              >
                {/* Status Bar Top */}
                <div className={`h-2 w-full ${
                  order.status === 'pending' ? 'bg-[#FF4444]' :
                  order.status === 'preparing' ? 'bg-[#FFAA00]' :
                  order.status === 'ready' ? 'bg-[#00CC44]' :
                  'bg-[#141414]/10'
                }`} />

                <div className="p-4 border-b border-[#141414]/10 flex justify-between items-center bg-[#f9f9f9]">
                  <span className={`px-2 py-1 text-[10px] font-mono font-bold uppercase tracking-widest rounded-sm ${
                    order.status === 'pending' ? 'bg-[#FF4444]/20 text-[#FF4444]' :
                    order.status === 'preparing' ? 'bg-[#FFAA00]/20 text-[#FFAA00]' :
                    order.status === 'ready' ? 'bg-[#00CC44]/20 text-[#00CC44]' :
                    'bg-[#141414]/10 text-[#141414]/60'
                  }`}>
                    {order.status}
                  </span>
                  <span className="font-mono text-[10px] text-[#141414]/40 uppercase">ID: {order.id.slice(-6)}</span>
                </div>

                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-[#141414]">{order.customerName}</h3>
                    <a href={`tel:${order.customerPhone}`} className="text-xs font-mono text-[#141414]/60 hover:text-[#FF4444] flex items-center gap-1 mt-2">
                      <Phone size={12} /> {order.customerPhone}
                    </a>
                  </div>

                  <div className="space-y-3 mb-8 min-h-[100px]">
                    {order.items.map((item: any, i: number) => (
                      <div key={i} className="flex justify-between items-center text-sm font-mono border-b border-dashed border-[#141414]/20 pb-2">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-[#FF4444] bg-[#FF4444]/10 px-1 py-0.5 rounded-sm">x{item.quantity}</span>
                          <span className="text-[#141414] truncate max-w-[140px] block" title={item.name}>{item.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-auto">
                    {order.status === 'pending' && (
                      <button 
                        onClick={() => updateStatus(order.id, 'preparing')}
                        className="col-span-2 bg-[#FFAA00] text-[#141414] py-3 font-mono font-bold text-xs uppercase tracking-widest hover:bg-[#141414] hover:text-[#FFAA00] transition-colors border border-[#FFAA00] flex justify-center items-center gap-2"
                      >
                        <Clock size={16} /> Prep
                      </button>
                    )}
                    {order.status === 'preparing' && (
                      <button 
                        onClick={() => updateStatus(order.id, 'ready')}
                        className="col-span-2 bg-[#00CC44] text-white py-3 font-mono font-bold text-xs uppercase tracking-widest hover:bg-[#141414] transition-colors border border-[#00CC44] flex justify-center items-center gap-2"
                      >
                        <Check size={16} /> Ready
                      </button>
                    )}
                    {order.status === 'ready' && (
                      <button 
                        onClick={() => updateStatus(order.id, 'completed')}
                        className="col-span-2 bg-[#141414] text-white py-3 font-mono font-bold text-xs uppercase tracking-widest hover:bg-[#E4E3E0] hover:text-[#141414] hover:border-[#141414] transition-all border border-[#141414] flex justify-center items-center gap-2"
                      >
                        <Check size={16} /> Clear
                      </button>
                    )}
                    {isAdmin && (
                      <button 
                        onClick={() => deleteOrder(order.id)}
                        className="w-full flex items-center justify-center p-3 font-mono text-xs text-[#FF4444] border border-[#FF4444] hover:bg-[#FF4444] hover:text-white transition-colors uppercase col-span-2 mt-2"
                      >
                        <X size={14} className="mr-1" /> Purge Record
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {orders.length === 0 && (
          <div className="text-center py-32 border-2 border-dashed border-[#141414]/20 rounded-lg max-w-2xl mx-auto mt-12 bg-[#FFFFFF]">
            <div className="text-[#141414]/20 mb-4 inline-block">
              <ShieldCheck size={64} />
            </div>
            <h2 className="text-xl font-mono font-bold text-[#141414]/60 uppercase tracking-widest">No Active Vectors</h2>
            <p className="text-[#141414]/40 font-mono text-xs mt-2 uppercase tracking-widest">Awaiting Transmission...</p>
          </div>
        )}
      </main>
    </div>
  );
}
