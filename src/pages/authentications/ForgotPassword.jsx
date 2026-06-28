import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useToastActions } from '../../hooks/useToastActions'
import {
    ArrowLeft,
    Mail,
    Shield,
    CheckCircle,
    AlertCircle,
    Loader,
    Zap,
    Key,
    Lock,
    Send,
    ArrowRight,
    Clock
} from 'lucide-react'

const ForgotPassword = () => {
    const navigate = useNavigate()
    const toast = useToastActions()

    // State
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)
    const [resendTimer, setResendTimer] = useState(0)

    // Handle email change
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
        setError('')
    }

    // Validate email
    const validateEmail = () => {
        if (!email) {
            setError('Email is required')
            return false
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email address')
            return false
        }
        return true
    }

    // Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateEmail()) {
            return
        }

        setIsLoading(true)

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000))

            // In production: await authService.forgotPassword({ email })

            setIsSuccess(true)
            setResendTimer(60)
            toast.showSuccess('Password reset link sent! 📧')

        } catch (error) {
            setError('Something went wrong. Please try again.')
            toast.showError('Failed to send reset link. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    // Handle resend
    const handleResend = async () => {
        setResendTimer(60)
        setIsLoading(true)

        try {
            await new Promise(resolve => setTimeout(resolve, 1500))
            toast.showSuccess('Reset link resent! 📧')
        } catch (error) {
            toast.showError('Failed to resend. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    // Countdown timer for resend
    React.useEffect(() => {
        let interval = null

        if (resendTimer > 0) {
            interval = setInterval(() => {
                setResendTimer(prev => prev - 1)
            }, 1000)
        }

        return () => clearInterval(interval)
    }, [resendTimer])

    // Format timer
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
    }

    // Render success state
    if (isSuccess) {
        return (
            <div className="min-h-screen bg-[#0F1229] text-[#F7F7FA] flex items-center justify-center px-4 relative overflow-hidden">
                <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full opacity-30 blur-3xl"
                     // style={{ background: 'radial-gradient(circle, #6C5CE7 0%, transparent 70%)' }}
                />
                <div className="absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full opacity-20 blur-3xl"
                     // style={{ background: 'radial-gradient(circle, #C9A24B 0%, transparent 70%)' }}
                />

                <div className="relative text-center max-w-md w-full">
                    <div className="relative inline-block mb-6">
                        <div className="absolute inset-0 animate-ping-slow">
                            <div className="w-24 h-24 rounded-full bg-[#C9A24B]/20"></div>
                        </div>
                        <div className="absolute inset-0 animate-ping-slower">
                            <div className="w-28 h-28 rounded-full bg-[#C9A24B]/10 -m-1"></div>
                        </div>
                        <div className="w-24 h-24 rounded-full bg-[#C9A24B] flex items-center justify-center relative z-10">
                            <CheckCircle className="w-12 h-12 text-[#0F1229]" />
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold" style={{ fontFamily: "'Fraunces', serif" }}>
                        Check Your Email 📧
                    </h2>
                    <p className="text-[#C7C9DC] mt-3 leading-relaxed">
                        We've sent a password reset link to
                    </p>
                    <p className="text-[#C9A24B] font-medium mt-1 text-lg">
                        {email}
                    </p>
                    <p className="text-[#7E81A0] text-sm mt-2">
                        Click the link in the email to reset your password.
                        The link will expire in 30 minutes.
                    </p>

                    <div className="mt-6 p-4 bg-[#C9A24B]/5 border border-[#C9A24B]/20 rounded-xl">
                        <p className="text-xs text-[#7E81A0]">
                            <Shield className="w-3.5 h-3.5 inline mr-1 text-[#C9A24B]" />
                            If you don't see the email, check your spam folder.
                        </p>
                    </div>

                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={handleResend}
                            disabled={resendTimer > 0 || isLoading}
                            className={`flex-1 py-3 rounded-xl bg-[#C9A24B] text-[#0F1229] font-medium text-sm transition-colors flex items-center justify-center gap-2 ${
                                resendTimer > 0 || isLoading
                                    ? 'opacity-50 cursor-not-allowed'
                                    : 'hover:bg-[#D4B35C]'
                            }`}
                        >
                            {isLoading ? (
                                <>
                                    <Loader className="w-4 h-4 animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <Send className="w-4 h-4" />
                                    Resend Link
                                </>
                            )}
                        </button>
                        {resendTimer > 0 && (
                            <span className="text-sm text-[#7E81A0] flex items-center justify-center gap-1">
                                <Clock className="w-4 h-4" />
                                Resend in {formatTime(resendTimer)}
                            </span>
                        )}
                    </div>

                    <div className="mt-6">
                        <Link
                            to="/auth/login"
                            className="text-sm text-[#C9A24B] hover:text-[#D4B35C] transition-colors inline-flex items-center gap-1"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#0F1229] text-[#F7F7FA] flex items-center justify-center px-4 relative overflow-hidden">
            {/* Ambient glow */}
            <div
                className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full opacity-30 blur-3xl"
                // style={{
                //     background: 'radial-gradient(circle, #6C5CE7 0%, transparent 70%)',
                // }}
            />
            <div
                className="absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full opacity-20 blur-3xl"
                // style={{
                //     background: 'radial-gradient(circle, #C9A24B 0%, transparent 70%)',
                // }}
            />

            <div className="relative w-full max-w-md">
                {/* Back Button */}
                <Link
                    to="/auth/login"
                    className="inline-flex items-center gap-2 text-sm text-[#7E81A0] hover:text-[#F7F7FA] transition-colors mb-6"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Login
                </Link>

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
                        Forgot Password?
                    </h1>
                    <p className="text-[#7E81A0] mt-2">
                        Enter your email to reset your password
                    </p>
                </div>

                {/* Forgot Password Card */}
                <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email Input */}
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
                                    type="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    placeholder="you@example.com"
                                    className={`w-full pl-10 pr-4 py-3 bg-white/[0.05] border rounded-xl text-[#F7F7FA] placeholder-[#7E81A0] focus:outline-none focus:ring-2 transition-all duration-200 text-sm ${
                                        error
                                            ? 'border-red-500 focus:ring-red-500/50'
                                            : 'border-white/10 focus:ring-[#C9A24B]/50 focus:border-[#C9A24B]'
                                    }`}
                                    disabled={isLoading}
                                />
                                {error && (
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                        <AlertCircle className="h-5 w-5 text-red-500" />
                                    </div>
                                )}
                            </div>
                            {error && (
                                <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                                    <AlertCircle className="w-4 h-4" />
                                    {error}
                                </p>
                            )}
                        </div>

                        {/* Info Box */}
                        <div className="bg-[#C9A24B]/5 border border-[#C9A24B]/20 rounded-xl p-3">
                            <div className="flex items-start gap-2">
                                <Key className="w-4 h-4 text-[#C9A24B] flex-shrink-0 mt-0.5" />
                                <p className="text-xs text-[#C7C9DC]">
                                    You'll receive a password reset link via email.
                                    The link will expire in 30 minutes.
                                </p>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-3.5 rounded-xl font-medium text-sm transition-colors flex items-center justify-center gap-2 ${
                                isLoading
                                    ? 'bg-white/[0.05] text-[#7E81A0] cursor-not-allowed'
                                    : 'bg-[#F7F7FA] text-[#0F1229] hover:bg-[#C9A24B]'
                            }`}
                        >
                            {isLoading ? (
                                <>
                                    <Loader className="w-4 h-4 animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <Lock className="w-4 h-4" />
                                    Send Reset Link
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>

                        {/* Login Link */}
                        <div className="text-center">
                            <p className="text-sm text-[#7E81A0]">
                                Remember your password?{' '}
                                <Link
                                    to="/auth/login"
                                    className="text-[#C9A24B] hover:text-[#D4B35C] transition-colors font-medium"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>

                {/* Security Badge */}
                <div className="mt-6 text-center">
                    <div className="inline-flex items-center gap-2 text-xs text-[#7E81A0]">
                        <Shield className="w-3.5 h-3.5 text-[#34D399]" />
                        Secure password reset
                        <span className="w-px h-4 bg-white/10" />
                        <Mail className="w-3.5 h-3.5 text-[#C9A24B]" />
                        256-bit encrypted
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes ping-slow {
                    0% { transform: scale(0.95); opacity: 1; }
                    100% { transform: scale(1.5); opacity: 0; }
                }
                @keyframes ping-slower {
                    0% { transform: scale(0.95); opacity: 0.5; }
                    100% { transform: scale(1.8); opacity: 0; }
                }
                .animate-ping-slow {
                    animation: ping-slow 1.5s ease-out infinite;
                }
                .animate-ping-slower {
                    animation: ping-slower 2s ease-out infinite;
                }
            `}</style>
        </div>
    )
}

export default ForgotPassword