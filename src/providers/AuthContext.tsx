import { AuthServiceInterface, AuthState } from "@/services/AuthService";
import React from "react";
import { Ref } from "react";

export interface AuthContextProps {
  authState: AuthState;
  authService: AuthServiceInterface;
  children: React.ReactNode;
}

export function AuthContext(props: AuthContextProps) {
  // foreach child, add authState and authService
  const children = React.Children.map(props.children, (child) => {
    const elem = React.cloneElement(child as React.ReactElement, {
      authState: props.authState,
      authService: props.authService,
    });
    console.log(elem);
    return elem;
  });

  return <>{children}</>;
}
