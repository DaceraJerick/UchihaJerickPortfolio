import { createFileRoute } from "@tanstack/react-router";

import { FadeIn } from "@/components/FadeIn";
import { SectionHeading } from "@/components/SectionHeading";
import { TechPillGroup } from "@/components/TechPillGroup";
import { techStack } from "@/data/portfolio";

export const Route = createFileRoute("/stack")({
  head: () => ({
    meta: [
      { title: "Tech Stack — Dacera Jerick" },
      {
        name: "description",
        content:
          "The full tech stack Dacera Jerick uses to build web, mobile, and desktop apps: React, React Native, Expo, Supabase, and more.",
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
      <main className="pt-[72px]">
        <section className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-20">
          <FadeIn>
            <SectionHeading
              as="h1"
              eyebrow="Tech Stack"
              title="The tools"
              accent="I build with."
              lead="A categorized look at the languages, frameworks, and platforms I use to ship web, mobile, and desktop apps."
            />
          </FadeIn>

          <FadeIn delay={80} className="mt-12 grid gap-4 sm:grid-cols-2">
            {techStack.map((group) => (
              <TechPillGroup
                key={group.category}
                category={group.category}
                items={[...group.items]}
              />
            ))}
          </FadeIn>
        </section>
      </main>
    </div>
  );
}
