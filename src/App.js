import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Login from "./pages/loginPage/loginPage.js";
import ForgotPassword from "./pages/forgotPassword/forgotPassword.js";
import Register from "./pages/registerPage/register.js";
import HomePage from "./pages/homePage/homePage.js";
import ProfilePage from "./pages/profilePage/userProfile.js";
import AdminPage from "./pages/adminPage/adminPage.js";
import AdminUsers from "./pages/adminPage/adminUsers.js";
import AdminSettings from "./pages/adminPage/adminProfilePage.js";
import "./App.css";
import { jwtDecode } from "jwt-decode";

import { cookies } from "./utils/cookie";
import LandingPage from "./pages/landingPage/index.js";
import MainLayout from "./layouts/MainLayout.js";
import AdminLayout from "./layouts/AdminLayout.js";
import GridPage from "./pages/gridPageTemplate/index.js";
import ComponentsPage from "./pages/ComponentsPage/index.js";
const NotFound = () => {
  return (
    <div
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        display: "flex",
        mt: "10%",
        gap: 10,
      }}
    >
      <h1 style={{ gap: 1, display: "flex" }}>
        Aradığınız sayfa bulunamadı veya bu sayfayı görmeye yetkiniz yok.{"\t"}
      </h1>
    </div>
  );
};

function AppRoutes() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  let userRole;
  useEffect(() => {
    const checkAuth = async () => {
      const jwtToken = cookies.get("jwt-access");

      if (jwtToken) {
        const decodedToken = jwtDecode(jwtToken);
        const userRole = decodedToken.role;
        if (userRole === "admin" && !location.pathname.startsWith("/admin")) {
          navigate("/admin");
        } else if (
          userRole === "user" &&
          location.pathname.startsWith("/admin")
        ) {
          navigate("/NotFound");
        }
      } else if (!jwtToken) {
        if (
          !["/register", "/forgot-password", "/login"].includes(
            location.pathname
          )
        ) {
          navigate("/login");
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [navigate, location]);

  if (isLoading) {
    return <div>...</div>; // veya bir yükleme spinner'ı
  }
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/register" element={<Register />} />

      <Route path="/" element={<MainLayout />}>
        <Route
          index
          element={
            window.location.hostname ===
            process.env.REACT_APP_LANDING_PAGE_DOMAIN ? (
              <LandingPage />
            ) : (
              <Navigate to="/homepage" replace />
            )
          }
        />
        <Route path="homepage" element={<HomePage />} />
        <Route path="user/profile" element={<ProfilePage />} />
        <Route path="user/gridPage" element={<GridPage />} />
        <Route path="user/components" element={<ComponentsPage />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminPage />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="users" element={<AdminUsers />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
