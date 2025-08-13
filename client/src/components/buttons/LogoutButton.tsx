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
    <Box sx={{ ml: "26px" }}>
      <Button variant="outlined" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
}
