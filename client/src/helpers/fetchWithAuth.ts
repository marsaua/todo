"use client";

export async function fetchWithAuth<T>(
  method: string,
  url: string,
  body?: any
): Promise<T> {
  const makeRequest = async (): Promise<Response> => {
    return await fetch(url, {
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
    const refreshRes = await fetch(
      "http://localhost:4000/auth/refresh-tokens",
      {
        method: "POST",
        credentials: "include",
      }
    );

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
