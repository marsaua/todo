"use client";
import { Button } from "@mui/material";
import UpdateTodoModal from "../modals/UpdateTodoModal";
import { useState } from "react";

export default function UpdateTodoButton({
  card,
  categories,
}: {
  card: any;
  categories: any;
}) {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Update
      </Button>
      <UpdateTodoModal
        open={open}
        handleClose={handleClose}
        card={card}
        categories={categories}
      />
    </>
  );
}
