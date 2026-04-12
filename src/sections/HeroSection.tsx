'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown, ShieldAlert } from 'lucide-react';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax effects
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);


  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-brand-primary"
    >
      {/* Background Video */}
      <div className="absolute inset-0 overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          poster="/loading logo.png"
          className="w-full h-full object-cover pointer-events-none opacity-90"
        >
          <source src="/bg-video.mp4" type="video/mp4" />
        </video>
        {/* Adjusted mobile overlay to be lighter (40%) and desktop to be (60%) */}
        <div className="absolute inset-0 bg-brand-primary/40 lg:bg-brand-primary/60 pointer-events-none" />
      </div>

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-brand-accent/10 via-transparent to-transparent opacity-50" />

      {/* Content Overlay */}
      <motion.div
        className="relative z-10 flex min-h-screen items-center pb-20 lg:pb-0"
        style={{ y: textY, opacity: textOpacity }}
      >
        <div className="section-container w-full">
          <div className="max-w-2xl text-center mx-auto">
            {/* Eyebrow Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="inline-block px-4 py-2 text-xs font-semibold tracking-[0.2em] uppercase text-brand-accent border border-brand-accent/30 rounded-full mb-6 bg-brand-accent/5 font-inter">
                Licensed Civil Engineer • Namakkal, Tamil Nadu
              </span>
            </motion.div>

            {/* Main Headline — Authority + Loss Aversion */}
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sgrotesk font-bold leading-[1.1] mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="text-brand-text">Don&apos;t Risk Your</span>
              <br />
              <span className="text-brand-accent">Dream Home.</span>
            </motion.h1>

            {/* Loss Aversion Hook */}
            <motion.div
              className="flex items-start gap-3 mb-6 p-4 rounded-lg border border-red-500/30 bg-red-500/10 max-w-lg mx-auto shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
            >
              <ShieldAlert size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-brand-text/80 leading-relaxed font-inter">
                <span className="text-red-400 font-semibold">Most homeowners lose ₹5–10 Lakhs</span>{' '}
                due to poor planning, unauthorized contractors, and missing approvals. Get expert guidance before it&apos;s too late.
              </p>
            </motion.div>

            {/* Engineer Info */}
            <motion.p
              className="text-lg md:text-xl text-brand-text/70 mb-1 font-medium font-inter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Er. V. NIRMAL, B.E. (Civil)
            </motion.p>

            <motion.p
              className="text-md md:text-lg text-brand-text mb-2 font-semibold tracking-wide font-inter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
            >
              Proprietor — Kitchaa&apos;s Enterprise
            </motion.p>

            {/* Scarcity Signal */}
            <motion.p
              className="text-sm md:text-base text-brand-text/60 mb-8 flex items-center justify-center gap-2 font-inter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
              We take limited projects to ensure quality
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <button
                onClick={() => {
                  const text = "I want to get the quote for my plan";
                  window.open(`https://wa.me/918344051846?text=${encodeURIComponent(text)}`, '_blank');
                }}
                className="w-full sm:w-auto btn-gold-filled flex items-center justify-center gap-2 group font-bold"
              >
                Get Expert Consultation — Free
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('pricing');
                  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'instant' });
                }}
                className="w-full sm:w-auto btn-secondary flex items-center justify-center gap-2"
              >
                View Our Packages
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
          className="flex flex-col items-center gap-2 text-brand-text/50 font-inter"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-primary to-transparent pointer-events-none" />
    </section>
  );
}
