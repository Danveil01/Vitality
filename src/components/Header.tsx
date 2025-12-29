/**
 * =============================================================================
 * HEADER COMPONENT - src/components/Header.tsx
 * =============================================================================
 * 
 * A responsive navigation header that provides site-wide navigation.
 * Features a fixed position at the top of the viewport with a blur backdrop.
 * 
 * Features:
 * - Company logo with hover animation
 * - Desktop navigation links with underline hover effect
 * - Mobile hamburger menu with slide-down animation
 * - Admin portal and Order Now CTA buttons
 * - Smooth transitions and responsive design
 * 
 * Used on: All public-facing pages (Index, BlogPost)
 * =============================================================================
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Droplets, Lock } from "lucide-react";

const Header = () => {
  // State to control mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Navigation links configuration
  // Each link has a name (display text) and href (anchor link to section)
  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Process", href: "#process" },
    { name: "Services", href: "#services" },
    { name: "Blog", href: "#blog" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="site-header fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="header-container container mx-auto px-4">
        <div className="header-content flex items-center justify-between h-20">
          
          {/* Logo Section - Links to home */}
          <a href="#home" className="site-logo flex items-center gap-2 group">
            <div className="logo-icon icon-container-sm bg-gradient-cta shadow-soft group-hover:scale-110 transition-transform duration-300">
              <Droplets className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="logo-text font-serif text-xl font-bold text-foreground">
              Vitality
            </span>
          </a>

          {/* Desktop Navigation - Hidden on mobile (md breakpoint) */}
          <nav className="desktop-nav hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="nav-link"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop CTA Buttons - Admin link and Order button */}
          <div className="header-actions hidden md:flex items-center gap-3">
            <Link to="/admin">
              <Button variant="outline" size="sm" className="admin-button gap-1.5">
                <Lock className="h-3.5 w-3.5" />
                Admin
              </Button>
            </Link>
            <Button variant="hero" size="default" className="order-button">
              Order Now
            </Button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            className="mobile-menu-toggle md:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Menu - Slides down when open */}
        {isMenuOpen && (
          <nav className="mobile-nav md:hidden py-4 border-t border-border animate-fade-up">
            <div className="mobile-nav-content flex flex-col gap-4">
              {/* Mobile nav links - closes menu on click */}
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="nav-link-mobile"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              
              {/* Mobile CTA buttons */}
              <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" size="default" className="mobile-admin-button w-full gap-2">
                  <Lock className="h-4 w-4" />
                  Admin Portal
                </Button>
              </Link>
              <Button variant="hero" size="default" className="mobile-order-button mt-2">
                Order Now
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
