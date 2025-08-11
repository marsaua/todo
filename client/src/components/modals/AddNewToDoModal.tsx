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
  Box,
  TextareaAutosize,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNotification } from "@/context/NotificationContext";
import { useQueryClient } from "@tanstack/react-query";
import { fetchWithAuth } from "@/helpers/fetchWithAuth";

type Category = {
  id: number;
  title: string;
  color: string;
};

export default function AddNewToDoModal({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) {
  const [categoryId, setCategoryId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const { showError } = useNotification();
  const queryClient = useQueryClient();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await fetchWithAuth("POST", "todos", {
        title,
        content,
        categoryId: Number(categoryId),
      });
      handleClose();
      setTitle("");
      setContent("");
      setCategoryId("");
      setCategories([]);
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    } catch (error: any) {
      showError(error.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetchWithAuth<{ data: Category[] }>(
          "GET",
          "categories"
        );
        setCategories(res.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>Add New To Do</DialogTitle>
      <DialogContent sx={{ paddingBottom: 0 }}>
        <DialogContentText>
          To add new To Do, please enter the title here.
        </DialogContentText>
        <Box component="form" onSubmit={handleSubmit}>
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
          <FormControl sx={{ marginTop: "16px", width: "100%" }}>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              required
              labelId="category-label"
              id="category-select"
              value={categoryId}
              name="category"
              label="Category"
              onChange={(e) => setCategoryId(e.target.value)}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add To Do</Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
