import { Card, CardContent, Typography } from "@mui/material";

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
        maxWidth: "350px",
        backgroundColor: categories.find(
          (category: any) => category.title === card.category.toLowerCase()
        )?.color,
      }}
    >
      <CardContent>
        <Typography variant="h4">{card.title}</Typography>
        <Typography variant="body1">{card.description}</Typography>
      </CardContent>
    </Card>
  );
}
