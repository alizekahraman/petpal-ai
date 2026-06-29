"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "Is PetPal AI free to use?",
    answer:
      "Yes — you can start completely free with up to 2 pets. Our free plan includes health tracking, vaccination reminders, and the feeding log. Premium plans unlock unlimited pets, AI conversations, the growth journal, and advanced analytics.",
  },
  {
    question: "Which pets does PetPal AI support?",
    answer:
      "PetPal AI supports dogs, cats, birds, rabbits, fish, reptiles, and more. Our AI assistant has been trained on a wide variety of species so you'll get relevant advice no matter what kind of companion you have.",
  },
  {
    question: "How does the AI Pet Assistant work?",
    answer:
      "The AI assistant is powered by the latest language models fine-tuned on veterinary knowledge. It knows your specific pet's profile — breed, age, weight, and health history — and tailors every response accordingly. It's not a replacement for a vet, but it's the next best thing for everyday questions.",
  },
  {
    question: "Is my pet's health data secure?",
    answer:
      "Absolutely. All data is encrypted at rest and in transit. We never sell your data, and you can export or delete everything at any time. Your pet's records belong to you.",
  },
  {
    question: "Can I share my pet's profile with my vet?",
    answer:
      "Yes. You can generate a shareable health summary PDF in seconds — perfect for bringing to vet appointments. It includes vaccination history, medication logs, weight trends, and any notes you've added.",
  },
  {
    question: "Does PetPal AI work with multiple pets?",
    answer:
      "Of course. Many of our users are multi-pet households. Each pet gets their own profile, timeline, and AI context so nothing gets mixed up. The dashboard gives you a beautiful overview of all your pets at once.",
  },
];

function FaqItem({ question, answer, isOpen, onToggle }: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={cn(
      "border border-border/50 rounded-2xl overflow-hidden transition-colors duration-200",
      isOpen ? "bg-card" : "bg-card/50 hover:bg-card"
    )}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className={cn(
          "text-sm font-medium transition-colors duration-150",
          isOpen ? "text-primary" : "text-foreground"
        )}>
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors",
            isOpen ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
          )}
        >
          <Plus className="w-3.5 h-3.5" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <section id="faq" className="py-24 px-5 md:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-primary/8 text-primary border border-primary/20 mb-4">
            Got questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground mb-4">
            Frequently asked questions
          </h2>
          <p className="text-muted-foreground text-base">
            Everything you need to know about PetPal AI.
          </p>
        </motion.div>

        <motion.div
          className="space-y-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {faqs.map((faq, i) => (
            <FaqItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>

        <motion.p
          className="text-center text-sm text-muted-foreground mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Still have questions?{" "}
          <a href="mailto:hello@petpal.ai" className="text-primary hover:underline font-medium">
            Chat with us
          </a>
        </motion.p>
      </div>
    </section>
  );
}
