/**
 * Opal Comfort — Catalogue Data  (v2)
 * ------------------------------------------------------------------
 * Sources:
 *   - Client brochure + supplier swatch photos (June 2026)
 *   - Client requirements form: "Beds_Website_Form_Simple.docx"
 *
 * v2 adds: Sofas, Mattresses + accessories, Emperor & custom sizes,
 * full base-type set (Divan / Divan Ottoman / Slatted Ottoman / Gaslift),
 * headboard options, ready-made vs made-to-order, contact-form spec,
 * fabric-sample flow data, and confirmed business facts.
 *
 * STACK NOTE: data-only file, no JSX. Image paths are PLACEHOLDERS.
 * Fabric hex values are APPROXIMATE — fine for swatch chips, replace
 * with real photographed tiles later.
 *
 * SUPPLIERS / BRANDS (INTERNAL ONLY — never surface publicly):
 *   R&S Ltd — randscomponents.com — Batley WF17 5AE — 01924 731625
 *   TopTier Components Ltd — 07400882020
 *   "Duke" — brand on the Stepside sofa/bed catalogue (CONFIRM use)
 *   "Land of Furniture" — appears on showroom mattresses/shopfront
 *      (CONFIRM relationship to Opal Comfort before any public mention)
 * ------------------------------------------------------------------
 */

// ─────────────────────────────────────────────────────────────────
// BUSINESS FACTS (from the client form — confirmed)
// ─────────────────────────────────────────────────────────────────

export const BUSINESS = {
  name: "Opal Comfort",
  tagline: "Crafted for Rest, Designed for Comfort",
  yearsTrading: "3–4 years",
  location: "Wakefield, West Yorkshire, UK",
  showroom: false,
  phone: "07831213807",
  whatsapp: "447831213807",
  email: null, // CLIENT HAS NOT CREATED ONE YET — placeholder only
  priceRange: { minGBP: 500, maxGBP: 5000 },
  standardLeadTime: "1–2 weeks", // listed / made-to-order beds
  bespokeLeadTime: "2+ weeks", // fully custom / bespoke designs
  deliversNationwideUK: true,
  installs: true,
  oldItemRemoval: true,
  fabricSampleService: true, // they POST samples
  customColours: true,
  sellsMattresses: true,
  replyTime: "Same day",
  usps: [
    "Handmade in the UK",
    "Huge variety of styles",
    "You choose the fabric, material and colour",
    "Everything made to order",
    "UK-wide delivery, installation, and old-item removal",
  ],
  intro:
    "Bespoke, made-to-order beds and sofas — customers choose their exact " +
    "material and colour. Ready-made beds also available. Everything handled " +
    "in-house, from build to delivery.",
};

// ─────────────────────────────────────────────────────────────────
// SIZE CHARTS  (inches, W × L)
// ─────────────────────────────────────────────────────────────────

export type SizeRow = { name: string; widthIn: number; lengthIn: number };
export type SizeChart = { id: string; label: string; rows: SizeRow[]; note?: string };

