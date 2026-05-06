"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ApiError, fetchAllUsers, fetchUserById, fetchUsers } from "./api";
import type { UsersQueryParams } from "./types";

export function useUsers(params: UsersQueryParams) {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => fetchUsers(params),
    placeholderData: keepPreviousData,
    staleTime: 60_000,
    retry: (failureCount, error) => {
      // не ретраим клиентские ошибки — это не исправится повторной попыткой
      if (error instanceof ApiError && error.status >= 400 && error.status < 500) {
        return false;
      }
      return failureCount < 1;
    },
  });
}

export function useUser(id: number | string | undefined) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUserById(id!),
    enabled: id !== undefined,
    staleTime: 60_000,
    retry: (failureCount, error) => {
      if (error instanceof ApiError && error.isNotFound) return false;
      return failureCount < 1;
    },
  });
}

export function useAllUsers() {
  return useQuery({
    queryKey: ["users", "all"],
    queryFn: fetchAllUsers,
    staleTime: 5 * 60_000,
  });
}
