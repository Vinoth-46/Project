'use client';

import { motion } from 'framer-motion';
import BuildingModel from '../components/3d/BuildingModel';

export default function InteractiveBuilding() {
  return (
    <section className="relative py-20 md:py-32 bg-dark overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[150px]" />
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
          <span className="text-gold text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
            Explore Our Process
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-outfit font-bold text-warm-white mb-6">
            Interactive <span className="gradient-text">Building Model</span>
          </h2>
          <p className="text-warm-gray text-base md:text-lg">
            Click on different zones of the building to learn about our construction
            methodology and quality standards.
          </p>
        </motion.div>

        {/* 3D Canvas Container */}
        <motion.div
          className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] glass-card"
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
            'Quality Materials',
            'Expert Craftsmanship',
            'Timely Delivery',
            'DTCP Approved',
          ].map((feature, index) => (
            <span
              key={index}
              className="px-4 py-2 text-sm text-warm-gray border border-gold/20 rounded-full bg-dark/50"
            >
              {feature}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
