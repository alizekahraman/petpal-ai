"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, PawPrint } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 px-5 md:px-8">
      <motion.div
        className="max-w-4xl mx-auto rounded-3xl overflow-hidden relative"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Gradient background */}
        <div className="absolute inset-0 petpal-gradient opacity-80" />
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 70% 50%, var(--lavender-light) 0%, transparent 60%)" }} />

        {/* Decorative paw prints */}
        <div className="absolute -right-4 -top-4 opacity-10">
          <PawPrint className="w-32 h-32 text-teal" style={{ color: "var(--teal)" }} />
        </div>
        <div className="absolute -left-6 -bottom-6 opacity-10 rotate-12">
          <PawPrint className="w-40 h-40 text-sage" style={{ color: "var(--sage)" }} />
        </div>

        <div className="relative z-10 px-8 md:px-14 py-16 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm text-foreground/70 text-xs font-semibold px-4 py-2 rounded-full border border-white/60 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" />
            Free forever plan available
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-5 leading-tight">
            Your pet deserves the <br className="hidden sm:block" />
            best care possible.
          </h2>

          <p className="text-muted-foreground text-base max-w-md mx-auto mb-9 leading-relaxed">
            Join 50,000+ pet owners who are already giving their companions a
            healthier, happier life with PetPal AI.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/signup"
              className="group inline-flex items-center gap-2 h-13 px-7 py-3.5 rounded-2xl bg-foreground text-background text-sm font-semibold hover:bg-foreground/90 transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
            >
              Start for free — no card needed
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 h-13 px-6 py-3.5 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/60 text-sm font-medium text-foreground hover:bg-white/70 transition-colors"
            >
              Already have an account
            </Link>
          </div>

          {/* Trust line */}
          <p className="mt-6 text-xs text-muted-foreground/70">
            No credit card · Cancel anytime · 30-day free trial
          </p>
        </div>
      </motion.div>
    </section>
  );
}
