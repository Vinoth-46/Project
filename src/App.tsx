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
  const [loadLevel1, setLoadLevel1] = useState(false); // About, Services
  const [loadLevel2, setLoadLevel2] = useState(false); // InteractiveBuilding, Transparency
  const [loadLevel3, setLoadLevel3] = useState(false); // Consultation, Reviews
  const [loadLevel4, setLoadLevel4] = useState(false); // Map, FAQ, Contact, Footer, ChatBot

  useEffect(() => {
    const t1 = setTimeout(() => setLoadLevel1(true), 600);
    const t2 = setTimeout(() => setLoadLevel2(true), 2000);
    const t3 = setTimeout(() => setLoadLevel3(true), 3500);
    const t4 = setTimeout(() => setLoadLevel4(true), 5000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
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
        {loadLevel1 && (
          <Suspense fallback={<div className="h-64 flex items-center justify-center text-brand-text/50">Loading content...</div>}>
            <AboutSection />
            <ServicesSection />
          </Suspense>
        )}

        {/* 4. Engineering Expertise (Interactive Proof) */}
        {loadLevel2 && (
          <Suspense fallback={<div className="h-64 flex items-center justify-center text-brand-text/50">Loading content...</div>}>
            <InteractiveBuilding />
            <TransparencySection />
          </Suspense>
        )}

        {/* 7. Packages & Pricing */}
        {loadLevel3 && (
          <Suspense fallback={<div className="h-64 flex items-center justify-center text-brand-text/50">Loading content...</div>}>
            <ConsultationPackage />
            <ReviewsSection />
          </Suspense>
        )}

        {/* 9. Service Area Map */}
        {loadLevel4 && (
          <Suspense fallback={<div className="h-64 flex items-center justify-center text-brand-text/50">Loading content...</div>}>
            <ServiceZoneMap />
            <FAQSection />
            <ContactSection />
          </Suspense>
        )}
      </main>

      {loadLevel4 && (
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
