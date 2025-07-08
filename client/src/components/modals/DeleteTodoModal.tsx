"use client";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from "@mui/material";
import { Button } from "@mui/material";
import getQueryClient from "@/lib/getQueryClient";
export default function DeleteTodoModal({
  open,
  handleClose,
  card,
}: {
  open: boolean;
  handleClose: () => void;
  card: any;
}) {
  const queryClient = getQueryClient();
  const handleDelete = () => {
    fetch(`http://localhost:4000/todos/${card.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    queryClient.invalidateQueries({ queryKey: ["todos"] });
    handleClose();
  };
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>Delete To Do</DialogTitle>
      <DialogContent sx={{ paddingBottom: 0 }}>
        <DialogContentText>
          Are you sure you want to delete this To Do?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ padding: 2 }}>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleDelete}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
