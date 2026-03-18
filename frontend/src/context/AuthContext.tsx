import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { User, Role } from "@/types";
import ApiService from "@/api/ApiService";
import { toast } from "sonner";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<string>;
  register: (payload: object, role: "ADMIN" | "STUDENT") => Promise<void>;
  logout: () => void;
  hasRole: (role: Role | Role[]) => boolean;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));

  const login = useCallback(async (email: string, password: string): Promise<string> => {
    const res = await ApiService.post("/api/users/login", { email, password });
    console.log("LOGIN FULL RESPONSE:", JSON.stringify(res.data));
    const authToken = res.data.accessToken || res.data.token || res.data.jwtToken;
    const role = (res.data.role || "").toUpperCase();
    const userData = { email: res.data.email || email, role, name: res.data.name || email };
    localStorage.setItem("token", authToken);
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(authToken);
    setUser(userData);
    toast.success(`Welcome back, ${userData.email}!`);
    return role;
  }, []);

  const register = useCallback(async (payload: object, role: "ADMIN" | "STUDENT") => {
    const endpoint = role === "ADMIN" ? "/api/users/register" : "/api/students/register";
    const res = await ApiService.post(endpoint, payload);
    const { token: authToken, ...userData } = res.data;
    localStorage.setItem("token", authToken);
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(authToken);
    setUser(userData);
    toast.success("Registration successful!");
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    toast.info("Logged out successfully");
  }, []);

  const hasRole = useCallback(
    (role: Role | Role[]) => {
      if (!user) return false;
      return Array.isArray(role) ? role.includes(user.role) : user.role === role;
    },
    [user]
  );

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!user, login, register, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
