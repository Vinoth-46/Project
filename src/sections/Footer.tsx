'use client';

import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Reviews', href: '#reviews' },
  { name: 'Contact', href: '#contact' },
];

export default function Footer() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-dark border-t border-gold/20">
      <div className="section-container py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-10 md:gap-8 items-start">
          {/* Logo & Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-16 h-16 md:w-20 md:h-20 overflow-hidden flex items-center justify-center rounded-lg bg-white/10 shrink-0">
                <img 
                  src="/logo.jpg" 
                  alt="Kitchaa's Enterprise Logo"
                  className="w-full h-full object-contain scale-[1.05]" 
                />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-outfit font-bold gradient-text">
                  KITCHAA&apos;S
                </span>
                <span className="text-sm font-outfit font-medium text-warm-white tracking-[0.2em]">
                  ENTERPRISE
                </span>
              </div>
            </div>
            <p className="text-warm-gray text-sm leading-relaxed max-w-xs">
              Sacred Values. Solid Foundations.
              <br />
              Building excellence since 2014.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="md:text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-warm-white font-semibold mb-4">Quick Links</h4>
            <nav className="flex flex-wrap md:justify-center gap-x-6 gap-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="text-warm-gray hover:text-gold text-sm transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="md:text-right"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-warm-white font-semibold mb-4">Contact</h4>
            <div className="text-warm-gray text-sm space-y-2">
              <p className="font-medium text-warm-white">Er. V. NIRMAL, B.E. (Civil)</p>
              <p className="text-xs text-gold">Proprietor</p>
              <p>Namakkal, Tamil Nadu</p>
              <p>+91 83440 51846</p>
              <p>kitchaasenterprise@gmail.com</p>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gold/10 my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.p
            className="text-warm-gray/60 text-sm text-center md:text-left"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            &copy; {new Date().getFullYear()} Kitchaa&apos;s Enterprise. All rights reserved.
          </motion.p>

          {/* Back to Top */}
          <motion.button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-warm-gray hover:text-gold text-sm transition-colors group"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ y: -2 }}
          >
            Back to top
            <span className="w-8 h-8 rounded-full border border-gold/30 flex items-center justify-center group-hover:bg-gold group-hover:text-dark transition-colors">
              <ArrowUp size={14} />
            </span>
          </motion.button>
        </div>
      </div>

      {/* Decorative Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold-gradient opacity-50" />
    </footer>
  );
}
