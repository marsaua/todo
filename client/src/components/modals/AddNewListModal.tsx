import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useState } from "react";
import getRandomColor from "@/halpers/randomColor";

export default function AddNewListModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const handleClose = () => {
    onClose();
  };
  const [title, setTitle] = useState("");
  const color = getRandomColor();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    fetch("http://localhost:4000/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, color }),
    });
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} keepMounted>
      <DialogTitle>Add New List</DialogTitle>
      <DialogContent sx={{ paddingBottom: 0 }}>
        <DialogContentText>
          To add new list, please enter the title here.
        </DialogContentText>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add List</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
