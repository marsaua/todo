import RegisterForm from "@/components/forms/RegisterForm";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import HomeButton from "@/components/buttons/HomeButton";
import GoogleAuthButton from "@/components/buttons/GoogleAuthButton";

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
      <HomeButton />
      <Typography variant="h1">Registration</Typography>
      <RegisterForm />
      <GoogleAuthButton />
      <Typography variant="body1" color="initial">
        Already have an account?{" "}
        <Link href="/authorization" style={{ textDecoration: "none" }}>
          Login
        </Link>
      </Typography>
    </Box>
  );
}
