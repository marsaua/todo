"use client";

import { useState } from "react";
import { FormControl, TextField, Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useNotification } from "@/context/NotificationContext";

const login = async (email: string, password: string) => {
  const response = await fetch("http://localhost:4000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};

export default function AuthorizationForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { showError } = useNotification();

  const mutation = useMutation({
    mutationFn: () => login(email, password),
    onSuccess: (data) => {
      console.log("Login successful:", data);
      // TODO: Save token / redirect
    },
    onError: (error: any) => {
      showError(error.message || "Something went wrong");
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate(); // запуск мутації
  };

  return (
    <FormControl
      component="form"
      onSubmit={handleSubmit}
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
        required
      />
      <TextField
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" disabled={mutation.isPending}>
        {mutation.isPending ? "Loading..." : "Login"}
      </Button>
    </FormControl>
  );
}
