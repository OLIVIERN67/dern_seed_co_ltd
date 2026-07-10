import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Home,
  Info,
  Package,
  Wrench,
  Images,
  PenSquare,
  Mail,
  LogIn,
  UserPlus,
  Moon,
  Sun,
  Globe,
  Check,
  Sparkles,
  Award,
  TrendingUp,
  Leaf,
  Shield,
  Users,
} from "lucide-react";
import { Link } from "wouter";
import { cropImages } from "@/lib/cropImages";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";

// Product categories data with icons
const productCategories = [
  {
    name: "Irish Potato Seed",
    icon: cropImages.potato.primary,
    description: "High-altitude adapted, high-yielding varieties",
    varieties: ["Kirundo", "Ndamira", "Gikungu", "Cyerekezo"],
    color: "from-amber-50 to-orange-50",
  },
  {
    name: "Bean Seed",
    icon: cropImages.bean.primary,
    description: "High-yield, disease-tolerant grain varieties",
    varieties: [
      "RWR 3194",
      "RWV 3316",
      "MAC 44",
      "Mwirasi",
      "MBC23",
      "Kigondo",
    ],
    color: "from-green-50 to-emerald-50",
  },
  {
    name: "Maize Seed",
    icon: cropImages.maize.primary,
    description: "Vigorous, high-germination cereal varieties",
    varieties: ["RHMH1520", "PAN661", "H628", "H629"],
    color: "from-yellow-50 to-amber-50",
  },
];

const aboutMenuItems = [
  { name: "Our Mission", href: "/about#mission", icon: Award },
  { name: "Our Vision", href: "/about#vision", icon: Sparkles },
  { name: "Core Values", href: "/about#values", icon: Shield },
  { name: "Strategic Goals", href: "/about#goals", icon: TrendingUp },
  { name: "What We Do", href: "/about#what-we-do", icon: Leaf },
  { name: "Our Team", href: "/about#staff-administration", icon: Users },
];

// Navigation items configuration
const navItems = [
  { name: "nav_home", href: "/", icon: Home },
  { name: "nav_about", href: "/about", icon: Info, dropdown: aboutMenuItems },
  {
    name: "nav_products",
    href: "/products",
    icon: Package,
    dropdown: productCategories,
  },
  { name: "nav_services", href: "/services", icon: Wrench },
  { name: "nav_gallery", href: "/gallery", icon: Images },
  { name: "nav_blog", href: "/blog", icon: PenSquare },
  { name: "nav_contact", href: "/contact", icon: Mail },
];

