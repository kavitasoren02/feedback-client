import { Navigate } from "react-router-dom"
import Loader from "../components/ui/loader"
import { DEFAULT_ROUTE_MAPPING_BY_USER_ROLE } from "../config/config"
import { useAuth } from "./auth-provider"

const ProtectedRoute = ({ allowedRoles, children }) => {
    const { user } = useAuth()

    if (user === undefined) {
        return <Loader />
    }

    if(user === null){
        return <Navigate to={"/auth/login"} />
    }

    const redirectRoute =
        user === null || (allowedRoles && !allowedRoles.includes(user?.role))
            ? DEFAULT_ROUTE_MAPPING_BY_USER_ROLE[user?.role]
            : null;

    if (redirectRoute) {
        return <Navigate to={redirectRoute} replace />;
    }
    return children;
}
export default ProtectedRoute