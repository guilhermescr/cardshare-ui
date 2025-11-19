import { SummarizedUserDto } from '@/types/user.dto';
import { create } from 'zustand';

type AuthState = {
  token: string | null;
  user: SummarizedUserDto | null;
  setAuth: (token: string | null, user: SummarizedUserDto | null) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  setAuth: (token, user) => set({ token, user }),
  logout: () => set({ token: null, user: null }),
}));
