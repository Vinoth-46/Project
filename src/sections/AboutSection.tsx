'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { Award, Users, CheckCircle, Briefcase, GraduationCap, ShieldCheck } from 'lucide-react';

interface StatProps {
  value: number;
  suffix: string;
  label: string;
  icon: React.ReactNode;
  delay: number;
}

function AnimatedStat({ value, suffix, label, icon, delay }: StatProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2,
        delay: delay,
        ease: "easeOut",
        onUpdate: (value) => setCount(Math.floor(value)),
      });
      return () => controls.stop();
    }
  }, [isInView, value, delay]);

  return (
    <motion.div
      ref={ref}
      className="bg-white p-6 md:p-8 text-center group rounded-xl border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-md hover:border-brand-accent/50"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5 }}
    >
      <div className="flex justify-center mb-4">
        <div className="w-12 h-12 rounded-lg bg-brand-card flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-brand-primary transition-colors border border-transparent group-hover:border-brand-accent">
          {icon}
        </div>
      </div>
      <div className="text-4xl md:text-5xl font-rajdhani font-bold text-brand-accent mb-2">
        {count}
        {suffix}
      </div>
      <div className="text-sm md:text-base text-slate-600 font-inter">{label}</div>
    </motion.div>
  );
}

const stats = [
  {
    value: 5,
    suffix: '+',
    label: 'Years Experience',
    icon: <Award size={24} />,
    delay: 0,
  },
  {
    value: 50,
    suffix: '+',
    label: 'Projects Completed',
    icon: <Briefcase size={24} />,
    delay: 0.1,
  },
  {
    value: 100,
    suffix: '%',
    label: 'Approval Rate',
    icon: <CheckCircle size={24} />,
    delay: 0.2,
  },
  {
    value: 5,
    suffix: '',
    label: 'Core Services',
    icon: <Users size={24} />,
    delay: 0.3,
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-12 md:py-32 bg-brand-softWhite">
      <div className="section-container">
        {/* Section Header */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-16">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block border border-brand-accent/30 text-brand-accent text-sm font-semibold tracking-[0.2em] uppercase mb-4 px-4 py-1.5 rounded-full bg-brand-accent/5 shadow-sm font-inter">
              About Us
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-sgrotesk font-bold text-brand-primary mb-6">
              Why Choose a
              <span className="text-brand-accent font-extrabold"> Licensed Engineer?</span>
            </h2>

            {/* Credentials Badge */}
            <motion.div
              className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 bg-white shadow-sm mb-6"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="w-14 h-14 rounded-full bg-brand-card border border-brand-accent/30 flex items-center justify-center flex-shrink-0">
                <GraduationCap size={24} className="text-brand-accent" />
              </div>
              <div>
                <p className="text-brand-primary font-bold text-base font-inter">Er. V. NIRMAL, B.E. (Civil)</p>
                <p className="text-slate-600 text-sm font-semibold font-inter">Registered Civil Engineer • Proprietor</p>
                <p className="text-slate-400 text-xs mt-0.5 font-inter">5+ Years of Professional Practice in Tamil Nadu</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Description */}
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-slate-700 font-inter text-base md:text-lg leading-relaxed mb-6">
              <span className="text-brand-primary font-bold">As a Civil Engineer, I must tell you</span> — 
              the difference between a good building and a disaster often comes down to 
              one decision: <strong className="text-brand-accent">who supervises your construction.</strong>
            </p>
            <p className="text-slate-700 font-inter text-base md:text-lg leading-relaxed mb-6">
              Kitchaa&apos;s Enterprise was founded with a single mission — to protect 
              homeowners from costly construction mistakes. We bring engineering expertise 
              to every project, ensuring that your money is spent wisely and your 
              structure stands the test of time.
            </p>
            
            {/* Key Differentiators */}
            <div className="space-y-3">
              {[
                'Engineer-supervised construction — not just contractor oversight',
                'ISI certified materials with proper testing & verification',
                'Complete government approval handling — 100% approval record',
                'Transparent pricing — we never take commission on materials',
              ].map((point, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                >
                  <ShieldCheck size={16} className="text-brand-accent mt-1 flex-shrink-0" />
                  <p className="text-sm text-slate-600 font-inter">{point}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <AnimatedStat key={index} {...stat} />
          ))}
        </div>

        {/* Divider */}
        <motion.div
          className="mt-20 h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>
    </section>
  );
}
