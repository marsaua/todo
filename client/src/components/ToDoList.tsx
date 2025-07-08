import { Box } from "@mui/material";
import ToDoItem from "./ToDoItem";
import AddTodoItem from "./AddTodoItem";

const categories = [
  { id: 1, title: "personal", color: "#FFCCCD" },
  { id: 2, title: "work", color: "#AFDDD5" },
];

export default async function ToDoList({ category }: { category?: string }) {
  const fetchTodos = async () => {
    const response = await fetch("http://localhost:4000/todos");
    const data = await response.json();
    return data;
  };
  const data = await fetchTodos();
  console.log(data);
  const filteredData = category
    ? data.filter((card: any) => card.category.toLowerCase() === category)
    : data;
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: 4,
      }}
    >
      {filteredData.map((card: any) => (
        <ToDoItem key={card.id} card={card} categories={categories} />
      ))}
      <AddTodoItem />
    </Box>
  );
}
