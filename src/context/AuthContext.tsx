"use client";

import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  token: string | null;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  token: null,
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const cookieToken = document.cookie
      .split("; ")
      .find((x) => x.startsWith("token_ui=")) 
      ?.split("=")[1];

    if (cookieToken) setToken(cookieToken);
  }, []);

  const logout = async () => {
    await fetch("/api/logout", { method: "POST" });
    setToken(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ token, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
