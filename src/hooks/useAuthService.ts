"use client";

import { AuthServiceInterface, AuthState } from "@/services/AuthService";
import { create } from "zustand";

const hostname = process.env.NEXT_PUBLIC_BACKEND_URI ?? "/api";

function defineRefreshSessionAsync(set: any): () => Promise<boolean> {
  const refreshSessionAsync = async () => {
    const refreshRoute = "/auth/refresh";
    const url = hostname + refreshRoute;
    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        session_token: localStorage.getItem("sessionToken"),
      }),
    });
    const data = await response.json();
    const success = response.status === 200;
    if (!success) {
      set({ authState: AuthState.Error });
      localStorage.removeItem("sessionToken");
      return false;
    }
    localStorage.setItem("sessionToken", data["session_token"]);
    return true;
  };
  return refreshSessionAsync;
}

function defineUpdateAuthStateAsync(set: any): () => Promise<AuthState> {
  const updateAuthStateAsync = async () => {
    const sessionCheckRoute = "/auth/check";
    const sessionRefreshRoute = "/auth/refresh";
    const checkUrl = hostname + sessionCheckRoute;
    const refreshUrl = hostname + sessionRefreshRoute;
    try {
      console.log("Checking session...");
      const response = await fetch(checkUrl, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      const loggedIn = data["logged_in"];
      let state = data["state"];
      if (!loggedIn) {
        // if no sessionToken, then logged out
        if (!localStorage.getItem("sessionToken")) {
          set({ authState: AuthState.LoggedOut });
          console.log(`AuthService.updateAuthState() => ${state}`);
          return AuthState.LoggedOut;
        }
        // try to refresh session
        console.log("Session expired, trying to refresh session...");
        try {
          const response = await fetch(refreshUrl, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
              session_token: localStorage.getItem("sessionToken"),
            }),
          });
          const data = await response.json();
          const success = response.status === 200;
          if (!success) {
            // session refresh failed
            console.log("Session refresh failed, logging out...");
            set({ authState: AuthState.LoggedOut });
            localStorage.removeItem("sessionToken");
            return AuthState.LoggedOut;
          }
          // session refresh succeeded
          console.log("Session refresh succeeded, logging in...");
          localStorage.setItem("sessionToken", data["session_token"]);
          state = "Refreshed token.";
        } catch {
          // session refresh failed
          console.log("Session refresh failed (error), logging out...");
          set({ authState: AuthState.Error });
          return AuthState.Error;
        }
      }
      set({ authState: AuthState.LoggedIn });
      console.log(`AuthService.updateAuthState() => ${state}`);
      return AuthState.LoggedIn;
    } catch {
      return AuthState.Error;
    }
  };
  return updateAuthStateAsync;
}

function defineLoginWithCredentialsAsync(
  set: any
): (email: string, password: string) => Promise<void> {
  const loginWithCredentialsAsync = async (email: string, password: string) => {
    const loginRoute = "/auth/login";
    const url = hostname + loginRoute;
    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    const loggedIn = response.status === 200;

    if (loggedIn) {
      set({ authState: AuthState.LoggedIn });
    } else {
      set({ authState: AuthState.LoggedOut });
    }

    const sessionToken = data["sessionToken"];
    localStorage.setItem("sessionToken", sessionToken);

    console.log("logged in");
  };
  return loginWithCredentialsAsync;
}

function defineLogoutAsync(set: any): () => Promise<void> {
  const logoutAsync = async () => {
    const logoutRoute = "/auth/logout";
    const url = hostname + logoutRoute;
    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
    });
    const data = await response.json();
    const loggedOut = response.status === 200;
    if (loggedOut) {
      set({ authState: AuthState.LoggedOut });
    } else {
      set({ authState: AuthState.LoggedIn });
    }
    console.log("logged out");
  };
  return logoutAsync;
}

export const useAuthService = create<AuthServiceInterface>((set) => ({
  authState: AuthState.LoggedOut,
  setAuthState: (authState: AuthState) => set({ authState }),
  updateAuthStateAsync: defineUpdateAuthStateAsync(set),
  refreshSessionAsync: defineRefreshSessionAsync(set),
  loginWithCredentialsAsync: defineLoginWithCredentialsAsync(set),
  logoutAsync: defineLogoutAsync(set),
}));
