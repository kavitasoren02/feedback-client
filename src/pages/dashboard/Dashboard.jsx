import { useAuth } from "../../protected-route/auth-provider";
import EmployeeDashboard from "./employee";
import ManagerDashboard from "./manager";

const Dashboard = () => {
    const { user } = useAuth()
    
    if(user.role === 'manager') return <ManagerDashboard /> 

    else return <EmployeeDashboard />
}
export default Dashboard;