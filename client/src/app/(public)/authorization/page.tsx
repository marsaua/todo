import AuthorizationForm from "@/components/forms/AuthorizationForm";
import { Box, Typography } from "@mui/material";
import GoogleAuthButton from "@/components/buttons/GoogleAuthButton";

export default function AuthorizationPage() {
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
      <Typography variant="h1"> Authorization </Typography>
      <AuthorizationForm />
      <GoogleAuthButton />
    </Box>
  );
}
