/**
 * =============================================================================
 * FOOTER COMPONENT - src/components/Footer.tsx
 * =============================================================================
 * 
 * The site-wide footer displayed at the bottom of all pages.
 * Contains company branding, navigation links, product links, newsletter
 * subscription form, and social media links.
 * 
 * Sections:
 * - Brand: Logo, description, and social media links
 * - Quick Links: Main site navigation
 * - Products: Product-specific links
 * - Newsletter: Email subscription form
 * - Bottom Bar: Copyright and legal links
 * 
 * Design: Dark background (water-dark) with light text for contrast
 * =============================================================================
 */

import { Droplets, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  // Get current year for copyright notice
  const currentYear = new Date().getFullYear();

  // Footer navigation links organized by section
  const links = {
    quickLinks: [
      { name: "Home", href: "#home" },
      { name: "About Us", href: "#about" },
      { name: "Products", href: "#products" },
      { name: "Benefits", href: "#benefits" },
      { name: "Contact", href: "#contact" },
    ],
    products: [
      { name: "500ml Sachet", href: "#products" },
      { name: "30-Pack Bag", href: "#products" },
      { name: "Bulk Orders", href: "#contact" },
    ],
  };

  // Social media links with icons
  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ];

  return (
    <footer className="site-footer bg-water-dark text-primary-foreground">
      <div className="footer-container container mx-auto px-4 py-16">
        {/* Main footer content grid */}
        <div className="footer-grid grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Column - Logo, description, social links */}
          <div className="footer-brand-column">
            <a href="#home" className="footer-logo flex items-center gap-2 mb-6">
              <div className="footer-logo-icon w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Droplets className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="footer-logo-text font-serif text-xl font-bold">Vitality</span>
            </a>
            <p className="footer-brand-description text-primary-foreground/80 mb-6">
              Providing pure, refreshing mineral water for healthier lives. 
              Quality you can trust, taste you'll love.
            </p>
            {/* Social media icons */}
            <div className="footer-social-links flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="social-icon-button"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="footer-links-column">
            <h4 className="footer-column-title font-serif text-lg font-bold mb-6">Quick Links</h4>
            <ul className="footer-links-list space-y-3">
              {links.quickLinks.map((link) => (
                <li key={link.name} className="footer-link-item">
                  <a
                    href={link.href}
                    className="footer-link text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Column */}
          <div className="footer-products-column">
            <h4 className="footer-column-title font-serif text-lg font-bold mb-6">Products</h4>
            <ul className="footer-links-list space-y-3">
              {links.products.map((link) => (
                <li key={link.name} className="footer-link-item">
                  <a
                    href={link.href}
                    className="footer-link text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Subscription Column */}
          <div className="footer-newsletter-column">
            <h4 className="footer-column-title font-serif text-lg font-bold mb-6">Stay Updated</h4>
            <p className="footer-newsletter-description text-primary-foreground/80 mb-4">
              Subscribe for updates, promotions, and health tips.
            </p>
            <form className="newsletter-form flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="newsletter-input flex-1 px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30"
              />
              <button
                type="submit"
                className="newsletter-button px-4 py-3 rounded-lg bg-primary-foreground text-water-dark font-semibold hover:bg-primary-foreground/90 transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar - Copyright and legal links */}
        <div className="footer-bottom border-t border-primary-foreground/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="footer-copyright text-primary-foreground/70 text-sm">
            © {currentYear} Vitality Purified Mineral Water. All rights reserved.
          </p>
          <div className="footer-legal-links flex gap-6 text-sm text-primary-foreground/70">
            <a href="#" className="legal-link hover:text-primary-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="legal-link hover:text-primary-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
