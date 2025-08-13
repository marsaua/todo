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
import { useNotification } from "@/context/NotificationContext";
import { useDeleteTodoMutation } from "@/entities/todo/queries";

export default function DeleteTodoModal({
  open,
  handleClose,
  card,
}: {
  open: boolean;
  handleClose: () => void;
  card: {
    id: number;
    title: string;
    content: string;
    categoryId: number;
  };
}) {
  const queryClient = getQueryClient();
  const { showSuccess, showError } = useNotification();
  const deleteTodoMutation = useDeleteTodoMutation();

  const handleDelete = async () => {
    deleteTodoMutation.mutate(card.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["todos", "list"] });
        handleClose();
        showSuccess("Todo deleted successfully");
      },
      onError: (error) => {
        showError(error.message || "Something went wrong");
      },
    });
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
