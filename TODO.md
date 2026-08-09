re# TODO - Update Background Images Across Non-Home Pages

## Goal
Replace all hero/header and CTA/background images on non-Home pages that currently use external URLs, Unsplash images, or unrelated images with the specified gallery images. Keep all other content unchanged. Do NOT modify Home page.

## Target Images
- P1 = `/gallery/potatoes 1.jpeg`
- SO = `/gallery/soya.jpeg`
- PO = `/gallery/potatoes.jpeg`
- W2 = `/gallery/Wheat (2).jpeg`

## Steps
- [x] About.tsx: Hero -> PO, CTA -> SO
- [x] Gallery.tsx: Hero -> P1, CTA -> W2
- [x] Blog.tsx: Hero -> W2, Newsletter -> SO
- [x] Contact.tsx: Hero -> PO
- [x] Products.tsx: Hero -> P1
- [x] Services.tsx: Hero -> SO, CTA -> PO
- [x] Login.tsx: Left panel bg -> P1