export const SIZE_CHARTS: Record<string, SizeChart> = {
  standard: {
    id: "standard", label: "Standard",
    rows: [
      { name: "3ft Single", widthIn: 38, lengthIn: 84 },
      { name: "4ft Small Double", widthIn: 50, lengthIn: 84 },
      { name: "4ft 6in Double", widthIn: 56, lengthIn: 84 },
      { name: "5ft Kingsize", widthIn: 63, lengthIn: 86 },
      { name: "6ft Superking", widthIn: 74, lengthIn: 86 },
    ],
  },
  wide: {
    id: "wide", label: "Wide frame",
    rows: [
      { name: "3ft Single", widthIn: 40, lengthIn: 84 },
      { name: "4ft Small Double", widthIn: 52, lengthIn: 84 },
      { name: "4ft 6in Double", widthIn: 58, lengthIn: 84 },
      { name: "5ft Kingsize", widthIn: 66, lengthIn: 86 },
      { name: "6ft Superking", widthIn: 76, lengthIn: 86 },
    ],
  },
  large: {
    id: "large", label: "Large frame",
    rows: [
      { name: "3ft Single", widthIn: 44, lengthIn: 84 },
      { name: "4ft Small Double", widthIn: 56, lengthIn: 84 },
      { name: "4ft 6in Double", widthIn: 62, lengthIn: 84 },
      { name: "5ft Kingsize", widthIn: 69, lengthIn: 86 },
      { name: "6ft Superking", widthIn: 80, lengthIn: 86 },
    ],
  },
  ottoman: {
    id: "ottoman", label: "Ottoman",
    note: 'Length is base length. Add an additional 3" for the headboard.',
    rows: [
      { name: "3ft Single", widthIn: 36, lengthIn: 75 },
      { name: "4ft Small Double", widthIn: 48, lengthIn: 75 },
      { name: "4ft 6in Double", widthIn: 54, lengthIn: 75 },
      { name: "5ft Kingsize", widthIn: 60, lengthIn: 78 },
      { name: "6ft Superking", widthIn: 72, lengthIn: 78 },
    ],
  },
  gaslift: {
    id: "gaslift", label: "Gaslift",
    rows: [
      { name: "3ft Single", widthIn: 38, lengthIn: 85 },
      { name: "4ft Small Double", widthIn: 50, lengthIn: 85 },
      { name: "4ft 6in Double", widthIn: 56, lengthIn: 85 },
      { name: "5ft Kingsize", widthIn: 63, lengthIn: 87 },
      { name: "6ft Superking", widthIn: 74, lengthIn: 87 },
    ],
  },
};

/**
 * Extra sizes the client offers beyond the brochure charts.
 * Emperor dimensions NOT given in brochure — confirm exact W×L with client.
 */
export const EXTRA_SIZES = {
  emperor: { name: "6ft 6in Emperor", widthIn: null, lengthIn: null, confirm: true },
  custom: { name: "Custom / made to measure", note: "Any size built to order." },
};

// ─────────────────────────────────────────────────────────────────
// BASE TYPES  (construction the brochure text confirms)
// ─────────────────────────────────────────────────────────────────

export type BaseType = "divan" | "divanOttoman" | "slattedOttoman" | "gaslift";

export const BASE_TYPES: Record<BaseType, { label: string; blurb: string; sizeChart: keyof typeof SIZE_CHARTS }> = {
  divan:          { label: "Divan / Standard", blurb: "Classic base, optional headboard.", sizeChart: "standard" },
  divanOttoman:   { label: "Divan Ottoman", blurb: "Lift-up base, full-footprint storage, solid board.", sizeChart: "ottoman" },
  slattedOttoman: { label: "Slatted Ottoman", blurb: "Lift-up base with slatted top for airflow.", sizeChart: "ottoman" },
  gaslift:        { label: "Gaslift", blurb: "Gas-strut lift base for easy under-bed storage.", sizeChart: "gaslift" },
};

// ─────────────────────────────────────────────────────────────────
// HEADBOARD OPTIONS  (from brochure construction notes)
// ─────────────────────────────────────────────────────────────────

export const HEADBOARD = {
  standardHeightIn: 50,
  minHeightIn: 50,
  maxHeightIn: 100,
  splitAvailable: true, // two-piece for low ceilings / tight staircases
  splitNote:
    "Headboards can be built in two separate pieces — useful for properties " +
    "with low ceilings and tight staircases.",
};

// ─────────────────────────────────────────────────────────────────
// FULFILMENT
// ─────────────────────────────────────────────────────────────────

export type Fulfilment = "made-to-order" | "ready-made";
export const FULFILMENT_LABELS: Record<Fulfilment, string> = {
  "made-to-order": "Made to order · 1–2 week lead time",
  "ready-made": "Ready made · available now",
};

// ─────────────────────────────────────────────────────────────────
// BED MODELS
// Styles offered on multiple bases are merged via STYLE_BASE_AVAILABILITY.
// ─────────────────────────────────────────────────────────────────

