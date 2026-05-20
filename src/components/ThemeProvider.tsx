import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DEFAULT_THEME, applyThemeToDocument, type ThemeTokens } from "@/lib/theme-defaults";
import { useThemeStore } from "@/stores/theme-store";

/**
 * Fetches `theme.*` rows from site_settings and applies them as CSS variables on <html>.
 * Falls back to DEFAULT_THEME on empty/error so the public site always renders.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const hydrate = useThemeStore((s) => s.hydrate);

  const { data } = useQuery({
    queryKey: ["site-settings", "theme"],
    staleTime: 60_000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("key, value")
        .like("key", "theme.%");
      if (error) throw error;
      const tokens: Partial<ThemeTokens> = {};
      for (const row of data ?? []) {
        const k = row.key.replace(/^theme\./, "") as keyof ThemeTokens;
        (tokens as Record<string, string>)[k] = row.value;
      }
      return tokens;
    },
  });

  useEffect(() => {
    // Always apply defaults first so SSR markup matches.
    applyThemeToDocument(DEFAULT_THEME);
    if (data) hydrate(data);
    else hydrate(DEFAULT_THEME);
  }, [data, hydrate]);

  return <>{children}</>;
}
