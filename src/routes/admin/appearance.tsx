import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { toast } from "sonner";
import { Loader2, RotateCcw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AdminGate } from "@/components/admin/AdminGate";
import { useThemeStore } from "@/stores/theme-store";
import { DEFAULT_THEME, PRESETS, type ThemeTokens } from "@/lib/theme-defaults";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/admin/appearance")({
  component: () => (
    <AdminGate title="Appearance"><AppearancePage /></AdminGate>
  ),
  head: () => ({ meta: [{ title: "Admin · Appearance" }, { name: "robots", content: "noindex" }] }),
});

const SECTIONS: { title: string; fields: { key: keyof ThemeTokens; label: string }[] }[] = [
  { title: "Brand Colors", fields: [
    { key: "accent", label: "Accent" },
    { key: "accentHover", label: "Accent Hover" },
    { key: "accentDim", label: "Accent Dim (translucent)" },
  ]},
  { title: "Backgrounds", fields: [
    { key: "background", label: "Page Background" },
    { key: "surface", label: "Surface / Card" },
    { key: "surface2", label: "Hover Surface" },
    { key: "border", label: "Border" },
  ]},
  { title: "Text", fields: [
    { key: "foreground", label: "Primary Text" },
    { key: "mutedForeground", label: "Muted Text" },
    { key: "heading", label: "Heading" },
  ]},
  { title: "Navbar", fields: [
    { key: "navBg", label: "Navbar Background" },
    { key: "navBorder", label: "Navbar Border" },
    { key: "navLink", label: "Link Color" },
    { key: "navLinkActive", label: "Active Link" },
  ]},
  { title: "Buttons", fields: [
    { key: "btnPrimaryBg", label: "Primary BG" },
    { key: "btnPrimaryFg", label: "Primary Text" },
    { key: "btnSecondaryBorder", label: "Secondary Border" },
    { key: "btnSecondaryFg", label: "Secondary Text" },
  ]},
  { title: "Bottom Navigation (Mobile)", fields: [
    { key: "bottomNavBg", label: "Background" },
    { key: "bottomNavActive", label: "Active Icon" },
    { key: "bottomNavInactive", label: "Inactive Icon" },
  ]},
];

