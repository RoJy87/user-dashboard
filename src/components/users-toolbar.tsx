"use client";

import { LayoutGrid, List, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Gender, SortOrder, SortableKey } from "@/lib/types";
import { useDebouncedSync } from "@/lib/use-debounced-sync";
import type { UsersParamsState } from "@/lib/use-users-params";

interface Props {
  state: UsersParamsState;
  setParams: (patch: Partial<UsersParamsState>) => void;
}

const SORT_OPTIONS: { value: SortableKey; label: string }[] = [
  { value: "firstName", label: "Имя" },
  { value: "lastName", label: "Фамилия" },
  { value: "age", label: "Возраст" },
  { value: "email", label: "Email" },
  { value: "username", label: "Логин" },
];

export function UsersToolbar({ state, setParams }: Props) {
  const [search, setSearch] = useDebouncedSync(state.search, (v) => setParams({ search: v }));

  return (
    <div className='flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center'>
      <div className='relative flex-1 min-w-[220px]'>
        <Search className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Поиск по имени, логину, email…'
          className='pl-9 pr-9'
          aria-label='Поиск пользователей'
        />
        {search ? (
          <button
            type='button'
            onClick={() => setSearch("")}
            className='absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:bg-accent hover:text-foreground'
            aria-label='Очистить поиск'>
            <X className='h-4 w-4' />
          </button>
        ) : null}
      </div>

      <Select value={state.gender} onValueChange={(v) => setParams({ gender: v as Gender | "all" })}>
        <SelectTrigger className='w-[150px]' aria-label='Фильтр по полу'>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>Любой пол</SelectItem>
          <SelectItem value='female'>Женский</SelectItem>
          <SelectItem value='male'>Мужской</SelectItem>
        </SelectContent>
      </Select>

      <div className='flex items-center gap-1'>
        <Select
          value={state.sortBy || "none"}
          onValueChange={(v) => setParams({ sortBy: v === "none" ? "" : (v as SortableKey) })}>
          <SelectTrigger className='w-[160px]' aria-label='Сортировка'>
            <SelectValue placeholder='Сортировка' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='none'>Без сортировки</SelectItem>
            {SORT_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={state.order} onValueChange={(v) => setParams({ order: v as SortOrder })}>
          <SelectTrigger className='w-[120px]' aria-label='Порядок'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='asc'>По возр.</SelectItem>
            <SelectItem value='desc'>По убыв.</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className='ml-auto flex items-center gap-1 rounded-md border p-0.5'>
        <Button
          type='button'
          variant={state.view === "table" ? "secondary" : "ghost"}
          size='sm'
          onClick={() => setParams({ view: "table" })}
          aria-label='Вид: таблица'>
          <List className='h-4 w-4' />
        </Button>
        <Button
          type='button'
          variant={state.view === "grid" ? "secondary" : "ghost"}
          size='sm'
          onClick={() => setParams({ view: "grid" })}
          aria-label='Вид: карточки'>
          <LayoutGrid className='h-4 w-4' />
        </Button>
      </div>
    </div>
  );
}
