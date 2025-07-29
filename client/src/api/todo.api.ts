export const fetchTodos = async (page: number = 1, limit: number = 10) => {
  const res = await fetch(
    `http://localhost:4000/todos?page=${page}&limit=${limit}`
  );
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};
export const createTodo = async (todo: {
  title: string;
  content: string;
  categoryId: string;
}) => {
  const res = await fetch("http://localhost:4000/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  if (!res.ok) throw new Error("Failed to create todo");
  return res.json();
};
