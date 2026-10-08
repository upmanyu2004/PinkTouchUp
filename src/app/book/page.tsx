import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import BookingWizard from "@/components/booking/BookingWizard";
import { BadgeIndianRupee, CalendarClock, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description:
    "Book your Pink Touch Up beauty appointment online — choose services, pick a date and time, and confirm in under two minutes. Pay at the parlour.",
};

const ASSURANCES = [
  {
    icon: BadgeIndianRupee,
    title: "No advance payment",
    copy: "Reserve online, pay at the parlour after your ritual.",
  },
  {
    icon: CalendarClock,
    title: "Easy rescheduling",
    copy: "Plans change — call or WhatsApp to move your slot, free.",
  },
  {
    icon: Sparkles,
    title: "Personal confirmation",
    copy: "Every booking is confirmed personally on call or WhatsApp.",
  },
];

export default function BookPage() {
  return (
    <>
      <PageHero
        eyebrow="Reserve Your Moment"
        title={
          <>
            Book your <em className="text-gradient-rose">appointment</em>
          </>
        }
        copy="Five little steps, one beautiful outcome. Pick your rituals, choose a time, and we'll take care of the rest."
      />
      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8">
        <BookingWizard />
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-28 sm:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {ASSURANCES.map((a) => (
            <div key={a.title} className="card-soft flex items-start gap-4 p-6">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-blush text-rouge">
                <a.icon className="size-5" strokeWidth={1.5} />
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-ink">{a.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{a.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
