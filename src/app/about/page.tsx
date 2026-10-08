import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Flower2, Gem, HeartHandshake, MapPin, Sparkles } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { SectionHeading } from "@/components/decor";
import { CtaBanner } from "@/components/home/HomeInfo";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The story and philosophy of Pink Touch Up Beauty Parlour — a ladies-only beauty parlour in Jaipur devoted to gentle craft, honest care and everyday glamour.",
};

const VALUES = [
  {
    icon: HeartHandshake,
    title: "Gentle, always",
    copy: "We believe a parlour should feel like a friend's home — unhurried, warm and judgement-free.",
  },
  {
    icon: Gem,
    title: "Craft over shortcuts",
    copy: "From brow mapping to bridal base work, we take the long, careful way because it shows.",
  },
  {
    icon: Flower2,
    title: "Honest beauty",
    copy: "We'll always tell you what your skin and hair truly need — never upsell what they don't.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title={
          <>
            A little pink parlour with a{" "}
            <em className="text-gradient-rose">big heart</em>
          </>
        }
        copy="Pink Touch Up began with a simple wish: to give the women of Jaipur a beauty space that feels personal, gentle and quietly luxurious."
      />

      {/* story */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-3 rounded-[2.4rem] border border-gold/40"
              />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-lift">
                <Image
                  src="/img/salon.jpg"
                  alt="Inside Pink Touch Up Beauty Parlour — blush interiors, arched mirrors and warm lights"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="card-soft absolute -bottom-6 -right-3 flex items-center gap-3 px-5 py-4 sm:-right-6">
                <MapPin className="size-5 text-rose" strokeWidth={1.75} />
                <div>
                  <p className="text-[0.6rem] font-medium uppercase tracking-[0.2em] text-ink-soft">
                    Rooted in
                  </p>
                  <p className="font-display text-lg font-semibold text-ink">
                    Jaipur, the Pink City
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <SectionHeading
              align="left"
              eyebrow="Why we exist"
              title={
                <>
                  Beauty that feels like{" "}
                  <em className="text-gradient-rose">care</em>
                </>
              }
            />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-soft">
              <p>
                In a city that has celebrated beauty for centuries — in its
                rose-hued walls, its jewellery, its textiles — we wanted to
                create a parlour that honours that heritage in an everyday way.
                Not a place you rush through, but one you look forward to.
              </p>
              <p>
                At Pink Touch Up, every ritual is done the slow, careful way:
                brows mapped to your face, facials matched to your skin on the
                day, bridal looks rehearsed until they feel like you — only
                more luminous. We keep our space ladies-only, our tools
                sanitised, and our advice honest.
              </p>
              <p>
                Whether it&apos;s your wedding morning or a Wednesday brow
                tidy, you&apos;ll get the same thing from us: our full
                attention, and a little moment that&apos;s entirely yours.
              </p>
            </div>
            <Link
              href="/book"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose to-rouge px-7 py-3.5 text-xs font-medium uppercase tracking-[0.16em] text-white shadow-soft transition hover:brightness-110"
            >
              Experience it yourself
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* values */}
      <section className="bg-shell py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="What we stand for"
              title={
                <>
                  Three simple <em className="text-gradient-rose">promises</em>
                </>
              }
            />
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={0.07 * i}>
                <div className="card-soft h-full p-8 text-center transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
                  <span className="mx-auto grid size-14 place-items-center rounded-full bg-gradient-to-br from-blush to-blush-deep text-rouge">
                    <v.icon className="size-6" strokeWidth={1.5} />
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-semibold text-ink">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{v.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* craft strip */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { src: "/img/bridal.jpg", label: "Bridal mornings" },
            { src: "/img/brows.jpg", label: "The perfect arch" },
            { src: "/img/facial.jpg", label: "Slow skincare" },
          ].map((t, i) => (
            <Reveal key={t.src} delay={0.06 * i}>
              <figure className="group relative aspect-[3/4] overflow-hidden rounded-[1.6rem] shadow-card">
                <Image
                  src={t.src}
                  alt={t.label}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                <figcaption className="absolute bottom-5 left-5 flex items-center gap-2 font-display text-xl italic text-cream">
                  <Sparkles className="size-4 text-gold-soft" strokeWidth={1.5} />
                  {t.label}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
