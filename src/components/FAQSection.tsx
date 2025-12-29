import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "How much does a bag of Vitality water cost?",
      answer: "Our 500ml sachet water comes in bags of 30 sachets each. Please contact us directly via WhatsApp or phone for current pricing, as we offer special rates for bulk orders.",
    },
    {
      question: "What is the minimum order quantity?",
      answer: "We accept orders starting from 1 bag (30 sachets). For wholesale and business customers, we offer attractive discounts on orders of 10 bags or more.",
    },
    {
      question: "How do I place an order?",
      answer: "You can order by calling us directly, sending a WhatsApp message, or filling out our contact form. We'll confirm your order and arrange delivery promptly.",
    },
    {
      question: "Do you deliver on weekends?",
      answer: "Yes, we deliver Monday through Saturday. For urgent orders on Sundays, please contact us and we'll do our best to accommodate your needs.",
    },
    {
      question: "Is your water FDA approved?",
      answer: "Absolutely! Vitality Purified Mineral Water is fully registered and approved by the Ghana Food and Drugs Authority (FDA). We maintain the highest quality standards.",
    },
    {
      question: "Can I become a distributor?",
      answer: "Yes! We're always looking for reliable distributors across Ghana. Contact us to discuss partnership opportunities and wholesale pricing.",
    },
    {
      question: "What makes Vitality water different?",
      answer: "We use a 5-stage purification process including reverse osmosis and UV sterilization. Our water retains essential minerals while removing all impurities, giving it a crisp, refreshing taste.",
    },
    {
      question: "Do you provide branded water for events?",
      answer: "Yes, we offer custom-branded sachets for weddings, corporate events, and other occasions. Contact us at least 2 weeks before your event for branded orders.",
    },
  ];

  return (
    <section id="faq" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-up">
          <span className="text-primary font-semibold uppercase tracking-wider text-sm">
            Common Questions
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Got questions? We've got answers. If you don't find what you're looking for, feel free to contact us.
          </p>
        </div>

        <div className="max-w-3xl mx-auto animate-fade-up">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-background rounded-xl px-6 shadow-soft border-none"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
