import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Button,
} from "@mui/material";
import { useNotification } from "@/context/NotificationContext";

export default function DeleteCategoryModal({
  open,
  onClose,
  id,
}: {
  open: boolean;
  onClose: () => void;
  id: number;
}) {
  const { showSuccess, showError } = useNotification();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const handleSubmit = async (id: number) => {
    try {
      const res = await fetch(`http://${API_URL}/categories/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        showError(data.message || "Failed to delete category");
      } else {
        onClose();
      }
    } catch (error: any) {
      showError(error.message || "Something went wrong");
    }
  };

  return (
    <Dialog open={open} onClose={() => onClose()} keepMounted>
      <DialogTitle>Delete Category</DialogTitle>
      <DialogContent sx={{ paddingBottom: 0 }}>
        <DialogContentText>
          Are you sure you want to delete this category?
        </DialogContentText>
        <DialogActions>
          <Button onClick={() => onClose()}>Cancel</Button>
          <Button onClick={() => handleSubmit(id)}>Delete</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
