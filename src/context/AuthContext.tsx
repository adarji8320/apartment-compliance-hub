import { createContext, useState, type ReactNode } from "react";
import { AUTH_STORAGE_KEY, HARDCODED_CREDENTIALS } from "@/lib/constants";
import type { AuthUser, AuthContextValue } from "@/types";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);

function getStoredUser(): AuthUser | null {
  const stored = sessionStorage.getItem(AUTH_STORAGE_KEY);
  return stored ? (JSON.parse(stored) as AuthUser) : null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(getStoredUser);
  const isAuthenticated = user !== null;

  function login(loginId: string, pin: string) {
    if (
      loginId === HARDCODED_CREDENTIALS.loginId &&
      pin === HARDCODED_CREDENTIALS.pin
    ) {
      const authUser: AuthUser = {
        loginId,
        ownerName: HARDCODED_CREDENTIALS.ownerName,
      };
      setUser(authUser);
      sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authUser));
      return true;
    }
    return false;
  }

  function logout() {
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
