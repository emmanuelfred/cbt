import axios from "axios";
import { create } from "zustand";

const API_URL = import.meta.env.VITE_API_URL;

export const useBlogStore = create((set) => ({
    blogs: [],
    loading: false,
    error: null,
    // Fetch all blog posts
    fetchBlogs: async () => {
        set({ loading: true, error: null });
        try {
           const res = await axios.get(`${API_URL}/blog/get_all`);
            set({
                blogs: res.data, 
                
                loading: false,
              });
        } catch (err) { 
            console.error("Error getting blogs:", err);
            set({
                error: err.response?.data?.message || "❌ Failed to get blogs",
                loading: false,
              });
        }
    },
}));