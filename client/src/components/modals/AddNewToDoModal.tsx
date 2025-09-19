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
import { useState } from "react";
import { useNotification } from "@/context/NotificationContext";
import { useQueryClient } from "@tanstack/react-query";
import { useAddTodoMutation } from "@/entities/todo/queries";
import { useCategoriesQuery } from "@/entities/category/queries";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

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
  const { showSuccess, showError } = useNotification();
  const [date, setDate] = useState<Dayjs>(dayjs(Date.now()));

  const queryClient = useQueryClient();

  const addTodoMutation = useAddTodoMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTodoMutation.mutate(
      {
        title,
        content,
        categoryId: Number(categoryId),
        date: date.toISOString(),
      },
      {
        onSuccess: () => {
          showSuccess("Todo added successfully");
          handleClose();
          setTitle("");
          setContent("");
          setCategoryId("");
          setDate(dayjs(Date.now()));
          queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
        onError: (error) => {
          showError(error.message);
        },
      }
    );
  };

  const { data: categories, isLoading, isError } = useCategoriesQuery();
  if (isLoading) return <>Loading…</>;
  if (isError || !categories) return <></>;

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
              {categories?.data.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.title}
                </MenuItem>
              ))}
            </Select>
            <DatePicker
              defaultValue={dayjs(Date.now())}
              label="Date"
              value={date}
              onChange={(newDate) => setDate(newDate as Dayjs)}
            />
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
