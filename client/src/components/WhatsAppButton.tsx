import { MessageCircle } from "lucide-react";

/**
 * Floating WhatsApp contact button shown on every page.
 * The phone number is configurable via VITE_WHATSAPP_NUMBER
 * (international format, digits only, e.g. 250782724840).
 */
const WHATSAPP_NUMBER: string = import.meta.env.VITE_WHATSAPP_NUMBER || "250782724840";

const DEFAULT_MESSAGE = encodeURIComponent(
  "Hello DERN SEED! I would like to know more about your certified seeds."
);

export default function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${DEFAULT_MESSAGE}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with DERN SEED on WhatsApp"
      title="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#1EBE5A] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="hidden font-semibold sm:inline">WhatsApp</span>
    </a>
  );
}
