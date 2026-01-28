import type { WAQIData } from '@/types/WAQIResponse';

export interface User {
    uid: string;
    username: string;
    password: string;
    profilePicture: string[];
    history: WAQIData[];
}

export interface AuthStore {
    isAuth: boolean;
    user: User | null;
    setUser: (user: AuthStore['user']) => void;
    logout: () => void;
}
