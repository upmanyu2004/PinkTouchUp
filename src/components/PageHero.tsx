import type { ReactNode } from "react";
import { Petals } from "@/components/decor";
import Reveal from "@/components/Reveal";

export default function PageHero({
  eyebrow,
  title,
  copy,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  copy?: string;
  children?: ReactNode;
}) {
  return (
    <section className="grain relative overflow-hidden bg-gradient-to-b from-blush via-cream to-cream pb-10 pt-32 sm:pb-14 sm:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-20 h-96 w-96 rounded-full bg-blush-deep/60 blur-3xl"
      />
      <Petals count={6} />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="gold-rule text-[0.7rem] font-medium uppercase tracking-[0.32em] text-gold">
            {eyebrow}
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-5xl font-medium leading-[1.02] tracking-tight text-ink sm:text-6xl">
            {title}
          </h1>
          {copy && (
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
              {copy}
            </p>
          )}
          {children}
        </Reveal>
      </div>
    </section>
  );
}
