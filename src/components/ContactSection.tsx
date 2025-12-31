import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // --- Styling Constants ---
  const styles = {
    section: "py-24 bg-background",
    container: "container mx-auto px-4",
    
    // Header
    header: "text-center mb-16",
    label: "text-primary font-semibold uppercase tracking-wider text-sm",
    heading: "font-serif text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6",
    description: "text-muted-foreground text-lg max-w-2xl mx-auto",
    
    // Main Grid
    grid: "grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto",
    
    // Left Column (Form)
    formCard: "bg-gradient-card rounded-3xl p-8 md:p-10 shadow-card animate-fade-up border border-border/50",
    formTitle: "font-serif text-2xl font-bold text-foreground mb-6",
    inputGroup: "space-y-2",
    labelTag: "text-sm font-medium text-foreground ml-1",
    input: "w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all",
    textarea: "w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none",
    
    // Right Column (Info)
    infoColumn: "space-y-8 animate-fade-up",
    whyOrderCard: "bg-gradient-cta rounded-3xl p-8 md:p-10 text-primary-foreground shadow-elevated",
    whyOrderTitle: "font-serif text-2xl font-bold mb-4",
    whyOrderList: "space-y-3 text-primary-foreground/90",
    bullet: "w-2 h-2 rounded-full bg-primary-foreground shrink-0",
    
    // Contact Info Grid
    infoGrid: "grid sm:grid-cols-2 gap-6",
    infoCard: "bg-white rounded-2xl p-6 shadow-soft hover:shadow-card transition-all duration-300 border border-border/50",
    iconWrapper: "w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4",
    infoTitle: "font-semibold text-foreground mb-2",
    infoDetail: "text-muted-foreground text-sm leading-relaxed"
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for your inquiry. We'll get back to you soon.",
    });
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+233 54 360 9550", "+233 53 793 0323"],
    },
    {
      icon: Mail,
      title: "Email",
      details: ["vitalitypurifiedmineralwater@gmail.com"],
    },
    {
      icon: MapPin,
      title: "Address",
      details: ["Techiman, Bono East Region", "Ghana"],
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon - Sat: 7am - 6pm"],
    },
  ];

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        
        {/* Section Header */}
        <div className={styles.header}>
          <span className={styles.label}>Get In Touch</span>
          <h2 className={styles.heading}>
            Order Your <span className="text-gradient">Vitality Water</span>
          </h2>
          <p className={styles.description}>
            Ready to experience the refreshing taste of pure, mineral-rich water? 
            Contact us for orders, inquiries, or partnership opportunities.
          </p>
        </div>

        <div className={styles.grid}>
          
          {/* Left Column - Contact Form */}
          <div className={styles.formCard}>
            <h3 className={styles.formTitle}>Send us a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className={styles.inputGroup}>
                  <label className={styles.labelTag}>Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={styles.input}
                    placeholder="John Doe"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.labelTag}>Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={styles.input}
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className={styles.inputGroup}>
                <label className={styles.labelTag}>Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={styles.input}
                  placeholder="+233 XX XXX XXXX"
                />
              </div>
              
              <div className={styles.inputGroup}>
                <label className={styles.labelTag}>Your Message</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={styles.textarea}
                  placeholder="I'd like to order..."
                />
              </div>
              
              <Button variant="hero" size="lg" type="submit" className="w-full gap-2">
                <Send className="w-5 h-5" />
                Send Message
              </Button>
            </form>
          </div>
          
          {/* Right Column - Contact Info */}
          <div className={styles.infoColumn} style={{ animationDelay: '0.2s' }}>
            <div className={styles.whyOrderCard}>
              <h3 className={styles.whyOrderTitle}>Why Order from Vitality?</h3>
              <ul className={styles.whyOrderList}>
                {["Fast and reliable delivery", "Bulk order discounts available", "Premium quality guaranteed", "Excellent customer service"].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className={styles.bullet} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className={styles.infoGrid}>
              {contactInfo.map((info) => (
                <div key={info.title} className={styles.infoCard}>
                  <div className={styles.iconWrapper}>
                    <info.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className={styles.infoTitle}>{info.title}</h4>
                  {info.details.map((detail) => (
                    <p key={detail} className={styles.infoDetail}>
                      {detail}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;