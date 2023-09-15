"use client";

import { PencilIcon } from "@heroicons/react/24/solid";

import style from "./nav-bar.module.scss";
import Brand from "./common/brand";
import { useAuth } from "@/hooks/useAuth";
import { AuthState } from "@/services/AuthService";
import { useState } from "react";

export default function NavBar() {
  const [authState, setAuthState] = useState<AuthState | undefined>(undefined);

  useAuth(undefined, setAuthState, {
    requireLogin: false,
  });

  return (
    <nav className={style["nav-bar"]}>
      <Brand />
      {authState != undefined ? (
        <ul>
          {authState === AuthState.LoggedIn ? (
            <>
              <li>
                <a className={style["accent"]} href="/app">
                  Start writing
                </a>
              </li>
              <li>
                <a href="/logout">Logout</a>
              </li>
            </>
          ) : (
            <>
              <li>
                <a href="/login">Log in</a>
              </li>
              <li>
                <a className={style["accent"]} href="/signup">
                  Sign up
                </a>
              </li>
            </>
          )}
        </ul>
      ) : null}
    </nav>
  );
}
