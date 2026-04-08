import Navbar from './components/Navbar';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import ServicesSection from './sections/ServicesSection';
import InteractiveBuilding from './sections/InteractiveBuilding';
import PortfolioSection from './sections/PortfolioSection';
import ContactSection from './sections/ContactSection';
import TestimonialsSection from './sections/TestimonialsSection';
import Footer from './sections/Footer';
import FloatingContact from './components/FloatingContact';

function App() {
  return (
    <div className="min-h-screen bg-dark text-warm-white overflow-x-hidden">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* About Section */}
        <AboutSection />

        {/* Services Section */}
        <ServicesSection />

        {/* Interactive Building */}
        <InteractiveBuilding />

        {/* Portfolio Section */}
        <PortfolioSection />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Contact Buttons */}
      <FloatingContact />
    </div>
  );
}

export default App;
