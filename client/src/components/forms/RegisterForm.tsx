"use client";
import { useState } from "react";
import { FormControl } from "@mui/material";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useNotification } from "@/context/NotificationContext";

const register = async (email: string, password: string) => {
  const response = await fetch("http://localhost:4000/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Register failed");
  }

  return data;
};

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { showError } = useNotification();

  const mutation = useMutation({
    mutationFn: () => register(email, password),
    onSuccess: (data: any) => {
      console.log("Register successful:", data);
      // TODO: Save token / redirect
    },
    onError: (error: any) => {
      showError(error.message || "Something went wrong");
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate();
  };

  return (
    <FormControl
      onSubmit={handleSubmit}
      component="form"
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
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit">Register</Button>
    </FormControl>
  );
}
