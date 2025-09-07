import { Route, Routes, Navigate } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import DashboardPage from "../pages/dashboard/DashboardPage";
import UploadPage from "../pages/upload/UploadPage";
import RulesPage from "../pages/rules/RulesPage";
import BreachesPage from "../pages/breaches/BreachesPage";
import AuditPage from "../pages/audit/AuditPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

export default function AppRoutes() {
  const isAuthed = true; // TODO: replace with real auth check

  if (!isAuthed) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/rules" element={<RulesPage />} />
        <Route path="/breaches" element={<BreachesPage />} />
        <Route path="/audit" element={<AuditPage />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AppLayout>
  );
}
