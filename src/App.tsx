import { useState, useEffect, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './sections/HeroSection';

// Lazy loaded below-the-fold components
const AboutSection = lazy(() => import('./sections/AboutSection'));
const ServicesSection = lazy(() => import('./sections/ServicesSection'));
const InteractiveBuilding = lazy(() => import('./sections/InteractiveBuilding'));
const TransparencySection = lazy(() => import('./sections/TransparencySection'));
const ConsultationPackage = lazy(() => import('./sections/ConsultationPackage'));
const ServiceZoneMap = lazy(() => import('./sections/ServiceZoneMap'));
const ReviewsSection = lazy(() => import('./sections/ReviewsSection'));
const FAQSection = lazy(() => import('./sections/FAQSection'));
const ContactSection = lazy(() => import('./sections/ContactSection'));
const Footer = lazy(() => import('./sections/Footer'));
const ChatBot = lazy(() => import('./components/ChatBot'));

function App() {
  const [loadHeavy, setLoadHeavy] = useState(false);

  useEffect(() => {
    // Delay the heavy components to clear the main thread for LCP
    const heavyTimer = setTimeout(() => {
      setLoadHeavy(true);
    }, 1500);

    return () => clearTimeout(heavyTimer);
  }, []);

  return (
    <div className="relative min-h-screen bg-brand-primary text-brand-text">
      {/* Navigation */}
      <Navbar />

      {/* Main Content — Conversion Funnel Order */}
      <main className="relative overflow-x-hidden">
        {/* 1. Hero (Hook + Urgency + Loss Aversion) */}
        <HeroSection />

        {/* 2. Trust (Credentials + Authority) */}
        {loadHeavy && (
          <Suspense fallback={<div className="h-64 flex items-center justify-center text-brand-text/50">Loading content...</div>}>
            <AboutSection />

            {/* 3. Services (Problem → Solution → Outcome) */}
            <ServicesSection />

            {/* 4. Engineering Expertise (Interactive Proof) */}
            <InteractiveBuilding />

            {/* 5. Transparency (Trust Dominance) */}
            <TransparencySection />

            {/* 7. Packages & Pricing */}
            <ConsultationPackage />

            {/* 8. Social Proof (Reviews) */}
            <ReviewsSection />

            {/* 9. Service Area Map */}
            <ServiceZoneMap />

            {/* 10. FAQ (Objection Handling) */}
            <FAQSection />

            {/* 11. Contact (Final CTA) */}
            <ContactSection />
          </Suspense>
        )}
      </main>

      {loadHeavy && (
        <Suspense fallback={<div />}>
          {/* Footer */}
          <Footer />

          {/* Unified Speed Dial — Chat, WhatsApp & Call */}
          <ChatBot />
        </Suspense>
      )}
    </div>
  );
}

export default App;
