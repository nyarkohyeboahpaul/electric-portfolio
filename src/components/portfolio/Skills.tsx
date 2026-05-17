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
            className="inline-flex items-center gap-2 rounded-pill border border-border bg-surface px-5 py-2.5 text-sm font-medium"
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
    <section id="skills" className="relative py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading
          eyebrow="Tech stack"
          title="Tools of the trade"
          subtitle="What I reach for, in roughly the order I reach for them."
          align="center"
        />
      </div>
      <div className="mt-12 space-y-4">
        <Row />
        <Row reverse />
      </div>
    </section>
  );
}
