import type { Metadata, Viewport } from "next";
// Self-hosted variable fonts (no third-party requests at build or runtime)
import "@fontsource-variable/sora/wght.css";
import "@fontsource-variable/inter/wght.css";
// Arabic-script fonts for the Arabic and Kurdish pages (they only download when Arabic letters are on screen)
import "@fontsource-variable/noto-kufi-arabic/wght.css";
import "@fontsource-variable/noto-sans-arabic/wght.css";
import { SITE } from "@/content/site";
import "./globals.css";
import { asset } from "@/lib/asset";


export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: "SIENA Solutions | The Evolution of Business Systems",
  description: SITE.description,
  openGraph: {
    title: "SIENA — The Evolution of Business Systems",
    description: "From paper. To software. To intelligence.",
    images: [{ url: asset("/brand/og.jpg"), width: 1200, height: 630, alt: "SIENA Solutions" }],
    type: "website",
  },
};

// viewportFit "cover": lets the layout use the safe-area insets (notch, home indicator) instead of ignoring them
export const viewport: Viewport = { themeColor: "#03060e", colorScheme: "dark", viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    /* lang/dir are rewritten to ar/rtl and ckb/rtl in the exported /ar/ and /ku/ pages (scripts/localize-html.mjs) */
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
