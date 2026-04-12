'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Download, MessageCircle, ShieldCheck, ChevronDown } from 'lucide-react';

const legalTerms = [
  { title: "1. Nature of Professional Service", content: "The company provides civil engineering consultancy including structural guidance, drawings, design review, technical advice, estimates and construction consultation. The company does not undertake construction contracts unless explicitly agreed through a separate written contract." },
  { title: "2. Consultancy Business Model", content: "The consultancy operates strictly as a professional advisory service provider and does not follow the common market practice of charging construction based on square-foot rate methods." },
  { title: "3. Estimate & Cost Advisory Disclaimer", content: "All estimates prepared by the consultancy are engineering approximations intended for guidance only. Variations due to contractor pricing, labour cost, material market fluctuation, transport cost or economic conditions remain outside consultant responsibility." },
  { title: "4. Stage Based Payment Policy", content: "Consultancy fees shall be paid strictly according to the defined stages of service. In case of payment delay, the consultancy reserves the right to suspend drawings, site consultation, estimates and all professional services until outstanding payments are cleared." },
  { title: "5. Client Data Responsibility", content: "The client must provide accurate survey drawings, land ownership documents, soil investigation reports & statutory approvals. The consultant shall not be responsible for issues arising from incorrect or incomplete information provided by the client." },
  { title: "6. Compliance with Engineering Codes", content: "All professional services shall comply with applicable engineering codes, building safety standards & statutory regulations. Any request to violate building rules or statutory norms shall be rejected by the consultancy." },
  { title: "7. Contractor Execution Liability", content: "Construction execution including workmanship, labour safety, materials, structural implementation and site management remains entirely under the responsibility of the contractor or client." },
  { title: "8. Structural Modification Restriction", content: "Any structural modification to foundation, columns, beams, slabs, load-bearing walls or structural elements without written approval from the consultant voids all structural responsibility of the consultancy firm." },
  { title: "9. Intellectual Property Ownership", content: "All drawings, CAD files, structural calculations, estimates, specifications and engineering reports prepared by the consultancy remain exclusive intellectual property of the company." },
  { title: "10. Copyright & Design Protection", content: "All technical documents including drawings and estimates are protected under the Copyright Act, 1957. Unauthorized copying, modification, redistribution or commercial use without written permission is prohibited." },
  { title: "11. Criminal Misuse Protection", content: "Misuse, forgery or unauthorized representation of company drawings or estimates may attract prosecution under IPC Sections 406, 420, 463, 468 and 471 relating to criminal breach of trust, cheating, forgery and fraudulent use of documents." },
  { title: "12. Drawing Validity Clause", content: "Engineering drawings and estimates are valid only for the specific project and client for which they are prepared & shall not be reused for any other site or construction project." },
  { title: "13. Digital File Security", content: "Soft copies including CAD drawings, PDFs & design documents are issued strictly for project execution purposes & shall not be distributed or modified without written consultant approval." },
  { title: "14. Engineer Seal & Stamp Protection", content: "Any unauthorized duplication or misuse of engineer signature, seal, stamp or digital drawings shall be treated as legal violation & may attract criminal prosecution under applicable laws." },
  { title: "15. Structural Safety Limitation", content: "The consultant is responsible only for structural design prepared based on the provided information. Any deviation during construction without consultant approval voids design liability." },
  { title: "16. Soil & Site Condition Disclaimer", content: "The consultant shall not be liable for structural distress arising due to unforeseen soil conditions, groundwater changes or geological variations unless certified soil investigation data is provided." },
  { title: "17. Site Supervision Limitation", content: "Consultancy services do not include continuous site supervision unless specifically contracted. Quality control & construction supervision remain the responsibility of the contractor." },
  { title: "18. Additional Site Visit Charges", content: "Site visits beyond the agreed consultancy scope may attract additional professional service fees." },
  { title: "19. Force Majeure", content: "The consultancy shall not be liable for delays or damages caused by natural disasters including earthquake, flood, cyclone, fire, war, labour strikes, government restrictions or other force majeure events." },
  { title: "20. Professional Liability Cap", content: "The liability of the consultant shall be limited strictly to professional consultancy services rendered and shall not exceed the consultancy fees paid for the project." },
  { title: "21. Consultant Authority Clause", content: "The consultant retains full authority to refuse unsafe structural changes, illegal construction practices or design alterations that compromise safety standards." },
  { title: "22. Termination Rights", content: "The consultancy reserves the right to terminate services if payment defaults occur, drawings are misused, construction laws are violated or contractual terms are breached." },
  { title: "23. Legal Jurisdiction", content: "In case of dispute, parties shall first attempt amicable resolution. If unresolved, disputes shall fall under the jurisdiction of competent courts under applicable Indian law." }
];

