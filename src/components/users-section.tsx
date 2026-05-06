"use client";

import { AlertCircle } from "lucide-react";
import { Pagination } from "./pagination";
import { UsersGrid } from "./users-grid";
import { UsersTable } from "./users-table";
import { UsersToolbar } from "./users-toolbar";
import { useUsers } from "@/lib/hooks";
import { useUsersParams } from "@/lib/use-users-params";

export function UsersSection() {
  const [state, setParams] = useUsersParams();

  const { data, isLoading, isFetching, isError, error, refetch } = useUsers({
    limit: state.pageSize,
    skip: (state.page - 1) * state.pageSize,
    sortBy: state.sortBy || undefined,
    order: state.order,
    search: state.search || undefined,
    gender: state.gender === "all" ? undefined : state.gender,
  });

  return (
    <section className="space-y-4">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Пользователи</h2>
          <p className="text-sm text-muted-foreground">
            Поиск, фильтрация и сортировка данных из dummyjson.com
          </p>
        </div>
        {isFetching && !isLoading ? (
          <span className="text-xs text-muted-foreground">Обновляем…</span>
        ) : null}
      </div>

      <UsersToolbar state={state} setParams={setParams} />

      {isError ? (
        <div className="flex items-start gap-3 rounded-lg border border-destructive/40 bg-destructive/5 p-4 text-sm">
          <AlertCircle className="mt-0.5 h-4 w-4 text-destructive" />
          <div className="flex-1">
            <div className="font-medium text-destructive">
              Не удалось загрузить пользователей
            </div>
            <div className="text-muted-foreground">
              {(error as Error)?.message ?? "Неизвестная ошибка"}
            </div>
            <button
              type="button"
              onClick={() => refetch()}
              className="mt-2 text-sm font-medium underline underline-offset-4"
            >
              Попробовать ещё раз
            </button>
          </div>
        </div>
      ) : state.view === "table" ? (
        <UsersTable
          users={data?.users}
          loading={isLoading}
          pageSize={state.pageSize}
        />
      ) : (
        <UsersGrid
          users={data?.users}
          loading={isLoading}
          pageSize={state.pageSize}
        />
      )}

      <Pagination
        page={state.page}
        pageSize={state.pageSize}
        total={data?.total ?? 0}
        onPageChange={(p) => setParams({ page: p })}
        onPageSizeChange={(s) => setParams({ pageSize: s })}
      />
    </section>
  );
}
