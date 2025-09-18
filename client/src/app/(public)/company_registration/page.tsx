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
          gridTemplateColumns: "1fr 1fr",
          py: 4,
          alignItems: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Box component="img" src="company.png" sx={{ width: "100%" }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
          }}
        >
          <Typography variant="h1">Registrate your company</Typography>
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
