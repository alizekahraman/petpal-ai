"use client";

import { motion } from "framer-motion";

const features = [
  {
    emoji: "🐶",
    title: "AI Pet Assistant",
    description:
      "Ask anything — from nutrition tips to symptom checks. Our AI knows your pet personally and learns over time.",
    color: "bg-teal-light",
    accent: "text-teal",
    border: "hover:border-teal/30",
  },
  {
    emoji: "📅",
    title: "Health Tracking",
    description:
      "Log vet visits, medications, weight changes, and health milestones all in one beautiful timeline.",
    color: "bg-sage-light",
    accent: "text-sage",
    border: "hover:border-sage/30",
  },
  {
    emoji: "💉",
    title: "Vaccination History",
    description:
      "Never miss a booster again. Smart reminders keep your pet's vaccinations perfectly up to date.",
    color: "bg-lavender-light",
    accent: "text-lavender",
    border: "hover:border-lavender/30",
  },
  {
    emoji: "📸",
    title: "Growth Journal",
    description:
      "Capture milestones and memories. Watch your pet's journey from puppy to senior in a beautiful visual diary.",
    color: "bg-peach-light",
    accent: "text-peach",
    border: "hover:border-peach/30",
  },
  {
    emoji: "🍖",
    title: "Nutrition Guide",
    description:
      "Personalized meal plans, portion tracking, and ingredient scanning — tailored to your pet's breed and age.",
    color: "bg-sage-light",
    accent: "text-sage",
    border: "hover:border-sage/30",
  },
  {
    emoji: "❤️",
    title: "Community",
    description:
      "Connect with other pet lovers. Share tips, ask questions, and celebrate milestones together.",
    color: "bg-teal-light",
    accent: "text-teal",
    border: "hover:border-teal/30",
  },
];

/* stagger via transition prop on the container motion element */

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-5 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-primary/8 text-primary border border-primary/20 mb-4">
            Everything you need
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground mb-4">
            Built for every chapter of <br className="hidden sm:block" />
            your pet&apos;s life
          </h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto leading-relaxed">
            From day one at home to their golden years — PetPal AI is the only
            companion you and your pet will ever need.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ y: -4 }}
              className={`group relative bg-card rounded-3xl border border-border/50 p-7 cursor-default transition-all duration-200 ${f.border} hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)]`}
            >
              {/* Emoji icon */}
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl text-3xl mb-5 ${f.color}`}>
                {f.emoji}
              </div>

              <h3 className="text-base font-semibold text-foreground mb-2.5">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>

              {/* Corner accent */}
              <div className={`absolute top-5 right-5 w-2 h-2 rounded-full ${f.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
