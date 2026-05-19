import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { projects } from "@/lib/data";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  component: ProjectDetail,
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center px-5">
      <div className="text-center">
        <h1 className="font-display text-4xl">Project not found</h1>
        <Link to="/projects" className="mt-6 inline-flex items-center gap-2 text-accent">
          <ArrowLeft className="h-4 w-4" /> Back to projects
        </Link>
      </div>
    </div>
  ),
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.project.title ?? "Project"} — case study` },
      { name: "description", content: loaderData?.project.description ?? "" },
      { property: "og:title", content: loaderData?.project.title ?? "Project" },
      { property: "og:description", content: loaderData?.project.description ?? "" },
      { property: "og:type", content: "article" },
      { property: "og:image", content: loaderData?.project.image ?? "" },
      { property: "og:url", content: `/projects/${loaderData?.project.slug}` },
    ],
    links: [{ rel: "canonical", href: `/projects/${loaderData?.project.slug}` }],
  }),
});

function ProjectDetail() {
  const { project: p } = Route.useLoaderData();

  return (
    <article className="pt-20 lg:pt-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-0">
        <Link
          to="/projects"
          className="inline-flex min-h-[44px] items-center gap-2 text-sm text-muted-foreground hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" /> Back to projects
        </Link>

        <div className="mt-6">
          <span className="inline-block rounded-pill border border-border bg-surface px-2.5 py-0.5 text-[10px] uppercase tracking-[0.18em] text-accent">
            {p.category}
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight lg:text-6xl">{p.title}</h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground lg:text-lg">{p.description}</p>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-border">
          <img src={p.image} alt={p.title} className="w-full object-cover" />
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Role</div>
            <div className="mt-1 text-base font-medium">{p.role}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Tools</div>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {p.tools.map((t: string) => (
                <span key={t} className="rounded-pill border border-border px-2 py-0.5 text-xs">{t}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {p.liveUrl && (
            <a href={p.liveUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-[44px] items-center gap-2 rounded-pill bg-accent px-4 py-2 text-sm font-medium text-accent-foreground">
              <ExternalLink className="h-4 w-4" /> Visit live
            </a>
          )}
          {p.githubUrl && (
            <a href={p.githubUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-[44px] items-center gap-2 rounded-pill border border-border px-4 py-2 text-sm font-medium hover:border-accent hover:text-accent">
              <Github className="h-4 w-4" /> View source
            </a>
          )}
        </div>

        <div className="mt-12 space-y-4 border-t border-border pt-8 text-base text-muted-foreground lg:text-lg">
          <p>
            This case study is a short summary. A longer write-up — with research artifacts,
            wireframes, and the iteration log — is available on request.
          </p>
          <p>
            Get in touch via the top-right button if you'd like the full deck and a 30-minute
            walkthrough call.
          </p>
        </div>
      </div>
    </article>
  );
}
