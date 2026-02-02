"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "./auth-client";

export function useAuthGuard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    authClient.getSession().then(({ data }) => {
      if (!data) {
        router.replace("/sign-in");
      } else {
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    });
  }, [router]);

  return { isLoading, isAuthenticated };
}
