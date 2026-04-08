'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Ramesh Kumar',
    role: 'Homeowner',
    content:
      'Kitchaa\'s Enterprise made our dream home a reality. Their attention to detail, transparent pricing, and timely execution were exceptional. Er. Nirmal\'s guidance throughout the building approval and construction phases saved us a lot of time and money.',
    rating: 5,
  },
  {
    name: 'Suresh & Family',
    role: 'Client',
    content:
      'We approached them for complete construction & consulting. The structural integrity and architectural beauty they delivered exceeded our expectations. The bank loan assistance provided a huge relief for our finances.',
    rating: 5,
  },
  {
    name: 'Muthuvel Properties',
    role: 'Developer',
    content:
      'Highly professional team! We have collaborated with Kitchaa\'s Enterprise for multiple building plans and CMDA approvals. Their deep knowledge of local regulations and solid foundational values make them the best in Namakkal.',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section id="reviews" className="relative py-20 md:py-32 bg-dark">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-gold/5 via-dark to-dark opacity-50" />

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gold text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
            Client Reviews
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-outfit font-bold text-warm-white mb-6">
            Words From Our
            <span className="gradient-text"> Clients</span>
          </h2>
          <p className="text-warm-gray text-base md:text-lg">
            Don&apos;t just take our word for it. Here is what our clients have to say about our unshakeable foundations and sacred values.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="glass-card p-6 md:p-8 relative group hover:-translate-y-2 transition-transform duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div className="absolute top-6 right-6 text-gold/20 group-hover:text-gold/40 transition-colors">
                <Quote size={40} />
              </div>
              
              <div className="flex gap-1 text-gold mb-6 relative z-10">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>

              <p className="text-warm-gray text-sm md:text-base leading-relaxed mb-8 relative z-10">
                &quot;{testimonial.content}&quot;
              </p>

              <div className="flex items-center gap-4 relative z-10 border-t border-gold/10 pt-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold font-bold text-xl uppercase">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-warm-white font-semibold font-outfit">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs text-warm-gray/70">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
