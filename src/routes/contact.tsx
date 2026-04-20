import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Mail } from "lucide-react";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/FadeIn";
import { SocialIconRow, ConnectButtons } from "@/components/SocialLinks";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Dacera Jerick" },
      {
        name: "description",
        content:
          "Get in touch with Dacera Jerick for collaborations, freelance work, or student projects.",
      },
      { property: "og:title", content: "Contact — Dacera Jerick" },
      {
        property: "og:description",
        content: "Open for collaborations, freelance work, and student team-ups.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-24">
        <section className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-20">
          <FadeIn>
            <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-primary">
              <span className="h-px w-6 bg-primary" /> Contact
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Let's <span className="text-gradient-cyan">build</span> something.
            </h1>
            <p className="mt-4 text-base text-muted-foreground">
              Got a project, an idea, or just want to say hi? I'm open to collaborations,
              freelance work, and student team-ups.
            </p>
          </FadeIn>

          <FadeIn delay={80} className="mt-10 rounded-2xl border border-border bg-card p-8 sm:p-10">
            <div className="space-y-3">
              <a
                href="mailto:dacerajerick38@gmail.com"
                className="flex items-center gap-3 text-foreground transition-colors hover:text-primary"
              >
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-sm">dacerajerick38@gmail.com</span>
              </a>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm">Cantilan, Surigao del Sur, Philippines</span>
              </div>
            </div>

            <div className="mt-8 space-y-6">
              <ConnectButtons />
              <div className="flex flex-wrap items-center gap-4 border-t border-border pt-6">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  Find me on
                </span>
                <SocialIconRow />
              </div>
            </div>
          </FadeIn>
        </section>
      </main>
      <Footer />
    </div>
  );
}
