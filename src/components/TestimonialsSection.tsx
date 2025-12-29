import { Star, Quote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Kwame Mensah",
      role: "Restaurant Owner",
      content: "Vitality water has been our go-to supplier for over 2 years. The quality is consistent and our customers love it!",
      rating: 5,
    },
    {
      name: "Ama Serwaa",
      role: "Event Planner",
      content: "For all my events in Techiman, I always choose Vitality. Reliable delivery and premium taste every time.",
      rating: 5,
    },
    {
      name: "Kofi Asante",
      role: "Shop Owner",
      content: "My customers specifically ask for Vitality sachets. The purity is unmatched and the packaging is always perfect.",
      rating: 5,
    },
    {
      name: "Abena Osei",
      role: "School Administrator",
      content: "We supply Vitality water to our students. Safe, clean, and affordable. Highly recommend for institutions.",
      rating: 4.5,
    },
  ];

  return (
    <section id="testimonials" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-up">
          <span className="text-primary font-semibold uppercase tracking-wider text-sm">
            Customer Reviews
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
            What Our <span className="text-gradient">Customers Say</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Trusted by thousands of satisfied customers across Techiman and the Bono East Region.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="bg-background rounded-2xl p-6 shadow-card hover:shadow-lg transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              
              <Quote className="w-8 h-8 text-primary/20 mb-3" />
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              
              <div className="border-t border-border pt-4">
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
