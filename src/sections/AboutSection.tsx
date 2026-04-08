'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Users, CheckCircle, Briefcase } from 'lucide-react';

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
      const timer = setTimeout(() => {
        const duration = 2000;
        const steps = 60;
        const increment = value / steps;
        let current = 0;

        const counter = setInterval(() => {
          current += increment;
          if (current >= value) {
            setCount(value);
            clearInterval(counter);
          } else {
            setCount(Math.floor(current));
          }
        }, duration / steps);

        return () => clearInterval(counter);
      }, delay * 1000);

      return () => clearTimeout(timer);
    }
  }, [isInView, value, delay]);

  return (
    <motion.div
      ref={ref}
      className="glass-card p-6 md:p-8 text-center group"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5 }}
    >
      <div className="flex justify-center mb-4">
        <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold/20 transition-colors">
          {icon}
        </div>
      </div>
      <div className="text-4xl md:text-5xl font-outfit font-bold gradient-text mb-2">
        {count}
        {suffix}
      </div>
      <div className="text-sm md:text-base text-warm-gray">{label}</div>
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
    label: 'Client Satisfaction',
    icon: <CheckCircle size={24} />,
    delay: 0.2,
  },
  {
    value: 4,
    suffix: '',
    label: 'Core Services',
    icon: <Users size={24} />,
    delay: 0.3,
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-20 md:py-32 bg-dark">
      <div className="section-container">
        {/* Section Header */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-16">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
              About Us
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-outfit font-bold text-warm-white mb-6">
              Building Trust Through
              <span className="gradient-text"> Excellence</span>
            </h2>
          </motion.div>

          {/* Right: Description */}
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-warm-gray text-base md:text-lg leading-relaxed mb-6">
              Kitchaa&apos;s Enterprise, founded by{' '}
              <strong className="text-warm-white">Er. V. NIRMAL, B.E. (Civil)</strong>,
              has been serving Namakkal and surrounding regions with exceptional
              civil engineering and construction services. Our commitment to quality,
              transparency, and timely delivery has made us a trusted name in the
              industry.
            </p>
            <p className="text-warm-gray text-base md:text-lg leading-relaxed">
              From building approvals to complete construction management, we handle
              every aspect of your project with precision and care. Our team of
              experienced professionals ensures that every structure we build stands
              the test of time.
            </p>
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
          className="mt-20 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>
    </section>
  );
}
