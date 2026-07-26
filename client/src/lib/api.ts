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

// Session token storage key.
// This is NOT a cookie - the token lives in localStorage and is sent on every
// request via the Authorization header (see `request()` below). The server
// never sets a Set-Cookie header and never reads a Cookie header for auth.
const SESSION_TOKEN_STORAGE_KEY = "dern_session_token";

// Get the session token from localStorage
export function getSessionToken(): string | null {
  return localStorage.getItem(SESSION_TOKEN_STORAGE_KEY);
}

// Store the session token in localStorage (called right after login/register)
export function setSessionToken(token: string): void {
  localStorage.setItem(SESSION_TOKEN_STORAGE_KEY, token);
}

// Remove the session token from localStorage (called on logout or when a
// request comes back 401, meaning the server-side session is gone/expired)
export function removeSessionToken(): void {
  localStorage.removeItem(SESSION_TOKEN_STORAGE_KEY);
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getSessionToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> ?? {}),
  };

  // Send the session token via the Authorization header - never as a cookie.
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
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
  return api.post<{ ok: boolean; token: string; user: AuthUser }>("/api/auth/login", { email, password });
}

export function register(name: string, email: string, password: string) {
  return api.post<{ ok: boolean; user_id: number; token: string; user: AuthUser }>("/api/auth/register", { name, email, password });
}

// Revokes the session server-side. Call this before removing the local
// token so the session can't be reused even if someone else obtains it.
export function logout() {
  return api.post<{ ok: boolean; message: string }>("/api/auth/logout");
}

export function fetchMe() {
  return api.get<{ user: AuthUser }>("/api/users/me");
}

// ---- Testimonials ----

export interface Testimonial {
  id: number;
  name: string;
  role: string | null;
  rating: number;
  message: string;
  initials: string | null;
  is_approved?: number;
  created_at?: string;
}

export function fetchTestimonials() {
  return api.get<{ ok: boolean; testimonials: Testimonial[] }>("/api/testimonials");
}

export function createTestimonial(input: { name: string; role?: string | null; rating: number; message: string; initials?: string | null }) {
  return api.post<{ ok: boolean; id: number }>("/api/testimonials", input);
}

export function updateTestimonial(id: number, fields: Partial<Testimonial>) {
  return api.patch<{ ok: boolean }>(`/api/testimonials/${id}`, fields);
}

export function deleteTestimonial(id: number) {
  return api.delete<{ ok: boolean }>(`/api/testimonials/${id}`);
}

// ---- Users (admin) ----

export interface ManagedUser {
  id: number;
  name: string;
  email: string;
  role: "user" | "admin" | "farmer" | "employee";
  is_active: number;
  created_at?: string;
  updated_at?: string;
}

export function listUsers() {
  return api.get<{ users: ManagedUser[] }>("/api/users");
}

export function createUser(input: { name: string; email: string; password: string; role: ManagedUser["role"] }) {
  return api.post<{ ok: boolean; id: number }>("/api/users", input);
}

export function updateUser(id: number, fields: Partial<Pick<ManagedUser, "name" | "email" | "role" | "is_active"> & { password?: string }>) {
  return api.patch<{ ok: boolean }>(`/api/users/${id}`, fields);
}

export function deleteUser(id: number) {
  return api.delete<{ ok: boolean }>(`/api/users/${id}`);
}

// ---- Employees (admin) ----

export interface Employee {
  id: number;
  user_id: number | null;
  name: string;
  phone: string | null;
  email: string | null;
  position: string | null;
  department: string | null;
  hire_date: string | null;
  salary: number | null;
  is_active: number;
  created_at?: string;
  updated_at?: string;
}

export function listEmployees() {
  return api.get<{ employees: Employee[] }>("/api/employees");
}

export function fetchMyEmployeeProfile() {
  return api.get<{ employee: Employee }>("/api/employees/me");
}

export function createEmployee(input: Partial<Employee>) {
  return api.post<{ ok: boolean; id: number }>("/api/employees", input);
}

export function updateEmployee(id: number, fields: Partial<Employee>) {
  return api.patch<{ ok: boolean }>(`/api/employees/${id}`, fields);
}

export function deleteEmployee(id: number) {
  return api.delete<{ ok: boolean }>(`/api/employees/${id}`);
}

// ---- Farmers / Customers (staff) ----

export interface Farmer {
  id: number;
  user_id: number | null;
  name: string;
  phone: string | null;
  email: string | null;
  farm_name: string | null;
  farm_location: string | null;
  farm_size: number | null;
  crops_grown: string | null;
  registration_date: string | null;
  is_active: number;
  created_at?: string;
  updated_at?: string;
}

