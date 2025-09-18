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
          gridTemplateColumns: "1fr 1fr",
          py: 4,
          alignItems: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Box
          component="img"
          src="hero.png"
          loading="lazy"
          alt="hero"
          sx={{ width: "100%", height: "auto" }}
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
