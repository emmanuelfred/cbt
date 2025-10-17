import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Style/index.css';

import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import 'aos/dist/aos.css';
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Header from "./Components/Header/Header";
import Blog from "./Pages/Blog";
import Plans from "./Pages/Plans";
import Signin from "./Pages/Signin";
import Main_Nav from "./Components/Header/Header_main/Main_Nav";
import Login from "./Pages/Login";
import TermsAndConditions from "./Pages/TermsAndConditions";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import SingleBlog from "./Pages/SingleBlog";
import MobileHeader from "./Components/Header/Mobile/MobileHeader";
import Classroom from "./Pages/Classroom";
import ContactUs from "./Pages/ContactUs";
import VerifyEmail from "./Pages/VerifyEmail";
import LoadingSpinner from "./Components/LoadingSpinner";


import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import AddCourseForm from "./Pages/AddCourseForm";
import Unsubscribe from "./Pages/Unsubscribe";
import TakeCourse from "./Pages/TakeCourse";
import CoursePage from "./Pages/CoursePage";
import Chatbot from "./Pages/Chatbot";
import CalculatorTool from "./Pages/CalculatorTool";
import DictionaryTool from "./Pages/DictionaryTool";
// List of routes where header/footer should be hidden
const HIDDEN_LAYOUT_ROUTES = ["/register", "/login", "/classroom",'/verify-email','/unsubscribe','/course'];
const Apppage=['/ai-chatbox','/calculator','/dictionary']
// protect routes that require authentication
const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (!isAuthenticated) {
		return <Navigate to='/login' replace />;
	}

	if (!user.isVerified) {
		return <Navigate to='/verify-email' replace />;
	}

	return children;
};

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (isAuthenticated && user.isVerified) {
		return <Navigate to='/classroom' replace />;
	}

	return children;
};

function AppWrapper() {
   const location = useLocation();
  const isHiddenRoute = HIDDEN_LAYOUT_ROUTES.includes(location.pathname);
  const isAppPage=Apppage.includes(location.pathname);

  const { isCheckingAuth, checkAuth } = useAuthStore();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	if (isCheckingAuth) return <LoadingSpinner />;

 
  return (
    <>
      {/* ✅ Header logic */}
      {!isAppPage && ( // hide header for app pages
        !isHiddenRoute ? (
          <Header />
        ) : (
          <div className="second-header">
            <Main_Nav />
            <MobileHeader />
          </div>
        )
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog-page" element={<SingleBlog />} />
        <Route path="/pricing" element={<Plans />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/register" element={<Signin />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/unsubscribe" element={<Unsubscribe/>} />
        <Route path="/ai-chatbox" element={<Chatbot/>} />
        <Route path="/calculator" element={<CalculatorTool/>} />
         <Route path="/dictionary" element={<DictionaryTool/>} />

        
        <Route path="/login" element={
          <RedirectAuthenticatedUser>
							<Login />
						</RedirectAuthenticatedUser>
          } />
          <Route path="/course" element={
          <ProtectedRoute>
							<CoursePage/>
						</ProtectedRoute>
          } />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/classroom" element={ <ProtectedRoute><Classroom /></ProtectedRoute>} />
         <Route path="/test" element={<AddCourseForm />} />

      </Routes>

      {!isHiddenRoute && !isAppPage && <Footer />}
      	<Toaster />
    </>
  );
}

function App() {
  return (
    <div className="App">
      <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
        <Router>
          <AppWrapper />
        </Router>
      </SkeletonTheme>
    </div>
  );
}

export default App;
