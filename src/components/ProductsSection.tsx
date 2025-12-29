/**
 * =============================================================================
 * PRODUCTS SECTION - src/components/ProductsSection.tsx
 * =============================================================================
 * 
 * Displays the available water products with images, descriptions, features,
 * and pricing information. Highlights the most popular product option.
 * 
 * Products displayed:
 * 1. 500ml Sachet - Individual unit
 * 2. 30-Pack Bag - Bulk value option (marked as "Most Popular")
 * 
 * Card Features:
 * - Product image with light background
 * - Product title and subtitle
 * - Description text
 * - Feature checklist with icons
 * - Price display and order button
 * - Visual indicator for popular product (ring + badge)
 * =============================================================================
 */

import { Button } from "@/components/ui/button";
import { Package, ShoppingCart, Check } from "lucide-react";
import waterSachet from "@/assets/water-sachet.jpg";
import waterBagPack from "@/assets/water-bag-pack.jpg";

const ProductsSection = () => {
  // Product data configuration
  const products = [
    {
      image: waterSachet,
      title: "500ml Sachet",
      subtitle: "Single Unit",
      description: "Perfect for on-the-go hydration. Our convenient sachet packaging keeps water fresh and pure.",
      features: ["Easy to carry", "Spill-proof design", "Eco-friendly packaging"],
      price: "Contact for pricing",
      popular: false,
    },
    {
      image: waterBagPack,
      title: "30-Pack Bag",
      subtitle: "Best Value",
      description: "Stock up with our value pack containing 30 x 500ml sachets. Perfect for families and businesses.",
      features: ["30 sachets per bag", "Bulk savings", "Easy storage", "Long shelf life"],
      price: "Contact for pricing",
      popular: true, // Highlighted as the recommended option
    },
  ];

  return (
    <section id="products" className="products-section section-wrapper bg-background">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-label">Our Products</span>
          <h2 className="section-heading">
            Premium Water <span className="text-gradient">Packaging</span>
          </h2>
          <p className="section-description">
            Available in convenient 500ml sachets and economical 30-pack bags. 
            Choose the perfect option for your hydration needs.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="products-grid grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {products.map((product, index) => (
            <div
              key={product.title}
              className={`product-card content-card-hover relative overflow-hidden animate-fade-up ${
                product.popular ? "ring-2 ring-primary" : ""
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Popular badge - only shown for the recommended product */}
              {product.popular && (
                <div className="product-badge badge-featured absolute top-4 right-4 z-10">
                  Most Popular
                </div>
              )}
              
              {/* Product Image */}
              <div className="product-image-container p-6 bg-water-light/50">
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-image w-full h-64 object-contain rounded-xl"
                />
              </div>
              
              {/* Product Details */}
              <div className="product-details p-8">
                {/* Subtitle with icon */}
                <div className="product-subtitle flex items-center gap-2 mb-2">
                  <Package className="w-5 h-5 text-primary" />
                  <span className="text-primary font-semibold text-sm">{product.subtitle}</span>
                </div>
                
                {/* Product title */}
                <h3 className="product-title font-serif text-2xl font-bold text-foreground mb-3">
                  {product.title}
                </h3>
                
                {/* Description */}
                <p className="product-description text-muted-foreground mb-6">
                  {product.description}
                </p>
                
                {/* Features list with checkmarks */}
                <ul className="product-features-list space-y-3 mb-8">
                  {product.features.map((feature) => (
                    <li key={feature} className="feature-list-item">
                      <div className="feature-check-icon">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                {/* Price and Order button */}
                <div className="product-footer flex items-center justify-between">
                  <span className="product-price text-muted-foreground font-medium">{product.price}</span>
                  <Button variant={product.popular ? "hero" : "default"}>
                    <ShoppingCart className="w-4 h-4" />
                    Order Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