function ColorField({ tokenKey, label }: { tokenKey: keyof ThemeTokens; label: string }) {
  const value = useThemeStore((s) => s.tokens[tokenKey] as string);
  const setToken = useThemeStore((s) => s.setToken);
  return (
    <div>
      <Label className="text-xs text-[#aaa]">{label}</Label>
      <div className="mt-1 flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="h-9 w-9 shrink-0 rounded-md border border-[#252525]"
              style={{ background: value }}
              aria-label={`Pick ${label}`}
            />
          </PopoverTrigger>
          <PopoverContent className="w-auto border-[#252525] bg-[#141414] p-3">
            <HexColorPicker
              color={/^#[0-9a-fA-F]{6}$/.test(value) ? value : "#000000"}
              onChange={(v) => setToken(tokenKey, v as never)}
            />
          </PopoverContent>
        </Popover>
        <Input
          value={value}
          onChange={(e) => setToken(tokenKey, e.target.value as never)}
          className="bg-[#1A1A1A] font-mono text-xs"
        />
        <button
          type="button"
          onClick={() => setToken(tokenKey, DEFAULT_THEME[tokenKey] as never)}
          className="text-[#666] hover:text-white"
          title="Reset to default"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

function AppearancePage() {
  const tokens = useThemeStore((s) => s.tokens);
  const dirty = useThemeStore((s) => s.dirty);
  const setMany = useThemeStore((s) => s.setMany);
  const markSaved = useThemeStore((s) => s.markSaved);
  const resetAll = useThemeStore((s) => s.resetAll);
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    try {
      const rows = Object.entries(tokens).map(([k, v]) => ({
        key: `theme.${k}`,
        value: String(v),
      }));
      const { error } = await supabase.from("site_settings").upsert(rows, { onConflict: "key" });
      if (error) throw error;
      markSaved();
      toast.success("Theme saved. The public site will use it on next page load.");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-6">
        <div className="rounded-xl border border-[#1F1F1F] bg-[#141414] p-6">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#888]">
            Presets
          </h3>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() =>
                  setMany({
                    accent: p.accent,
                    accentHover: p.accentHover,
                    accentDim: p.accentDim,
                    navLinkActive: p.accent,
                    btnPrimaryBg: p.accent,
                    bottomNavActive: p.accent,
                  })
                }
                className="flex items-center gap-2 rounded-lg border border-[#252525] bg-[#1A1A1A] p-2 text-left text-xs hover:border-[var(--accent)]"
              >
                <span
                  className="h-6 w-6 shrink-0 rounded-full"
                  style={{ background: p.accent }}
                />
                <span>{p.label}</span>
              </button>
            ))}
          </div>
        </div>

        {SECTIONS.map((sec) => (
          <div key={sec.title} className="rounded-xl border border-[#1F1F1F] bg-[#141414] p-6">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#888]">
              {sec.title}
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {sec.fields.map((f) => (
                <ColorField key={f.key} tokenKey={f.key} label={f.label} />
              ))}
            </div>
          </div>
        ))}

        <div className="rounded-xl border border-[#1F1F1F] bg-[#141414] p-6">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#888]">
            Typography
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label className="text-xs text-[#aaa]">Heading font</Label>
              <select
                value={tokens.fontHeading}
                onChange={(e) => setMany({ fontHeading: e.target.value })}
                className="mt-1 h-9 w-full rounded-md border border-[#252525] bg-[#1A1A1A] px-2 text-sm"
              >
                {["Syne", "Poppins", "Space Grotesk", "Raleway", "Montserrat", "Plus Jakarta Sans"].map((f) => (
                  <option key={f}>{f}</option>
                ))}
              </select>
            </div>
            <div>
              <Label className="text-xs text-[#aaa]">Body font</Label>
              <select
                value={tokens.fontBody}
                onChange={(e) => setMany({ fontBody: e.target.value })}
                className="mt-1 h-9 w-full rounded-md border border-[#252525] bg-[#1A1A1A] px-2 text-sm"
              >
                {["Inter", "DM Sans", "Nunito", "Lato", "Source Sans 3"].map((f) => (
                  <option key={f}>{f}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky save panel */}
      <aside className="lg:sticky lg:top-20 lg:self-start">
        <div className="rounded-xl border border-[#1F1F1F] bg-[#141414] p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#888]">Save</h3>
          <p className="mt-2 text-xs text-[#777]">
            {dirty ? "You have unsaved changes." : "All changes saved."}
          </p>
          <div className="mt-4 space-y-2">
            <Button onClick={save} disabled={saving || !dirty} className="w-full">
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save changes
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                if (confirm("Reset every color to its default?")) resetAll();
              }}
              className="w-full"
            >
              <RotateCcw className="mr-2 h-4 w-4" /> Reset all
            </Button>
          </div>

          <div className="mt-6 rounded-lg border border-[#252525] p-3">
            <div className="text-xs text-[#888]">Live preview</div>
            <div className="mt-3 space-y-2">
              <div className="rounded-md p-3" style={{ background: tokens.surface, border: `1px solid ${tokens.border}` }}>
                <div style={{ color: tokens.heading, fontFamily: tokens.fontHeading }} className="text-base font-bold">
                  Headline sample
                </div>
                <div style={{ color: tokens.mutedForeground }} className="text-xs">
                  Body text preview at 12px.
                </div>
                <button
                  className="mt-2 rounded-md px-3 py-1.5 text-xs font-semibold"
                  style={{ background: tokens.btnPrimaryBg, color: tokens.btnPrimaryFg }}
                >
                  Primary button
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
