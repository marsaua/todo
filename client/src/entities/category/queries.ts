import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "./api";

export const qk = {
  categories: { list: () => ["categories", "list"] as const },
};

export function useCategoriesQuery() {
  return useQuery({
    queryKey: qk.categories.list(),
    queryFn: () => getCategories(),
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

export function useAddCategoryMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ title, color }: { title: string; color: string }) =>
      addCategory(title, color),
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.categories.list() }),
    onError: (error) => error,
  });
}

export function useUpdateCategoryMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: { title: string; color: string };
    }) => updateCategory(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.categories.list() }),
    onError: (error) => error,
  });
}

export function useDeleteCategoryMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteCategory(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.categories.list() }),
    onError: (error) => error,
  });
}
