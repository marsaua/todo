"use client";

import { Box, TextField, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function AuthorizationForm() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    if (typeof email !== "string" || typeof password !== "string") {
      alert("Invalid form data");
      return;
    }

    const res = await fetch(`http://${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      alert(data.message || "Login failed");
      return;
    }

    router.push("/home");
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
