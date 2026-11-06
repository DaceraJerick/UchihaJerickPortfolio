import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Mail,
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
import { SectionHeading } from "@/components/SectionHeading";
import { techStack, projects, certifications } from "@/data/portfolio";
import jerickDark from "@/assets/jerick-dark.png";
import jerickLight from "@/assets/jerick-light.jpg";
import { ContactFlow } from "@/components/ContactFlow";
import { openContactFlow } from "@/lib/contact";
import { HeroPortrait } from "@/components/HeroPortrait";
import { Recommendations } from "@/components/Recommendations";
import { TikTokIcon, TelegramIcon, DiscordIcon } from "@/components/SocialLinks";
import { Instagram, Linkedin } from "lucide-react";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function Section({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="border-t border-border py-[clamp(56px,7vw,96px)]">
      {children}
    </section>
  );
}

function Panel({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div
      id={id}
      className={`min-w-0 overflow-hidden rounded-lg border border-border bg-card shadow-[0_16px_36px_-20px_var(--cyan-glow)] ${className}`}
    >
      {children}
    </div>
  );
}

const pill =
  "group inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5";
const pillPrimary = `${pill} bg-primary text-primary-foreground hover:shadow-[0_8px_24px_-6px_var(--cyan-glow)]`;
const pillOutline = `${pill} border border-border text-foreground hover:border-primary/50 hover:text-primary`;

