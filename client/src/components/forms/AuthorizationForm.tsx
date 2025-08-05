"use client";

import { login } from "@/api/authorization.api";
import { Box, TextField, Button, Typography } from "@mui/material";

export default function AuthorizationForm() {
  return (
    <Box
      component="form"
      action={login}
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
