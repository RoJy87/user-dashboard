import { Briefcase } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import type { User } from "@/lib/types";
import { Row, SectionCard } from "./section-card";

export function WorkCard({ user }: { user: User }) {
  return (
    <SectionCard title="Работа" icon={<Briefcase className="h-4 w-4" />}>
      <Row label="Компания">{user.company.name}</Row>
      <Row label="Должность">{user.company.title}</Row>
      <Row label="Отдел">{user.company.department}</Row>
      <Separator className="my-2" />
      <Row label="Офис">
        {user.company.address.address}, {user.company.address.city},{" "}
        {user.company.address.country}
      </Row>
    </SectionCard>
  );
}
