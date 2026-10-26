import { Outlet, Link, createRootRoute, HeadContent } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-primary">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full border border-primary/40 bg-primary/10 px-5 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#0a0a0a" },
      { title: "Dacera Jerick — Software & Mobile Developer" },
      {
        name: "description",
        content:
          "Personal portfolio of Dacera Jerick (Uchiha Jerick), a software & mobile developer and 4th-year student at NEMSU Cantilan Campus, Philippines.",
      },
      { name: "author", content: "Dacera Jerick" },
      { property: "og:title", content: "Dacera Jerick — Software & Mobile Developer" },
      {
        property: "og:description",
        content:
          "Software & mobile developer and student building modern web apps from Cantilan, Philippines.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", type: "image/png", href: `${import.meta.env.BASE_URL}favicon.png` },
      { rel: "shortcut icon", href: `${import.meta.env.BASE_URL}favicon.ico` },
      { rel: "apple-touch-icon", href: `${import.meta.env.BASE_URL}favicon.png` },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootComponent() {
  // index.html already provides <html>/<head>/<body>, so only render head tags and the page here.
  return (
    <>
      <HeadContent />
      <Outlet />
    </>
  );
}
