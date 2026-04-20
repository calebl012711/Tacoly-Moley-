import { motion } from 'motion/react';

const colors = ['#C0392B', '#27AE60', '#F39C12', '#1ABC9C', '#E67E22', '#9B59B6'];

export default function PapelPicado() {
  return (
    <div className="flex justify-center overflow-hidden w-full h-16 pointer-events-none select-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: i * 0.05, duration: 0.5 }}
          className="flex-shrink-0 w-16 h-16 relative"
          style={{ 
            backgroundColor: colors[i % colors.length],
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 80%, 50% 100%, 0% 80%)',
            marginRight: '-4px'
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center opacity-30">
            <div className="w-8 h-8 border-2 border-white rounded-full border-dashed"></div>
          </div>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full opacity-50"></div>
        </motion.div>
      ))}
    </div>
  );
}
