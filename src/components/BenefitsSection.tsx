import { Heart, Brain, Zap, Sparkles, Activity, ThermometerSun } from "lucide-react";

const BenefitsSection = () => {
  // --- Styling Constants ---
  const styles = {
    section: "py-24 bg-gradient-water relative overflow-hidden",
    bgDecoration: "absolute top-0 right-0 w-1/2 h-full bg-primary/5 rounded-l-full",
    container: "container mx-auto px-4 relative z-10",
    mainGrid: "grid lg:grid-cols-2 gap-16 items-center",
    
    // Left Content Column
    contentWrapper: "animate-fade-up",
    badge: "text-primary font-semibold uppercase tracking-wider text-sm",
    title: "font-serif text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6",
    description: "text-muted-foreground text-lg mb-8",
    
    // Benefits Grid (Small items)
    benefitsGrid: "grid grid-cols-1 sm:grid-cols-2 gap-6",
    benefitItem: "flex items-start gap-4 animate-slide-in",
    iconWrapper: "w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0",
    icon: "w-6 h-6 text-primary",
    benefitTitle: "font-semibold text-foreground mb-1",
    benefitText: "text-muted-foreground text-sm",
    
    // Statistics Grid (Right cards)
    statsGrid: "grid grid-cols-2 gap-6",
    statCard: `bg-gradient-card rounded-2xl p-8 shadow-card text-center 
               animate-fade-up hover:shadow-elevated transition-all duration-300`,
    statValue: "font-serif text-4xl md:text-5xl font-bold text-primary mb-2",
    statLabel: "text-muted-foreground text-sm font-medium",
  };

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

  const stats = [
    { value: "2L+", label: "Daily Recommended Intake" },
    { value: "99.9%", label: "Purity Guaranteed" },
    { value: "15L", label: "Per 30-Pack Bag" },
    { value: "24/7", label: "Freshness Sealed" },
  ];

  return (
    <section id="benefits" className={styles.section}>
      {/* Decorative Background Shape */}
      <div className={styles.bgDecoration} aria-hidden="true" />
      
      <div className={styles.container}>
        <div className={styles.mainGrid}>
          
          {/* Left Column - Benefits Content */}
          <div className={styles.contentWrapper}>
            <span className={styles.badge}>Health Benefits</span>
            <h2 className={styles.title}>
              Hydration for a <span className="text-gradient">Better Life</span>
            </h2>
            <p className={styles.description}>
              Water is essential for every cell, tissue, and organ in your body. 
              Vitality Purified Mineral Water delivers the hydration you need with 
              essential minerals for optimal health.
            </p>
            
            {/* Small Benefits Icons Grid */}
            <div className={styles.benefitsGrid}>
              {benefits.slice(0, 4).map((benefit, index) => (
                <div
                  key={benefit.title}
                  className={styles.benefitItem}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={styles.iconWrapper}>
                    <benefit.icon className={styles.icon} />
                  </div>
                  <div>
                    <h4 className={styles.benefitTitle}>{benefit.title}</h4>
                    <p className={styles.benefitText}>{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Column - Statistics Cards Grid */}
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={styles.statCard}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;