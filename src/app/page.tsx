import Hero from "@/components/home/Hero";
import { FeaturedServices, PopularPackages } from "@/components/home/HomeShowcase";
import {
  CtaBanner,
  GalleryPreview,
  Testimonials,
  VisitUs,
  WhyUs,
} from "@/components/home/HomeInfo";
import { Marquee } from "@/components/decor";

const MARQUEE_ITEMS = [
  "Bridal Makeup",
  "Hair Spa Rituals",
  "Gold Facial",
  "HD & Airbrush Glam",
  "Perfect Brows",
  "Spa Pedicure",
  "Silky Waxing",
  "Party-Ready Packages",
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="border-y border-line bg-blush/60">
        <Marquee items={MARQUEE_ITEMS} className="mx-auto max-w-7xl" />
      </div>
      <FeaturedServices />
      <PopularPackages />
      <WhyUs />
      <GalleryPreview />
      <Testimonials />
      <VisitUs />
      <CtaBanner />
    </>
  );
}
