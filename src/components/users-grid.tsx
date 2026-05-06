"use client";

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { User } from "@/lib/types";

interface Props {
  users: User[] | undefined;
  loading?: boolean;
  pageSize: number;
}

export function UsersGrid({ users, loading, pageSize }: Props) {
  if (loading && !users) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: pageSize }).map((_, i) => (
          <Card key={`sk-${i}`}>
            <CardContent className="space-y-3 p-5">
              <div className="flex items-center gap-3">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (users && users.length === 0) {
    return (
      <div className="rounded-lg border p-10 text-center text-sm text-muted-foreground">
        Никого не нашли. Попробуйте изменить фильтры.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {users?.map((u) => (
        <Link
          key={u.id}
          href={`/users/${u.id}`}
          className="group rounded-lg outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Card className="h-full transition-colors group-hover:border-foreground/20">
            <CardContent className="space-y-3 p-5">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={u.image} alt="" />
                  <AvatarFallback>
                    {u.firstName[0]}
                    {u.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <div className="truncate font-medium">
                    {u.firstName} {u.lastName}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="truncate">@{u.username}</span>
                    <span>·</span>
                    <span>{u.age} лет</span>
                    <Badge variant="secondary" className="ml-auto">
                      {u.gender === "female" ? "жен." : "муж."}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="space-y-1.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-2 truncate">
                  <Mail className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{u.email}</span>
                </div>
                <div className="flex items-center gap-2 truncate">
                  <Phone className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{u.phone}</span>
                </div>
                <div className="flex items-center gap-2 truncate">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">
                    {u.address.city}, {u.address.country}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
