import React, { useState } from 'react'
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
    X
} from 'lucide-react'

const ChangePin = () => {
    const navigate = useNavigate()
    const toast = useToastActions()

    // State
    const [isLoading, setIsLoading] = useState(false)
    const [showOldPin, setShowOldPin] = useState(false)
    const [showNewPin, setShowNewPin] = useState(false)
    const [showConfirmPin, setShowConfirmPin] = useState(false)

    // Form data
    const [formData, setFormData] = useState({
        oldPin: '',
        newPin: '',
        confirmPin: ''
    })

    // Errors
    const [errors, setErrors] = useState({})
    const [isSuccess, setIsSuccess] = useState(false)

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target
        // Only allow digits
        if (!/^\d*$/.test(value)) return

        setFormData(prev => ({ ...prev, [name]: value }))
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    // Validate form
    const validateForm = () => {
        const newErrors = {}

        // Old PIN validation
        if (!formData.oldPin) {
            newErrors.oldPin = 'Current PIN is required'
        } else if (formData.oldPin.length !== 4) {
            newErrors.oldPin = 'PIN must be exactly 4 digits'
        }

        // New PIN validation
        if (!formData.newPin) {
            newErrors.newPin = 'New PIN is required'
        } else if (formData.newPin.length !== 4) {
            newErrors.newPin = 'PIN must be exactly 4 digits'
        } else if (formData.newPin === formData.oldPin) {
            newErrors.newPin = 'New PIN cannot be the same as current PIN'
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

    // Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setIsLoading(true)

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000))

            // Simulate old PIN validation
            if (formData.oldPin !== '1234') {
                setErrors({ oldPin: 'Current PIN is incorrect' })
                setIsLoading(false)
                return
            }

            // Success
            setIsSuccess(true)
            toast.showSuccess('PIN changed successfully! 🔐')

            // Redirect after 2 seconds
            setTimeout(() => {
                navigate('/account/settings')
            }, 2000)

        } catch (error) {
            toast.showError('Failed to change PIN. Please try again.')
        } finally {
            setIsLoading(false)
        }
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
                        PIN Changed! 🔐
                    </h2>
                    <p className="text-[#C7C9DC] mt-2">
                        Your transaction PIN has been updated successfully.
                    </p>
                    <div className="mt-4 flex justify-center">
                        <Loader className="w-6 h-6 animate-spin text-[#C9A24B]" />
                    </div>
                    <p className="text-sm text-[#7E81A0] mt-2">Redirecting to settings...</p>
                </div>
            </div>
        )
    }

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
                            Change PIN
                        </h1>
                        <p className="text-xs text-[#7E81A0]">
                            Update your transaction PIN
                        </p>
                    </div>
                </div>

                {/* Form Card */}
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Old PIN */}
                        <div>
                            <label className="block text-sm font-medium text-[#C7C9DC] mb-1.5">
                                Current PIN
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="w-5 h-5 text-[#7E81A0]" />
                                </div>
                                <input
                                    type={showOldPin ? 'text' : 'password'}
                                    name="oldPin"
                                    value={formData.oldPin}
                                    onChange={handleChange}
                                    maxLength={4}
                                    placeholder="Enter current PIN"
                                    className={`w-full pl-10 pr-12 py-3 bg-white/[0.05] border rounded-xl text-[#F7F7FA] placeholder-[#7E81A0] focus:outline-none focus:ring-2 transition-all duration-200 text-sm text-center tracking-[0.5rem] font-mono ${
                                        errors.oldPin
                                            ? 'border-red-500 focus:ring-red-500/50'
                                            : 'border-white/10 focus:ring-[#C9A24B]/50 focus:border-[#C9A24B]'
                                    }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowOldPin(!showOldPin)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#7E81A0] hover:text-[#F7F7FA] transition-colors"
                                >
                                    {showOldPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.oldPin && (
                                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                                    <AlertCircle className="w-3.5 h-3.5" />
                                    {errors.oldPin}
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
                                    <Key className="w-5 h-5 text-[#7E81A0]" />
                                </div>
                                <input
                                    type={showNewPin ? 'text' : 'password'}
                                    name="newPin"
                                    value={formData.newPin}
                                    onChange={handleChange}
                                    maxLength={4}
                                    placeholder="Enter new PIN"
                                    className={`w-full pl-10 pr-12 py-3 bg-white/[0.05] border rounded-xl text-[#F7F7FA] placeholder-[#7E81A0] focus:outline-none focus:ring-2 transition-all duration-200 text-sm text-center tracking-[0.5rem] font-mono ${
                                        errors.newPin
                                            ? 'border-red-500 focus:ring-red-500/50'
                                            : 'border-white/10 focus:ring-[#C9A24B]/50 focus:border-[#C9A24B]'
                                    }`}
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
                                Confirm New PIN
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Shield className="w-5 h-5 text-[#7E81A0]" />
                                </div>
                                <input
                                    type={showConfirmPin ? 'text' : 'password'}
                                    name="confirmPin"
                                    value={formData.confirmPin}
                                    onChange={handleChange}
                                    maxLength={4}
                                    placeholder="Confirm new PIN"
                                    className={`w-full pl-10 pr-12 py-3 bg-white/[0.05] border rounded-xl text-[#F7F7FA] placeholder-[#7E81A0] focus:outline-none focus:ring-2 transition-all duration-200 text-sm text-center tracking-[0.5rem] font-mono ${
                                        errors.confirmPin
                                            ? 'border-red-500 focus:ring-red-500/50'
                                            : 'border-white/10 focus:ring-[#C9A24B]/50 focus:border-[#C9A24B]'
                                    }`}
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

                        {/* Security Note */}
                        <div className="bg-[#C9A24B]/5 border border-[#C9A24B]/20 rounded-xl p-3">
                            <div className="flex items-start gap-2">
                                <Shield className="w-4 h-4 text-[#C9A24B] flex-shrink-0 mt-0.5" />
                                <p className="text-xs text-[#C7C9DC]">
                                    Your PIN is encrypted and stored securely. Never share your PIN with anyone.
                                </p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => navigate('/account/settings')}
                                className="flex-1 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-[#F7F7FA] font-medium text-sm hover:bg-white/[0.1] transition-colors flex items-center justify-center gap-2"
                            >
                                <X className="w-4 h-4" />
                                Cancel
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
                                        Changing...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4" />
                                        Change PIN
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

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

export default ChangePin