function HomePage() {
  return (
    <main className="relative overflow-x-clip pt-[72px] text-foreground">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-8">
        {/* HERO */}
        <section className="grid items-center gap-14 pb-[clamp(56px,7vw,96px)] pt-10 sm:pt-14 lg:grid-cols-12 lg:gap-10">
          <FadeIn className="min-w-0 lg:col-span-7">
            <div className="mb-5 flex items-center gap-3">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-border bg-secondary/40">
                <img
                  src={jerickLight}
                  alt="Dacera Jerick"
                  className="absolute inset-0 h-full w-full object-cover dark:opacity-0"
                  loading="eager"
                />
                <img
                  src={jerickDark}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-0 dark:opacity-100"
                  loading="eager"
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 text-sm font-semibold">
                  Dacera Jerick
                  <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    ✓
                  </span>
                  <span className="truncate font-normal text-muted-foreground">
                    · a.k.a. Uchiha Jerick
                  </span>
                </div>
                <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3 shrink-0" />
                  Cantilan, Surigao del Sur, Philippines
                </div>
              </div>
            </div>

            <div className="mb-4 text-[11.5px] font-bold uppercase tracking-[0.16em] text-primary">
              Software & Mobile Developer
            </div>
            <h1 className="text-[clamp(2.5rem,6vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.045em]">
              I build web & mobile apps <span className="text-primary">that ship.</span>
            </h1>
            <p className="mt-5 max-w-[600px] text-[17px] leading-relaxed text-muted-foreground">
              4th-year BSIT student at NEMSU Cantilan Campus. I build full-stack web applications
              and cross-platform mobile apps with React Native, from the user interface all the way
              down to the database.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link to="/projects" className={pillPrimary}>
                View Projects
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-[3px]" />
              </Link>
              <button type="button" onClick={() => openContactFlow("date")} className={pillOutline}>
                <Calendar className="h-4 w-4" />
                Schedule a Call
              </button>
              <button
                type="button"
                onClick={() => openContactFlow("email")}
                className={pillOutline}
              >
                <Mail className="h-4 w-4" />
                Send Email
              </button>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                <GraduationCap className="h-3.5 w-3.5" />
                NEMSU Cantilan · 4th Year
              </span>
              <a
                href="https://github.com/DaceraJerick"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-primary"
              >
                GitHub <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://www.linkedin.com/in/jerick-dacera-010972301/"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-primary"
              >
                LinkedIn <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={120} className="min-w-0 lg:col-span-5">
            <HeroPortrait />
          </FadeIn>
        </section>

        {/* 01 ABOUT + EXPERIENCE */}
        <Section id="about">
          <FadeIn>
            <SectionHeading
              index="01"
              eyebrow="About"
              title="Leader, developer,"
              accent="and always building."
            />
          </FadeIn>
          <div className="mt-10 grid items-start gap-6 lg:grid-cols-3">
            <FadeIn className="min-w-0 space-y-4 text-base leading-relaxed text-foreground/85 lg:col-span-2">
              <p>
                I am <span className="text-foreground">Dacera Jerick</span>, widely known as{" "}
                <span className="text-primary">Uchiha Jerick</span> in our school. I'm currently a
                4th-year student at NEMSU Cantilan Campus. Since my 1st year, I have always been the
                leader of our group projects.
              </p>
              <p>
                I also help my classmates with their projects — and yes, they pay me for it. I'm a
                software developer and mobile developer — I build full-stack web applications and
                cross-platform mobile apps with React Native, from the user interface all the way
                down to the database.
              </p>
              <p>
                I now build full apps with AI-assisted tools like Claude Code, Antigravity IDE and
                Cursor.
              </p>
              <p className="text-muted-foreground">
                Outside of school work, I'm constantly tinkering with new frameworks, exploring AI
                tooling, and pushing myself to ship cleaner, faster software.
              </p>
            </FadeIn>

            <FadeIn delay={80} className="min-w-0">
              <Panel>
                <div className="border-b border-border px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Experience
                </div>
                <div className="divide-y divide-border">
                  <div className="flex items-start gap-3 p-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-primary/30 bg-primary/10 text-primary">
                      <GraduationCap className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="text-sm font-semibold text-foreground">
                          BS Information Technology
                        </div>
                        <div className="shrink-0 text-[11px] font-medium text-muted-foreground">
                          4th Year
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
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="text-sm font-semibold text-foreground">Hello World!</div>
                        <div className="shrink-0 text-[11px] font-medium text-muted-foreground">
                          2020
                        </div>
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
        </Section>

        {/* 02 TECH STACK */}
        <Section>
          <FadeIn>
            <SectionHeading
              index="02"
              eyebrow="Tech Stack"
              title="The tools"
              accent="I build with."
              action={{ label: "View all", to: "/stack" }}
            />
          </FadeIn>
          <FadeIn delay={60} className="mt-10 divide-y divide-border border-y border-border">
            {techStack.map((group) => (
              <div
                key={group.category}
                className="grid gap-3 py-5 md:grid-cols-[14rem_1fr] md:gap-6"
              >
                <div className="text-[11.5px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                  {group.category}
                </div>
                <div className="flex min-w-0 flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs text-foreground/85 transition-colors hover:border-primary/40 hover:text-primary"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </FadeIn>
        </Section>

        {/* 03 PROJECTS */}
        <Section>
          <FadeIn>
            <SectionHeading
              index="03"
              eyebrow="Projects"
              title="Things I've"
              accent="built and shipped."
              action={{ label: "All projects", to: "/projects" }}
            />
          </FadeIn>
          <FadeIn delay={60} className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <ProjectCard key={p.title} project={p} />
            ))}
          </FadeIn>
        </Section>

        {/* 04 CERTIFICATIONS + RECOMMENDATIONS */}
        <Section>
          <FadeIn>
            <SectionHeading
              index="04"
              eyebrow="Credentials"
              title="Certifications &"
              accent="kind words."
            />
          </FadeIn>
          <div className="mt-10 grid items-start gap-6 lg:grid-cols-2">
            <FadeIn className="min-w-0 space-y-2">
              {certifications.map((cert) => (
                <a
                  key={cert.code}
                  href={cert.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex min-w-0 items-center gap-3 rounded-lg border border-border bg-card p-3 transition-all hover:border-primary/40"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-primary/30 bg-primary/10 text-primary">
                    <Award className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold text-foreground group-hover:text-primary">
                      {cert.title}
                    </div>
                    <div className="text-xs text-muted-foreground">{cert.issuer}</div>
                  </div>
                  <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                </a>
              ))}
            </FadeIn>

            <FadeIn delay={80} className="min-w-0">
              <Panel>
                <Recommendations />
              </Panel>
            </FadeIn>
          </div>
        </Section>

        {/* 05 CONTACT */}
        <Section>
          <FadeIn>
            <SectionHeading index="05" eyebrow="Contact" title="Let's work" accent="together." />
          </FadeIn>
          <div className="mt-10 grid items-start gap-6 lg:grid-cols-2">
            <FadeIn className="min-w-0">
              <Panel id="contact">
                <div className="p-5">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    Get in touch
                  </div>
                  <div className="mt-4">
                    <ContactFlow />
                  </div>
                </div>
              </Panel>
            </FadeIn>

            <FadeIn delay={60} className="min-w-0">
              <Panel>
                <div className="p-5">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    Social Links
                  </div>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    <SocialRow
                      Icon={Github}
                      label="GitHub"
                      href="https://github.com/DaceraJerick"
                    />
                    <SocialRow
                      Icon={Linkedin}
                      label="LinkedIn"
                      href="https://www.linkedin.com/in/jerick-dacera-010972301/"
                    />
                    <SocialRow
                      Icon={Facebook}
                      label="Facebook"
                      href="https://www.facebook.com/dacera.jerick"
                    />
                    <SocialRow
                      Icon={TikTokIcon}
                      label="TikTok"
                      href="https://tiktok.com/@jerick_28dacera"
                    />
                    <SocialRow
                      Icon={Instagram}
                      label="Instagram"
                      href="https://www.instagram.com/jerickinstagrann?igsh=ejkzcDJwbWdmcDZm"
                    />
                    <SocialRow
                      Icon={TelegramIcon}
                      label="Telegram"
                      href="https://t.me/JerickUchiha"
                    />
                    <SocialRow
                      Icon={DiscordIcon}
                      label="Discord"
                      href="https://discord.com/users/uchihajerick"
                    />
                  </div>
                </div>
              </Panel>
            </FadeIn>
          </div>
        </Section>
      </div>
    </main>
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
