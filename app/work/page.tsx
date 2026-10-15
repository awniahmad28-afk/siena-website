import { WorkPage } from "@/components/pages/WorkPage";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("en", "work");

export default function Page() {
  return <WorkPage locale="en" />;
}
