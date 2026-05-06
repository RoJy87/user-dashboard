import {
  Droplet,
  Eye,
  GraduationCap,
  Ruler,
  User as UserIcon,
  Weight,
} from "lucide-react";
import type { User } from "@/lib/types";
import { Row, SectionCard } from "./section-card";

export function PersonalCard({ user }: { user: User }) {
  return (
    <SectionCard title="Личные данные" icon={<UserIcon className="h-4 w-4" />}>
      <Row
        icon={<GraduationCap className="h-3.5 w-3.5" />}
        label="Университет"
      >
        {user.university}
      </Row>
      <Row icon={<Droplet className="h-3.5 w-3.5" />} label="Группа крови">
        {user.bloodGroup}
      </Row>
      <Row icon={<Eye className="h-3.5 w-3.5" />} label="Цвет глаз">
        <span className="capitalize">{user.eyeColor}</span>
      </Row>
      <Row icon={<Ruler className="h-3.5 w-3.5" />} label="Рост">
        {user.height} см
      </Row>
      <Row icon={<Weight className="h-3.5 w-3.5" />} label="Вес">
        {user.weight} кг
      </Row>
      <Row label="Волосы">
        <span className="capitalize">
          {user.hair.color}, {user.hair.type}
        </span>
      </Row>
    </SectionCard>
  );
}
