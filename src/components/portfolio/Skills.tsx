import { techStack } from "@/lib/data";
import { SectionHeading } from "./SectionHeading";

function Row({ reverse }: { reverse?: boolean }) {
  const items = [...techStack, ...techStack];
  return (
    <div className="overflow-hidden">
      <div className={reverse ? "marquee-reverse flex w-max gap-3" : "marquee flex w-max gap-3"}>
        {items.map((t, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 rounded-pill border border-border bg-surface px-4 py-2 text-sm font-medium lg:px-5 lg:py-2.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section className="relative py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-16">
        <SectionHeading
          eyebrow="Tech stack"
          title="Tools of the trade"
          subtitle="What I reach for, in roughly the order I reach for them."
          align="center"
        />
      </div>
      <div className="mt-10 space-y-3 lg:mt-12 lg:space-y-4">
        <Row />
        <Row reverse />
      </div>
    </section>
  );
}
