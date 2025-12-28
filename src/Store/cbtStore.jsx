// src/Store/cbtStore.jsx (USER SIDE - UPDATED)
import axios from "axios";
import { create } from "zustand";

const API_URL = import.meta.env.VITE_API_URL;

export const useCbtstore = create((set) => ({
  totalcbt: 0,
  attempt: [],
  exams: [],
  question: [],
  count: null,
  loading: false,
  error: null,
  message: null,
  Summary: {},

  /**
   * Get all available exams (UPDATED for new structure)
   * Now returns exams with: name, displayName, category, defaultTotalTime, etc.
   */
  getExams: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${API_URL}/cbt/exams`);
      
      // Filter only active exams for students
      const activeExams = res.data.exams.filter(exam => exam.isActive !== false);
      
      set({ 
        exams: activeExams, 
        loading: false,
        error: null 
      });
      
      return activeExams;
    } catch (err) {
      console.error("Failed to fetch exams:", err);
      set({ 
        error: err.response?.data?.message || "Failed to load exams", 
        loading: false 
      });
      throw err;
    }
  },

  /**
   * Get questions by exam, year, and subject (UPDATED)
   * Now uses examName instead of exam parameter
   */
  getQuestion: async (examName, year, subject) => {
    set({ loading: true, error: null });
    try {
      // Build query parameters
      const params = new URLSearchParams({
        examName: examName.toLowerCase(),
        year: year.toString(),
        subject: subject,
        shuffle: 'true' // Shuffle questions for students
      });

      const response = await axios.get(`${API_URL}/cbt/questions?${params.toString()}`);
      console.log("Questions fetched:", response.data);
      
      const { questions, count } = response.data;

      set({ 
        question: questions, 
        count, 
        loading: false, 
        message: response.data.message,
        error: null
      });

      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Error fetching questions";
      set({ 
        error: errorMsg, 
        loading: false,
        question: [],
        count: 0
      });
      throw error;
    }
  },

  /**
   * Record exam attempt (UPDATED)
   */
recordAttempt: async (
  user_id,
  name,
  avatar,
  exam,
  subject,
  year,
  score,
  percentage,
  sharePermission,
  date,
  duration,
  totalQuestions,  // NEW
  answers          // NEW
) => {
  set({ loading: true, error: null });
  try {
    const response = await axios.post(`${API_URL}/cbt/record-attempt`, {
      user_id,
      name,
      avatar,
      exam,
      subject,
      year,
      score,
      percentage,
      sharePermission,
      date,
      duration,
      totalQuestions,  // NEW: total number of questions
      answers          // NEW: array of answer objects
    });
    
    set({
      message: response.data.message,
      error: null,
      loading: false,
    });
    
    return response.data;
  } catch (error) {
    const errorMsg = error.response?.data?.message || "Error recording attempt";
    set({ 
      error: errorMsg, 
      loading: false 
    });
    throw error;
  }
},

  /**
   * Get all attempts (for leaderboard)
   */
  getAllAttempts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/cbt/attempts`);
      
      const { attempts } = response.data;

      set({ 
        attempt: attempts, 
        loading: false,
        error: null
      });

      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Error fetching leaderboard";
      set({ 
        error: errorMsg, 
        loading: false 
      });
      throw error;
    }
  },

  /**
   * Fetch recommendations for user
   */
  fetchRecommendations: async (userId, limit = 5) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(
        `${API_URL}/cbt/recommendations/${userId}?limit=${limit}`
      );
      
      set({ 
        exams: response.data.recommendations, 
        loading: false,
        error: null
      });
      
      return response.data.recommendations || [];
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Error fetching recommendations";
      set({ 
        error: errorMsg, 
        loading: false 
      });
      throw error;
    }
  },

  /**
   * Get total CBT count for user
   */
  getTotalcbt: async (userId) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/cbt/total-cbts/${userId}`);
      
      set({ 
        totalcbt: response.data.totalCBTs, 
        loading: false,
        error: null
      });

      return response.data.totalCBTs || 0;
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Error fetching total CBT";
      set({ 
        error: errorMsg, 
        loading: false 
      });
      throw error;
    }
  },

  /**
   * Get user attempts
   */
  getUserAttempts: async (userId) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/cbt/attempt/${userId}`);
      
      set({ 
        attempt: response.data.attempts, 
        loading: false,
        error: null
      });

      return response.data.attempts || [];
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Error fetching attempts";
      set({ 
        error: errorMsg, 
        loading: false 
      });
      throw error;
    }
  },

  /**
   * Get attempt summary/analytics
   */
  getAttemptSummary: async (userId) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/cbt/summary/${userId}`);
      
      set({ 
        Summary: response.data.summary, 
        loading: false,
        error: null
      });

      return response.data.summary || {};
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Error fetching summary";
      set({ 
        error: errorMsg, 
        loading: false 
      });
      throw error;
    }
  },

  /**
   * Clear error
   */
  clearError: () => set({ error: null }),

  /**
   * Clear message
   */
  clearMessage: () => set({ message: null }),
}));