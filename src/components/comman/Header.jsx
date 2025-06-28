import { HiMenu } from "react-icons/hi";
import { FaRegBell, FaUser, FaSignOutAlt, FaCog } from "react-icons/fa";
import { useSidebar } from "../../config/sidebar-provider"
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../protected-route/auth-provider";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const Header = () => {
    const { toggleSidebar } = useSidebar()
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const { user, handleLogout } = useAuth()
    const profileRef = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const getNameIcon = (name) => {
        return name.split(" ").map(item => item[0].toString().toUpperCase()).join("")
    }

    return (
        <header className="bg-white border-b border-gray-200 px-4 py-4.5">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <button onClick={toggleSidebar} className="p-2 rounded-md hover:bg-gray-100 transition-colors">
                        <HiMenu className="w-5 h-5 text-gray-600" />
                    </button>
                </div>

                <div className="flex items-center gap-5 relative" ref={profileRef}>
                    <Button 
                        variant="icon"
                        className="p-2 rounded-md hover:bg-gray-100 transition-colors relative"
                    >
                        <FaRegBell className="w-5 h-5 text-gray-600" />
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                    </Button>

                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center" onClick={() => setIsProfileOpen(!isProfileOpen)}>
                        <span className="text-white font-medium text-sm">{getNameIcon(user.full_name)}</span>
                    </div>

                    {/* Dropdown Menu */}
                    {isProfileOpen && (
                        <div className="absolute top-13 right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                            {/* User Info */}
                            <div className="px-4 py-3 border-b border-gray-100">
                                <p className="text-sm font-medium text-gray-900">{user.full_name}</p>
                                <p className="text-sm text-gray-500">{user.email}</p>
                            </div>

                            {/* Menu Items */}
                            <div className="py-1">
                                <Button 
                                    variant="ghost"
                                    className="w-full justify-start items-center"
                                    onClick={() => {
                                        setIsProfileOpen(false)
                                        navigate("/profile")}
                                    }
                                >
                                    <FaUser className="w-4 h-4 mr-3 text-gray-400" />
                                    Profile
                                </Button>

                                <hr className="my-1 border-gray-100" />

                                <Button
                                    variant="ghost"
                                    onClick={handleLogout}
                                    className="w-full justify-start items-center"
                                >
                                    <FaSignOutAlt className="w-4 h-4 mr-3 text-red-500" />
                                    Logout
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header
