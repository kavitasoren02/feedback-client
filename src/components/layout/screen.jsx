import { useSidebar } from "../../config/sidebar-provider";
import { cn } from "../../lib/utils/cn";

const MainScreen = ({ children }) => {
    const { isOpen, isMobile } = useSidebar()
    return (
        <div
            className={cn(
                `flex-1 transition-all duration-300 ease-in-out p-4 h-[calc(100dvh-200px)] overflow-y-auto overflow-x-hidden
                ${isOpen && !isMobile ? "ml-74" : "ml-0"}
            `)}
        >
            {children}
        </div>
    )
}
export default MainScreen;