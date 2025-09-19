import AuthorizationForm from "@/components/forms/AuthorizationForm";
import { Box, Container, Typography } from "@mui/material";
import GoogleAuthButton from "@/components/buttons/GoogleAuthButton";
import HomeButton from "@/components/buttons/HomeButton";
import Link from "next/link";

export default function AuthorizationPage() {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "background.default",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <HomeButton />
      <Container
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          alignItems: "center",
          justifyItems: "center",
          py: 4,
          position: { xs: "normal", md: "absolute" },
          top: { xs: "normal", md: "50%" },
          left: { xs: "normal", md: "50%" },
          transform: { xs: "normal", md: "translate(-50%, -50%)" },
        }}
      >
        <Box
          component="img"
          src="welcome.png"
          sx={{ width: "100%", maxWidth: "380px" }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
          }}
        >
          <Typography variant="h2"> Welcome back! </Typography>
          <AuthorizationForm />
          <GoogleAuthButton />
          <Typography variant="body1" color="initial">
            Don&apos;t have an account?{" "}
            <Link href="/registration" style={{ textDecoration: "none" }}>
              Register
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
