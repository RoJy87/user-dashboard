import type { SortableKey, SortOrder, User, UsersQueryParams, UsersResponse } from "./types";

const BASE_URL = "https://dummyjson.com";

export class ApiError extends Error {
  readonly status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
  get isNotFound() {
    return this.status === 404;
  }
  get isServer() {
    return this.status >= 500;
  }
  get isNetwork() {
    return this.status === 0;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      ...init,
      headers: { "Content-Type": "application/json", ...init?.headers },
    });
  } catch (e) {
    throw new ApiError(0, `Нет связи с сервером: ${(e as Error).message}`);
  }
  if (!res.ok) {
    const suffix = res.statusText ? ` ${res.statusText}` : "";
    throw new ApiError(res.status, `Запрос не удался: ${res.status}${suffix}`);
  }
  return res.json() as Promise<T>;
}

function sortUsers(users: User[], sortBy: SortableKey, order: SortOrder): User[] {
  const dir = order === "desc" ? -1 : 1;
  return [...users].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    if (typeof aValue === "number" && typeof bValue === "number") {
      return (aValue - bValue) * dir;
    }
    return String(aValue).localeCompare(String(bValue)) * dir;
  });
}

export async function fetchUsers(params: UsersQueryParams = {}): Promise<UsersResponse> {
  const { limit = 30, skip = 0, sortBy, order = "asc", search, gender } = params;

  if (search && search.trim().length > 0) {
    const qs = new URLSearchParams({
      q: search.trim(),
      limit: "0", // dummyjson search возвращает все совпадения, игнорируя limit/skip, поэтому фильтруем на клиенте
    });
    const data = await request<UsersResponse>(`/users/search?${qs.toString()}`);

    let users = data.users;

    if (gender && gender !== "all") {
      users = users.filter((u) => u.gender === gender);
    }

    if (sortBy) {
      users = sortUsers(users, sortBy, order);
    }
    const total = users.length;
    const page = users.slice(skip, skip + limit);
    return { users: page, total, skip, limit };
  }

  // Фильтр по полу через /users/filter
  if (gender && gender !== "all") {
    const qs = new URLSearchParams({
      key: "gender",
      value: gender,
      limit: String(limit),
      skip: String(skip),
    });
    if (sortBy) qs.set("sortBy", sortBy);
    if (order) qs.set("order", order);
    return request<UsersResponse>(`/users/filter?${qs.toString()}`);
  }

  // Обычный список
  const qs = new URLSearchParams({
    limit: String(limit),
    skip: String(skip),
  });
  if (sortBy) qs.set("sortBy", sortBy);
  if (order) qs.set("order", order);
  return request<UsersResponse>(`/users?${qs.toString()}`);
}

export async function fetchUserById(id: number | string): Promise<User> {
  return request<User>(`/users/${id}`);
}

/**
 * Тянем всех пользователей одним запросом — нужно для KPI/аналитики.
 * У dummyjson лимит до 100 за раз, общее число ≈ 208, поэтому
 * делаем два последовательных запроса.
 */
export async function fetchAllUsers(): Promise<User[]> {
  const first = await fetchUsers({ limit: 100, skip: 0 });
  const all: User[] = [...first.users];
  let skip = first.users.length;
  while (skip < first.total) {
    const next = await fetchUsers({ limit: 100, skip });
    all.push(...next.users);
    if (next.users.length === 0) break;
    skip += next.users.length;
  }
  return all;
}
