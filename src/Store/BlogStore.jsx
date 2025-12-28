// src/Store/BlogStore.jsx - USER SIDE UPDATED
import axios from "axios";
import { create } from "zustand";

const API_URL = import.meta.env.VITE_API_URL;

export const useBlogStore = create((set) => ({
  blogs: [],
  currentBlog: null,
  relatedPosts: [],
  loading: false,
  error: null,
  message: null,

  // Fetch all published blogs
  fetchBlogs: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const queryString = new URLSearchParams({
        status: 'published',
        ...params
      }).toString();
      
      const res = await axios.get(`${API_URL}/blog/get_all?${queryString}`);
      
      set({
        blogs: res.data.blogs || res.data,
        loading: false,
        error: null,
      });
      
      return res.data;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to load blogs",
        loading: false,
      });
      throw err;
    }
  },

  // Fetch single blog with comments
  fetchBlogById: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${API_URL}/blog/get_blog/${id}`);
      
      set({
        currentBlog: res.data.blog,
        relatedPosts: res.data.related || [],
        loading: false,
        error: null,
      });
      
      return res.data;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to load blog",
        loading: false,
      });
      throw err;
    }
  },

  // Add comment
  addComment: async (blogId, commentData) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(`${API_URL}/blog/${blogId}/comment`, commentData);
      set({ message: "Comment added!", loading: false, error: null });
      return res.data;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to add comment",
        loading: false,
      });
      throw err;
    }
  },

  // Like comment
  likeComment: async (blogId, commentId) => {
    try {
      const res = await axios.post(`${API_URL}/blog/${blogId}/comment/${commentId}/like`);
      return res.data;
    } catch (err) {
      set({ error: err.response?.data?.message || "Failed to like comment" });
      throw err;
    }
  },

  // Add reply
  addReply: async (blogId, commentId, replyData) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(`${API_URL}/blog/${blogId}/comment/${commentId}/reply`, replyData);
      set({ message: "Reply added!", loading: false, error: null });
      return res.data;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to add reply",
        loading: false,
      });
      throw err;
    }
  },

  // Like blog
  likeBlog: async (blogId) => {
    try {
      const res = await axios.post(`${API_URL}/blog/${blogId}/like`);
      return res.data;
    } catch (err) {
      set({ error: err.response?.data?.message || "Failed to like blog" });
      throw err;
    }
  },

  // Clear messages
  clearMessages: () => set({ message: null, error: null }),
  
  // Clear current blog
  clearCurrentBlog: () => set({ currentBlog: null, relatedPosts: [] }),
}));