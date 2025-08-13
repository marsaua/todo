"use client";

export async function fetchWithAuth<T>(
  method: string,
  url: string,
  body?: any
): Promise<T> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const makeRequest = async (): Promise<Response> => {
    return await fetch(`${API_URL}/${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      ...(body && { body: JSON.stringify(body) }),
    });
  };

  let res = await makeRequest();

  if (res.status === 401) {
    try {
      await fetch(`${API_URL}/auth/refresh-tokens`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Refresh failed:", error);
    }

    res = await makeRequest();
  }

  if (!res.ok) {
    window.location.replace("/authorization");
    throw new Error("Unauthorized");
  }

  return res.json();
}
