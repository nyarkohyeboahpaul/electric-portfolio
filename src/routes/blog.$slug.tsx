import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock } from "lucide-react";
import { blogPosts } from "@/lib/data";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = blogPosts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  component: BlogPost,
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center px-5">
      <div className="text-center">
        <h1 className="font-display text-4xl">Post not found</h1>
        <Link to="/blog" className="mt-6 inline-flex items-center gap-2 text-accent">
          <ArrowLeft className="h-4 w-4" /> Back to blog
        </Link>
      </div>
    </div>
  ),
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData?.post.title ?? "Post" },
      { name: "description", content: loaderData?.post.excerpt ?? "" },
      { property: "og:title", content: loaderData?.post.title ?? "Post" },
      { property: "og:description", content: loaderData?.post.excerpt ?? "" },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `/blog/${loaderData?.post.slug}` },
    ],
    links: [{ rel: "canonical", href: `/blog/${loaderData?.post.slug}` }],
    scripts: loaderData
      ? [
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: loaderData.post.title,
              datePublished: loaderData.post.date,
              description: loaderData.post.excerpt,
            }),
          },
        ]
      : [],
  }),
});

function BlogPost() {
  const { post } = Route.useLoaderData();
  return (
    <article className="pt-20 lg:pt-28">
      <div className="mx-auto max-w-2xl px-5 py-10 sm:px-8 lg:px-0 lg:py-16">
        <Link to="/blog" className="inline-flex min-h-[44px] items-center gap-2 text-sm text-muted-foreground hover:text-accent">
          <ArrowLeft className="h-4 w-4" /> Back to blog
        </Link>

        <div className="mt-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          <span className="text-accent">{post.tag}</span>
          <span>·</span>
          <time>{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</time>
          <span>·</span>
          <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readMinutes} min</span>
        </div>

        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight lg:text-5xl">{post.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>

        <div className="mt-10 space-y-5 text-base leading-relaxed text-foreground/90 lg:text-lg">
          <p>{post.body}</p>
          <p className="text-muted-foreground">
            This is a short preview of the post. The full essay lives in my private newsletter —
            <a href="#" className="text-accent underline-offset-4 hover:underline"> subscribe here</a> if you'd like the rest.
          </p>
        </div>
      </div>
    </article>
  );
}
