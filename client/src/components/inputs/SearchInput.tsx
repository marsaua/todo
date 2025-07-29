"use client";
import { TextField } from "@mui/material";
import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import debounce from "lodash.debounce";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  const updateQuery = useMemo(() => {
    return debounce((value: string) => {
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set("q", value);
      } else {
        params.delete("q");
      }
      router.push(`/home?${params.toString()}`);
    }, 500);
  }, [router, searchParams]);

  useEffect(() => {
    updateQuery(query);
    return () => {
      updateQuery.cancel();
    };
  }, [query, updateQuery]);

  return (
    <TextField
      type="text"
      placeholder="Search"
      variant="outlined"
      fullWidth
      size="small"
      sx={{ mb: 2 }}
      label="Search"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
