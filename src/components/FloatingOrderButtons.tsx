/**
 * =============================================================================
 * FLOATING ORDER BUTTONS - src/components/FloatingOrderButtons.tsx
 * =============================================================================
 * 
 * Fixed-position action buttons that appear in the bottom-right corner of
 * the screen. Provides quick access to ordering via WhatsApp or phone call.
 * 
 * Buttons:
 * 1. WhatsApp - Opens WhatsApp chat with pre-filled message
 * 2. Phone - Initiates a phone call on mobile devices
 * 
 * Features:
 * - Fixed position (always visible)
 * - Hover effects with scale animation
 * - Tooltip labels on hover
 * - High z-index to stay above other content
 * 
 * Design: Green for WhatsApp (brand color), Primary for phone
 * =============================================================================
 */

import { Phone, MessageCircle } from "lucide-react";

const FloatingOrderButtons = () => {
  // Contact phone number (without spaces or dashes)
  const phoneNumber = "+233205032301";
  
  // Pre-encoded message for WhatsApp - will appear in the chat when opened
  const whatsappMessage = encodeURIComponent(
    "Hello Vitality Water! I would like to place an order for your purified sachet water."
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      
      {/* WhatsApp Button - Green background (WhatsApp brand color) */}
      <a
        href={`https://wa.me/${phoneNumber}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[#25D366] hover:bg-[#128C7E] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group"
        aria-label="Order via WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white" />
        {/* Tooltip - appears on hover */}
        <span className="absolute right-16 bg-foreground text-background text-sm font-medium px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Order on WhatsApp
        </span>
      </a>

      {/* Call Button - Primary color background */}
      <a
        href={`tel:${phoneNumber}`}
        className="w-14 h-14 bg-primary hover:bg-primary/90 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group"
        aria-label="Call to order"
      >
        <Phone className="w-7 h-7 text-primary-foreground" />
        {/* Tooltip - appears on hover */}
        <span className="absolute right-16 bg-foreground text-background text-sm font-medium px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Call to Order
        </span>
      </a>
    </div>
  );
};

export default FloatingOrderButtons;
