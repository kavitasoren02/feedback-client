import {
    Home,
    Users,
    Settings,
    BarChart3,
    Shield,
    FileText,
    UserCheck,
    Database,
    Mail,
    Calendar,
    CreditCard,
    HelpCircle,
} from "lucide-react"

export const sidebarConfig = {
    manager: {
        title: "Manager Dashboard",
        sections: [
            {
                title: "Dashboard",
                items: [
                    { title: "Dashboard", icon: Home, href: "/dashboard", active: true },
                ],
            },
            {
                title: "Management",
                items: [
                    { title: "Feedback Form", icon: Users, href: "/manager/forms" },
                    { title: "Employee", icon: Shield, href: "/manager/employees" }
                ],
            },
            {
                title: "Settings",
                items: [
                    { title: "Profile", icon: Settings, href: "/profile" },
                ]
            }
        ],
    },
    
    employee: {
        title: "Employee Dashboard",
        sections: [
            {
                title: "Main",
                items: [
                    { title: "Dashboard", icon: Home, href: "/dashboard", active: true },
                    { title: "Feedback Form", icon: FileText, href: "/employee/forms" },
                ],
            },
            {
                title: "Settings",
                items: [
                    { title: "Profile", icon: Settings, href: "/profile" },
                ]
            }
        ],
    },
    
}
