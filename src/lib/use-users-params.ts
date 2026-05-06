"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import type { Gender, SortOrder, SortableKey } from "./types";

export interface UsersParamsState {
  search: string;
  gender: Gender | "all";
  sortBy: SortableKey | "";
  order: SortOrder;
  page: number;
  pageSize: number;
  view: "table" | "grid";
}

const DEFAULTS: UsersParamsState = {
  search: "",
  gender: "all",
  sortBy: "",
  order: "asc",
  page: 1,
  pageSize: 12,
  view: "table",
};

export function useUsersParams() {
  const router = useRouter();
  const sp = useSearchParams();

  const state: UsersParamsState = useMemo(
    () => ({
      search: sp.get("q") ?? DEFAULTS.search,
      gender: (sp.get("gender") as Gender | "all" | null) ?? DEFAULTS.gender,
      sortBy:
        (sp.get("sortBy") as SortableKey | "" | null) ?? DEFAULTS.sortBy,
      order: (sp.get("order") as SortOrder | null) ?? DEFAULTS.order,
      page: Number(sp.get("page") ?? DEFAULTS.page) || 1,
      pageSize: Number(sp.get("size") ?? DEFAULTS.pageSize) || DEFAULTS.pageSize,
      view: (sp.get("view") as "table" | "grid" | null) ?? DEFAULTS.view,
    }),
    [sp],
  );

  const setParams = useCallback(
    (patch: Partial<UsersParamsState>) => {
      const next = new URLSearchParams(sp.toString());
      const merged = { ...state, ...patch };

      const write = (key: string, value: string, fallback: string) => {
        if (value === "" || value === fallback) next.delete(key);
        else next.set(key, value);
      };

      write("q", merged.search, DEFAULTS.search);
      write("gender", merged.gender, DEFAULTS.gender);
      write("sortBy", merged.sortBy, DEFAULTS.sortBy);
      write("order", merged.order, DEFAULTS.order);
      write("view", merged.view, DEFAULTS.view);
      write("size", String(merged.pageSize), String(DEFAULTS.pageSize));

      // page — сбрасываем при смене фильтров
      if (
        "search" in patch ||
        "gender" in patch ||
        "sortBy" in patch ||
        "order" in patch ||
        "pageSize" in patch
      ) {
        next.delete("page");
      } else {
        write("page", String(merged.page), String(DEFAULTS.page));
      }

      router.replace(`?${next.toString()}`, { scroll: false });
    },
    [router, sp, state],
  );

  return [state, setParams] as const;
}
