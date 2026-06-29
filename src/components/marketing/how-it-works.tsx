"use client";

import { motion } from "framer-motion";
import { UserPlus, PawPrint, Sparkles } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Create your account",
    description:
      "Sign up in seconds. No credit card required. Start your 30-day free trial and explore every feature.",
    color: "bg-teal-light text-teal",
    line: "bg-teal/20",
  },
  {
    number: "02",
    icon: PawPrint,
    title: "Add your pets",
    description:
      "Tell us about your companions — their name, breed, age, and health history. The more you share, the smarter it gets.",
    color: "bg-lavender-light text-lavender",
    line: "bg-lavender/20",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Let AI guide you",
    description:
      "Get personalized health insights, feeding recommendations, and proactive reminders crafted for your unique pet.",
    color: "bg-sage-light text-sage",
    line: null,
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="py-24 px-5 md:px-8"
      style={{ background: "linear-gradient(180deg, var(--background) 0%, var(--teal-light) 30%, var(--lavender-light) 70%, var(--background) 100%)", opacity: 0.99 }}
    >
      <div
        className="py-24 px-5 md:px-8 rounded-3xl max-w-7xl mx-auto"
        style={{ background: "linear-gradient(135deg, var(--teal-light) 0%, var(--lavender-light) 100%)" }}
      >
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-white/60 text-foreground/70 mb-4">
            Simple by design
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground mb-4">
            Up and running in minutes
          </h2>
          <p className="text-muted-foreground text-base max-w-md mx-auto">
            Three simple steps and your pet has a digital health companion for life.
          </p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Connector line (desktop) */}
          <div className="absolute top-12 left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-px bg-border/40 hidden md:block" />

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  {/* Step number + icon */}
                  <div className="relative mb-5">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${step.color} bg-white/70 shadow-[0_2px_12px_rgba(0,0,0,0.06)]`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-foreground text-background text-[10px] font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
