import { InputWithLabel } from "../../components/comman/Input-with-label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { useState } from "react"
import { useFormik } from "formik"
import loginSchema from '../../lib/validation/login-form'
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../protected-route/auth-provider"
import { toast } from "react-toastify"

const Login = () => {
    const [isLoading, setIsLoading] = useState(false)
    const { handleLogin } = useAuth()
    const navigate = useNavigate()

    const handlerSubmit = async(formData) => {
        setIsLoading(true)
        try{
            const {data} = await handleLogin(formData)  
            toast.success("Login Success.")
        }
        catch (error){
            const message = error.response.data.detail
            toast.warn(message)
        }
        finally {
            setIsLoading(false)
        }
    }
    
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: loginSchema,
        onSubmit: handlerSubmit
    })


    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
            <div className="w-full max-w-md">
                <Card className="shadow-lg">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
                        <CardDescription>Sign in to your account to continue</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={formik.handleSubmit} className="space-y-4">
                            {/* Email Input */}
                            <InputWithLabel
                                label="Email Address"
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.email && formik.errors.email}
                                required
                                autoComplete="email"
                            />

                            {/* Password Input */}
                            <InputWithLabel
                                label="Password"
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.password && formik.errors.password}
                                required
                                autoComplete="current-password"
                            />

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <Link
                                    className="text-sm text-primary hover:underline focus:outline-none focus:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            {/* Submit Button */}
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? (
                                    <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Signing in...</span>
                                    </div>
                                ) : (
                                    "Sign In"
                                )}
                            </Button>

                            {/* Sign Up Link */}
                            <div className="text-center">
                                <span className="text-sm text-muted-foreground">Don't have an account? </span>
                                <button
                                    type="button"
                                    onClick={() => navigate("/auth/register")}
                                    className="text-sm text-primary hover:underline focus:outline-none focus:underline font-medium"
                                >
                                    Sign up
                                </button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Demo Credentials */}
                <div className="mt-4 p-4 bg-muted/50 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-2">Manager Demo Credentials:</p>
                    <p className="text-xs text-muted-foreground">
                        Email: manager@example.com | Password: Manager@123
                    </p>
                </div>
                {/* Demo Credentials */}
                <div className="p-4 bg-muted/50 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-2">Employee Demo Credentials:</p>
                    <p className="text-xs text-muted-foreground">
                        Email: employee@example.com | Password: Employee@123
                    </p>
                </div>
            </div>
        </div>
    )
}
export default Login