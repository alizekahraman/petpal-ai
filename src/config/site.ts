export const siteConfig = {
  name: "PetPal AI",
  description: "Manage all aspects of your pet's life in one place.",
  url: "https://petpal.ai",
  ogImage: "/og.png",
  links: {
    twitter: "https://twitter.com/petpalai",
    github: "https://github.com/petpalai",
  },
} as const;

export const navLinks = [
  { href: "/dashboard", label: "Home", icon: "LayoutDashboard" },
  { href: "/pets", label: "My Pets", icon: "PawPrint" },
  { href: "/health", label: "Health", icon: "HeartPulse" },
  { href: "/feeding", label: "Feeding", icon: "UtensilsCrossed" },
  { href: "/schedule", label: "Schedule", icon: "Calendar" },
  { href: "/ai-assistant", label: "AI Assistant", icon: "Sparkles" },
  { href: "/settings", label: "Settings", icon: "Settings" },
] as const;
