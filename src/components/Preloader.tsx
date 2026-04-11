import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  isLoading: boolean;
}

export default function Preloader({ isLoading }: PreloaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) return;

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
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: '#0a0f1a' }}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Radial glow behind logo */}
          <div
            className="absolute"
            style={{
              width: 500,
              height: 500,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(250,204,21,0.08) 0%, transparent 70%)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
            }}
          />

          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(rgba(250,204,21,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(250,204,21,0.3) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />

          {/* ── Main Content ── */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo with reveal animation */}
            <motion.div
              className="relative mb-8"
              initial={{ opacity: 0, scale: 0.7, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            >
              {/* Rotating ring behind logo */}
              <motion.div
                className="absolute -inset-6 rounded-full"
                style={{
                  border: '1.5px solid transparent',
                  borderTopColor: 'rgba(250,204,21,0.5)',
                  borderRightColor: 'rgba(250,204,21,0.15)',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />

              {/* Second counter-rotating ring */}
              <motion.div
                className="absolute -inset-10 rounded-full"
                style={{
                  border: '1px solid transparent',
                  borderBottomColor: 'rgba(250,204,21,0.25)',
                  borderLeftColor: 'rgba(250,204,21,0.1)',
                }}
                animate={{ rotate: -360 }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              />

              {/* Pulse glow ring */}
              <motion.div
                className="absolute -inset-3 rounded-full"
                style={{
                  border: '1px solid rgba(250,204,21,0.1)',
                }}
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* The actual logo */}
              <motion.img
                src="/loading logo.png"
                alt="Kitchaa's Enterprise"
                className="w-28 h-28 md:w-36 md:h-36 rounded-2xl object-contain"
                style={{
                  filter: 'drop-shadow(0 0 30px rgba(250,204,21,0.2))',
                }}
                animate={{
                  filter: [
                    'drop-shadow(0 0 20px rgba(250,204,21,0.15))',
                    'drop-shadow(0 0 40px rgba(250,204,21,0.3))',
                    'drop-shadow(0 0 20px rgba(250,204,21,0.15))',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>

            {/* Company Name — staggered reveal */}
            <div className="overflow-hidden mb-1">
              <motion.h1
                className="text-2xl md:text-4xl font-sgrotesk font-black tracking-[0.3em] uppercase text-white"
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
              >
                KITCHAA'S
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-1">
              <motion.div
                className="text-brand-accent text-base md:text-xl tracking-[0.5em] font-black font-rajdhani"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.45, ease: [0.23, 1, 0.32, 1] }}
              >
                ENTERPRISE
              </motion.div>
            </div>

            {/* Tagline */}
            <motion.p
              className="text-white/30 text-[10px] md:text-xs tracking-[0.4em] uppercase font-inter mt-3 mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              Sacred Values · Solid Foundations
            </motion.p>

            {/* Progress bar */}
            <motion.div
              className="w-56 md:w-72"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex justify-between text-[10px] text-white/40 font-bold mb-2 font-rajdhani tracking-[0.2em]">
                <motion.span
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  LOADING
                </motion.span>
                <span className="text-brand-accent/70 tabular-nums">{progress}%</span>
              </div>
              <div className="h-[1.5px] w-full bg-white/10 relative overflow-hidden rounded-full">
                <motion.div
                  className="absolute top-0 left-0 bottom-0 rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #FACC15, #F59E0B)',
                    boxShadow: '0 0 12px rgba(250,204,21,0.4)',
                  }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: 'circOut', duration: 0.2 }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
