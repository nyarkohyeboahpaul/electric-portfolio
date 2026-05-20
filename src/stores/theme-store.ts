import { create } from "zustand";
import { DEFAULT_THEME, applyThemeToDocument, type ThemeTokens } from "@/lib/theme-defaults";

type ThemeState = {
  tokens: ThemeTokens;
  saved: ThemeTokens;
  dirty: boolean;
  setToken: <K extends keyof ThemeTokens>(key: K, value: ThemeTokens[K]) => void;
  setMany: (partial: Partial<ThemeTokens>) => void;
  hydrate: (tokens: Partial<ThemeTokens>) => void;
  markSaved: () => void;
  resetAll: () => void;
};

export const useThemeStore = create<ThemeState>((set, get) => ({
  tokens: { ...DEFAULT_THEME },
  saved: { ...DEFAULT_THEME },
  dirty: false,
  setToken: (key, value) => {
    const next = { ...get().tokens, [key]: value };
    applyThemeToDocument({ [key]: value } as Partial<ThemeTokens>);
    set({ tokens: next, dirty: true });
  },
  setMany: (partial) => {
    const next = { ...get().tokens, ...partial };
    applyThemeToDocument(partial);
    set({ tokens: next, dirty: true });
  },
  hydrate: (partial) => {
    const next = { ...DEFAULT_THEME, ...partial };
    applyThemeToDocument(next);
    set({ tokens: next, saved: next, dirty: false });
  },
  markSaved: () => set({ saved: get().tokens, dirty: false }),
  resetAll: () => {
    applyThemeToDocument(DEFAULT_THEME);
    set({ tokens: { ...DEFAULT_THEME }, dirty: true });
  },
}));
