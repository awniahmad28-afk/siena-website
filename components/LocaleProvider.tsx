"use client";
import { createContext, useContext, type ReactNode } from "react";
import { getContent } from "@/content/index";
import type { Locale } from "@/lib/i18n";

const LocaleContext = createContext<Locale>("en");

/** Wraps a page so every client component below it reads the page's language (useContent / useLocale). */
export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export const useLocale = () => useContext(LocaleContext);
export const useContent = () => getContent(useContext(LocaleContext));
