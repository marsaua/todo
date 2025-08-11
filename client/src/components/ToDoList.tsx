"use client";
import { Box } from "@mui/material";
import ToDoItem from "./ToDoItem";
import AddTodoItem from "./AddTodoItem";
import Pagination from "./Pagination"; // ← окремий компонент пагінації, якщо є
import { fetchWithAuth } from "@/helpers/fetchWithAuth";
import { useState } from "react";
import { useEffect } from "react";

export default function ToDoList({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) {
  const [categories, setCategories] = useState<any>([]);
  const [todos, setTodos] = useState<any>([]);
  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchWithAuth("GET", "categories");
        setCategories(data);
      } catch (err) {
        console.error("Unauthorized, redirecting to /authorization", err);
      }
    };

    load();
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchWithAuth(
          "GET",
          `todos?page=${page}&limit=${limit}`
        );
        setTodos(data);
      } catch (err) {
        console.error("Unauthorized, redirecting to /authorization", err);
      }
    };

    load();
  }, []);

  console.log(todos);

  return (
    <Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: 4,
        }}
      >
        {todos?.data &&
          todos.data.data.map((card: any) => (
            <ToDoItem key={card.id} card={card} categories={categories.data} />
          ))}
        <AddTodoItem />
      </Box>
      <Pagination
        page={page}
        limit={limit}
        totalPages={todos?.meta?.totalPages}
      />
    </Box>
  );
}
