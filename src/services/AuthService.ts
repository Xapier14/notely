export interface AuthServiceInterface {
  authState: AuthState;
  setAuthState: (authState: AuthState) => void;
  updateAuthStateAsync: () => Promise<AuthState>;
  refreshSessionAsync: () => Promise<boolean>;
  loginWithCredentialsAsync: (email: string, password: string) => Promise<void>;
  logoutAsync: () => Promise<void>;
}

export enum AuthState {
  LoggedIn,
  LoggedOut,
  Error,
}
