import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import LanguageSelector from "./LanguageSelector";
import AuthButtons from "./AuthButtons";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDropdownEnter = (name: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveDropdown(name);
  };

  const handleDropdownLeave = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 200);
  };

  const getTranslation = (key: string, fallback: string) => {
    try {
      return t(key) || fallback;
    } catch {
      return fallback;
    }
  };

  const scrollToElement = (elementId: string) => {
    setActiveDropdown(null);
    setIsOpen(false);
    setTimeout(() => {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.location.href = `/about#${elementId}`;
      }
    }, 100);
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/98 backdrop-blur-xl shadow-lg dark:bg-gray-900/98"
          : "bg-white dark:bg-gray-900"
      } border-b border-gray-100 dark:border-gray-800`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img
                src="/images/logo.png"
                alt="DERN SEED"
                className="w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute -inset-1 bg-green-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-xl font-poppins text-green-700 dark:text-green-400 leading-none">
                DERN SEED
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-inter tracking-wider">
                {getTranslation("certified_seeds", "CERTIFIED SEEDS")}
              </div>
            </div>
          </Link>

          <DesktopNav
            activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown}
            handleDropdownEnter={handleDropdownEnter}
            handleDropdownLeave={handleDropdownLeave}
            scrollToElement={scrollToElement}
            getTranslation={getTranslation}
            dropdownRef={dropdownRef}
          />

          <div className="hidden lg:flex items-center gap-2">
            <LanguageSelector
              language={language}
              setLanguage={setLanguage}
              getTranslation={getTranslation}
            />
            <button
              type="button"
              onClick={toggleTheme ?? (() => undefined)}
              className="p-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-400 hover:bg-green-50/50 dark:hover:bg-green-900/20 transition-all duration-300"
              aria-label={getTranslation("theme_toggle_aria", "Toggle theme")}
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <AuthButtons getTranslation={getTranslation} />
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-400 hover:bg-green-50/50 dark:hover:bg-green-900/20 transition-all duration-300"
            aria-label={getTranslation("menu_toggle_aria", "Toggle menu")}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <MobileNav
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          mobileAboutOpen={mobileAboutOpen}
          setMobileAboutOpen={setMobileAboutOpen}
          mobileProductsOpen={mobileProductsOpen}
          setMobileProductsOpen={setMobileProductsOpen}
          theme={theme}
          toggleTheme={toggleTheme ?? (() => undefined)}
          language={language}
          setLanguage={(value) => setLanguage(value as typeof language)}
          scrollToElement={scrollToElement}
          getTranslation={getTranslation}
        />
      </div>
    </nav>
  );
}