'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Reviews', href: '#reviews' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      setIsScrolled(scrollY > 60);
      setScrollProgress((scrollY / (documentHeight - windowHeight)) * 100);

      // Don't update active section while programmatic scroll is happening
      if (isNavigating) return;

      // Find active section — iterate forward, pick the last one whose top is above threshold
      let current = 'home';
      for (const link of navLinks) {
        const id = link.href.replace('#', '');
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isNavigating]);

  const scrollToSection = useCallback((href: string) => {
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      setActiveSection(id);
      setIsNavigating(true);

      // Use getBoundingClientRect for accurate position at this exact moment
      const top = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'instant' });

      // Re-enable scroll detection after a short delay
      setTimeout(() => {
        setIsNavigating(false);
      }, 100);
    }
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] z-[600] bg-brand-accent"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* ── Desktop: Floating Pill Nav ── */}
      <motion.div
        className="hidden md:block fixed z-[500]"
        style={{ top: 20, left: '50%' }}
        initial={{ x: '-50%', y: -80, opacity: 0 }}
        animate={{ x: '-50%', y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      >
        <motion.nav
          animate={{
            background: isScrolled
              ? 'rgba(15, 23, 42, 0.92)'
              : 'rgba(15, 23, 42, 0.55)',
            boxShadow: isScrolled
              ? '0 8px 40px rgba(0,0,0,0.45), 0 0 0 1px rgba(250,204,21,0.15), inset 0 1px 0 rgba(255,255,255,0.06)'
              : '0 4px 24px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.07), inset 0 1px 0 rgba(255,255,255,0.06)',
          }}
          transition={{ duration: 0.4 }}
          style={{
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: 99,
            padding: '6px 8px',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            width: 'max-content',
          }}
        >
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollToSection('#home'); }}
            className="flex items-center gap-3 pr-5 pl-1.5 mr-2 border-r border-white/10"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ isolation: 'isolate' }}
          >
            <img
              src="/loading logo.png"
              alt="Kitchaa's Enterprise"
              className="h-10 w-auto object-contain flex-shrink-0"
              style={{ 
                maxWidth: 48, 
                mixBlendMode: 'screen', 
                filter: 'brightness(1.2) contrast(1.1) drop-shadow(0 0 10px rgba(250,204,21,0.2))' 
              }}
            />
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-sgrotesk font-black text-brand-text tracking-widest">
                KITCHAA'S
              </span>
              <span className="text-[10px] text-brand-accent font-black tracking-[0.25em] uppercase font-inter">
                Enterprise
              </span>
            </div>
          </motion.a>

          {/* Nav Links — no layoutId, instant highlight switch */}
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                className={`relative px-4 py-2 text-xs font-bold tracking-wide uppercase rounded-full select-none transition-all duration-200 ${
                  isActive
                    ? 'bg-brand-accent text-[#0F172A]'
                    : 'text-white/70 hover:text-brand-accent'
                }`}
              >
                {link.name}
              </a>
            );
          })}

          {/* CTA */}
          <motion.button
            onClick={() => scrollToSection('#contact')}
            className="ml-2 flex items-center gap-1.5 bg-brand-accent text-[#0F172A] text-xs font-black uppercase tracking-wider rounded-full px-4 py-2"
            whileHover={{ scale: 1.06, backgroundColor: '#F59E0B' }}
            whileTap={{ scale: 0.94 }}
            transition={{ duration: 0.15 }}
          >
            <Phone size={12} />
            Get Quote
          </motion.button>
        </motion.nav>
      </motion.div>

      {/* ── Mobile: Edge-to-Edge Slim Bar ── */}
      <motion.header
        className="md:hidden fixed top-0 left-0 right-0 z-[500]"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          background: isScrolled ? 'rgba(15, 23, 42, 0.97)' : 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(51,65,85,0.6)',
        }}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollToSection('#home'); }}
            className="flex items-center gap-2"
          >
            <img
              src="/loading logo.png"
              alt="Kitchaa's Enterprise"
              className="h-9 w-auto object-contain"
              style={{ 
                maxWidth: 40, 
                mixBlendMode: 'screen', 
                filter: 'brightness(1.2) contrast(1.1)' 
              }}
            />
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-sgrotesk font-bold text-brand-text">KITCHAA'S</span>
              <span className="text-[9px] text-brand-text/50 tracking-widest uppercase font-inter">Enterprise</span>
            </div>
          </a>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(p => !p)}
            className="p-2 text-brand-text"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isMobileMenuOpen ? 'close' : 'open'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile menu drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <div className="px-4 pb-5 pt-2 flex flex-col gap-1">
                {navLinks.map((link, i) => {
                  const isActive = activeSection === link.href.replace('#', '');
                  return (
                    <motion.button
                      key={link.name}
                      type="button"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                      onClick={() => scrollToSection(link.href)}
                      className={`flex items-center gap-3 px-4 py-4 rounded-xl text-base font-bold tracking-wide text-left transition-colors ${
                        isActive
                          ? 'bg-brand-accent text-brand-primary'
                          : 'text-brand-text/70 hover:bg-white/5 hover:text-brand-text'
                      }`}
                    >
                      {link.name}
                    </motion.button>
                  );
                })}
                <motion.button
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.04 }}
                  onClick={() => scrollToSection('#contact')}
                  className="mt-2 flex items-center justify-center gap-2 bg-brand-accent text-[#0F172A] font-black text-sm uppercase tracking-wider px-6 py-3 rounded-xl"
                >
                  <Phone size={14} />
                  Get an Expert Quote
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
