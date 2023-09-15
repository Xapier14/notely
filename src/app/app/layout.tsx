"use client";
import style from "./layout.module.scss";

import AppNavBar from "./app-nav-bar";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { AuthState } from "@/services/AuthService";
import OutletContainer from "./outlet-container";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authState, authService] = useAuth(router);

  return (
    <>
      {authState === AuthState.LoggedIn ? (
        <>
          <div className={style["app-container"]}>
            <AppNavBar />
            <OutletContainer className={style["grow"]}>
              {children}
            </OutletContainer>
          </div>
        </>
      ) : null}
    </>
  );
}
