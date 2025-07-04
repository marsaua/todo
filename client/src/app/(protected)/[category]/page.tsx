import TodoList from "@/components/ToDoList";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  return <TodoList category={category} />;
}
