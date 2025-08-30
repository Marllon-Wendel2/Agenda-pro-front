'use client'

import { useAuth } from "@/Hooks/useAuth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const router = useRouter()

    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [user, router]);

    if (!user) {
    return null;
  }

    return <>{children}</>;
}