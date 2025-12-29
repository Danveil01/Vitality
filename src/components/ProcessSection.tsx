/**
 * =============================================================================
 * PROCESS SECTION - src/components/ProcessSection.tsx
 * =============================================================================
 * 
 * Explains the water purification process step-by-step with alternating
 * image/text layout. Each step shows an image of the process equipment
 * along with a description.
 * 
 * Process Steps:
 * 1. Water Sourcing - Borehole extraction
 * 2. Multi-Stage Filtration - Sediment, carbon, RO filters
 * 3. UV Sterilization - Bacteria elimination
 * 4. Sachet Packaging - Automated filling/sealing
 * 5. Quality Control - FDA testing
 * 
 * Layout: Alternating left/right image placement for visual interest
 * =============================================================================
 */

import waterTreatment from "@/assets/water-treatment-machine.jpg";
import sachetMachine from "@/assets/sachet-machine.jpg";
import waterFiltration from "@/assets/water-filtration.jpg";
import { Droplet, Filter, Zap, Package, CheckCircle } from "lucide-react";

const ProcessSection = () => {
  // Process steps data - includes step number, title, description, icon, and image
  const processSteps = [
    {
      step: 1,
      title: "Water Sourcing",
      description: "We source water from deep underground boreholes to ensure natural mineral content and purity.",
      icon: Droplet,
      image: waterTreatment,
    },
    {
      step: 2,
      title: "Multi-Stage Filtration",
      description: "Water passes through sediment filters, carbon filters, and reverse osmosis membranes to remove impurities.",
      icon: Filter,
      image: waterFiltration,
    },
    {
      step: 3,
      title: "UV Sterilization",
      description: "Ultraviolet light treatment eliminates all bacteria and microorganisms for absolute safety.",
      icon: Zap,
      image: waterFiltration,
    },
    {
      step: 4,
      title: "Sachet Packaging",
      description: "Automated filling and sealing machines package the purified water in hygienic 500ml sachets.",
      icon: Package,
      image: sachetMachine,
    },
    {
      step: 5,
      title: "Quality Control",
      description: "Every batch undergoes rigorous testing to ensure it meets Ghana Food and Drugs Authority standards.",
      icon: CheckCircle,
      image: sachetMachine,
    },
  ];

  return (
    <section id="process" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-up">
          <span className="text-primary font-semibold uppercase tracking-wider text-sm">
            Our Process
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
            How We <span className="text-gradient">Purify Water</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our state-of-the-art facility in Techiman uses advanced technology to ensure every drop meets the highest standards.
          </p>
        </div>

        {/* Process Steps - Alternating layout */}
        <div className="space-y-12 max-w-6xl mx-auto">
          {processSteps.map((item, index) => (
            <div
              key={item.step}
              // Alternate between row and row-reverse for zigzag layout
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center animate-fade-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image Column */}
              <div className="lg:w-1/2">
                <div className="relative rounded-2xl overflow-hidden shadow-card">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 md:h-80 object-cover"
                  />
                  {/* Step number badge overlay */}
                  <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-gradient-cta flex items-center justify-center text-primary-foreground font-bold text-lg shadow-lg">
                    {item.step}
                  </div>
                </div>
              </div>
              
              {/* Content Column */}
              <div className="lg:w-1/2 space-y-4">
                {/* Step icon */}
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                
                {/* Step title */}
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                  {item.title}
                </h3>
                
                {/* Step description */}
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
