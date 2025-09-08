"use client";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "");
const absUrl = (path: string) =>
  /^https?:\/\//i.test(path)
    ? path
    : `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;

export class ApiError<T = unknown> extends Error {
  status: number;
  details?: T;
  constructor(message: string, status: number, details?: T) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

async function parseRes<T>(res: Response): Promise<T | null> {
  const ct = res.headers.get("content-type") || "";
  if (ct.includes("application/json")) {
    try {
      return (await res.json()) as T;
    } catch {}
  }
  if (res.status === 204) return null;
  try {
    return (await res.text()) as unknown as T;
  } catch {}
  return null;
}

export async function fetchWithAuth<T = unknown>(
  method: HttpMethod,
  url: string,
  body?: unknown
): Promise<T | null> {
  const init: RequestInit = {
    method,
    credentials: "include",
    headers: {
      ...(body && !(body instanceof FormData)
        ? { "Content-Type": "application/json" }
        : {}),
    },
    body:
      body instanceof FormData
        ? body
        : body != null
        ? JSON.stringify(body)
        : undefined,
  };

  const makeReq = () => fetch(absUrl(url), init);

  let res: Response;
  try {
    res = await makeReq();
  } catch (e: unknown) {
    throw new ApiError(e instanceof Error ? e.message : "Network error", 0);
  }

  // один автопробний refresh
  if (res.status === 401) {
    try {
      const r = await fetch(absUrl("/auth/refresh-tokens"), {
        method: "POST",
        credentials: "include",
      });
      if (r.ok) res = await makeReq();
    } catch {
      /* ignore */
    }
  }

  if (res.status === 401) {
    const errBody = await parseRes<{ message?: string; error?: string }>(res);
    throw new ApiError(
      (errBody && (errBody.message || errBody.error)) || "Unauthorized",
      401,
      errBody
    );
  }

  if (!res.ok) {
    const errBody = await parseRes<{ message?: string; error?: string }>(res);
    throw new ApiError(
      (errBody && (errBody.message || errBody.error)) ||
        `HTTP ${res.status} ${res.statusText}`,
      res.status,
      errBody
    );
  }

  return parseRes<T>(res); // T | null
}
