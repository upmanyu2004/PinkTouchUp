import type { Metadata } from "next";
import Link from "next/link";
import {
  CalendarHeart,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import MessageComposer from "@/components/contact/MessageComposer";
import { InstagramIcon, FacebookIcon } from "@/components/icons/social";
import { BUSINESS, telLink, whatsappLink } from "@/lib/business";

export const metadata: Metadata = {
  title: "Contact & Location",
  description:
    "Find Pink Touch Up Beauty Parlour in Jaipur — opening hours, phone, WhatsApp and directions. Book your appointment online or message us directly.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Say Hello"
        title={
          <>
            We&apos;d love to <em className="text-gradient-rose">hear from you</em>
          </>
        }
        copy="Call, WhatsApp or walk in — the kettle of conversation is always warm at the parlour."
      />

      <section className="mx-auto max-w-7xl px-5 pb-28 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr]">
          {/* info column */}
          <div className="space-y-6">
            <Reveal>
              <div className="card-soft p-8">
                <ul className="space-y-7">
                  <li className="flex items-start gap-4">
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-blush text-rouge">
                      <MapPin className="size-5" strokeWidth={1.75} />
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-ink">Where</h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                        {BUSINESS.addressLine}
                        <br />
                        {BUSINESS.addressNote}
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-blush text-rouge">
                      <Clock className="size-5" strokeWidth={1.75} />
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-ink">When</h3>
                      {BUSINESS.hours.map((h) => (
                        <p key={h.days} className="mt-1 text-sm text-ink-soft">
                          <span className="font-medium text-ink">{h.days}</span> · {h.time}
                        </p>
                      ))}
                      <p className="mt-1.5 text-xs text-ink-soft/80">{BUSINESS.hoursNote}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-blush text-rouge">
                      <Phone className="size-5" strokeWidth={1.75} />
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-ink">How</h3>
                      <a
                        href={telLink()}
                        className="mt-1 block text-sm font-medium text-ink transition-colors hover:text-rouge"
                      >
                        {BUSINESS.phoneDisplay}
                      </a>
                      <div className="mt-3 flex flex-wrap gap-2.5">
                        <a
                          href={whatsappLink("Hello Pink Touch Up! I have a question.")}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-4 py-2 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-ink transition hover:border-rose hover:text-rouge"
                        >
                          <MessageCircle className="size-3.5" strokeWidth={1.75} />
                          WhatsApp
                        </a>
                        <Link
                          href="/book"
                          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose to-rouge px-4 py-2 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-white transition hover:brightness-110"
                        >
                          <CalendarHeart className="size-3.5" strokeWidth={1.75} />
                          Book online
                        </Link>
                      </div>
                    </div>
                  </li>
                </ul>

                <div className="mt-8 flex items-center gap-3 border-t border-line pt-6">
                  <span
                    title="Instagram — launching soon"
                    className="grid size-10 cursor-not-allowed place-items-center rounded-full border border-line text-ink-soft/50"
                  >
                    <InstagramIcon className="size-4" />
                  </span>
                  <span
                    title="Facebook — launching soon"
                    className="grid size-10 cursor-not-allowed place-items-center rounded-full border border-line text-ink-soft/50"
                  >
                    <FacebookIcon className="size-4" />
                  </span>
                  <p className="text-[0.66rem] uppercase tracking-[0.2em] text-ink-soft/70">
                    Socials launching soon
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="relative h-72 overflow-hidden rounded-[2rem] border border-line shadow-card lg:h-80">
                <iframe
                  title="Map — Jaipur, Rajasthan"
                  src="https://www.google.com/maps?q=Jaipur,+Rajasthan,+India&z=12&output=embed"
                  className="absolute inset-0 h-full w-full border-0 [filter:saturate(0.75)_sepia(0.12)_hue-rotate(-18deg)]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
                <div className="pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-cream/60 to-transparent p-4">
                  <p className="inline-flex items-center gap-2 rounded-full bg-cream/90 px-4 py-2 text-[0.66rem] font-medium uppercase tracking-[0.2em] text-rouge shadow-card backdrop-blur">
                    <MapPin className="size-3.5" strokeWidth={1.75} />
                    Jaipur · Rajasthan
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* composer */}
          <Reveal delay={0.12}>
            <MessageComposer />
          </Reveal>
        </div>
      </section>
    </>
  );
}
