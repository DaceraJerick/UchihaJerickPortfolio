import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  viewAllHref?: string;
  viewAllLabel?: string;
}

export function SectionHeader({ eyebrow, title, viewAllHref, viewAllLabel = "View all" }: SectionHeaderProps) {
  return (
    <div className="mb-8 flex items-end justify-between gap-6">
      <div>
        {eyebrow && (
          <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-primary">
            <span className="h-px w-6 bg-primary" />
            {eyebrow}
          </div>
        )}
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h2>
      </div>
      {viewAllHref && (
        <Link
          to={viewAllHref}
          className="group inline-flex shrink-0 items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          {viewAllLabel}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      )}
    </div>
  );
}
