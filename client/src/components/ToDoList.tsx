import { Box } from "@mui/material";
import ToDoItem from "./ToDoItem";
import AddTodoItem from "./AddTodoItem";

const data = [
  {
    id: 1,
    title: "Title 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    category: "Personal",
  },
  {
    id: 2,
    title: "Title 2",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    category: "Work",
  },
  {
    id: 3,
    title: "Title 3",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    category: "Work",
  },
];
const categories = [
  { id: 1, title: "personal", color: "#FFCCCD" },
  { id: 2, title: "work", color: "#AFDDD5" },
];
export default function ToDoList({ category }: { category?: string }) {
  const filteredData = category
    ? data.filter((card) => card.category.toLowerCase() === category)
    : data;
  return (
    <Box sx={{ display: "flex", width: "100%", flexWrap: "wrap", gap: 4 }}>
      {filteredData.map((card) => (
        <ToDoItem key={card.id} card={card} categories={categories} />
      ))}
      <AddTodoItem />
    </Box>
  );
}
