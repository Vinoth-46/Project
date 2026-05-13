'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MapPin, Calendar, ChevronDown, ChevronUp } from 'lucide-react';

interface Review {
  name: string;
  location: string;
  rating: number;
  text: string;
  date: string;
  isUserSubmitted?: boolean;
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

function StarRating({ rating, onRate, interactive = false }: { rating: number; onRate?: (r: number) => void; interactive?: boolean }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1" role={interactive ? "radiogroup" : "img"} aria-label={`Rating: ${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = (interactive ? (hovered || rating) : rating) >= star;
        const starIcon = (
          <Star
            size={interactive ? 22 : 16}
            fill={isFilled ? '#FACC15' : 'none'}
            color={isFilled ? '#FACC15' : '#334155'}
            style={{ cursor: interactive ? 'pointer' : 'default', transition: 'all 0.15s' }}
          />
        );

        if (interactive) {
          return (
            <div
              key={star}
              role="radio"
              aria-checked={rating >= star}
              aria-label={`${star} Star`}
              tabIndex={0}
              onClick={() => onRate?.(star)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onRate?.(star); } }}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-sm cursor-pointer inline-flex"
            >
              {starIcon}
            </div>
          );
        }
        return <div key={star}>{starIcon}</div>;
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
        {review.isUserSubmitted && (
          <span className="text-xs px-2 py-0.5 rounded-full border border-brand-accent/30 text-brand-primary bg-brand-accent shadow-sm font-inter">Your Review</span>
        )}
      </div>
      <StarRating rating={review.rating} />
      <p className="text-brand-text/70 text-sm leading-relaxed flex-1 font-inter">"{review.text}"</p>
      <div className="flex items-center gap-1.5 text-xs text-brand-text/50 border-t border-white/5 pt-3 font-inter">
        <Calendar size={11} /> {review.date}
      </div>
    </motion.div>
  );
}

function ReviewForm({ onSubmit }: { onSubmit: (r: Review) => void }) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (submitted) {
      timer = setTimeout(() => setSubmitted(false), 5000);
    }
    return () => clearTimeout(timer);
  }, [submitted]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim() || name.trim().length < 2) e.name = 'Name must be at least 2 characters.';
    if (!rating) e.rating = 'Please select a star rating.';
    if (!text.trim() || text.trim().length < 20) e.text = 'Review must be at least 20 characters.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const review: Review = {
      name: name.trim(),
      location: location.trim() || 'Tamil Nadu',
      rating,
      text: text.trim(),
      date: new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }),
      isUserSubmitted: true,
    };
    onSubmit(review);
    setSubmitted(true);
    setName(''); setLocation(''); setRating(0); setText(''); setErrors({});
  };

  const inputStyle = {
    width: '100%', background: 'rgba(2, 6, 23, 0.5)', border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: 8, padding: '0.6rem 0.9rem', fontSize: 14, color: '#F8FAFC',
    outline: 'none', fontFamily: 'inherit', boxShadow: '0 1px 2px rgba(0,0,0,0.2)'
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-brand-text/60 mb-1.5 font-medium font-inter">Your Name <span className="text-brand-accent">*</span></label>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="E.g. Suresh M."
            style={{ ...inputStyle, borderColor: errors.name ? '#ef4444' : undefined }} />
          {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-sm text-brand-text/60 mb-1.5 font-medium font-inter">Location / City</label>
          <input value={location} onChange={e => setLocation(e.target.value)} placeholder="E.g. Namakkal" style={inputStyle} />
        </div>
      </div>

      <div>
        <label className="block text-sm text-brand-text/60 mb-2 font-medium font-inter">Rating <span className="text-brand-accent">*</span></label>
        <StarRating rating={rating} onRate={setRating} interactive />
        {errors.rating && <p className="text-red-400 text-xs mt-1">{errors.rating}</p>}
      </div>

      <div>
        <label className="block text-sm text-brand-text/60 mb-1.5 font-medium font-inter">
          Your Review <span className="text-brand-accent">*</span>
          <span className="ml-2 text-brand-text/50 text-xs">({text.length}/300)</span>
        </label>
        <textarea value={text} onChange={e => setText(e.target.value.slice(0, 300))}
          rows={4} placeholder="Share your experience with Kitchaa's Enterprise..."
          style={{ ...inputStyle, resize: 'none', borderColor: errors.text ? '#ef4444' : undefined }} />
        {errors.text && <p className="text-red-400 text-xs mt-1">{errors.text}</p>}
      </div>

      <div className="flex items-center justify-between gap-4 pt-1">
        <p className="text-xs text-brand-text/60 italic font-inter">Reviews are visible to all visitors on this device.</p>
        <button type="submit" className="bg-brand-accent text-brand-primary hover:bg-[#F59E0B] rounded-lg text-sm px-6 py-2.5 flex-shrink-0 transition-colors shadow-sm font-bold font-jakarta uppercase tracking-wider">
          Submit Review
        </button>
      </div>

      <AnimatePresence>
        {submitted && (
          <motion.p className="text-sm text-green-600 font-medium"
            initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            ✓ Thank you. Your review has been submitted.
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}

const STORAGE_KEY = 'kitchaas_reviews';

export default function ReviewsSection() {
  const [userReviews, setUserReviews] = useState<Review[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? (JSON.parse(stored) as Review[]) : [];
    } catch {
      return [];
    }
  });
  const [showForm, setShowForm] = useState(false);

  const handleNewReview = (review: Review) => {
    const updated = [...userReviews, review];
    setUserReviews(updated);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch { /* ignore */ }
  };

  const allReviews = [...seedReviews, ...userReviews];

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
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {allReviews.map((review, i) => (
            <ReviewCard key={`${review.name}-${i}`} review={review} index={i % 3} />
          ))}
        </div>

        {/* Submit Review Toggle */}
        <motion.div className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
          <button onClick={() => setShowForm(v => !v)}
            className="w-full bg-slate-900/40 backdrop-blur-md border border-white/5 shadow-lg rounded-xl p-4 flex items-center justify-between text-brand-text font-bold text-sm hover:border-brand-accent/30 transition-colors font-jakarta uppercase tracking-wide">
            <span>{showForm ? 'Close Form' : 'Share Your Experience'}</span>
            {showForm ? <ChevronUp size={18} className="text-brand-accent" /> : <ChevronDown size={18} className="text-brand-accent" />}
          </button>

          <AnimatePresence>
            {showForm && (
              <motion.div className="bg-brand-secondary border border-brand-card shadow-sm rounded-xl p-6 mt-2"
                initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
                <h3 className="text-brand-text font-bold mb-4 font-inter">Write a Review</h3>
                <ReviewForm onSubmit={handleNewReview} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
