"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import {
  BadgeCheck,
  CalendarDays,
  Check,
  Clock,
  Loader2,
  MessageCircle,
  Minus,
  PartyPopper,
  Plus,
  RefreshCcw,
  Sparkles,
  TriangleAlert,
  User,
} from "lucide-react";
import { cn } from "@/lib/cn";
import {
  CATEGORIES,
  SERVICES,
  formatMinutes,
  getServices,
  totalMinutes,
} from "@/lib/services";
import { whatsappLink } from "@/lib/business";
import type { Slot } from "@/lib/availability";

const SERVICES_BY_CAT = new Map(
  CATEGORIES.map((c) => [c.id, SERVICES.filter((s) => s.category === c.id)]),
);

/* ————— shared time helpers ————— */
export function to12h(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hr = h % 12 === 0 ? 12 : h % 12;
  return `${hr}:${String(m).padStart(2, "0")} ${suffix}`;
}

export function prettyDate(date: string): string {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function addMin(hhmm: string, mins: number): string {
  const [h, m] = hhmm.split(":").map(Number);
  const total = h * 60 + m + mins;
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

/* ————— step indicator ————— */
const STEP_LABELS = ["Services", "Date", "Time", "Details", "Confirm"];

export function Stepper({ step }: { step: number }) {
  return (
    <ol aria-label="Booking progress" className="flex items-center">
      {STEP_LABELS.map((label, i) => {
        const n = i + 1;
        const done = n < step;
        const active = n === step;
        return (
          <li key={label} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-2">
              <span
                aria-current={active ? "step" : undefined}
                className={cn(
                  "grid size-9 place-items-center rounded-full border text-[0.72rem] font-semibold transition-all duration-500",
                  done
                    ? "border-transparent bg-gradient-to-br from-rose to-rouge text-white"
                    : active
                      ? "border-rose bg-white text-rouge shadow-soft"
                      : "border-line bg-white text-ink-soft/60",
                )}
              >
                {done ? <Check className="size-4" strokeWidth={2.25} /> : n}
              </span>
              <span
                className={cn(
                  "hidden text-[0.6rem] font-medium uppercase tracking-[0.16em] sm:block",
                  active ? "text-rouge" : done ? "text-ink" : "text-ink-soft/50",
                )}
              >
                {label}
              </span>
            </div>
            {i < STEP_LABELS.length - 1 && (
              <span
                aria-hidden
                className={cn(
                  "mx-2 mb-0 h-px flex-1 transition-colors duration-500 sm:mb-5",
                  done ? "bg-rose" : "bg-line",
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

/* ————— summary rail ————— */
export function SummaryCard({
  selected,
  date,
  slot,
}: {
  selected: string[];
  date: string | null;
  slot: string | null;
}) {
  const services = getServices(selected);
  const mins = totalMinutes(selected);

  return (
    <aside
      aria-label="Booking summary"
      className="card-soft sticky top-24 overflow-hidden p-0"
    >
      <div className="bg-gradient-to-r from-blush to-shell px-6 py-4">
        <p className="text-[0.66rem] font-medium uppercase tracking-[0.24em] text-rouge">
          Your moment
        </p>
        <p className="mt-1 font-display text-xl font-semibold text-ink">
          Booking summary
        </p>
      </div>
      <div className="px-6 py-5">
        {services.length === 0 ? (
          <p className="flex items-center gap-3 text-sm leading-relaxed text-ink-soft">
            <Sparkles className="size-4 shrink-0 text-rose" strokeWidth={1.75} />
            Pick your rituals to begin — the summary builds as you go.
          </p>
        ) : (
          <ul className="space-y-2.5">
            {services.map((s) => (
              <li key={s.id} className="flex items-start justify-between gap-3 text-sm">
                <span className="flex items-start gap-2 text-ink">
                  <Sparkles className="mt-0.5 size-3.5 shrink-0 text-rose" strokeWidth={1.75} />
                  {s.name}
                </span>
                <span className="shrink-0 text-xs text-ink-soft">
                  {formatMinutes(s.minutes)}
                </span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5 space-y-2.5 border-t border-line pt-4 text-sm">
          <p className="flex items-center justify-between text-ink-soft">
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="size-4 text-rose" strokeWidth={1.75} />
              Date
            </span>
            <span className="font-medium text-ink">
              {date ? prettyDate(date).replace(/, \d{4}$/, "") : "—"}
            </span>
          </p>
          <p className="flex items-center justify-between text-ink-soft">
            <span className="inline-flex items-center gap-2">
              <Clock className="size-4 text-rose" strokeWidth={1.75} />
              Time
            </span>
            <span className="font-medium text-ink">
              {slot ? `${to12h(slot)} – ${to12h(addMin(slot, mins))}` : "—"}
            </span>
          </p>
          <p className="flex items-center justify-between border-t border-dashed border-line pt-3 text-ink-soft">
            <span>Total duration</span>
            <span className="font-semibold text-rouge">
              {mins > 0 ? formatMinutes(mins) : "—"}
            </span>
          </p>
          <p className="flex items-center justify-between text-ink-soft">
            <span>Total price</span>
            <span className="rounded-full border border-gold/40 bg-gold-soft/25 px-2.5 py-0.5 text-[0.62rem] font-medium uppercase tracking-[0.12em] text-[#8a6a33]">
              On request
            </span>
          </p>
        </div>

        <p className="mt-4 rounded-xl bg-shell px-3.5 py-2.5 text-[0.72rem] leading-relaxed text-ink-soft">
          No advance payment — prices are confirmed on call/WhatsApp and you pay
          at the parlour.
        </p>
      </div>
    </aside>
  );
}

/* ————— step 1 · grouped compact service picker ————— */
export function ServicePicker({
  selected,
  onToggle,
}: {
  selected: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <div className="thin-scroll max-h-[26rem] space-y-7 overflow-y-auto pr-1">
      {CATEGORIES.map((c) => {
        const services = SERVICES_BY_CAT.get(c.id) ?? [];
        return (
          <div key={c.id}>
            <p className="sticky top-0 z-10 -mx-1 bg-white/95 px-1 pb-2 pt-1 text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-gold backdrop-blur">
              {c.label}
            </p>
            <ul className="divide-y divide-line/70">
              {services.map((s) => {
                const isSel = selected.includes(s.id);
                return (
                  <li key={s.id} className="flex items-center gap-3 py-3">
                    <div className="min-w-0 flex-1">
                      <p className="flex flex-wrap items-center gap-2 text-sm font-medium text-ink">
                        {s.name}
                        {s.popular && (
                          <span className="rounded-full bg-blush px-2 py-0.5 text-[0.55rem] font-medium uppercase tracking-[0.14em] text-rouge">
                            Loved
                          </span>
                        )}
                      </p>
                      <p className="mt-0.5 text-[0.72rem] text-ink-soft">
                        {formatMinutes(s.minutes)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onToggle(s.id)}
                      aria-pressed={isSel}
                      aria-label={`${isSel ? "Remove" : "Add"} ${s.name}`}
                      className={cn(
                        "grid size-9 shrink-0 place-items-center rounded-full border transition-all duration-300",
                        isSel
                          ? "border-transparent bg-gradient-to-br from-rose to-rouge text-white shadow-soft"
                          : "border-rouge/25 text-rouge hover:border-rouge hover:bg-rouge hover:text-white",
                      )}
                    >
                      {isSel ? <Minus className="size-4" /> : <Plus className="size-4" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

/* ————— step 2 · date strip ————— */
export interface DayOption {
  value: string;
  weekday: string;
  dayNum: string;
  month: string;
  tag?: string;
}

export function DateStrip({
  days,
  value,
  onChange,
}: {
  days: DayOption[];
  value: string | null;
  onChange: (v: string) => void;
}) {
  return (
    <div
      role="radiogroup"
      aria-label="Choose a date"
      className="hide-scrollbar -mx-1 flex gap-2.5 overflow-x-auto px-1 pb-2 pt-1"
    >
      {days.map((d) => {
        const active = value === d.value;
        return (
          <button
            key={d.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(d.value)}
            className={cn(
              "flex w-[4.6rem] shrink-0 flex-col items-center rounded-2xl border px-2 py-3.5 transition-all duration-300",
              active
                ? "border-transparent bg-gradient-to-b from-rose to-rouge text-white shadow-soft"
                : "border-line bg-white text-ink hover:border-rose/50 hover:shadow-card",
            )}
          >
            <span
              className={cn(
                "text-[0.58rem] font-medium uppercase tracking-[0.18em]",
                active ? "text-cream/85" : "text-ink-soft",
              )}
            >
              {d.tag ?? d.weekday}
            </span>
            <span className="mt-1 font-display text-2xl font-semibold leading-none">
              {d.dayNum}
            </span>
            <span
              className={cn(
                "mt-1 text-[0.58rem] font-medium uppercase tracking-[0.18em]",
                active ? "text-cream/85" : "text-ink-soft",
              )}
            >
              {d.month}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ————— step 3 · slot grid ————— */
export function SlotGrid({
  slots,
  value,
  onChange,
  loading,
  error,
  onRetry,
}: {
  slots: Slot[] | null;
  value: string | null;
  onChange: (v: string) => void;
  loading: boolean;
  error: string | null;
  onRetry: () => void;
}) {
  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="h-11 animate-pulse rounded-xl bg-blush/70" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="card-soft flex flex-col items-center gap-3 p-10 text-center">
        <TriangleAlert className="size-7 text-rose" strokeWidth={1.5} />
        <p className="text-sm text-ink-soft">{error}</p>
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 rounded-full border border-rouge/30 px-5 py-2 text-xs font-medium uppercase tracking-[0.16em] text-rouge transition hover:bg-rouge hover:text-white"
        >
          <RefreshCcw className="size-3.5" />
          Try again
        </button>
      </div>
    );
  }

  if (!slots) return null;

  const groups: Array<{ label: string; filter: (t: string) => boolean }> = [
    { label: "Morning", filter: (t) => t < "12:00" },
    { label: "Afternoon", filter: (t) => t >= "12:00" && t < "17:00" },
    { label: "Evening", filter: (t) => t >= "17:00" },
  ];

  const anyAvailable = slots.some((s) => s.available);

  return (
    <div className="space-y-6">
      {!anyAvailable && (
        <p className="rounded-2xl border border-gold/40 bg-gold-soft/20 px-4 py-3 text-sm text-ink">
          This day is fully booked online —{" "}
          <a className="font-medium text-rouge underline underline-offset-2" href={whatsappLink("Hello Pink Touch Up! Is there any slot available today?")} target="_blank" rel="noopener noreferrer">
            message us on WhatsApp
          </a>{" "}
          and we&apos;ll try to fit you in.
        </p>
      )}
      <div role="radiogroup" aria-label="Choose a time" className="space-y-6">
        {groups.map((g) => {
          const list = slots.filter((s) => g.filter(s.time));
          if (list.length === 0) return null;
          return (
            <div key={g.label}>
              <p className="text-[0.64rem] font-semibold uppercase tracking-[0.22em] text-ink-soft">
                {g.label}
              </p>
              <div className="mt-2.5 grid grid-cols-3 gap-2.5 sm:grid-cols-4">
                {list.map((s) => {
                  const active = value === s.time;
                  return (
                    <button
                      key={s.time}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      disabled={!s.available}
                      title={s.available ? `Start at ${to12h(s.time)}` : "Already taken"}
                      onClick={() => onChange(s.time)}
                      className={cn(
                        "rounded-xl border py-2.5 text-[0.8rem] font-medium transition-all duration-300",
                        active
                          ? "border-transparent bg-gradient-to-r from-rose to-rouge text-white shadow-soft"
                          : s.available
                            ? "border-line bg-white text-ink hover:border-rose/60 hover:text-rouge hover:shadow-card"
                            : "cursor-not-allowed border-line/60 bg-shell/60 text-ink-soft/45 line-through decoration-rose/40",
                      )}
                    >
                      {to12h(s.time)}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ————— step 5 · review block ————— */
export function ReviewRow({
  label,
  children,
  onEdit,
}: {
  label: string;
  children: ReactNode;
  onEdit: () => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-line/70 py-4 last:border-none">
      <div className="min-w-0">
        <p className="text-[0.62rem] font-medium uppercase tracking-[0.2em] text-ink-soft">
          {label}
        </p>
        <div className="mt-1.5 text-sm text-ink">{children}</div>
      </div>
      <button
        type="button"
        onClick={onEdit}
        className="shrink-0 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-rouge underline-offset-4 transition hover:underline"
      >
        Edit
      </button>
    </div>
  );
}

/* ————— confirmation ————— */
export interface ConfirmedBooking {
  ref: string;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  totalMinutes: number;
  services: Array<{ id: string; name: string; minutes: number }>;
}

export function ConfirmationPanel({
  booking,
  onReset,
}: {
  booking: ConfirmedBooking;
  onReset: () => void;
}) {
  const waMsg = `Hello Pink Touch Up! I just booked online — ref ${booking.ref} — ${booking.services
    .map((s) => s.name)
    .join(", ")} on ${prettyDate(booking.date)} at ${to12h(booking.startTime)}. — ${booking.name}`;

  return (
    <div className="card-soft relative overflow-hidden p-8 text-center sm:p-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-blush/70 to-transparent"
      />
      <div className="relative">
        <span className="relative mx-auto grid size-20 place-items-center rounded-full bg-gradient-to-br from-rose to-rouge text-white shadow-lift">
          <span className="absolute inset-0 animate-ping rounded-full bg-rose/40" />
          <BadgeCheck className="size-9" strokeWidth={1.5} />
        </span>
        <p className="mt-6 text-[0.68rem] font-medium uppercase tracking-[0.3em] text-gold">
          Request received
        </p>
        <h2 className="mt-3 font-display text-4xl font-medium tracking-tight text-ink sm:text-5xl">
          See you soon, <em className="text-gradient-rose">{booking.name.split(" ")[0]}</em>
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink-soft">
          Your appointment request is with us. We&apos;ll confirm it shortly with
          a call or WhatsApp message on your number.
        </p>

        <div className="mx-auto mt-8 max-w-sm rounded-2xl border border-dashed border-rose/40 bg-shell/70 p-5">
          <p className="text-[0.62rem] font-medium uppercase tracking-[0.24em] text-ink-soft">
            Booking reference
          </p>
          <p className="mt-1.5 font-display text-3xl font-semibold tracking-[0.08em] text-rouge">
            {booking.ref}
          </p>
          <p className="mt-3 text-sm text-ink">
            {prettyDate(booking.date)} · {to12h(booking.startTime)} – {to12h(booking.endTime)}
          </p>
          <p className="mt-1 text-xs text-ink-soft">
            {booking.services.map((s) => s.name).join(" · ")}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href={whatsappLink(waMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose to-rouge px-7 py-3.5 text-xs font-medium uppercase tracking-[0.16em] text-white shadow-soft transition hover:brightness-110"
          >
            <MessageCircle className="size-4" strokeWidth={1.75} />
            Confirm faster on WhatsApp
          </a>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-7 py-3.5 text-xs font-medium uppercase tracking-[0.16em] text-ink transition hover:border-rose hover:text-rouge"
          >
            Book another visit
          </button>
        </div>

        <p className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[0.68rem] uppercase tracking-[0.18em] text-ink-soft">
          <span className="inline-flex items-center gap-1.5">
            <User className="size-3.5" strokeWidth={1.75} /> Pay at the parlour
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5" strokeWidth={1.75} /> Arrive 10 min early
          </span>
          <span className="inline-flex items-center gap-1.5">
            <PartyPopper className="size-3.5" strokeWidth={1.75} /> Reschedule free on call
          </span>
        </p>
      </div>
    </div>
  );
}

/* ————— submitting overlay ————— */
export function SubmittingOverlay() {
  return (
    <div className="absolute inset-0 z-20 grid place-items-center rounded-[1.6rem] bg-cream/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="size-8 animate-spin text-rose" strokeWidth={1.5} />
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-ink-soft">
          Reserving your moment…
        </p>
      </div>
    </div>
  );
}

export function StepShell({
  title,
  hint,
  children,
}: {
  title: ReactNode;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h2 className="font-display text-3xl font-semibold tracking-tight text-ink">{title}</h2>
      {hint && <p className="mt-2 text-sm leading-relaxed text-ink-soft">{hint}</p>}
      <div className="mt-6">{children}</div>
    </div>
  );
}
