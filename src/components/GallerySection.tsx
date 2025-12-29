/**
 * =============================================================================
 * GALLERY SECTION - src/components/GallerySection.tsx
 * =============================================================================
 * 
 * Displays a photo gallery of the production facility with a lightbox
 * feature for viewing images in full size.
 * 
 * Gallery images include:
 * - Production Line
 * - Water Purification System
 * - Company Team
 * - Warehouse Storage
 * - Quality Testing Lab
 * - Delivery Operations
 * 
 * Features:
 * - Responsive grid layout (1/2/3 columns)
 * - Hover effect with caption overlay
 * - Click to open lightbox modal
 * - Close lightbox by clicking backdrop or X button
 * =============================================================================
 */

import { useState } from "react";
import { X } from "lucide-react";
import galleryFactory from "@/assets/gallery-factory.jpg";
import galleryPurification from "@/assets/gallery-purification.jpg";
import galleryTeam from "@/assets/gallery-team.jpg";
import galleryWarehouse from "@/assets/gallery-warehouse.jpg";
import galleryQuality from "@/assets/gallery-quality.jpg";
import galleryDelivery from "@/assets/gallery-delivery.jpg";

const GallerySection = () => {
  // State to track which image is open in lightbox (null = closed)
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Gallery images data with source, alt text, and caption
  const galleryImages = [
    {
      src: galleryFactory,
      alt: "Production Line",
      caption: "Our State-of-the-Art Production Facility",
    },
    {
      src: galleryPurification,
      alt: "Water Purification System",
      caption: "Advanced Water Purification Equipment",
    },
    {
      src: galleryTeam,
      alt: "Vitality Water Team",
      caption: "Our Dedicated Team in Techiman",
    },
    {
      src: galleryWarehouse,
      alt: "Warehouse Storage",
      caption: "Quality Controlled Storage Facility",
    },
    {
      src: galleryQuality,
      alt: "Quality Testing Lab",
      caption: "Rigorous Quality Testing Laboratory",
    },
    {
      src: galleryDelivery,
      alt: "Delivery Operations",
      caption: "Fast & Reliable Delivery Fleet",
    },
  ];

  return (
    <section id="gallery" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-up">
          <span className="text-primary font-semibold uppercase tracking-wider text-sm">
            Our Facility
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
            Inside <span className="text-gradient">Vitality Water</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Take a virtual tour of our modern water production facility in Techiman, 
            where quality and hygiene are our top priorities.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-card cursor-pointer animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedImage(image.src)}
            >
              {/* Gallery thumbnail image */}
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Hover overlay with caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-background font-semibold text-lg">
                    {image.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal - Shows when an image is selected */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-foreground/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close button */}
          <button
            className="absolute top-6 right-6 text-background hover:text-primary transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          
          {/* Full-size image */}
          <img
            src={selectedImage}
            alt="Gallery preview"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
          />
        </div>
      )}
    </section>
  );
};

export default GallerySection;
