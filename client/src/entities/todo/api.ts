import { fetchWithAuth } from "@/helpers/fetchWithAuth";
export type Todo = {
  id: number;
  title: string;
  content: string;
  categoryId: number;
};
export type TodosResponse = {
  data: {
    data: Todo[];
    meta: {
      totalPages: number;
      totalItems: number;
      currentPage: number;
      itemsPerPage: number;
    };
    links: {
      first: string;
      last: string;
      current: string;
      prev: string;
      next: string;
    };
  };
};

export const getTodos = (page: number, limit: number, categoryId?: number) => {
  const categoryQuery = categoryId ? `&categoryId=${categoryId}` : "";
  return fetchWithAuth<TodosResponse>(
    "GET",
    `todos?page=${page}&limit=${limit}${categoryQuery}`
  );
};

export const getCompanyTodos = (
  page: number,
  limit: number,
  companyId?: number
) => {
  const companyQuery = companyId ? `&companyId=${companyId}` : "";
  return fetchWithAuth<TodosResponse>(
    "GET",
    `todos/companys-todos?page=${page}&limit=${limit}${companyQuery}`
  );
};

export const addTodo = (data: {
  title: string;
  content: string;
  categoryId: number;
  date: string;
}) => fetchWithAuth<Todo>("POST", "todos", data);

export const updateTodo = (
  id: number,
  data: { title: string; content: string; categoryId: number; date: string }
) => fetchWithAuth<Todo>("PUT", `todos/${id}`, data);

export const deleteTodo = (id: number) =>
  fetchWithAuth("DELETE", `todos/${id}`);
