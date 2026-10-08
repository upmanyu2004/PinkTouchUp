import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CalendarHeart,
  Clock,
  Gem,
  HeartHandshake,
  MapPin,
  MessageCircle,
  Phone,
  Quote,
  ShieldCheck,
  Sparkle,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import { Petals, SectionHeading } from "@/components/decor";
import { BUSINESS, telLink, whatsappLink } from "@/lib/business";

/* ————— Why choose us ————— */
const PILLARS = [
  {
    icon: HeartHandshake,
    title: "A ladies-only haven",
    copy: "A warm, private, women-only space where you can truly unwind and be yourself.",
  },
  {
    icon: Gem,
    title: "Quality-first products",
    copy: "Trusted, branded ranges for skin, hair and colour — chosen for Indian skin tones.",
  },
  {
    icon: ShieldCheck,
    title: "Hygiene, obsessively",
    copy: "Fresh linens, sanitised tools and single-use essentials for every single guest.",
  },
  {
    icon: CalendarHeart,
    title: "Effortless booking",
    copy: "Reserve online in two minutes, pay at the parlour. No advance, no fuss.",
  },
];

export function WhyUs() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
      <div className="grid items-end gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <SectionHeading
            align="left"
            eyebrow="Why Pink Touch Up"
            title={
              <>
                Beauty, handled with{" "}
                <em className="text-gradient-rose">care & craft</em>
              </>
            }
            copy="We're building the kind of parlour we would want to visit ourselves — gentle hands, honest advice and a little bit of everyday glamour."
          />
          <Link
            href="/about"
            className="group mt-8 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-rouge"
          >
            Our story
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={0.07 * i}>
              <div className="card-soft group h-full p-7 transition-all duration-500 hover:-translate-y-1 hover:border-rose/30 hover:shadow-lift">
                <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-blush to-blush-deep text-rouge transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                  <p.icon className="size-5" strokeWidth={1.5} />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-ink">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ————— Gallery preview ————— */
const TILES = [
  { src: "/img/bridal.jpg", label: "Bridal artistry", span: "row-span-2" },
  { src: "/img/nails.jpg", label: "Perfect polish", span: "" },
  { src: "/img/hair.jpg", label: "Glossy blowouts", span: "" },
  { src: "/img/salon.jpg", label: "Our pink haven", span: "" },
  { src: "/img/glow.jpg", label: "That glow", span: "" },
];

