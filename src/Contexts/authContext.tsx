'use client'
import type { User } from "@/Commons/Types/User";
import { createContext, useState } from "react";
import { LoginDto } from "@/Commons/Types/Auth";
import mainApi from "@/Services/main";
import Cookies from "js-cookie";

interface AuthContextType {
  token: string | null;
  user: User | null;
  login: (loginDto: LoginDto) => Promise<unknown>;
  logout: () => Promise<void>;
  register: (loginDto: LoginDto) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) =>{
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  async function login(loginDto: LoginDto) {
    try {
      const response = await mainApi.post('auth', loginDto)

      const result: {
        token: string;
        user: { nome: string; email: string; type: string };
      } = response.data;

      setUser(result.user)
      setToken(result.token)

      Cookies.set("token", result.token, { expires: 7 });
      } catch (error) {
          console.error(error)
      }
  }

  async function logout() {}

  async function register(loginDto:LoginDto) {}

  return (
    <AuthContext.Provider value={{ token, user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}