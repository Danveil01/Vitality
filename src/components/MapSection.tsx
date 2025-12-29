import { MapPin, Navigation, Clock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const MapSection = () => {
  const phoneNumber = "+233205032301";
  
  // Techiman coordinates
  const latitude = 7.5853;
  const longitude = -1.9344;
  const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

  return (
    <section id="location" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-up">
          <span className="text-primary font-semibold uppercase tracking-wider text-sm">
            Find Us
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
            Visit Our <span className="text-gradient">Factory</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Located in the heart of Techiman, Bono East Region. 
            Come visit us or we'll deliver to your doorstep!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Map Embed */}
          <div className="lg:col-span-2 rounded-3xl overflow-hidden shadow-card animate-fade-up">
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31644.89671748!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfd9d3c9a2f1e9fb%3A0x8c7a1f0c7b0c7b0c!2sTechiman%2C%20Ghana!5e0!3m2!1sen!2sgh!4v1234567890`}
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Vitality Water Location - Techiman, Ghana"
              className="w-full h-[450px]"
            />
          </div>

          {/* Location Info */}
          <div className="space-y-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-gradient-card rounded-3xl p-8 shadow-card">
              <h3 className="font-serif text-xl font-bold text-foreground mb-6">
                Factory Location
              </h3>
              
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Address</h4>
                    <p className="text-muted-foreground text-sm">
                      Vitality Water Factory<br />
                      Techiman, Bono East Region<br />
                      Ghana
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Business Hours</h4>
                    <p className="text-muted-foreground text-sm">
                      Monday - Saturday<br />
                      7:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Phone</h4>
                    <a 
                      href={`tel:${phoneNumber}`} 
                      className="text-primary hover:underline text-sm"
                    >
                      +233 20 503 2301
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="hero" size="lg" className="w-full">
                  <Navigation className="w-5 h-5" />
                  Get Directions
                </Button>
              </a>
              <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="w-full">
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
