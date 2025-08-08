import ToDoList from "@/components/ToDoList";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; limit?: string }>;
}) {
  const params = await searchParams;
  const pageInt = Number(params.page ?? "1");
  const limitInt = Number(params.limit ?? "5");

  return <ToDoList page={pageInt} limit={limitInt} />;
}
