import { Language, translations } from './translations';

export function getStoredLanguage(): Language | null {
  try {
    const v = localStorage.getItem('lang');
    if (v === 'en' || v === 'rw' || v === 'fr') return v;
    return null;
  } catch {
    return null;
  }
}

export function t(lang: Language, key: string): string {
  const dict = translations[lang] ?? translations.en;
  return dict[key] ?? translations.en[key] ?? key;
}

export function setStoredLanguage(lang: Language) {
  try {
    localStorage.setItem('lang', lang);
  } catch {
    // ignore
  }
}

