"use client";

import { Building2, Cake, UsersIcon, Venus } from "lucide-react";
import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAllUsers } from "@/lib/hooks";
import { pluralize } from "@/lib/format";

export function KpiCards() {
  const { data, isLoading, isError } = useAllUsers();

  const stats = useMemo(() => {
    if (!data) return null;
    const total = data.length;
    const avgAge = Math.round(
      data.reduce((sum, u) => sum + u.age, 0) / Math.max(total, 1),
    );
    const females = data.filter((u) => u.gender === "female").length;
    const males = total - females;
    const femalePct = Math.round((females / Math.max(total, 1)) * 100);

    const byCountry = new Map<string, number>();
    for (const u of data) {
      const c = u.address.country;
      byCountry.set(c, (byCountry.get(c) ?? 0) + 1);
    }
    const topCountry = [...byCountry.entries()].sort(
      (a, b) => b[1] - a[1],
    )[0] ?? ["—", 0];

    return { total, avgAge, females, males, femalePct, topCountry };
  }, [data]);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <KpiCard
        title="Всего пользователей"
        icon={<UsersIcon className="h-4 w-4" />}
        value={stats ? stats.total.toString() : undefined}
        hint={
          stats
            ? `${stats.total} ${pluralize(stats.total, [
                "запись",
                "записи",
                "записей",
              ])}`
            : undefined
        }
        loading={isLoading}
        error={isError}
      />
      <KpiCard
        title="Средний возраст"
        icon={<Cake className="h-4 w-4" />}
        value={stats ? `${stats.avgAge}` : undefined}
        hint={stats ? `${pluralize(stats.avgAge, ["год", "года", "лет"])}` : undefined}
        loading={isLoading}
        error={isError}
      />
      <KpiCard
        title="Гендер-сплит"
        icon={<Venus className="h-4 w-4" />}
        value={stats ? `${stats.femalePct}% / ${100 - stats.femalePct}%` : undefined}
        hint={stats ? `жен. ${stats.females} · муж. ${stats.males}` : undefined}
        loading={isLoading}
        error={isError}
      />
      <KpiCard
        title="Топ-страна"
        icon={<Building2 className="h-4 w-4" />}
        value={stats ? stats.topCountry[0] : undefined}
        hint={
          stats
            ? `${stats.topCountry[1]} ${pluralize(stats.topCountry[1] as number, [
                "пользователь",
                "пользователя",
                "пользователей",
              ])}`
            : undefined
        }
        loading={isLoading}
        error={isError}
      />
    </div>
  );
}

function KpiCard({
  title,
  value,
  hint,
  icon,
  loading,
  error,
}: {
  title: string;
  value?: string;
  hint?: string;
  icon: React.ReactNode;
  loading?: boolean;
  error?: boolean;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        {error ? (
          <div className="text-sm text-destructive">Ошибка загрузки</div>
        ) : loading || value === undefined ? (
          <div className="space-y-2">
            <Skeleton className="h-7 w-24" />
            <Skeleton className="h-3 w-32" />
          </div>
        ) : (
          <>
            <div className="text-2xl font-semibold tracking-tight">{value}</div>
            {hint ? (
              <div className="mt-1 text-xs text-muted-foreground">{hint}</div>
            ) : null}
          </>
        )}
      </CardContent>
    </Card>
  );
}
