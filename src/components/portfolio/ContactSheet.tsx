import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, Mail, MapPin, Send } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { EMAIL, LOCATION } from "@/lib/data";

const schema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(80),
  email: z.string().trim().email("Enter a valid email").max(160),
  subject: z.string().trim().min(2).max(120),
  message: z.string().trim().min(10, "At least 10 characters").max(2000),
});
type FormValues = z.infer<typeof schema>;

export function ContactSheet({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    toast.success("Message sent — I'll reply within 24 hours.", { description: `Thanks, ${values.name}.` });
    reset();
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full overflow-y-auto border-l border-border bg-background p-0 sm:max-w-md"
      >
        <div className="p-6 sm:p-8">
          <SheetHeader className="space-y-2 text-left">
            <div className="inline-flex w-fit items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-accent">
              <span className="h-px w-6 bg-accent" />
              Get in touch
            </div>
            <SheetTitle className="font-display text-3xl tracking-tight">Let's work together.</SheetTitle>
            <SheetDescription className="text-sm text-muted-foreground">
              Tell me a little about your project, timeline and budget. I read every message myself.
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 grid gap-2 text-sm">
            <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 rounded-xl border border-border bg-surface/60 p-3 hover:border-accent/40">
              <Mail className="h-4 w-4 text-accent" /> {EMAIL}
            </a>
            <div className="flex items-center gap-3 rounded-xl border border-border bg-surface/60 p-3 text-muted-foreground">
              <MapPin className="h-4 w-4 text-accent" /> {LOCATION}
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <Field label="Name" error={errors.name?.message}>
              <input {...register("name")} placeholder="Your full name" className="sheet-input" />
            </Field>
            <Field label="Email" error={errors.email?.message}>
              <input type="email" {...register("email")} placeholder="you@studio.com" className="sheet-input" />
            </Field>
            <Field label="Subject" error={errors.subject?.message}>
              <input {...register("subject")} placeholder="Project, role, idea…" className="sheet-input" />
            </Field>
            <Field label="Message" error={errors.message?.message}>
              <textarea rows={5} {...register("message")} placeholder="A few lines about what you're building." className="sheet-input resize-none" />
            </Field>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-pill bg-accent px-6 py-3.5 font-medium text-accent-foreground transition-all active:scale-[0.98] hover:shadow-glow disabled:opacity-60"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {loading ? "Sending…" : "Send message"}
            </button>
          </form>

          <style>{`
            .sheet-input {
              width: 100%;
              background: color-mix(in oklab, var(--background) 70%, transparent);
              border: 1px solid var(--border);
              border-radius: 10px;
              padding: 12px 14px;
              font-size: 14px;
              color: var(--foreground);
              outline: none;
              transition: border-color .2s, box-shadow .2s;
              min-height: 44px;
            }
            .sheet-input::placeholder { color: var(--muted-foreground); }
            .sheet-input:focus {
              border-color: var(--accent);
              box-shadow: 0 0 0 3px color-mix(in oklab, var(--accent) 18%, transparent);
            }
          `}</style>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-xs text-[oklch(0.7_0.18_25)]">{error}</span>}
    </label>
  );
}
