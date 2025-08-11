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
    const refreshRes = await fetch(`${API_URL}/auth/refresh-tokens`, {
      method: "POST",
      credentials: "include",
    });

    if (!refreshRes.ok) {
      throw new Error("Unauthorized");
    }

    res = await makeRequest();
  }

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  return res.json();
}
