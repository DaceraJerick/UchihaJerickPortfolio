import { createFileRoute } from "@tanstack/react-router";
import { MapPin, GraduationCap, Sparkles, Users, Code2 } from "lucide-react";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/FadeIn";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Dacera Jerick" },
      {
        name: "description",
        content:
          "Get to know Dacera Jerick (Uchiha Jerick) — a 3rd-year student at NEMSU Cantilan Campus and full-stack developer based in the Philippines.",
      },
      { property: "og:title", content: "About — Dacera Jerick" },
      {
        property: "og:description",
        content: "3rd-year student, full-stack developer, and team leader from Cantilan, Philippines.",
      },
    ],
  }),
  component: AboutPage,
});

const highlights = [
  { Icon: Users, title: "Team Leader", text: "Leading group projects since my 1st year." },
  { Icon: Code2, title: "Full-Stack Builder", text: "Web apps end-to-end — UI to database." },
  { Icon: Sparkles, title: "Helper for Hire", text: "I help classmates ship — and yes, they pay me." },
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-24">
        <section className="mx-auto max-w-4xl px-5 py-12 sm:px-8 sm:py-20">
          <FadeIn>
            <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-primary">
              <span className="h-px w-6 bg-primary" /> About
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Hi, I'm <span className="text-gradient-cyan">Dacera Jerick</span>.
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              Also known as <span className="text-primary">Uchiha Jerick</span> in school.
            </p>
          </FadeIn>

          <FadeIn delay={80} className="mt-10 space-y-5 text-base leading-relaxed text-foreground/90">
            <p>
              I am Dacera Jerick, widely known as Uchiha Jerick in our school. I'm currently a
              3rd-year student at <span className="text-primary">NEMSU Cantilan Campus</span>.
              Since my 1st year, I have always been the leader of our group projects.
            </p>
            <p>
              I also help my classmates with their projects — and yes, they pay me for it. I
              develop full-stack applications and websites, from the user interface all the way
              down to the database.
            </p>
            <p className="text-muted-foreground">
              Outside of school work, I'm constantly tinkering with new frameworks, exploring AI
              tooling, and pushing myself to ship cleaner, faster, and more thoughtful software.
            </p>
          </FadeIn>

          <FadeIn delay={140} className="mt-10 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/40 px-3 py-1.5 text-xs text-foreground/80">
              <MapPin className="h-3 w-3 text-primary" /> Cantilan, Surigao del Sur, PH
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/40 px-3 py-1.5 text-xs text-foreground/80">
              <GraduationCap className="h-3 w-3 text-primary" /> NEMSU Cantilan · 3rd Year
            </span>
          </FadeIn>

          <FadeIn delay={200} className="mt-12 grid gap-4 sm:grid-cols-3">
            {highlights.map(({ Icon, title, text }) => (
              <div
                key={title}
                className="rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40"
              >
                <Icon className="h-5 w-5 text-primary" />
                <h3 className="mt-3 text-sm font-semibold text-foreground">{title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </FadeIn>
        </section>
      </main>
      <Footer />
    </div>
  );
}
