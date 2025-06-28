import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { _get, _post } from "../../lib/service/axios-provider";
import { API_ENDPOINTS } from "../../enums/endpoints.enum";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { InputWithLabel } from "../../components/comman/Input-with-label";
import PreviewForm from "../forms/preview-form";
import { generateFormSchema } from "../../lib/validation/generateValidation";
import { useFormik } from "formik";
import { useAuth } from "../../protected-route/auth-provider";
import { toast } from "react-toastify";

const FeebbackFormForEmployee = () => {
    const { formId } = useParams()
    const [form, setForm] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const navigate = useNavigate()
    const { user } = useAuth()
    const [isLoading, setIsLoading] = useState(false)

    const overAllSentiment = [
        { value: 'positive', label: 'Positive' },
        { value: 'negative', label: 'Negative' },
        { value: 'neutral', label: 'Neutral' },
    ]

    const extraFields = [
        {
            id: "strengths",
            name: "strengths",
            label: "Strengths",
            type: "text",
            placeholder: "Please enter your strengths",
            required: true
        },
        {
            id: "areas_to_improve",
            name: "areas_to_improve",
            label: "Area to Improve",
            type: "textarea",
            placeholder: "Please enter your area to improve",
            required: true
        },
        {
            id: "overall_sentiment",
            name: "overall_sentiment",
            label: "Overall Sentiment",
            type: "select",
            options: overAllSentiment,
            placeholder: "Please select your overall sentiment",
            required: true
        },
        {   
            id: "additional_notes",
            name: "additional_notes",
            label: "Additional Notes",
            type: "textarea",
            placeholder: "Please enter any additional notes",
            required: true
        }
    ]

    const getForm = async () => {
        try {
            setIsLoading(true)
            const { data } = await _get(`${API_ENDPOINTS.FORMS}/${formId}`)
            setForm(data)
        }
        catch (error) {

        }
        finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getForm()
    }, [formId])
    
    const { initialValues, validationSchema } = generateFormSchema(form.fields, extraFields)
    
    const formik = useFormik({
        initialValues: {
            ...initialValues,
            form_id: formId,
            employee_id: user.employee_id
        },
        validationSchema,
        onSubmit: async (values) => {
            setIsSubmitting(true)
            try{
                const { data } = await _post(`${API_ENDPOINTS.FORMS}/${formId}/submit`, values)
                toast.success('Your feedback has been submitted successfully')
                navigate("/employee/forms")
            }
            catch (error) {
                toast.warn("Failed to submit your feedback")
            }
            finally {
                setIsSubmitting(false)
            }
        },
        enableReinitialize: true 
    })

    return (
        <div className="bg-muted/30 py-8">
            <div className="max-w-7xl mx-auto p-6">
                {/* Back Button */}
                <div className="mb-6">
                    <Button variant="outline" onClick={() => navigate("/employee/forms")}>
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Forms
                    </Button>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <Card className="shadow-lg">
                        <CardHeader className="text-left">
                            <CardTitle className="text-2xl font-bold">{form.title}</CardTitle>
                            <CardDescription>{form.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-2">
                            <PreviewForm fields={form.fields} isDisabled={false} formik={formik} isFormData={true}/>
                            <PreviewForm fields={extraFields} isDisabled={false} formik={formik}/>
                        </CardContent>
                        <CardFooter>
                            {/* Submit Button */}
                            <div className="flex gap-4 pt-6">
                                <Button type="submit" className="flex-1" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <div className="flex items-center space-x-2">
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span>Submitting...</span>
                                        </div>
                                    ) : (
                                        "Submit Feedback"
                                    )}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => navigate("/employee/forms")}
                                    disabled={isSubmitting || isLoading}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </div>
    )
}
export default FeebbackFormForEmployee;