import { createFileRoute } from "@tanstack/react-router";
import {
  Calendar,
  Mail,
  BookOpen,
  ChevronRight,
  Github,
  Facebook,
  MapPin,
  GraduationCap,
  Award,
  ExternalLink,
} from "lucide-react";

import { FadeIn } from "@/components/FadeIn";
import { ProjectCard } from "@/components/ProjectCard";
import { ThemeToggle } from "@/components/ThemeToggle";
import { techStack, projects, certifications } from "@/data/portfolio";
import jerickDark from "@/assets/jerick-dark.png";
import jerickLight from "@/assets/jerick-light.jpg";
import { ContactFlow } from "@/components/ContactFlow";
import { Recommendations } from "@/components/Recommendations";
import { TikTokIcon, TelegramIcon, WhatsAppIcon, DiscordIcon } from "@/components/SocialLinks";
import { Instagram, Linkedin } from "lucide-react";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function SectionTitle({ title, viewAll }: { title: string; viewAll?: boolean }) {
  return (
    <div className="flex items-center justify-between border-b border-border/70 px-5 py-3">
      <h2 className="text-sm font-semibold tracking-tight text-foreground">{title}</h2>
      {viewAll && (
        <button
          type="button"
          className="inline-flex items-center gap-0.5 text-xs text-muted-foreground transition-colors hover:text-primary"
        >
          View All <ChevronRight className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}

function Panel({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <div id={id} className={`overflow-hidden rounded-2xl border border-border bg-card ${className}`}>
      {children}
    </div>
  );
}

function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
        {/* PROFILE HEADER */}
        <FadeIn>
          <Panel>
            <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:gap-6">
              {/* Avatar */}
              <div className="relative shrink-0">
                <div className="relative h-20 w-20 overflow-hidden rounded-full border border-border bg-secondary/40">
                  <img
                    src={jerickLight}
                    alt="Dacera Jerick"
                    className="absolute inset-0 h-full w-full object-cover dark:opacity-0"
                    loading="eager"
                  />
                  <img
                    src={jerickDark}
                    alt="Dacera Jerick"
                    className="absolute inset-0 h-full w-full object-cover opacity-0 dark:opacity-100"
                    loading="eager"
                  />
                </div>
              </div>

              {/* Name + meta */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h1 className="truncate text-xl font-bold tracking-tight sm:text-2xl">
                    Dacera Jerick
                  </h1>
                  <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    ✓
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  Cantilan, Surigao del Sur, Philippines
                </div>
                <div className="mt-1 text-sm text-foreground/90">
                  Full-Stack Developer <span className="text-muted-foreground">\</span> Student
                  <span className="text-muted-foreground"> \ </span> Uchiha Jerick
                </div>
              </div>

              {/* Right badge */}
              <div className="shrink-0">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
                  <GraduationCap className="h-3.5 w-3.5" />
                  NEMSU Cantilan · 3rd Year
                </div>
              </div>
            </div>

            {/* CTA row */}
            <div className="flex flex-wrap gap-2 border-t border-border/70 bg-background/30 px-5 py-3">
              <button
                type="button"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-all hover:border-primary/40 hover:text-primary"
              >
                <Calendar className="h-3.5 w-3.5" />
                Schedule a Call
              </button>
              <a
                href="mailto:dacerajerick38@gmail.com"
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-all hover:border-primary/40 hover:text-primary"
              >
                <Mail className="h-3.5 w-3.5" />
                Send Email
              </a>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-all hover:border-primary/40 hover:text-primary"
              >
                <BookOpen className="h-3.5 w-3.5" />
                Read my blog
              </button>
              <div className="ml-auto">
                <ThemeToggle />
              </div>
            </div>
          </Panel>
        </FadeIn>

        {/* ABOUT + EXPERIENCE */}
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <FadeIn className="lg:col-span-2">
            <Panel className="h-full">
              <SectionTitle title="About" />
              <div className="space-y-3 p-5 text-sm leading-relaxed text-foreground/85">
                <p>
                  I am <span className="text-foreground">Dacera Jerick</span>, widely known as{" "}
                  <span className="text-primary">Uchiha Jerick</span> in our school. I'm currently a
                  3rd-year student at NEMSU Cantilan Campus. Since my 1st year, I have always been
                  the leader of our group projects.
                </p>
                <p>
                  I also help my classmates with their projects — and yes, they pay me for it.
                  I develop full-stack applications and websites, from the user interface all the
                  way down to the database.
                </p>
                <p className="text-muted-foreground">
                  Outside of school work, I'm constantly tinkering with new frameworks, exploring
                  AI tooling, and pushing myself to ship cleaner, faster software.
                </p>
              </div>
            </Panel>
          </FadeIn>

          <FadeIn delay={80}>
            <Panel className="h-full">
              <SectionTitle title="Experience" />
              <div className="divide-y divide-border/70">
                <div className="flex items-start gap-3 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-primary/30 bg-primary/10 text-primary">
                    <GraduationCap className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-sm font-semibold text-foreground">
                        BS Information Technology
                      </div>
                      <div className="shrink-0 text-[11px] font-medium text-muted-foreground">
                        3rd Year
                      </div>
                    </div>
                    <div className="mt-0.5 text-xs text-muted-foreground">
                      NEMSU Cantilan Campus
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-primary/30 bg-primary/10 text-base">
                    👋
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-sm font-semibold text-foreground">Hello World!</div>
                      <div className="shrink-0 text-[11px] font-medium text-muted-foreground">2020</div>
                    </div>
                    <div className="mt-0.5 text-xs text-muted-foreground">
                      Wrote my first line of code
                    </div>
                  </div>
                </div>
              </div>
            </Panel>
          </FadeIn>
        </div>

        {/* TECH STACK */}
        <FadeIn delay={60} className="mt-4">
          <Panel>
            <SectionTitle title="Tech Stack" viewAll />
            <div className="space-y-4 p-5">
              {techStack.map((group) => (
                <div key={group.category}>
                  <div className="mb-2 text-xs font-medium text-foreground/90">{group.category}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-md border border-border bg-secondary/50 px-2 py-1 text-[11px] text-foreground/80 transition-colors hover:border-primary/40 hover:text-primary"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </FadeIn>

        {/* RECENT PROJECTS */}
        <FadeIn delay={60} className="mt-4">
          <Panel>
            <SectionTitle title="Recent Projects" viewAll />
            <div className="grid gap-3 p-5 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <ProjectCard
                  key={p.title}
                  title={p.title}
                  description={p.description}
                  status={p.status}
                  tags={[...p.tags]}
                  url={"url" in p ? p.url : undefined}
                />
              ))}
            </div>
          </Panel>
        </FadeIn>

        {/* CERTIFICATIONS + RECOMMENDATIONS */}
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <FadeIn>
            <Panel>
              <SectionTitle title="Recent Certifications" viewAll />
              <div className="space-y-2 p-5">
                {certifications.map((cert) => (
                  <a
                    key={cert.code}
                    href={cert.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group flex items-center gap-3 rounded-lg border border-border bg-background/40 p-3 transition-all hover:border-primary/40"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-primary/30 bg-primary/10 text-primary">
                      <Award className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="truncate text-sm font-semibold text-foreground group-hover:text-primary">
                        {cert.title}
                      </div>
                    </div>
                    <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                  </a>
                ))}
              </div>
            </Panel>
          </FadeIn>

          <FadeIn delay={80}>
            <Panel className="h-full">
              <SectionTitle title="Recommendations" />
              <Recommendations />
            </Panel>
          </FadeIn>
        </div>

        {/* FOOTER GRID: Member / Social / Speaking / Blog */}
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <FadeIn>
            <Panel className="h-full">
              <div className="p-5">
                <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  A student of
                </div>
                <ul className="mt-3 space-y-2 text-sm text-foreground/90">
                  <li>NEMSU Cantilan Campus</li>
                  <li className="text-muted-foreground">BS Information Technology</li>
                </ul>
              </div>
            </Panel>
          </FadeIn>

          <FadeIn delay={60}>
            <Panel className="h-full">
              <div className="p-5">
                <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Social Links
                </div>
                <div className="mt-3 space-y-2">
                  <SocialRow Icon={Github} label="GitHub" href="https://github.com/DaceraJerick" />
                  <SocialRow Icon={Facebook} label="Facebook" href="https://www.facebook.com/dacera.jerick" />
                  <SocialRow Icon={TikTokIcon} label="TikTok" href="https://tiktok.com/@jerick_28dacera" />
                  <SocialRow Icon={Instagram} label="Instagram" href="https://www.instagram.com/jerickinstagrann?igsh=ejkzcDJwbWdmcDZm" />
                  <SocialRow Icon={TelegramIcon} label="Telegram" href="https://t.me/JerickUchiha" />
                  <SocialRow Icon={WhatsAppIcon} label="WhatsApp" href="#" />
                  <SocialRow Icon={DiscordIcon} label="Discord" href="https://discord.com/users/uchihajerick" />
                  <SocialRow Icon={Linkedin} label="LinkedIn" href="#" />
                </div>
              </div>
            </Panel>
          </FadeIn>

          <FadeIn delay={120}>
            <Panel id="contact" className="h-full">
              <div className="p-5">
                <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Get in touch
                </div>
                <div className="mt-4">
                  <ContactFlow />
                </div>
              </div>
            </Panel>
          </FadeIn>
        </div>

        <div className="mt-8 text-center text-[11px] text-muted-foreground">
          © {new Date().getFullYear()} Dacera Jerick · a.k.a. Uchiha Jerick
        </div>
      </main>
    </div>
  );
}

function SocialRow({
  Icon,
  label,
  href,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="flex items-center justify-between rounded-md border border-border bg-background/40 px-3 py-2 text-xs text-foreground/90 transition-colors hover:border-primary/40 hover:text-primary"
    >
      <span className="inline-flex items-center gap-2">
        <Icon className="h-3.5 w-3.5" /> {label}
      </span>
      <ChevronRight className="h-3.5 w-3.5" />
    </a>
  );
}