export type BedModel = {
  name: string;
  slug: string;
  baseTypes: BaseType[];
  sizeChartByBase: Partial<Record<BaseType, keyof typeof SIZE_CHARTS>>;
  fulfilment: Fulfilment;
  image: string;
  imagePlaceholder: boolean;
  description: string;
  descriptionPlaceholder: boolean;
};

const ph = (slug: string) => `/images/beds/${slug}.jpg`;
const PLACEHOLDER_DESC =
  "Bespoke, hand-built to order. Choose your size, base, headboard height and " +
  "fabric — crafted for rest, designed for comfort.";

const mkBed = (
  name: string,
  chart: keyof typeof SIZE_CHARTS,
): BedModel => {
  const slug = name.toLowerCase();
  return {
    name, slug,
    baseTypes: ["divan"],
    sizeChartByBase: { divan: chart },
    fulfilment: "made-to-order",
    image: ph(slug),
    imagePlaceholder: true,
    description: PLACEHOLDER_DESC,
    descriptionPlaceholder: true,
  };
};

export const BED_MODELS: BedModel[] = [
  // Standard divan styles
  ...["Florida","Florence","Zara","Horizon","Eva","Delux","Hilton","Vogue",
      "Arizona","Chicago","Tokyo","Louise","Nina","Boston","Sydney","Sleigh",
      "Chesterfield"].map((n) => mkBed(n, "standard")),
  // Wide-frame styles
  ...["Ella","Seline","Chelsea","Houston","Kensington","Cambridge"].map((n) => mkBed(n, "wide")),
  // Large-frame styles
  ...["Miami","Madrid","Paris"].map((n) => mkBed(n, "large")),
];

/**
 * Styles offered across MULTIPLE base types (merge by style name in UI).
 * NOTE: per brochure text, ALL styles can in principle be built as divan,
 * divan ottoman, or slatted ottoman. The map below records what the brochure
 * EXPLICITLY pictured; treat the others as "available on request".
 */
export const STYLE_BASE_AVAILABILITY: Record<string, BaseType[]> = {
  arizona: ["divan", "divanOttoman", "slattedOttoman"],
  zara:    ["divan", "divanOttoman", "slattedOttoman"],
  seline:  ["divan", "divanOttoman", "slattedOttoman", "gaslift"],
  florida: ["divan", "gaslift"],
};

// ─────────────────────────────────────────────────────────────────
// SOFAS  (client makes bespoke made-to-order sofas)
// ─────────────────────────────────────────────────────────────────

export type SofaModel = {
  name: string;
  slug: string;
  brandRef?: string;       // INTERNAL: catalogue/brand source, do not show
  confirm?: boolean;       // needs client confirmation
  sizesCm?: { name: string; widthCm: number; lengthCm: number; headboardCm?: number }[];
  features?: string[];
  image: string;
  imagePlaceholder: boolean;
  description: string;
};

export const SOFA_MODELS: SofaModel[] = [
  {
    name: "Stepside",
    slug: "stepside",
    brandRef: "Duke",
    confirm: true, // confirm whether Opal makes this or it's a supplier ref
    sizesCm: [
      { name: "Single", widthCm: 97, lengthCm: 212, headboardCm: 140 },
      { name: "Small Double", widthCm: 128, lengthCm: 212, headboardCm: 140 },
      { name: "Double", widthCm: 143, lengthCm: 212, headboardCm: 140 },
    ],
    features: ["6-panel headboard", "Black piping around edges", "Chrome feet"],
    image: "/images/sofas/stepside.jpg",
    imagePlaceholder: true,
    description:
      "Made-to-order sofa, upholstered in your choice of fabric and colour.",
  },
  {
    name: "Bespoke Sofa",
    slug: "bespoke-sofa",
    image: "/images/sofas/bespoke.jpg",
    imagePlaceholder: true,
    description:
      "Fully made-to-order sofa, built to your exact design, fabric and colour. " +
      "Share your idea and we'll build it.",
  },
];

