"use client";

import { useSearchParams } from "next/navigation";
import ToDoList from "./ToDoList";

export default function ClientToDoList() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "6", 10);

  return <ToDoList page={page} limit={limit} />;
}
