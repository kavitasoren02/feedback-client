import { SidebarProvider, useSidebar } from "../../config/sidebar-provider";
import Header from "../comman/Header";
import Sidebar from "../comman/Sidebar";
import {cn} from '../../lib/utils/cn'
import MainScreen from "./screen";

const CommanLayout = ({ children }) => {
    return (
        <SidebarProvider>
            <div className="h-screen overflow-hidden bg-gray-50">
                <Sidebar />
                <div className="flex flex-col h-screen overflow-hidden">
                    <Header />
                    <MainScreen>
                        {children}
                    </MainScreen>
                </div>
            </div>
        </SidebarProvider>
    )
}
export default CommanLayout;