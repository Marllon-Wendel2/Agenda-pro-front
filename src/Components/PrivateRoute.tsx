'use client'

import { User } from "@/Commons/Types/User";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = Cookies.get("token");
    const userCookie = Cookies.get("user");

    if (token && userCookie) {
      setUser(JSON.parse(userCookie));
    } else {
      router.push("/login");
    }
  }, [router]);

  if (!user) {
    return null;
  }

  return <>{children}</>;
}