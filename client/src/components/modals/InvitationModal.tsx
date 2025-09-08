"use client";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  TextField,
} from "@mui/material";
import { Button } from "@mui/material";
import { useState } from "react";
import { invitationApi } from "@/entities/invitation/api";
import { useNotification } from "@/context/NotificationContext";

export default function InvitationModal({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) {
  const [email, setEmail] = useState("");
  const { showSuccess, showError } = useNotification();

  const handleSend = async () => {
    try {
      await invitationApi.createInvitation(email);
      handleClose();
      showSuccess("Invitation sent successfully");
    } catch (error) {
      showError((error as Error).message || "Something went wrong");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>Invitation</DialogTitle>
      <DialogContent sx={{ paddingBottom: 0 }}>
        <DialogContentText>Please, enter guest email</DialogContentText>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </DialogContent>
      <DialogActions sx={{ padding: 2 }}>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSend}>
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
}
