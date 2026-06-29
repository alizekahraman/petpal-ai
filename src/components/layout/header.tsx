"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, PawPrint, Search, X, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ds/avatar";
import { Badge } from "@/components/ds/badge";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { siteConfig } from "@/config/site";
import { useAuth } from "@/hooks/use-auth";

const PLACEHOLDER_NOTIFICATIONS = [
  { id: "1", title: "Luna's vet visit tomorrow", time: "2h ago", read: false, type: "reminder" as const },
  { id: "2", title: "Mochi's flea treatment due", time: "5h ago", read: false, type: "health" as const },
  { id: "3", title: "Feeding logged successfully", time: "Yesterday", read: true, type: "feeding" as const },
];

interface HeaderProps {
  title?: string;
}

export function Header({ title }: HeaderProps) {
  const { user } = useAuth();
  const displayName = user?.user_metadata?.full_name ?? user?.email?.split("@")[0] ?? "You";
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [notifsOpen, setNotifsOpen] = React.useState(false);
  const searchRef = React.useRef<HTMLInputElement>(null);
  const unread = PLACEHOLDER_NOTIFICATIONS.filter((n) => !n.read).length;

  React.useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setNotifsOpen(false);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between gap-3 px-4 md:px-5 h-14 bg-background/80 backdrop-blur-lg border-b border-border/50">
      {/* Left */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Mobile logo */}
        <Link href="/dashboard" className="md:hidden flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <PawPrint className="w-3.5 h-3.5 text-primary-foreground" />
          </div>
          <span className="font-semibold text-sm">{siteConfig.name}</span>
        </Link>

        {/* Desktop page title */}
        {title && (
          <h1 className="hidden md:block text-sm font-semibold text-foreground">{title}</h1>
        )}
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-1 shrink-0">
        {/* Search */}
        <AnimatePresence mode="wait">
          {searchOpen ? (
            <motion.div
              key="search-open"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 220, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="flex items-center overflow-hidden"
            >
              <div className="flex items-center w-full h-9 bg-muted rounded-xl px-3 gap-2">
                <Search className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                <input
                  ref={searchRef}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search pets, records..."
                  className="flex-1 text-sm bg-transparent outline-none text-foreground placeholder:text-muted-foreground/60 min-w-0"
                />
                <button onClick={() => { setSearchOpen(false); setSearchQuery(""); }}>
                  <X className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground transition-colors" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.button
              key="search-icon"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSearchOpen(true)}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <Search className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>

        <ThemeToggle />

        {/* Notifications */}
        <div className="relative">
          <motion.button
            whileTap={{ scale: 0.92 }}
            transition={{ duration: 0.1 }}
            onClick={() => setNotifsOpen((v) => !v)}
            className="relative w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <Bell className="w-4 h-4" />
            <AnimatePresence>
              {unread > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary border-2 border-background"
                />
              )}
            </AnimatePresence>
          </motion.button>

          {/* Notifications panel */}
          <AnimatePresence>
            {notifsOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setNotifsOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-0 top-11 z-20 w-72 bg-card rounded-2xl border border-border/50 shadow-modal overflow-hidden"
                >
                  <div className="px-4 py-3 border-b border-border/50 flex items-center justify-between">
                    <p className="text-sm font-semibold">Notifications</p>
                    {unread > 0 && (
                      <Badge color="primary" variant="soft" size="xs">{unread} new</Badge>
                    )}
                  </div>

                  <div className="divide-y divide-border/40 max-h-64 overflow-y-auto scrollbar-none">
                    {PLACEHOLDER_NOTIFICATIONS.map((notif) => (
                      <motion.div
                        key={notif.id}
                        className={cn(
                          "flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-muted/50 transition-colors",
                          !notif.read && "bg-primary/[0.03]"
                        )}
                        whileHover={{ x: 1 }}
                        transition={{ duration: 0.1 }}
                      >
                        <div className={cn(
                          "w-2 h-2 rounded-full mt-1.5 shrink-0",
                          notif.read ? "bg-transparent" : "bg-primary"
                        )} />
                        <div className="flex-1 min-w-0">
                          <p className={cn("text-xs leading-relaxed", notif.read ? "text-muted-foreground" : "text-foreground font-medium")}>
                            {notif.title}
                          </p>
                          <p className="text-[10px] text-muted-foreground/60 mt-0.5">{notif.time}</p>
                        </div>
                        {notif.read && <CheckCircle2 className="w-3.5 h-3.5 text-muted-foreground/30 shrink-0 mt-0.5" />}
                      </motion.div>
                    ))}
                  </div>

                  <div className="px-4 py-2.5 border-t border-border/50">
                    <button className="text-xs text-primary hover:underline">Mark all as read</button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Avatar */}
        <Avatar name={displayName} size="sm" status="online" className="cursor-pointer ml-1" />
      </div>
    </header>
  );
}
