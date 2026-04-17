'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ShieldCheck, Drill, Hammer, CheckCircle2 } from 'lucide-react';

const constructionSteps = [
  {
    id: 'foundation',
    title: 'Specialized Foundation',
    subtitle: 'R.C.C Footing & Rebar Engineering',
    description: 'We use high-grade steel reinforcement (Fe 550D) and specialized anti-termite treatment at the footing level to ensure a lifetime of structural stability.',
    image: '/foundation_step_1776132259388.webp',
    features: ['Grade M25 Concrete', 'Corrosion Resistant Steel', 'Soil Compaction Tested'],
    icon: ShieldCheck
  },
  {
    id: 'columns',
    title: 'Structural Skeleton',
    subtitle: 'Column Casting & Beam Alignment',
    description: 'Our columns are cast using precision-aligned formwork, ensuring vertical accuracy and load-bearing integrity as per seismic standards.',
    image: '/columns_step_1776132279693.webp',
    features: ['Vibrated Casting', 'Perfect Alignment', 'Fe 550D Strength'],
    icon: Drill
  },
  {
    id: 'slab',
    title: 'Slab Engineering',
    subtitle: 'Roof Casting & Technical Conduits',
    description: 'Wait-free casting processes with integrated electrical piping and drainage conduits, pre-planned to avoid structural drilling later.',
    image: '/slab_step_1776132302402.webp',
    features: ['Waterproof Curing', 'Electrical Integration', 'Seamless Finish'],
    icon: Hammer
  },
  {
    id: 'finishing',
    title: 'Premium Finishing',
    subtitle: 'Architectural Handover',
    description: 'From mirror-finish plastering to precise tiling and electrical fixtures, every detail is audited to ensure a world-class luxury living experience.',
    image: '/finishing_step_1776132323949.webp',
    features: ['Mirror Plaster', 'Italian Marble Ready', 'Premium Fittings'],
    icon: CheckCircle2
  }
];

export default function InteractiveBuilding() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="how-we-build" className="relative py-12 md:py-32 bg-brand-primary overflow-hidden border-t border-white/5">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-accent/5 rounded-full blur-[150px]" />
      </div>

      <div className="section-container relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block border border-brand-accent/30 text-brand-accent text-xs font-bold tracking-[0.25em] uppercase mb-4 px-4 py-1.5 rounded-full bg-brand-accent/5 shadow-sm font-jakarta">
            Engineering Precision
          </span>
          <h2 className="text-3xl md:text-5xl font-outfit font-bold text-brand-text mb-6">
            See How We <span className="text-brand-accent font-extrabold">Build Right</span>
          </h2>
          <p className="text-brand-text/60 text-base md:text-lg font-inter">
            Step-by-step engineering walkthrough from initial foundation to the final architectural masterpiece.
          </p>
        </motion.div>

        {/* Main Showcase Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Step Navigation (Timeline) */}
          <div className="lg:col-span-4 space-y-3 order-2 lg:order-1 relative">
            {constructionSteps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep === index;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(index)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 group text-left ${
                    isActive 
                      ? 'bg-brand-accent border-transparent text-brand-primary shadow-lg shadow-brand-accent/20' 
                      : 'bg-slate-900/40 border-white/5 text-brand-text/50 hover:border-brand-accent/30 hover:text-brand-text'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                    isActive ? 'bg-brand-primary/10' : 'bg-brand-primary/50 group-hover:bg-brand-accent/10'
                  }`}>
                    <Icon size={20} className={isActive ? 'text-brand-primary' : 'text-brand-accent'} />
                  </div>
                  <div className="flex-1">
                    <p className={`text-[10px] uppercase tracking-widest font-bold mb-0.5 ${isActive ? 'text-brand-primary/60' : 'text-brand-accent'}`}>Phase 0{index + 1}</p>
                    <p className="text-sm font-bold font-jakarta">{step.title}</p>
                  </div>
                  <ChevronRight size={16} className={`transition-transform duration-300 ${isActive ? 'rotate-90 text-brand-primary' : 'opacity-0 group-hover:opacity-100'}`} />
                </button>
              );
            })}

            {/* Feature Pills (Integrated) */}
            <div className="pt-6 grid grid-cols-2 gap-2">
              {[
                'ISI Certified',
                'M25 Concrete',
                'FE 550D Steel',
                'DTCP Plans',
              ].map((feature, index) => (
                <span key={index} className="px-3 py-1.5 text-[9px] text-center border border-white/5 rounded-lg bg-slate-900/20 text-brand-text/40 font-jakarta font-bold uppercase tracking-wider">
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Active Step Showcase */}
          <div className="lg:col-span-8 order-1 lg:order-2 relative min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="relative bg-slate-900/60 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl overflow-hidden group min-h-[450px] md:min-h-[550px] flex flex-col justify-end"
              >
                {/* Construction Image as Full Background */}
                <div className="absolute inset-0 z-0">
                  <motion.img 
                    src={constructionSteps[activeStep].image} 
                    alt={constructionSteps[activeStep].title}
                    width={800}
                    height={800}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 brightness-[0.8]"

                  />
                </div>

                {/* Heavy Bottom Gradient Overlay to ensure text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent z-10 opacity-95" />

                {/* Content Overlay - Forced to the bottom */}
                <div className="relative z-20 p-6 md:p-8 flex flex-col items-start text-left w-full mt-auto">
                  <div className="inline-block px-3 py-1.5 bg-brand-accent text-[#050505] text-[10px] font-black uppercase tracking-[0.15em] rounded-lg mb-3 shadow-[0_4px_20px_rgba(250,204,21,0.3)]">
                    {constructionSteps[activeStep].subtitle}
                  </div>
                  <h3 className="text-2xl md:text-4xl font-outfit font-bold text-white mb-3 leading-tight w-full drop-shadow-md">
                    {constructionSteps[activeStep].title}
                  </h3>
                  <p className="text-white/80 text-sm md:text-base leading-relaxed mb-6 max-w-2xl font-inter w-full">
                    {constructionSteps[activeStep].description}
                  </p>

                  <div className="flex flex-wrap gap-3 w-full">
                    {constructionSteps[activeStep].features.map((f, fi) => (
                      <div key={fi} className="flex items-center gap-2 text-[10px] md:text-[11px] font-bold text-brand-accent bg-[#050505]/50 backdrop-blur-sm border border-brand-accent/30 px-3 py-1.5 rounded-full font-jakarta uppercase tracking-wider shadow-lg">
                        <CheckCircle2 size={14} className="shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