const packages = [
  {
    name: 'Standard',
    price: '3%',
    sub: 'of Project Value',
    features: [
      'Engineering Guidance',
      'Clarification on Drawings',
      'Construction Advice',
      'Technical Guidance',
    ],
    highlight: 'Client Manages Labour & Materials',
    highlightSub: 'Procurement, Hiring, Supervision, Quality',
    cta: 'Book Standard',
  },
  {
    name: 'Premium',
    price: '6%',
    sub: 'of Project Value',
    features: [
      'Daily Site Visits',
      'Progress Monitoring',
      'Structural Advice',
      'Onsite Issues Resolution',
    ],
    highlight: 'Labour & Materials Provided',
    highlightSub: 'without Supervisor',
    cta: 'Book Premium',
  },
  {
    name: 'Luxury',
    price: '9%',
    sub: 'of Project Value',
    features: [
      'Site Supervision & Quality Control',
      'Every Stage Inspection',
      'Network of Labour & Suppliers',
      'Advanced Site Management',
    ],
    highlight: 'Complete End-to-End',
    highlightSub: 'Engineering Support',
    cta: 'Book Luxury',
    popular: true,
  },
];

const feeRows = [
  { service: '2D Architectural Plan', fee: 'Rs. 2 to Rs. 6 Per Sq. Ft' },
  { service: '3D Architectural Design / Elevation', fee: 'Rs. 10 to Rs. 20 Per Sq. Ft' },
  { service: 'Residential Building Approval', fee: 'Rs. 15,000 to Rs. 20,000*' },
  { service: 'Commercial Building Approval', fee: 'Depends on total Build Up Area' },
  { service: 'Bank Loan Estimate | Valuation Report', fee: 'Rs. 2,000 to Rs. 10,000' },
];

function FeeSchedule() {
  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = '/service-fee-structure.pdf';
    a.download = 'kitchaa-service-fee-structure.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div style={{
      background: '#FFFFFF',
      border: '1px solid #e2e8f0',
      borderRadius: 16,
      overflow: 'hidden',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
    }}>
      {/* Header */}
      <div style={{
        background: '#f8fafc',
        borderBottom: '1px solid #e2e8f0',
        padding: '1.2rem 1.5rem',
      }}>
        <p style={{ margin: 0, fontSize: 11, letterSpacing: '.15em', color: '#FACC15', textTransform: 'uppercase', fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>
          Fee Structure
        </p>
        <h3 style={{ margin: '4px 0 0', fontSize: 18, fontWeight: 700, color: '#0F172A', fontFamily: 'Space Grotesk, sans-serif' }}>
          Kitchaa&apos;s Enterprise
        </h3>
      </div>

      {/* Table */}
      <div style={{ padding: '0.5rem 0' }}>
        {feeRows.map((row, i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '0.75rem 1.5rem', gap: 12,
            background: i % 2 === 0 ? '#f8fafc' : 'transparent',
            borderBottom: i < feeRows.length - 1 ? '1px solid #e2e8f0' : 'none',
          }}>
            <span style={{ fontSize: 13, color: '#1e293b', flex: 1, fontFamily: 'Inter, sans-serif' }}>{row.service}</span>
            <span style={{ fontSize: 14, color: '#FACC15', fontWeight: 600, whiteSpace: 'nowrap', fontFamily: 'Rajdhani, sans-serif' }}>{row.fee}</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        borderTop: '1px solid #e2e8f0',
        padding: '0.9rem 1.5rem',
        background: '#f8fafc',
      }}>
        <p style={{ margin: '0 0 6px', fontSize: 11, color: '#64748b', fontStyle: 'italic', opacity: 0.7, fontFamily: 'Inter, sans-serif' }}>
          All fees subject to site complexity.
        </p>
        <p style={{ margin: '0 0 12px', fontSize: 11, color: '#1e293b', fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>
          GST @ 18% applicable on all professional fees.
        </p>
        <button onClick={handleDownload} style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: '#FACC15', border: 'none',
          borderRadius: 8, padding: '8px 16px', color: '#0F172A', fontSize: 13,
          fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s',
          boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
        }}>
          <Download size={15} />
          Download PDF
        </button>
      </div>
    </div>
  );
}

