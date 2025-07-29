import { Box } from "@mui/material";
import ToDoItem from "./ToDoItem";
import AddTodoItem from "./AddTodoItem";
import Pagination from "./Pagination"; // ← окремий компонент пагінації, якщо є

export default async function ToDoList({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) {
  const categories = await fetch(`http://localhost:4000/categories`).then(
    (res) => res.json()
  );

  const todosRes = await fetch(
    `http://localhost:4000/todos?page=${page}&limit=${limit}`,
    { cache: "no-store" } // або "force-cache" — залежить від потреб
  );
  const todosData = await todosRes.json();
  const todos = todosData.data;

  return (
    <Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: 4,
        }}
      >
        {todos &&
          todos.map((card: any) => (
            <ToDoItem key={card.id} card={card} categories={categories} />
          ))}
        <AddTodoItem />
      </Box>
      <Pagination
        page={page}
        limit={limit}
        totalPages={todosData.meta.totalPages}
      />
    </Box>
  );
}
