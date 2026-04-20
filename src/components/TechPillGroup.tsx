interface TechPillGroupProps {
  category: string;
  items: string[];
}

export function TechPillGroup({ category, items }: TechPillGroupProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-[0_0_30px_-10px_var(--cyan-glow)]">
      <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
        {category}
      </h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-border bg-secondary/40 px-3 py-1.5 text-xs font-medium text-foreground/90 transition-colors hover:border-primary/40 hover:text-primary"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
