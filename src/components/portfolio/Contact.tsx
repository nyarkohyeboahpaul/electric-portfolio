import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter, Dribbble, Instagram, Loader2 } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { EMAIL, LOCATION, socials } from "@/lib/data";

const schema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(80),
  email: z.string().trim().email("Enter a valid email").max(160),
  subject: z.string().trim().min(2).max(120),
  message: z.string().trim().min(10, "At least 10 characters").max(2000),
});

type FormValues = z.infer<typeof schema>;

const ICONS = { Github, Linkedin, Twitter, Dribbble, Instagram };

export function Contact() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    toast.success("Message sent — I'll reply within 24 hours.", {
      description: `Thanks, ${values.name}.`,
    });
    reset();
  };

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Left */}
          <div>
            <SectionHeading
              eyebrow="Get in touch"
              title="Let's work together."
              subtitle="Drop a few lines about your project, timeline and budget. I read every message myself, usually within a day."
            />

            <div className="mt-10 space-y-4">
              {[
                { Icon: Mail, label: EMAIL, href: `mailto:${EMAIL}` },
                { Icon: Phone, label: "+63 917 555 0142", href: "tel:+639175550142" },
                { Icon: MapPin, label: LOCATION, href: "#" },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="group flex items-center gap-4 rounded-2xl border border-border bg-surface/60 p-4 transition-colors hover:border-accent/40"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-accent-dim text-accent">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium group-hover:text-accent">{label}</span>
                </a>
              ))}
            </div>

            <div className="mt-10">
              <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Find me elsewhere</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {socials.map((s) => {
                  const Icon = ICONS[s.icon];
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.label}
                      className="group grid h-11 w-11 place-items-center rounded-full border border-border bg-surface transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right — form */}
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-border bg-surface p-6 md:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" error={errors.name?.message}>
                <input
                  {...register("name")}
                  placeholder="Your full name"
                  className="input"
                />
              </Field>
              <Field label="Email" error={errors.email?.message}>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="you@studio.com"
                  className="input"
                />
              </Field>
            </div>
            <div className="mt-4">
              <Field label="Subject" error={errors.subject?.message}>
                <input
                  {...register("subject")}
                  placeholder="Project, role, idea…"
                  className="input"
                />
              </Field>
            </div>
            <div className="mt-4">
              <Field label="Message" error={errors.message?.message}>
                <textarea
                  rows={6}
                  {...register("message")}
                  placeholder="A few lines about what you're building."
                  className="input resize-none"
                />
              </Field>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-pill bg-accent px-6 py-3.5 font-medium text-accent-foreground transition-all hover:scale-[1.01] hover:shadow-glow disabled:opacity-60"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {loading ? "Sending…" : "Send message"}
            </button>

            <style>{`
              .input {
                width: 100%;
                background: color-mix(in oklab, var(--background) 70%, transparent);
                border: 1px solid var(--border);
                border-radius: 10px;
                padding: 12px 14px;
                font-size: 14px;
                color: var(--foreground);
                outline: none;
                transition: border-color .2s, box-shadow .2s;
              }
              .input::placeholder { color: var(--muted-foreground); }
              .input:focus {
                border-color: var(--accent);
                box-shadow: 0 0 0 3px color-mix(in oklab, var(--accent) 18%, transparent);
              }
            `}</style>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </span>
      {children}
      {error && <span className="mt-1.5 block text-xs text-[oklch(0.7_0.18_25)]">{error}</span>}
    </label>
  );
}