export default function ConsultationPackage() {
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  const handleBook = (pkg: typeof packages[0]) => {
    const text = `I want to get the quote for my plan. (Interested in: ${pkg.name} Package - ${pkg.price})`;
    window.open(`https://wa.me/918344051846?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleDownloadPackage = () => {
    const a = document.createElement('a');
    a.href = '/Consultation Package.pdf';
    a.download = 'Consultation Package.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <section id="pricing" className="relative py-20 md:py-32 bg-brand-softWhite overflow-hidden border-t border-slate-200">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-[120px]" />
      </div>

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div className="text-center max-w-3xl mx-auto mb-14"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8 }}>
          <span className="inline-block border border-brand-accent/30 text-brand-accent text-sm font-semibold tracking-[0.2em] uppercase mb-4 px-4 py-1.5 rounded-full bg-brand-accent/5 shadow-sm font-inter">
            Packages & Pricing
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-sgrotesk font-bold text-brand-primary mb-4">
            Consultation <span className="text-brand-accent font-extrabold">Packages</span>
          </h2>
          <p className="text-slate-600 text-base md:text-lg font-inter mb-6">
            Transparent pricing. Expert guidance.
          </p>
          <div className="flex justify-center flex-wrap gap-4">
            <button 
              onClick={handleDownloadPackage}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-primary text-brand-accent border border-brand-accent hover:bg-brand-accent hover:text-brand-primary transition-all rounded-lg font-bold text-sm shadow-sm font-inter"
            >
              <Download size={18} />
              Download Full Package PDF
            </button>
          </div>
        </motion.div>

        {/* Package Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16 pt-4">
          {packages.map((pkg, i) => (
              <motion.div key={i}
              className="relative bg-white border border-slate-200 p-6 flex flex-col !overflow-visible rounded-xl shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              style={{ border: pkg.popular ? '2px solid #FACC15' : '1px solid #e2e8f0' }}
            >
              {pkg.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-bold text-brand-primary bg-brand-accent rounded-full tracking-wide uppercase shadow z-10 whitespace-nowrap font-inter">
                  Most Popular
                </span>
              )}
              <div className="mb-4">
                <p className="text-brand-accent text-sm font-semibold tracking-[0.12em] uppercase mb-1 font-inter">{pkg.name}</p>
                <p className="text-4xl font-rajdhani font-bold text-brand-primary mb-1">{pkg.price}</p>
                <p className="text-slate-500 text-sm font-inter">{pkg.sub}</p>
              </div>
              <ul className="flex flex-col gap-3 mb-6 flex-1">
                {pkg.features.map((f, fi) => (
                  <li key={fi} className="flex items-start gap-2 text-sm text-slate-600 font-inter">
                    <Check size={16} className="text-brand-accent mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mb-6 p-3 rounded bg-slate-50 border border-slate-200 text-center">
                <p className="text-sm font-semibold text-brand-primary mb-1">{pkg.highlight}</p>
                <p className="text-xs text-slate-500">{pkg.highlightSub}</p>
              </div>
              <button onClick={() => handleBook(pkg)}
                className={`w-full flex items-center justify-center gap-2 py-3 px-5 rounded-lg font-bold text-sm transition-all font-inter ${pkg.popular
                  ? 'bg-brand-accent text-brand-primary hover:bg-[#F59E0B]'
                  : 'border border-slate-200 text-brand-primary hover:bg-slate-50'}`}>
                <MessageCircle size={16} />
                {pkg.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Fee Schedule + Visual */}
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Left: Fee Table */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7 }}>
            <FeeSchedule />
          </motion.div>

            {/* Right: Visual */}
          <motion.div className="bg-white border border-slate-200 shadow-sm rounded-xl p-8 flex flex-col justify-center relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, delay: 0.1 }}>

            {/* Blueprint grid background */}
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: 'linear-gradient(rgba(148,163,184,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.4) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

            {/* TODO: replace with actual consultation image */}
            <div className="relative z-10 text-center">
              <div className="w-20 h-20 rounded-full bg-brand-card border border-brand-accent/30 flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🏗</span>
              </div>
              <div className="inline-block px-4 py-2 bg-slate-50 border border-slate-200 shadow-sm rounded-full mb-4">
                <span className="text-slate-700 text-sm font-bold tracking-wide font-inter">5+ Years of Expert Guidance</span>
              </div>
              <h3 className="text-2xl font-sgrotesk font-bold text-brand-primary mb-3">
                Er. V. Nirmal, B.E (Civil)
              </h3>
              <p className="text-slate-600 font-inter text-sm leading-relaxed max-w-xs mx-auto">
                From initial planning to final handover — your trusted civil engineering partner in Tamil Nadu.
              </p>
              <div className="grid grid-cols-3 gap-4 mt-8">
                {[['50+', 'Projects'], ['5+', 'Years'], ['100%', 'Approved']].map(([num, label]) => (
                  <div key={label} className="text-center">
                    <p className="text-2xl font-rajdhani font-bold text-brand-accent">{num}</p>
                    <p className="text-xs text-brand-text/70 mt-1 font-inter">{label}</p>
                  </div>
                ))}
              </div>

              {/* Payment Clarity */}
              <div className="mt-8 p-4 rounded-lg border border-slate-200 bg-slate-50 text-center">
                <p className="text-xs font-bold text-brand-primary uppercase tracking-wider mb-2 font-inter">Payment Information</p>
                <p className="text-xs text-slate-600 leading-relaxed font-inter">
                  Professional fees payable via UPI, Bank Transfer, or Cheque.<br />
                  GST @ 18% applicable. Invoice provided for all transactions.
                </p>
                <p className="text-xs text-slate-400 mt-2 italic font-inter">
                  Contact us for bank account details and payment schedule.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-20 border-t border-brand-card pt-12">
          <motion.div
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             className="text-center"
          >
            <button 
              onClick={() => setIsTermsOpen(!isTermsOpen)}
              id="consultation-terms-btn"
              aria-expanded={isTermsOpen}
              aria-controls="consultation-terms-content"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-card border border-brand-accent hover:bg-brand-accent hover:border-transparent transition-all rounded-lg text-brand-text hover:text-brand-primary font-bold text-sm shadow-sm font-inter"
            >
              <ShieldCheck size={18} />
              {isTermsOpen ? "Hide Legal Terms & Conditions" : "View Legal Terms & Conditions"}
              <ChevronDown size={16} className={`transition-transform duration-300 ${isTermsOpen ? "rotate-180" : ""}`} />
            </button>
          </motion.div>

          {/* Terms Content */}
          <AnimatePresence>
            {isTermsOpen && (
              <motion.div
                id="consultation-terms-content"
                role="region"
                aria-labelledby="consultation-terms-btn"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden mt-8"
              >
                <div className="bg-brand-primary border border-brand-card rounded-xl shadow-sm p-6 md:p-8 text-left">
                  <h3 className="text-xl font-sgrotesk font-bold text-brand-text mb-6 border-b border-brand-card pb-4">
                    Civil Engineering Consultancy Services — Terms
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6 text-sm text-brand-text/70 font-inter leading-relaxed h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                    {legalTerms.map((term, i) => (
                      <div key={i} className="mb-2">
                        <h4 className="text-brand-text font-bold mb-1">{term.title}</h4>
                        <p>{term.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
