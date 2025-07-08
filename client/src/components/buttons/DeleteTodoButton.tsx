"use client";
import { Button } from "@mui/material";
import { useState } from "react";
import DeleteTodoModal from "../modals/DeleteTodoModal";
export default function DeleteTodoButton({ card }: { card: any }) {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Delete
      </Button>
      <DeleteTodoModal open={open} handleClose={handleClose} card={card} />
    </>
  );
}
