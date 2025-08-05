import { Box } from "@mui/material";
import ToDoItem from "./ToDoItem";
import AddTodoItem from "./AddTodoItem";
import Pagination from "./Pagination"; // ← окремий компонент пагінації, якщо є
import { fetchWithAuth } from "@/helpers/fetchWithAuth";

export default async function ToDoList({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) {
  const categories = await fetchWithAuth(
    "GET",
    "http://localhost:4000/categories"
  );
  console.log(categories);

  const todos = await fetchWithAuth(
    "GET",
    `http://localhost:4000/todos?page=${page}&limit=${limit}`
  );
  console.log(todos.data);
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
          todos.data.data.map((card: any) => (
            <ToDoItem key={card.id} card={card} categories={categories.data} />
          ))}
        <AddTodoItem />
      </Box>
      <Pagination
        page={page}
        limit={limit}
        totalPages={todos.meta?.totalPages}
      />
    </Box>
  );
}
