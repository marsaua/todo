import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Button,
} from "@mui/material";
import { useNotification } from "@/context/NotificationContext";
import { useDeleteCategoryMutation } from "@/entities/category/queries";

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
  const deleteCategoryMutation = useDeleteCategoryMutation();
  const handleSubmit = () => {
    deleteCategoryMutation.mutate(id, {
      onSuccess: () => {
        showSuccess("Category deleted successfully");
        onClose();
      },
      onError: (error) => {
        showError(error.message);
      },
    });
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
          <Button onClick={() => handleSubmit()}>Delete</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
