import { ActivityList } from "@/ui/common/components/Activity/components/ActivityList";
import { Section } from "@/ui/common/components/Section/Section";

import { Delegations } from "../Delegations/Delegations";

export function Activity() {
  return (
    <Section>
      <Delegations />
      <ActivityList />
    </Section>
  );
}
