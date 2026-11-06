import { createFileRoute } from "@tanstack/react-router";

import { FadeIn } from "@/components/FadeIn";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/portfolio";

export const Route = createFileRoute("/projects/")({
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
      <main className="pt-[72px]">
        <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-20">
          <FadeIn>
            <SectionHeading
              as="h1"
              eyebrow="Projects"
              title="What I'm"
              accent="shipping."
              lead="Live web apps and my capstone. Open a project to see what it does, what I built and the tech behind it."
            />
          </FadeIn>

          <FadeIn delay={80} className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <ProjectCard key={p.title} project={p} />
            ))}
          </FadeIn>
        </section>
      </main>
    </div>
  );
}
