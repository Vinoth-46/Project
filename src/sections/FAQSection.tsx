'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'Why should I hire a civil engineer instead of a contractor?',
    answer: 'A contractor builds — but an engineer ensures the structure is SAFE. Without engineering supervision, you risk structural failures, code violations, and costly repairs. A registered civil engineer designs according to IS codes, calculates loads, and ensures every element meets safety standards. This is the difference between a building that lasts 20 years vs 80+ years.',
  },
  {
    question: 'What is DTCP approval and do I need it?',
    answer: 'DTCP (Directorate of Town & Country Planning) approval is mandatory for construction in planned areas of Tamil Nadu. Without it, your property can be declared illegal, you cannot get bank loans, and the property value drops significantly. We handle the entire DTCP approval process — from document preparation to final clearance — with a 100% approval success rate.',
  },
  {
    question: 'How long does building approval take?',
    answer: 'With proper documentation and a licensed engineer handling your application, residential building approval typically takes 15-30 working days. Without expert help, it can take 3-6 months or face rejection. We prepare compliance-ready applications that minimize processing time and eliminate rejection risk.',
  },
  {
    question: 'What does your consultation fee cover?',
    answer: 'Our consultation fee covers: engineering drawings (2D + 3D), structural design and calculations, government approval assistance, site inspection, material specification guidance, and project advisory. We operate on fixed professional fees — NOT on per-square-foot rates or material commissions. Your money goes to YOUR project, not to us.',
  },
  {
    question: 'Do you charge commission on materials?',
    answer: 'Absolutely NOT. We do not take any commission from material suppliers, contractors, or any third party. This is our core principle. Your project budget is used 100% for your project. We only charge the professional consultation fee that is agreed upon upfront — no hidden costs, no surprises.',
  },
  {
    question: 'What areas do you serve?',
    answer: 'We are headquartered in Namakkal and actively serve across Tamil Nadu — including Salem, Karur, and Trichy as our primary service zones. For projects outside these areas, please contact us to discuss feasibility.',
  },
  {
    question: 'What is the difference between your Standard, Premium, and Luxury packages?',
    answer: 'Standard (3%) — Engineering guidance and advisory only; you manage labour and materials. Premium (6%) — Daily site visits, progress monitoring, structural advice, with labour and materials arranged. Luxury (9%) — Complete end-to-end engineering support including site supervision, quality control, stage inspections, and advanced site management. Most clients choose Luxury for complete peace of mind.',
  },
  {
    question: 'How do I start my project with you?',
    answer: 'Simple — contact us via WhatsApp (+91 83440 51846), phone, or the contact form on this website. We will schedule a free initial consultation to understand your requirements, visit your site if needed, and provide a clear proposal with scope and fees. No obligation — just expert guidance from day one.',
  },
];

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="border-b border-brand-card last:border-b-0"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-start gap-4 py-5 text-left group"
        aria-expanded={isOpen}
      >
        <div className="w-8 h-8 rounded-md bg-brand-card border border-brand-card flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-brand-accent transition-colors">
          <HelpCircle size={16} className="text-brand-accent group-hover:text-brand-primary transition-colors" />
        </div>
        <span className="flex-1 text-base md:text-lg font-bold text-brand-text group-hover:text-brand-accent transition-colors leading-snug font-inter">
          {faq.question}
        </span>
        <ChevronDown
          size={18}
          className={`text-brand-accent flex-shrink-0 mt-1.5 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-5 pl-12 pr-8">
              <p className="text-sm md:text-base text-brand-text/70 leading-relaxed font-inter">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  return (
    <section id="faq" className="relative py-12 md:py-32 bg-brand-primary overflow-hidden border-t border-brand-card">
      <div className="absolute inset-0">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[120px]" />
      </div>

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block border border-brand-accent/30 text-brand-accent text-sm font-semibold tracking-[0.2em] uppercase mb-4 px-4 py-1.5 rounded-full bg-brand-accent/5 shadow-sm font-inter">
            Common Questions
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-sgrotesk font-bold text-brand-text mb-4">
            Frequently Asked <span className="text-brand-accent font-extrabold">Questions</span>
          </h2>
          <p className="text-brand-text/80 text-base md:text-lg font-inter">
            Clear answers to help you make informed decisions about your construction project.
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto bg-brand-secondary border border-brand-card shadow-sm rounded-xl p-6 md:p-8">
          {faqs.map((faq, index) => (
            <FAQItem key={index} faq={faq} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-brand-text/70 text-sm mb-4 font-inter">
            Still have questions? We&apos;re here to help.
          </p>
          <a
            href="https://wa.me/918344051846?text=I%20want%20to%20get%20the%20quote%20for%20my%20plan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-brand-accent text-brand-primary px-6 py-3 rounded-lg text-sm font-bold shadow-sm hover:bg-[#F59E0B] transition-colors font-inter"
          >
            Ask on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
