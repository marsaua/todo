import RegisterForm from "@/components/forms/RegisterForm";
import { Box, Typography, Container } from "@mui/material";
import Link from "next/link";
import HomeButton from "@/components/buttons/HomeButton";
import GoogleAuthButton from "@/components/buttons/GoogleAuthButton";

export default function RegistrationPage() {
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
          gridTemplateColumns: "1fr 1fr",
          py: 4,
          alignItems: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Box>
          <Typography variant="h2" sx={{ textAlign: "center" }}>
            Lets create your account shall we?{" "}
          </Typography>
          <RegisterForm />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              alignItems: "center",
            }}
          >
            <GoogleAuthButton />
            <Typography variant="body1" color="initial">
              Already have an account?{" "}
              <Link href="/authorization" style={{ textDecoration: "none" }}>
                Login
              </Link>
            </Typography>
          </Box>
        </Box>
        <Box
          component="img"
          src="reg.png"
          sx={{ width: "100%", height: "auto" }}
        />
      </Container>
    </Box>
  );
}
