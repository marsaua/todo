import { redirect } from "next/navigation";

export async function register(formData: FormData) {
  const userData = {
    name: formData.get("name"),
    surname: formData.get("surname"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const res = await fetch("http://localhost:4000/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(userData),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Registration failed");
  }

  // redirect("/home");
}
