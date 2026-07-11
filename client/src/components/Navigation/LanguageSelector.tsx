import { useState, useRef, useEffect } from "react";
import { ChevronDown, Globe, Check } from "lucide-react";
import { languages } from "./NavData";

type Language = "en" | "rw" | "fr";

interface LanguageSelectorProps {
  language: string;
  setLanguage: (code: Language) => void;
  getTranslation: (key: string, fallback: string) => string;
}

export default function LanguageSelector({ language, setLanguage, getTranslation }: LanguageSelectorProps) {
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setShowLanguageMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageSelect = (code: Language) => {
    setLanguage(code);
    setShowLanguageMenu(false);
  };

  return (
    <div className="relative" ref={langRef}>
      <button
        type="button"
        onClick={() => setShowLanguageMenu(!showLanguageMenu)}
        className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-400 hover:bg-green-50/50 dark:hover:bg-green-900/20 transition-all duration-300"
        aria-label={getTranslation("language_label", "Select Language")}
      >
        <Globe className="w-4 h-4" />
        <span className="uppercase">{language}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${showLanguageMenu ? "rotate-180" : ""}`} />
      </button>

      {showLanguageMenu && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden animate-fade-in-down z-50">
          <div className="p-1.5">
            {languages.map(lang => (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleLanguageSelect(lang.code as Language)}
                className={`flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                  language === lang.code
                    ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-green-50/50 dark:hover:bg-green-900/20"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>{lang.flag}</span>
                  <span>{lang.label}</span>
                </span>
                {language === lang.code && <Check className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}