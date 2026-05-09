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
  const textY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);


  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen w-full md:overflow-hidden bg-brand-primary"
    >
      {/* Background Video — YouTube with Poster for LCP */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Poster Image: Displays immediately for LCP boost */}
        <img 
          src="/hero-new-tropical.webp" 
          alt="" 
          width="1920"
          height="1080"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          loading="eager"
        />

        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        >
          <source src="/bg-video.mp4" type="video/mp4" />
          <track kind="captions" src="/empty.vtt" srcLang="en" label="No captions" default />
        </video>
        {/* Overlay: lighter on mobile (40%), darker on desktop (60%) */}
        <div className="absolute inset-0 bg-brand-primary/40 lg:bg-brand-primary/60 pointer-events-none" />
      </div>

      {/* ── GST Badge — Minimal Top Left Corner ── */}
      <motion.div
        className="absolute top-[80px] md:top-[120px] left-4 md:left-8 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="relative group">
          <div className="absolute inset-0 bg-brand-accent/30 blur-xl rounded-full scale-[1.5] opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
          <img
            src="/gst-image.webp"
            alt="GST Registered Professional"
            width="80"
            height="80"
            className="relative w-14 h-14 md:w-20 md:h-20 object-contain mix-blend-screen brightness-[1.3] drop-shadow-[0_0_15px_rgba(250,204,21,0.4)] transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <span className="text-[10px] md:text-[11px] font-black tracking-widest text-[#FACC15] uppercase font-outfit drop-shadow-[0_2px_4px_rgba(0,0,0,1)] text-center">
          GST: 33FKGPP3797C1ZX
        </span>
      </motion.div>

      {/* ── MSME Badge — Minimal Top Right Corner ── */}
      <motion.div
        className="absolute top-[80px] md:top-[120px] right-4 md:right-8 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="relative group">
          <div className="absolute inset-0 bg-brand-accent/30 blur-xl rounded-full scale-[1.5] opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
          <img
            src="/msme-image.webp"
            alt="MSME Registered Enterprise"
            width="80"
            height="80"
            className="relative w-14 h-14 md:w-20 md:h-20 object-contain drop-shadow-[0_0_15px_rgba(250,204,21,0.4)] transition-transform duration-300 group-hover:scale-105 rounded-md"
          />
        </div>
        <span className="text-[9px] md:text-[11px] font-black tracking-widest text-[#FACC15] uppercase font-outfit drop-shadow-[0_2px_4px_rgba(0,0,0,1)] text-center">
          MSME Register
        </span>
      </motion.div>

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-brand-accent/10 via-transparent to-transparent opacity-50" />

      {/* Content Overlay */}
      <motion.div
        className="relative z-10 flex min-h-screen items-center pt-48 pb-40 lg:pt-32 lg:pb-24"
        style={{ y: textY, opacity: textOpacity }}
      >
        <div className="section-container w-full">
          <div className="max-w-2xl text-center mx-auto">
            {/* Eyebrow Label */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-8 lg:mt-0"
            >
              <div className="inline-flex items-center gap-3 px-3 py-1.5 md:px-5 md:py-2 bg-brand-primary/40 backdrop-blur-md border border-brand-accent/30 rounded-full mb-8 shadow-[0_0_15px_rgba(250,204,21,0.15)] group hover:border-brand-accent/60 transition-colors duration-500">
                <div className="flex items-center gap-2 border-r border-white/10 pr-3 mr-1">
                  <div className="relative">
                    <div className="w-2 h-2 bg-brand-accent rounded-full shadow-[0_0_8px_rgba(250,204,21,0.8)]"></div>
                    <div className="absolute -inset-1 bg-brand-accent rounded-full animate-ping opacity-30"></div>
                  </div>
                  <span className="text-[10px] font-black tracking-widest text-brand-accent uppercase hidden sm:inline">Active</span>
                </div>
                
                <span className="text-[10px] md:text-xs font-medium tracking-[0.25em] text-white/90 uppercase font-outfit">
                  Licensed Civil Engineer <span className="text-white/20 px-1">•</span> Namakkal, TN
                </span>
              </div>
            </motion.div>

            {/* Main Headline — Authority + Loss Aversion */}
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="text-white drop-shadow-sm font-outfit uppercase tracking-tighter decoration-brand-accent/30 decoration-2 underline-offset-8">Don&apos;t Risk Your</span>
              <br />
              <span className="text-brand-accent font-instrument italic font-normal drop-shadow-[0_0_15px_rgba(250,204,21,0.3)] animate-shimmer bg-[linear-gradient(110deg,#FACC15,45%,#fff,55%,#FACC15)] bg-[length:200%_100%] bg-clip-text text-transparent pb-1">Dream Home.</span>
            </motion.h1>

            {/* Loss Aversion Hook */}
            <motion.div
              className="flex items-start gap-4 mb-8 p-5 rounded-2xl border border-red-500/60 bg-red-950/40 max-w-lg mx-auto shadow-[0_0_25px_rgba(239,68,68,0.3)] backdrop-blur-md relative overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                boxShadow: [
                  "0 0 15px rgba(239,68,68,0.2)",
                  "0 0 35px rgba(239,68,68,0.4)",
                  "0 0 15px rgba(239,68,68,0.2)"
                ]
              }}
              transition={{ 
                opacity: { duration: 0.6, delay: 0.55 },
                y: { duration: 0.6, delay: 0.55 },
                boxShadow: { 
                  duration: 2.5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="mt-1"
              >
                <ShieldAlert size={28} className="text-red-500 flex-shrink-0" />
              </motion.div>
              <div className="text-left">
                <span className="text-red-500 text-[10px] font-black uppercase tracking-[0.2em] block mb-1">Financial Risk Warning</span>
                <p className="text-sm md:text-base text-white/90 leading-relaxed font-inter">
                  <span className="text-white font-bold">Most homeowners lose ₹5–10 Lakhs</span>{' '}
                  due to poor planning and unauthorized contractors. Get expert guidance before it&apos;s too late.
                </p>
              </div>
            </motion.div>

            {/* Engineer Info */}
            <motion.p
              className="text-lg md:text-xl text-white mb-1 font-bold font-inter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Er. V. NIRMAL, B.E. (Civil)
            </motion.p>

            <motion.p
              className="text-md md:text-lg text-brand-accent mb-2 font-bold tracking-wide font-inter uppercase"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
            >
              Proprietor — Kitchaa&apos;s Enterprise
            </motion.p>

            {/* Scarcity Signal */}
            <motion.p
              className="text-sm md:text-base text-white/90 mb-8 flex items-center justify-center gap-2 font-bold font-inter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
              Limited project slots available per month
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
                className="w-full sm:w-auto btn-gold-filled flex items-center justify-center gap-2 group font-bold font-jakarta transition-all"
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
                className="w-full sm:w-auto btn-secondary flex items-center justify-center gap-2 font-jakarta transition-all"
              >
                View Our Packages
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.button
          aria-label="Scroll down to see more"
          className="flex flex-col items-center gap-2 text-white/80 font-inter cursor-pointer outline-none focus:text-brand-accent bg-transparent border-none drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] hover:text-brand-accent transition-colors duration-300"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          onClick={() => {
            const el = document.getElementById('about');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="text-xs tracking-widest uppercase font-semibold">Scroll</span>
          <ChevronDown size={22} />
        </motion.button>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-primary to-transparent pointer-events-none" />
    </section>
  );
}
