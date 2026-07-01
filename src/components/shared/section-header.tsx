import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface SectionHeaderProps {
  label: string;
  href?: string;
  linkLabel?: string;
}

/** Consistent section title with optional "See all" link. Used across dashboard pages. */
export function SectionHeader({ label, href, linkLabel }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-sm font-semibold text-foreground">{label}</h3>
      {href && linkLabel && (
        <Link
          href={href}
          className="flex items-center gap-0.5 text-xs font-medium text-primary hover:opacity-80 transition-opacity"
        >
          {linkLabel}
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      )}
    </div>
  );
}
