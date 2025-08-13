export const fetchPublic = async <T>(
  method: string,
  url: string,
  body?: any
): Promise<T> => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${API_URL}/${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    ...(body && { body: JSON.stringify(body) }),
  });
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};
