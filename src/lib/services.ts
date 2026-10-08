/* ------------------------------------------------------------------ */
/*  Service catalogue                                                   */
/*                                                                     */
/*  The service list reflects a classic ladies' beauty parlour in      */
/*  Jaipur and matches what "Pink Touch Up" branded salons publicly    */
/*  offer elsewhere (bridal & party makeup, hairstyling, skin care).   */
/*                                                                     */
/*  Prices were NOT publicly available for the Jaipur parlour, so      */
/*  `priceFrom` is intentionally null everywhere and the UI shows an   */
/*  elegant "Price on request". Add the salon's real menu prices       */
/*  here and totals will appear automatically across the site.         */
/* ------------------------------------------------------------------ */

export type CategoryId =
  | "hair"
  | "facial"
  | "makeup"
  | "manipedi"
  | "waxing"
  | "threading"
  | "bridal"
  | "packages";

export interface Category {
  id: CategoryId;
  label: string;
  short: string;
  image: string;
  blurb: string;
}

export interface Service {
  id: string;
  category: CategoryId;
  name: string;
  desc: string;
  minutes: number;
  priceFrom: number | null; // null → "Price on request" (update with real menu)
  popular?: boolean;
  addon?: boolean;
}

export const CATEGORIES: Category[] = [
  {
    id: "hair",
    label: "Hair",
    short: "Cuts, colour & care",
    image: "/img/hair.jpg",
    blurb: "Precision cuts, glossy colour and deeply nourishing spa rituals.",
  },
  {
    id: "facial",
    label: "Facial & Skincare",
    short: "Glow rituals",
    image: "/img/facial.jpg",
    blurb: "Clean-ups, fruit glows and luxe gold & diamond facials.",
  },
  {
    id: "makeup",
    label: "Makeup",
    short: "Party to HD glam",
    image: "/img/makeup.jpg",
    blurb: "Soft party looks to long-wear HD and airbrush artistry.",
  },
  {
    id: "manipedi",
    label: "Manicure & Pedicure",
    short: "Hands & feet rituals",
    image: "/img/nails.jpg",
    blurb: "Classic care, spa soaks, polished finishes and nail art.",
  },
  {
    id: "waxing",
    label: "Waxing",
    short: "Silky-smooth skin",
    image: "/img/glow.jpg",
    blurb: "Gentle, hygienic waxing from brows to full body.",
  },
  {
    id: "threading",
    label: "Threading",
    short: "Perfect brow architecture",
    image: "/img/brows.jpg",
    blurb: "Sharp, symmetrical brows and quick full-face clean-ups.",
  },
  {
    id: "bridal",
    label: "Bridal Services",
    short: "Your big day, perfected",
    image: "/img/bridal.jpg",
    blurb: "Signature bridal makeup, draping, styling & pre-bridal glow plans.",
  },
  {
    id: "packages",
    label: "Beauty Packages",
    short: "Curated rituals",
    image: "/img/flatlay.jpg",
    blurb: "Thoughtfully bundled favourites for every occasion.",
  },
];

