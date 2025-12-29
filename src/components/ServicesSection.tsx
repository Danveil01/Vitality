/**
 * =============================================================================
 * SERVICES SECTION - src/components/ServicesSection.tsx
 * =============================================================================
 * 
 * Showcases the various services offered by Vitality Water beyond just
 * selling water products. Each service is displayed in a card format
 * with an icon, title, and description.
 * 
 * Services displayed:
 * 1. Home Delivery - Direct-to-door service
 * 2. Business Supply - B2B bulk supply
 * 3. Event Services - Catering for events
 * 4. Regular Subscriptions - Recurring delivery
 * 5. Quality Guarantee - FDA certification
 * 6. Wholesale Partnership - Distributor opportunities
 * 
 * Design: 3-column grid on desktop, responsive on mobile
 * =============================================================================
 */

import { Truck, Building2, Users, Clock, Shield, HeartHandshake } from "lucide-react";

const ServicesSection = () => {
  // Services data configuration
  const services = [
    {
      icon: Truck,
      title: "Home Delivery",
      description: "Get fresh Vitality water delivered right to your doorstep in Techiman and surrounding areas.",
    },
    {
      icon: Building2,
      title: "Business Supply",
      description: "Reliable bulk supply for offices, restaurants, hotels, and shops with flexible payment options.",
    },
    {
      icon: Users,
      title: "Event Services",
      description: "Special packages for weddings, funerals, parties, and corporate events with branded options.",
    },
    {
      icon: Clock,
      title: "Regular Subscriptions",
      description: "Set up weekly or monthly deliveries and never run out of pure drinking water again.",
    },
    {
      icon: Shield,
      title: "Quality Guarantee",
      description: "Every sachet meets FDA Ghana standards. We stand behind our product 100%.",
    },
    {
      icon: HeartHandshake,
      title: "Wholesale Partnership",
      description: "Become a distributor and join our growing network across the Bono East Region.",
    },
  ];

  return (
    <section id="services" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-up">
          <span className="text-primary font-semibold uppercase tracking-wider text-sm">
            What We Offer
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Beyond producing premium sachet water, we offer comprehensive services to meet all your hydration needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="bg-background rounded-2xl p-8 shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fade-up group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon container with gradient background */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-cta flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              
              {/* Service title */}
              <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                {service.title}
              </h3>
              
              {/* Service description */}
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
