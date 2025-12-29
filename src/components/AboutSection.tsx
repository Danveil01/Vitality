/**
 * =============================================================================
 * ABOUT SECTION - src/components/AboutSection.tsx
 * =============================================================================
 * 
 * Introduces visitors to the Vitality brand and explains why they should
 * choose this water brand. Displays key differentiators in a card grid.
 * 
 * Features:
 * - Section header with gradient text
 * - 4-column responsive grid of feature cards
 * - Hover animations on cards (lift + icon color change)
 * - Staggered entrance animations
 * 
 * Each feature card includes:
 * - Icon in a rounded container
 * - Feature title
 * - Description text
 * =============================================================================
 */

import { Shield, Leaf, Award, Droplet } from "lucide-react";

const AboutSection = () => {
  // Feature cards data - each represents a key value proposition
  const features = [
    {
      icon: Shield,
      title: "Quality Assured",
      description: "Every drop is tested and certified to meet the highest quality standards.",
    },
    {
      icon: Leaf,
      title: "Natural Source",
      description: "Sourced from protected natural springs, free from contaminants.",
    },
    {
      icon: Droplet,
      title: "Essential Minerals",
      description: "Enriched with vital minerals your body needs for optimal health.",
    },
  ];

  return (
    <section id="about" className="py-24 bg-gradient-water">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-up">
          <span className="text-primary font-semibold uppercase tracking-wider text-sm">
            About Vitality
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
            Why Choose <span className="text-gradient">Vitality Water?</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            At Vitality, we believe that pure water is the foundation of a healthy life. 
            Our commitment to quality ensures every sip refreshes and revitalizes.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group bg-gradient-card rounded-2xl p-8 shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-2 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon container - changes color on hover */}
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <feature.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
              </div>
              
              {/* Feature title */}
              <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                {feature.title}
              </h3>
              
              {/* Feature description */}
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
