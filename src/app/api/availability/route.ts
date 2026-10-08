import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { bookings } from "@/db/schema";
import { and, eq, ne } from "drizzle-orm";
import {
  buildSlots,
  isValidDateStr,
  maxBookableDate,
  toMinutes,
  todayLocal,
  type TakenRange,
} from "@/lib/availability";

export const dynamic = "force-dynamic";

/** GET /api/availability?date=YYYY-MM-DD&minutes=90 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date") ?? "";
  const minutes = Number(searchParams.get("minutes") ?? "0");

  if (!isValidDateStr(date)) {
    return NextResponse.json({ error: "A valid date is required." }, { status: 400 });
  }
  if (date < todayLocal() || date > maxBookableDate()) {
    return NextResponse.json(
      { error: "Date is outside the booking window." },
      { status: 400 },
    );
  }
  if (!Number.isFinite(minutes) || minutes < 15 || minutes > 600) {
    return NextResponse.json(
      { error: "Invalid service duration." },
      { status: 400 },
    );
  }

  let taken: TakenRange[] = [];
  try {
    const rows = await db
      .select({ startTime: bookings.startTime, endTime: bookings.endTime })
      .from(bookings)
      .where(and(eq(bookings.date, date), ne(bookings.status, "cancelled")));
    taken = rows.map((r) => ({ start: toMinutes(r.startTime), end: toMinutes(r.endTime) }));
  } catch {
    // If the DB is unreachable we still serve mock availability
    // rather than breaking the booking flow.
    taken = [];
  }

  return NextResponse.json({
    date,
    minutes,
    slots: buildSlots(date, minutes, taken),
  });
}
