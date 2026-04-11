'use client';

import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Reviews', href: '#reviews' },
  { name: 'FAQ', href: '#faq' },
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
    <footer className="relative bg-brand-footer border-t border-brand-card">
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
              <div className="flex items-center justify-center shrink-0">
                <img 
                  src="/logo1.jpg" 
                  alt="Kitchaa's Enterprise Logo"
                  className="h-16 md:h-20 w-auto rounded-lg border border-brand-card object-contain shadow-sm" 
                />
              </div>
              <div className="flex flex-col border-l-2 border-brand-accent pl-3">
                <span className="text-xl md:text-2xl font-sgrotesk font-bold text-brand-text">
                  KITCHAA&apos;S
                </span>
                <span className="text-xs font-inter font-bold text-brand-text/70 tracking-[0.2em] uppercase">
                  Enterprise
                </span>
              </div>
            </div>
            <p className="text-brand-text/70 text-sm leading-relaxed max-w-xs font-medium font-inter">
              Sacred Values. Solid Foundations.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="md:text-center pb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-brand-text font-bold mb-4 font-sgrotesk text-lg">Quick Links</h4>
            <nav className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:flex md:flex-wrap md:justify-center items-center md:gap-x-5 md:gap-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="text-brand-text/70 hover:text-brand-accent font-medium text-sm whitespace-nowrap transition-colors"
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
            <h4 className="text-brand-text font-bold mb-4 font-sgrotesk text-lg">Contact</h4>
            <div className="text-brand-text/70 text-sm space-y-2 font-medium">
              <p className="font-bold text-brand-text">Er. V. NIRMAL, B.E. (Civil)</p>
              <p className="text-xs text-brand-accent font-extrabold uppercase tracking-widest">Proprietor</p>
              <p>Namakkal, Tamil Nadu</p>
              <p className="font-rajdhani text-base tracking-wide">+91 83440 51846</p>
              <p>kitchaasenterprise@gmail.com</p>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-brand-card my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:pr-24 pb-12 md:pb-0">
          <motion.p
            className="text-brand-text/50 text-sm text-center md:text-left font-medium"
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
            className="flex items-center gap-2 text-brand-text/70 hover:text-brand-accent font-semibold text-sm transition-colors group mt-4 md:mt-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ y: -2 }}
          >
            Back to top
            <span className="w-8 h-8 rounded-full border border-brand-card text-brand-text flex items-center justify-center group-hover:bg-brand-accent group-hover:text-brand-primary group-hover:border-transparent transition-all shadow-sm">
              <ArrowUp size={14} />
            </span>
          </motion.button>
        </div>
      </div>

      {/* Decorative Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-accent opacity-100" />
    </footer>
  );
}
