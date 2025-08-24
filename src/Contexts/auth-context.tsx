import type { User } from "@/Commons/Types/User";
import mainApi from "@/Services/main";
import React, { useEffect, useState } from "react";

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) =>{
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
    if (token) mainApi.defaults.headers.common.Authorization = `Bearer ${token}`;
    else delete mainApi.defaults.headers.common.Authorization;
  }, [token]);
}