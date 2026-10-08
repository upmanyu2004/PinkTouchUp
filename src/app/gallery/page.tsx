import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { CtaBanner } from "@/components/home/HomeInfo";
import { BUSINESS } from "@/lib/business";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A peek inside Pink Touch Up Beauty Parlour, Jaipur — bridal artistry, glossy hair, perfect brows, polished nails and our soft pink space.",
};

const TILES: Array<{ src: string; label: string; cat: string; tall?: boolean }> = [
  { src: "/img/hero.jpg", label: "Soft glam, sealed", cat: "Makeup", tall: true },
  { src: "/img/bridal.jpg", label: "The bridal reveal", cat: "Bridal" },
  { src: "/img/nails.jpg", label: "Blush & shine", cat: "Nails" },
  { src: "/img/facial.jpg", label: "Slow skincare", cat: "Skin" },
  { src: "/img/hair.jpg", label: "Gloss therapy", cat: "Hair", tall: true },
  { src: "/img/salon.jpg", label: "Our pink haven", cat: "The Parlour" },
  { src: "/img/brows.jpg", label: "Arch, perfected", cat: "Brows" },
  { src: "/img/glow.jpg", label: "That lit-from-within", cat: "Skin" },
  { src: "/img/makeup.jpg", label: "Brushwork", cat: "Makeup" },
  { src: "/img/flatlay.jpg", label: "Tools of the trade", cat: "Details" },
];

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="The Gallery"
        title={
          <>
            Moments in <em className="text-gradient-rose">pink & gold</em>
          </>
        }
        copy="A little lookbook of our world — the rituals, the details, and the glow our clients carry out the door."
      />

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <div className="grid auto-rows-[15rem] grid-cols-2 gap-4 sm:auto-rows-[17rem] lg:grid-cols-4">
          {TILES.map((t, i) => (
            <Reveal
              key={t.src + i}
              delay={0.05 * (i % 4)}
              className={t.tall ? "row-span-2" : ""}
            >
              <figure className="group relative h-full w-full overflow-hidden rounded-[1.5rem] shadow-card">
                <Image
                  src={t.src}
                  alt={`${t.label} — ${t.cat} at Pink Touch Up Beauty Parlour, Jaipur`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <figcaption className="absolute inset-x-0 bottom-0 translate-y-3 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-[0.6rem] font-medium uppercase tracking-[0.24em] text-gold-soft">
                    {t.cat}
                  </p>
                  <p className="mt-1 font-display text-xl italic text-cream">{t.label}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <div className="card-soft flex flex-col items-center gap-4 rounded-[2rem] bg-gradient-to-r from-blush/70 to-shell p-8 text-center sm:flex-row sm:justify-between sm:text-left">
            <div className="flex items-center gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white text-rouge shadow-card">
                <Camera className="size-5" strokeWidth={1.5} />
              </span>
              <p className="max-w-md text-sm leading-relaxed text-ink-soft">
                We&apos;re preparing our Instagram debut. Until then —{" "}
                <span className="font-medium text-ink">{BUSINESS.hashtagLine}</span>{" "}
                and it may just star here.
              </p>
            </div>
            <Link
              href="/book"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-rose to-rouge px-6 py-3 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-white shadow-soft transition hover:brightness-110"
            >
              Create your own moment
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </section>

      <CtaBanner />
    </>
  );
}
