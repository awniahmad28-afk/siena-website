import { FluxHome } from "@/components/flux/FluxHome";
import { StoryLayer } from "@/components/StoryLayer";
import { SceneDefs } from "@/components/scenes/common";
import { LockupDefs } from "@/components/AIConvergence";
import { getAvailablePlates } from "@/lib/plates.server";
import { SERVICES, SITE } from "@/content/site";
import { asset } from "@/lib/asset";

/* business details for search engines (schema.org); location and social links are added automatically once set */
function businessData() {
  const base = SITE.url.replace(/\/$/, "");
  const sameAs = Object.values(SITE.social).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${SITE.name} ${SITE.tagline}`,
    url: `${base}/`,
    logo: `${base}${asset("/brand/siena-logo-720.webp")}`,
    image: `${base}${asset("/brand/og.jpg")}`,
    description: SITE.description,
    email: SITE.contactEmail,
    telephone: SITE.phone.replace(/\s/g, ""),
    ...(SITE.location ? { address: SITE.location } : {}),
    ...(sameAs.length ? { sameAs } : {}),
    makesOffer: SERVICES.map((sv) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: sv.title } })),
  };
}

/**
 * The homepage: Genesis Flux. "Experience the Evolution" (any #evolution link) opens the full-screen
 * Evolution story on top of it (StoryLayer).
 */
export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessData()) }} />
      {/* shared SVG definitions used by the Evolution story's scenes */}
      <svg className="svg-defs" aria-hidden="true" focusable="false">
        <SceneDefs />
        <defs>
          <LockupDefs />
        </defs>
      </svg>
      <FluxHome />
      <StoryLayer plates={getAvailablePlates()} />
    </>
  );
}
