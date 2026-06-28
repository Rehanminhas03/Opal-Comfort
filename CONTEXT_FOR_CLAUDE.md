# Opal Comfort — Project Brief for Claude

> Paste or point Claude at this file at the start of a session so it understands the
> project before you ask for changes. Update this file whenever something below changes.

---

## 1. What this is

A **production marketing / lead-generation website** for a real UK client, **Opal Comfort** —
a bespoke (made-to-order) **bed & sofa maker** based in Wakefield, West Yorkshire.

- It is **NOT an eCommerce store** — there is no cart, no checkout, no online payment.
- Every call-to-action is **"Enquire Now" / "Get a Quote"** → phone, WhatsApp, or contact form.
- Goal: look premium, build trust, and turn visitors into enquiries.

**Business facts**
- Tagline: *"Crafted for Rest, Designed for Comfort."*
- Products: bespoke beds, ottoman beds, sleigh beds, divans, upholstered beds, sofas.
- Custom: your fabric, your colour, your size.
- Price range: **£500–£5,000**. Lead time: **~2 weeks**.
- Trading ~3–4 years, **no physical showroom**.
- Phone / WhatsApp: **07831213807** (international: `447831213807`).
- Delivered & installed across the UK.

---

## 2. Tech stack (important — read before editing)

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** — **CSS-first config**. There is **NO `tailwind.config.js`**.
  All design tokens live in the `@theme { ... }` block in [app/globals.css](src/app/globals.css).
- **framer-motion** for animations, **lucide-react** for icons.
- Fonts via `next/font`: **Playfair Display** (headings, `font-display`) + **DM Sans** (body, `font-body`).
- Run locally: `npm run dev`. Build: `npm run build`.

⚠️ **Gotcha:** `lucide-react` v1 removed brand icons (Instagram/Facebook). Use generic glyphs.

---

## 3. Brand / design system

Defined as tokens in [app/globals.css](src/app/globals.css). "Warm British luxury" — sage green + gold on ivory (never pure white).

| Token            | Hex       | Use                         |
|------------------|-----------|-----------------------------|
| `ivory`          | `#FAF7F2` | Page background             |
| `warm-white`     | `#F2EDE6` | Alt section background      |
| `sage`           | `#2C4A3E` | Primary brand green         |
| `sage-light`     | `#3D6B5C` |                             |
| `sage-dark`      | `#1E3329` |                             |
| `gold`           | `#B8935A` | Accent / CTAs / underlines  |
| `gold-light`     | `#D4AC75` |                             |
| `gold-pale`      | `#F0E4CC` |                             |
| `charcoal`       | `#1E1E1E` | Body text                   |
| `cream-border`   | `#E8E0D5` | Borders                     |

Use them as Tailwind utilities: `bg-sage`, `text-gold`, `bg-ivory`, `border-cream-border`,
`font-display`, `font-body`, etc.

---

## 4. Structure

**All source code lives under `src/`**: `src/app` (routes), `src/components`, `src/lib`. The `@/*`
import alias maps to `src/*` (tsconfig.json). `public/` stays at the project root (so image paths are
still `/images/...`, `/hero/...`). Config files (next.config.ts, postcss, eslint) stay at root.

The site is **multi-page** (Next.js App Router). Navbar, Footer, and the floating WhatsApp button
live in [app/layout.tsx](src/app/layout.tsx) so they persist site-wide.

**Data — single source of truth:** all product/business data lives in
[lib/catalogue.ts](src/lib/catalogue.ts) (v2). Components import from it — never hardcode product data.
Exports: `BUSINESS, SIZE_CHARTS, EXTRA_SIZES, BASE_TYPES, HEADBOARD, FULFILMENT_LABELS, BED_MODELS,
STYLE_BASE_AVAILABILITY, SOFA_MODELS, MATTRESSES, ACCESSORIES, PRICING_EXAMPLES, ENQUIRY_FIELDS,
FABRIC_COLLECTIONS` (plus their types).

**Enquiry pipeline:** two channels. (1) The main quote/contact flow uses
[components/EnquiryForm.tsx](src/components/EnquiryForm.tsx) which **POSTs to `/api/enquiry`** AND offers a
WhatsApp fallback. (2) [lib/enquiry.ts](src/lib/enquiry.ts) provides the WhatsApp helpers used everywhere:
`buildWhatsAppUrl`, `openWhatsApp`, `resolveBaseTypes` (merges base types via `STYLE_BASE_AVAILABILITY`),
and `buildQuoteHref` (→ `/contact?product=&message=`). The specialized `/bespoke` and `/fabric-sample`
forms stay WhatsApp-only (they collect a postal address / fabric multi-pick, not email).

