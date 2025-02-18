// UserProtected.tsx
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../redux/store";

const AgentProtected = () => {
    const { agentInfo } = useSelector((state: RootState) => state.agentAuth);
    return agentInfo ? <Outlet /> : <Navigate to="/agent/login" replace />;
};

export default AgentProtected;
