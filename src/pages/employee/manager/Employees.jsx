import { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import { _get } from "../../../lib/service/axios-provider";
import { API_ENDPOINTS } from "../../../enums/endpoints.enum";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { HeaderForEmployeeTable } from "./constant";
import { formatDateIn12Hr } from "../../../lib/utils/formatter";
import { cn } from "../../../lib/utils/cn";
import { useNavigate } from "react-router-dom";
import { Card } from "../../../components/ui/card";

const Employees = () => {
    const [employees, setEmployees] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const getEmployees = async() => {
        setIsLoading(true)
        try{
            const {data} = await _get(API_ENDPOINTS.GET_EMPLOYEES)
            setEmployees(data)
        }
        finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getEmployees()
    }, [])

    console.log({employees})
    
    return (
        <div className="flex flex-col gap-10 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Employees <span className="text-gray-500">{employees.length.toString().padStart(2, "0")}</span></h1>
                    <p className="text-muted-foreground mt-1">Manage and preview your team member...</p>
                </div>
            </div>

            {/* Table */}
            <Card className="p-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {HeaderForEmployeeTable.map(item => <TableHead key={item.value}>{item.label}</TableHead>)}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            employees?.map(item => (
                                <TableRow key={item._id}>
                                    <TableCell>{item.full_name}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.department}</TableCell>
                                    <TableCell>{formatDateIn12Hr(item.created_at)}</TableCell>
                                    <TableCell className={cn(item.is_active ? 'text-green-700' : 'text-orange-600')}>{item.is_active ? "Active" : 'De-Activated'}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </Card>
        </div>
    )
}
export default Employees;