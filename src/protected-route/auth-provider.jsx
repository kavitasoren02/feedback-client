import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { _get, _post } from "../lib/service/axios-provider";
import { API_ENDPOINTS } from "../enums/endpoints.enum";
import { toast } from "react-toastify";

const AuthContext = createContext(undefined);

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(undefined);
    const navigate = useNavigate();
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(0);

    async function fetchUser() {
        try {
            const { data } = await _get(API_ENDPOINTS.GET_INFO);
            setUser({
                ...data, id: data._id,
            });

            setLoadingAuth(false);
        } catch (error) {
            console.log({ error })
            setUser(null);
            setLoadingAuth(false);
        }
    }

    useEffect(() => {
        fetchUser();
    }, [isAuthenticated]);

    async function handleLogin(payload) {
        try {
            const { data } = await _post(API_ENDPOINTS.LOGIN, payload);
            setLoadingAuth(false);
            setIsAuthenticated(prev => prev + 1);
            return data;
        } catch (error) {
            setLoadingAuth(false);
            throw error;
        }
    }

    async function handleLogout() {
        console.log("sdkfjh")
        await _post(API_ENDPOINTS.LOGOUT)
        setUser(null);
        setLoadingAuth(false);
        navigate("/")
        toast.success("Logout successful");
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                handleLogin,
                handleLogout,
                loadingAuth,
                setLoadingAuth,
                fetchUser,
                setIsAuthenticated,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error("useAuth must be used inside of an AuthProvider");
    }

    return context;
}
