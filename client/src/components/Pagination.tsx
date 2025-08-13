"use client";

import { Box, Button } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  page: number;
  limit: number;
  totalPages: number;
}

export default function Pagination({
  page,
  limit,
  totalPages,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    params.set("limit", limit.toString());

    router.push(`?${params.toString()}`);
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 2,
        mt: 4,
      }}
    >
      <Button
        variant="outlined"
        disabled={page <= 1}
        onClick={() => handlePageChange(page - 1)}
      >
        Prev
      </Button>
      <span style={{ display: "flex", alignItems: "center" }}>
        Page {page} of {totalPages}
      </span>
      <Button
        variant="outlined"
        disabled={page >= totalPages}
        onClick={() => handlePageChange(page + 1)}
      >
        Next
      </Button>
    </Box>
  );
}
