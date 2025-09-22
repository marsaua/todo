"use client";
import { Button, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useLogoutUserMutation } from "@/entities/user/queries";
import { useNotification } from "@/context/NotificationContext";

export default function LogoutButton() {
  const router = useRouter();
  const logoutMutation = useLogoutUserMutation();
  const { showSuccess, showError } = useNotification();
  const handleLogout = async () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        showSuccess("User logged out successfully");
        router.push("/authorization");
      },
      onError: (error) => {
        showError(error.message);
      },
    });
  };
  return (
    <Box sx={{ px: "16px", py: "8px" }}>
      <Button variant="outlined" onClick={handleLogout} sx={{ width: "100%" }}>
        Logout
      </Button>
    </Box>
  );
}
