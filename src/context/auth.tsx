import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { app, createSession } from "../api/app";
import { AuthContextType } from "../types/AuthContextType";
import { User } from "../types/User";
import {
  getDatabase,
  get,
  ref,
  set,
  onValue,
  push,
  update,
} from 'firebase/database';

export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [myData, setMyData] = useState(null);
  const navigate = useNavigate();
  const [user, setUser] = useState<string>();
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    const storageData  = localStorage.getItem("user");
    
    if ( storageData ) {
      setUser(storageData);
    }
  }, []);

  const findUser = async (name: any) => {
    const database = getDatabase();

    const mySnapshot = await get(ref(database, users/${name}));

    return mySnapshot.val();
  };

  const onLogin = async (username) => {
    try {
      const database = getDatabase();
      //first check if the user registered before

      const user = await findUser(username);

      //create a new user if not registered
      if (user) {
        setMyData(user);
      } else {
        const newUserObj = {
          username: username,
          avatar: 'https://i.pravatar.cc/150?u=' + Date.now(),
        };

        set(ref(database, users/${username}), newUserObj);
        setMyData(newUserObj);
      }

      // set friends list change listener
      const myUserRef = ref(database, users/${username});
      onValue(myUserRef, snapshot => {
        const data = snapshot.val();
        setUsers(data.friends);
        setMyData(prevData => ({
          ...prevData,
          friends: data.friends,
        }));
      });
    } catch (error) {
      console.error(error);
    }
  };

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
