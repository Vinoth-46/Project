'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FileCheck, Building2, LayoutDashboard, Banknote, Landmark, ArrowUpRight, ShieldCheck, AlertTriangle, CheckCircle2, X } from 'lucide-react';

interface ServiceDetail {
  problem: string;
  solution: string;
  outcome: string;
}

interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
  detail: ServiceDetail;
}

function ServiceCard({ service, index, onLearnMore }: { service: Service; index: number; onLearnMore: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setRotateX(((e.clientY - centerY) / (rect.height / 2)) * -8);
    setRotateY(((e.clientX - centerX) / (rect.width / 2)) * 8);
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
      transition={{ duration: 0.6, delay: index * 0.12 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      <div className="glass-card p-6 md:p-8 h-full flex flex-col group cursor-pointer relative overflow-hidden transition-all duration-300 hover:shadow-lg">
        {/* Content */}
        <div className="relative z-10 flex flex-col flex-grow">
          {/* Icon */}
          <div className="w-14 h-14 rounded-lg bg-brand-primary border border-brand-card flex items-center justify-center text-brand-accent mb-6 group-hover:bg-brand-accent group-hover:text-brand-primary group-hover:border-transparent group-hover:scale-110 transition-all duration-300">
            {service.icon}
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-sgrotesk font-bold text-brand-text mb-3 transition-colors">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-brand-text/70 text-sm md:text-base leading-relaxed mb-6 flex-grow font-inter">
            {service.description}
          </p>

          {/* Learn More Button */}
          <button
            onClick={onLearnMore}
            className="flex items-center gap-2 text-brand-accent text-sm font-bold hover:gap-3 transition-all duration-300 mt-auto pt-2"
          >
            <span>Learn More</span>
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300"
            />
          </button>
        </div>

        {/* Corner Accent */}
        <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute top-4 right-4 w-8 h-[1px] bg-brand-accent" />
          <div className="absolute top-4 right-4 w-[1px] h-8 bg-brand-accent" />
        </div>
      </div>
    </motion.div>
  );
}

const services: Service[] = [
  {
    title: 'Building Approval (Residential & Commercial)',
    description:
      'Complete building approval services for residential and commercial projects. We handle all documentation, liaison, and government coordination.',
    icon: <FileCheck size={28} />,
    detail: {
      problem: 'Without proper approvals, your construction can be declared illegal — leading to demolition orders, heavy fines, and total investment loss. Many homeowners discover this too late.',
      solution: 'We handle the entire approval process end-to-end — site survey, documentation, application filing, government liaison, and final approval collection. Zero hassle for you.',
      outcome: 'Legally approved building with all government clearances in hand. No risk of demolition, fines, or legal complications — your investment is 100% protected.',
    },
  },
  {
    title: 'DTCP Approval',
    description:
      'Expert handling of DTCP (Directorate of Town & Country Planning) permits with complete documentation and government liaison work.',
    icon: <Landmark size={28} />,
    detail: {
      problem: 'DTCP approval requires precise compliance with zoning laws, setback rules, and building regulations. A single mistake in the application leads to rejection and months of delay.',
      solution: 'As registered civil engineers, we prepare DTCP-compliant plans, handle all technical documentation, and coordinate directly with authorities to ensure smooth and fast approval.',
      outcome: 'DTCP-approved property with proper clearances — increasing your land value by 20-40% and ensuring hassle-free bank loan processing for construction.',
    },
  },
  {
    title: 'Complete Construction & Consulting',
    description:
      'End-to-end construction services from foundation to finishing. Expert consulting for optimal design, material selection, and cost efficiency.',
    icon: <Building2 size={28} />,
    detail: {
      problem: 'Unqualified contractors cut corners on materials, skip structural calculations, and ignore safety codes. This leads to ₹5-10 Lakhs in repair costs within just 5 years.',
      solution: 'We provide engineer-supervised construction with ISI-certified materials, M25/M30 grade concrete, Fe-500 TMT steel, and stage-by-stage quality inspections. Every structure is built to last.',
      outcome: 'A structurally sound, code-compliant building built with verified materials and engineering supervision. Your structure will stand for 80+ years — not just 20.',
    },
  },
  {
    title: 'Building Plans & Bank Estimates',
    description:
      'Professional architectural drawings and detailed cost estimates for bank loans and project planning. Accepted by all major banks.',
    icon: <LayoutDashboard size={28} />,
    detail: {
      problem: 'Banks reject loan applications when estimates are unrealistic or plans don\'t meet standards. Unqualified drafters create plans that fail government and bank scrutiny.',
      solution: 'We create bank-ready architectural plans (2D + 3D) and precise cost estimates that are accepted by all major banks. Plans include proper structural calculations and compliance checks.',
      outcome: 'Bank-approved plans and estimates — fast loan processing with no rejections or revisions. Your construction timeline starts on schedule, not delayed by paperwork.',
    },
  },
  {
    title: 'Bank Loan Assistance & Finance',
    description:
      'Complete support for home loans and construction financing. Documentation assistance, bank coordination, and valuation report preparation.',
    icon: <Banknote size={28} />,
    detail: {
      problem: 'Navigating bank requirements alone leads to application rejections, missing documents, and months of delays. Many homeowners lose preferred interest rates due to incomplete submissions.',
      solution: 'We prepare all engineering documentation banks require — valuation reports, structural stability certificates, completion certificates — and coordinate directly with bank engineers.',
      outcome: 'Smooth, fast loan approval with minimum documentation hassle. You get the best possible loan amount and can start construction without financial bottlenecks.',
    },
  },
];

export default function ServicesSection() {
  const [activeService, setActiveService] = useState<Service | null>(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (activeService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [activeService]);

  return (
    <>
      <section id="services" className="relative py-20 md:py-32 bg-brand-secondary border-t border-brand-card">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(51, 65, 85, 0.4) 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="section-container relative z-10">
          {/* Section Header */}
          <motion.div
            className="text-center max-w-3xl mx-auto mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block border border-brand-accent/30 text-brand-accent text-sm font-semibold tracking-[0.2em] uppercase mb-4 px-4 py-1.5 rounded-full bg-brand-accent/5 shadow-sm font-inter">
              Our Services
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-sgrotesk font-bold text-brand-text mb-6">
              Expert Solutions for
              <span className="text-brand-accent font-extrabold"> Every Stage</span>
            </h2>
            <p className="text-brand-text/80 text-base md:text-lg font-inter">
              As a civil engineer, I must tell you — every construction decision has long-term consequences.
              Here's how we protect your investment at every stage.
            </p>
          </motion.div>

          {/* Authority Badge */}
          <motion.div
            className="flex justify-center mb-14"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-brand-card bg-brand-primary shadow-sm font-inter">
              <ShieldCheck size={16} className="text-brand-accent" />
              <span className="text-sm text-brand-text/70">
                Licensed Civil Engineer • <span className="text-brand-text font-bold">100% Approval Rate</span>
              </span>
            </div>
          </motion.div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <ServiceCard 
                key={index} 
                service={service} 
                index={index} 
                onLearnMore={() => setActiveService(service)} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Detail Modal overlay */}
      <AnimatePresence>
        {activeService && (
          <div 
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6" 
            style={{ touchAction: 'none' }}
          >
            <motion.div 
              className="absolute inset-0 bg-brand-primary/95 backdrop-blur-md"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setActiveService(null)}
            />
            
            <motion.div
              className="relative w-full max-w-2xl bg-brand-secondary border border-brand-card rounded-2xl shadow-xl flex flex-col max-h-[90vh] overflow-hidden"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, type: 'spring', bounce: 0.15 }}
            >
              {/* Modal Header */}
              <div className="px-6 py-5 border-b border-brand-card bg-brand-primary flex justify-between items-center z-10 flex-shrink-0">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-lg bg-brand-card flex items-center justify-center text-brand-accent border border-brand-accent/30">
                     {activeService.icon}
                   </div>
                   <h3 className="text-lg md:text-xl font-sgrotesk font-bold text-brand-text pr-4">
                     {activeService.title}
                   </h3>
                </div>
                <button 
                  onClick={() => setActiveService(null)}
                  className="w-8 h-8 rounded-full bg-brand-card hover:bg-red-500/20 border border-brand-card flex items-center justify-center text-brand-text hover:text-red-400 hover:border-red-500/30 transition-colors flex-shrink-0"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 md:p-8 overflow-y-auto">
                <p className="text-brand-text/80 font-inter text-base md:text-lg leading-relaxed mb-8">
                  {activeService.description}
                </p>

                <div className="space-y-4 md:space-y-6">
                  {/* Problem */}
                  <div className="flex gap-4 p-5 rounded-xl border border-red-500/30 bg-red-500/10">
                    <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                      <AlertTriangle size={20} className="text-red-500" />
                    </div>
                    <div>
                      <p className="text-xs lg:text-sm font-bold text-red-400 uppercase tracking-wider mb-2">The Problem</p>
                      <p className="text-sm md:text-base text-brand-text/80 font-inter leading-relaxed">{activeService.detail.problem}</p>
                    </div>
                  </div>

                  {/* Solution */}
                  <div className="flex gap-4 p-5 rounded-xl border border-brand-accent/50 bg-brand-accent/10 shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-brand-accent/20 flex items-center justify-center flex-shrink-0 border border-brand-accent/50">
                      <ShieldCheck size={20} className="text-brand-accent" />
                    </div>
                    <div>
                      <p className="text-xs lg:text-sm font-bold text-brand-accent uppercase tracking-wider mb-2">Our Solution</p>
                      <p className="text-sm md:text-base text-brand-text/80 font-inter leading-relaxed">{activeService.detail.solution}</p>
                    </div>
                  </div>

                  {/* Outcome */}
                  <div className="flex gap-4 p-5 rounded-xl border border-green-500/30 bg-green-500/10">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 size={20} className="text-green-400" />
                    </div>
                    <div>
                      <p className="text-xs lg:text-sm font-bold text-green-400 uppercase tracking-wider mb-2">Your Outcome</p>
                      <p className="text-sm md:text-base text-brand-text/80 font-inter leading-relaxed">{activeService.detail.outcome}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-brand-card flex flex-col md:flex-row gap-4">
                  <a 
                    href="https://wa.me/918344051846?text=Hi%2C%20I'm%20interested%20in%20your%20services." 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-gold-filled text-center flex-1 py-4 text-sm font-bold"
                  >
                    Discuss Your Project
                  </a>
                  <button 
                    onClick={() => setActiveService(null)}
                    className="btn-gold text-center flex-1 py-4 text-sm font-bold"
                  >
                    Close Details
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
