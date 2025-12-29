/**
 * =============================================================================
 * HERO SECTION - src/components/HeroSection.tsx
 * =============================================================================
 * 
 * The main banner section at the top of the landing page. Creates an impactful
 * first impression with a gradient background, animated decorative elements,
 * and a prominent call-to-action.
 * 
 * Features:
 * - Gradient background with decorative blur circles
 * - Two-column layout (content + image) on desktop, stacked on mobile
 * - Animated entrance effects (fade-up, float)
 * - Product statistics display
 * - CTA buttons (Order Now, Learn More)
 * - Scroll indicator animation at bottom
 * 
 * Design: Uses water-themed colors and ripple animations
 * =============================================================================
 */

import { Button } from "@/components/ui/button";
import { ArrowRight, Droplets } from "lucide-react";
import heroImage from "@/assets/hero-water.jpg";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background gradient overlay */}
      <div className="hero-background absolute inset-0 bg-gradient-hero" />
      
      {/* Decorative Blur Circles - Creates depth and water-like aesthetic */}
      <div className="decorative-blur-circle top-1/4 left-10 w-64 h-64 bg-primary/10" />
      <div className="decorative-blur-circle bottom-1/4 right-10 w-96 h-96 bg-accent/10" style={{ animationDelay: '1s' }} />
      
      <div className="hero-content container mx-auto px-4 relative z-10">
        <div className="hero-grid grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Content */}
          <div className="hero-text-content text-center lg:text-left animate-fade-up">
            {/* Badge pill */}
            <div className="badge-primary mb-6">
              <Droplets className="w-4 h-4" />
              <span>100% Pure & Natural</span>
            </div>
            
            {/* Main heading with gradient text */}
            <h1 className="hero-heading font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6">
              Pure Water,
              <br />
              <span className="text-gradient">Pure Life</span>
            </h1>
            
            {/* Subheading */}
            <p className="hero-subheading text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8">
              Experience the refreshing taste of Vitality Purified Mineral Water. 
              Sourced from pristine springs and purified to perfection for your 
              health and wellbeing.
            </p>
            
            {/* CTA Buttons */}
            <div className="hero-cta-buttons flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="hero" size="lg">
                Order Now
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
            
            {/* Product Statistics */}
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-value">500ml</div>
                <div className="stat-label">Per Sachet</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">30</div>
                <div className="stat-label">Sachets/Bag</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">99.9%</div>
                <div className="stat-label">Purity</div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Hero Image with floating animation */}
          <div className="hero-image-container relative animate-float" style={{ animationDelay: '0.5s' }}>
            <div className="hero-image-wrapper relative z-10">
              <img
                src={heroImage}
                alt="Crystal clear purified water splash"
                className="hero-image w-full h-auto rounded-3xl shadow-elevated"
              />
            </div>
            {/* Glow effect behind image */}
            <div className="hero-image-glow absolute inset-0 bg-primary/20 rounded-3xl blur-2xl transform scale-90" />
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator - Bouncing animation to encourage scrolling */}
      <div className="scroll-indicator-container absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="scroll-indicator">
          <div className="scroll-indicator-dot" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
