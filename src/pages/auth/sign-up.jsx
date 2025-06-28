import { useFormik } from "formik";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { registerEmployeeSchema } from "../../lib/validation/login-form";
import { InputWithLabel } from "../../components/comman/Input-with-label";
import { useEffect, useState } from "react";
import { _get, _post } from "../../lib/service/axios-provider";
import { API_ENDPOINTS } from "../../enums/endpoints.enum";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
    const [managers, setManager] = useState([])
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const initalState = {
        full_name: "",
        email: "",
        employee_id: "",
        department: "",
        role: "employee",
        manager_id: "",
        password: ""
    }

    const formik = useFormik({
        initialValues: initalState,
        validationSchema : registerEmployeeSchema,
        onSubmit: async(values) => {
            setIsLoading(true)
            try{
                const {data} = await _post(API_ENDPOINTS.REGISTRATION, values)
                toast.success("Registration Successfull, please login")
                navigate('/auth/login')
            }
            catch (error) {
                toast.error(error?.response?.data?.detail ?? "Something went wrong")
            }
            finally {
                setIsLoading(false)
            }
        }
    })

    const getMenegerList = async() => {
        try{
            const {data} = await _get(API_ENDPOINTS.GET_MENAGERS_FOR_OPTION)
            setManager(data)
        }
        finally {

        }
    }

    useEffect(() => {
        getMenegerList()
    }, [])

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
            <div className="max-w-7xl mx-auto">
                <form className="w-7xl" onSubmit={formik.handleSubmit}>
                    <Card className="w-full shadow-lg">
                        <CardHeader className="text-left">
                            <CardTitle className="text-2xl font-bold">Register Your Account</CardTitle>
                            <CardDescription>Create a new employee account to get started.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 gap-5">
                            <InputWithLabel 
                                name="full_name"
                                label="Full Name"
                                type="text"
                                value={formik.values.full_name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.full_name && formik.errors.full_name}
                                placeholder="Please enter full name"
                                required
                            />
                            <InputWithLabel 
                                name="email"
                                label="Email"
                                type="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.email && formik.errors.email}
                                placeholder="Please enter email"
                                required
                                helperText="We'll never share your email with anyone else"
                            />
                            <InputWithLabel 
                                name="employee_id"
                                label="Employee ID"
                                type="text"
                                value={formik.values.employee_id}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.employee_id && formik.errors.employee_id}
                                placeholder="Please enter employee ID"
                                required
                            />
                            <InputWithLabel 
                                name="department"
                                label="Department"
                                type="text"
                                value={formik.values.department}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.department && formik.errors.department}
                                placeholder="Please enter department"
                                required
                            />

                            <InputWithLabel 
                                name="manager_id"
                                label="Manager ID"
                                type="select"
                                options={managers}
                                value={formik.values.manager_id}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.manager_id && formik.errors.manager_id}
                                placeholder="Select your manager"
                                required
                            />

                            <InputWithLabel 
                                name="password"
                                label="Password"
                                type="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.password && formik.errors.password}
                                placeholder="Create a strong password"
                                required
                                helperText="Must be at least 8 characters long"
                            />
                        </CardContent>
                        <CardFooter className="grid grid-cols-6 gap-5">
                            <Button className="col-span-4" type="submit" disabled={isLoading}>
                                {isLoading ? 'Registrating...' : 'Register'}
                            </Button>
                            <Button className="col-span-2" variant="outline" type="button">
                                Cancel
                            </Button>
                            {/* Sign Up Link */}
                            <div className="col-span-6">
                                <span className="text-sm text-muted-foreground">if have an account? </span>
                                <button
                                    type="button"
                                    onClick={() => navigate("/auth/login")}
                                    className="text-sm text-primary hover:underline focus:outline-none focus:underline font-medium cursor-pointer"
                                >
                                    Login up
                                </button>
                            </div>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </div>
    )
}
export default Register;