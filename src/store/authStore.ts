import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  _id: string;
  name: string;
  role: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  token?: string;
}

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  removeUser: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: User) => set({ user }),
      removeUser: () => set({ user: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
