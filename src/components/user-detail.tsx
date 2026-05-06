"use client";

import { AlertCircle, UserX } from "lucide-react";
import { ApiError } from "@/lib/api";
import { useUser } from "@/lib/hooks";
import { AddressCard } from "./user-detail/address-card";
import { BackLink } from "./user-detail/back-link";
import { FinanceCard } from "./user-detail/finance-card";
import { PersonalCard } from "./user-detail/personal-card";
import { UserDetailSkeleton } from "./user-detail/user-detail-skeleton";
import { UserHero } from "./user-detail/user-hero";
import { WorkCard } from "./user-detail/work-card";

interface Props {
  id: string;
}

export function UserDetail({ id }: Props) {
  const { data: user, isLoading, isError, error } = useUser(id);

  if (isLoading) return <UserDetailSkeleton />;

  if (isError || !user) {
    const notFound = error instanceof ApiError && error.isNotFound;
    return (
      <div className='space-y-4'>
        <BackLink />
        <div className='flex items-start gap-3 rounded-lg border border-destructive/40 bg-destructive/5 p-4 text-sm'>
          {notFound ? (
            <UserX className='mt-0.5 h-4 w-4 text-destructive' />
          ) : (
            <AlertCircle className='mt-0.5 h-4 w-4 text-destructive' />
          )}
          <div>
            <div className='font-medium text-destructive'>
              {notFound ? "Пользователь не найден" : "Не удалось загрузить данные"}
            </div>
            <div className='text-muted-foreground'>
              {notFound
                ? `Пользователя с ID ${id} не существует.`
                : ((error as Error)?.message ?? "Попробуйте обновить страницу или вернуться к списку.")}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      <BackLink />
      <UserHero user={user} />
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
        <PersonalCard user={user} />
        <AddressCard user={user} />
        <WorkCard user={user} />
        <FinanceCard user={user} />
      </div>
    </div>
  );
}
