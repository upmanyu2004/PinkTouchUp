import { BUSINESS } from "./business";

/* ------------------------------------------------------------------ */
/*  Availability engine                                                */
/*                                                                     */
/*  This module generates bookable time slots from the salon's         */
/*  opening hours, and filters out:                                    */
/*    1. slots in the past (with a booking lead time)                  */
/*    2. slots that overlap real bookings stored in PostgreSQL         */
/*    3. slots flagged "busy" by a deterministic MOCK layer            */
/*                                                                     */
/*  The mock layer (isMockBusy) simulates walk-ins / phone bookings    */
/*  so the demo calendar looks alive. When the salon connects a real   */
/*  calendar or staff schedule, delete isMockBusy and plug the real    */
/*  busy periods into getTakenRanges() — the rest of the flow          */
/*  (API routes, wizard UI) needs no changes.                          */
/* ------------------------------------------------------------------ */

export interface Slot {
  time: string; // "HH:MM"
  end: string; // "HH:MM"
  available: boolean;
}

export function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

export function toHHMM(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function isValidDateStr(date: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(date) && !Number.isNaN(Date.parse(`${date}T00:00:00`));
}

export function todayLocal(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
    now.getDate(),
  ).padStart(2, "0")}`;
}

export function maxBookableDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + BUSINESS.bookingWindowDays);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

/* ————— MOCK busy layer ————— ————— —————
   Deterministic pseudo-random "already booked" slots so the calendar
   feels realistic. Remove this once a real calendar is connected. */
function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) >>> 0;
  }
  return h;
}

export function isMockBusy(date: string, time: string): boolean {
  // ~1 in 6 start-times is "taken" by walk-ins; slightly busier midday
  const h = hashString(`${date}|${time}`);
  const noonish = time >= "12:00" && time <= "17:00";
  return h % (noonish ? 5 : 6) === 0;
}
/* ————— end MOCK layer ————— */

export interface TakenRange {
  start: number; // minutes from midnight
  end: number;
}

/** Build the slot list for one day given the required visit length. */
export function buildSlots(
  date: string,
  serviceMinutes: number,
  taken: TakenRange[],
  now = new Date(),
): Slot[] {
  const open = toMinutes(BUSINESS.openTime);
  const close = toMinutes(BUSINESS.closeTime);
  const step = BUSINESS.slotStepMinutes;
  const span = Math.max(step, Math.ceil(serviceMinutes / step) * step);

  const isToday = date === todayLocal();
  const earliest =
    now.getHours() * 60 + now.getMinutes() + BUSINESS.bookingLeadMinutes;

  const slots: Slot[] = [];
  for (let t = open; t + span <= close; t += step) {
    const time = toHHMM(t);
    const end = toHHMM(t + span);

    let available = true;

    if (isToday && t < earliest) available = false;

    if (available) {
      for (const r of taken) {
        if (t < r.end && t + span > r.start) {
          available = false;
          break;
        }
      }
    }

    if (available && isMockBusy(date, time)) available = false;

    slots.push({ time, end, available });
  }
  return slots;
}

/** True if a proposed booking window is free of real or mock conflicts. */
export function slotIsFree(
  date: string,
  startTime: string,
  serviceMinutes: number,
  taken: TakenRange[],
  now = new Date(),
): boolean {
  const slots = buildSlots(date, serviceMinutes, taken, now);
  return slots.some((s) => s.time === startTime && s.available);
}
