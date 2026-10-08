import {
  pgTable,
  pgEnum,
  uuid,
  text,
  date,
  integer,
  jsonb,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

/* A service snapshot stored with each booking */
export interface BookedService {
  id: string;
  name: string;
  minutes: number;
  priceFrom: number | null;
}

export const bookingStatusEnum = pgEnum("booking_status", [
  "pending",
  "confirmed",
  "cancelled",
]);

export const bookings = pgTable(
  "bookings",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    /** short human-friendly reference, e.g. PTU-4F7K2Q */
    ref: text("ref").notNull().unique(),
    customerName: text("customer_name").notNull(),
    phone: text("phone").notNull(),
    notes: text("notes"),
    /** ISO date "YYYY-MM-DD" (salon local day) */
    date: date("date", { mode: "string" }).notNull(),
    /** "HH:MM" 24h strings in salon local time */
    startTime: text("start_time").notNull(),
    endTime: text("end_time").notNull(),
    totalMinutes: integer("total_minutes").notNull(),
    services: jsonb("services").$type<BookedService[]>().notNull(),
    status: bookingStatusEnum("status").notNull().default("pending"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [index("bookings_date_idx").on(t.date)],
);

export type Booking = typeof bookings.$inferSelect;
export type NewBooking = typeof bookings.$inferInsert;
