import { useAuth } from "./auth-provider";
import Loader from "../components/ui/loader";
import { DEFAULT_ROUTE_MAPPING_BY_USER_ROLE } from "../config/config";
import { Navigate } from "react-router-dom";

export default function NoAuthRoute({ children }) {
    const { user } = useAuth();

    if (user === undefined) {
        return <Loader />;
    }

    if(user !== null && user !== undefined) {
        const path = DEFAULT_ROUTE_MAPPING_BY_USER_ROLE[user?.role]
        return (
            <Navigate to={path} replace/>
        )
    }

    return children;
}
