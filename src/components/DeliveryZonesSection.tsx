import { MapPin, Check, Truck } from "lucide-react";

const DeliveryZonesSection = () => {
  const zones = [
    {
      name: "Techiman Central",
      areas: ["Techiman Market Area", "New Dormaa Road", "Kenten", "Old Nante Road"],
      deliveryTime: "Same day",
    },
    {
      name: "Greater Techiman",
      areas: ["Tanoso", "Tuobodom", "Offuman", "Krobo"],
      deliveryTime: "Same day",
    },
    {
      name: "Bono East Region",
      areas: ["Nkoranza", "Kintampo", "Atebubu", "Yeji"],
      deliveryTime: "1-2 days",
    },
    {
      name: "Neighboring Regions",
      areas: ["Sunyani", "Wenchi", "Ejura", "Other areas"],
      deliveryTime: "2-3 days",
    },
  ];

  return (
    <section id="delivery" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-up">
          <span className="text-primary font-semibold uppercase tracking-wider text-sm">
            Delivery Coverage
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
            Delivery <span className="text-gradient">Zones</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Based in Techiman, we deliver across the Bono East Region and beyond. Fast, reliable service guaranteed.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
          {zones.map((zone, index) => (
            <div
              key={zone.name}
              className="bg-gradient-card rounded-2xl p-6 shadow-card hover:shadow-lg transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">{zone.name}</h3>
              </div>
              
              <ul className="space-y-2 mb-4">
                {zone.areas.map((area) => (
                  <li key={area} className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Check className="w-4 h-4 text-primary" />
                    {area}
                  </li>
                ))}
              </ul>
              
              <div className="flex items-center gap-2 pt-4 border-t border-border">
                <Truck className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">{zone.deliveryTime}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center animate-fade-up">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-6 py-3">
            <MapPin className="w-5 h-5 text-primary" />
            <span className="text-foreground font-medium">
              Factory Location: Techiman, Bono East Region, Ghana
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryZonesSection;
