import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useToastActions } from '../../hooks/useToastActions'
import {
    ArrowLeft,
    Shield,
    Eye,
    EyeOff,
    CheckCircle,
    AlertCircle,
    Loader,
    Zap,
    Key,
    Lock,
    Save,
    RefreshCw,
    Clock,
    X,
    Send,
    Mail
} from 'lucide-react'

const ResetPin = () => {
    const navigate = useNavigate()
    const toast = useToastActions()

    // State
    const [step, setStep] = useState(1) // 1: Request Token, 2: Token & New PIN, 3: Success
    const [isLoading, setIsLoading] = useState(false)
    const [showNewPin, setShowNewPin] = useState(false)
    const [showConfirmPin, setShowConfirmPin] = useState(false)
    const [showToken, setShowToken] = useState(false)
    const [timer, setTimer] = useState(60)
    const [canResend, setCanResend] = useState(false)
    const [resentCount, setResentCount] = useState(0)

    // Form data
    const [formData, setFormData] = useState({
        token: '',
        newPin: '',
        confirmPin: ''
    })

    // Errors
    const [errors, setErrors] = useState({})
    const [isSuccess, setIsSuccess] = useState(false)

    // Refs for OTP inputs
    const inputRefs = useRef([])

    // Get user email from localStorage or context
    const userEmail = localStorage.getItem('userEmail') || 'your registered email'

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

    // Auto-focus first OTP input on mount
    useEffect(() => {
        if (step === 2 && inputRefs.current[0]) {
            inputRefs.current[0].focus()
        }
    }, [step])

    // Handle OTP input change
    const handleOtpChange = (index, value) => {
        if (!/^\d*$/.test(value)) return
        if (value.length > 1) return

        const newToken = formData.token.split('')
        newToken[index] = value
        setFormData(prev => ({ ...prev, token: newToken.join('') }))
        setErrors(prev => ({ ...prev, token: '' }))

        if (value && index < 5) {
            inputRefs.current[index + 1].focus()
        }
    }

    // Handle OTP keydown
    const handleOtpKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !formData.token[index] && index > 0) {
            inputRefs.current[index - 1].focus()
        }
    }

    // Handle OTP paste
    const handleOtpPaste = (e) => {
        e.preventDefault()
        const pastedData = e.clipboardData?.getData('text') || ''
        const digits = pastedData.replace(/\D/g, '').slice(0, 6)
        if (digits.length > 0) {
            setFormData(prev => ({ ...prev, token: digits }))
            const nextIndex = Math.min(digits.length, 5)
            if (inputRefs.current[nextIndex]) {
                inputRefs.current[nextIndex].focus()
            }
        }
    }

    // Handle input change for PIN fields
    const handlePinChange = (e) => {
        const { name, value } = e.target
        if (!/^\d*$/.test(value)) return

        setFormData(prev => ({ ...prev, [name]: value }))
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    // Validate token & PIN
    const validateTokenAndPin = () => {
        const newErrors = {}

        // Token validation
        if (!formData.token || formData.token.length !== 6) {
            newErrors.token = 'Please enter the complete 6-digit code'
        }

        // New PIN validation
        if (!formData.newPin) {
            newErrors.newPin = 'New PIN is required'
        } else if (formData.newPin.length !== 4) {
            newErrors.newPin = 'PIN must be exactly 4 digits'
        }

        // Confirm PIN validation
        if (!formData.confirmPin) {
            newErrors.confirmPin = 'Please confirm your new PIN'
        } else if (formData.confirmPin.length !== 4) {
            newErrors.confirmPin = 'PIN must be exactly 4 digits'
        } else if (formData.newPin !== formData.confirmPin) {
            newErrors.confirmPin = 'PINs do not match'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    // Handle request reset token
    const handleRequestToken = async () => {
        setIsLoading(true)

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000))

            // In production: await authService.requestPinReset()

            setStep(2)
            setTimer(60)
            setCanResend(false)
            setResentCount(prev => prev + 1)
            toast.showSuccess('Reset code sent to your email! 📧')

        } catch (error) {
            toast.showError('Failed to send reset code. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    // Handle resend code
    const handleResend = async () => {
        if (!canResend) return

        setIsLoading(true)

        try {
            await new Promise(resolve => setTimeout(resolve, 1500))

            setTimer(60)
            setCanResend(false)
            setResentCount(prev => prev + 1)
            toast.showSuccess('Reset code resent! 📧')

        } catch (error) {
            toast.showError('Failed to resend code. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    // Handle reset PIN
    const handleResetPin = async () => {
        if (!validateTokenAndPin()) {
            return
        }

        setIsLoading(true)

        try {
            await new Promise(resolve => setTimeout(resolve, 2000))

            // Simulate token validation
            if (formData.token !== '123456') {
                setErrors({ token: 'Invalid verification code. Please try again.' })
                setIsLoading(false)
                return
            }

            setIsSuccess(true)
            toast.showSuccess('PIN reset successfully! 🔐')

            setTimeout(() => {
                navigate('/account/settings')
            }, 2500)

        } catch (error) {
            toast.showError('Failed to reset PIN. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    // Format timer
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
    }

    // Get PIN strength
    const getPinStrength = () => {
        const pin = formData.newPin
        if (!pin || pin.length < 4) return null

        const hasRepeating = /(\d)\1{2,}/.test(pin)
        const hasSequential = /012|123|234|345|456|567|678|789|890/.test(pin)

        if (hasRepeating || hasSequential) {
            return { label: 'Weak', color: 'text-red-500', barColor: 'bg-red-500' }
        }

        const hasDifferent = new Set(pin).size >= 3
        if (hasDifferent) {
            return { label: 'Strong', color: 'text-green-500', barColor: 'bg-green-500' }
        }

        return { label: 'Fair', color: 'text-yellow-500', barColor: 'bg-yellow-500' }
    }

    const pinStrength = getPinStrength()

    // Render success state
    if (isSuccess) {
        return (
            <div className="min-h-screen bg-[#0F1229] text-[#F7F7FA] flex items-center justify-center px-4 relative overflow-hidden">
                <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full opacity-30 blur-3xl"
                     style={{ background: 'radial-gradient(circle, #6C5CE7 0%, transparent 70%)' }}
                />
                <div className="absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full opacity-20 blur-3xl"
                     style={{ background: 'radial-gradient(circle, #C9A24B 0%, transparent 70%)' }}
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
                        PIN Reset! 🔐
                    </h2>
                    <p className="text-[#C7C9DC] mt-2">
                        Your transaction PIN has been reset successfully.
                    </p>
                    <div className="mt-4 flex justify-center">
                        <Loader className="w-6 h-6 animate-spin text-[#C9A24B]" />
                    </div>
                    <p className="text-sm text-[#7E81A0] mt-2">Redirecting to settings...</p>
                </div>
            </div>
        )
    }

    // Render step 1: Request Token
    const renderStep1 = () => (
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
            <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-[#C9A24B]/10 flex items-center justify-center mx-auto mb-4">
                    <Key className="w-8 h-8 text-[#C9A24B]" />
                </div>
                <h2 className="text-lg font-semibold">Reset PIN</h2>
                <p className="text-sm text-[#7E81A0] mt-1">
                    A 6-digit reset code will be sent to your registered email
                </p>
                <div className="flex items-center justify-center gap-2 mt-2 text-sm text-[#C9A24B]">
                    <Mail className="w-4 h-4" />
                    {userEmail}
                </div>
            </div>

            <div className="bg-[#C9A24B]/5 border border-[#C9A24B]/20 rounded-xl p-3 mb-4">
                <div className="flex items-start gap-2">
                    <Shield className="w-4 h-4 text-[#C9A24B] flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-[#C7C9DC]">
                        The reset code will expire in 5 minutes. Only request if you have access to your registered email.
                    </p>
                </div>
            </div>

            <button
                onClick={handleRequestToken}
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
                        <Send className="w-4 h-4" />
                        Send Reset Code
                    </>
                )}
            </button>

            {resentCount > 0 && (
                <p className="text-center text-xs text-[#7E81A0] mt-3">
                    Code sent {resentCount} time{resentCount > 1 ? 's' : ''}
                </p>
            )}
        </div>
    )

    // Render step 2: Token & New PIN
    const renderStep2 = () => (
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
            <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-[#C9A24B]/10 flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-[#C9A24B]" />
                </div>
                <h2 className="text-lg font-semibold">Set New PIN</h2>
                <p className="text-sm text-[#7E81A0] mt-1">
                    Enter the code sent to your email and set a new PIN
                </p>
                <div className="flex items-center justify-center gap-2 mt-1 text-xs text-[#C9A24B]">
                    <Mail className="w-3 h-3" />
                    {userEmail}
                </div>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleResetPin() }} className="space-y-4">
                {/* Token Input */}
                <div>
                    <label className="block text-sm font-medium text-[#C7C9DC] mb-2">
                        Verification Code
                    </label>
                    <div
                        className="flex justify-center gap-2 sm:gap-3"
                        onPaste={handleOtpPaste}
                    >
                        {[0, 1, 2, 3, 4, 5].map((index) => (
                            <input
                                key={index}
                                ref={(el) => (inputRefs.current[index] = el)}
                                type={showToken ? 'text' : 'password'}
                                maxLength={1}
                                value={formData.token[index] || ''}
                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                className={`w-12 h-14 text-center text-2xl font-bold bg-white/[0.05] border rounded-xl text-[#F7F7FA] focus:outline-none focus:ring-2 transition-all duration-200 ${
                                    errors.token
                                        ? 'border-red-500 focus:ring-red-500/50'
                                        : 'border-white/10 focus:ring-[#C9A24B]/50 focus:border-[#C9A24B]'
                                }`}
                                disabled={isLoading}
                            />
                        ))}
                    </div>
                    <div className="flex justify-between mt-2">
                        <button
                            type="button"
                            onClick={() => setShowToken(!showToken)}
                            className="text-xs text-[#7E81A0] hover:text-[#C9A24B] transition-colors flex items-center gap-1"
                        >
                            {showToken ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                            {showToken ? 'Hide Code' : 'Show Code'}
                        </button>
                        <span className="text-xs text-[#7E81A0]">6 digits required</span>
                    </div>
                    {errors.token && (
                        <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {errors.token}
                        </p>
                    )}
                </div>

                {/* New PIN */}
                <div>
                    <label className="block text-sm font-medium text-[#C7C9DC] mb-1.5">
                        New PIN
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="w-5 h-5 text-[#7E81A0]" />
                        </div>
                        <input
                            type={showNewPin ? 'text' : 'password'}
                            name="newPin"
                            value={formData.newPin}
                            onChange={handlePinChange}
                            maxLength={4}
                            placeholder="Enter new PIN"
                            className={`w-full pl-10 pr-12 py-3 bg-white/[0.05] border rounded-xl text-[#F7F7FA] placeholder-[#7E81A0] focus:outline-none focus:ring-2 transition-all duration-200 text-sm text-center tracking-[0.5rem] font-mono ${
                                errors.newPin
                                    ? 'border-red-500 focus:ring-red-500/50'
                                    : 'border-white/10 focus:ring-[#C9A24B]/50 focus:border-[#C9A24B]'
                            }`}
                            disabled={isLoading}
                        />
                        <button
                            type="button"
                            onClick={() => setShowNewPin(!showNewPin)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#7E81A0] hover:text-[#F7F7FA] transition-colors"
                        >
                            {showNewPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                    {errors.newPin && (
                        <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {errors.newPin}
                        </p>
                    )}

                    {/* PIN Strength Indicator */}
                    {formData.newPin && formData.newPin.length === 4 && pinStrength && (
                        <div className="mt-2">
                            <div className="flex items-center gap-2">
                                <div className="flex-1 h-1 rounded-full bg-white/[0.05] overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-300 ${pinStrength.barColor} w-full`}
                                    />
                                </div>
                                <span className={`text-xs font-medium ${pinStrength.color}`}>
                                    {pinStrength.label}
                                </span>
                            </div>
                            {pinStrength.label === 'Weak' && (
                                <p className="text-xs text-[#7E81A0] mt-1">
                                    Tip: Avoid repeating numbers or sequential patterns (e.g., 1234, 1111)
                                </p>
                            )}
                        </div>
                    )}
                </div>

                {/* Confirm PIN */}
                <div>
                    <label className="block text-sm font-medium text-[#C7C9DC] mb-1.5">
                        Confirm PIN
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Shield className="w-5 h-5 text-[#7E81A0]" />
                        </div>
                        <input
                            type={showConfirmPin ? 'text' : 'password'}
                            name="confirmPin"
                            value={formData.confirmPin}
                            onChange={handlePinChange}
                            maxLength={4}
                            placeholder="Confirm new PIN"
                            className={`w-full pl-10 pr-12 py-3 bg-white/[0.05] border rounded-xl text-[#F7F7FA] placeholder-[#7E81A0] focus:outline-none focus:ring-2 transition-all duration-200 text-sm text-center tracking-[0.5rem] font-mono ${
                                errors.confirmPin
                                    ? 'border-red-500 focus:ring-red-500/50'
                                    : 'border-white/10 focus:ring-[#C9A24B]/50 focus:border-[#C9A24B]'
                            }`}
                            disabled={isLoading}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPin(!showConfirmPin)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#7E81A0] hover:text-[#F7F7FA] transition-colors"
                        >
                            {showConfirmPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                    {errors.confirmPin && (
                        <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {errors.confirmPin}
                        </p>
                    )}
                </div>

                {/* Resend Section */}
                <div className="flex items-center justify-center gap-2">
                    <span className="text-sm text-[#7E81A0]">
                        Didn't receive the code?
                    </span>
                    {canResend ? (
                        <button
                            type="button"
                            onClick={handleResend}
                            disabled={isLoading}
                            className="text-sm text-[#C9A24B] hover:text-[#D4B35C] transition-colors flex items-center gap-1 font-medium"
                        >
                            {isLoading ? (
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

                {/* Action Buttons */}
                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex-1 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-[#F7F7FA] font-medium text-sm hover:bg-white/[0.1] transition-colors flex items-center justify-center gap-2"
                        disabled={isLoading}
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`flex-1 py-3 rounded-xl bg-[#C9A24B] text-[#0F1229] font-medium text-sm transition-colors flex items-center justify-center gap-2 ${
                            isLoading
                                ? 'opacity-70 cursor-not-allowed'
                                : 'hover:bg-[#D4B35C]'
                        }`}
                    >
                        {isLoading ? (
                            <>
                                <Loader className="w-4 h-4 animate-spin" />
                                Resetting...
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4" />
                                Reset PIN
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    )

    return (
        <div className="min-h-screen bg-[#0F1229] text-[#F7F7FA] px-4 py-8">
            <div className="max-w-md mx-auto">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <button
                        onClick={() => navigate('/account/settings')}
                        className="p-2 rounded-xl hover:bg-white/[0.05] transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-[#7E81A0]" />
                    </button>
                    <div>
                        <h1 className="text-xl font-bold" style={{ fontFamily: "'Fraunces', serif" }}>
                            Reset PIN
                        </h1>
                        <p className="text-xs text-[#7E81A0]">
                            {step === 1 ? 'Request a reset code' : 'Set a new PIN'}
                        </p>
                    </div>
                </div>

                {/* Step Indicator */}
                <div className="flex items-center gap-2 mb-6">
                    {[1, 2].map((s) => (
                        <div key={s} className="flex items-center flex-1">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                                s === step
                                    ? 'bg-[#C9A24B] text-[#0F1229]'
                                    : s < step
                                        ? 'bg-green-500 text-[#0F1229]'
                                        : 'bg-white/[0.05] text-[#7E81A0]'
                            }`}>
                                {s < step ? <CheckCircle className="w-4 h-4" /> : s}
                            </div>
                            {s < 2 && (
                                <div className={`flex-1 h-0.5 mx-2 transition-colors ${
                                    s < step ? 'bg-[#C9A24B]' : 'bg-white/[0.05]'
                                }`} />
                            )}
                        </div>
                    ))}
                </div>

                {/* Content */}
                {step === 1 && renderStep1()}
                {step === 2 && renderStep2()}

                {/* Footer Info */}
                <div className="mt-4 text-center">
                    <div className="inline-flex items-center gap-2 text-xs text-[#7E81A0]">
                        <Shield className="w-3.5 h-3.5 text-[#34D399]" />
                        Secured with 256-bit encryption
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

export default ResetPin