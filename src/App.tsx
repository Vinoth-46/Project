import { useState, useEffect } from 'react';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import ServicesSection from './sections/ServicesSection';
import InteractiveBuilding from './sections/InteractiveBuilding';
import ConsultationPackage from './sections/ConsultationPackage';
import ServiceZoneMap from './sections/ServiceZoneMap';
import ReviewsSection from './sections/ReviewsSection';
import ContactSection from './sections/ContactSection';
import Footer from './sections/Footer';
import ChatBot from './components/ChatBot';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // The preloader animation is simulated here. 
    // In a real scenario it could wait for full 3d model loading.
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Preloader isLoading={isLoading} />
      <div className={`relative min-h-screen bg-dark text-warm-white transition-opacity duration-1000 ${isLoading ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'}`}>
        {/* Navigation */}
        <Navbar />

      {/* Main Content */}
      <main className="overflow-x-hidden">
        {/* Hero Section */}
        <HeroSection />

        {/* About Section */}
        <AboutSection />

        {/* Services Section */}
        <ServicesSection />

        {/* Interactive Building */}
        <InteractiveBuilding />

        {/* Consultation Packages */}
        <ConsultationPackage />

        {/* Service Zone Map */}
        <ServiceZoneMap />

        {/* Reviews / Testimonials */}
        <ReviewsSection />

        {/* Contact Section */}
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
