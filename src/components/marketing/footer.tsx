import Link from "next/link";
import { PawPrint } from "lucide-react";
import { siteConfig } from "@/config/site";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Pricing", href: "#" },
    { label: "Changelog", href: "#" },
    { label: "Roadmap", href: "#" },
  ],
  Resources: [
    { label: "AI Assistant", href: "/ai-assistant" },
    { label: "Pet Health Blog", href: "#" },
    { label: "Vet Directory", href: "#" },
    { label: "Community", href: "#" },
    { label: "API Docs", href: "#" },
  ],
  Company: [
    { label: "About us", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
    { label: "Partners", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "GDPR", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-muted/30">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand column */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.10)]">
                <PawPrint className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold tracking-tight">{siteConfig.name}</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mb-5">
              The AI-powered platform for pet owners who want to give their companions the very best life.
            </p>
            {/* Social icons */}
            <div className="flex gap-2">
              {[
                { label: "Twitter", icon: "✕" },
                { label: "Instagram", icon: "◈" },
                { label: "TikTok", icon: "♪" },
              ].map(({ label, icon }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-8 h-8 rounded-xl bg-card border border-border/50 flex items-center justify-center text-sm text-muted-foreground hover:text-foreground hover:border-border transition-colors"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">
                {group}
              </h4>
              <ul className="space-y-2">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            Made with <span className="text-red-400">♥</span> for pet lovers everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
