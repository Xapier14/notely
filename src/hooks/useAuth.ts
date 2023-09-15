import { AuthServiceInterface, AuthState } from "@/services/AuthService";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAuthService } from "./useAuthService";

interface AuthProps {
  redirectTo?: string;
  requireLogin?: boolean;
}

export function useAuth(
  router?: AppRouterInstance,
  fetchAuthState?: (authState: AuthState) => void,
  props?: AuthProps
): [AuthState, AuthServiceInterface] {
  const requireLogin = props?.requireLogin ?? true;
  const redirectTo = props?.redirectTo ?? "/login";

  const authService = useAuthService();

  const pathname = usePathname();

  useEffect(() => {
    const checkState = async () => {
      const authState = await authService.updateAuthStateAsync();
      if (fetchAuthState) fetchAuthState(authState);

      if (requireLogin && authState === AuthState.LoggedOut) {
        if (router == undefined) {
          throw new Error("router is required when requireLogin is true");
        }
        // if current page is not login page, redirect to login page
        if (pathname !== "/login") {
          console.log("Not logged in, redirecting to login page...");
          router.push(redirectTo);
        }
      }
    };

    checkState().catch((err) => {
      console.error(err);
    });
  }, []);

  return [authService.authState, authService];
}
