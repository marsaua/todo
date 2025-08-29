import { Box, Typography } from "@mui/material";
import Link from "next/link";
import HomeButton from "@/components/buttons/HomeButton";
import CompanyRegisterForm from "@/components/forms/CompanyRegisterForm";

export default function CompanyRegistrationPage() {
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
      <Typography variant="h1">Registrate your company</Typography>
      <CompanyRegisterForm />
      <Typography variant="body1" color="initial">
        Already have an account?{" "}
        <Link href="/authorization" style={{ textDecoration: "none" }}>
          Login
        </Link>
      </Typography>
    </Box>
  );
}
