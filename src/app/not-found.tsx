import Link from "next/link";
import { ArrowLeft, CalendarHeart } from "lucide-react";
import { Petals } from "@/components/decor";

export default function NotFound() {
  return (
    <section className="grain relative grid min-h-dvh place-items-center overflow-hidden bg-gradient-to-b from-blush via-cream to-shell px-5">
      <Petals count={8} />
      <div className="relative text-center">
        <p className="gold-rule justify-center text-[0.7rem] font-medium uppercase tracking-[0.32em] text-gold">
          Lost in the powder room
        </p>
        <h1 className="mt-6 font-display text-8xl font-semibold tracking-tight text-gradient-rose sm:text-9xl">
          404
        </h1>
        <p className="mx-auto mt-4 max-w-sm text-base leading-relaxed text-ink-soft">
          This page slipped out for a blow-dry. Let&apos;s get you back to the
          good part.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-7 py-3.5 text-xs font-medium uppercase tracking-[0.16em] text-ink transition hover:border-rose hover:text-rouge"
          >
            <ArrowLeft className="size-4" />
            Back home
          </Link>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose to-rouge px-7 py-3.5 text-xs font-medium uppercase tracking-[0.16em] text-white shadow-soft transition hover:brightness-110"
          >
            <CalendarHeart className="size-4" />
            Book an appointment
          </Link>
        </div>
      </div>
    </section>
  );
}
