import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { app, createSession } from "../api/app";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const recoveredUser = localStorage.getItem("user");

    if (recoveredUser) {
      setUser(recoveredUser);
    }
    setLoading(false);
  }, []);

  const login = async (mat, password) => {
    console.log("login", { mat, password });

    const response = await createSession(mat, password);

    //api para criar uma session
    const loggedUser = response.data.user;
    const token = response.data.token;

    localStorage.setItem("user", loggedUser.id);
    localStorage.setItem("token", token);

    app.defaults.headers.Authorization = `Bearer ${token}`;

    // console.log(varId);

    setUser(loggedUser.id);
    navigate("/home");

    console.log(response.data.user);
  };

  const logout = () => {
    console.log("logout");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    app.defaults.headers.Authorization = null;
    setUser(null);
    navigate("/");
    alert("Sessão encerrada");
  };

  return (
    <AuthContext.Provider
      value={{ authenticated: !!user, user, login, loading, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
