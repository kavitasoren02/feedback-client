import { InputWithLabel } from "../../components/comman/Input-with-label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { useAuth } from "../../protected-route/auth-provider";

const Profile = () => {
    const { user } = useAuth()
    return (
        <div className="w-full">
            <Card 
                className="max-w-7xl mx-auto"
            >
                <CardHeader>
                    <CardTitle>Profile</CardTitle>
                    <CardDescription>You can only see your self</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                    <InputWithLabel 
                        type="text"
                        label="Full Name"
                        value={user.full_name}        
                        disabled
                        className="col-span-1"
                    />
                    <InputWithLabel 
                        type="text"
                        label="Email"
                        value={user.email}        
                        disabled
                        className="col-span-1"
                    />
                    <InputWithLabel 
                        type="text"
                        label="Role"
                        value={user.role}        
                        disabled
                        className="col-span-1"
                    />
                    <InputWithLabel 
                        type="text"
                        label="Department"
                        value={user.department}        
                        disabled
                        className="col-span-1"
                    />
                    <InputWithLabel 
                        type="text"
                        label="Employee Id"
                        value={user.employee_id}        
                        disabled
                        className="col-span-1"
                    />
                    <InputWithLabel 
                        type="text"
                        label="Manager Id"
                        value={user.manager_id}        
                        disabled
                        className="col-span-1"
                    />
                </CardContent>
            </Card>
        </div>
    )
}
export default Profile;