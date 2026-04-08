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
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={interactive ? 22 : 16}
          fill={(interactive ? (hovered || rating) : rating) >= star ? '#f5a623' : 'none'}
          color={(interactive ? (hovered || rating) : rating) >= star ? '#f5a623' : '#333'}
          style={{ cursor: interactive ? 'pointer' : 'default', transition: 'all 0.15s' }}
          onMouseEnter={() => interactive && setHovered(star)}
          onMouseLeave={() => interactive && setHovered(0)}
          onClick={() => interactive && onRate?.(star)}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  return (
    <motion.div
      className="glass-card p-6 flex flex-col gap-4"
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-warm-white font-semibold text-base">{review.name}</p>
          <div className="flex items-center gap-1.5 mt-0.5 text-warm-gray text-xs">
            <MapPin size={11} /> {review.location}
          </div>
        </div>
        {review.isUserSubmitted && (
          <span className="text-xs px-2 py-0.5 rounded-full border border-gold/30 text-gold bg-gold/10">Your Review</span>
        )}
      </div>
      <StarRating rating={review.rating} />
      <p className="text-warm-gray text-sm leading-relaxed flex-1">"{review.text}"</p>
      <div className="flex items-center gap-1.5 text-xs text-warm-gray/50 border-t border-white/5 pt-3">
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
    setTimeout(() => setSubmitted(false), 5000);
  };

  const inputStyle = {
    width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 8, padding: '0.6rem 0.9rem', fontSize: 14, color: '#f0ede8',
    outline: 'none', fontFamily: 'inherit',
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-warm-gray mb-1.5">Your Name <span className="text-gold">*</span></label>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="E.g. Suresh M."
            style={{ ...inputStyle, borderColor: errors.name ? '#ef4444' : undefined }} />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-sm text-warm-gray mb-1.5">Location / City</label>
          <input value={location} onChange={e => setLocation(e.target.value)} placeholder="E.g. Namakkal" style={inputStyle} />
        </div>
      </div>

      <div>
        <label className="block text-sm text-warm-gray mb-2">Rating <span className="text-gold">*</span></label>
        <StarRating rating={rating} onRate={setRating} interactive />
        {errors.rating && <p className="text-red-500 text-xs mt-1">{errors.rating}</p>}
      </div>

      <div>
        <label className="block text-sm text-warm-gray mb-1.5">
          Your Review <span className="text-gold">*</span>
          <span className="ml-2 text-warm-gray/50 text-xs">({text.length}/300)</span>
        </label>
        <textarea value={text} onChange={e => setText(e.target.value.slice(0, 300))}
          rows={4} placeholder="Share your experience with Kitchaa's Enterprise..."
          style={{ ...inputStyle, resize: 'none', borderColor: errors.text ? '#ef4444' : undefined }} />
        {errors.text && <p className="text-red-500 text-xs mt-1">{errors.text}</p>}
      </div>

      <div className="flex items-center justify-between gap-4 pt-1">
        <p className="text-xs text-warm-gray/40 italic">Reviews are visible to all visitors on this device.</p>
        <button type="submit" className="btn-gold-filled text-sm px-6 py-2.5 flex-shrink-0">
          Submit Review
        </button>
      </div>

      <AnimatePresence>
        {submitted && (
          <motion.p className="text-sm text-green-400 font-medium"
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
  const [userReviews, setUserReviews] = useState<Review[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setUserReviews(JSON.parse(stored) as Review[]);
    } catch { /* ignore */ }
  }, []);

  const handleNewReview = (review: Review) => {
    const updated = [...userReviews, review];
    setUserReviews(updated);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch { /* ignore */ }
  };

  const allReviews = [...seedReviews, ...userReviews];

  return (
    <section id="reviews" className="relative py-20 md:py-32 bg-dark-light overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-gold/3 rounded-full blur-[120px]" />
      </div>

      <div className="section-container relative z-10">
        <motion.div className="text-center max-w-3xl mx-auto mb-14"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8 }}>
          <span className="text-gold text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
            Client Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-outfit font-bold text-warm-white mb-4">
            What Our Clients <span className="gradient-text">Say</span>
          </h2>
          <p className="text-warm-gray text-base md:text-lg">
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
            className="w-full glass-card p-4 flex items-center justify-between text-warm-white font-medium text-sm hover:border-gold/30 transition-colors">
            <span>{showForm ? 'Close Form' : 'Share Your Experience'}</span>
            {showForm ? <ChevronUp size={18} className="text-gold" /> : <ChevronDown size={18} className="text-gold" />}
          </button>

          <AnimatePresence>
            {showForm && (
              <motion.div className="glass-card p-6 mt-2"
                initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
                <h3 className="text-warm-white font-semibold mb-4">Write a Review</h3>
                <ReviewForm onSubmit={handleNewReview} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
