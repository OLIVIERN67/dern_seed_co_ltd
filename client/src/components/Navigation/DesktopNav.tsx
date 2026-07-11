import type { RefObject } from "react";
import { Link } from "wouter";
import { ChevronDown, ArrowRight } from "lucide-react";
import { navItems, productCategories, aboutMenuItems } from "./NavData";

interface DesktopNavProps {
  activeDropdown: string | null;
  setActiveDropdown: (value: string | null) => void;
  handleDropdownEnter: (name: string) => void;
  handleDropdownLeave: () => void;
  scrollToElement: (elementId: string) => void;
  getTranslation: (key: string, fallback: string) => string;
  dropdownRef: RefObject<HTMLDivElement | null>;
}

export default function DesktopNav({
  activeDropdown,
  setActiveDropdown,
  handleDropdownEnter,
  handleDropdownLeave,
  scrollToElement,
  getTranslation,
  dropdownRef,
}: DesktopNavProps) {
  return (
    <div className="hidden lg:flex items-center gap-1">
      {navItems.map(item => {
        const isActive = activeDropdown === item.name;
        const hasDropdown = item.dropdown && item.dropdown.length > 0;

        if (hasDropdown) {
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
                <span>{getTranslation(item.name, item.name.replace("nav_", ""))}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isActive ? "rotate-180" : ""}`} />
              </button>

              {isActive && (
                <div className="absolute left-0 top-full mt-2 overflow-hidden animate-fade-in-down z-50">
                  {item.name === "nav_products" ? (
                    <div className="w-60 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 p-3">
                      <div className="space-y-2">
                        {(item.dropdown as typeof productCategories).map(category => (
                          <Link
                            key={category.name}
                            href="/products"
                            onClick={() => setActiveDropdown(null)}
                            className="block px-4 py-3 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-200"
                          >
                            {category.name}
                          </Link>
                        ))}
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                          <Link
                            href="/products"
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-medium text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors duration-200"
                          >
                            {getTranslation("view_all_products", "View All Products")}
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-105 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 p-3">
                      <div className="grid grid-cols-2 gap-1.5">
                        {(item.dropdown as typeof aboutMenuItems).map(subItem => {
                          const hashId = subItem.href.split('#')[1];
                          if (subItem.isHash) {
                            return (
                              <button
                                key={subItem.name}
                                onClick={() => {
                                  setActiveDropdown(null);
                                  scrollToElement(hashId);
                                }}
                                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-200 group w-full text-left"
                              >
                                <div className="w-8 h-8 rounded-lg bg-green-50 dark:bg-green-900/30 flex items-center justify-center group-hover:bg-green-100 dark:group-hover:bg-green-900/50 transition-colors" />
                                <span className="font-medium">{subItem.name}</span>
                              </button>
                            );
                          }
                          return (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              onClick={() => setActiveDropdown(null)}
                              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-200 group"
                            >
                              <div className="w-8 h-8 rounded-lg bg-green-50 dark:bg-green-900/30 flex items-center justify-center group-hover:bg-green-100 dark:group-hover:bg-green-900/50 transition-colors" />
                              <span className="font-medium">{subItem.name}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
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
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-400 hover:bg-green-50/50 dark:hover:bg-green-900/20 transition-all duration-300"
          >
            <span>{getTranslation(item.name, item.name.replace("nav_", ""))}</span>
          </Link>
        );
      })}
    </div>
  );
}