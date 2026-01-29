import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthStore } from './types/types';

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            isAuth: false,
            user: null,
            setUser: (user) => set({ user, isAuth: !!user }),
            logout: () => set({ user: null, isAuth: false }),
        }),
        {
            name: 'airwise user-storage',
            partialize: (state) => ({
                isAuth: state.isAuth,
                user: state.user,
            }),
        },
    ),
);
