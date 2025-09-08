import { create } from 'zustand';
import type { UserDto } from '@/types/user.dto';

type AuthState = {
  token: string | null;
  user: UserDto | null;
  setAuth: (token: string | null, user: UserDto | null) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  setAuth: (token, user) => set({ token, user }),
  logout: () => set({ token: null, user: null }),
}));
