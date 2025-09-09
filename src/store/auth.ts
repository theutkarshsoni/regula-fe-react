import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api, setAuthToken, attach401Handler } from "../api/axios";

type User = { id?: string; name?: string; email: string, role: string } | null;

type AuthState = {
  user: User;
  token?: string;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: string) => Promise<void>;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: undefined,

      async login(email, password) {
        const res = await api.post("/auth/login", { email, password });
        if (res.data?.token) {
          setAuthToken(res.data.token);
          set({ token: res.data.token, user: res.data?.user ?? { email } });
        }
      },

      async register(name, email, password, role) {
        const res = await api.post("/auth/register", { name, email, password, role });
        if (res.data?.token) {
          setAuthToken(res.data.token);
          set({ token: res.data.token, user: res.data?.user ?? { name, email } });
        }
      },

      logout() {
        setAuthToken(undefined);
        set({ user: null, token: undefined });
      },
    }),
    { 
      name: "regula-auth"
    }
  )
);

export const initAuth = () => {
  const { token } = useAuthStore.getState();
  if (token) setAuthToken(token);
  attach401Handler(() => useAuthStore.getState().logout());
};
