import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";

import { api } from "../services/api";

type User = {
  id: string;
  name: string;
  email: string;
  created_at: string;
};

type GetUsersResponse = {
  users: User[];
  totalRegisters: number;
};

export async function getUsers(page: number): Promise<GetUsersResponse> {
  const { data, headers } = await api.get<{ users: User[] }>("/users", {
    params: {
      page,
    },
  });

  const totalRegisters = Number(headers["x-total-count"]);

  const users = data.users.map((user) => ({
    ...user,
    created_at: new Date(user.created_at).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
  }));

  return { users, totalRegisters };
}

export function useUsers(page: number, options?: UseQueryOptions) {
  return useQuery(["users", page], () => getUsers(page), {
    staleTime: 1000 * 60 * 1,
    // ...options,
  }) as UseQueryResult<GetUsersResponse, unknown>;
}