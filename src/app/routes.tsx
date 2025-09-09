import { Route, Routes, Navigate } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Protected from "./Protected";
import DashboardPage from "../pages/dashboard/DashboardPage";
import UploadPage from "../pages/upload/UploadPage";
import RulesPage from "../pages/rules/RulesPage";
import BreachesPage from "../pages/breaches/BreachesPage";
import AuditPage from "../pages/audit/AuditPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import NotFoundPage from "../pages/notfound/NotfoundPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<Protected />}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/rules" element={<RulesPage />} />
          <Route path="/breaches" element={<BreachesPage />} />
          <Route path="/audit" element={<AuditPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
