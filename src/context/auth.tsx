import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { app, createSession } from "../api/app";
import { AuthContextType } from "../types/AuthContextType";
import { User } from "../types/User";


export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<string>();


  useEffect(() => {
    const storageData  = localStorage.getItem("user");
    
    if ( storageData ) {
      setUser(storageData);
    }
  }, []);



  const login = async (mat: string, password: string) => {
    const response = await createSession(mat, password);
    const loggedUser = response.data.user;
    const token = response.data.token;

    localStorage.setItem("user", loggedUser.id);
    localStorage.setItem("token", token);
    app.defaults.headers.Authorization = `Bearer ${token}`;

    setUser(loggedUser.id);

    navigate("/home");

    //console.log(response.data);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    app.defaults.headers.Authorization = null;
    setUser(null);
    navigate("/");
    alert("Sessão encerrada");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
