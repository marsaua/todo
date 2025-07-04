"use client";
import { Card, CardContent } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useState } from "react";
import AddNewToDoModal from "./modals/AddNewToDoModal";

export default function AddTodoItem() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card
        sx={{
          maxWidth: "350px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#DFE6E6",
          cursor: "pointer",
        }}
        onClick={() => {
          handleClickOpen();
        }}
      >
        <CardContent>
          <AddOutlinedIcon fontSize="large" />
        </CardContent>
      </Card>
      <AddNewToDoModal open={open} handleClose={handleClose} />
    </>
  );
}
