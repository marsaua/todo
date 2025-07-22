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
import { useState, useEffect } from "react";
export default function AddNewToDoModal({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) {
  const [categoryId, setCategoryId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);
  console.log("Payload:", { title, content, categoryId });

  const handleSubmit = async (): Promise<void> => {
    await fetch("http://localhost:4000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content, categoryId }),
    });
    handleClose();
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:4000/categories");
        const data = await res.json();
        setCategories(data);
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
              {categories.length > 0 &&
                categories.map((category: any) => (
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
        </form>
      </DialogContent>
    </Dialog>
  );
}
