"use client";
import { Button, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { fetchWithAuth } from "@/helpers/fetchWithAuth";

export default function LogoutButton() {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const response: Response = await fetchWithAuth("POST", `auth/logout`);
      if (!response.ok) {
        throw new Error("Failed to logout");
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    router.push("/authorization");
  };
  return (
    <Box sx={{ ml: "26px" }}>
      <Button variant="outlined" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
}
