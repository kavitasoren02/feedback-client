import { X, ChevronDown } from "lucide-react"
import { useSidebar } from "../../config/sidebar-provider"
import { sidebarConfig } from "../../config/sidebar-config"
import { Link, useLocation } from "react-router-dom"

const Sidebar = () => {
    const { isOpen, toggleSidebar, userRole, isMobile } = useSidebar()
    const config = sidebarConfig[userRole] || []
    const { pathname } = useLocation()

    const handleLinkClick = () => {
        if (isMobile) {
            toggleSidebar()
        }
    }
    
    return (
        <>
            {/* Mobile Overlay */}
            {isMobile && isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleSidebar} />}

            {/* Sidebar */}
            <div
                className={`
                        fixed top-0 left-0 h-full bg-white border-r border-gray-200 shadow-lg z-50 transition-transform duration-300 ease-in-out
                        ${isOpen ? "translate-x-0" : "-translate-x-full"}
                        ${isMobile ? "w-80" : "w-74"}
                    `}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">{userRole.charAt(0).toUpperCase()}</span>
                        </div>
                        <div>
                            <h2 className="font-semibold text-gray-900">{config.title}</h2>
                            <p className="text-xs text-gray-500 capitalize">{userRole}</p>
                        </div>
                    </div>
                    <button onClick={toggleSidebar} className="p-1 rounded-md hover:bg-gray-100 transition-colors">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto p-4">
                    {config.sections.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="mb-6">
                            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">{section.title}</h3>
                            <ul className="space-y-1">
                                {section.items.map((item, itemIndex) => (
                                    <li key={itemIndex}>
                                        <Link
                                            to={item.href}
                                            onClick={handleLinkClick}
                                            className={`
                                                    flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                                                    ${pathname === item.href
                                                        ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                                                        : "text-gray-700 hover:bg-gray-100"
                                                    }
                                                `}
                                        >
                                            <item.icon className={`w-5 h-5 ${item.active ? "text-blue-700" : "text-gray-500"}`} />
                                            <span>{item.title}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </nav>
            </div>
        </>
    )
}

export default Sidebar
