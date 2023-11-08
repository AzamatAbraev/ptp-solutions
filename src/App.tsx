import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Cookies from "js-cookie";

import { TOKEN } from "./constants";

import AdminLayout from "./components/layout/admin";
import FrontLayout from "./components/layout/front";

import HomePage from "./pages/public/home";
import LoginPage from "./pages/public/login";
import RegisterPage from "./pages/public/register";
import AccountPage from "./pages/public/account";
import NotFoundPage from "./pages/public/not-found";

import DashboardPage from "./pages/admin/dashboard";
import SkillsPage from "./pages/admin/skills";
import EducationPage from "./pages/admin/education";
import PortfoliosPage from "./pages/admin/portfolios";
import ExperiencePage from "./pages/admin/experience";
import UsersPage from "./pages/admin/users";
import MessagesPage from "./pages/admin/messages";
import useAuth from "./zustand/auth";

function App() {
  const {isAuthenticated} = useAuth();
  
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<FrontLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/account"
            element={Cookies.get(TOKEN) ? <AccountPage /> : <Navigate to="/" />}
          />
        </Route>
        <Route
          element={isAuthenticated ? <AdminLayout /> : <Navigate to="/login" />}
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/portfolios" element={<PortfoliosPage />} />
          <Route path="/experiences" element={<ExperiencePage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/messages" element={<MessagesPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
