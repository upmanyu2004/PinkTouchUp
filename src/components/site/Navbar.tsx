"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarHeart, Menu, X } from "lucide-react";
import Logo from "./Logo";
import { cn } from "@/lib/cn";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-line/70 bg-cream/85 py-3 shadow-[0_10px_40px_-20px_rgba(142,47,82,0.25)] backdrop-blur-xl"
            : "bg-transparent py-5",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
          <Logo />

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {LINKS.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group relative text-[0.82rem] font-medium uppercase tracking-[0.18em] transition-colors",
                    active ? "text-rouge" : "text-ink/70 hover:text-rouge",
                  )}
                >
                  {l.label}
                  <span
                    className={cn(
                      "absolute -bottom-1.5 left-0 h-px bg-gradient-to-r from-rose to-gold transition-all duration-300",
                      active ? "w-full" : "w-0 group-hover:w-full",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/book"
              className="group hidden items-center gap-2 rounded-full bg-gradient-to-r from-rose to-rouge px-5 py-2.5 text-[0.8rem] font-medium uppercase tracking-[0.16em] text-white shadow-soft transition-all duration-300 hover:shadow-lift hover:brightness-105 sm:inline-flex"
            >
              <CalendarHeart className="size-4 transition-transform duration-300 group-hover:-rotate-12" />
              Book Now
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="grid size-11 place-items-center rounded-full border border-line bg-white/70 text-ink backdrop-blur transition hover:border-rose lg:hidden"
            >
              <Menu className="size-5" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grain fixed inset-0 z-[60] flex flex-col bg-gradient-to-b from-blush via-cream to-shell lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex items-center justify-between px-5 py-5 sm:px-8">
              <Logo />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid size-11 place-items-center rounded-full border border-line bg-white/80 text-ink transition hover:border-rose"
              >
                <X className="size-5" strokeWidth={1.75} />
              </button>
            </div>

            <nav
              aria-label="Mobile"
              className="flex flex-1 flex-col items-center justify-center gap-1 px-8"
            >
              {LINKS.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={l.href}
                    className={cn(
                      "block py-2 text-center font-display text-4xl font-medium transition-colors",
                      pathname === l.href ? "text-gradient-rose italic" : "text-ink hover:text-rouge",
                    )}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8"
              >
                <Link
                  href="/book"
                  className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-rose to-rouge px-8 py-4 text-sm font-medium uppercase tracking-[0.18em] text-white shadow-lift"
                >
                  <CalendarHeart className="size-5" />
                  Book Appointment
                </Link>
              </motion.div>
            </nav>

            <p className="pb-10 text-center text-xs uppercase tracking-[0.3em] text-ink-soft">
              Your Beauty, Your Moment
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
