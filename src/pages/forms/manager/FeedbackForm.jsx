import { FormikProvider, useFormik } from "formik"
import { useEffect, useState } from "react"
import { FIELD_TYPES_WITH_OPTIONS, formConfigSchema, VALID_FIELD_TYPES } from "../../../lib/validation/form-builder"
import { toast } from "react-toastify"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { InputWithLabel } from "../../../components/comman/Input-with-label"
import { Button } from "../../../components/ui/button"
import { Plus, PlusCircle, Trash2 } from "lucide-react"
import { Label } from "../../../components/ui/label"
import { _get, _post, _put } from "../../../lib/service/axios-provider"
import { API_ENDPOINTS } from "../../../enums/endpoints.enum"
import { useNavigate, useParams } from "react-router-dom"

const FeebbackForm = () => {
    const navigate = useNavigate()
    const { formId } = useParams()
    const [isGettingForm, setIsGettingForm] = useState(false)
    
    const initialValues = {
        title: "",
        description: "",
        fields: [
            {
                id: "",
                label: "",
                type: "",
                required: false,
                options: [],
                placeholder: "",
            },
        ],
        is_active: true,
    }

    const [submitStatus, setSubmitStatus] = useState("")

    const formik = useFormik({
        initialValues,
        validationSchema: formConfigSchema,
        onSubmit: async (values) => {
            try {
                setSubmitStatus("Submitting...")
                if(formId){
                    const { data } = await _put(`${API_ENDPOINTS.UPDATE_FORM}/${formId}`, values)
                }
                else {
                    const {data} = await _post(API_ENDPOINTS.ADD_FORM, values)
                }
                toast.success("Form submitted successfully!")
                navigate("/manager/forms")
            } catch (error) {
                setSubmitStatus("Error submitting form")
                toast.error("Submit error:", error)
            }
        },
    })

    const getFormData = async() => {
        try{
            setIsGettingForm(true)
            const { data } = await _get(`${API_ENDPOINTS.GET_FORMS}/${formId}`)
            console.log({data})
            formik.setValues(data)
        }
        catch (error){
            toast.error(error.message)
        }
        finally {
            setIsGettingForm(false)
        }
    }

    useEffect(() => {
        formId && getFormData()
    }, [formId])

    const addField = () => {
        const newField = {
            id: "",
            label: "",
            type: "",
            required: false,
            options: [],
            placeholder: "",
        }
        formik.setFieldValue("fields", [...formik.values.fields, newField])
    }

    const removeField = (index) => {
        const newFields = formik.values.fields.filter((_, i) => i !== index)
        formik.setFieldValue("fields", newFields)
    }

    const addOption = (fieldIndex) => {
        const currentOptions = formik.values.fields[fieldIndex].options || []
        formik.setFieldValue(`fields.${fieldIndex}.options`, [...currentOptions, ""])
    }

    const removeOption = (fieldIndex, optionIndex) => {
        const currentOptions = formik.values.fields[fieldIndex].options || []
        const newOptions = currentOptions.filter((_, i) => i !== optionIndex)
        formik.setFieldValue(`fields.${fieldIndex}.options`, newOptions)
    }

    return (
        <FormikProvider value={formik}>
            <div className="max-w-4xl mx-auto p-6 space-y-6">
                {/* Back Button */}
                <div className="mb-6">
                    <Button variant="outline" onClick={() => navigate("/manager/forms")}>
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Forms
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Form Builder</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
                            <InputWithLabel
                                type="text"
                                label="Title"
                                placeholder="Enter title"
                                name="title"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.title && formik.errors.title}
                                required
                            />

                            <InputWithLabel
                                type="textarea"
                                label="Description"
                                placeholder="Enter description"
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.description && formik.errors.description}
                                required
                            />

                            <InputWithLabel
                                type="checkbox"
                                name="is_active"
                                placeholder="Is Active"
                                checked={formik.values.is_active}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.is_active && formik.errors.is_active}
                                required
                            />

                            <div className="space-y-4">
                                <div className="flex items-center justify-start">
                                    <CardTitle className="text-md">Form Fields</CardTitle>
                                </div>

                                {formik.values.fields.map((field, fieldIndex) => (
                                    <Card key={fieldIndex} className="p-4">
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <CardTitle className="text-md">Field {fieldIndex + 1}</CardTitle>
                                                {formik.values.fields.length > 1 && (
                                                    <Button type="button" onClick={() => removeField(fieldIndex)} variant="outline" size="sm">
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <InputWithLabel
                                                        type="text"
                                                        id={`fields.${fieldIndex}.label`}
                                                        label="Label"
                                                        name={`fields.${fieldIndex}.label`}
                                                        placeholder="Enter label"
                                                        value={field.label}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        error={formik.touched.fields?.[fieldIndex]?.label && formik.errors.fields?.[fieldIndex]?.label}
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <InputWithLabel
                                                        type="select"
                                                        id={`fields.${fieldIndex}.type`}
                                                        name={`fields.${fieldIndex}.type`}
                                                        label="Type"
                                                        placeholder="Select field type"
                                                        value={field.type ?? ""}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        error={formik.touched.fields?.[fieldIndex]?.type && formik.errors.fields?.[fieldIndex]?.type}
                                                        options={VALID_FIELD_TYPES}
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-2">
                                                <InputWithLabel
                                                    type="checkbox"
                                                    id={`fields.${fieldIndex}.required`}
                                                    name={`fields.${fieldIndex}.required`}
                                                    placeholder={"Required"}
                                                    checked={field.required}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    error={formik.touched.fields?.[fieldIndex]?.required && formik.errors.fields?.[fieldIndex]?.required}
                                                />
                                            </div>

                                            {!FIELD_TYPES_WITH_OPTIONS.includes(field.type) && (
                                                <div className="space-y-2">
                                                    <InputWithLabel
                                                        type="text"
                                                        id={`fields.${fieldIndex}.placeholder`}
                                                        name={`fields.${fieldIndex}.placeholder`}
                                                        label="Placeholder"
                                                        placeholder={"Enter Placeholder for this field"}
                                                        value={field.placeholder || ""}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        error={formik.touched.fields?.[fieldIndex]?.placeholder && formik.errors.fields?.[fieldIndex]?.placeholder}
                                                    />
                                                </div>
                                            )}

                                            {FIELD_TYPES_WITH_OPTIONS.includes(field.type) && (
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <Label>Options *</Label>
                                                        <Button type="button" onClick={() => addOption(fieldIndex)} variant="outline" size="sm">
                                                            <PlusCircle className="w-4 h-4 mr-2" />
                                                            Add Option
                                                        </Button>
                                                    </div>

                                                    {field.options?.map((option, optionIndex) => (
                                                        <div key={optionIndex} className="flex items-start space-x-2">
                                                            <InputWithLabel
                                                                type="text"
                                                                id={`fields.${fieldIndex}.options.${optionIndex}`}
                                                                name={`fields.${fieldIndex}.options.${optionIndex}`}
                                                                placeholder={`Enter Option ${optionIndex + 1}`}
                                                                value={option || ""}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                error={formik.touched.fields?.[fieldIndex]?.options?.[optionIndex] && formik.errors.fields?.[fieldIndex]?.options?.[optionIndex]}
                                                                containerClassName="flex-1"
                                                            />
                                                            {(field.options?.length || 0) > 1 && (
                                                                <Button
                                                                    type="button"
                                                                    onClick={() => removeOption(fieldIndex, optionIndex)}
                                                                    variant="outline"
                                                                    size="sm"
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                </Button>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </Card>
                                ))}

                                <div className="flex items-center justify-end">
                                    <Button type="button" onClick={addField} variant="outline" size="sm">
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Field
                                    </Button>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex items-center justify-between">
                                <Button type="submit" disabled={formik.isSubmitting || isGettingForm}>
                                    {formId ? formik.isSubmitting ? "Updatting..." : "Update From Configuration" : formik.isSubmitting ? "Submitting..." : "Save Form Configuration"}
                                </Button>

                                {submitStatus && (
                                    <p className={`text-sm ${submitStatus.includes("Error") ? "text-red-500" : "text-green-500"}`}>
                                        {submitStatus}
                                    </p>
                                )}
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </FormikProvider>
    )
}
export default FeebbackForm;