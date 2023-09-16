import { useLocation, Navigate, Outlet } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const PrivateRoutes = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return auth?.role === allowedRoles ? (
        <Outlet />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default PrivateRoutes;
