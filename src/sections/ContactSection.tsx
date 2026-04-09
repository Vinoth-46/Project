'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send, CheckCircle } from 'lucide-react';

interface FormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

const services = [
  'Building Approvals',
  'Complete Construction & Consulting',
  'Building Plans & Bank Estimates',
  'Bank Loan Assistance & Finance',
  'General Inquiry',
];

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const formRef = useRef<HTMLFormElement>(null);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\d\s\-+()]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Encode form data for Netlify
      const body = new URLSearchParams();
      body.append('form-name', 'contact');
      Object.entries(formData).forEach(([key, value]) => {
        body.append(key, value);
      });

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });

      if (!response.ok) throw new Error('Form submission failed');

      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: '',
        message: '',
      });

      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error('Submission error:', error);
      alert('Sorry, there was an error sending your message. Please try calling us directly.');
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section id="contact" className="relative py-20 md:py-32 bg-dark-light">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gold text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-outfit font-bold text-warm-white mb-6">
            Let&apos;s Build <span className="gradient-text">Together</span>
          </h2>
          <p className="text-warm-gray text-base md:text-lg">
            Ready to start your project? Contact us for a free consultation and estimate.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Details Panel */}
          <motion.div
            className="flex flex-col h-full glass-card p-8 md:p-12 relative overflow-hidden"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            {/* Background Accent */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-gold/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

            <h3 className="text-2xl md:text-3xl font-outfit font-bold text-warm-white mb-8 relative z-10">
              Reach Out <span className="text-gold">Directly</span>
            </h3>

            <div className="flex flex-col gap-8 relative z-10">
              {/* Location */}
              <div className="flex items-start gap-5 group cursor-default">
                <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-dark group-hover:shadow-[0_0_20px_rgba(245,166,35,0.4)] transition-all duration-300 flex-shrink-0">
                  <MapPin size={24} />
                </div>
                <div className="pt-1">
                  <p className="text-lg font-medium text-warm-white mb-1">Office Location</p>
                  <p className="text-warm-gray leading-relaxed max-w-[200px]">
                    Kitchaa's Enterprise,<br />
                    Namakkal, Tamil Nadu
                  </p>
                </div>
              </div>

              {/* Phone */}
              <a href="tel:+918344051846" className="flex items-start gap-5 group text-left">
                <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-dark group-hover:shadow-[0_0_20px_rgba(245,166,35,0.4)] transition-all duration-300 flex-shrink-0">
                  <Phone size={24} />
                </div>
                <div className="pt-1">
                  <p className="text-lg font-medium text-warm-white mb-1">Direct Line</p>
                  <p className="text-warm-gray group-hover:text-gold transition-colors">+91 83440 51846</p>
                </div>
              </a>

              {/* Email */}
              <a href="mailto:kitchaasenterprise@gmail.com" className="flex items-start gap-5 group text-left">
                <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-dark group-hover:shadow-[0_0_20px_rgba(245,166,35,0.4)] transition-all duration-300 flex-shrink-0">
                  <Mail size={24} />
                </div>
                <div className="pt-1">
                  <p className="text-lg font-medium text-warm-white mb-1">Email Address</p>
                  <p className="text-warm-gray group-hover:text-gold transition-colors break-all">kitchaasenterprise<br/>@gmail.com</p>
                </div>
              </a>
            </div>

            {/* Bottom info */}
            <div className="mt-auto pt-10 relative z-10">
              <p className="text-sm text-warm-gray/60 italic border-l-2 border-gold/40 pl-4 py-2">
                "Sacred Values. Solid Foundations."
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="glass-card p-6 md:p-8"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {isSubmitted ? (
              <motion.div
                className="h-full flex flex-col items-center justify-center text-center py-12"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mb-4">
                  <CheckCircle size={32} className="text-gold" />
                </div>
                <h3 className="text-2xl font-outfit font-bold text-warm-white mb-2">
                  Thank You!
                </h3>
                <p className="text-warm-gray">
                  We&apos;ve received your message and will get back to you soon.
                </p>
              </motion.div>
            ) : (
              <form 
                ref={formRef} 
                onSubmit={handleSubmit} 
                className="space-y-5"
                data-netlify="true"
                name="contact"
              >
                <input type="hidden" name="form-name" value="contact" />
                <div className="grid md:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-warm-gray mb-2">
                      Name <span className="text-gold">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-dark/50 border rounded-lg text-warm-white placeholder-warm-gray/50 focus:outline-none focus:border-gold transition-colors ${
                        errors.name ? 'border-red-500' : 'border-gold/20'
                      }`}
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-warm-gray mb-2">
                      Phone <span className="text-gold">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-dark/50 border rounded-lg text-warm-white placeholder-warm-gray/50 focus:outline-none focus:border-gold transition-colors ${
                        errors.phone ? 'border-red-500' : 'border-gold/20'
                      }`}
                      placeholder="Your phone number"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-warm-gray mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-dark/50 border rounded-lg text-warm-white placeholder-warm-gray/50 focus:outline-none focus:border-gold transition-colors ${
                      errors.email ? 'border-red-500' : 'border-gold/20'
                    }`}
                    placeholder="Your email address"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                {/* Service */}
                <div>
                  <label className="block text-sm font-medium text-warm-gray mb-2">
                    Service <span className="text-gold">*</span>
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-dark/50 border rounded-lg text-warm-white focus:outline-none focus:border-gold transition-colors appearance-none cursor-pointer ${
                      errors.service ? 'border-red-500' : 'border-gold/20'
                    }`}
                  >
                    <option value="" className="bg-dark">
                      Select a service
                    </option>
                    {services.map((service) => (
                      <option key={service} value={service} className="bg-dark">
                        {service}
                      </option>
                    ))}
                  </select>
                  {errors.service && (
                    <p className="mt-1 text-sm text-red-500">{errors.service}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-warm-gray mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-dark/50 border border-gold/20 rounded-lg text-warm-white placeholder-warm-gray/50 focus:outline-none focus:border-gold transition-colors resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-gold-filled flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-dark/30 border-t-dark rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            )}

          </motion.div>
        </div>
      </div>
    </section>
  );
}
