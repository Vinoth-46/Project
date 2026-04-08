'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import HeroScene from '../components/3d/HeroScene';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax effects
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const sceneScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-dark"
    >
      {/* Background Image Overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1800&q=80"
          alt="Engineering Backdrop"
          className="w-full h-full object-cover pointer-events-none"
        />
        <div className="absolute inset-0 bg-dark/80 lg:bg-dark/70 pointer-events-none" />
      </div>

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-gold/5 via-transparent to-transparent opacity-50" />

      {/* 3D Scene Container - Desktop Only */}
      <motion.div
        className="hidden lg:block absolute right-0 top-0 w-full lg:w-[60%] h-full opacity-100"
        style={{ scale: sceneScale }}
      >
        <HeroScene />
      </motion.div>

      {/* Content Overlay */}
      <motion.div
        className="relative z-10 flex min-h-screen items-center pb-20 lg:pb-0"
        style={{ y: textY, opacity: textOpacity }}
      >
        <div className="section-container w-full">
          <div className="max-w-2xl text-center lg:text-left mx-auto lg:mx-0">
            {/* Eyebrow Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="inline-block px-4 py-2 text-xs font-semibold tracking-[0.2em] uppercase text-gold border border-gold/30 rounded mb-6">
                Civil Engineering & Construction
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-outfit font-bold leading-[1.1] mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="text-warm-white">Sacred Values.</span>
              <br />
              <span className="gradient-text">Solid Foundations.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-lg md:text-xl text-warm-gray mb-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Er. V. NIRMAL, B.E. (Civil)
            </motion.p>

            <motion.p
              className="text-md md:text-lg text-gold mb-4 font-medium tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
            >
              Proprietor
            </motion.p>

            <motion.p
              className="text-sm md:text-base text-warm-gray/70 mb-8 flex items-center justify-center lg:justify-start gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse flex-shrink-0" />
              Namakkal, Tamil Nadu, India
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <button
                onClick={() => scrollToSection('#portfolio')}
                className="w-full sm:w-auto btn-gold-filled flex items-center justify-center gap-2 group"
              >
                View Our Work
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
              <button
                onClick={() => scrollToSection('#contact')}
                className="w-full sm:w-auto btn-gold flex items-center justify-center"
              >
                Get a Free Estimate
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 text-warm-gray/50"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark to-transparent pointer-events-none" />
    </section>
  );
}
