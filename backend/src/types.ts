export type AppRole = "ADMIN" | "MANAGER" | "EMPLOYEE" | "GUEST";

export interface JwtUser {
  id: number;
  email: string;
  role: AppRole;
}
