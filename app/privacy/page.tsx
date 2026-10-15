import { PrivacyPage } from "@/components/pages/PrivacyPage";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta("en", "privacy");

export default function Page() {
  return <PrivacyPage locale="en" />;
}
