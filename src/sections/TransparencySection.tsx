'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, IndianRupee, Lock, Eye } from 'lucide-react';

const trustPoints = [
  {
    icon: <IndianRupee size={24} />,
    title: 'Zero Commission on Materials',
    description: 'We do NOT take any commission from material suppliers. Your project money is used 100% for YOUR project.',
  },
  {
    icon: <Eye size={24} />,
    title: 'No Hidden Charges',
    description: 'Every rupee is accounted for. Complete cost transparency from day one — no surprise bills, no scope creep charges.',
  },
  {
    icon: <Lock size={24} />,
    title: 'Your Money = Your Project',
    description: 'Your project funds are used exclusively for your construction. We operate on professional consultation fees only.',
  },
  {
    icon: <ShieldCheck size={24} />,
    title: 'Professional Fees Only',
    description: 'We charge only for our engineering expertise and consultation. Clear fee structure — see our packages above.',
  },
];

export default function TransparencySection() {
  return (
    <section id="transparency" className="relative py-20 md:py-32 bg-brand-primary overflow-hidden border-t border-brand-card">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-accent/5 rounded-full blur-[150px]" />
      </div>

      <div className="section-container relative z-10">
        {/* Main Trust Banner */}
        <motion.div
          className="relative mx-auto max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
        >
          {/* Outer Border */}
          <div className="absolute -inset-[1px] rounded-2xl bg-brand-card shadow-sm" />
          
          <div className="relative rounded-2xl bg-brand-secondary p-8 md:p-12 overflow-hidden border border-brand-card">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'linear-gradient(rgba(51,65,85,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(51,65,85,0.4) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />

            {/* Shield Icon */}
            <motion.div
              className="flex justify-center mb-6"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
            >
              <div className="w-16 h-16 rounded-full bg-brand-card border border-brand-accent/30 flex items-center justify-center">
                <ShieldCheck size={32} className="text-brand-accent" />
              </div>
            </motion.div>

            {/* Header */}
            <div className="text-center mb-8 relative z-10">
              <span className="inline-block border border-brand-accent/30 text-brand-accent text-xs font-semibold tracking-[0.25em] uppercase px-4 py-1.5 rounded-full bg-brand-accent/5 mb-3 shadow-sm font-inter">
                Our Promise to You
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-sgrotesk font-bold text-brand-text mb-4">
                Complete <span className="text-brand-accent font-extrabold">Transparency</span> — Zero Hidden Costs
              </h2>
              <p className="text-brand-text/80 text-base max-w-2xl mx-auto font-inter">
                Unlike many in the industry, we believe your trust is our greatest asset. 
                Here&apos;s our commitment in black and white.
              </p>
            </div>

            {/* Main Commitment Block */}
            <motion.div
              className="relative z-10 bg-brand-primary border border-brand-card rounded-xl p-6 md:p-8 mb-8 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="text-center space-y-3">
                <p className="text-lg md:text-xl font-inter font-bold text-brand-text/90 leading-relaxed">
                  &ldquo;WE DO NOT TAKE ANY COMMISSION FROM MATERIALS&rdquo;
                </p>
                <p className="text-xl md:text-2xl font-rajdhani font-bold text-brand-accent leading-relaxed tracking-wider">
                  NO HIDDEN CHARGES
                </p>
                <p className="text-base md:text-lg font-inter font-semibold text-brand-text/90 leading-relaxed">
                  YOUR PROJECT MONEY IS USED ONLY FOR YOUR PROJECT
                </p>
                <div className="w-16 h-[2px] bg-brand-card mx-auto my-4" />
                <p className="text-sm md:text-base text-brand-text/60 italic font-inter">
                  We only charge professional consultation fees — clearly defined in our packages.
                </p>
              </div>
            </motion.div>

            {/* Trust Points Grid */}
            <div className="relative z-10 grid sm:grid-cols-2 gap-5">
              {trustPoints.map((point, i) => (
                <motion.div
                  key={i}
                  className="flex gap-4 p-4 rounded-lg bg-brand-primary border border-brand-card shadow-sm hover:border-brand-accent transition-colors"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                >
                  <div className="w-11 h-11 rounded-lg bg-brand-card flex items-center justify-center text-brand-accent border border-brand-card flex-shrink-0">
                    {point.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-brand-text mb-1">{point.title}</h4>
                    <p className="text-xs text-brand-text/70 leading-relaxed font-inter">{point.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
