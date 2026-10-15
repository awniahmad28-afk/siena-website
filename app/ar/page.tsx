import { HomePage } from "@/components/pages/HomePage";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("ar", "home");

export default function Page() {
  return <HomePage locale="ar" />;
}
