"use client";
import { Box } from "@mui/material";
import ToDoItem from "./ToDoItem";
import AddTodoItem from "./AddTodoItem";
import Pagination from "./Pagination";
import { useTodosQuery } from "@/entities/todo/queries";
import { useCategoriesQuery } from "@/entities/category/queries";

export default function ToDoList({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) {
  const {
    data: categories,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useCategoriesQuery();

  const {
    data: todos,
    isLoading,
    isError,
  } = useTodosQuery({
    page,
    limit,
  });
  if (isLoading || categoriesLoading) return <p>Loading...</p>;
  if (isError || categoriesError) return <p>Error</p>;

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
            <ToDoItem key={card.id} card={card} categories={categories?.data} />
          ))}
        <AddTodoItem />
      </Box>
      <Pagination
        page={page}
        limit={limit}
        totalPages={todos?.data?.meta?.totalPages ?? 1}
      />
    </Box>
  );
}
