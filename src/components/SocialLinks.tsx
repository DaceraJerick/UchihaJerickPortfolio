import { Github, Facebook, Mail, BookOpen, Calendar } from "lucide-react";

export function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V9.39a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.82z" />
    </svg>
  );
}

const socials = [
  { href: "https://github.com/DaceraJerick", label: "GitHub", Icon: Github },
  { href: "https://www.facebook.com/dacera.jerick", label: "Facebook", Icon: Facebook },
  { href: "https://tiktok.com/@jerick_28dacera", label: "TikTok", Icon: TikTokIcon },
];

export function SocialIconRow() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {socials.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={label}
          className="group flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary hover:glow-cyan"
        >
          <Icon className="h-4.5 w-4.5" />
        </a>
      ))}
    </div>
  );
}

export function ConnectButtons() {
  return (
    <div className="flex flex-wrap gap-3">
      <a
        href="mailto:dacerajerick38@gmail.com"
        className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary transition-all hover:bg-primary/20 hover:glow-cyan"
      >
        <Mail className="h-4 w-4" />
        Send Email
      </a>
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:-translate-y-0.5 hover:border-primary/40"
      >
        <Calendar className="h-4 w-4" />
        Schedule a Call
      </button>
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:-translate-y-0.5 hover:border-primary/40"
      >
        <BookOpen className="h-4 w-4" />
        Read my blog
      </button>
    </div>
  );
}
