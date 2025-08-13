import { fetchWithAuth } from "@/helpers/fetchWithAuth";
export type Category = { id: number; title: string; color: string };
export type CategoriesResponse = {
  data: Category[];
};

export const getCategories = () =>
  fetchWithAuth<CategoriesResponse>("GET", "categories");

export const updateCategory = (
  id: number,
  data: { title: string; color: string }
) => fetchWithAuth<Category>("PUT", `categories/${id}`, data);

export const addCategory = (title: string, color: string) =>
  fetchWithAuth<Category>("POST", "categories", { title, color });

export const deleteCategory = (id: number) =>
  fetchWithAuth("DELETE", `categories/${id}`);
