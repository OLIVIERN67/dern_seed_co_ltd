export const productCategories = [
  { nameKey: "nav_product_irish_potato", fallback: "Irish Potato Seed" },
  { nameKey: "nav_product_bean", fallback: "Bean Seed" },
  { nameKey: "nav_product_maize", fallback: "Maize Seed" },
  { nameKey: "nav_product_wheat", fallback: "Wheat Seed" },
  { nameKey: "nav_product_soybean", fallback: "Soybean Seed" }
];

export const aboutMenuItems = [
  { nameKey: "nav_about_mission", fallback: "Our Mission", href: "/about#mission" },
  { nameKey: "nav_about_vision", fallback: "Our Vision", href: "/about#vision" },
  { nameKey: "nav_about_values", fallback: "Core Values", href: "/about#values" },
  { nameKey: "nav_about_goals", fallback: "Strategic Goals", href: "/about#goals" },
  { nameKey: "nav_about_what_we_do", fallback: "What We Do", href: "/about#what-we-do" },
  { nameKey: "nav_about_team", fallback: "Our Team", href: "/about#staff-administration", isHash: true },
];

export const navItems = [
  { name: "nav_home", href: "/" },
  { name: "nav_about", href: "/about", dropdown: aboutMenuItems },
  { name: "nav_products", href: "/products", dropdown: productCategories },
  { name: "nav_services", href: "/services" },
  { name: "nav_gallery", href: "/gallery" },
  { name: "nav_blog", href: "/blog" },
  { name: "nav_contact", href: "/contact" },
];

export const languages = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "rw", label: "Kinyarwanda", flag: "🇷🇼" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
];