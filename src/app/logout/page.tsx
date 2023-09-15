"use client";

import { useAuthService } from "@/hooks/useAuthService";
import { useEffect } from "react";

export default function Logout() {
  const authService = useAuthService();

  useEffect(() => {
    authService.logoutAsync().then(
      () => {
        window.location.href = "/";
      },
      () => {
        window.location.href = "/";
      }
    );
  }, []);

  return (
    <>
      <h1>Logging you out...</h1>
    </>
  );
}
