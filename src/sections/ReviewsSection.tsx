'use client';

import { motion } from 'framer-motion';
import { Star, MapPin, Calendar } from 'lucide-react';

interface Review {
  name: string;
  location: string;
  rating: number;
  text: string;
  date: string;
}

const seedReviews: Review[] = [
  {
    name: 'Ramesh Kumar',
    location: 'Namakkal',
    rating: 5,
    text: "Kitchaa's Enterprise handled our house construction from plan to completion. Er. Nirmal's expertise and attention to detail is unmatched. Highly recommended.",
    date: 'March 2024',
  },
  {
    name: 'Priya Sundaram',
    location: 'Salem',
    rating: 5,
    text: 'Got our building approval done in record time. The bank estimate report they provided was accepted without any revision. Excellent professional service.',
    date: 'January 2024',
  },
  {
    name: 'Velmurugan S.',
    location: 'Erode',
    rating: 5,
    text: 'Very transparent about costs and timeline. The construction quality is solid — no shortcuts taken. Will definitely hire again for our next project.',
    date: 'November 2023',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" role="img" aria-label={`Rating: ${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = rating >= star;
        return (
          <div key={star}>
            <Star
              size={16}
              fill={isFilled ? '#FACC15' : 'none'}
              color={isFilled ? '#FACC15' : '#334155'}
              style={{ transition: 'all 0.15s' }}
            />
          </div>
        );
      })}
    </div>
  );
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  return (
    <motion.div
      className="bg-slate-900/40 backdrop-blur-md p-6 border border-white/5 rounded-xl shadow-lg flex flex-col gap-4"
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-brand-text font-bold text-base">{review.name}</p>
          <div className="flex items-center gap-1.5 mt-0.5 text-brand-text/60 text-xs font-inter">
            <MapPin size={11} /> {review.location}
          </div>
        </div>
      </div>
      <StarRating rating={review.rating} />
      <p className="text-brand-text/70 text-sm leading-relaxed flex-1 font-inter">"{review.text}"</p>
      <div className="flex items-center gap-1.5 text-xs text-brand-text/50 border-t border-white/5 pt-3 font-inter">
        <Calendar size={11} /> {review.date}
      </div>
    </motion.div>
  );
}

export default function ReviewsSection() {
  return (
    <section id="reviews" className="relative py-20 md:py-32 bg-brand-secondary border-t border-brand-card overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[120px]" />
      </div>

      <div className="section-container relative z-10">
        <motion.div className="text-center max-w-3xl mx-auto mb-14"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8 }}>
          <span className="inline-block border border-brand-accent/30 text-brand-accent text-sm font-semibold tracking-[0.2em] uppercase mb-4 px-4 py-1.5 rounded-full bg-brand-accent/5 shadow-sm font-jakarta">
            Client Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-outfit font-bold text-brand-text mb-4">
            What Our Clients <span className="text-brand-accent font-extrabold">Say</span>
          </h2>
          <p className="text-brand-text/80 text-base md:text-lg font-inter">
            Real experiences from our valued clients across Tamil Nadu.
          </p>
        </motion.div>

        {/* Review Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {seedReviews.map((review, i) => (
            <ReviewCard key={`${review.name}-${i}`} review={review} index={i % 3} />
          ))}
        </div>
      </div>
    </section>
  );
}

