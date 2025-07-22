import { Box } from "@mui/material";
import ToDoItem from "./ToDoItem";
import AddTodoItem from "./AddTodoItem";

export default async function ToDoList({ category }: { category?: string }) {
  const categories = await fetch("http://localhost:4000/categories").then(
    (res) => res.json()
  );
  const fetchTodos = async () => {
    const response = await fetch("http://localhost:4000/todos");
    const data = await response.json();
    return data;
  };
  const data = await fetchTodos();
  const filteredData = category
    ? data.filter((card: any) => card.category.title.toLowerCase() === category)
    : data;
  const sortedData = filteredData.sort(
    (a: any, b: any) => a.createdAt - b.createdAt
  );
  console.log(sortedData);
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: 4,
      }}
    >
      {sortedData.map((card: any) => (
        <ToDoItem key={card.id} card={card} categories={categories} />
      ))}
      <AddTodoItem />
    </Box>
  );
}
