// src/hooks/usePaginatedTodos.ts
import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "@/api/todo.api";

export const usePaginatedTodos = (page: number, limit = 10) => {
  return useQuery({
    queryKey: ["todos", page],
    queryFn: () => fetchTodos(page, limit),
  });
};
