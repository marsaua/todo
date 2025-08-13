"use client";

import { Box, TextField, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useLoginUserMutation } from "@/entities/user/queries";
import { useNotification } from "@/context/NotificationContext";

export default function AuthorizationForm() {
  const router = useRouter();
  const loginMutation = useLoginUserMutation();
  const { showSuccess, showError } = useNotification();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    loginMutation.mutate(
      { email: email as string, password: password as string },
      {
        onSuccess: () => {
          showSuccess("User logged in successfully");
          router.push("/home");
        },
        onError: (error) => {
          showError(error.message);
        },
      }
    );
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "300px",
        margin: "2rem auto",
        padding: "1.5rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <Typography variant="h6" textAlign="center">
        Login
      </Typography>

      <TextField label="Email" name="email" type="email" required fullWidth />

      <TextField
        label="Password"
        name="password"
        type="password"
        required
        fullWidth
      />

      <Button type="submit" variant="contained">
        Login
      </Button>
    </Box>
  );
}
