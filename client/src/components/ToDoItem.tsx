import { Box, Card, CardContent, Typography } from "@mui/material";
import UpdateTodoButton from "./buttons/UpdateTodoButoon";
import DeleteTodoButton from "./buttons/DeleteTodoButton";

export default function ToDoItem({
  card,
  categories,
}: {
  card: any;
  categories: any;
}) {
  return (
    <Card
      key={card.id}
      sx={{
        maxWidth: "400px",
        minWidth: "250px",
        backgroundColor: categories.find(
          (category: any) =>
            category.title === card.category.title.toLowerCase()
        )?.color,
      }}
    >
      <CardContent>
        <Typography variant="h4">{card.title}</Typography>
        <Typography variant="body1">{card.content}</Typography>
      </CardContent>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          marginBottom: 2,
        }}
      >
        <UpdateTodoButton card={card} categories={categories} />
        <DeleteTodoButton card={card} />
      </Box>
    </Card>
  );
}
