import { User } from "./User";

export type AuthContextType = {
    user: User | string;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void; 
}