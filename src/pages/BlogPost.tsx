import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingOrderButtons from "@/components/FloatingOrderButtons";
import { blogPosts } from "@/components/BlogSection";

const blogContent: Record<string, { content: string[] }> = {
  "importance-of-clean-water": {
    content: [
      "Access to clean drinking water is a fundamental human right, yet millions of people around the world still lack this basic necessity. In Ghana, ensuring safe drinking water is crucial for public health and community development.",
      "Waterborne diseases such as cholera, typhoid, and dysentery remain significant health challenges, particularly in areas with inadequate water treatment infrastructure. These diseases can be prevented with access to properly purified water.",
      "At Vitality Purified Mineral Water, we understand the critical importance of water quality. Our multi-stage purification process removes harmful bacteria, viruses, and contaminants while retaining essential minerals that your body needs.",
      "Drinking clean water supports numerous bodily functions including digestion, circulation, and temperature regulation. It helps flush toxins from your body, keeps your skin healthy, and supports cognitive function.",
      "By choosing Vitality water, you're not just quenching your thirst – you're investing in your health and the wellbeing of your family. Every sachet we produce meets the strict standards set by Ghana's Food and Drugs Authority.",
      "We encourage everyone in Techiman and the Bono East Region to prioritize water quality. When you choose purified water, you're taking a simple but powerful step towards better health.",
    ],
  },
  "water-purification-process": {
    content: [
      "Modern water purification technology has revolutionized how we ensure safe drinking water. At Vitality, we employ state-of-the-art equipment to deliver water that meets the highest quality standards.",
      "Our purification process begins with raw water sourcing from deep boreholes. This groundwater naturally contains fewer contaminants than surface water, giving us a clean foundation to work with.",
      "The first stage involves sediment filtration, which removes larger particles like sand, silt, and debris. This prepares the water for more refined treatment stages.",
      "Next, the water passes through activated carbon filters. These remarkable filters absorb chlorine, organic compounds, and other chemicals that can affect taste and odor. The result is noticeably cleaner, fresher-tasting water.",
      "Reverse osmosis is the heart of our purification system. This process forces water through semi-permeable membranes that filter out dissolved solids, heavy metals, and microscopic contaminants. It's one of the most effective purification methods available.",
      "Finally, UV sterilization provides the ultimate safeguard against biological contamination. Ultraviolet light destroys the DNA of bacteria, viruses, and other microorganisms, ensuring your water is completely safe to drink.",
      "Our automated sachet packaging equipment maintains this purity right up to the moment you open your sachet. The entire process is monitored continuously to ensure consistent quality.",
    ],
  },
  "hydration-tips": {
    content: [
      "Ghana's tropical climate presents unique hydration challenges. With high temperatures and humidity, our bodies lose water rapidly through perspiration, making proper hydration essential for health and wellbeing.",
      "The average adult should aim to drink at least 2-3 liters of water daily, but in hot weather, this requirement increases significantly. Pay attention to your body's signals – thirst, dark urine, and fatigue are signs you need more water.",
      "Start your day with a glass of water before breakfast. After sleeping for several hours, your body is naturally dehydrated. Morning hydration kickstarts your metabolism and helps you feel more alert.",
      "Keep water accessible throughout the day. At work, keep a bottle or sachet at your desk. When traveling, always carry water with you. Making water readily available makes it easier to maintain good hydration habits.",
      "Don't wait until you're thirsty to drink. By the time you feel thirsty, you're already mildly dehydrated. Sip water regularly throughout the day rather than consuming large amounts at once.",
      "For those engaged in physical labor or outdoor activities, increase your water intake accordingly. Consider adding electrolyte-rich foods to your diet to replace minerals lost through heavy sweating.",
      "Children and elderly individuals are particularly vulnerable to dehydration. Ensure they have regular access to clean water and encourage frequent drinking, especially during the hottest parts of the day.",
      "Choose quality water like Vitality for optimal hydration. Purified water with natural minerals is absorbed more efficiently by your body and tastes better, encouraging you to drink more.",
    ],
  },
};

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find((p) => p.id === id);
  const content = id ? blogContent[id] : null;

  if (!post || !content) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Post Not Found</h1>
          <Link to="/">
            <Button variant="hero">Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <article className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Back Link */}
            <Link
              to="/#blog"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            {/* Header */}
            <header className="mb-8">
              <span className="bg-primary text-primary-foreground text-sm font-semibold px-4 py-1.5 rounded-full">
                {post.category}
              </span>
              
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-6 mb-6">
                {post.title}
              </h1>
              
              <div className="flex items-center gap-6 text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  {post.date}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  {post.readTime}
                </span>
              </div>
            </header>

            {/* Featured Image */}
            <div className="rounded-2xl overflow-hidden mb-10 shadow-card">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover"
              />
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              {content.content.map((paragraph, index) => (
                <p key={index} className="text-muted-foreground leading-relaxed mb-6">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Share */}
            <div className="border-t border-border mt-12 pt-8">
              <div className="flex items-center gap-4">
                <span className="text-foreground font-medium">Share this article:</span>
                <Button variant="outline" size="sm" className="gap-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-cta rounded-2xl p-8 mt-12 text-center text-primary-foreground">
              <h3 className="font-serif text-2xl font-bold mb-4">
                Ready to Try Vitality Water?
              </h3>
              <p className="mb-6 text-primary-foreground/90">
                Experience the pure, refreshing taste of properly purified water.
              </p>
              <Link to="/#contact">
                <Button variant="secondary" size="lg">
                  Order Now
                </Button>
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Footer />
      <FloatingOrderButtons />
    </div>
  );
};

export default BlogPost;
