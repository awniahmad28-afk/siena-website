import type { Metadata } from "next";
import "@fontsource-variable/jetbrains-mono/wght.css";
import { NotFoundPage } from "@/components/pages/NotFoundPage";

export const metadata: Metadata = { title: "Page not found | SIENA Solutions", robots: { index: false } };

/** Shown for any address that doesn't exist (exported as 404.html, which GitHub Pages serves for unknown paths). */
export default function NotFound() {
  return <NotFoundPage />;
}
