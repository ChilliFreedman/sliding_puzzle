import { createContext, useState, useEffect, useContext } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../utils/constants/routes"

type User = {
  name: string;
  age: number;
  country: string;
};

type UserContextType = {
  user: User | null;
  login: (name: string, age: number, country: string) => void;
  logout: () => void;
};

type UserProviderProps = { children: ReactNode };

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");

    return storedUser ? JSON.parse(storedUser) : null;
  });

  const navigate = useNavigate();
  
  useEffect(() => {
    user
      ? localStorage.setItem("user", JSON.stringify(user))
      : localStorage.removeItem("user");
  }, [user]);

  const login = (name: string, age: number, country: string) => {
    setUser({ name, age, country });
    navigate(ROUTES.GAME);
  };

  const logout = () => {
    setUser(null);
    navigate(ROUTES.HOME);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
}