import { Shield, Leaf, Droplet } from "lucide-react";

const AboutSection = () => {
  // --- Styling Constants ---
  const styles = {
    section: "py-24 bg-gradient-water",
    container: "container mx-auto px-4",
    header: "text-center mb-16 animate-fade-up",
    badge: "text-primary font-semibold uppercase tracking-wider text-sm",
    title: "font-serif text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6",
    description: "text-muted-foreground text-lg max-w-2xl mx-auto",
    
    // Grid Layout: Forced to 1 column, max width set for better look on wide screens
    cardGrid: "grid grid-cols-1 gap-8 max-w-2xl mx-auto", 
    
    // Card Styles
    card: `group flex flex-col md:flex-row items-center md:items-start gap-6 
           bg-gradient-card rounded-2xl p-8 shadow-card 
           hover:shadow-elevated transition-all duration-500 
           hover:-translate-y-1 animate-fade-up`,
    
    // Icon Styles
    iconWrapper: `flex-shrink-0 w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center 
                  group-hover:bg-primary group-hover:rotate-6 transition-all duration-300`,
    iconInner: "w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors duration-300",
    
    // Text Content Styles
    contentWrapper: "text-center md:text-left",
    cardTitle: "font-serif text-2xl font-bold text-foreground mb-2",
    cardText: "text-muted-foreground leading-relaxed",
  };

  const features = [
    {
      icon: Shield,
      title: "Quality Assured",
      description: "Every drop is tested and certified to meet the highest quality standards, ensuring your safety with every sip.",
    },
    {
      icon: Leaf,
      title: "Natural Source",
      description: "Sourced from protected natural springs deep within the earth, naturally filtered and free from contaminants.",
    },
    {
      icon: Droplet,
      title: "Essential Minerals",
      description: "Enriched with vital minerals like magnesium and calcium that your body needs for optimal daily performance.",
    },
  ];

  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        
        {/* Section Header */}
        <div className={styles.header}>
          <span className={styles.badge}>About Vitality</span>
          <h2 className={styles.title}>
            Why Choose <span className="text-gradient">Vitality Water?</span>
          </h2>
          <p className={styles.description}>
            Pure water is the foundation of a healthy life. 
            Our commitment to quality ensures every sip refreshes and revitalizes.
          </p>
        </div>

        {/* 1-Column, 3-Row Grid */}
        <div className={styles.cardGrid}>
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={styles.card}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Icon */}
              <div className={styles.iconWrapper}>
                <feature.icon className={styles.iconInner} />
              </div>
              
              {/* Text Content */}
              <div className={styles.contentWrapper}>
                <h3 className={styles.cardTitle}>
                  {feature.title}
                </h3>
                <p className={styles.cardText}>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;