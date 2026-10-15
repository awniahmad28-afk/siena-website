import { PrivacyPage } from "@/components/pages/PrivacyPage";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("ku", "privacy");

export default function Page() {
  return <PrivacyPage locale="ku" />;
}
