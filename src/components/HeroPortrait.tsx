import { Code2 } from "lucide-react";

import jerickDark from "@/assets/jerick-dark.png";
import jerickLight from "@/assets/jerick-light.jpg";

const BADGE_TEXT = "SOFTWARE & MOBILE DEVELOPER • UCHIHA JERICK • ";

/** Spinning circular text badge with a code icon in the middle. */
function SpinBadge() {
  return (
    <div className="relative h-28 w-28 rounded-full border border-primary/40 bg-background/90 shadow-[0_0_30px_-8px_var(--cyan-glow)] backdrop-blur-sm sm:h-32 sm:w-32">
      <svg
        viewBox="0 0 100 100"
        className="animate-spin-slow absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <path id="badge-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <text className="fill-foreground text-[7.6px] font-semibold uppercase">
          {/* textLength = circle circumference, so the text wraps the circle exactly once */}
          <textPath href="#badge-circle" textLength="238" lengthAdjust="spacing">
            {BADGE_TEXT}
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-0 m-auto flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <Code2 className="h-5 w-5" />
      </div>
    </div>
  );
}

/** Corner bracket, like a camera / code-editor frame. */
function Corner({ className }: { className: string }) {
  return <span aria-hidden="true" className={`absolute h-6 w-6 border-primary ${className}`} />;
}

/** Arched photo frame with an outlined surname and a spinning badge. */
export function HeroPortrait() {
  return (
    <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[380px]">
      {/* Glow behind the frame */}
      <div
        aria-hidden="true"
        className="absolute inset-x-6 bottom-6 top-10 rounded-t-full bg-primary/20 blur-3xl"
      />

      <div className="relative">
        {/* Arched frame */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-t-full border border-primary/40 bg-card">
          <img
            src={jerickLight}
            alt="Dacera Jerick"
            className="absolute inset-0 h-full w-full object-cover object-[50%_30%] dark:opacity-0"
            loading="eager"
          />
          <img
            src={jerickDark}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-[50%_30%] opacity-0 dark:opacity-100"
            loading="eager"
          />
          {/* Fade into the page at the bottom */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background via-background/60 to-transparent"
          />
          {/* Outlined surname over the photo */}
          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-3 select-none text-center font-display text-[clamp(3.5rem,14vw,5.5rem)] font-bold leading-none tracking-tight text-transparent [-webkit-text-stroke:1.5px_var(--color-primary)]"
          >
            DACERA
          </span>
        </div>

        {/* Inset outline offset from the frame */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-3 rounded-t-full border border-border"
        />
        <Corner className="-bottom-3 -left-3 border-b-2 border-l-2" />
        <Corner className="-bottom-3 -right-3 border-b-2 border-r-2" />

        {/* Status chip */}
        <div className="absolute -left-4 top-1/2 inline-flex items-center gap-2 rounded-full border border-border bg-background/90 px-3 py-1.5 text-[11px] font-semibold shadow-lg backdrop-blur-sm sm:-left-10">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:hidden" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Open for OJT · 2027
        </div>

        {/* Spinning badge */}
        <div className="absolute -right-4 top-6 sm:-right-10">
          <SpinBadge />
        </div>
      </div>
    </div>
  );
}
