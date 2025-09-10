import { Box, Card, CardContent, Typography } from "@mui/material";
import UpdateTodoButton from "./buttons/UpdateTodoButoon";
import DeleteTodoButton from "./buttons/DeleteTodoButton";

export default function ToDoItem({
  card,
  categories,
  currentUser,
}: {
  card: any;
  categories: any;
  currentUser: any;
}) {
  console.log(card);
  console.log(currentUser);
  return (
    <Card
      key={card.id}
      sx={{
        maxWidth: "400px",
        minHeight: "180px",
        minWidth: "250px",
        backgroundColor: card?.category?.color,
      }}
    >
      <CardContent>
        <Typography variant="h4">{card.title}</Typography>
        <Typography variant="body1">{card.content}</Typography>
        <Typography variant="body1">{card.category?.title}</Typography>
      </CardContent>
      {(card.authorCompanyId === currentUser?.data?.id ||
        card.authorUserId === currentUser?.data?.id) && (
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
      )}
    </Card>
  );
}
