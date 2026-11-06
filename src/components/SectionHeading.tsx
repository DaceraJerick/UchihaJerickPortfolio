import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Section number shown in the eyebrow, e.g. "01". */
  index?: string;
  eyebrow: string;
  /** Headline; the `accent` part is shown after it in the accent color. */
  title: string;
  accent?: string;
  lead?: string;
  action?: { label: string; to: string };
  /** Render the title as the page's h1 instead of an h2. */
  as?: "h1" | "h2";
  className?: string;
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  accent,
  lead,
  action,
  as: Tag = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn("flex flex-col gap-5 md:flex-row md:items-end md:justify-between", className)}
    >
      <div className="min-w-0">
        <div className="mb-3 text-[11.5px] font-bold uppercase tracking-[0.16em] text-primary">
          {index && <span className="tabular-nums">{index} — </span>}
          {eyebrow}
        </div>
        <Tag
          className={cn(
            "font-semibold text-foreground",
            Tag === "h1"
              ? "text-[clamp(2.5rem,6vw,4.25rem)] leading-[1.02] tracking-[-0.045em]"
              : "text-[clamp(2rem,4.2vw,3.1rem)] leading-[1.08] tracking-[-0.04em]",
          )}
        >
          {title}
          {accent && <span className="text-primary"> {accent}</span>}
        </Tag>
        {lead && (
          <p className="mt-4 max-w-[640px] text-[17px] leading-relaxed text-muted-foreground">
            {lead}
          </p>
        )}
      </div>
      {action && (
        <Link
          to={action.to}
          className="group inline-flex shrink-0 items-center gap-1.5 self-start rounded-full border border-border px-4 py-2 text-xs font-semibold text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary md:self-auto"
        >
          {action.label}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-[3px]" />
        </Link>
      )}
    </div>
  );
}
