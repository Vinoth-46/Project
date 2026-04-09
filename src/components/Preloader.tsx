import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  isLoading: boolean;
}

export default function Preloader({ isLoading }: PreloaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) return;

    // Simulate progress 0-100 quickly
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 10) + 5;
        if (next >= 100) {
          clearInterval(interval);
          return 100;
        }
        return next;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-dark overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            y: '-100%',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
        >
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" 
            style={{ 
              backgroundImage: 'linear-gradient(rgba(232, 160, 32, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(232, 160, 32, 0.2) 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }} 
          />

          <div className="relative z-10 flex flex-col items-center">
            {/* Spinning/Pulsing Animation */}
            <motion.div 
              className="relative w-24 h-24 mb-12 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              {/* Outer Ring */}
              <motion.div 
                className="absolute inset-0 rounded-full border border-gold/30 border-t-gold"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              {/* Inner Diamond */}
              <motion.div 
                className="w-10 h-10 border-2 border-gold/60"
                style={{ rotate: '45deg' }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            {/* Title Text */}
            <div className="overflow-hidden mb-4 text-center">
              <motion.h1 
                className="text-2xl md:text-4xl font-outfit font-bold tracking-[0.2em] uppercase text-warm-white"
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              >
                Kitchaa's
              </motion.h1>
              <motion.div 
                className="text-gold text-lg md:text-xl tracking-[0.3em] font-light mt-2"
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              >
                ENTERPRISE
              </motion.div>
            </div>

            {/* Progress Bar Container */}
            <div className="w-64 mt-8">
              <div className="flex justify-between text-xs text-warm-gray mb-2 font-mono">
                <span>INITIALIZING</span>
                <span>{progress}%</span>
              </div>
              <div className="h-[2px] w-full bg-warm-white/10 relative overflow-hidden">
                <motion.div 
                  className="absolute top-0 left-0 bottom-0 bg-gold"
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "circOut", duration: 0.2 }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
