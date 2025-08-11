"use server";
import { fetchWithAuth } from "@/helpers/fetchWithAuth";

export const fetchTodos = async (page: number = 1, limit: number = 10) => {
  const res = await fetch(`/todos?page=${page}&limit=${limit}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};
export const createTodo = async (todo: {
  title: string;
  content: string;
  categoryId: string;
}) => {
  try {
    const data = await fetchWithAuth("POST", "/todos", todo);
    return data;
  } catch (error) {
    console.error("❌ Error creating todo:", error);
    throw new Error("Failed to create todo");
  }
};
