import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Button,
} from "@mui/material";
import { useNotification } from "@/context/NotificationContext";
import { fetchWithAuth } from "@/helpers/fetchWithAuth";

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
  const handleSubmit = async (id: number) => {
    try {
      const res: any = await fetchWithAuth("DELETE", `categories/${id}`);

      if (!res.ok) {
        showError(res.message || "Failed to delete category");
      } else {
        showSuccess("Category deleted successfully. Refresh the page please");
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
