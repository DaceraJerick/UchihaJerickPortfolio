import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border/60 mt-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <div className="text-sm font-semibold text-foreground">
            Dacera Jerick <span className="text-muted-foreground">— a.k.a. Uchiha Jerick</span>
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            Full-Stack Developer · Cantilan, Surigao del Sur, Philippines
          </div>
        </div>
        <div className="flex items-center gap-5 text-xs text-muted-foreground">
          <Link to="/about" className="hover:text-primary">About</Link>
          <Link to="/stack" className="hover:text-primary">Stack</Link>
          <Link to="/projects" className="hover:text-primary">Projects</Link>
          <Link to="/contact" className="hover:text-primary">Contact</Link>
        </div>
        <div className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Jerick.dev
        </div>
      </div>
    </footer>
  );
}
