"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "PetPal AI completely changed how I care for my dogs. The AI assistant caught that Biscuit's lethargy might be diet-related — the vet confirmed it. It literally helped save his life.",
    name: "Sarah M.",
    role: "Dog mom of 2",
    avatar: "SM",
    pet: "Biscuit & Maple",
    petEmoji: "🐕",
    rating: 5,
    color: "from-teal-light to-sage-light",
    accentColor: "text-teal",
  },
  {
    quote:
      "I used to forget Luna's flea treatment every single month. Now I get a gentle reminder and the whole health history is there. The design is so calming — I actually enjoy opening the app.",
    name: "James K.",
    role: "Cat parent",
    avatar: "JK",
    pet: "Luna",
    petEmoji: "🐈",
    rating: 5,
    color: "from-lavender-light to-teal-light",
    accentColor: "text-lavender",
  },
  {
    quote:
      "As a vet, I recommend PetPal AI to all my clients. The vaccination records and health timeline are incredibly detailed. It makes every appointment so much more productive.",
    name: "Dr. Priya N.",
    role: "Veterinarian & pet owner",
    avatar: "PN",
    pet: "Chai (Corgi)",
    petEmoji: "🐶",
    rating: 5,
    color: "from-peach-light to-lavender-light",
    accentColor: "text-peach",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 px-5 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-primary/8 text-primary border border-primary/20 mb-4">
            Loved by pet owners
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground mb-4">
            Real stories from real pet families
          </h2>
          <p className="text-muted-foreground text-base max-w-md mx-auto">
            Over 50,000 pet owners trust PetPal AI to help them be the best
            companion possible.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="relative bg-card rounded-3xl border border-border/50 p-7 flex flex-col gap-5 shadow-[0_1px_3px_rgba(0,0,0,0.03),0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.07)] transition-shadow"
            >
              {/* Gradient top accent */}
              <div className={`absolute top-0 left-6 right-6 h-0.5 rounded-full bg-gradient-to-r ${t.color}`} />

              <Stars count={t.rating} />

              <blockquote className="text-sm text-foreground/85 leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center text-xs font-bold text-foreground/70 shrink-0`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
                {/* Pet tag */}
                <div className="ml-auto flex items-center gap-1 text-xs text-muted-foreground bg-muted rounded-full px-2.5 py-1">
                  <span>{t.petEmoji}</span>
                  <span>{t.pet}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust bar */}
        <motion.div
          className="mt-14 flex flex-wrap items-center justify-center gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {[
            { label: "App Store", rating: "4.9", reviews: "2.4K ratings" },
            { label: "Google Play", rating: "4.8", reviews: "1.8K ratings" },
            { label: "Product Hunt", rating: "#1", reviews: "Product of the day" },
          ].map((award) => (
            <div key={award.label} className="flex items-center gap-3 text-muted-foreground">
              <div className="text-2xl font-bold text-foreground">{award.rating}</div>
              <div>
                <div className="text-xs font-medium text-foreground">{award.label}</div>
                <div className="text-xs">{award.reviews}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
