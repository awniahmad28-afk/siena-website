import { notFound } from "next/navigation";
import { FluxHome } from "@/components/flux/FluxHome";
import { StoryLayer } from "@/components/StoryLayer";
import { SceneDefs } from "@/components/scenes/common";
import { LockupDefs } from "@/components/AIConvergence";
import { getAvailablePlates } from "@/lib/plates.server";
import { EVO_DESIGNS } from "../designs";

export const dynamicParams = false;
export function generateStaticParams() {
  return EVO_DESIGNS.map((d) => ({ v: d.v }));
}

/** The live homepage (with the Evolution story) using one subtle Evolution button in the hero corner. */
export default async function EvoPreview({ params }: { params: Promise<{ v: string }> }) {
  const { v } = await params;
  const d = EVO_DESIGNS.find((x) => x.v === v);
  if (!d) notFound();
  return (
    <>
      <svg className="svg-defs" aria-hidden="true" focusable="false">
        <SceneDefs />
        <defs>
          <LockupDefs />
        </defs>
      </svg>
      <FluxHome evo={d.v} />
      <StoryLayer plates={getAvailablePlates()} />
    </>
  );
}
