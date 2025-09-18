"use client";
import { Box, Link } from "@mui/material";

export default function HomeButton() {
  return (
    <Link href="/">
      <Box
        component="img"
        src="logo.png"
        sx={{ width: "100px", margin: "20px" }}
      />
    </Link>
  );
}
