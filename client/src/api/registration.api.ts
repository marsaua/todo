import { redirect } from "next/navigation";

export async function register(formData: FormData) {
  const userData = {
    name: formData.get("name"),
    surname: formData.get("surname"),
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`http://${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(userData),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Registration failed");
  }

  redirect("/home");
}
