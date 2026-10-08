import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock, Crown, PartyPopper, Sparkles } from "lucide-react";
import Reveal from "@/components/Reveal";
import { PriceNote, SectionHeading } from "@/components/decor";
import { CATEGORIES, SERVICES, formatMinutes } from "@/lib/services";

/* ————— Featured services ————— */
const FEATURED_IDS = [
  "br-signature",
  "hair-spa",
  "skin-gold",
  "mu-party",
  "th-brows",
  "np-pedicure",
];

export function FeaturedServices() {
  const featured = FEATURED_IDS.map((id) => SERVICES.find((s) => s.id === id)!).map(
    (s) => ({ ...s, cat: CATEGORIES.find((c) => c.id === s.category)! }),
  );

  return (
    <section className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
      <Reveal>
        <SectionHeading
          eyebrow="Most Loved"
          title={
            <>
              Rituals our clients <em className="text-gradient-rose">adore</em>
            </>
          }
          copy="A glimpse of the parlour favourites — from signature bridal artistry to the perfect brow."
        />
      </Reveal>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((s, i) => (
          <Reveal key={s.id} delay={0.06 * i}>
            <Link
              href={`/book?add=${s.id}`}
              className="card-soft group relative block overflow-hidden p-0 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift"
            >
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={s.cat.image}
                  alt={s.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-rouge backdrop-blur">
                  {s.cat.label}
                </span>
                <span className="absolute bottom-4 right-4 grid size-9 place-items-center rounded-full bg-cream/90 text-ink opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100">
                  <ArrowUpRight className="size-4" strokeWidth={1.75} />
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-2xl font-semibold leading-tight text-ink">
                    {s.name}
                  </h3>
                  <span className="mt-1.5 inline-flex shrink-0 items-center gap-1.5 text-[0.72rem] font-medium text-ink-soft">
                    <Clock className="size-3.5 text-rose" strokeWidth={1.75} />
                    {formatMinutes(s.minutes)}
                  </span>
                </div>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-soft">
                  {s.desc}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <PriceNote price={s.priceFrom} />
                  <span className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-rouge transition-transform duration-300 group-hover:translate-x-1">
                    Book now
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10 text-center">
        <Link
          href="/services"
          className="group inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-rouge"
        >
          View the full menu
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          <span className="absolute" />
        </Link>
      </Reveal>
    </section>
  );
}

/* ————— Popular packages ————— */
const PACKAGE_CARDS = [
  {
    id: "br-signature",
    icon: Crown,
    image: "/img/bridal.jpg",
    tag: "The Bride",
    title: "Signature Bridal",
    copy: "HD or airbrush artistry, hairstyling and perfect draping — the full aisle-ready transformation.",
    minutes: 180,
  },
  {
    id: "pk-party",
    icon: PartyPopper,
    image: "/img/makeup.jpg",
    tag: "The Celebration",
    title: "Party-Ready",
    copy: "Makeup, occasion hair and saree draping in one seamless sitting. Walk in, walk out fabulous.",
    minutes: 110,
  },
  {
    id: "pk-glow",
    icon: Sparkles,
    image: "/img/facial.jpg",
    tag: "The Reset",
    title: "Festive Glow",
    copy: "Fruit facial, full arms & legs wax and a classic pedicure — a head-to-toe festive refresh.",
    minutes: 135,
  },
];

export function PopularPackages() {
  return (
    <section className="relative overflow-hidden bg-shell py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-blush-deep/50 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Curated For You"
            title={
              <>
                Packages for every <em className="text-gradient-rose">occasion</em>
              </>
            }
            copy="Thoughtfully bundled rituals — quote shared on enquiry, pampering guaranteed."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {PACKAGE_CARDS.map((p, i) => (
            <Reveal key={p.id} delay={0.08 * i} className={i === 1 ? "lg:-mt-6" : ""}>
              <Link
                href={`/book?add=${p.id}`}
                className="group relative block overflow-hidden rounded-[2rem] shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-lift"
              >
                <div className="relative h-[26rem]">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-7 text-cream">
                  <p className="inline-flex items-center gap-2 rounded-full border border-cream/30 bg-white/10 px-3 py-1 text-[0.62rem] font-medium uppercase tracking-[0.22em] backdrop-blur">
                    <p.icon className="size-3.5 text-gold-soft" strokeWidth={1.75} />
                    {p.tag}
                  </p>
                  <h3 className="mt-3 font-display text-3xl font-semibold">{p.title}</h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-cream/75">
                    {p.copy}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-cream/20 pt-4">
                    <span className="text-[0.72rem] uppercase tracking-[0.18em] text-cream/70">
                      {formatMinutes(p.minutes)} · Price on request
                    </span>
                    <span className="grid size-10 place-items-center rounded-full bg-gradient-to-r from-rose to-rouge text-white transition-transform duration-300 group-hover:rotate-45">
                      <ArrowUpRight className="size-4" strokeWidth={1.75} />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
