import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Style/index.css';

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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

// List of routes where header/footer should be hidden
const HIDDEN_LAYOUT_ROUTES = ["/register", "/login", "/classroom"];

function AppWrapper() {
  const location = useLocation();
  const isHiddenRoute = HIDDEN_LAYOUT_ROUTES.includes(location.pathname);

  return (
    <>
      {!isHiddenRoute ? <Header /> : <div className='second-header'><Main_Nav /> <MobileHeader /></div>}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog-page" element={<SingleBlog />} />
        <Route path="/pricing" element={<Plans />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/register" element={<Signin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/classroom" element={<Classroom />} />
      </Routes>

      {!isHiddenRoute && <Footer />}
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
