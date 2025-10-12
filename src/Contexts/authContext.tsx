'use client'
import type { User } from "@/Commons/Types/User";
import { createContext, useState } from "react";
import { LoginDto } from "@/Commons/Types/Auth";
import { useRouter } from "next/navigation";
import mainApi from "@/Services/main";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

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

  const router = useRouter()

  async function login(loginDto: LoginDto) {
    try {
      const response = await mainApi.post('auth', loginDto)

      const result: {
        token: string;
        user: { nome: string; email: string; type: string, id: string };
      } = response.data;

      setUser(result.user)
      setToken(result.token)

      Cookies.set("token", result.token, { expires: 7 });
      Cookies.set("user", JSON.stringify(result.user), {expires: 7})
      toast.success('login realizado com sucesso', {
        position: 'top-right',
        autoClose: 2000,
        closeOnClick: true
      })

      router.push('/')
      } catch (error) {
        toast.error('login não realizado', {
          position: 'top-right',
          autoClose: 2000,
          closeOnClick: true
        })
          console.error(error)
      }
  }

async function logout() {
  try {
    router.push("/login");
    Cookies.remove("token");
    Cookies.remove("user");

    setToken(null);
    setUser(null);

    toast.info("Você saiu da conta!", {
      position: "top-right",
      autoClose: 2000,
      closeOnClick: true,
    });

  } catch (error) {
    console.error("Erro ao sair da conta:", error);
    toast.error("Erro ao realizar logout!", {
      position: "top-right",
      autoClose: 2000,
      closeOnClick: true,
    });
  }
}

  async function register(loginDto:LoginDto) {}

  return (
    <AuthContext.Provider value={{ token, user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}