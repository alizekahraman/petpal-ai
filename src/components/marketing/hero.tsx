"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { HeroIllustration } from "./hero-illustration";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay },
});

const stats = [
  { value: "50K+", label: "Pet owners" },
  { value: "4.9★", label: "App rating" },
  { value: "200K+", label: "Records tracked" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full opacity-20"
          style={{ background: "radial-gradient(ellipse, var(--teal-light) 0%, transparent 70%)" }}
        />
        <div className="absolute top-32 right-0 w-64 h-64 rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, var(--lavender-light) 0%, transparent 70%)" }}
        />
        <div className="absolute bottom-20 left-0 w-48 h-48 rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, var(--peach-light) 0%, transparent 70%)" }}
        />
      </div>

      <div className="w-full max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-12 lg:gap-6 items-center">
        {/* ── Left: copy ── */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Badge */}
          <motion.div {...fadeUp(0.05)}>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-primary/25 bg-primary/8 text-primary mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Now with AI Pet Assistant
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            {...fadeUp(0.1)}
            className="text-4xl sm:text-5xl lg:text-[56px] font-semibold leading-[1.1] tracking-tight text-foreground mb-5"
          >
            Everything your pet{" "}
            <span className="relative inline-block">
              needs,
              <motion.span
                className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full"
                style={{ background: "linear-gradient(90deg, var(--teal), var(--sage))" }}
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              />
            </span>{" "}
            <br className="hidden sm:block" />
            all in one place.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            {...fadeUp(0.18)}
            className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-md mb-8"
          >
            Manage your pets, track their health, ask AI for guidance and stay
            connected with everything they need — from their first day home to
            their golden years.
          </motion.p>

          {/* CTAs */}
          <motion.div {...fadeUp(0.24)} className="flex flex-col sm:flex-row items-center gap-3 mb-10">
            <Link
              href="/signup"
              className="group inline-flex items-center gap-2 h-12 px-6 rounded-2xl bg-primary text-primary-foreground text-sm font-semibold shadow-[0_2px_12px_rgba(0,0,0,0.12)] hover:bg-primary/90 hover:shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-all duration-200 hover:-translate-y-0.5"
            >
              Get started free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 h-12 px-5 rounded-2xl border border-border text-sm font-medium text-foreground hover:bg-muted/60 transition-colors"
            >
              <span className="w-7 h-7 rounded-full bg-muted flex items-center justify-center">
                <Play className="w-3 h-3 ml-0.5 text-foreground" />
              </span>
              See how it works
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div {...fadeUp(0.3)} className="flex items-center gap-6 sm:gap-8">
            {stats.map(({ value, label }, i) => (
              <div key={label} className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold text-foreground">{value}</span>
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right: illustration ── */}
        <motion.div
          className="flex justify-center lg:justify-end"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <HeroIllustration />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-[10px] text-muted-foreground/60 font-medium tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          className="w-4 h-6 rounded-full border border-border/60 flex items-start justify-center pt-1.5"
          animate={{ y: [0, 3, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-1 h-1.5 rounded-full bg-muted-foreground/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
