import Link from "next/link";
import { Sparkle } from "lucide-react";

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Pink Touch Up Beauty Parlour — home"
      className="group inline-flex items-center gap-3"
    >
      <span className="relative grid size-10 place-items-center rounded-full bg-gradient-to-br from-rose to-rouge text-white shadow-soft transition-transform duration-500 group-hover:rotate-[20deg]">
        <Sparkle className="size-4" strokeWidth={1.75} />
        <span className="absolute inset-0 rounded-full ring-1 ring-white/40" />
      </span>
      <span className="leading-none">
        <span
          className={`block font-display text-[1.45rem] font-semibold tracking-tight ${
            light ? "text-cream" : "text-ink"
          }`}
        >
          Pink Touch Up
        </span>
        <span
          className={`mt-1 block text-[0.58rem] font-medium uppercase tracking-[0.34em] ${
            light ? "text-cream/70" : "text-ink-soft"
          }`}
        >
          Beauty Parlour · Jaipur
        </span>
      </span>
    </Link>
  );
}
