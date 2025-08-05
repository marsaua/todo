"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function fetchWithAuth<T>(
  method: string,
  url: string,
  body?: any
): Promise<T> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const makeRequest = async (token?: string) => {
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      credentials: "include",
      ...(body && { body: JSON.stringify(body) }),
    };
    return await fetch(url, options);
  };

  let res = await makeRequest(accessToken);

  if (res.status === 401) {
    const refreshRes = await fetch(
      "http://localhost:4000/auth/refresh-tokens",
      {
        method: "POST",
        credentials: "include",
      }
    );

    if (!refreshRes.ok) {
      redirect("/authorization");
      throw new Error("Unauthorized, and refresh failed");
    }

    const { accessToken: newAccessToken } = await refreshRes.json();

    res = await makeRequest(newAccessToken);
    if (!res.ok) {
      throw new Error(`Retry failed: ${res.status}`);
    }

    return await res.json();
  }

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  return await res.json();
}
