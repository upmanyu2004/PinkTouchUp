import type { ReactNode } from "react";
import { Sparkle } from "lucide-react";
import { cn } from "@/lib/cn";

/* ————— Section heading: eyebrow + display title + optional copy ————— */
export function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "center",
  tone = "ink",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  copy?: string;
  align?: "center" | "left";
  tone?: "ink" | "cream";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      <p
        className={cn(
          "flex items-center gap-3 eyebrow",
          align === "center" && "justify-center",
          tone === "cream" ? "text-gold-soft" : "text-gold",
        )}
      >
        <Sparkle className="size-3.5" strokeWidth={1.5} />
        {eyebrow}
      </p>
      <h2
        className={cn(
          "mt-4 font-display text-4xl font-medium leading-[1.05] tracking-tight text-balance sm:text-5xl",
          tone === "cream" ? "text-cream" : "text-ink",
        )}
      >
        {title}
      </h2>
      {copy && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed",
            tone === "cream" ? "text-cream/65" : "text-ink-soft",
          )}
        >
          {copy}
        </p>
      )}
    </div>
  );
}

/* ————— Infinite marquee band ————— */
export function Marquee({ items, className }: { items: string[]; className?: string }) {
  const row = [...items, ...items];
  return (
    <div
      className={cn("relative overflow-hidden py-5", className)}
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee items-center gap-8 pr-8">
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className={cn(
              "flex items-center gap-8 whitespace-nowrap",
              i % 2 === 0
                ? "font-display text-2xl italic text-rouge/80"
                : "text-[0.78rem] font-medium uppercase tracking-[0.3em] text-ink-soft",
            )}
          >
            {item}
            <Sparkle className="size-3.5 shrink-0 text-gold" strokeWidth={1.5} />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ————— Drifting petals (pure CSS) ————— */
export function Petals({ count = 7 }: { count?: number }) {
  const petals = Array.from({ length: count }, (_, i) => ({
    left: `${(i * 137) % 100}%`,
    delay: `${(i * 1.7) % 9}s`,
    duration: `${8 + ((i * 3) % 6)}s`,
    size: 10 + ((i * 5) % 14),
    opacity: 0.25 + ((i * 13) % 40) / 100,
  }));
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {petals.map((p, i) => (
        <span
          key={i}
          className="absolute -top-6 block animate-petal rounded-[70%_30%_60%_40%] bg-gradient-to-br from-rose-soft to-blush-deep"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
}

/* ————— Spinning circular wordmark badge ————— */
export function CircleBadge({ className }: { className?: string }) {
  return (
    <div className={cn("relative grid size-28 place-items-center", className)}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 animate-spin-slow">
        <defs>
          <path id="badge-circle" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
        </defs>
        <text className="fill-ink text-[8.2px] font-medium uppercase tracking-[0.24em]">
          <textPath href="#badge-circle">
            Pink Touch Up · Jaipur · Your Moment ·
          </textPath>
        </text>
      </svg>
      <span className="grid size-12 place-items-center rounded-full bg-gradient-to-br from-rose to-rouge text-white shadow-soft">
        <Sparkle className="size-5" strokeWidth={1.5} />
      </span>
    </div>
  );
}

/* ————— Honest price note (prices not published by the salon) ————— */
export function PriceNote({ price, className }: { price: number | null; className?: string }) {
  if (price === null) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold-soft/25 px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-[#8a6a33]",
          className,
        )}
      >
        Price on request
      </span>
    );
  }
  return (
    <span className={cn("text-sm font-semibold text-ink", className)}>
      from ₹{price.toLocaleString("en-IN")}
    </span>
  );
}
