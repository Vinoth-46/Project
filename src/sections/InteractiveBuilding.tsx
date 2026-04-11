'use client';

import { motion } from 'framer-motion';
import BuildingModel from '../components/3d/BuildingModel';

export default function InteractiveBuilding() {
  return (
    <section className="relative py-20 md:py-32 bg-brand-softWhite overflow-hidden border-t border-slate-200">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-accent/5 rounded-full blur-[150px]" />
      </div>

      <div className="section-container relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block border border-brand-accent/30 text-brand-accent text-sm font-semibold tracking-[0.2em] uppercase mb-4 px-4 py-1.5 rounded-full bg-brand-accent/5 shadow-sm font-inter">
            Engineering Excellence
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-sgrotesk font-bold text-brand-primary mb-6">
            See How We <span className="text-brand-accent font-extrabold">Build Right</span>
          </h2>
          <p className="text-slate-600 text-base md:text-lg font-inter">
            Click on different zones to understand our construction methodology —
            from foundation engineering to architectural finishing.
          </p>
        </motion.div>

        {/* 3D Canvas Container — touch-action ensures mobile scroll works */}
        <motion.div
          className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
          style={{ touchAction: 'pan-y' }}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <BuildingModel />
        </motion.div>

        {/* Feature Pills */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {[
            'ISI Certified Materials',
            'DTCP Approved Plans',
            '100% Approval Rate',
            'M25/M30 Grade Concrete',
          ].map((feature, index) => (
            <span
              key={index}
              className="px-4 py-2 text-sm text-slate-700 border border-slate-200 rounded-full bg-white shadow-sm hover:border-brand-accent hover:text-brand-accent transition-colors font-inter"
            >
              {feature}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
