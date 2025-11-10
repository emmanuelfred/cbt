import { Routes, Route, useLocation } from 'react-router-dom';

import Home from './Pages/Home';
import Header from './Component/Header';
import Footer from './Component/Footer';
import Preloader from './Component/Preloader';
import ToolHub from './Component/ToolHub';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import StartCBT from './Pages/StartCBT';
import CourseDetail from './Pages/CourseDetail';
import CourseSearchPage from './Pages/CourseSearch';
import Blog from './Pages/Blog';
import BlogDetail from './Pages/BlogDetail';
import CourseViewer from './Pages/CourseViewer';
import CBTComponent from './Pages/CBTComponent';
import EmailVerificationPage from './Pages/EmailVerificationPage';
import ForgetPassword from './Pages/ForgetPassword';
import ResetPassword from './Pages/ResetPassword';
import VerifyPassword from './Pages/VerifyPassword';

// Dashboard Layout and Nested Pages
import Dashboard from './Pages/Dashboard';
import DashboardHome from './Pages/Dashboard/TrackProgress';
import CBTPage from './Pages/Dashboard/TakeCBT';
import RegisterCourse from './Pages/Dashboard/RegisterCourse';
import ActiveCourse from './Pages/Dashboard/ActiveCourse';
import ChatRoom from './Pages/Dashboard/ChatRoom';
import Profile from './Pages/Dashboard/Profile';
import Payment from './Pages/Dashboard/Payment';

function App() {
  const location = useLocation();

  // Routes where Header/Footer should be hidden
  const hideLayoutRoutes = ['/dashboard'];

  // Check if the route starts with any dashboard path
  const isDashboardRoute = hideLayoutRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <div className={isDashboardRoute ? '' : 'p-2'}>
      <Preloader />
      <ToolHub />

      {!isDashboardRoute && <Header />}

      <Routes>
        {/* Main Site Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
        <Route path="/forget_password" element={<ForgetPassword />} />
        <Route path="/verify_password" element={<VerifyPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/start_cbt" element={<StartCBT />} />
        <Route path="/start_cbt/:exam" element={<CBTComponent />} />
        <Route path="/courses" element={<CourseSearchPage />} />
        <Route path="/course/:id" element={<CourseDetail />} />
        
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />

        {/* Dashboard Nested Routes */}
        <Route path="/dashboard/*" element={<Dashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="cbt" element={<CBTPage />} />
          <Route path="register" element={<RegisterCourse />} />
          <Route path="active" element={<ActiveCourse />} />
          <Route path="chat" element={<ChatRoom />} />
          <Route path="profile" element={<Profile />} />
          <Route path="payment" element={<Payment />} />
          <Route path="course/:token" element={<CourseViewer />} />
        </Route>
      </Routes>

      {!isDashboardRoute && <Footer />}
    </div>
  );
}

export default App;
