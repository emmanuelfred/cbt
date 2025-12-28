// src/Store/courseStore.jsx - COMPLETE USER STORE
import axios from "axios";
import { create } from "zustand";

const API_URL = import.meta.env.VITE_API_URL;

export const useCourseStore = create((set, get) => ({
  // State
  course: null,
  courses: [],
  loading: false,
  error: null,
  message: null,

  // Enrollment states
  activeEnrollments: [],
  expiredEnrollments: [],
  completedEnrollments: [],
  enrollmentStats: {},
  
  // Course player states
  currentEnrollment: null,
  currentSection: null,
  sectionQuestions: [],
  
  // Certificate state
  certificate: null,

  // ==================== COURSE DISCOVERY ====================

  /**
   * Fetch all recommended/published courses
   */
  fetchRecommendedCourses: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${API_URL}/course/all?is_published=true`);
      set({ 
        courses: res.data.courses || [], 
        loading: false 
      });
      return res.data.courses;
    } catch (err) {
      console.error("Failed to fetch courses:", err);
      set({
        error: "Failed to load courses. Please try again.",
        loading: false,
      });
      throw err;
    }
  },

  /**
   * Fetch single course details (public view)
   * ✅ FIXED: Changed from /course-detail/:id to /:id
   */
  fetchCourseDetail: async (courseId) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${API_URL}/course/${courseId}`);
      set({ 
        course: res.data.course, 
        loading: false 
      });
      return res.data.course;
    } catch (err) {
      console.error("Course not found:", err);
      set({ 
        error: "Failed to load course details", 
        loading: false 
      });
      throw err;
    }
  },

  /**
   * Get course reviews
   */
  getCourseReviews: async (courseId, page = 1, limit = 10, sort = "recent") => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(
        `${API_URL}/course/${courseId}/reviews?page=${page}&limit=${limit}&sort=${sort}`
      );
      return res.data.reviews;
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
      set({
        error: "Failed to load reviews",
        loading: false,
      });
      throw err;
    }
  },

  // ==================== ENROLLMENT ====================

  /**
   * Enroll in a course
   */
  enroll: async (userId, courseId, accessSource = "direct", transactionId = null, amountPaid = 0) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/course/enroll`, {
        userId,
        courseId,
        access_source: accessSource,
        transaction_id: transactionId,
        amount_paid: amountPaid,
      });

      set({
        message: response.data.message || "Successfully enrolled!",
        error: null,
        loading: false,
      });

      return response.data;
    } catch (error) {
      console.error("Error enrolling in course:", error);
      const errorMsg = error.response?.data?.message || "Error enrolling in course";
      set({
        error: errorMsg,
        loading: false,
      });
      throw new Error(errorMsg);
    }
  },

  /**
   * Get enrolled course content by token
   */
  getCourseContent: async (token) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${API_URL}/course/content/${token}`);
      set({ 
        course: res.data.course,
        currentEnrollment: res.data.enrollment,
        loading: false 
      });
      return res.data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to load course content";
      set({
        error: errorMsg,
        loading: false,
      });
      throw err;
    }
  },

  /**
   * Get full course with sections (for enrolled students)
   */
  getCourseWithSections: async (courseId) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${API_URL}/course/${courseId}/full`, {
        withCredentials: true,
      });
      set({ 
        course: res.data.course,
        currentEnrollment: res.data.enrollment,
        loading: false 
      });
      return res.data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to load course";
      set({
        error: errorMsg,
        loading: false,
      });
      throw err;
    }
  },

  // ==================== STUDENT DASHBOARD ====================

  /**
   * Get active enrollments
   */
  getActiveEnrollments: async (userId) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${API_URL}/course/enrollments/active/${userId}`);
      set({ 
        activeEnrollments: res.data.enrollments || [], 
        loading: false 
      });
      return res.data.enrollments;
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to load active enrollments";
      set({
        error: errorMsg,
        loading: false,
      });
      throw err;
    }
  },

  /**
   * Get completed enrollments
   */
  getCompletedEnrollments: async (userId) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${API_URL}/course/enrollments/completed/${userId}`);
      set({ 
        completedEnrollments: res.data.enrollments || [], 
        loading: false 
      });
      return res.data.enrollments;
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to load completed enrollments";
      set({
        error: errorMsg,
        loading: false,
      });
      throw err;
    }
  },

  /**
   * Get expired enrollments
   */
  getExpiredEnrollments: async (userId) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${API_URL}/course/enrollments/expired/${userId}`);
      set({ 
        expiredEnrollments: res.data.enrollments || [], 
        loading: false 
      });
      return res.data.enrollments;
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to load expired enrollments";
      set({
        error: errorMsg,
        loading: false,
      });
      throw err;
    }
  },

  /**
   * Get enrollment statistics
   */
  getEnrollmentStats: async (userId) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${API_URL}/course/enrollments/stats/${userId}`);
      set({ 
        enrollmentStats: res.data.stats || {}, 
        loading: false 
      });
      return res.data.stats;
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to load enrollment stats";
      set({
        error: errorMsg,
        loading: false,
      });
      throw err;
    }
  },

  // ==================== PROGRESS TRACKING ====================

  /**
   * Update student progress
   */
  updateProgress: async (progressData) => {
    try {
      const res = await axios.post(`${API_URL}/course/progress/update`, progressData);
      
      // Update current enrollment in state
      if (get().currentEnrollment) {
        set({
          currentEnrollment: {
            ...get().currentEnrollment,
            overall_progress: res.data.enrollment.overall_progress,
            current_section_id: res.data.enrollment.current_section_id,
            current_content_index: res.data.enrollment.current_content_index,
          }
        });
      }
      
      return res.data;
    } catch (err) {
      console.error("Failed to update progress:", err);
      throw err;
    }
  },

  /**
   * Mark section as complete
   */
  markSectionComplete: async (sectionId, enrollmentId) => {
    try {
      const res = await axios.post(
        `${API_URL}/course/section/${sectionId}/complete`,
        { enrollmentId }
      );
      
      return res.data;
    } catch (err) {
      console.error("Failed to mark section complete:", err);
      throw err;
    }
  },

  // ==================== Q&A SYSTEM ====================

  /**
   * Ask a question on a section
   */
  askQuestion: async (sectionId, questionData) => {
    try {
      const res = await axios.post(
        `${API_URL}/course/section/${sectionId}/question`,
        questionData
      );
      
      return res.data;
    } catch (err) {
      console.error("Failed to ask question:", err);
      throw err;
    }
  },

  /**
   * Reply to a question
   */
  replyToQuestion: async (sectionId, questionId, replyData) => {
    try {
      const res = await axios.post(
        `${API_URL}/course/section/${sectionId}/question/${questionId}/reply`,
        replyData
      );
      
      return res.data;
    } catch (err) {
      console.error("Failed to reply to question:", err);
      throw err;
    }
  },

  /**
   * Upvote a question
   */
  upvoteQuestion: async (sectionId, questionId, userId) => {
    try {
      const res = await axios.post(
        `${API_URL}/course/section/${sectionId}/question/${questionId}/upvote`,
        { userId }
      );
      
      return res.data;
    } catch (err) {
      console.error("Failed to upvote question:", err);
      throw err;
    }
  },

  /**
   * Get section questions
   */
  getSectionQuestions: async (sectionId, sort = "recent") => {
    try {
      const res = await axios.get(
        `${API_URL}/course/section/${sectionId}/questions?sort=${sort}`
      );
      
      set({ sectionQuestions: res.data.questions || [] });
      return res.data.questions;
    } catch (err) {
      console.error("Failed to fetch questions:", err);
      throw err;
    }
  },

  // ==================== REVIEWS ====================

  /**
   * Add a review for a course
   */
  addReview: async (courseId, reviewData) => {
    try {
      const res = await axios.post(
        `${API_URL}/course/${courseId}/review`,
        reviewData
      );
      
      return res.data;
    } catch (err) {
      console.error("Failed to add review:", err);
      throw err;
    }
  },

  // ==================== NOTES & BOOKMARKS ====================

  /**
   * Add a note
   */
  addNote: async (enrollmentId, noteData) => {
    try {
      const res = await axios.post(
        `${API_URL}/course/enrollment/${enrollmentId}/note`,
        noteData
      );
      
      return res.data;
    } catch (err) {
      console.error("Failed to add note:", err);
      throw err;
    }
  },

  /**
   * Add a bookmark
   */
  addBookmark: async (enrollmentId, bookmarkData) => {
    try {
      const res = await axios.post(
        `${API_URL}/course/enrollment/${enrollmentId}/bookmark`,
        bookmarkData
      );
      
      return res.data;
    } catch (err) {
      console.error("Failed to add bookmark:", err);
      throw err;
    }
  },

  // ==================== CERTIFICATES ====================

  /**
   * Generate certificate
   */
  generateCertificate: async (enrollmentId) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(
        `${API_URL}/course/certificate/generate/${enrollmentId}`
      );
      
      set({ 
        certificate: res.data.certificate,
        loading: false 
      });
      return res.data.certificate;
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to generate certificate";
      set({
        error: errorMsg,
        loading: false,
      });
      throw err;
    }
  },

  /**
   * Get certificate by certificate number
   */
  getCertificate: async (certificateNumber) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(
        `${API_URL}/course/certificate/${certificateNumber}`
      );
      
      set({ 
        certificate: res.data.certificate,
        loading: false 
      });
      return res.data.certificate;
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to load certificate";
      set({
        error: errorMsg,
        loading: false,
      });
      throw err;
    }
  },

  // ==================== UTILITY FUNCTIONS ====================

  /**
   * Clear error
   */
  clearError: () => set({ error: null }),

  /**
   * Clear message
   */
  clearMessage: () => set({ message: null }),

  /**
   * Reset store
   */
  resetStore: () => set({
    course: null,
    courses: [],
    loading: false,
    error: null,
    message: null,
    activeEnrollments: [],
    expiredEnrollments: [],
    completedEnrollments: [],
    enrollmentStats: {},
    currentEnrollment: null,
    currentSection: null,
    sectionQuestions: [],
    certificate: null,
  }),
}));