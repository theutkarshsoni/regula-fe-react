import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/auth";

export default function Protected() {
  const { user, token } = useAuthStore();
  const isAuthed = !!user || !!token;
  const loc = useLocation();

  return isAuthed ? <Outlet /> : <Navigate to="/login" replace state={{ from: loc }} />;
}
