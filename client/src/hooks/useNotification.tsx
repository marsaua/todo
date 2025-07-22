import { useState } from "react";
import { Alert, Snackbar } from "@mui/material";
export function useNotification() {
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<
    "info" | "success" | "warning" | "error"
  >("info");
  const [open, setOpen] = useState(false);

  const showSuccess = (message: string) => {
    setMessage(message);
    setSeverity("success");
    setOpen(true);
  };

  const showError = (message: string) => {
    setMessage(message);
    setSeverity("error");
    setOpen(true);
  };

  const showWarning = (message: string) => {
    setMessage(message);
    setSeverity("warning");
    setOpen(true);
  };

  const showInfo = (message: string) => {
    setMessage(message);
    setSeverity("info");
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
  };
  const Notification = () => {
    return (
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={close}
        message={message}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={close} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    );
  };
  return { showSuccess, showError, showWarning, showInfo, close, Notification };
}
