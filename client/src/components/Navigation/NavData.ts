export const productCategories = [
  { name: "Irish Potato Seed" },
  { name: "Bean Seed" },
  { name: "Maize Seed" },
  { name: "Wheat Seed" },
  { name: "SoyBean Seed" }
];

export const aboutMenuItems = [
  { name: "Our Mission", href: "/about#mission" },
  { name: "Our Vision", href: "/about#vision" },
  { name: "Core Values", href: "/about#values" },
  { name: "Strategic Goals", href: "/about#goals" },
  { name: "What We Do", href: "/about#what-we-do" },
  { name: "Our Team", href: "/about#staff-administration", isHash: true },
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