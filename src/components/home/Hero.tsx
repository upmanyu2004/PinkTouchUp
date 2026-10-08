"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  CalendarHeart,
  Clock,
  HeartHandshake,
  MapPin,
  Sparkles,
} from "lucide-react";
import { CircleBadge, Petals } from "@/components/decor";
import { BUSINESS } from "@/lib/business";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yImg = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const yCard = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section
      ref={ref}
      className="grain relative overflow-hidden bg-cream pt-28 sm:pt-32"
    >
      {/* ambient blush auras */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-10 h-[34rem] w-[34rem] rounded-full bg-blush/80 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-0 h-[30rem] w-[30rem] rounded-full bg-gold-soft/40 blur-3xl"
      />
      <Petals count={8} />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pb-24">
        {/* ————— copy ————— */}
        <div className="relative z-10 max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="gold-rule text-[0.7rem] font-medium uppercase tracking-[0.32em] text-gold"
          >
            {BUSINESS.fullName}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease }}
            className="mt-6 font-display text-[3.4rem] font-medium leading-[0.98] tracking-tight text-ink sm:text-7xl lg:text-[5.4rem]"
          >
            Your Beauty,
            <br />
            <em className="text-gradient-rose font-semibold">Your Moment.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease }}
            className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft"
          >
            A ladies&apos; beauty parlour in the heart of Jaipur — hair, skin,
            makeup and bridal artistry, wrapped in one soft pink experience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.38, ease }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/book"
              className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-rose to-rouge px-8 py-4 text-sm font-medium uppercase tracking-[0.16em] text-white shadow-lift transition-all duration-300 hover:brightness-110 hover:shadow-soft"
            >
              <CalendarHeart className="size-5 transition-transform duration-300 group-hover:-rotate-12" />
              Book Your Appointment
            </Link>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/60 px-7 py-4 text-sm font-medium uppercase tracking-[0.16em] text-ink backdrop-blur transition-all duration-300 hover:border-rose hover:text-rouge"
            >
              Explore Services
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.55 }}
            className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-ink-soft"
          >
            <li className="flex items-center gap-2">
              <HeartHandshake className="size-4 text-rose" strokeWidth={1.75} />
              Ladies only
            </li>
            <li className="flex items-center gap-2">
              <Clock className="size-4 text-rose" strokeWidth={1.75} />
              10 AM – 8 PM
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="size-4 text-rose" strokeWidth={1.75} />
              Jaipur, Rajasthan
            </li>
          </motion.ul>
        </div>

        {/* ————— visual ————— */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          {/* gold offset arch */}
          <div
            aria-hidden
            className="absolute -inset-3 rounded-t-full rounded-b-[2.4rem] border border-gold/50 sm:-inset-4"
          />
          <motion.div
            style={{ y: yImg }}
            className="relative aspect-[3/4] overflow-hidden rounded-t-full rounded-b-[2rem] shadow-lift"
          >
            <Image
              src="/img/hero.jpg"
              alt="Soft glam makeup portrait at Pink Touch Up Beauty Parlour, Jaipur"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 44vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-rouge/25 via-transparent to-transparent" />
          </motion.div>

          {/* floating availability card */}
          <motion.div
            style={{ y: yCard }}
            className="absolute -left-6 top-16 hidden animate-float sm:block"
          >
            <div className="card-soft flex items-center gap-3 px-5 py-4 backdrop-blur">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose opacity-60" />
                <span className="relative inline-flex size-2.5 rounded-full bg-rose" />
              </span>
              <div>
                <p className="text-[0.62rem] font-medium uppercase tracking-[0.2em] text-ink-soft">
                  Slots open today
                </p>
                <p className="font-display text-lg font-semibold text-ink">
                  Reserve in 2 minutes
                </p>
              </div>
            </div>
          </motion.div>

          {/* spinning badge */}
          <div className="absolute -bottom-8 -right-4 hidden sm:block">
            <CircleBadge />
          </div>

          {/* chip */}
          <div className="absolute -right-3 top-8 hidden rotate-3 rounded-full border border-gold/40 bg-cream/90 px-4 py-2 text-[0.62rem] font-medium uppercase tracking-[0.22em] text-rouge shadow-card backdrop-blur sm:block">
            <span className="inline-flex items-center gap-2">
              <Sparkles className="size-3.5 text-gold" strokeWidth={1.75} />
              Bridal specialists
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
