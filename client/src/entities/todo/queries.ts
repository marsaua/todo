import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addTodo,
  deleteTodo,
  getCompanyTodos,
  getTodos,
  updateTodo,
} from "./api";

export const qk = {
  todos: {
    root: () => ["todos"] as const,
    listRoot: () => ["todos", "list"] as const,
    list: (page: number, limit: number, categoryId?: number) =>
      ["todos", "list", page, limit, categoryId ?? null] as const,
    byId: (id: number) => ["todos", "byId", id] as const,
  },
};

export function useTodosQuery({
  page,
  limit,
  categoryId,
}: {
  page: number;
  limit: number;
  categoryId?: number;
}) {
  return useQuery({
    queryKey: qk.todos.list(page, limit, categoryId),
    queryFn: () => getTodos(page, limit, categoryId),
    placeholderData: (prev) => prev,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

export function useAddTodoMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      title: string;
      content: string;
      categoryId: number;
    }) => addTodo(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.todos.listRoot() }),
    onError: (error) => error,
  });
}

export function useUpdateTodoMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: { title: string; content: string; categoryId: number };
    }) => updateTodo(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.todos.listRoot() }),
    onError: (error) => error,
  });
}

export function useDeleteTodoMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteTodo(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.todos.listRoot() }),
    onError: (error) => error,
  });
}

export function useCompanyTodosQuery({
  page,
  limit,
  companyId,
}: {
  page: number;
  limit: number;
  companyId?: number;
}) {
  return useQuery({
    queryKey: qk.todos.list(page, limit, companyId),
    queryFn: () => getCompanyTodos(page, limit, companyId),
    placeholderData: (prev) => prev,
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: !!companyId,
  });
}
