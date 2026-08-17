import { MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Floating WhatsApp contact button shown on every page.
 * The phone number is configurable via VITE_WHATSAPP_NUMBER
 * (international format, digits only, e.g. 250782724840).
 */
const WHATSAPP_NUMBER: string = import.meta.env.VITE_WHATSAPP_NUMBER || "250782724840";

export default function WhatsAppButton() {
  const { t } = useLanguage();

  const message = encodeURIComponent(t("whatsapp_default_message"));
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("whatsapp_chat_aria")}
      title={t("whatsapp_chat_title")}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#1EBE5A] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="hidden font-semibold sm:inline">{t("whatsapp_button_text")}</span>
    </a>
  );
}
