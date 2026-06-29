"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { PawPrint, Menu, X } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { siteConfig } from "@/config/site";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#faq", label: "FAQ" },
];

export function MarketingNav() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 60], [0, 1]);
  const borderOpacity = useTransform(scrollY, [0, 60], [0, 1]);
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-8 h-16"
      >
        {/* Background */}
        <motion.div
          className="absolute inset-0 bg-background/90 backdrop-blur-md border-b border-border"
          style={{ opacity: bgOpacity }}
        />
        <motion.div
          className="absolute inset-x-0 bottom-0 h-px bg-border"
          style={{ opacity: borderOpacity }}
        />

        {/* Logo */}
        <Link href="/" className="relative flex items-center gap-2.5 z-10">
          <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
            <PawPrint className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-semibold text-base tracking-tight">{siteConfig.name}</span>
        </Link>

        {/* Desktop nav */}
        <nav className="relative z-10 hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="px-3.5 py-2 text-sm text-muted-foreground hover:text-foreground rounded-xl hover:bg-muted/60 transition-colors font-medium"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Right */}
        <div className="relative z-10 flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/login"
            className="hidden md:inline-flex h-9 items-center px-4 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="hidden md:inline-flex h-9 items-center px-4 rounded-xl text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-[0_1px_3px_rgba(0,0,0,0.10)]"
          >
            Get started
          </Link>
          {/* Mobile menu toggle */}
          <button
            className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 bg-background/95 backdrop-blur-lg border-b border-border px-5 py-4 space-y-1 md:hidden"
          >
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center h-11 px-4 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
              >
                {label}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <Link href="/login"
                className="flex items-center justify-center h-11 rounded-xl border border-border text-sm font-medium hover:bg-muted/60 transition-colors">
                Sign in
              </Link>
              <Link href="/signup"
                className="flex items-center justify-center h-11 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
                Get started free
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
