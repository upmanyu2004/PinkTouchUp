"use client";

import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import { whatsappLink, BUSINESS } from "@/lib/business";

/**
 * Instead of a fake contact form that goes nowhere, this composer opens a
 * WhatsApp chat with the message pre-filled — a real, working channel for
 * the salon to receive enquiries.
 */
export default function MessageComposer() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const ready = message.trim().length >= 3;
  const full = `Hello Pink Touch Up! ${message.trim()}${name.trim() ? ` — ${name.trim()}` : ""}`;

  return (
    <div className="card-soft p-8 sm:p-10">
      <p className="flex items-center gap-2 text-[0.68rem] font-medium uppercase tracking-[0.26em] text-gold">
        <MessageCircle className="size-4" strokeWidth={1.75} />
        Drop us a line
      </p>
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink">
        Questions, quotes, bridal plans?
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
        Write to us here and your message opens straight in WhatsApp to{" "}
        {BUSINESS.phoneDisplay} — no forms lost in the void.
      </p>

      <div className="mt-7 space-y-5">
        <div>
          <label htmlFor="ct-name" className="mb-1.5 block text-[0.7rem] font-medium uppercase tracking-[0.18em] text-ink-soft">
            Your name <span className="normal-case text-ink-soft/60">(optional)</span>
          </label>
          <input
            id="ct-name"
            type="text"
            value={name}
            maxLength={60}
            onChange={(e) => setName(e.target.value)}
            placeholder="What shall we call you?"
            className="field"
          />
        </div>
        <div>
          <label htmlFor="ct-msg" className="mb-1.5 block text-[0.7rem] font-medium uppercase tracking-[0.18em] text-ink-soft">
            Message
          </label>
          <textarea
            id="ct-msg"
            rows={4}
            value={message}
            maxLength={400}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="e.g. I'd like a quote for bridal makeup for 12th December…"
            className="field resize-none"
          />
          <p className="mt-1.5 text-right text-xs text-ink-soft/70">{message.length}/400</p>
        </div>
        <a
          href={ready ? whatsappLink(full) : undefined}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={!ready}
          onClick={(e) => {
            if (!ready) e.preventDefault();
          }}
          className={
            ready
              ? "inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-rose to-rouge px-7 py-4 text-[0.78rem] font-medium uppercase tracking-[0.16em] text-white shadow-soft transition hover:brightness-110"
              : "inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-full bg-blush-deep px-7 py-4 text-[0.78rem] font-medium uppercase tracking-[0.16em] text-white/80"
          }
        >
          <Send className="size-4" strokeWidth={1.75} />
          Open in WhatsApp
        </a>
      </div>
    </div>
  );
}
