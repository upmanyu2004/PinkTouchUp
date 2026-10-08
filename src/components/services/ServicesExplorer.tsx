"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Brush,
  Check,
  Clock,
  Crown,
  Eye,
  Feather,
  Gift,
  Hand,
  LayoutGrid,
  Minus,
  Plus,
  Scissors,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { PriceNote } from "@/components/decor";
import {
  CATEGORIES,
  SERVICES,
  formatMinutes,
  totalMinutes,
  type CategoryId,
} from "@/lib/services";
import { readSelection, writeSelection } from "@/lib/selection";

const CATEGORY_ICONS: Record<CategoryId | "all", typeof Scissors> = {
  all: LayoutGrid,
  hair: Scissors,
  facial: Sparkles,
  makeup: Brush,
  manipedi: Hand,
  waxing: Feather,
  threading: Eye,
  bridal: Crown,
  packages: Gift,
};

export default function ServicesExplorer({
  initialSelected = [],
  compact = false,
}: {
  initialSelected?: string[];
  compact?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<CategoryId | "all">("all");
  const [selected, setSelected] = useState<string[]>(initialSelected);
  const [, startTransition] = useTransition();

  /* hydrate from localStorage on mount */
  useEffect(() => {
    const stored = readSelection();
    if (stored.length) startTransition(() => setSelected(stored));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SERVICES.filter((s) => {
      const inCat = cat === "all" || s.category === cat;
      const inQuery =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.desc.toLowerCase().includes(q);
      return inCat && inQuery;
    }).sort((a, b) => Number(b.popular ?? false) - Number(a.popular ?? false));
  }, [query, cat]);

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      writeSelection(next);
      return next;
    });
  };

  const mins = totalMinutes(selected);

  return (
    <div>
      {/* search + filters */}
      <div className="sticky top-[4.4rem] z-30 -mx-2 bg-cream/90 px-2 py-3 backdrop-blur-xl sm:top-[4.6rem]">
        <div className="card-soft flex items-center gap-3 rounded-full px-5 py-1.5">
          <Search className="size-4.5 shrink-0 text-ink-soft" strokeWidth={1.75} />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search facials, waxing, bridal…"
            aria-label="Search services"
            className="w-full bg-transparent py-2.5 text-sm text-ink outline-none placeholder:text-ink-soft/70"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="grid size-7 place-items-center rounded-full text-ink-soft transition hover:bg-blush hover:text-rouge"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        <div className="hide-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1">
          {[{ id: "all" as const, label: "All" }, ...CATEGORIES].map((c) => {
            const Icon = CATEGORY_ICONS[c.id as CategoryId | "all"];
            const active = cat === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setCat(c.id as CategoryId | "all")}
                aria-pressed={active}
                className={cn(
                  "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-[0.72rem] font-medium uppercase tracking-[0.14em] transition-all duration-300",
                  active
                    ? "border-transparent bg-gradient-to-r from-rose to-rouge text-white shadow-soft"
                    : "border-line bg-white text-ink-soft hover:border-rose/50 hover:text-rouge",
                )}
              >
                <Icon className="size-3.5" strokeWidth={1.75} />
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* results count */}
      <p className="mt-6 text-[0.7rem] font-medium uppercase tracking-[0.24em] text-ink-soft" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "ritual" : "rituals"}
        {cat !== "all" && ` · ${CATEGORIES.find((c) => c.id === cat)?.label}`}
      </p>

      {/* grid */}
      {filtered.length === 0 ? (
        <div className="card-soft mt-6 flex flex-col items-center gap-3 p-14 text-center">
          <Search className="size-8 text-rose-soft" strokeWidth={1.25} />
          <p className="font-display text-2xl italic text-ink">Nothing matches “{query}”</p>
          <p className="text-sm text-ink-soft">
            Try a different word — or browse a category above.
          </p>
        </div>
      ) : (
        <div className={cn("mt-5 grid gap-4", compact ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3")}>
          {filtered.map((s) => {
            const isSel = selected.includes(s.id);
            const catLabel = CATEGORIES.find((c) => c.id === s.category)?.label;
            return (
              <article
                key={s.id}
                className={cn(
                  "card-soft group relative flex flex-col p-5 transition-all duration-300",
                  isSel
                    ? "border-rose/50 bg-gradient-to-b from-white to-blush/60 shadow-soft ring-1 ring-rose/30"
                    : "hover:-translate-y-0.5 hover:shadow-soft",
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[0.62rem] font-medium uppercase tracking-[0.2em] text-gold">
                    {catLabel}
                  </span>
                  {s.popular && (
                    <span className="rounded-full bg-blush px-2.5 py-0.5 text-[0.58rem] font-medium uppercase tracking-[0.16em] text-rouge">
                      Loved
                    </span>
                  )}
                </div>
                <h3 className="mt-2.5 font-display text-[1.35rem] font-semibold leading-snug text-ink">
                  {s.name}
                </h3>
                <p className="mt-1.5 line-clamp-2 flex-1 text-[0.83rem] leading-relaxed text-ink-soft">
                  {s.desc}
                </p>
                <div className="mt-4 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 text-[0.72rem] font-medium text-ink-soft">
                    <Clock className="size-3.5 text-rose" strokeWidth={1.75} />
                    {formatMinutes(s.minutes)}
                  </span>
                  <PriceNote price={s.priceFrom} />
                </div>
                <button
                  type="button"
                  onClick={() => toggle(s.id)}
                  aria-pressed={isSel}
                  aria-label={`${isSel ? "Remove" : "Add"} ${s.name} ${isSel ? "from" : "to"} booking`}
                  className={cn(
                    "mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-[0.72rem] font-medium uppercase tracking-[0.16em] transition-all duration-300",
                    isSel
                      ? "bg-gradient-to-r from-rose to-rouge text-white shadow-soft"
                      : "border border-rouge/25 bg-white text-rouge hover:border-rouge hover:bg-rouge hover:text-white",
                  )}
                >
                  {isSel ? (
                    <>
                      <Check className="size-4" strokeWidth={2} />
                      Added — tap to remove
                    </>
                  ) : (
                    <>
                      <Plus className="size-4" strokeWidth={2} />
                      Add to booking
                    </>
                  )}
                </button>
              </article>
            );
          })}
        </div>
      )}

      {/* sticky selection bar */}
      <div
        className={cn(
          "fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 transition-all duration-500",
          selected.length === 0
            ? "pointer-events-none translate-y-24 opacity-0"
            : "translate-y-0 opacity-100",
        )}
        aria-hidden={selected.length === 0}
      >
        <div className="flex w-full max-w-md items-center justify-between gap-3 rounded-full border border-rose/25 bg-ink/95 py-2.5 pl-6 pr-2.5 text-cream shadow-lift backdrop-blur">
          <p className="text-sm">
            <span className="font-semibold text-gold-soft">{selected.length}</span>{" "}
            {selected.length === 1 ? "ritual" : "rituals"}
            <span className="mx-2 text-cream/40">·</span>
            <span className="text-cream/75">{formatMinutes(mins)}</span>
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setSelected([]);
                writeSelection([]);
              }}
              aria-label="Clear selection"
              className="grid size-10 place-items-center rounded-full text-cream/60 transition hover:bg-white/10 hover:text-cream"
            >
              <Minus className="size-4" />
            </button>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose to-rouge px-6 py-3 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-white transition hover:brightness-110"
            >
              Continue
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
