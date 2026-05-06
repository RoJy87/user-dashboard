import { Cake, Mail, Phone } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/format";
import type { User } from "@/lib/types";

export function UserHero({ user }: { user: User }) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center">
        <Avatar className="h-24 w-24">
          <AvatarImage src={user.image} alt="" />
          <AvatarFallback className="text-xl">
            {user.firstName[0]}
            {user.lastName[0]}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tight">
              {user.firstName} {user.lastName}
            </h1>
            <Badge variant="secondary" className="capitalize">
              {user.gender === "female" ? "жен." : "муж."}
            </Badge>
            <Badge variant="outline">{user.role}</Badge>
          </div>
          <div className="mt-1 text-sm text-muted-foreground">
            @{user.username} · ID {user.id}
          </div>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <InlineFact icon={<Mail className="h-3.5 w-3.5" />}>
              <a href={`mailto:${user.email}`} className="hover:underline">
                {user.email}
              </a>
            </InlineFact>
            <InlineFact icon={<Phone className="h-3.5 w-3.5" />}>
              <a href={`tel:${user.phone}`} className="hover:underline">
                {user.phone}
              </a>
            </InlineFact>
            <InlineFact icon={<Cake className="h-3.5 w-3.5" />}>
              {formatDate(user.birthDate)} · {user.age} лет
            </InlineFact>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function InlineFact({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 text-muted-foreground">
      <span>{icon}</span>
      <span className="text-foreground">{children}</span>
    </span>
  );
}
