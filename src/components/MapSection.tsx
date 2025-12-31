import { MapPin, Navigation, Clock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const MapSection = () => {
  const phoneNumber = "+233543609550";
  
  // Confirmed location for Vitality Purified Natural Mineral Water in Techiman
  const googleMapsUrl = "https://maps.google.com/?cid=18292440922897695857&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNl";
  
  // Semantic Class Names for Readability
  const styles = {
    sectionWrapper: "py-24 bg-muted/30",
    contentContainer: "container mx-auto px-4",
    headerGroup: "text-center mb-16 animate-fade-up",
    eyebrowLabel: "text-primary font-semibold uppercase tracking-wider text-sm",
    mainHeading: "font-serif text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6",
    subText: "text-muted-foreground text-lg max-w-2xl mx-auto",
    
    // Grid Layout
    mainGrid: "grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto",
    
    // Map Container
    mapFrameWrapper: "lg:col-span-2 rounded-3xl overflow-hidden shadow-card animate-fade-up",
    mapIframe: "w-full h-[450px] border-0",
    
    // Info Column
    sidebarStack: "space-y-6 animate-fade-up",
    infoCardSurface: "bg-gradient-card rounded-3xl p-8 shadow-card",
    cardTitle: "font-serif text-xl font-bold text-foreground mb-6",
    
    // Detail Items
    detailRow: "flex items-start gap-4",
    iconBox: "w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0",
    detailLabel: "font-semibold text-foreground",
    detailValue: "text-muted-foreground text-sm",
    
    // Action Buttons
    actionButtonGroup: "flex flex-col gap-3"
  };

  return (
    <section id="location" className={styles.sectionWrapper}>
      <div className={styles.contentContainer}>
        <div className={styles.headerGroup}>
          <span className={styles.eyebrowLabel}>Find Us</span>
          <h2 className={styles.mainHeading}>
            Visit Our <span className="text-gradient">Factory</span>
          </h2>
          <p className={styles.subText}>
            Located in the heart of Techiman, Bono East Region. 
            Come visit us or we'll deliver to your doorstep!
          </p>
        </div>

        <div className={styles.mainGrid}>
          {/* Map Embed - Using the confirmed Techiman address */}
          <div className={styles.mapFrameWrapper}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m12!1m3!1d3953.111!2d-1.9425!3d7.5792!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfd9d3c9a2f1e9fb%3A0x8c7a1f0c7b0c7b0c!2sVitality%20Purified%20Natural%20Mineral%20Water!5e0!3m2!1sen!2sgh!4v1234567890"
              width="100%"
              height="450"
              loading="lazy"
              title="Vitality Water Factory Location"
              className={styles.mapIframe}
            />
          </div>

          {/* Location Details Sidebar */}
          <div className={styles.sidebarStack} style={{ animationDelay: '0.2s' }}>
            <div className={styles.infoCardSurface}>
              <h3 className={styles.cardTitle}>Factory Location</h3>
              
              <div className="space-y-5">
                <div className={styles.detailRow}>
                  <div className={styles.iconBox}>
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className={styles.detailLabel}>Address</h4>
                    <p className={styles.detailValue}>
                      L3 Tomfoo Kwabena Ave<br />
                      Techiman, Bono East Region<br />
                      Ghana
                    </p>
                  </div>
                </div>

                <div className={styles.detailRow}>
                  <div className={styles.iconBox}>
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className={styles.detailLabel}>Business Hours</h4>
                    <p className={styles.detailValue}>
                      Daily: 6:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>

                <div className={styles.detailRow}>
                  <div className={styles.iconBox}>
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className={styles.detailLabel}>Phone</h4>
                    <a href={`tel:${phoneNumber}`} className="text-primary hover:underline text-sm">
                      +233 54 360 9550
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.actionButtonGroup}>
              <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="hero" size="lg" className="w-full gap-2">
                  <Navigation className="w-5 h-5" />
                  Get Directions
                </Button>
              </a>
              <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="w-full gap-2">
                  <MapPin className="w-5 h-5" />
                  View on Google Maps
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;