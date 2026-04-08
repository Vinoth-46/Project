'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Reviews', href: '#reviews' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      setIsScrolled(scrollY > 50);
      setScrollProgress((scrollY / (documentHeight - windowHeight)) * 100);

      // Update active section based on scroll position
      const sections = navLinks.map(link => link.href.replace('#', ''));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isScrolled ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Navbar */}
      <motion.nav
        className={`glass-nav transition-all duration-300 ${
          isScrolled ? 'py-3' : 'py-5'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="section-container">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#home"
              className="flex items-center gap-3"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#home');
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-10 h-10 md:w-12 md:h-12 overflow-hidden flex items-center justify-center rounded-lg bg-white/10 shrink-0">
                <img 
                  src="/logo.jpg" 
                  alt="Kitchaa's Enterprise Logo"
                  className="w-full h-full object-contain" 
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-outfit font-bold gradient-text">
                  KITCHAA&apos;S
                </span>
                <span className="text-xs md:text-sm font-outfit font-medium text-warm-white tracking-[0.2em]">
                  ENTERPRISE
                </span>
              </div>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className={`relative text-sm font-medium tracking-wide transition-colors ${
                    activeSection === link.href.replace('#', '')
                      ? 'text-gold'
                      : 'text-warm-gray hover:text-warm-white'
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {link.name}
                  {activeSection === link.href.replace('#', '') && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gold-gradient"
                      layoutId="activeNav"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              type="button"
              className="md:hidden p-2 text-warm-white relative z-[120] cursor-pointer pointer-events-auto"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative w-6 h-6 flex items-center justify-center">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </div>
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden absolute top-full left-0 right-0 bg-[#0a0a0a]/95 backdrop-blur-md shadow-xl border-t border-gold/10 overflow-hidden z-[150]"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className="section-container py-6 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className={`block w-full text-left cursor-pointer pointer-events-auto text-lg font-medium py-3 px-4 active:bg-white/5 active:scale-95 transition-all ${
                      activeSection === link.href.replace('#', '')
                        ? 'text-gold bg-white/5'
                        : 'text-warm-gray'
                    }`}
                  >
                    {link.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
