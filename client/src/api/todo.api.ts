export const fetchTodos = async () => {
  const res = await fetch("http://localhost:4000/todos");
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};
