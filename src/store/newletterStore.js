// newletterStore.js
import axios from "axios";
import { create } from "zustand";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const useNewsletterStore = create((set) => ({
  loading: false,
  error: null,
  message: null,

  subscribe: async (email, name) => {
    set({ loading: true, error: null, message: null });
    try {
      const res = await axios.post(`${API_URL}/newlatter/subcribe`, { email, name });
      set({ message: res.data.message });
    } catch (err) {
      set({ error: err.response?.data?.message || "Subscription failed" });
    } finally {
      set({ loading: false });
    }
  },

  unsubscribe: async (email, reason) => {
    set({ loading: true, error: null, message: null });
    try {
      const res = await axios.post(`${API_URL}/newlatter/unsubscribe`, { email, reason });
      set({ message: res.data.message });
    } catch (err) {
      set({ error: err.response?.data?.message || "Unsubscription failed" });
    } finally {
      set({ loading: false });
    }
  },
}));
