import RegisterForm from "@/components/forms/RegisterForm";
import { Box, Typography } from "@mui/material";

export default function RegistrationPage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
        marginTop: "60px",
      }}
    >
      <Typography variant="h1">Registration</Typography>
      <RegisterForm />
    </Box>
  );
}
