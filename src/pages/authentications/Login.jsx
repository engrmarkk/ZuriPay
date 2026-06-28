import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    CheckCircle,
    AlertCircle,
    Zap
} from 'lucide-react'
import { useToastActions } from '../../hooks/useToastActions'

const Login = () => {
    const navigate = useNavigate()
    const hasVerifyEmail = false
    const toast = useToastActions()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)

    const validateForm = () => {
        const newErrors = {}

        // Email validation
        if (!formData.email) {
            newErrors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address'
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required'
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        if (!hasVerifyEmail) {
            setIsLoading(true)
            toast.showWarning('Please verify your email')
            await new Promise(resolve => setTimeout(resolve, 2000))
            navigate(`/auth/verify-email/${formData.email}`)
            return
        } else {
            // set localStorage
            localStorage.setItem('accessData', JSON.stringify(formData))
            setIsLoading(true)
            toast.showSuccess('Login successful')
            // wait for 3 secs
            await new Promise(resolve => setTimeout(resolve, 3000))
            // navigate to dashboard
            navigate('/account/dashboard')
        }

        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 1500))
            console.log('Login attempt:', formData)
            // Handle login logic here
        } catch (error) {
            console.error('Login error:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }
    }

    return (
        <div className="min-h-screen bg-[#0F1229] text-[#F7F7FA] flex items-center justify-center px-4 relative overflow-hidden">
            {/* Ambient glow */}
            <div
                className="pointer-events-none absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full opacity-30 blur-3xl"
            />
            <div
                className="pointer-events-none absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full opacity-20 blur-3xl"
                // style={{
                //     background: 'radial-gradient(circle, #C9A24B 0%, transparent 70%)',
                // }}
            />

            <div className="relative w-full max-w-md">
                {/* Brand */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-block">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <Zap className="w-8 h-8 text-[#C9A24B]" />
                            <span
                                className="text-2xl font-bold"
                                style={{ fontFamily: "'Fraunces', serif" }}
                            >
                ZuriPay
              </span>
                        </div>
                    </Link>
                    <h1
                        className="text-3xl font-bold mt-4"
                        style={{ fontFamily: "'Fraunces', serif" }}
                    >
                        Welcome Back
                    </h1>
                    <p className="text-[#7E81A0] mt-2">
                        Sign in to your account to continue
                    </p>
                </div>

                {/* Login Card */}
                <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-[#C7C9DC] mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-[#7E81A0]" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-3 py-3 bg-white/[0.05] border rounded-xl text-[#F7F7FA] placeholder-[#7E81A0] focus:outline-none focus:ring-2 transition-all duration-200 ${
                                        errors.email
                                            ? 'border-red-500 focus:ring-red-500/50'
                                            : 'border-white/10 focus:ring-[#C9A24B]/50 focus:border-[#C9A24B]'
                                    }`}
                                    placeholder="you@example.com"
                                />
                                {errors.email && (
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                        <AlertCircle className="h-5 w-5 text-red-500" />
                                    </div>
                                )}
                            </div>
                            {errors.email && (
                                <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                                    <AlertCircle className="h-4 w-4" />
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-[#C7C9DC] mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-[#7E81A0]" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-12 py-3 bg-white/[0.05] border rounded-xl text-[#F7F7FA] placeholder-[#7E81A0] focus:outline-none focus:ring-2 transition-all duration-200 ${
                                        errors.password
                                            ? 'border-red-500 focus:ring-red-500/50'
                                            : 'border-white/10 focus:ring-[#C9A24B]/50 focus:border-[#C9A24B]'
                                    }`}
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#7E81A0] hover:text-[#F7F7FA] transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                                {errors.password && (
                                    <div className="absolute inset-y-0 right-12 pr-3 flex items-center">
                                        <AlertCircle className="h-5 w-5 text-red-500" />
                                    </div>
                                )}
                            </div>
                            {errors.password && (
                                <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                                    <AlertCircle className="h-4 w-4" />
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 text-sm text-[#C7C9DC] cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={() => setRememberMe(!rememberMe)}
                                    className="w-4 h-4 rounded border-white/10 bg-white/[0.05] text-[#C9A24B] focus:ring-[#C9A24B] focus:ring-offset-0 focus:ring-offset-[#0F1229] cursor-pointer"
                                />
                                Remember me
                            </label>
                            <Link
                                to="/auth/forgot-password"
                                className="text-sm text-[#C9A24B] hover:text-[#D4B35C] transition-colors"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-3.5 rounded-xl bg-[#F7F7FA] text-[#0F1229] font-medium text-[0.95rem] transition-all duration-200 flex items-center justify-center gap-2 ${
                                isLoading
                                    ? 'opacity-70 cursor-not-allowed'
                                    : 'hover:bg-[#C9A24B] hover:scale-[1.02] active:scale-[0.98]'
                            }`}
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                            fill="none"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>

                        {/* Sign Up Link */}
                        <p className="text-center text-sm text-[#7E81A0]">
                            Don't have an account?{' '}
                            <Link
                                to="/auth/signup"
                                className="text-[#C9A24B] hover:text-[#D4B35C] font-medium transition-colors"
                            >
                                Create one now
                            </Link>
                        </p>
                    </form>
                </div>

                {/* Security Badge */}
                <div className="mt-6 text-center">
                    <div className="inline-flex items-center gap-2 text-xs text-[#7E81A0]">
                        <CheckCircle className="w-4 h-4 text-[#34D399]" />
                        Secured with 256-bit encryption
                        <span className="w-px h-4 bg-white/10" />
                        <Lock className="w-3 h-3" />
                        Your data is safe
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login