import { ArrowUpRight, Lock } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  status?: string;
  tags?: string[];
  url?: string;
}

export function ProjectCard({
  title,
  description,
  status = "Coming Soon",
  tags = [],
  url,
}: ProjectCardProps) {
  const isLive = Boolean(url);

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:-translate-y-1 hover:shadow-[0_0_40px_-12px_var(--cyan-glow)]">
      <div className="mb-4 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-primary">
          <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-primary" />
          {status}
        </span>
        {!isLive && <Lock className="h-4 w-4 text-muted-foreground/50" />}
      </div>

      <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>
      <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">{description}</p>

      {tags.length > 0 && (
        <div className="mb-5 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-secondary/60 px-2 py-0.5 text-[10px] font-medium text-foreground/70"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {isLive ? (
        <a
          href={url}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          <span>Visit live site</span>
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      ) : (
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground/60">
          <span>Link unavailable</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </div>
      )}
    </div>
  );
}
