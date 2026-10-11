import type { Metadata } from "next";
import { EvoBar } from "./EvoBar";

/** Evolution button previews — kept apart from the other design previews. Not linked from the site, not indexed. */
export const metadata: Metadata = {
  title: "SIENA — Evolution button previews",
  robots: { index: false, follow: false },
};

export default function EvoPreviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <EvoBar />
    </>
  );
}
