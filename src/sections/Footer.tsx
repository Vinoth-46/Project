'use client';

import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';



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
      <div className="section-container py-8 md:py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4 items-start">
          {/* Logo & Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center shrink-0">
                  <img
                    src="/loading logo.webp"
                    alt="Kitchaa's Enterprise Logo"
                    width={180}
                    height={100}
                    loading="lazy"
                    className="h-14 md:h-16 w-auto object-contain"
                    style={{
                      mixBlendMode: 'screen',
                      filter: 'brightness(1.2) contrast(1.1)'
                    }}
                  />
                </div>
                <div className="flex flex-col border-l-2 border-brand-accent pl-3">
                  <span className="text-lg md:text-xl font-outfit font-bold text-brand-text leading-tight">
                    KITCHAA&apos;S
                  </span>
                  <span className="text-[10px] font-jakarta font-bold text-brand-text/70 tracking-[0.2em] uppercase mt-0.5">
                    Enterprise
                  </span>
                </div>
              </div>
              <p className="text-brand-text/70 text-xs leading-relaxed max-w-xs font-medium font-inter italic border-l-2 border-brand-card pl-3">
                "Sacred Values. Solid Foundations."
              </p>
            </div>
          </motion.div>

          {/* Quick Links — Separate Vertical Column */}
          <motion.div
            className="lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
          >
            <h4 className="text-brand-text font-bold mb-3 font-outfit text-base tracking-wide uppercase">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              {[
                { name: 'Home', href: '#home' },
                { name: 'About Us', href: '#about' },
                { name: 'Services', href: '#services' },
                { name: 'How We Build', href: '#how-we-build' },
                { name: 'Transparency', href: '#transparency' },
                { name: 'Pricing', href: '#pricing' },
                { name: 'Testimonials', href: '#reviews' },
                { name: 'Service Area', href: '#service-area' },
                { name: 'FAQ', href: '#faq' },
                { name: 'Contact Us', href: '#contact' },
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="flex items-center gap-2 text-brand-text/70 hover:text-brand-accent font-medium text-xs transition-colors group"
                >
                  <span className="w-1 h-1 rounded-full bg-brand-accent/40 group-hover:bg-brand-accent transition-colors shrink-0" />
                  {link.name}
                </a>
              ))}
            </nav>
          </motion.div>

          {/* Contact */}
          <motion.div
            className="lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-brand-text font-bold mb-3 font-outfit text-base tracking-wide uppercase">Contact</h4>
            <div className="flex flex-col gap-2.5 text-brand-text/80 text-xs font-medium font-inter">
              <p className="flex items-start gap-2">📱 +91 83440 51846</p>
              <p className="flex items-start gap-2">📧 kitchaasenterprise@gmail.com</p>
              <p className="flex items-start gap-2">📍 Namakkal, Tamil Nadu</p>
              <p className="flex items-start gap-2 text-brand-accent/90">🕐 Mon-Sun: 9 AM – 8 PM</p>
            </div>
          </motion.div>

          {/* Credentials */}
          <motion.div
            className="lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h4 className="text-brand-text font-bold mb-3 font-outfit text-base tracking-wide uppercase">Credentials</h4>
            <div className="text-brand-text/80 text-xs space-y-2 font-medium font-inter">
              <p><span className="text-brand-text/60 uppercase tracking-wider block mb-0.5" style={{ fontSize: '10px' }}>GST Registration</span> <span className="font-mono text-brand-accent">33FKGPP3797C1ZX</span></p>
              <p><span className="text-brand-text/60 uppercase tracking-wider block mb-0.5" style={{ fontSize: '10px' }}>MSME Udyam</span> <span className="font-mono text-[#34d399]">Registered</span></p>
              <p><span className="text-brand-text/60 uppercase tracking-wider block mb-0.5" style={{ fontSize: '10px' }}>BPCL Vendor Code</span> <span className="font-mono text-[#fbbc04]">318833</span></p>
            </div>
          </motion.div>

          {/* Service Areas */}
          <motion.div
            className="lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-brand-text font-bold mb-3 font-outfit text-base tracking-wide uppercase">Service Areas</h4>
            <div className="text-brand-text/70 text-xs space-y-2.5 font-medium font-inter">
              <div>
                <span className="text-brand-accent font-bold uppercase tracking-wider flex items-center gap-1.5 mb-0.5" style={{ fontSize: '10px' }}>
                  <span className="w-1 h-1 rounded-full bg-brand-accent"></span> Primary
                </span>
                <p className="pl-2.5 text-brand-text">Namakkal, Salem, Karur, Erode</p>
              </div>

              <div>
                <span className="text-brand-text font-bold uppercase tracking-wider flex items-center gap-1.5 mb-0.5" style={{ fontSize: '10px' }}>
                  <span className="w-1 h-1 rounded-full bg-brand-text/50"></span> Secondary
                </span>
                <p className="pl-2.5 text-brand-text/80">All Tamil Nadu (Consultancy)</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-brand-card my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:pr-24 pb-12 md:pb-0">
          <motion.p
            className="text-brand-text/50 text-sm text-center md:text-left font-medium font-jakarta uppercase tracking-wider"
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
            aria-label="Back to top of the page"
            className="flex items-center gap-2 text-brand-text/70 hover:text-brand-accent font-semibold text-sm transition-colors group mt-4 md:mt-0 font-jakarta uppercase tracking-widest"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ y: -2 }}
          >
            Back to top
            <span className="w-8 h-8 rounded-full border border-brand-card text-brand-text flex items-center justify-center group-hover:bg-brand-accent group-hover:text-brand-primary group-hover:border-transparent transition-all shadow-sm">
              <ArrowUp size={14} aria-hidden="true" />
            </span>
          </motion.button>
        </div>
      </div>

      {/* Decorative Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-accent opacity-100" />
    </footer>
  );
}
