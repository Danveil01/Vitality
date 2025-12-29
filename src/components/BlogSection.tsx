import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "importance-of-clean-water",
    title: "The Importance of Clean Drinking Water for Your Health",
    excerpt: "Discover why access to purified water is essential for maintaining good health and preventing waterborne diseases in Ghana.",
    date: "December 15, 2024",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&auto=format&fit=crop",
    category: "Health",
  },
  {
    id: "water-purification-process",
    title: "Understanding Modern Water Purification Technology",
    excerpt: "Learn about the advanced multi-stage filtration and UV sterilization processes that make Vitality water pure and safe.",
    date: "December 10, 2024",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1559825481-12a05cc00344?w=800&auto=format&fit=crop",
    category: "Technology",
  },
  {
    id: "hydration-tips",
    title: "Staying Hydrated in Ghana's Tropical Climate",
    excerpt: "Practical tips for maintaining proper hydration levels during hot weather and why quality water matters.",
    date: "December 5, 2024",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=800&auto=format&fit=crop",
    category: "Wellness",
  },
];

const BlogSection = () => {
  return (
    <section id="blog" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-up">
          <span className="text-primary font-semibold uppercase tracking-wider text-sm">
            Latest News
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
            Our <span className="text-gradient">Blog</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Stay informed with the latest news, tips, and insights about water quality and healthy living.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {blogPosts.map((post, index) => (
            <article
              key={post.id}
              className="bg-gradient-card rounded-2xl overflow-hidden shadow-card hover:shadow-lg transition-all duration-300 animate-fade-up group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </span>
                </div>
                
                <h3 className="font-serif text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <Link to={`/blog/${post.id}`}>
                  <Button variant="link" className="p-0 h-auto text-primary font-semibold group/btn">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
