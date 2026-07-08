# TODO - DERN SEED Website Improvements

## Phase 1 — Discovery (already started)
- [x] Inspect frontend pages: Home, About, Products, Services, Gallery, Blog, Contact
- [x] Inspect backend server + existing routes/controllers (no contact/inquiry/blog-doc endpoints found yet)
- [x] Confirm repo lacks required backend functionality for: contact delivery, product inquiry + confirmation email, blog document upload/download

## Phase 2 — Backend implementation (will start next)
- [ ] Add email sending service (nodemailer) with env-based SMTP
- [ ] Add DB migrations/tables for:
  - [ ] contact_messages
  - [ ] product_inquiries
  - [ ] blog_documents
- [ ] Add backend routes/controllers:
  - [ ] POST /api/contact (save + send email notification)
  - [ ] POST /api/product-inquiries (save + send confirmation email)
  - [ ] Admin upload for blog documents
  - [ ] Public GET list + download URLs for blog documents

## Phase 3 — Frontend integration (skipping i18n for now)
- [ ] Wire Contact page to backend /api/contact and implement real submission + validation + working hours Mon–Fri
- [ ] Replace Google Maps embed with required link
- [ ] Update Blog page to use backend blog-documents list/download and fix Read More behavior
- [ ] Verify Products inquiries submit flow triggers backend and shows success state

## Phase 4 — UI page fixes (text/images/buttons)
- [ ] Home: reduce hero text sizing; keep Father Alexandre welcome at top
- [ ] About: add Staff Administration section + replace images with local assets
- [ ] Products: ensure dropdown shows only product list; use profile seed images
- [ ] Services: add photos per service + multiple images + per-service Read More expand/collapse
- [ ] Gallery: enrich required collections incl. logo + Father Alexandre photo + product photos
- [ ] Remove external placeholder/unsplash images where possible

## Phase 5 — SEO & Quality
- [ ] Ensure proper meta tags + schema on all pages
- [ ] Fix domain/canonical/robots issues for indexing
- [ ] Run frontend/backend builds and smoke tests

## Phase 6 — Testing
- [ ] Test flows:
  - [ ] Contact submit -> backend success
  - [ ] Product inquiry -> backend success + confirmation email
  - [ ] Blog doc upload/download (admin + public)
- [ ] Verify responsiveness on desktop/tablet/mobile

