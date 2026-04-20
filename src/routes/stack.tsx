import { createFileRoute } from "@tanstack/react-router";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/FadeIn";
import { TechPillGroup } from "@/components/TechPillGroup";
import { techStack } from "@/data/portfolio";

export const Route = createFileRoute("/stack")({
  head: () => ({
    meta: [
      { title: "Tech Stack — Dacera Jerick" },
      {
        name: "description",
        content:
          "The full tech stack Dacera Jerick uses to build full-stack web applications: React, Next.js, Vue, Node.js, Supabase, and more.",
      },
      { property: "og:title", content: "Tech Stack — Dacera Jerick" },
      {
        property: "og:description",
        content: "Frontend, backend, AI, and developer tools I work with day-to-day.",
      },
    ],
  }),
  component: StackPage,
});

function StackPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-24">
        <section className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-20">
          <FadeIn>
            <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-primary">
              <span className="h-px w-6 bg-primary" /> Tech Stack
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              The <span className="text-gradient-cyan">tools</span> I build with
            </h1>
            <p className="mt-4 max-w-2xl text-base text-muted-foreground">
              A categorized look at the languages, frameworks, and platforms I use to ship
              full-stack web applications.
            </p>
          </FadeIn>

          <FadeIn delay={80} className="mt-12 grid gap-4 sm:grid-cols-2">
            {techStack.map((group) => (
              <TechPillGroup key={group.category} category={group.category} items={[...group.items]} />
            ))}
          </FadeIn>
        </section>
      </main>
      <Footer />
    </div>
  );
}
