// UserProtected.tsx
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../redux/store";

const AdminProtected = () => {
    const { adminInfo } = useSelector((state: RootState) => state.adminAuth);
    return adminInfo ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default AdminProtected;
