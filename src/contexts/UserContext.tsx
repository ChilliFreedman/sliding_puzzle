import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type User = {
  name: string;
  age: number;
  contry: string;
};

type UserContextType = {
  user: User | null;
  login: (name: string, age: number, contry: string) => void;
  logout: () => void;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

type UserProviderProps = { children: ReactNode };

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const navigate = useNavigate();
  
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = (name: string, age: number, contry: string) => {
    setUser({ name, age, contry });
    navigate("/game");
  };

  const logout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};