// ─────────────────────────────────────────────────────────────────
// MATTRESSES + SLEEP ACCESSORIES
// Types seen in photos. Names/specs/prices need a full list from client.
// ─────────────────────────────────────────────────────────────────

export type Mattress = {
  name: string;
  slug: string;
  type: string;
  fulfilment: Fulfilment;
  examplePriceGBP?: number; // illustrative only — confirm full price list
  image: string;
  imagePlaceholder: boolean;
  confirm?: boolean;
};

export const MATTRESSES: Mattress[] = [
  { name: "Chenille Firm Sprung", slug: "chenille-firm-sprung", type: "Sprung",
    fulfilment: "ready-made", examplePriceGBP: 499, image: "/images/mattresses/chenille-firm.jpg", imagePlaceholder: true, confirm: true },
  { name: "Pocket Sprung (Regency)", slug: "pocket-sprung-regency", type: "Pocket sprung",
    fulfilment: "ready-made", image: "/images/mattresses/pocket-regency.jpg", imagePlaceholder: true, confirm: true },
  { name: "Memory Foam / Cooling Gel", slug: "memory-foam-cooling-gel", type: "Memory foam",
    fulfilment: "ready-made", image: "/images/mattresses/memory-foam.jpg", imagePlaceholder: true, confirm: true },
  { name: "Tencel / Cashmere Top", slug: "tencel-cashmere", type: "Hybrid / luxury cover",
    fulfilment: "ready-made", image: "/images/mattresses/tencel-cashmere.jpg", imagePlaceholder: true, confirm: true },
];

export const ACCESSORIES = [
  { name: "Cooling Gel Memory Foam Contour Pillow", slug: "cooling-gel-pillow",
    image: "/images/accessories/cooling-gel-pillow.jpg", imagePlaceholder: true },
];

/** Example real pricing point seen in showroom (illustrative). */
export const PRICING_EXAMPLES = [
  { item: "4ft6 Chenille Firm Sprung Mattress", priceGBP: 499 },
  { item: "4ft6 Florida Bed Frame", wasGBP: 399, nowGBP: 299 },
];

// ─────────────────────────────────────────────────────────────────
// CONTACT / ENQUIRY FORM FIELDS  (per client form spec)
// ─────────────────────────────────────────────────────────────────

export const ENQUIRY_FIELDS = [
  { id: "name", label: "Your name", required: true },
  { id: "email", label: "Email address", required: true },
  { id: "phone", label: "Phone number", required: true },
  { id: "postcode", label: "Postcode", required: false, help: "To check delivery area" },
  { id: "product", label: "What are you interested in?", required: false },
  { id: "budget", label: "Budget range", required: false },
  { id: "message", label: "Your message", required: false, type: "textarea" },
  { id: "heardVia", label: "How did you hear about us?", required: false },
];

// ─────────────────────────────────────────────────────────────────
// FABRIC COLLECTIONS  (hex APPROXIMATE — chips until real tiles exist)
// ─────────────────────────────────────────────────────────────────

export type Fabric = { name: string; hex: string };
export type FabricCollection = { id: string; label: string; texture: string; colours: Fabric[] };

