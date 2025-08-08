// "use client"

// import { useRouter } from "next/navigation";

// export async function login(formData: FormData) {
//   const email = formData.get("email");
//   const password = formData.get("password");

//   if (typeof email !== "string" || typeof password !== "string") {
//     throw new Error("Invalid form data");
//   }

//   const res = await fetch("http://localhost:4000/auth/login", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     credentials: "include",
//     body: JSON.stringify({ email, password }),
//   });

//   if (!res.ok) {
//     const data = await res.json();
//     throw new Error(data.message || "Login failed");
//   }

//   const router = useRouter();
//   router.push("/home");
// }
