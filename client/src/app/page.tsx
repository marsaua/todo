import { Box, Button, Typography, Container, Stack } from "@mui/material";

export default function PublicLayout() {
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box
        sx={{
          textAlign: "center",
          p: 2,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <Typography variant="h1" gutterBottom>
          To Do List App
        </Typography>
        <Typography variant="h4" gutterBottom>
          To make your todo list please register or login
        </Typography>
        <Stack direction="column" spacing={2} sx={{ mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            fullWidth
            href="/registration"
            sx={{
              bgcolor: "primary.main",
              "&:hover": {
                bgcolor: "primary.dark",
              },
            }}
          >
            Register Account
          </Button>
          <Button
            variant="contained"
            size="large"
            fullWidth
            href="/authorization"
            sx={{
              bgcolor: "success.light",
              "&:hover": {
                bgcolor: "success.dark",
              },
            }}
          >
            Login
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
