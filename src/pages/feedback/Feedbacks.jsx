import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { API_ENDPOINTS } from "../../enums/endpoints.enum";
import { _get } from "../../lib/service/axios-provider";
import { formatDateIn12Hr } from "../../lib/utils/formatter";
import { getStatusColor } from '../../lib/utils/helper'
import { useNavigate } from "react-router-dom";

const Feedbacks = () => {
    const [availableForms, setAvailableForms] = useState([])
    const [selectedFormId, setSelectedFormId] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchForms = async () => {
            setIsLoading(true)
            try{
                const { data } = await _get(API_ENDPOINTS.FORMS)
                setAvailableForms(data)
            }
            finally {
                setIsLoading(false)
            }
        }
        fetchForms()
    }, [])

    return (
        <div className="min-h-full bg-muted/30 py-8">
            <div className="max-w-7xl mx-auto p-6 space-y-8">
                {/* Header */}
                <div className="">
                    <h1 className="text-3xl font-bold text-foreground">Employee Feedback Forms</h1>
                    <p className="text-muted-foreground mt-2">Select a feedback form below to share your valuable input.</p>
                </div>

                {availableForms.length === 0 ? (
                    <Card className="h-64 flex items-center justify-center">
                        <CardContent className="text-center">
                            <div className="text-6xl mb-4">🤷‍♀️</div>
                            <h3 className="text-xl font-semibold mb-2">No Forms Available</h3>
                            <p className="text-muted-foreground">There are no active feedback forms at the moment.</p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {availableForms.map((form) => (
                            <Card
                                key={form._id}
                                className={`shadow-md hover:shadow-lg transition-shadow ${!form.is_active ? "opacity-70 cursor-not-allowed" : ""
                                    }`}
                            >
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-lg">{form.title}</CardTitle>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(form.is_active)}`}>
                                            {form.is_active}
                                        </span>
                                    </div>
                                    <CardDescription className="line-clamp-2">{form.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-sm text-muted-foreground">Last updated: {formatDateIn12Hr(form.updated_at)}</div>
                                </CardContent>
                                <CardFooter className="flex flex-col gap-2">
                                    <Button
                                        className="w-full"
                                        onClick={() => navigate(`/employee/form/${form._id}`)}
                                        disabled={form.is_active === "Closed"}
                                    >
                                        {!form.is_active ? "Form Closed" : "Start Form"}
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        className="w-full"
                                        onClick={() => navigate(`/employee/form/submission/${form._id}`)}
                                        disabled={form.is_active === "Closed"}
                                    >
                                        Your submission
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
export default Feedbacks;