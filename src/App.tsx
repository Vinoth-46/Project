import { useState, useEffect } from 'react';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import ServicesSection from './sections/ServicesSection';
import InteractiveBuilding from './sections/InteractiveBuilding';
import TransparencySection from './sections/TransparencySection';
import ConsultationPackage from './sections/ConsultationPackage';
import ServiceZoneMap from './sections/ServiceZoneMap';
import ReviewsSection from './sections/ReviewsSection';
import FAQSection from './sections/FAQSection';
import ContactSection from './sections/ContactSection';
import Footer from './sections/Footer';
import ChatBot from './components/ChatBot';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Preloader isLoading={isLoading} />
      <div className={`relative min-h-screen bg-brand-primary text-brand-text transition-opacity duration-1000 ${isLoading ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'}`}>
        {/* Navigation */}
        <Navbar />

      {/* Main Content — Conversion Funnel Order */}
      <main className="overflow-x-hidden">
        {/* 1. Hero (Hook + Urgency + Loss Aversion) */}
        <HeroSection />

        {/* 2. Trust (Credentials + Authority) */}
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
      </main>

      {/* Footer */}
      <Footer />

      {/* Unified Speed Dial — Chat, WhatsApp & Call */}
      <ChatBot />
    </div>
    </>
  );
}

export default App;