**Backend:** [app/api/enquiry/route.ts](src/app/api/enquiry/route.ts) — POST with validation, honeypot, and
best-effort rate limit. Emails via **Resend IF `RESEND_API_KEY` + `ENQUIRY_TO_EMAIL`/`ENQUIRY_FROM_EMAIL`
are set**; otherwise it accepts the lead and no-ops (WhatsApp is the live channel). See
[.env.example](.env.example). GA4 is env-gated via `NEXT_PUBLIC_GA_ID` ([components/Analytics.tsx](src/components/Analytics.tsx)).

**SEO:** per-page metadata, [app/sitemap.ts](src/app/sitemap.ts), [app/robots.ts](src/app/robots.ts), dynamic
[app/opengraph-image.tsx](src/app/opengraph-image.tsx), `metadataBase` in layout, and JSON-LD via
[components/JsonLd.tsx](src/components/JsonLd.tsx) (LocalBusiness on `/`, Product on bed pages).

**Routes:**
- `/` — homepage: `Hero` (next/image, CTAs → /contact + WhatsApp), `TrustBar`, `ProductCategories`
  (→ /beds, /sofas, /mattresses), `BespokeProcess`, `FabricsSection` (→ /fabrics, /fabric-sample),
  `AboutSection`, `Testimonials`, `DeliverySection`, `FAQSection`, `ContactSection` (embeds `EnquiryForm`).
- `/contact` — `EnquiryForm` (reads `?product`/`?message`); primary "Get a Quote" target site-wide.
- `/beds` + `/beds/[slug]` — `BedsBrowser` / `Configurator` (base → size → headboard → fabric → WhatsApp;
  fabric step has a live preview + "order a free sample"). Static from `BED_MODELS`.
- `/sofas` + `/sofas/[slug]` — `SofaConfigurator`. `/mattresses`, `/fabrics`, `/fabric-sample`, `/bespoke`.
- `/privacy`, `/terms`, `/cookies` — draft legal pages.

**Reusable components:** `components/catalogue/` (`FabricSwatch`, `FabricPicker` single/multi,
`CatalogueCard`, `BedsBrowser` — reads `?base=`). `PageHero`, `EnquiryForm`, `PlaceholderImage`
(next/image + gradient fallback), `Wordmark`, `JsonLd`, `Analytics`, `MostLoved` (curated row),
`Newsletter` (+ `/api/subscribe`). Shared/layout: `Navbar` (shrinks on scroll, **Beds mega-menu**,
embeds `AnnouncementBar` — dismissible USP bar), `Footer`, `WhatsAppButton` (desktop-only),
`MobileCtaBar` (mobile sticky Get-a-Quote), `ScrollProgress` (top gold bar), `AnimateIn` (scroll-reveal
used on every section). **Scroll animation:** ScrollProgress + hero ken-burns (`.animate-kenburns`) + per-section `AnimateIn`
(staggered via `delay` in TrustBar/DeliverySection/cards). **Motion polish:** `CountUp` +
`StatsStrip` (count-up numbers), `PlaceholderImage` fades/un-blurs on load, primary CTAs use
`.btn-press`/`.btn-sheen` (globals.css). **Accessibility:** everything honours
`prefers-reduced-motion` (CSS media query neutralises loops; `AnimateIn`/`CountUp` use framer-motion
`useReducedMotion`). **All images use next/image** (no raw `<img>`); remote hosts whitelisted in
[next.config.ts](next.config.ts).

**No prices, no cart, no checkout anywhere.** Internal supplier/brand refs (`brandRef`, "Duke",
"Land of Furniture", R&S, TopTier) must never be rendered publicly.

---

## 5. Placeholders — NOT final, pending client sign-off

These are flagged in the code and must be confirmed before going live:

- **Email:** `hello@opalcomfort.co.uk` (placeholder)
- **All imagery:** currently Unsplash stock — needs real product/fabric photos
- **Testimonials:** the 3 reviews are DUMMY
- **Policies:** delivery-free / warranty / returns wording not confirmed

---

## 6. How to ask Claude for changes

Be specific about **which section** and **what outcome**. Examples that work well:

- "In `ProductCategories`, add a new category 'Headboards' with the same card style."
- "Make the Hero CTA buttons gold instead of sage."
- "The fabric marquee scrolls too fast — slow it down." (it's the `animate-scroll` keyframe in globals.css)
- "Add a new FAQ: 'Do you deliver to Scotland?'"
- "Swap the placeholder email everywhere for `sales@opalcomfort.co.uk`."
- "Add a new section after About showing our 5-year guarantee."

For brand/colour changes, mention the token name (e.g. "darken `gold`") so Claude edits `@theme`.

When something changes structurally, ask Claude to **update this file** too.
