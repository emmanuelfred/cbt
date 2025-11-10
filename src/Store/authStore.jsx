import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

axios.defaults.withCredentials = true;
const storedUser = localStorage.getItem("user");
const storedAuth = localStorage.getItem("isAuthenticated");

export const useAuthStore = create((set) => ({
  user: storedUser ? JSON.parse(storedUser) : null,
  isAuthenticated: storedAuth === "true",
  savedInterests: [],
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,

  // 🧩 Signup
  signup: async (email, password, name, academicLevel, interests) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, {
        email,
        password,
        name,
        academicLevel,
        interests,
      });
      set({ user: response.data.user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error signing up",
        isLoading: false,
      });
      throw error;
    }
  },

  // 🧩 Resend verification mail
  resendMail: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/auth/resend-otp?email=${email.email}`);
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error resending verification email",
        isLoading: false,
      });
      throw error;
    }
  },

  // 🧩 Login
login: async (email, password) => {
  set({ isLoading: true, error: null });
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });

    // Save user data to localStorage
    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("isAuthenticated", "true");

    set({
      isAuthenticated: true,
      user: response.data.user,
      error: null,
      isLoading: false,
    });
  } catch (error) {
    set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
    throw error;
  }
},


  // 🧩 Logout
logout: async () => {
  set({ isLoading: true, error: null });
  try {
    await axios.post(`${API_URL}/auth/logout`);

    // Clear localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");

    set({ user: null, isAuthenticated: false, error: null, isLoading: false });
  } catch (error) {
    set({ error: "Error logging out", isLoading: false });
    throw error;
  }
},


  // 🧩 Verify Email
  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/auth/verify-email`, { code });
      set({ user: response.data.user, isAuthenticated: true, isLoading: false });
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error verifying email",
        isLoading: false,
      });
      throw error;
    }
  },

  // 🧩 Check Auth
  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/auth/check-auth`);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch {
      set({ error: null, isCheckingAuth: false, isAuthenticated: false });
    }
  },

  // 🧩 Forgot Password (send OTP)
forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
      set({ message: response.data.message, isLoading: false });
      return response.data;
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Error sending reset password email",
      });
      throw error;
    }
},

  // 🧩 Verify OTP
  verifyOtp: async (email, otp) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/auth/verify-otp_password`, { email, otp });
      set({ message: response.data.message, isLoading: false });
      return response.data; // will include userId
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Error verifying OTP",
      });
      throw error;
    }
  },

  // 🧩 Reset Password (after OTP verification)
  resetPassword: async (userId, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(`${API_URL}/auth/reset-password/${userId}`, { password });
      set({ message: response.data.message, isLoading: false });
      return response.data;
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Error resetting password",
      });
      throw error;
    }
  },

  // 🧩 Fetch user interests
  fetchInterests: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${API_URL}/interests/get`);
      set({
        savedInterests: res.data || [],
        error: null,
        loading: false,
      });
    } catch (err) {
      set({
        error: err.response?.data?.message || "❌ Failed to fetch interests",
        loading: false,
      });
    }
  },

  // 🧩 Update profile
  updateprofile: async (profileData) => {
    set({ isLoading: true, error: null, message: null });
    try {
      const response = await axios.put(`${API_URL}/auth/update`, profileData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      set({
        user: response.data.user,
        isLoading: false,
        message: response.data.message,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error updating profile",
        isLoading: false,
      });
      throw error;
    }
  },

  // 🧩 Update email
  updateEmail: async (data) => {
    set({ isLoading: true, error: null, message: null });
    try {
      const response = await axios.post(`${API_URL}/auth/update-email`, data);
      set({
        user: response.data.user,
        isLoading: false,
        message: response.data.message,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error updating email",
        isLoading: false,
      });
      throw error;
    }
  },

  // 🧩 Update password
  updatePassword: async (data) => {
    set({ isLoading: true, error: null, message: null });
    try {
      const response = await axios.post(`${API_URL}/auth/update-password`, data);
      set({
        user: response.data.user,
        isLoading: false,
        message: response.data.message,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error updating password",
        isLoading: false,
      });
      throw error;
    }
  },
}));



