"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "@/api/todo.api";

export const useTodos = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });
};
