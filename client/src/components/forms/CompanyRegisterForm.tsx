"use client";

import { Box, TextField, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useNotification } from "@/context/NotificationContext";
import { useCreateCompanyMutation } from "@/entities/company/query";
import InputFileUpload from "../inputs/InputFileUpload";

export default function CreateCompanyForm() {
  const router = useRouter();
  const { showSuccess, showError } = useNotification();

  const createCompanyMutation = useCreateCompanyMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const companyName = formData.get("companyName");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    const description = formData.get("description");
    const companyLogo = formData.get("companyLogo");

    createCompanyMutation.mutate(
      {
        companyName: companyName as string,
        email: email as string,
        password: password as string,
        confirmPassword: confirmPassword as string,
        description: description as string,
        companyLogo: companyLogo as string,
      },
      {
        onSuccess: () => {
          showSuccess("Company created successfully");
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
        Create Company
      </Typography>

      <TextField label="Email" name="email" type="email" required fullWidth />

      <TextField
        label="Company name"
        name="companyName"
        type="text"
        required
        fullWidth
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        required
        fullWidth
      />
      <TextField
        label="Confirm password"
        name="confirmPassword"
        type="password"
        required
        fullWidth
      />
      <TextField
        label="Description"
        name="description"
        type="text"
        multiline
        minRows={3}
        maxRows={12}
        fullWidth
      />
      <InputFileUpload />

      <Box>
        <Button type="submit" variant="contained">
          Create a company
        </Button>
      </Box>
    </Box>
  );
}
