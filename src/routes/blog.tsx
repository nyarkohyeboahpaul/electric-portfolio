import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { SectionHeading } from "@/components/portfolio/SectionHeading";
import { blogPosts, NAME } from "@/lib/data";

export const Route = createFileRoute("/blog")({
  component: BlogPage,
  head: () => ({
    meta: [
      { title: `Blog — ${NAME}` },
      { name: "description", content: `Essays and field notes on calm interfaces, design systems and shipping product, by ${NAME}.` },
      { property: "og:title", content: `Blog — ${NAME}` },
      { property: "og:description", content: `Writing on design, engineering and process.` },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
});

function BlogPage() {
  return (
    <section className="pt-20 lg:pt-28">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-16 lg:py-20">
        <SectionHeading
          eyebrow="Writing"
          title="Blog"
          subtitle="Short notes on design, engineering and the small decisions that add up."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="group rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-accent/40 lg:p-7"
            >
              <Link to="/blog/$slug" params={{ slug: post.slug }} className="block">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  <span className="text-accent">{post.tag}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {post.readMinutes} min
                  </span>
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold leading-snug lg:text-2xl">
                  {post.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">{post.excerpt}</p>
                <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
                  <time>{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</time>
                  <span className="inline-flex items-center gap-1 text-accent transition-transform group-hover:translate-x-0.5">
                    Read <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