export const FABRIC_COLLECTIONS: FabricCollection[] = [
  { id: "marble", label: "Marble", texture: "Mottled, marbled velvet with a soft sheen.",
    colours: [
      { name: "Peacock Marble", hex: "#3E7C7B" }, { name: "Ocean Marble", hex: "#A9C4D4" },
      { name: "Stone Marble", hex: "#C9B79C" }, { name: "Mink Marble", hex: "#9B8472" },
      { name: "Oatmeal Marble", hex: "#D8CBB3" }, { name: "Gunmetal Marble", hex: "#5A5E63" },
      { name: "Steel Marble", hex: "#8E9499" }, { name: "Platinum Marble", hex: "#BFC2C4" },
      { name: "Silver Marble", hex: "#CDD0D2" },
    ] },
  { id: "coniston", label: "Coniston", texture: "Linen-look woven fabric, matte and textured.",
    colours: [
      { name: "Blue Coniston", hex: "#3F5E8C" }, { name: "Emerald Coniston", hex: "#4E7C5E" },
      { name: "Charcoal Coniston", hex: "#4A4D52" }, { name: "Armour Coniston", hex: "#8A8D86" },
      { name: "Pink Coniston", hex: "#C9A0A6" }, { name: "Ox-Blood Coniston", hex: "#7B3B42" },
      { name: "Turmeric Coniston", hex: "#C9952F" }, { name: "Mink Coniston", hex: "#9C8A78" },
      { name: "Almond Coniston", hex: "#D6C7B0" },
    ] },
  { id: "plush", label: "Plush", texture: "Smooth, dense plush velvet.",
    colours: [
      { name: "Burnt Orange Plush", hex: "#C2641F" }, { name: "Green Plush", hex: "#3C6B4A" },
      { name: "Mocca Plush", hex: "#6E5848" }, { name: "Pebble Plush", hex: "#B6AC97" },
      { name: "Cream Plush", hex: "#E6DCC4" }, { name: "Ice Plush", hex: "#CFD8D2" },
      { name: "Pink Plush", hex: "#D9A7B0" }, { name: "Willow Plush", hex: "#BFC9A8" },
      { name: "Claret Plush", hex: "#6E2433" }, { name: "Blue Plush", hex: "#2E4C7E" },
      { name: "Turquoise Plush", hex: "#2E8C8E" }, { name: "Mink Plush", hex: "#8A7A6A" },
      { name: "Sky Plush", hex: "#8FB3D4" }, { name: "Mustard Plush", hex: "#C9A227" },
      { name: "Black Plush", hex: "#2A2A2C" }, { name: "Grey Plush", hex: "#7E8186" },
      { name: "Silver Plush", hex: "#B7BABD" }, { name: "Steel Plush", hex: "#949AA0" },
    ] },
  { id: "naples", label: "Naples", texture: "Soft suede-look matte finish.",
    colours: [
      { name: "Black Naples", hex: "#2A2A2C" }, { name: "Purple Naples", hex: "#4A3A5C" },
      { name: "Blue Naples", hex: "#34557E" }, { name: "Charcoal Naples", hex: "#45484D" },
      { name: "Slate Naples", hex: "#6E747A" }, { name: "Silver Naples", hex: "#AEB2B5" },
      { name: "Seal Grey Naples", hex: "#8A8F93" }, { name: "Mink Naples", hex: "#9C8C79" },
      { name: "Sand Naples", hex: "#CBB897" }, { name: "Cream Naples", hex: "#E2D7BE" },
    ] },
  { id: "crush", label: "Crush", texture: "Crushed velvet with a high-shine, textured surface.",
    colours: [
      { name: "Pink Crush", hex: "#D29AA6" }, { name: "Pewter Crush", hex: "#9A8E84" },
      { name: "Aubergine Crush", hex: "#5A2E45" }, { name: "Black Crush", hex: "#2A2A2C" },
      { name: "Lilac Crush", hex: "#9E8FB0" }, { name: "Red Crush", hex: "#A8232E" },
      { name: "Denim Crush", hex: "#4C6A8C" }, { name: "Teal Crush", hex: "#2E7E86" },
      { name: "Chocolate Crush", hex: "#4E382C" }, { name: "Mink Crush", hex: "#9C8A77" },
      { name: "Champagne Crush", hex: "#D8C7A2" }, { name: "Gold Crush", hex: "#C2A14E" },
      { name: "Grey Crush", hex: "#8E9195" }, { name: "Silver Crush", hex: "#BFC2C5" },
    ] },
];

/** Additional textures seen in supplier swatches — confirm before adding:
 *  Boucle / Teddy (sherpa), plain Suede in extra tones, Chenille, Linen, Leather. */
