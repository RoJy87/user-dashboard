"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { User } from "@/lib/types";

interface Props {
  users: User[] | undefined;
  loading?: boolean;
  pageSize: number;
}

export function UsersTable({ users, loading, pageSize }: Props) {
  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[260px]">Пользователь</TableHead>
            <TableHead>Возраст</TableHead>
            <TableHead>Пол</TableHead>
            <TableHead className="hidden md:table-cell">Email</TableHead>
            <TableHead className="hidden lg:table-cell">Компания</TableHead>
            <TableHead className="hidden lg:table-cell">Страна</TableHead>
            <TableHead className="w-[100px] text-right">{""}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading && !users
            ? Array.from({ length: pageSize }).map((_, i) => (
                <TableRow key={`sk-${i}`}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-9 w-9 rounded-full" />
                      <div className="space-y-1">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-10" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-16" />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Skeleton className="h-4 w-40" />
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell />
                </TableRow>
              ))
            : users?.map((u) => (
                <TableRow key={u.id} className="group">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
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
                        <div className="truncate text-xs text-muted-foreground">
                          @{u.username}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="tabular-nums">{u.age}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="capitalize">
                      {u.gender === "female" ? "жен." : "муж."}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className="truncate text-muted-foreground">
                      {u.email}
                    </span>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="truncate">{u.company.name}</div>
                    <div className="truncate text-xs text-muted-foreground">
                      {u.company.title}
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-muted-foreground">
                    {u.address.country}
                  </TableCell>
                  <TableCell className="text-right">
                    <Link
                      href={`/users/${u.id}`}
                      className={buttonVariants({
                        variant: "ghost",
                        size: "sm",
                        className:
                          "opacity-60 transition group-hover:opacity-100",
                      })}
                    >
                      Открыть <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
      {users && users.length === 0 && !loading ? (
        <div className="p-10 text-center text-sm text-muted-foreground">
          Никого не нашли. Попробуйте изменить фильтры.
        </div>
      ) : null}
    </div>
  );
}
