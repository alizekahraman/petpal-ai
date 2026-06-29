"use client";

import { Bell, PawPrint, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { siteConfig } from "@/config/site";

interface HeaderProps {
  title?: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between px-4 md:px-6 h-14 bg-background/80 backdrop-blur-lg border-b border-border">
      {/* Mobile logo / desktop page title */}
      <div className="flex items-center gap-2">
        <div className="md:hidden flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <PawPrint className="w-3.5 h-3.5 text-primary-foreground" />
          </div>
          <span className="font-semibold text-sm">{siteConfig.name}</span>
        </div>
        {title && (
          <h1 className="hidden md:block text-base font-semibold text-foreground">{title}</h1>
        )}
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button variant="ghost" size="icon" className="relative rounded-xl">
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-primary" />
        </Button>
        <Avatar className="w-8 h-8 cursor-pointer">
          <AvatarImage src="" alt="User" />
          <AvatarFallback className="bg-accent text-accent-foreground text-xs font-semibold">
            JD
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
