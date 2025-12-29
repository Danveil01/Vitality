import { Button } from "@/components/ui/button";
import { Check, Phone, MessageCircle } from "lucide-react";

const PricingSection = () => {
  const phoneNumber = "+233205032301";
  const whatsappMessage = encodeURIComponent(
    "Hello Vitality Water! I would like to place an order."
  );

  const pricingTiers = [
    {
      name: "Single Bag",
      description: "Perfect for personal use",
      price: "GH₵ 8",
      unit: "per bag",
      quantity: "30 sachets",
      features: [
        "30 x 500ml sachets",
        "Fresh daily production",
        "Quality guaranteed",
        "Pick-up available",
      ],
      popular: false,
    },
    {
      name: "Bulk Order",
      description: "Best for families & small businesses",
      price: "GH₵ 7.50",
      unit: "per bag",
      quantity: "10-49 bags",
      savings: "Save 6%",
      features: [
        "30 x 500ml sachets per bag",
        "Free delivery in Techiman",
        "Priority processing",
        "Flexible scheduling",
      ],
      popular: true,
    },
    {
      name: "Wholesale",
      description: "For retailers & large businesses",
      price: "GH₵ 7",
      unit: "per bag",
      quantity: "50+ bags",
      savings: "Save 12.5%",
      features: [
        "30 x 500ml sachets per bag",
        "Free delivery anywhere",
        "Dedicated account manager",
        "Weekly/Monthly contracts",
        "Credit terms available",
      ],
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-up">
          <span className="text-primary font-semibold uppercase tracking-wider text-sm">
            Pricing
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
            Affordable <span className="text-gradient">Pure Water</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Quality purified water at competitive prices. 
            The more you order, the more you save!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <div
              key={tier.name}
              className={`relative rounded-3xl p-8 animate-fade-up ${
                tier.popular
                  ? "bg-gradient-cta text-primary-foreground shadow-xl scale-105"
                  : "bg-gradient-card shadow-card"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-accent text-accent-foreground text-sm font-bold px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              {tier.savings && (
                <div className="absolute top-6 right-6">
                  <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                    tier.popular 
                      ? "bg-primary-foreground/20 text-primary-foreground" 
                      : "bg-primary/10 text-primary"
                  }`}>
                    {tier.savings}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className={`font-serif text-2xl font-bold mb-2 ${
                  tier.popular ? "text-primary-foreground" : "text-foreground"
                }`}>
                  {tier.name}
                </h3>
                <p className={tier.popular ? "text-primary-foreground/80" : "text-muted-foreground"}>
                  {tier.description}
                </p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl font-bold ${
                    tier.popular ? "text-primary-foreground" : "text-foreground"
                  }`}>
                    {tier.price}
                  </span>
                  <span className={tier.popular ? "text-primary-foreground/80" : "text-muted-foreground"}>
                    {tier.unit}
                  </span>
                </div>
                <p className={`text-sm mt-1 ${
                  tier.popular ? "text-primary-foreground/80" : "text-muted-foreground"
                }`}>
                  {tier.quantity}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      tier.popular 
                        ? "bg-primary-foreground/20" 
                        : "bg-primary/10"
                    }`}>
                      <Check className={`w-3 h-3 ${
                        tier.popular ? "text-primary-foreground" : "text-primary"
                      }`} />
                    </div>
                    <span className={tier.popular ? "text-primary-foreground/90" : "text-foreground"}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-3">
                <a href={`https://wa.me/${phoneNumber}?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant={tier.popular ? "outline" : "hero"}
                    size="lg"
                    className={`w-full ${
                      tier.popular 
                        ? "border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10" 
                        : ""
                    }`}
                  >
                    <MessageCircle className="w-5 h-5" />
                    Order on WhatsApp
                  </Button>
                </a>
                <a href={`tel:${phoneNumber}`}>
                  <Button
                    variant="ghost"
                    size="lg"
                    className={`w-full ${
                      tier.popular 
                        ? "text-primary-foreground hover:bg-primary-foreground/10" 
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    <Phone className="w-5 h-5" />
                    Call to Order
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-up">
          <p className="text-muted-foreground">
            Need a custom quote for events or large orders?{" "}
            <a
              href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent("Hello! I need a custom quote for a large order.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-semibold hover:underline"
            >
              Contact us for special pricing
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