export function GalleryPreview() {
  return (
    <section className="relative overflow-hidden bg-ink py-20 text-cream sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-rouge/30 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              align="left"
              tone="cream"
              eyebrow="The Gallery"
              title={
                <>
                  Soft pink moments, <em className="text-gold-soft">captured</em>
                </>
              }
            />
            <Link
              href="/gallery"
              className="group inline-flex items-center gap-2 rounded-full border border-cream/25 px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-cream/85 transition hover:border-gold-soft hover:text-cream"
            >
              View all
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 grid auto-rows-[11rem] grid-cols-2 gap-4 sm:auto-rows-[13rem] lg:grid-cols-4">
          {TILES.map((t, i) => (
            <Reveal key={t.src} delay={0.06 * i} className={t.span}>
              <Link
                href="/gallery"
                className="group relative block h-full w-full overflow-hidden rounded-[1.4rem]"
              >
                <Image
                  src={t.src}
                  alt={t.label}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
                <p className="absolute bottom-4 left-4 font-display text-lg italic text-cream">
                  {t.label}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ————— Testimonials — honest first-review state ————— */
export function Testimonials() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <Petals count={6} />
      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Reveal>
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-gradient-to-br from-blush to-blush-deep text-rouge shadow-card">
            <Quote className="size-7" strokeWidth={1.5} />
          </span>
          <h2 className="mt-7 font-display text-4xl font-medium tracking-tight text-ink sm:text-5xl">
            Your words <em className="text-gradient-rose">belong here</em>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink-soft">
            Our online doors have just opened, and we&apos;re keeping this space
            for real voices only — no borrowed praise. After your visit, tell us
            how your moment felt, and your words could be the first to grace
            this page.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="flex min-h-36 flex-col items-center justify-center gap-2 rounded-[1.4rem] border border-dashed border-rose/35 bg-white/60 p-6 backdrop-blur"
              >
                <Sparkle className="size-4 text-gold" strokeWidth={1.5} />
                <p className="font-display text-lg italic text-rouge/70">
                  Your review could live here
                </p>
                <BadgeCheck className="size-4 text-ink-soft/50" strokeWidth={1.5} />
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <a
            href={whatsappLink("Hello Pink Touch Up! I visited recently and would love to share my experience.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/70 px-7 py-3.5 text-xs font-medium uppercase tracking-[0.18em] text-ink transition hover:border-rose hover:text-rouge"
          >
            <MessageCircle className="size-4" strokeWidth={1.75} />
            Share your experience
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ————— Visit us ————— */
export function VisitUs() {
  return (
    <section className="bg-shell py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <div className="card-soft h-full p-8 sm:p-10">
              <SectionHeading
                align="left"
                eyebrow="Visit Us"
                title={
                  <>
                    Find us in the{" "}
                    <em className="text-gradient-rose">Pink City</em>
                  </>
                }
              />
              <ul className="mt-8 space-y-6">
                <li className="flex items-start gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-blush text-rouge">
                    <MapPin className="size-5" strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="font-medium text-ink">{BUSINESS.addressLine}</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                      {BUSINESS.addressNote}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-blush text-rouge">
                    <Clock className="size-5" strokeWidth={1.75} />
                  </span>
                  <div>
                    {BUSINESS.hours.map((h) => (
                      <p key={h.days} className="text-sm text-ink">
                        <span className="font-medium">{h.days}:</span>{" "}
                        <span className="text-ink-soft">{h.time}</span>
                      </p>
                    ))}
                    <p className="mt-1 text-xs text-ink-soft/80">{BUSINESS.hoursNote}</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-blush text-rouge">
                    <Phone className="size-5" strokeWidth={1.75} />
                  </span>
                  <div>
                    <a
                      href={telLink()}
                      className="font-medium text-ink transition-colors hover:text-rouge"
                    >
                      {BUSINESS.phoneDisplay}
                    </a>
                    <p className="mt-1 text-sm text-ink-soft">
                      Call or WhatsApp for enquiries & same-day appointments.
                    </p>
                  </div>
                </li>
              </ul>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose to-rouge px-6 py-3 text-xs font-medium uppercase tracking-[0.16em] text-white shadow-soft transition hover:brightness-110"
                >
                  <CalendarHeart className="size-4" strokeWidth={1.75} />
                  Book a visit
                </Link>
                <a
                  href={whatsappLink("Hello Pink Touch Up! I have a question.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-6 py-3 text-xs font-medium uppercase tracking-[0.16em] text-ink transition hover:border-rose hover:text-rouge"
                >
                  <MessageCircle className="size-4" strokeWidth={1.75} />
                  WhatsApp us
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative h-full min-h-80 overflow-hidden rounded-[2rem] border border-line shadow-card">
              <iframe
                title="Map — Jaipur, Rajasthan"
                src="https://www.google.com/maps?q=Jaipur,+Rajasthan,+India&z=12&output=embed"
                className="absolute inset-0 h-full w-full border-0 [filter:saturate(0.75)_sepia(0.12)_hue-rotate(-18deg)]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-cream/60 to-transparent p-4">
                <p className="inline-flex items-center gap-2 rounded-full bg-cream/90 px-4 py-2 text-[0.66rem] font-medium uppercase tracking-[0.2em] text-rouge shadow-card backdrop-blur">
                  <MapPin className="size-3.5" strokeWidth={1.75} />
                  Jaipur · Rajasthan
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ————— Final CTA banner ————— */
export function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-rose via-rouge to-ink py-20 text-center text-cream sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.35)_0,transparent_35%),radial-gradient(circle_at_80%_70%,rgba(233,214,178,0.45)_0,transparent_40%)]"
      />
      <Petals count={5} />
      <div className="relative mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal>
          <p className="gold-rule justify-center text-[0.7rem] font-medium uppercase tracking-[0.32em] text-gold-soft">
            An appointment away
          </p>
          <h2 className="mt-6 font-display text-5xl font-medium tracking-tight sm:text-6xl">
            Ready for <em className="text-gold-soft">your moment?</em>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-cream/75">
            Choose your ritual, pick a time that suits you, and leave the rest
            to us. Bookings confirmed on WhatsApp — pay when you visit.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/book"
              className="inline-flex items-center gap-3 rounded-full bg-cream px-8 py-4 text-sm font-medium uppercase tracking-[0.16em] text-rouge shadow-lift transition-all duration-300 hover:bg-white hover:brightness-105"
            >
              <CalendarHeart className="size-5" strokeWidth={1.75} />
              Book Appointment
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-cream/35 px-7 py-4 text-sm font-medium uppercase tracking-[0.16em] text-cream transition hover:border-cream hover:bg-white/10"
            >
              Browse the menu
              <ArrowRight className="size-4" strokeWidth={1.75} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
