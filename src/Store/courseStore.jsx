// useCourseStore.js
import axios from "axios";
import { create } from "zustand";

const API_URL = import.meta.env.VITE_API_URL;

export const usecourseStore = create((set) => ({
  course: {},
  courses: [],
  loading: false,
  error: null,
  message: null,

  activeEnrollments: [],
  expiredEnrollments: [],
  completedEnrollments: [],
  enrollmentStats: {},

  // ✅ Fetch recommended courses
  fetchRecommendedCourses: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${API_URL}/course/recommendations`);
      set({ courses: res.data.courses, loading: false });
    } catch (err) {
      console.error("Failed to fetch courses:", err);
      set({
        error: "Failed to load courses. Please try again.",
        loading: false,
      });
    }
  },
    getCourseCentent: async (token) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${API_URL}/course/content/${token}`);
      set({ course: res.data, loading: false });
      return res.data;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to load active enrollments",
        loading: false,
      });
      throw err;
    }
  },

  // ✅ Fetch a single course by ID
  fetchCourseDetail: async (courseId) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${API_URL}/course/course-detail/${courseId}`);
      set({ course: res.data.course, loading: false });
    } catch (err) {
      console.error("Course not found:", err);
      set({ error: "Failed to load course details", loading: false });
    }
  },

  // ✅ Enroll in a course
  enroll: async (userId, courseId) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/course/enroll`, {
        userId,
        courseId,
      });

      set({
        message: response.data.message,
        error: null,
        loading: false,
      });

      return response.data;
    } catch (error) {
      console.error("Error enrolling in course:", error);
      set({
        error: error.response?.data?.message || "Error enrolling in course",
        loading: false,
      });
      throw error;
    }
  },

  // ✅ Get active enrollments
  getActiveEnrollments: async (userId) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${API_URL}/course/enrollments/active/${userId}`);
      set({ activeEnrollments: res.data.enrollments, loading: false });
      return res.data.enrollments;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to load active enrollments",
        loading: false,
      });
      throw err;
    }
  },

  // ✅ Get expired enrollments
  getExpiredEnrollments: async (userId) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${API_URL}/course/enrollments/expired/${userId}`);
      set({ expiredEnrollments: res.data.enrollments, loading: false });
      return res.data.enrollments;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to load expired enrollments",
        loading: false,
      });
      throw err;
    }
  },

  // ✅ Get completed enrollments
  getCompletedEnrollments: async (userId) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${API_URL}/course/enrollments/completed/${userId}`);
      set({ completedEnrollments: res.data.enrollments, loading: false });
      return res.data.enrollments;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to load completed enrollments",
        loading: false,
      });
      throw err;
    }
  },

  // ✅ Get enrollment statistics (total, completed, incomplete, expired)
  getEnrollmentStats: async (userId) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${API_URL}/course/enrollments/stats/${userId}`);
      set({ enrollmentStats: res.data.stats, loading: false });
      return res.data.stats;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to load enrollment stats",
        loading: false,
      });
      throw err;
    }
  },
}));
