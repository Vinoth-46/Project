'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, AlertTriangle, ShieldCheck } from 'lucide-react';

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

export default function LegalTerms() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="relative py-16 bg-dark border-t border-gold/10">
      <div className="section-container max-w-4xl mx-auto">
        
        {/* Important Warning Banner */}
        <motion.div 
          className="bg-red-900/20 border border-red-500/30 rounded-xl p-6 mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3 mb-3 text-red-400">
            <AlertTriangle size={24} />
            <span className="font-bold tracking-wide uppercase text-sm md:text-base">Important Notice</span>
          </div>
          <p className="text-red-200/90 font-medium text-sm md:text-base">
            THIS IS NOT A PER SQ.FT RATE BUILDING CONTRACT. THIS IS A PROFESSIONAL ENGINEERING CONSULTATION SYSTEM & SHOULD NOT BE COMPARED WITH NORMAL MARKET CONTRACT METHODS.
          </p>
          <div className="mt-4 pt-4 border-t border-red-500/20">
             <p className="text-red-300 text-xs md:text-sm">
               All drawings are prepared under professional engineering standards. Misuse of drawings or construction without qualified supervision will be solely the responsibility of the client or contractor.
             </p>
          </div>
        </motion.div>

        {/* Terms Accordion Toggle */}
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           className="text-center"
        >
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-dark-light border border-gold/30 hover:border-gold/60 hover:bg-gold/5 transition-all rounded-lg text-gold font-medium text-sm"
          >
            <ShieldCheck size={18} />
            {isOpen ? "Hide Legal Terms & Conditions" : "View Legal Terms & Conditions"}
            <ChevronDown size={16} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
          </button>
        </motion.div>

        {/* Terms Content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden mt-8"
            >
              <div className="glass-card p-6 md:p-8">
                <h3 className="text-xl font-outfit font-bold text-warm-white mb-6 border-b border-white/10 pb-4">
                  Civil Engineering Consultancy Services — Terms
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6 text-sm text-warm-gray leading-relaxed h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                  {legalTerms.map((term, i) => (
                    <div key={i} className="mb-2">
                      <h4 className="text-gold font-semibold mb-1">{term.title}</h4>
                      <p>{term.content}</p>
                    </div>
                  ))}
                </div>
                
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
