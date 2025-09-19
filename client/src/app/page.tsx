import { Box, Button, Typography, Container, Stack } from "@mui/material";

export default function PublicLayout() {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "background.default",
        minHeight: "100vh",
        position: "relative",
      }}
    >
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
          src="hero.png"
          loading="lazy"
          alt="hero"
          sx={{
            width: "100%",
            height: "auto",
            maxWidth: "500px",
          }}
        />
        <Box
          sx={{
            textAlign: "center",
            alignSelf: "center",
            p: 2,
            backgroundColor: "inherit",
          }}
        >
          <Typography variant="h1" gutterBottom>
            Check!
          </Typography>
          <Typography variant="h4" gutterBottom sx={{ paddingBottom: 8 }}>
            Make your to-do list easily
          </Typography>
          <Stack
            direction="column"
            spacing={4}
            sx={{ mt: 4 }}
            maxWidth={400}
            mx="auto"
          >
            <Button
              variant="contained"
              size="large"
              fullWidth
              href="/registration"
            >
              Sign Up
            </Button>
            <Button
              variant="outlined"
              size="large"
              fullWidth
              href="/authorization"
            >
              Login
            </Button>
            <Button
              variant="contained"
              size="large"
              fullWidth
              href="/company_registration"
            >
              Register Company
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
