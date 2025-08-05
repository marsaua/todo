"use client";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { register } from "@/api/registration.api";
import { Box } from "@mui/material";

export default function RegisterForm() {
  return (
    <Box
      component="form"
      action={register}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "300px",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        marginTop: "20px",
      }}
    >
      <TextField
        label="Name"
        name="name"
        type="text"
        placeholder="Name"
        required
      />
      <TextField
        label="Surname"
        name="surname"
        type="text"
        placeholder="Surname"
        required
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        placeholder="Email"
        required
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        placeholder="Password"
        required
      />
      <Button type="submit">Register</Button>
    </Box>
  );
}
