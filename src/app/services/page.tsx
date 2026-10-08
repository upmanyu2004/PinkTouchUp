import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ServicesExplorer from "@/components/services/ServicesExplorer";

export const metadata: Metadata = {
  title: "Services & Menu",
  description:
    "Browse the full Pink Touch Up menu — hair, facials & skincare, makeup, manicure & pedicure, waxing, threading, bridal services and curated beauty packages in Jaipur.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="The Menu"
        title={
          <>
            Every ritual, <em className="text-gradient-rose">one menu</em>
          </>
        }
        copy="Add as many rituals as you like — we'll show the total time and reserve one seamless appointment. Final prices are confirmed on call or WhatsApp."
      />
      <section className="mx-auto max-w-7xl px-5 pb-28 sm:px-8">
        <ServicesExplorer />
      </section>
    </>
  );
}
