import Link from "next/link";
import {
  CalendarHeart,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
  Sparkle,
} from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/icons/social";
import Logo from "./Logo";
import { BUSINESS, telLink, whatsappLink } from "@/lib/business";

const NAV = [
  { href: "/services", label: "Services & Menu" },
  { href: "/book", label: "Book Appointment" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-cream">
      {/* soft rose aura */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[52rem] -translate-x-1/2 rounded-full bg-rose/20 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-5 pt-16 sm:px-8">
        <div className="grid gap-12 pb-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* brand */}
          <div>
            <Logo light />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/65">
              {BUSINESS.tagline} A ladies&apos; beauty parlour in the heart of{" "}
              {BUSINESS.city} — where every visit feels like a small celebration.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span
                title="Instagram — link coming soon"
                aria-label="Instagram (coming soon)"
                className="grid size-10 cursor-not-allowed place-items-center rounded-full border border-cream/20 text-cream/50"
              >
                <InstagramIcon className="size-4" />
              </span>
              <span
                title="Facebook — link coming soon"
                aria-label="Facebook (coming soon)"
                className="grid size-10 cursor-not-allowed place-items-center rounded-full border border-cream/20 text-cream/50"
              >
                <FacebookIcon className="size-4" />
              </span>
              <span className="text-[0.68rem] uppercase tracking-[0.22em] text-cream/40">
                Socials launching soon
              </span>
            </div>
          </div>

          {/* explore */}
          <nav aria-label="Footer">
            <h3 className="eyebrow text-gold-soft">Explore</h3>
            <ul className="mt-5 space-y-3">
              {NAV.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group inline-flex items-center gap-2 text-sm text-cream/70 transition-colors hover:text-cream"
                  >
                    <Sparkle className="size-3 text-rose opacity-0 transition-opacity group-hover:opacity-100" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* hours */}
          <div>
            <h3 className="eyebrow text-gold-soft">Opening Hours</h3>
            <ul className="mt-5 space-y-3 text-sm text-cream/70">
              {BUSINESS.hours.map((h) => (
                <li key={h.days} className="flex items-start gap-3">
                  <Clock className="mt-0.5 size-4 shrink-0 text-rose" strokeWidth={1.75} />
                  <span>
                    <span className="block text-cream/90">{h.days}</span>
                    <span className="text-cream/55">{h.time}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* contact */}
          <div>
            <h3 className="eyebrow text-gold-soft">Visit Us</h3>
            <ul className="mt-5 space-y-3 text-sm text-cream/70">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-rose" strokeWidth={1.75} />
                <span>{BUSINESS.addressLine}</span>
              </li>
              <li>
                <a
                  href={telLink()}
                  className="flex items-center gap-3 transition-colors hover:text-cream"
                >
                  <Phone className="size-4 shrink-0 text-rose" strokeWidth={1.75} />
                  {BUSINESS.phoneDisplay}
                </a>
              </li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={whatsappLink("Hello Pink Touch Up! I'd like to book an appointment.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-cream/85 transition hover:border-gold-soft hover:text-cream"
              >
                <MessageCircle className="size-4" strokeWidth={1.75} />
                WhatsApp
              </a>
              <Link
                href="/book"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose to-rouge px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-white transition hover:brightness-110"
              >
                <CalendarHeart className="size-4" strokeWidth={1.75} />
                Book Now
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-cream/10 py-6 text-[0.7rem] uppercase tracking-[0.22em] text-cream/45 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {BUSINESS.fullName}, {BUSINESS.city}
          </p>
          <p className="flex items-center gap-2">
            Crafted with <Sparkle className="size-3 text-gold-soft" /> in the Pink City
          </p>
        </div>
      </div>
    </footer>
  );
}
