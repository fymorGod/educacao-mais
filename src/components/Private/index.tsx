import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/auth";

export const Private = ({ children }: { children:JSX.Element }) => {
    const user = useContext(AuthContext);
    
    if(!user) {
        return <Navigate to="/" />
    }

    return children;
};