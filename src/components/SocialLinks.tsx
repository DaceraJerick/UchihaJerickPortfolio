import { Github, Facebook, Mail, BookOpen, Calendar, Instagram, Linkedin } from "lucide-react";

export function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V9.39a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.82z" />
    </svg>
  );
}

export function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.703-.331 4.965c.487 0 .702-.223.974-.488l2.338-2.274 4.861 3.59c.896.495 1.541.24 1.764-.83l3.19-15.039c.327-1.308-.501-1.902-1.353-1.503z" />
    </svg>
  );
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.472 14.382c-.301-.149-1.767-.872-2.041-.971-.275-.099-.475-.149-.675.149-.199.299-.775.971-.949 1.17-.175.199-.349.224-.65.075-.301-.149-1.27-.468-2.42-1.494-1.15-1.026-1.925-2.294-2.15-2.668-.225-.374-.025-.577.125-.724.135-.133.301-.349.45-.524.149-.174.199-.299.299-.499.099-.199.05-.374-.025-.524-.075-.149-.675-1.623-.925-2.221-.243-.584-.489-.505-.675-.514-.174-.009-.374-.01-.575-.01-.199 0-.524.075-.798.374-.275.299-1.047 1.022-1.047 2.493s1.072 2.893 1.222 3.093c.15.199 2.11 3.222 5.11 4.521.714.309 1.271.493 1.706.632.716.227 1.368.195 1.884.118.575-.085 1.767-.723 2.016-1.42.249.61.127.876.127 1.17 0 .299-.149.574-.299.723z" />
    </svg>
  );
}

export function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.317 4.37c-1.215-.559-2.51-.973-3.865-1.216a.048.048 0 00-.05.025c-.165.294-.344.67-.472.973-1.472-.22-2.937-.22-4.39 0-.128-.303-.312-.679-.478-.973a.048.048 0 00-.05-.025c-1.355.243-2.65.657-3.865 1.216a.046.046 0 00-.022.017C4.695 8.163 3.978 11.856 4.316 15.485c.002.014.009.028.02.037 1.63 1.2 3.208 1.93 4.757 2.41a.05.05 0 00.053-.017c.366-.499.69-1.03 0.963-1.583a.049.049 0 00-.026-.067c-.516-.195-1.008-.435-1.476-.716a.05.05 0 01-.005-.083c.1-.073.2-.15.295-.229a.048.048 0 01.05-.007c3.124 1.428 6.49 1.428 9.57 0a.047.047 0 01.051.007c.095.079.195.156.296.229a.049.049 0 01-.004.083c-.468.281-.96.52-1.476.716a.049.049 0 00-.026.068c.273.553.597 1.084.963 1.583a.05.05 0 00.053.017c1.55-.48 3.127-1.21 4.757-2.41a.048.048 0 00.02-.037c.417-4.148-.707-7.808-3.08-11.1a.046.046 0 00-.022-.016zM9.01 12.87c-.927 0-1.688-.852-1.688-1.897s.741-1.897 1.688-1.897c.957 0 1.707.852 1.707 1.897s-.74 1.897-1.706 1.897zm6.002 0c-.926 0-1.687-.852-1.687-1.897s.74-1.897 1.687-1.897c.958 0 1.708.852 1.708 1.897s-.74 1.897-1.708 1.897z" />
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
