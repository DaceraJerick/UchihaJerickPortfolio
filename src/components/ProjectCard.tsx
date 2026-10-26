import { ArrowUpRight, Download, Smartphone } from "lucide-react";

import type { Project } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const MAX_CARD_TAGS = 2;

function StatusBadge({ status }: { status: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-primary">
      <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-primary" />
      {status}
    </span>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md bg-secondary/60 px-2 py-0.5 text-[10px] font-medium text-foreground/70">
      {children}
    </span>
  );
}

function BuildButton({ project }: { project: Project }) {
  if (!project.buildUrl) return null;
  return (
    <Button asChild size="sm">
      <a href={project.buildUrl} target="_blank" rel="noreferrer noopener">
        <Download className="h-4 w-4" />
        Download Android build
      </a>
    </Button>
  );
}

function BuildNote({ project }: { project: Project }) {
  if (!project.buildUrl || !project.buildNote) return null;
  return <p className="text-[11px] text-muted-foreground">{project.buildNote}</p>;
}

function projectImageUrl(file: string) {
  return `${import.meta.env.BASE_URL}projects/${file}`;
}

function ProjectImage({ project, className }: { project: Project; className: string }) {
  const first = project.images?.[0];
  if (first) {
    return (
      <img
        src={projectImageUrl(first)}
        alt={`${project.title} app screenshot`}
        className={`${className} object-cover object-top`}
        loading="lazy"
      />
    );
  }
  return (
    <div
      className={`${className} flex items-center justify-center bg-gradient-to-br from-primary/30 via-primary/10 to-secondary/40`}
      aria-hidden="true"
    >
      <Smartphone className="h-8 w-8 text-primary" />
    </div>
  );
}

/** Thumbnail that opens a larger floating preview (not full screen) when clicked. */
function ScreenshotViewer({ file, title }: { file: string; title: string }) {
  const alt = `${title} app screenshot`;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label={`View ${alt} larger`}
          className="shrink-0 cursor-zoom-in rounded-xl transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <img
            src={projectImageUrl(file)}
            alt={alt}
            className="h-72 w-auto rounded-xl border border-border"
            loading="lazy"
          />
        </button>
      </DialogTrigger>
      <DialogContent className="w-[min(92vw,24rem)] gap-0 p-3 pt-10">
        <DialogTitle className="sr-only">{alt}</DialogTitle>
        <DialogDescription className="sr-only">Larger view of the screenshot.</DialogDescription>
        <img
          src={projectImageUrl(file)}
          alt={alt}
          className="mx-auto max-h-[78vh] w-auto max-w-full rounded-lg object-contain"
        />
      </DialogContent>
    </Dialog>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const { title, description, status, tags, url, features } = project;
  const hasDetails = Boolean(features?.length);
  const hasBanner = hasDetails;
  const shownTags = tags.length > 4 ? tags.slice(0, MAX_CARD_TAGS) : tags;
  const hiddenCount = tags.length - shownTags.length;

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/40 hover:-translate-y-1 hover:shadow-[0_0_40px_-12px_var(--cyan-glow)]">
      {hasBanner && <ProjectImage project={project} className="h-24 w-full" />}

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-center justify-between">
          <StatusBadge status={status} />
          {hasDetails && <ProjectDetails project={project} />}
        </div>

        <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>
        <p
          className={`flex-1 text-sm leading-relaxed text-muted-foreground ${hasDetails ? "mb-4 line-clamp-3" : "mb-6"}`}
        >
          {description}
        </p>

        {tags.length > 0 && (
          <div className="mb-5 flex flex-wrap gap-1.5">
            {shownTags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
            {hiddenCount > 0 && <Tag>+{hiddenCount} more</Tag>}
          </div>
        )}

        <div className="flex flex-col items-start gap-2">
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              <span>Visit live site</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          )}

          {hasDetails && <BuildButton project={project} />}
          {hasDetails && <BuildNote project={project} />}
        </div>
      </div>
    </div>
  );
}

function ProjectDetails({ project }: { project: Project }) {
  const { title, description, status, tags, type, defense, features } = project;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          View details
          <ArrowUpRight className="h-3.5 w-3.5" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader className="text-left">
          <div className="mb-1">
            <StatusBadge status={status} />
          </div>
          <DialogTitle className="text-xl">{title}</DialogTitle>
          <DialogDescription className="leading-relaxed">{description}</DialogDescription>
        </DialogHeader>

        <dl className="space-y-2 text-sm">
          {type && (
            <div>
              <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Type</dt>
              <dd className="text-foreground/90">{type}</dd>
            </div>
          )}
          {defense && (
            <div>
              <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Capstone defense
              </dt>
              <dd className="text-foreground/90">{defense}</dd>
            </div>
          )}
        </dl>

        {project.images && project.images.length > 0 && (
          <div className="flex gap-3 overflow-x-auto pb-1">
            {project.images.map((file) => (
              <ScreenshotViewer key={file} file={file} title={title} />
            ))}
          </div>
        )}

        {features && (
          <div>
            <h4 className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Features
            </h4>
            <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-foreground/90">
              {features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <h4 className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Tech
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <BuildButton project={project} />
          <BuildNote project={project} />
        </div>

        <p className="text-[11px] text-muted-foreground">
          This is a school capstone project.
        </p>
      </DialogContent>
    </Dialog>
  );
}
