/**
 * Central API client for the DERN SEED frontend.
 *
 * URL resolution:
 * - Development: relative URLs are proxied by Vite ("/api" -> http://localhost:8000).
 * - Production:  set VITE_API_BASE_URL when the backend is hosted on another
 *   origin (e.g. https://api.dernseed.com). Leave it empty when a reverse
 *   proxy serves the API under the same origin as the frontend.
 */
export const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL ?? "";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(options.headers ?? {}) },
    ...options,
  });

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new ApiError(data?.error ?? `Request failed with status ${res.status}`, res.status);
  }

  return (await res.json()) as T;
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "POST", body: body === undefined ? undefined : JSON.stringify(body) }),
  patch: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "PATCH", body: body === undefined ? undefined : JSON.stringify(body) }),
  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};

// ---- Auth endpoints ----

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

export function login(email: string, password: string) {
  return api.post<{ ok: boolean; user: AuthUser }>("/api/auth/login", { email, password });
}

export function register(name: string, email: string, password: string) {
  return api.post<{ ok: boolean; user_id: number }>("/api/auth/register", { name, email, password });
}

export function logout() {
  return api.post<{ ok: boolean }>("/api/auth/logout");
}

// ---- Testimonials ----

export interface Testimonial {
  id: number;
  name: string;
  role: string | null;
  rating: number;
  message: string;
  initials: string | null;
  created_at?: string;
}

export function fetchTestimonials() {
  return api.get<{ ok: boolean; testimonials: Testimonial[] }>("/api/testimonials");
}
