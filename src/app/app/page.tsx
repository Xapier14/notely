"use client";

import { useAuthService } from "@/hooks/useAuthService";
import { AuthState } from "@/services/AuthService";

export default function MainApp() {
  const authService = useAuthService();
  return (
    <>
      {authService.authState === AuthState.LoggedIn ? (
        <div>Logged in</div>
      ) : null}
    </>
  );
}
