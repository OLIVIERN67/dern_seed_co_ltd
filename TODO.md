# Project TODOs - DERN SEED CO LTD

## Completed Tasks ✅
- [x] **Fix Homepage Background**: Removed duplicate slideshow and implemented single high-quality hero image with fade-in animation.
- [x] **UI Design & Layout**: Increased padding, improved grid systems, and established typography hierarchy.
- [x] **Consistent Color Theme**: Applied agriculture-themed palette (forest green, harvest gold) across all pages.
- [x] **Mobile Responsiveness**: Implemented mobile-first design with responsive text and button sizing.
- [x] **Navigation Enhancement**: Added hover states, sticky header, and improved mega-menu styling.
- [x] **Product Section Fixes**: Removed naming duplications and improved card layouts.
- [x] **Performance Optimization**: Added lazy loading and async decoding to all images.
- [x] **Conversion Optimization**: Strengthened CTA sections with dual buttons and improved copy.
- [x] **Trust Signals**: Added certification badges and social proof.
- [x] **SEO Implementation**: Added meta tags to Blog, Contact, and Gallery pages.
- [x] **Frontend–Backend Authentication**: Vite dev proxy (`/api` → `:8000`) plus configurable `VITE_API_BASE_URL`; login and signup fully wired through `client/src/lib/api.ts` with loading states and toast feedback.
- [x] **Database Initialization**: Real bcrypt hash for default admin (`admin@dernseed.com` / `Admin123!`) in `schema.sql`; verified end-to-end login. Change the password after first production login.
- [x] **Backend Route Cleanup**: Removed redundant empty files (`routes/auth/index.ts`, `routes/users/index.ts`, `routes/orders/index.ts`, `middleware/dummy.ts`, `middleware/authzFix.txt`); fixed `/me` vs `/:id` route-ordering bug in farmers and employees routes; added `/api/health` endpoint.
- [x] **WhatsApp Integration**: Floating WhatsApp button on every page (`components/WhatsAppButton.tsx`), configurable via `VITE_WHATSAPP_NUMBER`.
- [x] **Dynamic Testimonials**: New `testimonials` table + `/api/testimonials` CRUD API; Home page loads testimonials from the backend with a static fallback.
- [x] **Analytics Integration**: Google Analytics 4 via `client/src/lib/analytics.ts`; SPA page-view tracking; enabled by setting `VITE_GA_MEASUREMENT_ID` (no-op when unset). Removed the broken umami placeholder script.
- [x] **Full-Stack Deployment**: CI/CD workflow now verifies (type-check + build) both apps, deploys the frontend via FTP, and optionally deploys the backend via SSH/PM2 with schema migration. See `DEPLOYMENT.md`.

## Deferred (requires business input, not code) ⏸️
- [ ] Monitor site analytics for improved engagement — requires a GA4 property; set `VITE_GA_MEASUREMENT_ID` to activate (code already in place).
- [ ] A/B test CTA button colors and copy — requires live traffic and an experimentation tool; deferred until after launch.
- [ ] Gather real customer testimonials — the dynamic system is ready; new entries can be added through `POST /api/testimonials` (authenticated). Content collection is a business task.