export const SERVICES: Service[] = [
  /* ————— Hair ————— */
  { id: "hair-cut", category: "hair", name: "Haircut & Styling", desc: "A tailored cut — blunt, layers or face-framing — finished with a soft blow-set.", minutes: 45, priceFrom: null, popular: true },
  { id: "hair-blowdry", category: "hair", name: "Blow-Dry & Heat Styling", desc: "Bouncy blowout, soft curls or sleek straightening for the evening ahead.", minutes: 30, priceFrom: null },
  { id: "hair-spa", category: "hair", name: "Hair Spa Ritual", desc: "Deep-conditioning masque, steam and a slow scalp massage for silk-soft lengths.", minutes: 60, priceFrom: null, popular: true },
  { id: "hair-root", category: "hair", name: "Root Touch-Up Colour", desc: "Seamless grey coverage and regrowth blending at the roots.", minutes: 60, priceFrom: null },
  { id: "hair-global", category: "hair", name: "Global Hair Colour", desc: "Rich, even, all-over colour — from deep browns to statement wine tones.", minutes: 120, priceFrom: null },
  { id: "hair-highlights", category: "hair", name: "Highlights / Balayage", desc: "Sun-kissed dimension painted freehand for a naturally luminous finish.", minutes: 150, priceFrom: null },
  { id: "hair-keratin", category: "hair", name: "Keratin Smoothening", desc: "Frizz-taming keratin therapy for glass-smooth, manageable hair.", minutes: 150, priceFrom: null },
  { id: "hair-rebonding", category: "hair", name: "Hair Rebonding", desc: "Pin-straight, glossy rebonding with a naturally soft fall.", minutes: 180, priceFrom: null },
  { id: "hair-champi", category: "hair", name: "Champi Head Massage", desc: "Warm-oil traditional massage to melt stress and boost scalp health.", minutes: 30, priceFrom: null },

  /* ————— Facial & Skincare ————— */
  { id: "skin-cleanup", category: "facial", name: "Express Clean-Up", desc: "Cleanse, gentle exfoliation, massage and a fresh glow mask — in a lunch break.", minutes: 30, priceFrom: null, popular: true },
  { id: "skin-fruit", category: "facial", name: "Fruit Glow Facial", desc: "Enzyme-rich fruit blends that brighten and refresh dull, tired skin.", minutes: 45, priceFrom: null, popular: true },
  { id: "skin-gold", category: "facial", name: "Gold Radiance Facial", desc: "A luminous gold-infused ritual for festive-ready, lit-from-within skin.", minutes: 60, priceFrom: null },
  { id: "skin-diamond", category: "facial", name: "Diamond Polish Facial", desc: "Micro-polishing and brightening actives for a refined, polished glow.", minutes: 75, priceFrom: null },
  { id: "skin-o3", category: "facial", name: "O3+ Whitening Facial", desc: "Salon-grade de-tan and brightening protocol for an even, fresh tone.", minutes: 60, priceFrom: null },
  { id: "skin-detan", category: "facial", name: "De-Tan Repair Pack", desc: "Targeted tan removal for face, neck and arms after the desert sun.", minutes: 40, priceFrom: null },
  { id: "skin-bleach", category: "facial", name: "Face Bleach", desc: "A quick, gentle brightening bleach for instant freshness.", minutes: 20, priceFrom: null },

  /* ————— Makeup ————— */
  { id: "mu-party", category: "makeup", name: "Party Makeup", desc: "Flawless base, soft glam eyes and lashes — camera-ready in an hour.", minutes: 60, priceFrom: null, popular: true },
  { id: "mu-engagement", category: "makeup", name: "Engagement Makeup", desc: "A romantic, radiant look for your ring ceremony, styled to your outfit.", minutes: 90, priceFrom: null },
  { id: "mu-hd", category: "makeup", name: "HD Makeup", desc: "High-definition, skin-like finish that photographs beautifully all night.", minutes: 90, priceFrom: null },
  { id: "mu-airbrush", category: "makeup", name: "Airbrush Makeup", desc: "Feather-light, long-wear airbrush artistry — the premium celebration choice.", minutes: 120, priceFrom: null },
  { id: "mu-draping", category: "makeup", name: "Saree / Dupatta Draping", desc: "Crisp pleats and secure, elegant drapes in the style of your choice.", minutes: 20, priceFrom: null, addon: true },
  { id: "mu-hairstyle", category: "makeup", name: "Occasion Hairstyling", desc: "Braids, buns, curls or a red-carpet blowout to complete your look.", minutes: 30, priceFrom: null, addon: true },

  /* ————— Manicure & Pedicure ————— */
  { id: "np-manicure", category: "manipedi", name: "Classic Manicure", desc: "Shape, cuticle care, exfoliation, massage and a clean polish finish.", minutes: 30, priceFrom: null },
  { id: "np-pedicure", category: "manipedi", name: "Classic Pedicure", desc: "Soothing soak, callus care, scrub and massage for feather-light feet.", minutes: 45, priceFrom: null, popular: true },
  { id: "np-spa-manicure", category: "manipedi", name: "Spa Manicure", desc: "The classic, elevated — masque, warm towels and an extended massage.", minutes: 45, priceFrom: null },
  { id: "np-spa-pedicure", category: "manipedi", name: "Spa Pedicure", desc: "A deeply relaxing ritual with marine scrubs and a hydrating foot masque.", minutes: 60, priceFrom: null },
  { id: "np-polish", category: "manipedi", name: "Nail Polish Change", desc: "Quick shape refresh and a flawless coat in your shade.", minutes: 15, priceFrom: null, addon: true },
  { id: "np-art", category: "manipedi", name: "Nail Art (Full Set)", desc: "Hand-painted art — minimal French, florals or festive shimmer.", minutes: 30, priceFrom: null },

  /* ————— Waxing ————— */
  { id: "wax-full-arms", category: "waxing", name: "Full Arms Wax", desc: "Smooth, even waxing with gentle after-soothe care.", minutes: 20, priceFrom: null },
  { id: "wax-half-arms", category: "waxing", name: "Half Arms Wax", desc: "Quick tidy-up for forearms, finished with calming lotion.", minutes: 15, priceFrom: null },
  { id: "wax-full-legs", category: "waxing", name: "Full Legs Wax", desc: "Silky full-leg waxing with hygienic, fresh applicators.", minutes: 25, priceFrom: null },
  { id: "wax-half-legs", category: "waxing", name: "Half Legs Wax", desc: "A swift, smooth finish for lower or upper legs.", minutes: 15, priceFrom: null },
  { id: "wax-underarms", category: "waxing", name: "Underarms Wax", desc: "Gentle, quick and tidy in a few easy minutes.", minutes: 10, priceFrom: null },
  { id: "wax-full-body", category: "waxing", name: "Full Body Wax", desc: "Arms, legs, underarms and back — one smooth session.", minutes: 90, priceFrom: null },
  { id: "wax-face", category: "waxing", name: "Face Wax", desc: "Careful facial waxing for a clean, bright finish.", minutes: 15, priceFrom: null },

  /* ————— Threading ————— */
  { id: "th-brows", category: "threading", name: "Eyebrow Shaping", desc: "Crisp, symmetrical arches mapped to your face — our signature.", minutes: 10, priceFrom: null, popular: true },
  { id: "th-lip", category: "threading", name: "Upper Lip Threading", desc: "A clean, quick finish in minutes.", minutes: 5, priceFrom: null },
  { id: "th-forehead", category: "threading", name: "Forehead Threading", desc: "A neat hairline and bright, open look.", minutes: 5, priceFrom: null },
  { id: "th-chin", category: "threading", name: "Chin Threading", desc: "Precise, gentle hair removal for the chin area.", minutes: 5, priceFrom: null },
  { id: "th-full-face", category: "threading", name: "Full Face Threading", desc: "Brows, lip, chin and sides — the complete clean-up.", minutes: 20, priceFrom: null, popular: true },

  /* ————— Bridal ————— */
  { id: "br-signature", category: "bridal", name: "Signature Bridal Makeup", desc: "The full bridal transformation — HD or airbrush base, eyes, lashes, hairstyling & draping.", minutes: 180, priceFrom: null, popular: true },
  { id: "br-prebridal", category: "bridal", name: "Pre-Bridal Glow Session", desc: "Polishing body care, facial glow work and massage to prep skin for the big day.", minutes: 90, priceFrom: null },
  { id: "br-trial", category: "bridal", name: "Bridal Trial & Consultation", desc: "Meet your artist, test your look and plan every ritual with total confidence.", minutes: 60, priceFrom: null },
  { id: "br-family", category: "bridal", name: "Family & Guest Makeup", desc: "Elegant party makeup for mothers, sisters and the bride squad.", minutes: 45, priceFrom: null },
  { id: "br-drape", category: "bridal", name: "Bridal Draping & Dupatta Setting", desc: "Secure, photo-perfect drapes and dupatta setting for every ceremony.", minutes: 30, priceFrom: null, addon: true },

  /* ————— Beauty Packages ————— */
  { id: "pk-party", category: "packages", name: "Party-Ready Package", desc: "Party makeup + occasion hairstyling + saree draping — one seamless sitting.", minutes: 110, priceFrom: null, popular: true },
  { id: "pk-maintenance", category: "packages", name: "Monthly Maintenance Ritual", desc: "Brows, upper lip, express clean-up and a polish change — your monthly refresh.", minutes: 60, priceFrom: null },
  { id: "pk-glow", category: "packages", name: "Festive Glow Combo", desc: "Fruit facial + full arms & legs wax + classic pedicure for a head-to-toe glow.", minutes: 135, priceFrom: null },
  { id: "pk-prebridal-plan", category: "packages", name: "Pre-Bridal Radiance Plan", desc: "A curated series of facials, polishing and care in the weeks before your wedding.", minutes: 240, priceFrom: null },
];

/* ————— helpers ————— */

export const serviceById = new Map(SERVICES.map((s) => [s.id, s]));

export function getServices(ids: string[]): Service[] {
  return ids
    .map((id) => serviceById.get(id))
    .filter((s): s is Service => Boolean(s));
}

export function totalMinutes(ids: string[]): number {
  return getServices(ids).reduce((sum, s) => sum + s.minutes, 0);
}

export function totalPrice(ids: string[]): number | null {
  const priced = getServices(ids).filter((s) => s.priceFrom !== null);
  if (getServices(ids).some((s) => s.priceFrom === null)) return null;
  return priced.reduce((sum, s) => sum + (s.priceFrom ?? 0), 0);
}

export function formatMinutes(mins: number): string {
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m === 0 ? `${h} hr` : `${h} hr ${m} min`;
}

export function formatInr(value: number): string {
  return `₹${value.toLocaleString("en-IN")}`;
}
