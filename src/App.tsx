import { useState, useEffect, Suspense, lazy } from 'react';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import ServicesSection from './sections/ServicesSection';

// Lazy loaded below-the-fold components
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
  const [isLoading, setIsLoading] = useState(true);
  const [loadHeavy, setLoadHeavy] = useState(false);

  useEffect(() => {
    // Reveal site as soon as window is loaded OR after a max 600ms safety timer
    const handleLoad = () => setIsLoading(false);
    
    if (document.readyState === 'complete') {
      setIsLoading(false);
    } else {
      window.addEventListener('load', handleLoad);
      // Fallback timer just in case load event never fires
      setTimeout(() => setIsLoading(false), 600);
    }

    // Delay the heavy components to clear the main thread for LCP
    const heavyTimer = setTimeout(() => {
      setLoadHeavy(true);
    }, 1500);

    return () => clearTimeout(heavyTimer);
  }, []);

  return (
    <>
      <Preloader isLoading={isLoading} />
      <div className={`relative min-h-screen bg-brand-primary text-brand-text transition-opacity duration-1000 ${isLoading ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'}`}>
        {/* Navigation */}
        <Navbar />

      {/* Main Content — Conversion Funnel Order */}
      <main className="relative overflow-x-hidden">
        {/* 1. Hero (Hook + Urgency + Loss Aversion) */}
        <HeroSection />

        {/* 2. Trust (Credentials + Authority) */}
        <AboutSection />

        {/* 3. Services (Problem → Solution → Outcome) */}
        <ServicesSection />

        {/* 4. Engineering Expertise (Interactive Proof) */}
        {loadHeavy && (
          <Suspense fallback={<div className="h-64 flex items-center justify-center text-brand-text/50">Loading content...</div>}>
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
    </>
  );
}

export default App;
