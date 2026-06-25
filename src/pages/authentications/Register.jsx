import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    User,
    CheckCircle,
    AlertCircle,
    Zap,
    Phone,
    Smartphone,
    Shield
} from 'lucide-react'

const Signup = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    })
    // use snake case for data to send to api
    const [apiData, setApiData] = useState({
        full_name: '',
        email: '',
        phone: '',
        password: '',
        confirm_password: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [agreeTerms, setAgreeTerms] = useState(false)
    const [agreeNewsletter, setAgreeNewsletter] = useState(false)

    const validateForm = () => {
        const newErrors = {}

        // Full Name validation
        if (!formData.fullName) {
            newErrors.fullName = 'Full name is required'
        } else if (formData.fullName.length < 2) {
            newErrors.fullName = 'Name must be at least 2 characters'
        }

        // Email validation
        if (!formData.email) {
            newErrors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address'
        }

        // Phone validation (Nigerian format)
        if (!formData.phone) {
            newErrors.phone = 'Phone number is required'
        } else if (!/^0[7-9][0-9]{9}$/.test(formData.phone.replace(/\s/g, ''))) {
            newErrors.phone = 'Enter a valid Nigerian phone number (e.g., 08012345678)'
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required'
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters'
        } else if (!/(?=.*[a-z])/.test(formData.password)) {
            newErrors.password = 'Password must contain at least one lowercase letter'
        } else if (!/(?=.*[A-Z])/.test(formData.password)) {
            newErrors.password = 'Password must contain at least one uppercase letter'
        } else if (!/(?=.*\d)/.test(formData.password)) {
            newErrors.password = 'Password must contain at least one number'
        }

        // Confirm Password validation
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password'
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match'
        }

        // Terms validation
        if (!agreeTerms) {
            newErrors.agreeTerms = 'You must agree to the terms and conditions'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setIsLoading(true)

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500))
            console.log('Signup attempt:', formData)
            // Handle signup logic here
        } catch (error) {
            console.error('Signup error:', error)
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

    const getPasswordStrength = () => {
        const password = formData.password
        if (!password) return { score: 0, label: '', color: '' }

        let score = 0
        if (password.length >= 8) score++
        if (/(?=.*[a-z])/.test(password)) score++
        if (/(?=.*[A-Z])/.test(password)) score++
        if (/(?=.*\d)/.test(password)) score++

        const strengths = [
            { score: 0, label: 'Weak', color: 'text-red-500' },
            { score: 1, label: 'Weak', color: 'text-red-500' },
            { score: 2, label: 'Fair', color: 'text-yellow-500' },
            { score: 3, label: 'Good', color: 'text-blue-500' },
            { score: 4, label: 'Strong', color: 'text-green-500' },
        ]

        return strengths[score] || strengths[0]
    }

    const passwordStrength = getPasswordStrength()

    return (
        <div className="min-h-screen bg-[#0F1229] text-[#F7F7FA] flex items-center justify-center px-4 py-8 relative overflow-hidden">
            {/* Ambient glow */}
            <div
                className="pointer-events-none absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full opacity-30 blur-3xl"
            />
            <div
                className="pointer-events-none absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full opacity-20 blur-3xl"
            />

            <div className="relative w-full max-w-md">
                {/* Brand */}
                <div className="text-center mb-6">
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
                        className="text-2xl font-bold mt-3"
                        style={{ fontFamily: "'Fraunces', serif" }}
                    >
                        Create Your Account
                    </h1>
                    <p className="text-[#7E81A0] text-sm mt-1">
                        Join thousands of Nigerians using ZuriPay
                    </p>
                </div>

                {/* Signup Card */}
                <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Full Name */}
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-[#C7C9DC] mb-1.5">
                                Full Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-[#7E81A0]" />
                                </div>
                                <input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-3 py-2.5 bg-white/[0.05] border rounded-xl text-[#F7F7FA] placeholder-[#7E81A0] focus:outline-none focus:ring-2 transition-all duration-200 text-sm ${
                                        errors.fullName
                                            ? 'border-red-500 focus:ring-red-500/50'
                                            : 'border-white/10 focus:ring-[#C9A24B]/50 focus:border-[#C9A24B]'
                                    }`}
                                    placeholder="John Doe"
                                />
                                {errors.fullName && (
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                        <AlertCircle className="h-5 w-5 text-red-500" />
                                    </div>
                                )}
                            </div>
                            {errors.fullName && (
                                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                                    <AlertCircle className="h-3.5 w-3.5" />
                                    {errors.fullName}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-[#C7C9DC] mb-1.5">
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
                                    className={`w-full pl-10 pr-3 py-2.5 bg-white/[0.05] border rounded-xl text-[#F7F7FA] placeholder-[#7E81A0] focus:outline-none focus:ring-2 transition-all duration-200 text-sm ${
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
                                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                                    <AlertCircle className="h-3.5 w-3.5" />
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Phone */}
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-[#C7C9DC] mb-1.5">
                                Phone Number
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Phone className="h-5 w-5 text-[#7E81A0]" />
                                </div>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-3 py-2.5 bg-white/[0.05] border rounded-xl text-[#F7F7FA] placeholder-[#7E81A0] focus:outline-none focus:ring-2 transition-all duration-200 text-sm ${
                                        errors.phone
                                            ? 'border-red-500 focus:ring-red-500/50'
                                            : 'border-white/10 focus:ring-[#C9A24B]/50 focus:border-[#C9A24B]'
                                    }`}
                                    placeholder="08012345678"
                                />
                                {errors.phone && (
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                        <AlertCircle className="h-5 w-5 text-red-500" />
                                    </div>
                                )}
                            </div>
                            {errors.phone && (
                                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                                    <AlertCircle className="h-3.5 w-3.5" />
                                    {errors.phone}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-[#C7C9DC] mb-1.5">
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
                                    className={`w-full pl-10 pr-12 py-2.5 bg-white/[0.05] border rounded-xl text-[#F7F7FA] placeholder-[#7E81A0] focus:outline-none focus:ring-2 transition-all duration-200 text-sm ${
                                        errors.password
                                            ? 'border-red-500 focus:ring-red-500/50'
                                            : 'border-white/10 focus:ring-[#C9A24B]/50 focus:border-[#C9A24B]'
                                    }`}
                                    placeholder="Min 8 characters"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#7E81A0] hover:text-[#F7F7FA] transition-colors"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>

                            {/* Password Strength Indicator */}
                            {formData.password && (
                                <div className="mt-2">
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 h-1 rounded-full bg-white/[0.05] overflow-hidden">
                                            <div
                                                className={`h-full transition-all duration-300 ${
                                                    passwordStrength.score === 0 ? 'w-0' :
                                                        passwordStrength.score === 1 ? 'w-1/4 bg-red-500' :
                                                            passwordStrength.score === 2 ? 'w-2/4 bg-yellow-500' :
                                                                passwordStrength.score === 3 ? 'w-3/4 bg-blue-500' :
                                                                    'w-full bg-green-500'
                                                }`}
                                            />
                                        </div>
                                        <span className={`text-xs ${passwordStrength.color}`}>
                      {passwordStrength.label}
                    </span>
                                    </div>
                                    <p className="text-[10px] text-[#7E81A0] mt-1">
                                        Use 8+ chars with uppercase, lowercase & number
                                    </p>
                                </div>
                            )}

                            {errors.password && (
                                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                                    <AlertCircle className="h-3.5 w-3.5" />
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#C7C9DC] mb-1.5">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-[#7E81A0]" />
                                </div>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-12 py-2.5 bg-white/[0.05] border rounded-xl text-[#F7F7FA] placeholder-[#7E81A0] focus:outline-none focus:ring-2 transition-all duration-200 text-sm ${
                                        errors.confirmPassword
                                            ? 'border-red-500 focus:ring-red-500/50'
                                            : 'border-white/10 focus:ring-[#C9A24B]/50 focus:border-[#C9A24B]'
                                    }`}
                                    placeholder="Confirm your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#7E81A0] hover:text-[#F7F7FA] transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                                    <AlertCircle className="h-3.5 w-3.5" />
                                    {errors.confirmPassword}
                                </p>
                            )}
                        </div>

                        {/* Terms */}
                        <div className="space-y-2">
                            <div className="flex items-start gap-2">
                                <input
                                    id="agreeTerms"
                                    type="checkbox"
                                    checked={agreeTerms}
                                    onChange={() => setAgreeTerms(!agreeTerms)}
                                    className={`w-4 h-4 mt-0.5 rounded border-white/10 bg-white/[0.05] text-[#C9A24B] focus:ring-[#C9A24B] focus:ring-offset-0 focus:ring-offset-[#0F1229] cursor-pointer flex-shrink-0 ${
                                        errors.agreeTerms ? 'border-red-500' : ''
                                    }`}
                                />
                                <label htmlFor="agreeTerms" className="text-xs text-[#7E81A0] leading-relaxed">
                                    I agree to the{' '}
                                    <Link to="/terms" className="text-[#C9A24B] hover:text-[#D4B35C] transition-colors">
                                        Terms of Service
                                    </Link>
                                    {' '}and{' '}
                                    <Link to="/privacy" className="text-[#C9A24B] hover:text-[#D4B35C] transition-colors">
                                        Privacy Policy
                                    </Link>
                                </label>
                            </div>

                            <div className="flex items-start gap-2">
                                <input
                                    id="agreeNewsletter"
                                    type="checkbox"
                                    checked={agreeNewsletter}
                                    onChange={() => setAgreeNewsletter(!agreeNewsletter)}
                                    className="w-4 h-4 mt-0.5 rounded border-white/10 bg-white/[0.05] text-[#C9A24B] focus:ring-[#C9A24B] focus:ring-offset-0 focus:ring-offset-[#0F1229] cursor-pointer flex-shrink-0"
                                />
                                <label htmlFor="agreeNewsletter" className="text-xs text-[#7E81A0] leading-relaxed">
                                    I want to receive updates, tips, and promotions
                                </label>
                            </div>

                            {errors.agreeTerms && (
                                <p className="text-xs text-red-500 flex items-center gap-1">
                                    <AlertCircle className="h-3.5 w-3.5" />
                                    {errors.agreeTerms}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-3 rounded-xl bg-[#F7F7FA] text-[#0F1229] font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                                isLoading
                                    ? 'opacity-70 cursor-not-allowed'
                                    : 'hover:bg-[#C9A24B] hover:scale-[1.02] active:scale-[0.98]'
                            }`}
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Creating account...
                                </>
                            ) : (
                                <>
                                    Create Account
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>

                        {/* Login Link */}
                        <p className="text-center text-sm text-[#7E81A0]">
                            Already have an account?{' '}
                            <Link
                                to="/auth/login"
                                className="text-[#C9A24B] hover:text-[#D4B35C] font-medium transition-colors"
                            >
                                Sign in
                            </Link>
                        </p>
                    </form>
                </div>

                {/* Security Badges */}
                <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-[#7E81A0]">
                    <div className="flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5 text-[#34D399]" />
                        <span>256-bit encryption</span>
                    </div>
                    <span className="w-px h-4 bg-white/10" />
                    <div className="flex items-center gap-1.5">
                        <Smartphone className="w-3.5 h-3.5 text-[#C9A24B]" />
                        <span>Mobile-optimized</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup