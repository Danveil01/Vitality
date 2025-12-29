import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProcessSection from "@/components/ProcessSection";
import ProductsSection from "@/components/ProductsSection";
import ServicesSection from "@/components/ServicesSection";
import BenefitsSection from "@/components/BenefitsSection";
import GallerySection from "@/components/GallerySection";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import DeliveryZonesSection from "@/components/DeliveryZonesSection";
import MapSection from "@/components/MapSection";
import FAQSection from "@/components/FAQSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingOrderButtons from "@/components/FloatingOrderButtons";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ProcessSection />
        <ProductsSection />
        <ServicesSection />
        <BenefitsSection />
        <GallerySection />
        <PricingSection />
        <TestimonialsSection />
        <DeliveryZonesSection />
        <MapSection />
        <FAQSection />
        <BlogSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingOrderButtons />
    </div>
  );
};

export default Index;
