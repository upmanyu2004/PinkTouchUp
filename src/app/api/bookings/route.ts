import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db";
import { bookings, type BookedService } from "@/db/schema";
import { and, eq, ne } from "drizzle-orm";
import { getServices, totalMinutes } from "@/lib/services";
import { BUSINESS } from "@/lib/business";
import {
  isValidDateStr,
  maxBookableDate,
  slotIsFree,
  toHHMM,
  toMinutes,
  todayLocal,
  type TakenRange,
} from "@/lib/availability";

export const dynamic = "force-dynamic";

const phoneRegex = /^(\+?91[\-\s]?)?[6-9]\d{9}$/;

const bookingSchema = z.object({
  serviceIds: z.array(z.string()).min(1, "Select at least one service.").max(12),
  date: z.string().refine(isValidDateStr, "Choose a valid date."),
  startTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Choose a time slot."),
  name: z.string().trim().min(2, "Please tell us your name.").max(80),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, "Enter a valid 10-digit Indian mobile number."),
  notes: z.string().trim().max(500).optional().default(""),
});

function makeRef(): string {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return `PTU-${code}`;
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    const msg = parsed.error.issues[0]?.message ?? "Please check your details.";
    return NextResponse.json({ error: msg }, { status: 422 });
  }
  const { serviceIds, date, startTime, name, phone, notes } = parsed.data;

  /* validate services */
  const services = getServices(serviceIds);
  if (services.length !== serviceIds.length) {
    return NextResponse.json({ error: "Unknown service selected." }, { status: 422 });
  }
  const minutes = totalMinutes(serviceIds);
  if (minutes < 5 || minutes > 600) {
    return NextResponse.json({ error: "Invalid visit duration." }, { status: 422 });
  }

  /* validate booking window */
  if (date < todayLocal() || date > maxBookableDate()) {
    return NextResponse.json(
      { error: "This date is no longer bookable." },
      { status: 422 },
    );
  }

  const start = toMinutes(startTime);
  const endMin = start + minutes;
  if (start < toMinutes(BUSINESS.openTime) || endMin > toMinutes(BUSINESS.closeTime)) {
    return NextResponse.json(
      { error: "Please pick a slot within opening hours." },
      { status: 422 },
    );
  }

  /* re-check availability against real bookings (source of truth) */
  let taken: TakenRange[] = [];
  try {
    const rows = await db
      .select({ startTime: bookings.startTime, endTime: bookings.endTime })
      .from(bookings)
      .where(and(eq(bookings.date, date), ne(bookings.status, "cancelled")));
    taken = rows.map((r) => ({ start: toMinutes(r.startTime), end: toMinutes(r.endTime) }));
  } catch {
    return NextResponse.json(
      { error: "Booking system is briefly unavailable — please try again." },
      { status: 503 },
    );
  }

  if (!slotIsFree(date, startTime, minutes, taken)) {
    return NextResponse.json(
      { error: "That slot was just taken — please choose another time." },
      { status: 409 },
    );
  }

  const snapshot: BookedService[] = services.map((s) => ({
    id: s.id,
    name: s.name,
    minutes: s.minutes,
    priceFrom: s.priceFrom,
  }));

  try {
    const ref = makeRef();
    const [row] = await db
      .insert(bookings)
      .values({
        ref,
        customerName: name,
        phone,
        notes: notes || null,
        date,
        startTime,
        endTime: toHHMM(endMin),
        totalMinutes: minutes,
        services: snapshot,
        status: "pending",
      })
      .returning();

    return NextResponse.json(
      {
        booking: {
          ref: row.ref,
          name: row.customerName,
          phone: row.phone,
          date: row.date,
          startTime: row.startTime,
          endTime: row.endTime,
          totalMinutes: row.totalMinutes,
          services: row.services,
          notes: row.notes,
          status: row.status,
        },
      },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { error: "Could not save your booking — please try again." },
      { status: 500 },
    );
  }
}
