import { Link } from "wouter";
import { ChevronDown, Sun, Moon, LogIn, UserPlus } from "lucide-react";
import {
  navItems,
  productCategories,
  aboutMenuItems,
  languages,
} from "./NavData";

interface MobileNavProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  mobileAboutOpen: boolean;
  setMobileAboutOpen: (value: boolean) => void;
  mobileProductsOpen: boolean;
  setMobileProductsOpen: (value: boolean) => void;
  theme: string;
  toggleTheme: () => void; // Fixed: this matches the actual function
  language: string;
  setLanguage: (code: string) => void;
  scrollToElement: (elementId: string) => void;
  getTranslation: (key: string, fallback: string) => string;
}

export default function MobileNav({
  isOpen,
  setIsOpen,
  mobileAboutOpen,
  setMobileAboutOpen,
  mobileProductsOpen,
  setMobileProductsOpen,
  theme,
  toggleTheme,
  language,
  setLanguage,
  scrollToElement,
  getTranslation,
}: MobileNavProps) {
  if (!isOpen) return null;

  const handleLanguageSelect = (code: string) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 animate-fade-in-down max-h-[calc(100vh-5rem)] overflow-y-auto">
      <div className="py-4 space-y-1">
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
                  <span>
                    {getTranslation(item.name, item.name.replace("nav_", ""))}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${isMobileOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isMobileOpen && (
                  <div className="pl-10 pr-4 pb-3 space-y-1.5">
                    {item.name === "nav_products"
                      ? (item.dropdown as typeof productCategories).map(
                          category => (
                            <Link
                              key={category.name}
                              href="/products"
                              onClick={() => {
                                setIsMobileOpen(false);
                                setIsOpen(false);
                              }}
                              className="block px-3 py-2.5 rounded-xl text-sm text-gray-600 dark:text-gray-400 hover:text-green-700 dark:hover:text-green-400 hover:bg-green-50/50 dark:hover:bg-green-900/20 transition-all"
                            >
                              {category.name}
                            </Link>
                          )
                        )
                      : (item.dropdown as typeof aboutMenuItems).map(
                          subItem => {
                            const hashId = subItem.href.split("#")[1];
                            if (subItem.isHash) {
                              return (
                                <button
                                  key={subItem.name}
                                  onClick={() => {
                                    setIsMobileOpen(false);
                                    setIsOpen(false);
                                    scrollToElement(hashId);
                                  }}
                                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-gray-600 dark:text-gray-400 hover:text-green-700 dark:hover:text-green-400 hover:bg-green-50/50 dark:hover:bg-green-900/20 transition-all w-full text-left"
                                >
                                  <div className="w-7 h-7 rounded-lg bg-green-50 dark:bg-green-900/30 flex items-center justify-center" />
                                  {subItem.name}
                                </button>
                              );
                            }
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
                                <div className="w-7 h-7 rounded-lg bg-green-50 dark:bg-green-900/30 flex items-center justify-center" />
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

          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-2.5 px-4 py-3.5 text-gray-700 dark:text-gray-300 font-medium hover:text-green-700 dark:hover:text-green-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {getTranslation(item.name, item.name.replace("nav_", ""))}
            </Link>
          );
        })}

        <div className="border-t border-gray-200 dark:border-gray-700 my-2" />

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
            aria-label={getTranslation("theme_toggle_aria", "Toggle theme")}
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>
        </div>

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
            className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-linear-to-r from-green-600 to-green-700 text-white font-semibold text-sm hover:from-green-700 hover:to-green-800 shadow-lg shadow-green-600/20 transition-all"
            onClick={() => setIsOpen(false)}
          >
            <UserPlus className="w-4 h-4" />
            {getTranslation("nav_signup", "Sign Up")}
          </Link>
        </div>
      </div>
    </div>
  );
}
