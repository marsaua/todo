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
import { fetchWithAuth } from "@/helpers/fetchWithAuth";

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
  const { showError } = useNotification();
  const handleDelete = async () => {
    try {
      const res = await fetchWithAuth("DELETE", `todos/${card.id}`);
      if (!res) {
        const data: any = await res;
        throw new Error(data.message || "Failed to delete todo");
      }
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      handleClose();
    } catch (error: any) {
      showError(error.message || "Something went wrong");
    }
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
