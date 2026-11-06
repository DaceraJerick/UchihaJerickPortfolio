import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

import { FadeIn } from "@/components/FadeIn";
import {
  BuildButton,
  BuildNote,
  ScreenshotViewer,
  StatusBadge,
  Tag,
} from "@/components/ProjectCard";
import { projects } from "@/data/portfolio";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const index = projects.findIndex((p) => p.slug === params.slug);
    if (index === -1) throw notFound();
    return { index };
  },
  head: ({ loaderData }) => {
    const project = loaderData ? projects[loaderData.index] : undefined;
    if (!project) return {};
    return {
      meta: [
        { title: `${project.title} — Dacera Jerick` },
        { name: "description", content: project.description },
        { property: "og:title", content: `${project.title} — Dacera Jerick` },
        { property: "og:description", content: project.description },
      ],
    };
  },
  component: ProjectPage,
});

function Chapter({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <FadeIn className="border-t border-border py-10 sm:py-14">
      <div className="mb-5 text-[11.5px] font-bold uppercase tracking-[0.16em] text-primary">
        {index} — {title}
      </div>
      {children}
    </FadeIn>
  );
}

function ProjectPage() {
  const { index } = Route.useLoaderData();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const number = String(index + 1).padStart(2, "0");

  const meta = [
    { label: "What it is", value: project.type ?? project.category },
    { label: "My role", value: project.role },
    { label: "Period", value: project.period },
    { label: "Capstone defense", value: project.defense },
    { label: "Status", value: project.status },
  ].filter((m): m is { label: string; value: string } => Boolean(m.value));

  // Numbered chapters: only the ones this project has content for.
  const chapters: { title: string; body: React.ReactNode }[] = [];
  if (project.problem || project.solution) {
    chapters.push({
      title: "Problem & solution",
      body: (
        <div className="grid gap-8 md:grid-cols-2">
          {project.problem && (
            <div>
              <h3 className="mb-2 text-xl font-semibold">The problem</h3>
              <p className="leading-relaxed text-muted-foreground">{project.problem}</p>
            </div>
          )}
          {project.solution && (
            <div>
              <h3 className="mb-2 text-xl font-semibold">The solution</h3>
              <p className="leading-relaxed text-muted-foreground">{project.solution}</p>
            </div>
          )}
        </div>
      ),
    });
  }
  if (project.contributions?.length) {
    chapters.push({
      title: "What I did",
      body: (
        <ol className="divide-y divide-border border-y border-border">
          {project.contributions.map((c, i) => (
            <li
              key={c.text}
              className="grid grid-cols-[3rem_1fr] items-baseline gap-4 py-5 sm:grid-cols-[4rem_1fr_auto]"
            >
              <span className="text-stroke font-display text-3xl font-bold tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="leading-relaxed text-foreground/90">{c.text}</p>
              <span className="col-start-2 justify-self-start sm:col-start-3">
                <Tag>{c.tag}</Tag>
              </span>
            </li>
          ))}
        </ol>
      ),
    });
  }
  if (project.features?.length) {
    chapters.push({
      title: "Key features",
      body: (
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {project.features.map((f) => (
            <li
              key={f}
              className="rounded-lg border border-border bg-card p-4 text-sm leading-relaxed text-foreground/90"
            >
              {f}
            </li>
          ))}
        </ul>
      ),
    });
  }
  chapters.push({
    title: "Tech stack",
    body: (
      <div className="flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-border bg-secondary/40 px-3 py-1.5 text-sm text-foreground/90"
          >
            {t}
          </span>
        ))}
      </div>
    ),
  });
  if (project.url || project.buildUrl) {
    chapters.push({
      title: "Links",
      body: (
        <div className="flex flex-col items-start gap-3">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-6px_var(--cyan-glow)]"
            >
              Visit live site <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
          <BuildButton project={project} />
          <BuildNote project={project} />
        </div>
      ),
    });
  }

  return (
    <main className="relative overflow-x-clip pt-[72px]">
      <span
        aria-hidden="true"
        className="text-stroke pointer-events-none absolute right-2 top-16 select-none font-display text-[clamp(8rem,22vw,14rem)] font-bold leading-none opacity-60"
      >
        {number}
      </span>

      <div className="relative mx-auto max-w-[1200px] px-4 pb-16 sm:px-8">
        <div className="pt-8 sm:pt-12">
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-semibold transition-colors hover:border-primary/50 hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Projects
          </Link>
        </div>

        <FadeIn className="py-10 sm:py-14">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            {project.category && (
              <span className="text-[11.5px] font-bold uppercase tracking-[0.16em] text-primary">
                {project.category}
              </span>
            )}
            <StatusBadge status={project.status} />
          </div>
          <h1 className="text-[clamp(2.5rem,6vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.045em]">
            {project.title}
          </h1>
          <p className="mt-5 max-w-[680px] text-[17px] leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          {meta.length > 0 && (
            <dl className="mt-10 max-w-[680px] divide-y divide-border border-y border-border">
              {meta.map((m) => (
                <div
                  key={m.label}
                  className="grid grid-cols-[9rem_1fr] gap-4 py-3 text-sm sm:grid-cols-[12rem_1fr]"
                >
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    {m.label}
                  </dt>
                  <dd className="text-foreground/90">{m.value}</dd>
                </div>
              ))}
            </dl>
          )}

          {project.images && project.images.length > 0 && (
            <div className="mt-10 flex gap-4 overflow-x-auto pb-2">
              {project.images.map((file) => (
                <ScreenshotViewer key={file} file={file} title={project.title} />
              ))}
            </div>
          )}
        </FadeIn>

        {chapters.map((c, i) => (
          <Chapter key={c.title} index={String(i + 1).padStart(2, "0")} title={c.title}>
            {c.body}
          </Chapter>
        ))}

        {next.slug !== project.slug && (
          <div className="border-t border-border pt-10">
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Next project
            </div>
            <Link
              to="/projects/$slug"
              params={{ slug: next.slug }}
              className="group mt-2 inline-flex items-center gap-3 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-semibold tracking-[-0.04em] transition-colors hover:text-primary"
            >
              {next.title}
              <ArrowRight className="h-7 w-7 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