// Language options
const languages = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "rw", label: "Kinyarwanda", flag: "🇷🇼" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle click outside dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setShowLanguageMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDropdownEnter = (name: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveDropdown(name);
  };

  const handleDropdownLeave = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 200);
  };

  const handleLanguageSelect = (code: string) => {
    setLanguage(code as any);
    setShowLanguageMenu(false);
  };

  // Helper function to get translated text with fallback
  const getTranslation = (key: string, fallback: string) => {
    try {
      return t(key) || fallback;
    } catch {
      return fallback;
    }
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
          {/* Logo */}
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

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map(item => {
              const isActive = activeDropdown === item.name;
              const hasDropdown = item.dropdown && item.dropdown.length > 0;

              if (hasDropdown) {
                const Icon = item.icon;
                return (
                  <div
                    key={item.name}
                    ref={dropdownRef}
                    className="relative"
                    onMouseEnter={() => handleDropdownEnter(item.name)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <button
                      type="button"
                      className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? "text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/30"
                          : "text-gray-600 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-400 hover:bg-green-50/50 dark:hover:bg-green-900/20"
                      }`}
                      aria-expanded={isActive}
                    >
                      <Icon className="w-4 h-4" />
                      <span>
                        {getTranslation(
                          item.name,
                          item.name.replace("nav_", "")
                        )}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isActive ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isActive && (
                      <div className="absolute left-0 top-full mt-2 w-[320px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden animate-fade-in-down z-50">
                        <div className="p-3">
                          {item.name === "nav_products" ? (
                            // Products dropdown with categories
                            <div className="space-y-3">
                              {(item.dropdown as typeof productCategories).map(
                                category => (
                                  <div
                                    key={category.name}
                                    className={`bg-gradient-to-r ${category.color} dark:from-gray-800 dark:to-gray-700 rounded-xl p-4 transition-all duration-300 hover:shadow-lg`}
                                  >
                                    <div className="flex items-start gap-3 mb-2">
                                      <div className="flex-shrink-0 w-10 h-10 bg-white/80 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                                        <img
                                          src={category.icon}
                                          alt={category.name}
                                          className="w-6 h-6 object-contain"
                                        />
                                      </div>
                                      <div>
                                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                                          {category.name}
                                        </h4>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                          {category.description}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 mt-2">
                                      {category.varieties.map(variety => (
                                        <Link
                                          key={variety}
                                          href="/products"
                                          onClick={() =>
                                            setActiveDropdown(null)
                                          }
                                          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs bg-white/80 dark:bg-gray-800/80 hover:bg-green-50 dark:hover:bg-green-900/30 text-gray-700 dark:text-gray-300 rounded-lg transition-colors duration-200"
                                        >
                                          <span className="w-1 h-1 rounded-full bg-green-500" />
                                          {variety}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                )
                              )}
                              <Link
                                href="/products"
                                onClick={() => setActiveDropdown(null)}
                                className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-medium text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors duration-200"
                              >
                                {getTranslation(
                                  "view_all_products",
                                  "View All Products"
                                )}
                                <ArrowRight className="w-4 h-4" />
                              </Link>
                            </div>
                          ) : (
                            // About dropdown
                            <div className="grid grid-cols-2 gap-1.5">
                              {(item.dropdown as typeof aboutMenuItems).map(
                                subItem => {
                                  const SubIcon = subItem.icon;
                                  return (
                                    <Link
                                      key={subItem.name}
                                      href={subItem.href}
                                      onClick={() => setActiveDropdown(null)}
                                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-200 group"
                                    >
                                      <div className="w-8 h-8 rounded-lg bg-green-50 dark:bg-green-900/30 flex items-center justify-center group-hover:bg-green-100 dark:group-hover:bg-green-900/50 transition-colors">
                                        <SubIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
                                      </div>
                                      <span className="font-medium">
                                        {subItem.name}
                                      </span>
                                    </Link>
                                  );
                                }
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-400 hover:bg-green-50/50 dark:hover:bg-green-900/20 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                  <span>
                    {getTranslation(item.name, item.name.replace("nav_", ""))}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Right Side - Language, Theme, Auth */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Language Selector */}
            <div className="relative" ref={langRef}>
              <button
                type="button"
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-400 hover:bg-green-50/50 dark:hover:bg-green-900/20 transition-all duration-300"
                aria-label={getTranslation("language_label", "Select Language")}
              >
                <Globe className="w-4 h-4" />
                <span className="uppercase">{language}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${showLanguageMenu ? "rotate-180" : ""}`}
                />
              </button>

              {showLanguageMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden animate-fade-in-down z-50">
                  <div className="p-1.5">
                    {languages.map(lang => (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => handleLanguageSelect(lang.code)}
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
                        {language === lang.code && (
                          <Check className="w-4 h-4" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-400 hover:bg-green-50/50 dark:hover:bg-green-900/20 transition-all duration-300"
              aria-label={getTranslation("theme_toggle_aria", "Toggle theme")}
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Divider */}
            <div className="w-px h-8 bg-gray-200 dark:bg-gray-700" />

            {/* Auth Buttons */}
            <Link
              href="/login"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-400 hover:bg-green-50/50 dark:hover:bg-green-900/20 transition-all duration-300"
            >
              <LogIn className="w-4 h-4" />
              {getTranslation("nav_login", "Login")}
            </Link>
            <Link
              href="/signup"
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg shadow-green-600/20 hover:shadow-green-600/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              <UserPlus className="w-4 h-4" />
              {getTranslation("nav_signup", "Sign Up")}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-400 hover:bg-green-50/50 dark:hover:bg-green-900/20 transition-all duration-300"
            aria-label={getTranslation("menu_toggle_aria", "Toggle menu")}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 animate-fade-in-down max-h-[calc(100vh-5rem)] overflow-y-auto">
            <div className="py-4 space-y-1">
              {/* Mobile Nav Items */}
              {navItems.map(item => {
                const hasDropdown = item.dropdown && item.dropdown.length > 0;
                const isMobileOpen =
                  item.name === "nav_about"
                    ? mobileAboutOpen
                    : item.name === "nav_products"
                      ? mobileProductsOpen
                      : false;
                const setIsMobileOpen =
                  item.name === "nav_about"
                    ? setMobileAboutOpen
                    : item.name === "nav_products"
                      ? setMobileProductsOpen
                      : () => {};

                if (hasDropdown) {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.name}
                      className="border-b border-gray-100 dark:border-gray-800 last:border-0"
                    >
                      <button
                        type="button"
                        onClick={() => setIsMobileOpen(!isMobileOpen)}
                        className="w-full flex items-center justify-between px-4 py-3.5 text-gray-700 dark:text-gray-300 font-medium hover:text-green-700 dark:hover:text-green-400 transition-colors"
                      >
                        <span className="flex items-center gap-2.5">
                          <Icon className="w-5 h-5" />
                          {getTranslation(
                            item.name,
                            item.name.replace("nav_", "")
                          )}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-300 ${isMobileOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {isMobileOpen && (
                        <div className="pl-10 pr-4 pb-3 space-y-1.5">
                          {item.name === "nav_products"
                            ? // Products dropdown in mobile
                              (item.dropdown as typeof productCategories).map(
                                category => (
                                  <div
                                    key={category.name}
                                    className="mb-3 last:mb-0"
                                  >
                                    <div className="flex items-center gap-2 mb-1.5">
                                      <img
                                        src={category.icon}
                                        alt={category.name}
                                        className="w-5 h-5 object-contain"
                                      />
                                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {category.name}
                                      </span>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                      {category.varieties.map(variety => (
                                        <Link
                                          key={variety}
                                          href="/products"
                                          onClick={() => {
                                            setIsMobileOpen(false);
                                            setIsOpen(false);
                                          }}
                                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs bg-gray-50 dark:bg-gray-800 hover:bg-green-50 dark:hover:bg-green-900/30 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                                        >
                                          <span className="w-1 h-1 rounded-full bg-green-500" />
                                          {variety}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                )
                              )
                            : // About dropdown in mobile
                              (item.dropdown as typeof aboutMenuItems).map(
                                subItem => {
                                  const SubIcon = subItem.icon;
                                  return (
                                    <Link
                                      key={subItem.name}
                                      href={subItem.href}
                                      onClick={() => {
                                        setIsMobileOpen(false);
                                        setIsOpen(false);
                                      }}
                                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-gray-600 dark:text-gray-400 hover:text-green-700 dark:hover:text-green-400 hover:bg-green-50/50 dark:hover:bg-green-900/20 transition-all"
                                    >
                                      <div className="w-7 h-7 rounded-lg bg-green-50 dark:bg-green-900/30 flex items-center justify-center">
                                        <SubIcon className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                                      </div>
                                      {subItem.name}
                                    </Link>
                                  );
                                }
                              )}
                        </div>
                      )}
                    </div>
                  );
                }

                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-2.5 px-4 py-3.5 text-gray-700 dark:text-gray-300 font-medium hover:text-green-700 dark:hover:text-green-400 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    {getTranslation(item.name, item.name.replace("nav_", ""))}
                  </Link>
                );
              })}

              {/* Mobile Divider */}
              <div className="border-t border-gray-200 dark:border-gray-700 my-2" />

              {/* Mobile Language & Theme */}
              <div className="px-4 py-2 flex items-center gap-3">
                <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-800 rounded-xl p-1">
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => {
                        handleLanguageSelect(lang.code);
                        setIsOpen(false);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                        language === lang.code
                          ? "bg-white dark:bg-gray-700 shadow-sm text-green-700 dark:text-green-400"
                          : "text-gray-600 dark:text-gray-400 hover:text-green-700 dark:hover:text-green-400"
                      }`}
                    >
                      {lang.flag}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={toggleTheme}
                  className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-400 transition-all"
                  aria-label={getTranslation(
                    "theme_toggle_aria",
                    "Toggle theme"
                  )}
                >
                  {theme === "dark" ? (
                    <Sun className="w-4 h-4" />
                  ) : (
                    <Moon className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Mobile Auth Buttons */}
              <div className="px-4 pt-2 pb-3 space-y-2">
                <Link
                  href="/login"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border-2 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 font-semibold text-sm hover:bg-green-50 dark:hover:bg-green-900/20 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  <LogIn className="w-4 h-4" />
                  {getTranslation("nav_login", "Login")}
                </Link>
                <Link
                  href="/signup"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold text-sm hover:from-green-700 hover:to-green-800 shadow-lg shadow-green-600/20 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  <UserPlus className="w-4 h-4" />
                  {getTranslation("nav_signup", "Sign Up")}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
