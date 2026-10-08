/* ------------------------------------------------------------------ */
/*  Pink Touch Up Beauty Parlour — central business profile            */
/*                                                                     */
/*  Research note: a publicly verifiable directory listing for the     */
/*  Jaipur branch (address / phone / exact hours / social handles /    */
/*  prices) could not be confirmed online, so values marked            */
/*  "PLACEHOLDER" below are intentional. Replace them with the         */
/*  salon's real details and the whole site updates automatically.     */
/* ------------------------------------------------------------------ */

export const BUSINESS = {
  name: "Pink Touch Up",
  fullName: "Pink Touch Up Beauty Parlour",
  tagline: "Your Beauty, Your Moment.",
  city: "Jaipur",
  region: "Rajasthan",
  country: "India",

  /* PLACEHOLDER — replace with the salon's real phone number */
  phoneDisplay: "+91 90000 00000",
  phoneRaw: "919000000000", // used for tel: and wa.me links

  /* PLACEHOLDER — replace with the exact street address */
  addressLine: "Jaipur, Rajasthan — the Pink City",
  addressNote:
    "Exact address & directions are confirmed on call or WhatsApp when you book.",

  /* Placeholder hours (typical for Jaipur parlours) — update as needed */
  hours: [
    { days: "Monday – Saturday", time: "10:00 AM – 8:00 PM" },
    { days: "Sunday", time: "10:00 AM – 8:00 PM" },
  ],
  hoursNote: "Festival & wedding-season hours may vary — do call ahead.",

  /* PLACEHOLDER socials — add real handles when available */
  instagram: "",
  facebook: "",
  hashtagLine: "Share your look with #PinkTouchUpJaipur",

  /* Salon working window used by the booking engine */
  openTime: "10:00",
  closeTime: "20:00",
  slotStepMinutes: 30,
  bookingLeadMinutes: 60, // earliest same-day slot must be ≥1h from now
  bookingWindowDays: 21, // how far ahead customers can book
} as const;

/** WhatsApp deep link with a prefilled message */
export function whatsappLink(message: string) {
  return `https://wa.me/${BUSINESS.phoneRaw}?text=${encodeURIComponent(message)}`;
}

export function telLink() {
  return `tel:+${BUSINESS.phoneRaw}`;
}