export function listFarmers() {
  return api.get<{ farmers: Farmer[] }>("/api/farmers");
}

export function createFarmer(input: Partial<Farmer>) {
  return api.post<{ ok: boolean; id: number }>("/api/farmers", input);
}

export function updateFarmer(id: number, fields: Partial<Farmer>) {
  return api.patch<{ ok: boolean }>(`/api/farmers/${id}`, fields);
}

export function deleteFarmer(id: number) {
  return api.delete<{ ok: boolean }>(`/api/farmers/${id}`);
}

// ---- Products (admin manages; public reads) ----

export interface Product {
  id: number;
  name: string;
  description: string | null;
  category: string | null;
  price: number;
  stock_quantity: number;
  unit: string;
  image_url: string | null;
  is_available: number;
  created_at?: string;
  updated_at?: string;
}

export function listProducts() {
  return api.get<{ products: Product[] }>("/api/products");
}

export function createProduct(input: Partial<Product>) {
  return api.post<{ ok: boolean; id: number }>("/api/products", input);
}

export function updateProduct(id: number, fields: Partial<Product>) {
  return api.patch<{ ok: boolean }>(`/api/products/${id}`, fields);
}

export function deleteProduct(id: number) {
  return api.delete<{ ok: boolean }>(`/api/products/${id}`);
}

// ---- Seeds (admin manages; public reads) ----

export interface Seed {
  id: number;
  name: string;
  variety: string | null;
  description: string | null;
  crop_type: string | null;
  germination_rate: number | null;
  planting_season: string | null;
  harvest_period: string | null;
  price_per_kg: number;
  stock_quantity: number;
  origin: string | null;
  certification: string | null;
  image_url: string | null;
  is_available: number;
  created_at?: string;
  updated_at?: string;
}

export function listSeeds() {
  return api.get<{ seeds: Seed[] }>("/api/seeds");
}

export function createSeed(input: Partial<Seed>) {
  return api.post<{ ok: boolean; id: number }>("/api/seeds", input);
}

export function updateSeed(id: number, fields: Partial<Seed>) {
  return api.patch<{ ok: boolean }>(`/api/seeds/${id}`, fields);
}

export function deleteSeed(id: number) {
  return api.delete<{ ok: boolean }>(`/api/seeds/${id}`);
}

// ---- Orders ----

export interface Order {
  id: number;
  user_id: number;
  customer_name?: string;
  customer_email?: string;
  product_name: string;
  quantity: number;
  total_amount: number;
  status: "pending" | "paid" | "fulfilled" | "cancelled";
  created_at?: string;
  updated_at?: string;
}

export function listOrders() {
  return api.get<{ orders: Order[] }>("/api/orders");
}

export function createOrder(input: { product_name: string; quantity: number; total_amount: number }) {
  return api.post<{ ok: boolean; id: number }>("/api/orders", input);
}

export function updateOrder(id: number, fields: Partial<Pick<Order, "product_name" | "quantity" | "total_amount" | "status">>) {
  return api.patch<{ ok: boolean }>(`/api/orders/${id}`, fields);
}

export function deleteOrder(id: number) {
  return api.delete<{ ok: boolean }>(`/api/orders/${id}`);
}

// ---- Contact messages & product inquiries (staff) ----

export interface ContactMessage {
  id: number;
  full_name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  language: string | null;
  is_read: number;
  created_at: string;
}

export function listContactMessages() {
  return api.get<{ messages: ContactMessage[] }>("/api/contact");
}

export function markContactMessageRead(id: number) {
  return api.patch<{ ok: boolean }>(`/api/contact/${id}/read`);
}

export interface ProductInquiry {
  id: number;
  full_name: string;
  email: string;
  phone: string | null;
  product_name: string;
  quantity: number | null;
  message: string | null;
  language: string | null;
  is_read: number;
  created_at: string;
}

export function listProductInquiries() {
  return api.get<{ inquiries: ProductInquiry[] }>("/api/product-inquiries");
}

export function markProductInquiryRead(id: number) {
  return api.patch<{ ok: boolean }>(`/api/product-inquiries/${id}/read`);
}

// ---- Dashboard stats ----

export interface AdminStats {
  users: { total: number; admins: number; employees: number; customers: number };
  farmers: number;
  products: number;
  seeds: number;
  orders: number;
  unreadMessages: number;
  unreadInquiries: number;
  pendingTestimonials: number;
}

export interface StaffStats {
  farmers: number;
  orders: number;
  products: number;
  seeds: number;
}

export function fetchAdminStats() {
  return api.get<{ stats: AdminStats }>("/api/dashboard/admin-stats");
}

export function fetchStaffStats() {
  return api.get<{ stats: StaffStats }>("/api/dashboard/staff-stats");
}
