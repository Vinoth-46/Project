'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone, X } from 'lucide-react';

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3">
      <AnimatePresence>
        {isOpen && (
          <>
            {/* WhatsApp Button */}
            <motion.a
              href="https://wa.me/918344051846?text=I%20want%20to%20get%20the%20quote%20for%20my%20plan"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group flex-row-reverse"
              initial={{ opacity: 0, x: -20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <span className="px-3 py-1.5 text-sm font-bold text-brand-text bg-brand-primary rounded-md border border-brand-card shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                WhatsApp
              </span>
              <motion.div
                className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <MessageCircle size={22} fill="currentColor" />
              </motion.div>
            </motion.a>

            {/* Call Button */}
            <motion.a
              href="tel:+918344051846"
              className="flex items-center gap-3 group flex-row-reverse"
              initial={{ opacity: 0, x: -20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.8 }}
              transition={{ duration: 0.2, delay: 0.05 }}
            >
              <span className="px-3 py-1.5 text-sm font-bold text-brand-text bg-brand-primary rounded-md border border-brand-card shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                Call Us
              </span>
              <motion.div
                className="w-12 h-12 rounded-full bg-brand-accent flex items-center justify-center text-brand-primary shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
              >
                <Phone size={20} />
              </motion.div>
            </motion.a>
          </>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-colors ${
          isOpen ? 'bg-brand-card border border-brand-accent text-brand-text' : 'bg-brand-accent text-brand-primary'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={!isOpen ? { scale: [1, 1.08, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.div
          initial={false}
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? <X size={24} /> : <Phone size={24} />}
        </motion.div>
      </motion.button>
    </div>
  );
}
