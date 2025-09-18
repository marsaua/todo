"use client";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
// import { register } from "@/api/registration.api";
import { useRegisterUserMutation } from "@/entities/user/queries";
import { Box } from "@mui/material";
import { useNotification } from "@/context/NotificationContext";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const registerMutation = useRegisterUserMutation();
  const { showSuccess, showError } = useNotification();
  const router = useRouter();
  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    registerMutation.mutate(
      {
        name: formData.get("name") as string,
        surname: formData.get("surname") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      },
      {
        onSuccess: () => {
          showSuccess("User registered successfully");
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
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "300px",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        marginY: "20px",
      }}
      onSubmit={handleRegister}
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
      <Button variant="contained" type="submit">
        Register
      </Button>
    </Box>
  );
}
