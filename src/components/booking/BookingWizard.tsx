"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CalendarHeart, MessageCircle } from "lucide-react";
import { cn } from "@/lib/cn";
import { totalMinutes, getServices, serviceById, formatMinutes } from "@/lib/services";
import { readSelection, writeSelection, SELECTION_EVENT } from "@/lib/selection";
import { whatsappLink } from "@/lib/business";
import type { Slot } from "@/lib/availability";
import {
  ConfirmationPanel,
  DateStrip,
  ReviewRow,
  ServicePicker,
  SlotGrid,
  StepShell,
  Stepper,
  SubmittingOverlay,
  SummaryCard,
  prettyDate,
  to12h,
  type ConfirmedBooking,
  type DayOption,
} from "./parts";

const PHONE_REGEX = /^(\+?91[\-\s]?)?[6-9]\d{9}$/;

function buildDays(): DayOption[] {
  const out: DayOption[] = [];
  const now = new Date();
  for (let i = 0; i < 21; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate(),
    ).padStart(2, "0")}`;
    out.push({
      value,
      weekday: d.toLocaleDateString("en-IN", { weekday: "short" }),
      dayNum: String(d.getDate()),
      month: d.toLocaleDateString("en-IN", { month: "short" }),
      tag: i === 0 ? "Today" : i === 1 ? "Tomorrow" : undefined,
    });
  }
  return out;
}

type Errors = Partial<Record<"services" | "date" | "slot" | "name" | "phone", string>>;

export default function BookingWizard() {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [date, setDate] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [slots, setSlots] = useState<Slot[] | null>(null);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState<string | null>(null);
  const [refreshNonce, setRefreshNonce] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<ConfirmedBooking | null>(null);

  const days = useMemo(buildDays, []);
  const minutes = totalMinutes(selected);

  /* hydrate selection from localStorage + ?add= query param */
  useEffect(() => {
    const fromStore = readSelection();
    const params = new URLSearchParams(window.location.search);
    const fromQuery = (params.get("add") ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter((s) => serviceById.has(s));
    const merged = Array.from(new Set([...fromStore, ...fromQuery]));
    setSelected(merged);
    if (merged.length) writeSelection(merged);
    setHydrated(true);

    const onExternal = (e: Event) => {
      const detail = (e as CustomEvent<string[]>).detail;
      if (Array.isArray(detail)) setSelected(detail.filter((id) => serviceById.has(id)));
    };
    window.addEventListener(SELECTION_EVENT, onExternal);
    return () => window.removeEventListener(SELECTION_EVENT, onExternal);
  }, []);

  /* fetch availability for step 3 */
  const fetchSlots = useCallback(
    async (d: string, mins: number, nonce: number) => {
      setSlotsLoading(true);
      setSlotsError(null);
      try {
        const res = await fetch(
          `/api/availability?date=${encodeURIComponent(d)}&minutes=${mins}`,
          { cache: "no-store" },
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Could not load availability.");
        setSlots(data.slots as Slot[]);
      } catch (e) {
        setSlots(null);
        setSlotsError(
          e instanceof Error ? e.message : "Could not load availability.",
        );
      } finally {
        setSlotsLoading(false);
      }
      void nonce;
    },
    [],
  );

  useEffect(() => {
    if (step === 3 && date && minutes > 0) {
      fetchSlots(date, minutes, refreshNonce);
    }
  }, [step, date, minutes, refreshNonce, fetchSlots]);

  const toggleService = (id: string) => {
    setSelected((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      writeSelection(next);
      return next;
    });
    setSlot(null);
  };

  const pickDate = (d: string) => {
    setDate(d);
    setSlot(null);
  };

  /* ————— per-step validation ————— */
  const validateStep = (s: number): boolean => {
    const next: Errors = {};
    if (s === 1 && selected.length === 0) next.services = "Choose at least one ritual to continue.";
    if (s === 2 && !date) next.date = "Please pick a date for your visit.";
    if (s === 3 && !slot) next.slot = 'Please pick a time — greyed-out slots are already taken.';
    if (s === 4) {
      if (name.trim().length < 2) next.name = "Please tell us your name.";
      if (!PHONE_REGEX.test(phone.trim())) next.phone = "Enter a valid 10-digit mobile number.";
    }
    setErrors((prev) => ({ ...prev, ...next }));
    return Object.keys(next).length === 0;
  };

  const goNext = () => {
    if (!validateStep(step)) return;
    setServerError(null);
    setStep((s) => Math.min(5, s + 1));
    if (typeof window !== "undefined") {
      document.getElementById("wizard-top")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const goBack = () => setStep((s) => Math.max(1, s - 1));

  const jumpTo = (s: number) => {
    setStep(s);
    setServerError(null);
  };

  /* ————— submit ————— */
  const submit = async () => {
    if (!validateStep(4) || !date || !slot || selected.length === 0) return;
    setSubmitting(true);
    setServerError(null);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceIds: selected,
          date,
          startTime: slot,
          name: name.trim(),
          phone: phone.trim(),
          notes: notes.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 409) {
          setRefreshNonce((n) => n + 1);
          setSlot(null);
          setStep(3);
        }
        throw new Error(data.error ?? "Something went wrong — please try again.");
      }
      setResult(data.booking as ConfirmedBooking);
      writeSelection([]);
      setSelected([]);
    } catch (e) {
      setServerError(e instanceof Error ? e.message : "Something went wrong — please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setResult(null);
    setStep(1);
    setDate(null);
    setSlot(null);
    setSlots(null);
    setName("");
    setPhone("");
    setNotes("");
    setErrors({});
    setServerError(null);
  };

  /* ————— confirmation view ————— */
  if (result) {
    return (
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <ConfirmationPanel booking={result} onReset={reset} />
      </motion.div>
    );
  }

  const stepTitles: Record<number, { title: string; hint: string }> = {
    1: { title: "Choose your rituals", hint: "Pick one or several — we'll reserve enough time for everything in a single visit." },
    2: { title: "Pick a day", hint: "We're open 10 AM – 8 PM, seven days a week. You can book up to three weeks ahead." },
    3: { title: "Choose a time", hint: date ? `${prettyDate(date)} · showing starts with enough room for ${formatMinutes(minutes)}.` : "Pick a date first." },
    4: { title: "Your details", hint: "Just a name and number — we'll confirm your appointment personally." },
    5: { title: "Review & confirm", hint: "One last look before we reserve your moment." },
  };

  const canShowAction = step < 5;

  return (
    <div id="wizard-top" className="scroll-mt-28">
      <Stepper step={step} />

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        {/* main panel */}
        <div className="card-soft relative p-6 sm:p-8">
          {submitting && <SubmittingOverlay />}

          {serverError && (
            <div
              role="alert"
              className="mb-6 rounded-2xl border border-rose/40 bg-blush/60 px-4 py-3 text-sm text-rouge"
            >
              {serverError}
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {step === 1 && (
                <StepShell title={stepTitles[1].title} hint={stepTitles[1].hint}>
                  {hydrated && selected.length > 0 && (
                    <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-blush px-4 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.16em] text-rouge">
                      {selected.length} selected · {formatMinutes(minutes)}
                    </p>
                  )}
                  <ServicePicker selected={selected} onToggle={toggleService} />
                  {errors.services && <FieldError>{errors.services}</FieldError>}
                </StepShell>
              )}

              {step === 2 && (
                <StepShell title={stepTitles[2].title} hint={stepTitles[2].hint}>
                  <DateStrip days={days} value={date} onChange={pickDate} />
                  {errors.date && <FieldError>{errors.date}</FieldError>}
                </StepShell>
              )}

              {step === 3 && (
                <StepShell title={stepTitles[3].title} hint={stepTitles[3].hint}>
                  <SlotGrid
                    slots={slots}
                    value={slot}
                    onChange={setSlot}
                    loading={slotsLoading}
                    error={slotsError}
                    onRetry={() => setRefreshNonce((n) => n + 1)}
                  />
                  {errors.slot && <FieldError>{errors.slot}</FieldError>}
                </StepShell>
              )}

              {step === 4 && (
                <StepShell title={stepTitles[4].title} hint={stepTitles[4].hint}>
                  <div className="space-y-5">
                    <div>
                      <label htmlFor="bk-name" className="mb-1.5 block text-[0.7rem] font-medium uppercase tracking-[0.18em] text-ink-soft">
                        Your name
                      </label>
                      <input
                        id="bk-name"
                        type="text"
                        autoComplete="name"
                        value={name}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? "bk-name-err" : undefined}
                        onChange={(e) => {
                          setName(e.target.value);
                          setErrors((p) => ({ ...p, name: undefined }));
                        }}
                        placeholder="e.g. Aishwarya Sharma"
                        className="field"
                      />
                      {errors.name && <FieldError id="bk-name-err">{errors.name}</FieldError>}
                    </div>

                    <div>
                      <label htmlFor="bk-phone" className="mb-1.5 block text-[0.7rem] font-medium uppercase tracking-[0.18em] text-ink-soft">
                        Mobile number
                      </label>
                      <div className="relative">
                        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-ink-soft">
                          +91
                        </span>
                        <input
                          id="bk-phone"
                          type="tel"
                          inputMode="numeric"
                          autoComplete="tel-national"
                          value={phone}
                          aria-invalid={Boolean(errors.phone)}
                          aria-describedby={errors.phone ? "bk-phone-err" : "bk-phone-hint"}
                          onChange={(e) => {
                            setPhone(e.target.value.replace(/[^\d+\-\s]/g, ""));
                            setErrors((p) => ({ ...p, phone: undefined }));
                          }}
                          placeholder="98XXX XXXXX"
                          className="field pl-14"
                        />
                      </div>
                      {errors.phone ? (
                        <FieldError id="bk-phone-err">{errors.phone}</FieldError>
                      ) : (
                        <p id="bk-phone-hint" className="mt-1.5 text-xs text-ink-soft">
                          Used only to confirm your booking — never shared.
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="bk-notes" className="mb-1.5 block text-[0.7rem] font-medium uppercase tracking-[0.18em] text-ink-soft">
                        Notes or special requests <span className="normal-case text-ink-soft/60">(optional)</span>
                      </label>
                      <textarea
                        id="bk-notes"
                        rows={3}
                        maxLength={500}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Allergies, preferred artist, occasion, inspiration links…"
                        className="field resize-none"
                      />
                      <p className="mt-1.5 text-right text-xs text-ink-soft/70">{notes.length}/500</p>
                    </div>
                  </div>
                </StepShell>
              )}

              {step === 5 && date && slot && (
                <StepShell title={stepTitles[5].title} hint={stepTitles[5].hint}>
                  <div className="rounded-2xl border border-line bg-shell/50 px-5 py-2">
                    <ReviewRow label="Rituals" onEdit={() => jumpTo(1)}>
                      <span className="font-medium">
                        {getServices(selected).map((s) => s.name).join(" · ")}
                      </span>
                      <span className="mt-0.5 block text-xs text-ink-soft">
                        {selected.length} {selected.length === 1 ? "service" : "services"} · {formatMinutes(minutes)} total
                      </span>
                    </ReviewRow>
                    <ReviewRow label="Date & time" onEdit={() => jumpTo(2)}>
                      <span className="font-medium">{prettyDate(date)}</span>
                      <span className="mt-0.5 block text-xs text-ink-soft">
                        Arrive by {to12h(slot)} — done around {to12h(endOf(slot, minutes))}
                      </span>
                    </ReviewRow>
                    <ReviewRow label="Your details" onEdit={() => jumpTo(4)}>
                      <span className="font-medium">{name}</span>
                      <span className="mt-0.5 block text-xs text-ink-soft">+91 {phone.replace(/^(\+?91[\-\s]?)/, "")}</span>
                      {notes.trim() && (
                        <span className="mt-1 block text-xs italic text-ink-soft">“{notes.trim()}”</span>
                      )}
                    </ReviewRow>
                    <ReviewRow label="Payment" onEdit={() => undefined}>
                      <span className="text-xs leading-relaxed text-ink-soft">
                        No advance needed. Exact prices are confirmed on call/WhatsApp — pay at the parlour after your ritual.
                      </span>
                    </ReviewRow>
                  </div>
                </StepShell>
              )}
            </motion.div>
          </AnimatePresence>

          {/* nav */}
          <div className="mt-8 flex items-center justify-between gap-3 border-t border-line pt-6">
            {step > 1 ? (
              <button
                type="button"
                onClick={goBack}
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-ink transition hover:border-rose hover:text-rouge"
              >
                <ArrowLeft className="size-4" />
                Back
              </button>
            ) : (
              <span />
            )}

            {canShowAction ? (
              <button
                type="button"
                onClick={goNext}
                className={cn(
                  "group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose to-rouge px-7 py-3 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-white shadow-soft transition hover:brightness-110",
                )}
              >
                Continue
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            ) : (
              <button
                type="button"
                onClick={submit}
                disabled={submitting}
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose to-rouge px-7 py-3 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-white shadow-soft transition hover:brightness-110 disabled:opacity-60"
              >
                <CalendarHeart className="size-4" />
                Confirm booking
              </button>
            )}
          </div>
        </div>

        {/* summary rail */}
        <div className="order-first lg:order-none">
          <SummaryCard selected={selected} date={date} slot={slot} />
          <a
            href={whatsappLink("Hello Pink Touch Up! I'd like help booking an appointment.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-2 rounded-2xl border border-line bg-white/70 px-5 py-3.5 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-ink transition hover:border-rose hover:text-rouge"
          >
            <MessageCircle className="size-4 text-rose" strokeWidth={1.75} />
            Prefer to book on WhatsApp?
          </a>
        </div>
      </div>
    </div>
  );
}

function endOf(hhmm: string, mins: number): string {
  const [h, m] = hhmm.split(":").map(Number);
  const total = h * 60 + m + mins;
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

function FieldError({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <p id={id} role="alert" className="mt-3 text-xs font-medium text-[#c24040]">
      {children}
    </p>
  );
}
