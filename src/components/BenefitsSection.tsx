/**
 * =============================================================================
 * BENEFITS SECTION - src/components/BenefitsSection.tsx
 * =============================================================================
 * 
 * Highlights the health benefits of staying hydrated with pure water.
 * Uses a two-column layout with benefit cards on the left and
 * statistics cards on the right.
 * 
 * Benefits displayed:
 * - Healthy Heart, Mental Clarity, Energy Boost
 * - Glowing Skin, Better Performance, Temperature Control
 * 
 * Statistics:
 * - Daily recommended intake (2L+)
 * - Purity guarantee (99.9%)
 * - Total volume per bag (15L)
 * - Freshness seal (24/7)
 * 
 * Design: Decorative curved background shape
 * =============================================================================
 */

import { Heart, Brain, Zap, Sparkles, Activity, ThermometerSun } from "lucide-react";

const BenefitsSection = () => {
  // Health benefits data configuration
  const benefits = [
    {
      icon: Heart,
      title: "Healthy Heart",
      description: "Proper hydration supports cardiovascular health and blood circulation.",
    },
    {
      icon: Brain,
      title: "Mental Clarity",
      description: "Stay sharp and focused with adequate hydration for brain function.",
    },
    {
      icon: Zap,
      title: "Energy Boost",
      description: "Combat fatigue and maintain energy levels throughout the day.",
    },
    {
      icon: Sparkles,
      title: "Glowing Skin",
      description: "Hydrated skin is healthy skin. Maintain your natural radiance.",
    },
    {
      icon: Activity,
      title: "Better Performance",
      description: "Optimize physical performance with proper hydration.",
    },
    {
      icon: ThermometerSun,
      title: "Temperature Control",
      description: "Help regulate body temperature in all weather conditions.",
    },
  ];

  return (
    <section id="benefits" className="py-24 bg-gradient-water relative overflow-hidden">
      {/* Decorative Background Shape - Right side curve */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 rounded-l-full" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Benefits Content */}
          <div className="animate-fade-up">
            {/* Section header */}
            <span className="text-primary font-semibold uppercase tracking-wider text-sm">
              Health Benefits
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
              Hydration for a <span className="text-gradient">Better Life</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Water is essential for every cell, tissue, and organ in your body. 
              Vitality Purified Mineral Water delivers the hydration you need with 
              essential minerals for optimal health.
            </p>
            
            {/* Benefits grid - Shows first 4 benefits */}
            <div className="grid grid-cols-2 gap-6">
              {benefits.slice(0, 4).map((benefit, index) => (
                <div
                  key={benefit.title}
                  className="flex items-start gap-4 animate-slide-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Benefit icon */}
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{benefit.title}</h4>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Column - Statistics Cards Grid */}
          <div className="grid grid-cols-2 gap-6">
            {[
              { value: "2L+", label: "Daily Recommended Intake" },
              { value: "99.9%", label: "Purity Guaranteed" },
              { value: "15L", label: "Per 30-Pack Bag" },
              { value: "24/7", label: "Freshness Sealed" },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="bg-gradient-card rounded-2xl p-8 shadow-card text-center animate-fade-up hover:shadow-elevated transition-all duration-300"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Large statistic value */}
                <div className="font-serif text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                {/* Statistic label */}
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
