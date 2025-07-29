import ToDoList from "@/components/ToDoList";

export default function HomePage({ searchParams }: { searchParams: any }) {
  const page = parseInt(searchParams.page) || 1;
  const limit = parseInt(searchParams.limit) || 5;

  return <ToDoList page={page} limit={limit} />;
}
