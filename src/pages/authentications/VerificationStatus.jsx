import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useToastActions } from '../../hooks/useToastActions'
import {
    CheckCircle,
    XCircle,
    AlertCircle,
    Clock,
    ArrowLeft,
    Zap,
    Shield,
    Loader,
    Mail,
    RefreshCw,
    Home,
    ArrowRight
} from 'lucide-react'

const EmailVerificationStatus = () => {
    const navigate = useNavigate()
    const toast = useToastActions()
    const [searchParams] = useSearchParams()

    // State
    const [isLoading, setIsLoading] = useState(true)
    const [status, setStatus] = useState('') // 'success', 'expired', 'invalid'
    const [email, setEmail] = useState('')
    const [token, setToken] = useState('')
    const [isResending, setIsResending] = useState(false)

    // ✅ Use ref to track if toast has been shown
    const hasShownToast = useRef(false)

    // Get status from URL params
    const statusParam = searchParams.get('status')
    const emailParam = searchParams.get('email')
    const tokenParam = searchParams.get('token')

    // ✅ Get the expected token from environment
    const EXPECTED_TOKEN = import.meta.env.VITE_EMAIL_VERIFICATION_TOKEN || 'zuripay-verify-2024-secure-token'

    useEffect(() => {
        // ✅ Only run validation once
        const validateAndSetStatus = () => {
            // Check if token exists and matches
            if (!tokenParam) {
                navigate('/')
                return
            }

            // Validate token against env
            if (tokenParam !== EXPECTED_TOKEN) {
                setStatus('invalid')
                setIsLoading(false)
                return
            }

            // Check if email exists
            if (!emailParam) {
                navigate('/')
                return
            }

            // Set email
            setEmail(decodeURIComponent(emailParam))
            setToken(tokenParam)

            // Check status
            if (!statusParam) {
                navigate('/')
                return
            }

            // Valid statuses: success, expired, invalid
            if (['success', 'expired', 'invalid'].includes(statusParam)) {
                setStatus(statusParam)

                // ✅ Show toast only once
                if (!hasShownToast.current) {
                    if (statusParam === 'success') {
                        toast.showSuccess('Email verified successfully! 🎉')
                    } else if (statusParam === 'expired') {
                        toast.showWarning('Verification link has expired')
                    } else if (statusParam === 'invalid') {
                        toast.showError('Invalid verification link')
                    }
                    hasShownToast.current = true
                }
            } else {
                navigate('/')
                return
            }

            setIsLoading(false)
        }

        validateAndSetStatus()
        // ✅ Empty dependency array - runs only once on mount
    }, [])


    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#0F1229] text-[#F7F7FA] flex items-center justify-center px-4">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C9A24B] mx-auto"></div>
                    <p className="text-[#7E81A0] mt-4">Verifying your email...</p>
                </div>
            </div>
        )
    }

    // Render success state
    if (status === 'success') {
        return (
            <div className="min-h-screen bg-[#0F1229] text-[#F7F7FA] flex items-center justify-center px-4 relative overflow-hidden">
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
                    </div>

                    <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
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
                        <p className="text-[#C7C9DC] mt-2">
                            Your email has been successfully verified.
                        </p>
                        <p className="text-sm text-[#7E81A0] mt-1">
                            {email}
                        </p>

                        <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                            <p className="text-sm text-[#C7C9DC]">
                                You can now enjoy all the features of ZuriPay.
                            </p>
                        </div>

                        <div className="mt-6 flex flex-col gap-3">
                            <Link
                                to="/auth/login"
                                className="w-full py-3.5 rounded-xl bg-[#F7F7FA] text-[#0F1229] font-medium text-sm hover:bg-[#C9A24B] transition-colors flex items-center justify-center gap-2"
                            >
                                <ArrowRight className="w-4 h-4" />
                                Go to Login
                            </Link>
                            <Link
                                to="/"
                                className="text-sm text-[#7E81A0] hover:text-[#F7F7FA] transition-colors inline-flex items-center justify-center gap-1"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to Home
                            </Link>
                        </div>
                    </div>

                    <div className="mt-6 text-center">
                        <div className="inline-flex items-center gap-2 text-xs text-[#7E81A0]">
                            <Shield className="w-3.5 h-3.5 text-[#34D399]" />
                            Verified account
                            <span className="w-px h-4 bg-white/10" />
                            <CheckCircle className="w-3.5 h-3.5 text-[#C9A24B]" />
                            Full access
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

    // Render expired state
    if (status === 'expired') {
        return (
            <div className="min-h-screen bg-[#0F1229] text-[#F7F7FA] flex items-center justify-center px-4 relative overflow-hidden">
                <div
                    className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full opacity-30 blur-3xl"
                    // style={{
                    //     background: 'radial-gradient(circle, #6C5CE7 0%, transparent 70%)',
                    // }}
                />

                <div className="relative w-full max-w-md">
                    <div className="text-center mb-8">
                        <Link to="/" className="inline-block">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <Zap className="w-8 h-8 text-[#C9A24B]" />
                                <span className="text-2xl font-bold" style={{ fontFamily: "'Fraunces', serif" }}>
                                    ZuriPay
                                </span>
                            </div>
                        </Link>
                    </div>

                    <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
                        <div className="w-24 h-24 rounded-full bg-yellow-500/10 flex items-center justify-center mx-auto mb-6">
                            <Clock className="w-12 h-12 text-yellow-500" />
                        </div>

                        <h2 className="text-2xl font-bold" style={{ fontFamily: "'Fraunces', serif" }}>
                            Link Expired ⏰
                        </h2>
                        <p className="text-[#C7C9DC] mt-2">
                            This verification link has expired.
                        </p>
                        <p className="text-sm text-[#7E81A0] mt-1">
                            {email}
                        </p>

                        <div className="mt-6 flex flex-col gap-3">
                            <Link
                                to="/"
                                className="text-sm text-[#7E81A0] hover:text-[#F7F7FA] transition-colors inline-flex items-center justify-center gap-1"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to Home
                            </Link>
                        </div>
                    </div>

                    <div className="mt-6 text-center">
                        <div className="inline-flex items-center gap-2 text-xs text-[#7E81A0]">
                            <Mail className="w-3.5 h-3.5 text-[#C9A24B]" />
                            Check your email for a new link
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // Render invalid state
    if (status === 'invalid') {
        return (
            <div className="min-h-screen bg-[#0F1229] text-[#F7F7FA] flex items-center justify-center px-4 relative overflow-hidden">
                <div
                    className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full opacity-30 blur-3xl"
                    // style={{
                    //     background: 'radial-gradient(circle, #EF4444 0%, transparent 70%)',
                    // }}
                />

                <div className="relative w-full max-w-md">
                    <div className="text-center mb-8">
                        <Link to="/" className="inline-block">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <Zap className="w-8 h-8 text-[#C9A24B]" />
                                <span className="text-2xl font-bold" style={{ fontFamily: "'Fraunces', serif" }}>
                                    ZuriPay
                                </span>
                            </div>
                        </Link>
                    </div>

                    <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
                        <div className="w-24 h-24 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
                            <XCircle className="w-12 h-12 text-red-500" />
                        </div>

                        <h2 className="text-2xl font-bold" style={{ fontFamily: "'Fraunces', serif" }}>
                            Invalid Link ❌
                        </h2>
                        <p className="text-[#C7C9DC] mt-2">
                            This verification link is invalid.
                        </p>

                        <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                            <p className="text-sm text-[#C7C9DC]">
                                The link may have been tampered with or is incorrect.
                                Please use the link sent to your email.
                            </p>
                        </div>

                        <div className="mt-6 flex flex-col gap-3">
                            <Link
                                to="/auth/login"
                                className="w-full py-3.5 rounded-xl bg-[#F7F7FA] text-[#0F1229] font-medium text-sm hover:bg-[#C9A24B] transition-colors flex items-center justify-center gap-2"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to Login
                            </Link>
                            <Link
                                to="/"
                                className="text-sm text-[#7E81A0] hover:text-[#F7F7FA] transition-colors inline-flex items-center justify-center gap-1"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to Home
                            </Link>
                        </div>
                    </div>

                    <div className="mt-6 text-center">
                        <div className="inline-flex items-center gap-2 text-xs text-[#7E81A0]">
                            <Shield className="w-3.5 h-3.5 text-[#EF4444]" />
                            Suspicious link detected
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return null
}

export default EmailVerificationStatus