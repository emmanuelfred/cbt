// newletterStore.js
import axios from "axios";
import { create } from "zustand";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const usecourseStore = create((set) => ({
  course:{},
    courses:[],
  loading: false,
  error: null,
  message: null,
  fetchRecommendedCourses: async ()=>{
    set({Loading: true, error: null})
     try {
     const res = await axios.get(`${API_URL}/course/recommendations`);
      console.log(res.data.exams);
      set({ courses: res.data.courses, loading: false });
      } catch (err) {
      console.error("Failed to fetch exams:", err);
      set({ error: "Failed to load courses. Please try again.", loading: false });
    }

  },
  fetchCoursedetail : async (courseId) => {
       set({ loading: true, error: null });
    try {
      const res = await axios.get(`${API_URL}/course/course-detail/${courseId}`);
    
      set({  course: res.data.course, loading: false });
    } catch (err) {
      console.error("Course not found:", err);
      set({ error: "Failed to load course details", loading: false });
    }
    },
    enroll: async(courseId,userId)=>{
      set({loading:true,error:null})
             try{
          const response = await axios.post(`${API_URL}/course/enroll`, { 
         courseId,userId
          });
			set({
				massage:response.data.message,
				error: null,
				Loading: false,
			});

        }catch  (error){
          set({ error: error.response?.data?.message || "Error recording Attempt", Loading: false });
			throw error;
        }
    }


}));
