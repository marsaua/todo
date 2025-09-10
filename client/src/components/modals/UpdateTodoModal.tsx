"use client";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Button,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  TextareaAutosize,
} from "@mui/material";
import { useState } from "react";
import { useNotification } from "@/context/NotificationContext";
import { useUpdateTodoMutation } from "@/entities/todo/queries";

export default function UpdateTodoModal({
  open,
  handleClose,
  card,
  categories,
}: {
  open: boolean;
  handleClose: () => void;
  card: any;
  categories: any;
}) {
  const [title, setTitle] = useState(card.title);
  const [content, setContent] = useState(card.content);
  const [categoryId, setCategoryId] = useState(card.category.id);
  const id = card.id;

  const { showSuccess, showError } = useNotification();

  const updateTodoMutation = useUpdateTodoMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateTodoMutation.mutate(
      {
        id,
        data: {
          title,
          content,
          categoryId: categoryId,
        },
      },
      {
        onSuccess: () => {
          showSuccess("Todo updated successfully");
          handleClose();
        },
        onError: (error) => {
          showError(error.message || "Something went wrong");
        },
      }
    );
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>Update To Do</DialogTitle>
      <DialogContent sx={{ paddingBottom: 0 }}>
        <DialogContentText>
          To update To Do, please enter the title here.
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
          <TextareaAutosize
            autoFocus
            required
            id="content"
            name="content"
            placeholder="Content"
            minRows={6}
            style={{ width: "100%", marginTop: "16px" }}
            aria-label="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <FormControl sx={{ width: "100%", marginTop: "16px" }}>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              required
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={categoryId}
              name="category"
              label="Category"
              onChange={(e) => setCategoryId(e.target.value)}
            >
              {categories?.data.map((item: any) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Update To Do</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
