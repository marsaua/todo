import AuthorizationForm from "@/components/forms/AuthorizationForm";
import { Box, Typography } from "@mui/material";
import GoogleAuthButton from "@/components/buttons/GoogleAuthButton";
import HomeButton from "@/components/buttons/HomeButton";
import Link from "next/link";

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
      <HomeButton />
      <Typography variant="h1"> Authorization </Typography>
      <AuthorizationForm />
      <GoogleAuthButton />
      <Typography variant="body1" color="initial">
        Don&apos;t have an account?{" "}
        <Link href="/registration" style={{ textDecoration: "none" }}>
          Register
        </Link>
      </Typography>
    </Box>
  );
}
