import { createFileRoute } from "@tanstack/react-router";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/FadeIn";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/portfolio";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Dacera Jerick" },
      {
        name: "description",
        content:
          "A collection of full-stack projects by Dacera Jerick. New case studies and live demos coming soon.",
      },
      { property: "og:title", content: "Projects — Dacera Jerick" },
      {
        property: "og:description",
        content: "Projects in development — modern web apps and student-friendly tools.",
      },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-24">
        <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-20">
          <FadeIn>
            <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-primary">
              <span className="h-px w-6 bg-primary" /> Projects
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              What I'm <span className="text-gradient-cyan">shipping</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base text-muted-foreground">
              A few things in active development. Public links and case studies will land here as
              each project ships.
            </p>
          </FadeIn>

          <FadeIn delay={80} className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
          </FadeIn>
        </section>
      </main>
      <Footer />
    </div>
  );
}
