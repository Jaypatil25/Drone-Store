import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const API = import.meta.env.VITE_API_URL || '/api';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email, password) => {
        try {
          const res = await fetch(`${API}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });
          const data = await res.json();
          if (!res.ok) return { success: false, error: data.error || 'Invalid credentials' };
          set({ user: data, isAuthenticated: true });
          return { success: true };
        } catch {
          return { success: false, error: 'Network error' };
        }
      },
      register: async (name, email, password) => {
        try {
          const res = await fetch(`${API}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
          });
          const data = await res.json();
          if (!res.ok) return { success: false, error: data.error || 'Registration failed' };
          set({ user: data, isAuthenticated: true });
          return { success: true };
        } catch {
          return { success: false, error: 'Network error' };
        }
      },
      googleLogin: async (idToken) => {
        try {
          const res = await fetch(`${API}/auth/google`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idToken }),
          });
          const data = await res.json();
          if (!res.ok) return { success: false, error: data.error || 'Google login failed' };
          set({ user: data, isAuthenticated: true });
          return { success: true };
        } catch {
          return { success: false, error: 'Network error' };
        }
      },
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: 'dronix-auth' }
  )
);
