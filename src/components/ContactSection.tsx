/**
 * =============================================================================
 * CONTACT SECTION - src/components/ContactSection.tsx
 * =============================================================================
 * 
 * Provides multiple ways for customers to get in touch with the company.
 * Includes a contact form and business information cards.
 * 
 * Layout:
 * - Left: Contact form (name, email, phone, message)
 * - Right: "Why order" card + Contact info cards (phone, email, address, hours)
 * 
 * Features:
 * - Form submission with toast notification
 * - Form reset after successful submission
 * - Responsive grid layout
 * - Animated entrance effects
 * =============================================================================
 */

import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  
  // Form state for controlled inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  /**
   * Handle form submission
   * Shows success toast and resets form fields
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for your inquiry. We'll get back to you soon.",
    });
    // Reset form fields
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  // Contact information cards data
  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+233 20 503 2301"],
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@vitalitywater.com"],
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
    <section id="contact" className="contact-section section-wrapper bg-background">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-label">Get In Touch</span>
          <h2 className="section-heading">
            Order Your <span className="text-gradient">Vitality Water</span>
          </h2>
          <p className="section-description">
            Ready to experience the refreshing taste of pure, mineral-rich water? 
            Contact us for orders, inquiries, or partnership opportunities.
          </p>
        </div>

        <div className="contact-grid grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          
          {/* Left Column - Contact Form */}
          <div className="contact-form-card content-card p-8 md:p-10 animate-fade-up">
            <h3 className="contact-form-title font-serif text-2xl font-bold text-foreground mb-6">
              Send us a Message
            </h3>
            
            <form onSubmit={handleSubmit} className="contact-form space-y-6">
              {/* Name and Email row */}
              <div className="form-row grid sm:grid-cols-2 gap-6">
                <div className="form-group">
                  <label className="form-label">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-input"
                    placeholder="John Doe"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="form-input"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              {/* Phone field */}
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="form-input"
                  placeholder="+234 XXX XXX XXXX"
                />
              </div>
              
              {/* Message textarea */}
              <div className="form-group">
                <label className="form-label">Your Message</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="form-textarea"
                  placeholder="I'd like to order..."
                />
              </div>
              
              {/* Submit button */}
              <Button variant="hero" size="lg" type="submit" className="form-submit-button w-full">
                <Send className="w-5 h-5" />
                Send Message
              </Button>
            </form>
          </div>
          
          {/* Right Column - Contact Info */}
          <div className="contact-info-column space-y-8 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            {/* Why Order card with bullet points */}
            <div className="why-order-card bg-gradient-cta rounded-3xl p-8 md:p-10 text-primary-foreground">
              <h3 className="why-order-title font-serif text-2xl font-bold mb-4">
                Why Order from Vitality?
              </h3>
              <ul className="why-order-list space-y-3 text-primary-foreground/90">
                <li className="why-order-item flex items-center gap-3">
                  <div className="bullet-dot w-2 h-2 rounded-full bg-primary-foreground" />
                  Fast and reliable delivery
                </li>
                <li className="why-order-item flex items-center gap-3">
                  <div className="bullet-dot w-2 h-2 rounded-full bg-primary-foreground" />
                  Bulk order discounts available
                </li>
                <li className="why-order-item flex items-center gap-3">
                  <div className="bullet-dot w-2 h-2 rounded-full bg-primary-foreground" />
                  Premium quality guaranteed
                </li>
                <li className="why-order-item flex items-center gap-3">
                  <div className="bullet-dot w-2 h-2 rounded-full bg-primary-foreground" />
                  Excellent customer service
                </li>
              </ul>
            </div>
            
            {/* Contact info cards grid */}
            <div className="contact-info-grid grid sm:grid-cols-2 gap-6">
              {contactInfo.map((info) => (
                <div
                  key={info.title}
                  className="contact-info-card bg-gradient-card rounded-2xl p-6 shadow-soft hover:shadow-card transition-all duration-300"
                >
                  {/* Icon */}
                  <div className="icon-container-md mb-4">
                    <info.icon className="w-6 h-6 text-primary" />
                  </div>
                  
                  {/* Title and details */}
                  <h4 className="contact-info-title font-semibold text-foreground mb-2">{info.title}</h4>
                  {info.details.map((detail) => (
                    <p key={detail} className="contact-info-detail text-muted-foreground text-sm">
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
