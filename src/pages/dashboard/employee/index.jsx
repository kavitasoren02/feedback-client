import { useEffect, useState } from "react";
import { useAuth } from "../../../protected-route/auth-provider";
import { _get, _post } from "../../../lib/service/axios-provider";
import { API_ENDPOINTS } from "../../../enums/endpoints.enum";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { TableHeaderForTeam } from "./constant";
import { formatDateIn12Hr } from '@/lib/utils/formatter'
import { Check } from "lucide-react";
import { cn } from "../../../lib/utils/cn";
import { toast } from "react-toastify";

const EmployeeDashboard = () => {
    const { user } = useAuth()
    const [dashboardData, setDashboardData] = useState()
    const [referesh, setReferesh] = useState(0)

    const getDashboardData = async () => {
        try {
            const { data } = await _get(API_ENDPOINTS.EMPLOYEE_DASHBOARD)
            setDashboardData(data)
        }
        catch (error) {
            // Do nothing
        }
        finally {
            // Do nothing
        }
    }

    useEffect(() => {
        getDashboardData()
    }, [referesh])

    const getPresentage = (val) => {
        const total = dashboardData?.sentiment_distribution.positive + dashboardData?.sentiment_distribution.negative + dashboardData?.sentiment_distribution.neutral
        return (val / total) * 100;
    }

    const handlerAcknowledge = async(id) => {
        try{
            const { data } = await _post(`${API_ENDPOINTS.FEEDBACK}/${id}/acknowledge`)
            toast.success("Feedback acknowledged.")
            setReferesh(prev => prev + 1)
        }
        catch (error){
            toast.error("Error acknowledging feedback")
        }
    }

    return (
        <div>
            <div className="bg-muted/30 p-6">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Header Section */}
                    <div className="flex flex-col sm:flex-row md:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-foreground">
                                Welcome back, <span className="text-primary">{user.full_name}</span>
                            </h1>
                            <p className="text-muted-foreground mt-1">Here's what's happening with your team today</p>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" onClick={() => setReferesh(prev => prev + 1)}>
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                    />
                                </svg>
                                Refresh
                            </Button>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Team Size */}
                        <Card className="shadow-md hover:shadow-lg transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">Total Feedback</CardTitle>
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-foreground">{dashboardData?.total_feedback_received}</div>
                                <p className="text-xs text-muted-foreground mt-1">Total feedback recieved</p>
                            </CardContent>
                        </Card>

                        {/* Total Feedback */}
                        <Card className="shadow-md hover:shadow-lg transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">Unacknowledged Feedback</CardTitle>
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                        />
                                    </svg>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-foreground">{dashboardData?.unacknowledged_count}</div>
                                <p className="text-xs text-muted-foreground mt-1">Unacknowledged Feedback Count</p>
                            </CardContent>
                        </Card>

                        {/* Total Active Feedback form */}
                        <Card className="shadow-md hover:shadow-lg transition-shadow md:col-span-2 lg:col-span-1">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">Total Active Forms</CardTitle>
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                        />
                                    </svg>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-foreground">{dashboardData?.available_forms_count}</div>
                                <p className="text-xs text-muted-foreground mt-1">Total Active Feedback Form</p>
                            </CardContent>
                        </Card>
                    </div>
                    {/* Main Container */}
                    <div className="w-full grid-cols-2">
                        <Card className="md:col-span-2 lg:col-span-2 shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold">Feedback Sentiment Analysis</CardTitle>
                                <p className="text-sm text-muted-foreground">Breakdown of feedback sentiment trends</p>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    {/* Sentiment Bars */}
                                    <div className="space-y-4">
                                        {/* Positive */}
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm font-medium text-green-700">Positive</span>
                                                <span className="text-sm text-muted-foreground">
                                                    {dashboardData?.sentiment_distribution.positive}
                                                    ({getPresentage(dashboardData?.sentiment_distribution.positive)}%)
                                                </span>
                                            </div>
                                            <div className="w-full bg-muted rounded-full h-3">
                                                <div
                                                    className="bg-green-500 h-3 rounded-full transition-all duration-500"
                                                    style={{ width: `${getPresentage(dashboardData?.sentiment_distribution.positive)}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                        {/* Neutral */}
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm font-medium text-yellow-700">Neutral</span>
                                                <span className="text-sm text-muted-foreground">
                                                    {dashboardData?.sentiment_distribution.neutral}
                                                    ({getPresentage(dashboardData?.sentiment_distribution.neutral)}%)
                                                </span>
                                            </div>
                                            <div className="w-full bg-muted rounded-full h-3">
                                                <div
                                                    className="bg-yellow-500 h-3 rounded-full transition-all duration-500"
                                                    style={{ width: `${getPresentage(dashboardData?.sentiment_distribution.neutral)}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                        {/* Negative */}
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm font-medium text-red-700">Negative</span>
                                                <span className="text-sm text-muted-foreground">
                                                    {dashboardData?.sentiment_distribution.negative}
                                                    ({getPresentage(dashboardData?.sentiment_distribution.negative)}%)
                                                </span>
                                            </div>
                                            <div className="w-full bg-muted rounded-full h-3">
                                                <div
                                                    className="bg-red-500 h-3 rounded-full transition-all duration-500"
                                                    style={{ width: `${getPresentage(dashboardData?.sentiment_distribution.negative)}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Latest Feedback  */}
                    <div className="w-full grid-cols-2">
                        <Card className="md:col-span-2 lg:col-span-2 shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold">Latest Feedback</CardTitle>
                                <p className="text-sm text-muted-foreground">You can see latest feedback of your team</p>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            {TableHeaderForTeam.map((item) => <TableHead key={item.daraIndex}>{item.title}</TableHead>)}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {dashboardData?.recent_feedback?.map(item => (
                                            <TableRow key={item.overall_sentiment}>
                                                <TableCell>{item.employee_id}</TableCell>
                                                <TableCell>{item.overall_sentiment}</TableCell>
                                                <TableCell>{item.is_acknowledged ? "Acknowledged" : 'Pending'}</TableCell>
                                                <TableCell>{formatDateIn12Hr(item.acknowledged_at)}</TableCell>
                                                <TableCell>
                                                    {!item.is_acknowledged ? <Button 
                                                        variant="icon" 
                                                        className={cn(!item.is_acknowledged && "text-green-500")}
                                                        onClick={() => handlerAcknowledge(item._id)}
                                                    >
                                                        <Check />
                                                    </Button> : "---"}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default EmployeeDashboard;