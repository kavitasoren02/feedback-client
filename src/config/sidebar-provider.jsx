import { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "../protected-route/auth-provider"

const SidebarContext = createContext()

export const SidebarProvider = ({ children }) => {
    const { user } = useAuth()
    const [isOpen, setIsOpen] = useState(true)
    const [userRole, setUserRole] = useState("employee")
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        if(user) setUserRole(user.role)
    }, [user?.role])

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
            if (window.innerWidth < 768) {
                setIsOpen(false)
            }
        }

        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    }, [])

    const toggleSidebar = () => {
        setIsOpen(!isOpen)
    }

    const value = {
        isOpen,
        setIsOpen,
        toggleSidebar,
        userRole,
        setUserRole,
        isMobile,
    }

    return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
}

export const useSidebar = () => {
    const context = useContext(SidebarContext)
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider")
    }
    return context
}