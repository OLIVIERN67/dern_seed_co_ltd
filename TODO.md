# i18n Implementation TODO

## Step 1: Inventory & keys
- [x] Inspect existing i18n setup (LanguageContext + i18n.ts + translations.ts)
- [ ] Enumerate every user-facing string across client pages/components

## Step 2: Implement translations dictionary
- [ ] Expand `client/src/i18n/translations.ts` with complete keys for:
  - Navigation + mega menu + dropdown labels
  - Footer + newsletter + policy links + contact details + copyright
  - Home page sections + features + products + services + testimonials + blog preview + CTA + contact preview
  - About/Services/Gallery/Products/Blog/Contact/Auth/NotFound pages
  - Form labels/placeholders/select options, validation messages, success/error notifications
  - Accessibility labels (aria-label/title) and button titles where present
  - SEO titles/descriptions/keywords

## Step 3: Wire UI to use translations
- [ ] Update Navigation/Footer/WhatsAppButton/ManusDialog to use `t(...)`
- [ ] Update every page to use `t(...)` and to generate data arrays from translated strings

## Step 4: SEO localization
- [ ] Update each page’s `applySeo(...)` call to use translations for title/description/keywords

## Step 5: Validate
- [ ] Run TypeScript build/check
- [ ] Smoke test language switching + localStorage persistence
- [ ] Verify all forms show translated errors/success messages

