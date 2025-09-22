"use client";
import { Typography } from "@mui/material";
import { useCurrentUser } from "@/entities/user/queries";
export default function Greeting() {
  const { data: currentUser } = useCurrentUser();
  const name = currentUser?.data?.user?.name
    ? currentUser?.data?.user?.name
    : "there";
  return (
    <>
      <Typography sx={{ mt: 2, fontWeight: "bold" }}>Hi, {name}</Typography>
      <Typography sx={{ mb: 6 }}>
        What&apos;s up for today? Click &quot;+&quot; to add a new task.
      </Typography>
    </>
  );
}
