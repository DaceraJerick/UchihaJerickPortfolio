import * as React from "react";
import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/stack", label: "Stack" },
  { to: "/contact", label: "Contact" },
] as const;

export const HEADER_HEIGHT = 72;

export function Header() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[72px] border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-8">
        <Link to="/" className="group flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/40 bg-primary/10 text-sm font-bold text-primary transition-all group-hover:bg-primary/20 group-hover:glow-cyan">
            J
          </span>
          <span className="text-sm font-semibold tracking-tight text-foreground">
            Jerick<span className="text-primary">.dev</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: link.to === "/" }}
              className="group relative py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground transition-colors duration-200 hover:text-foreground data-[status=active]:text-primary"
            >
              {link.label}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-[2px] h-[2px] origin-left scale-x-0 rounded-full bg-primary transition-transform duration-200 group-hover:scale-x-50 group-data-[status=active]:scale-x-100"
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            to="/contact"
            className="hidden items-center rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-6px_var(--cyan-glow)] sm:inline-flex"
          >
            Get in touch
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card text-foreground md:hidden"
              >
                <Menu className="h-4 w-4" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="flex w-[86vw] max-w-[360px] flex-col gap-0 p-0">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <SheetDescription className="sr-only">Site navigation</SheetDescription>
              <nav aria-label="Mobile" className="mt-14 flex flex-col border-t border-border">
                {navLinks.map((link, i) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    activeOptions={{ exact: link.to === "/" }}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 border-b border-border px-6 py-4 text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-primary"
                  >
                    <span className="text-xs font-semibold tabular-nums text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-3xl font-semibold tracking-tight">
                      {link.label}
                    </span>
                  </Link>
                ))}
              </nav>
              <div className="mt-auto p-6">
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex w-full items-center justify-center rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground",
                  )}
                >
                  Get in touch
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
