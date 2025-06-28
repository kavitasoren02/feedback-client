import { useEffect, useState } from "react"
import { _delete, _get, _post, _put } from "../../../lib/service/axios-provider"
import { API_ENDPOINTS } from "../../../enums/endpoints.enum"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { formatDateIn12Hr } from '@/lib/utils/formatter'
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import PreviewForm from "../preview-form"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table"
import { Check } from "lucide-react"
import { cn } from "../../../lib/utils/cn"


const getStatusColor = (status) => {
    switch (status) {
        case "published":
            return "bg-green-100 text-green-800"
        case "draft":
            return "bg-yellow-100 text-yellow-800"
        default:
            return "bg-gray-100 text-gray-800"
    }
}

const FormList = () => {
    const [formListData, setFormListData] = useState([])
    const [selectedForm, setSelectedForm] = useState()
    const [previewMode, setPreviewMode] = useState(false)
    const navigate = useNavigate()
    const [updateList, setUpdateList] = useState(0)
    const [showAnalyticks, setShowAnalyticks] = useState(false)
    const [feedback, setFeedback] = useState([])

    const getData = async () => {
        try {
            const { data } = await _get(API_ENDPOINTS.FORMS)
            setFormListData(data)
        }
        catch (error) {
            // Do Nothing
        }
        finally {
            // Do Nothing
        }
    }

    useEffect(() => {
        getData()
    }, [updateList])

    const handleFormAction = async (action, id) => {
        if (action === "delete") {
            if (window.confirm("Are you sure you want to delete this form?")) {
                try {
                    const { data } = await _delete(`${API_ENDPOINTS.DELETE_FORM}/${id}`)
                    toast.success(data.message)
                    setSelectedForm(undefined)
                }
                catch (error) {
                    toast.error(error.message)
                }
                finally {
                    setUpdateList(prev => prev + 1)
                }
            }
        }
        else if (action === "publish" || action === "unpublish") {
            if (window.confirm(`Are you sure you want to ${action} this form?`)) {
                try {
                    const { data } = await _put(`${API_ENDPOINTS.UPDATE_FORM}/${id}`, {
                        is_active: action === "publish" ? true : false
                    })
                    setSelectedForm(data)
                    toast.success("Your form status has been successfully updated")
                }
                catch (error) {
                    toast.error(error.message)
                }
                finally {
                    setUpdateList(prev => prev + 1)
                }
            }
        }
        else if (action === "edit") {
            navigate(`/manager/forms/edit/${id}`)
        }
    }

    const getFeedback = async () => {
        const id = selectedForm._id
        try {
            const { data } = await _get(`${API_ENDPOINTS.FORMS}/${id}/submissions`)
            setFeedback(data)
        }
        catch {
            toast.error("Error getting feedback")
        }
    }

    useEffect(() => {
        if (selectedForm?._id) {
            getFeedback()
        }
    }, [selectedForm?._id])

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Created Forms</h1>
                    <p className="text-muted-foreground mt-1">Manage and preview your created forms</p>
                </div>
                <Button onClick={() => navigate("/manager/forms/add")}>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Create New Form
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Forms List */}
                <div className="lg:col-span-1 space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Your Forms ({formListData.length})</CardTitle>
                            <CardDescription>Click on a form to view and manage it</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {formListData?.map((form) => (
                                <div
                                    key={form._id}
                                    className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${selectedForm?._id === form._id
                                        ? "border-primary bg-primary/5"
                                        : "border-border hover:border-primary/50"
                                        }`}
                                    onClick={() => setSelectedForm(form)}
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="font-medium text-foreground truncate">{form.title}</h3>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(form.status)}`}>
                                            {form.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{form.description}</p>
                                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                                        <span>{form.fields.length} fields</span>
                                        <span>{form.submissions} submissions</span>
                                    </div>
                                    <div className="text-xs text-muted-foreground mt-1">Updated {formatDateIn12Hr(form.updated_at || form.created_at)}</div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Form Details and Preview */}
                <div className="lg:col-span-2">
                    {selectedForm ? (
                        <div className="space-y-6">
                            {/* Form Info */}
                            <Card>
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <CardTitle className="flex items-center gap-2">
                                                {selectedForm.title}
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedForm.status)}`}
                                                >
                                                    {selectedForm.status}
                                                </span>
                                            </CardTitle>
                                            <CardDescription className="mt-1">{selectedForm.description}</CardDescription>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm" onClick={() => handleFormAction("edit", selectedForm._id)}>
                                                Edit
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                {!previewMode ? (
                                    <CardContent>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                            <div>
                                                <span className="text-muted-foreground">Fields:</span>
                                                <div className="font-medium">{selectedForm.fields.length}</div>
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground">Submissions:</span>
                                                <div className="font-medium">{selectedForm.submission_count}</div>
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground">Created:</span>
                                                <div className="font-medium">{formatDateIn12Hr(selectedForm.created_at)}</div>
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground">Updated:</span>
                                                <div className="font-medium">{formatDateIn12Hr(selectedForm.updated_at)}</div>
                                            </div>
                                        </div>
                                    </CardContent>) : (
                                    <CardContent>
                                        <div className="flex flex-col gap-3">
                                            <PreviewForm
                                                fields={selectedForm.fields}
                                            />
                                        </div>
                                    </CardContent>
                                )}
                            </Card>

                            {/* Form Actions */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Form Actions</CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col gap-4">
                                    <div className="flex flex-wrap gap-2">
                                        {!selectedForm.is_active ? (
                                            <Button variant="outline" size="sm" onClick={() => handleFormAction("publish", selectedForm._id)}>
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                    />
                                                </svg>
                                                Publish
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleFormAction("unpublish", selectedForm._id)}
                                            >
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 12l2 2 4-4"
                                                    />
                                                </svg>
                                                Unpublish
                                            </Button>
                                        )}
                                        <Button variant="outline" size="sm" onClick={() => setShowAnalyticks(true)}>
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                                />
                                            </svg>
                                            Analytics
                                        </Button>
                                        <Button variant="destructive" size="sm" onClick={() => handleFormAction("delete", selectedForm._id)}>
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                />
                                            </svg>
                                            Delete
                                        </Button>
                                    </div>

                                    {/* Form Preview/Fields */}
                                    <Card className="p-5">
                                        <CardContent>
                                            {feedback.length > 0 ? <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Employee Id</TableHead>
                                                        {Object.keys(feedback[0]?.form_data?.form_data ?? {}).map(item => (
                                                            <TableHead key={item}>
                                                                {item
                                                                    .split('_')
                                                                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                                                    .join(' ')
                                                                }
                                                            </TableHead>
                                                        ))}
                                                        <TableHead>Strengths</TableHead>
                                                        <TableHead>Areas To Improve</TableHead>
                                                        <TableHead>Overall Sentiment</TableHead>
                                                        <TableHead>Additional Notes</TableHead>
                                                        <TableHead>Acknowledged</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {feedback.map((item, index) => (
                                                        <TableRow key={item._id}>
                                                            <TableCell>{item.employee_id}</TableCell>
                                                            {Object.keys(item?.form_data?.form_data ?? {}).map(objectKey => {
                                                                const object = item.form_data.form_data[objectKey]
                                                                console.log({object})
                                                                return <TableCell>{typeof object === "string" ? object : object.join(", ")}</TableCell>
                                                            })}
                                                            <TableCell>{item.form_data.strengths}</TableCell>
                                                            <TableCell>{item.form_data.areas_to_improve}</TableCell>
                                                            <TableCell>{item.form_data.overall_sentiment}</TableCell>
                                                            <TableCell>{item.form_data.additional_notes}</TableCell>
                                                            <TableCell className={cn(!item.is_acknowledged && "text-green-500")}>{item.is_acknowledged ? 'Acknowledge' : 'Not Acknowledge'}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table> : (
                                                <div className="p-3 text-center">
                                                    <div className="text-6xl mb-4">📝</div>
                                                    <CardTitle className="text-center">No Feedback Submission found</CardTitle>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                </CardContent>
                            </Card>
                        </div>
                    ) : (
                        /* No Form Selected */
                        <Card className="h-96 flex items-center justify-center">
                            <CardContent className="text-center">
                                <div className="text-6xl mb-4">📝</div>
                                <h3 className="text-xl font-semibold mb-2">Select a Form</h3>
                                <p className="text-muted-foreground">Choose a form from the list to view its details and preview</p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    )
}
export default FormList;