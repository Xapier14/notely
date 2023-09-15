"use client";

import styles from "./page.module.scss";
import "../styles/boxed-section.scss";
import Brand from "../common/brand";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { AuthState } from "@/services/AuthService";

export default function Login() {
  const router = useRouter();
  const [initialAuthState, authService] = useAuth(router);

  async function formSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = (e.target as HTMLFormElement).elements.namedItem(
      "email"
    ) as HTMLInputElement;
    const password = (e.target as HTMLFormElement).elements.namedItem(
      "password"
    ) as HTMLInputElement;

    await authService.loginWithCredentialsAsync(email.value, password.value);
    if (authService.authState === AuthState.LoggedIn) {
      router.push("/app");
    } else {
      alert("Invalid credentials");
    }
  }

  useEffect(() => {
    if (initialAuthState === AuthState.LoggedIn) {
      router.push("/app");
    }
  }, [initialAuthState]);
  return initialAuthState === AuthState.LoggedOut ? (
    <>
      <main className={styles["form-container"]}>
        {/* <Brand className={styles["brand-logo"]} href="/" /> */}
        <div className={`${styles["login-box"]} boxed-section`}>
          <div className={styles["heading"]}>
            <h1>Log in</h1>
            <Brand className={styles["brand-logo"]} href="/" />
          </div>
          <form autoComplete="on" onSubmit={formSubmit}>
            <div className={styles["input-container"]}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                autoComplete="on"
                spellCheck="false"
              />
            </div>
            <div className={styles["input-container"]}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                autoComplete="on"
                spellCheck="false"
              />
            </div>
            <div className={styles["button-container"]}>
              <button className={styles["primary"]} type="submit">
                Log in
              </button>
              <button className={styles["secondary"]}>Sign up</button>
            </div>
            <div className={styles["forgot-password"]}>
              <a href="password-reset">Forgot password?</a>
            </div>
          </form>
        </div>
      </main>
    </>
  ) : null;
}
