import TodoList from "@/components/ToDoList";

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const { category } = params;
  return <TodoList category={category} />;
}
