import { Box, Container, Typography } from "@mui/material";
import Link from "next/link";
import HomeButton from "@/components/buttons/HomeButton";
import CompanyRegisterForm from "@/components/forms/CompanyRegisterForm";

export default function CompanyRegistrationPage() {
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
          src="company.png"
          sx={{ width: "100%", maxWidth: "500px" }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
          }}
        >
          <Typography variant="h1" sx={{ textAlign: "center" }}>
            Registrate your company
          </Typography>
          <CompanyRegisterForm />
          <Typography variant="body1" color="initial">
            Already have an account?{" "}
            <Link href="/authorization" style={{ textDecoration: "none" }}>
              Login
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
