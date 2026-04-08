'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FileCheck, Building2, LayoutDashboard, Banknote, ArrowUpRight } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}

function ServiceCard({ title, description, icon, index }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const rotateXValue = (mouseY / (rect.height / 2)) * -10;
    const rotateYValue = (mouseX / (rect.width / 2)) * 10;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="tilt-card"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      <div className="glass-card p-6 md:p-8 h-full group cursor-pointer relative overflow-hidden">
        {/* Glow Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-orange/10" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <div className="w-14 h-14 rounded-lg bg-gold/10 flex items-center justify-center text-gold mb-6 group-hover:bg-gold/20 group-hover:scale-110 transition-all duration-300">
            {icon}
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-outfit font-bold text-warm-white mb-3 group-hover:text-gold transition-colors">
            {title}
          </h3>

          {/* Description */}
          <p className="text-warm-gray text-sm md:text-base leading-relaxed mb-4">
            {description}
          </p>

          {/* Link */}
          <div className="flex items-center gap-2 text-gold text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <span>Learn More</span>
            <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </div>
        </div>

        {/* Corner Accent */}
        <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute top-4 right-4 w-8 h-[1px] bg-gold/50" />
          <div className="absolute top-4 right-4 w-[1px] h-8 bg-gold/50" />
        </div>
      </div>
    </motion.div>
  );
}

const services = [
  {
    title: 'Building Approvals',
    description:
      'Streamlined approval process for CMDA, DTCP, and local authority permits. We handle all documentation and liaison work.',
    icon: <FileCheck size={28} />,
  },
  {
    title: 'Complete Construction & Consulting',
    description:
      'End-to-end construction services from foundation to finishing. Expert consulting for optimal design and cost efficiency.',
    icon: <Building2 size={28} />,
  },
  {
    title: 'Building Plans & Bank Estimates',
    description:
      'Professional architectural drawings and detailed cost estimates for bank loans and project planning.',
    icon: <LayoutDashboard size={28} />,
  },
  {
    title: 'Bank Loan Assistance & Finance',
    description:
      'Complete support for home loans and construction financing. Documentation assistance and bank coordination.',
    icon: <Banknote size={28} />,
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-20 md:py-32 bg-dark-light">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #f5a623 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
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
          <span className="text-gold text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-outfit font-bold text-warm-white mb-6">
            Comprehensive Solutions for
            <span className="gradient-text"> Your Vision</span>
          </h2>
          <p className="text-warm-gray text-base md:text-lg">
            From concept to completion, we provide a full spectrum of civil engineering
            and construction services tailored to your needs.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}
