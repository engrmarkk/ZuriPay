import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useToastActions } from '../../hooks/useToastActions'
import {
    Mail,
    Shield,
    CheckCircle,
    AlertCircle,
    ArrowLeft,
    Loader,
    Zap,
    Clock,
    RefreshCw,
    Key,
    Smartphone,
    Users,
    Award,
    Star
} from 'lucide-react'

const EmailVerification = () => {
    const navigate = useNavigate()
    const toast = useToastActions()

    // State
    const [otp, setOtp] = useState(['', '', '', '', '', ''])
    const [isLoading, setIsLoading] = useState(false)
    const [isResending, setIsResending] = useState(false)
    const [error, setError] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)
    const [timer, setTimer] = useState(60)
    const [canResend, setCanResend] = useState(false)

    // Refs for input focus
    const inputRefs = useRef([])

    // Mock user email
    // const [email] = useState('john.adeyemi@email.com')

    const { email } = useParams()
    console.log(email, "email")
    // urlencoded
    const encodedEmail = decodeURIComponent(email)
    console.log(encodedEmail, "email after decoded")

    // Countdown timer
    useEffect(() => {
        let interval = null

        if (timer > 0 && !canResend) {
            interval = setInterval(() => {
                setTimer(prev => prev - 1)
            }, 1000)
        } else if (timer === 0) {
            setCanResend(true)
            clearInterval(interval)
        }

        return () => clearInterval(interval)
    }, [timer, canResend])

    // Auto-focus first input on mount
    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus()
        }
    }, [])

    // Handle OTP input change
    const handleOtpChange = (index, value) => {
        // Only allow digits
        if (!/^\d*$/.test(value)) return

        // Limit to 1 character
        if (value.length > 1) return

        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)
        setError('')

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1].focus()
        }
    }

    // Handle keydown for backspace navigation
    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus()
        }

        // Handle paste
        if (e.key === 'v' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault()
            const pastedData = e.clipboardData?.getData('text') || ''
            const digits = pastedData.replace(/\D/g, '').slice(0, 6)
            if (digits.length > 0) {
                const newOtp = [...otp]
                for (let i = 0; i < digits.length && i < 6; i++) {
                    newOtp[i] = digits[i]
                }
                setOtp(newOtp)
                // Focus the next empty input or last filled
                const nextIndex = Math.min(digits.length, 5)
                inputRefs.current[nextIndex].focus()
            }
        }
    }

    // Handle paste
    const handlePaste = (e) => {
        e.preventDefault()
        const pastedData = e.clipboardData?.getData('text') || ''
        const digits = pastedData.replace(/\D/g, '').slice(0, 6)
        if (digits.length > 0) {
            const newOtp = [...otp]
            for (let i = 0; i < digits.length && i < 6; i++) {
                newOtp[i] = digits[i]
            }
            setOtp(newOtp)
            // Focus the next empty input or last filled
            const nextIndex = Math.min(digits.length, 5)
            inputRefs.current[nextIndex].focus()
        }
    }

    // Handle verify
    const handleVerify = async () => {
        const otpString = otp.join('')

        if (otpString.length !== 6) {
            setError('Please enter the complete 6-digit code')
            return
        }

        setIsLoading(true)
        setError('')

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000))

            // Mock verification - accept any 6 digits for demo
            // In production, this would call your API
            // const response = await authService.verifyEmail({ email, code: otpString })

            setIsSuccess(true)
            toast.showSuccess('Email verified successfully! 🎉')
            localStorage.setItem('accessData', JSON.stringify({"email": email}))

            // Redirect after 2 seconds
            setTimeout(() => {
                navigate('/account/dashboard', { replace: true })
            }, 2500)

        } catch (error) {
            setError('Invalid verification code. Please try again.')
            setOtp(['', '', '', '', '', ''])
            inputRefs.current[0].focus()
            toast.showError('Verification failed. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    // Handle resend
    const handleResend = async () => {
        if (!canResend) return

        setIsResending(true)

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500))

            // In production: await authService.resendVerification({ email })

            setTimer(60)
            setCanResend(false)
            setOtp(['', '', '', '', '', ''])
            inputRefs.current[0].focus()
            toast.showSuccess('New verification code sent! 📧')

        } catch (error) {
            toast.showError('Failed to resend code. Please try again.')
        } finally {
            setIsResending(false)
        }
    }

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
                />
                <div className="absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full opacity-20 blur-3xl"
                />

                <div className="relative text-center max-w-md">
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
                        Email Verified! 🎉
                    </h2>
                    <p className="text-[#7E81A0] mt-2">
                        Your email has been verified successfully.
                        Redirecting to dashboard...
                    </p>
                    <div className="mt-4 flex justify-center">
                        <Loader className="w-6 h-6 animate-spin text-[#C9A24B]" />
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
            />
            <div
                className="absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full opacity-20 blur-3xl"
            />

            <div className="relative w-full max-w-md">
                {/* Back Button */}
                {/*<Link*/}
                {/*    to="/auth/login"*/}
                {/*    className="inline-flex items-center gap-2 text-sm text-[#7E81A0] hover:text-[#F7F7FA] transition-colors mb-6"*/}
                {/*>*/}
                {/*    <ArrowLeft className="w-4 h-4" />*/}
                {/*    Back to Login*/}
                {/*</Link>*/}

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
                        Verify Your Email
                    </h1>
                    <p className="text-[#7E81A0] mt-2">
                        Enter the 6-digit code sent to
                    </p>
                    <p className="text-[#F7F7FA] font-medium mt-1">
                        {email}
                    </p>
                </div>

                {/* Verification Card */}
                <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                    {/* OTP Input */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-[#C7C9DC] mb-3">
                            Verification Code
                        </label>
                        <div
                            className="flex justify-center gap-2 sm:gap-3"
                            onPaste={handlePaste}
                        >
                            {[0, 1, 2, 3, 4, 5].map((index) => (
                                <input
                                    key={index}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type="text"
                                    maxLength={1}
                                    value={otp[index]}
                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className={`w-12 h-14 text-center text-2xl font-bold bg-white/[0.05] border rounded-xl text-[#F7F7FA] focus:outline-none focus:ring-2 transition-all duration-200 ${
                                        error
                                            ? 'border-red-500 focus:ring-red-500/50'
                                            : 'border-white/10 focus:ring-[#C9A24B]/50 focus:border-[#C9A24B]'
                                    }`}
                                    disabled={isLoading}
                                />
                            ))}
                        </div>
                        {error && (
                            <p className="mt-3 text-sm text-red-500 flex items-center justify-center gap-1">
                                <AlertCircle className="w-4 h-4" />
                                {error}
                            </p>
                        )}
                        <p className="text-xs text-[#7E81A0] mt-3 text-center">
                            Enter the 6-digit code we sent to your email
                        </p>
                    </div>

                    {/* Verify Button */}
                    <button
                        onClick={handleVerify}
                        disabled={isLoading || otp.join('').length !== 6}
                        className={`w-full py-3.5 rounded-xl font-medium text-sm transition-colors flex items-center justify-center gap-2 ${
                            isLoading || otp.join('').length !== 6
                                ? 'bg-white/[0.05] text-[#7E81A0] cursor-not-allowed'
                                : 'bg-[#F7F7FA] text-[#0F1229] hover:bg-[#C9A24B]'
                        }`}
                    >
                        {isLoading ? (
                            <>
                                <Loader className="w-4 h-4 animate-spin" />
                                Verifying...
                            </>
                        ) : (
                            <>
                                <Shield className="w-4 h-4" />
                                Verify Email
                            </>
                        )}
                    </button>

                    {/* Resend Section */}
                    <div className="mt-6 text-center">
                        <div className="flex items-center justify-center gap-2">
                            <span className="text-sm text-[#7E81A0]">
                                Didn't receive the code?
                            </span>
                            {canResend ? (
                                <button
                                    onClick={handleResend}
                                    disabled={isResending}
                                    className="text-sm text-[#C9A24B] hover:text-[#D4B35C] transition-colors flex items-center gap-1 font-medium"
                                >
                                    {isResending ? (
                                        <>
                                            <Loader className="w-4 h-4 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <RefreshCw className="w-3 h-3" />
                                            Resend Code
                                        </>
                                    )}
                                </button>
                            ) : (
                                <span className="text-sm text-[#7E81A0] flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    Resend in {formatTime(timer)}
                                </span>
                            )}
                        </div>
                        {!canResend && (
                            <p className="text-xs text-[#7E81A0] mt-2">
                                Code expires in {formatTime(timer)}
                            </p>
                        )}
                    </div>
                </div>

                {/* Security Badge */}
                <div className="mt-6 text-center">
                    <div className="inline-flex items-center gap-2 text-xs text-[#7E81A0]">
                        <Shield className="w-3.5 h-3.5 text-[#34D399]" />
                        Secure verification
                        <span className="w-px h-4 bg-white/10" />
                        <Key className="w-3.5 h-3.5 text-[#C9A24B]" />
                        End-to-end encrypted
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

export default EmailVerification
