import { WorkPage } from "@/components/pages/WorkPage";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("ar", "work");

export default function Page() {
  return <WorkPage locale="ar" />;
}
