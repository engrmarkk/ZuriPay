import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useToastActions } from '../../hooks/useToastActions'
import {
    Lock,
    Eye,
    EyeOff,
    CheckCircle,
    XCircle,
    AlertCircle,
    ArrowLeft,
    Save,
    Shield,
    Key,
    Zap
} from 'lucide-react'

const ChangePassword = () => {
    const navigate = useNavigate()
    const toast = useToastActions()
    const [isLoading, setIsLoading] = useState(false)

    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    })

    const [errors, setErrors] = useState({})
    const [passwordStrength, setPasswordStrength] = useState({
        score: 0,
        label: '',
        color: '',
        requirements: {
            length: false,
            uppercase: false,
            lowercase: false,
            number: false,
            special: false
        }
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))

        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }

        // Check password strength when new password changes
        if (name === 'newPassword') {
            checkPasswordStrength(value)
        }
    }

    const togglePasswordVisibility = (field) => {
        setShowPasswords(prev => ({
            ...prev,
            [field]: !prev[field]
        }))
    }

    const checkPasswordStrength = (password) => {
        const requirements = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /\d/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
        }

        const metCount = Object.values(requirements).filter(Boolean).length

        let score = 0
        let label = 'Weak'
        let color = 'text-red-500'

        if (password.length === 0) {
            score = 0
            label = ''
            color = ''
        } else if (metCount <= 2) {
            score = 1
            label = 'Weak'
            color = 'text-red-500'
        } else if (metCount <= 3) {
            score = 2
            label = 'Fair'
            color = 'text-yellow-500'
        } else if (metCount <= 4) {
            score = 3
            label = 'Good'
            color = 'text-blue-500'
        } else {
            score = 4
            label = 'Strong'
            color = 'text-green-500'
        }

        setPasswordStrength({
            score,
            label,
            color,
            requirements
        })
    }

    const validateForm = () => {
        const newErrors = {}

        // Current password validation
        if (!formData.currentPassword) {
            newErrors.currentPassword = 'Current password is required'
        } else if (formData.currentPassword.length < 8) {
            newErrors.currentPassword = 'Password must be at least 8 characters'
        }

        // New password validation
        if (!formData.newPassword) {
            newErrors.newPassword = 'New password is required'
        } else if (formData.newPassword.length < 8) {
            newErrors.newPassword = 'Password must be at least 8 characters'
        } else if (!/(?=.*[a-z])/.test(formData.newPassword)) {
            newErrors.newPassword = 'Password must contain at least one lowercase letter'
        } else if (!/(?=.*[A-Z])/.test(formData.newPassword)) {
            newErrors.newPassword = 'Password must contain at least one uppercase letter'
        } else if (!/(?=.*\d)/.test(formData.newPassword)) {
            newErrors.newPassword = 'Password must contain at least one number'
        } else if (!/(?=.*[!@#$%^&*(),.?":{}|<>])/.test(formData.newPassword)) {
            newErrors.newPassword = 'Password must contain at least one special character'
        }

        // Confirm password validation
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password'
        } else if (formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match'
        }

        // Check if new password is same as current
        if (formData.newPassword && formData.currentPassword &&
            formData.newPassword === formData.currentPassword) {
            newErrors.newPassword = 'New password cannot be the same as current password'
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
            await new Promise(resolve => setTimeout(resolve, 2000))

            // Simulate current password check
            if (formData.currentPassword !== 'Password123!') {
                setErrors({
                    currentPassword: 'Current password is incorrect'
                })
                setIsLoading(false)
                return
            }

            toast.showSuccess('Password changed successfully! 🔐')

            // Reset form
            setFormData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            })
            setPasswordStrength({
                score: 0,
                label: '',
                color: '',
                requirements: {
                    length: false,
                    uppercase: false,
                    lowercase: false,
                    number: false,
                    special: false
                }
            })

            // Navigate back to settings after delay
            setTimeout(() => {
                navigate('/account/settings')
            }, 1500)

        } catch (error) {
            toast.showError('Failed to change password. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    const getStrengthBarColor = () => {
        switch (passwordStrength.score) {
            case 1: return 'bg-red-500'
            case 2: return 'bg-yellow-500'
            case 3: return 'bg-blue-500'
            case 4: return 'bg-green-500'
            default: return 'bg-white/[0.05]'
        }
    }

    const getStrengthWidth = () => {
        switch (passwordStrength.score) {
            case 0: return 'w-0'
            case 1: return 'w-1/4'
            case 2: return 'w-2/4'
            case 3: return 'w-3/4'
            case 4: return 'w-full'
            default: return 'w-0'
        }
    }

    return (
        <div className="min-h-screen bg-[#0F1229] text-[#F7F7FA]">
            <div className="max-w-2xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Link
                        to="/account/settings"
                        className="p-2 rounded-xl hover:bg-white/[0.05] transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-[#7E81A0]" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold" style={{ fontFamily: "'Fraunces', serif" }}>
                            Change Password
                        </h1>
                        <p className="text-[#7E81A0] text-sm">Update your password to keep your account secure</p>
                    </div>
                </div>

                {/* Security Tips */}
                <div className="bg-[#C9A24B]/5 border border-[#C9A24B]/20 rounded-2xl p-4 mb-6">
                    <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-[#C9A24B] flex-shrink-0 mt-0.5" />
                        <div>
                            <h4 className="text-sm font-medium text-[#C9A24B]">Password Security Tips</h4>
                            <ul className="text-xs text-[#C7C9DC] mt-1 space-y-1">
                                <li>• Use at least 8 characters</li>
                                <li>• Include uppercase and lowercase letters</li>
                                <li>• Add numbers and special characters</li>
                                <li>• Avoid using common words or personal information</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Change Password Form */}
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Current Password */}
                        <div>
                            <label htmlFor="currentPassword" className="block text-sm font-medium text-[#C7C9DC] mb-1.5">
                                Current Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-[#7E81A0]" />
                                </div>
                                <input
                                    id="currentPassword"
                                    name="currentPassword"
                                    type={showPasswords.current ? 'text' : 'password'}
                                    value={formData.currentPassword}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-12 py-2.5 bg-white/[0.05] border rounded-xl text-[#F7F7FA] placeholder-[#7E81A0] focus:outline-none focus:ring-2 transition-all duration-200 text-sm ${
                                        errors.currentPassword
                                            ? 'border-red-500 focus:ring-red-500/50'
                                            : 'border-white/10 focus:ring-[#C9A24B]/50 focus:border-[#C9A24B]'
                                    }`}
                                    placeholder="Enter current password"
                                />
                                <button
                                    type="button"
                                    onClick={() => togglePasswordVisibility('current')}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#7E81A0] hover:text-[#F7F7FA] transition-colors"
                                >
                                    {showPasswords.current ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            {errors.currentPassword && (
                                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                                    <AlertCircle className="h-3.5 w-3.5" />
                                    {errors.currentPassword}
                                </p>
                            )}
                        </div>

                        {/* New Password */}
                        <div>
                            <label htmlFor="newPassword" className="block text-sm font-medium text-[#C7C9DC] mb-1.5">
                                New Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Key className="h-5 w-5 text-[#7E81A0]" />
                                </div>
                                <input
                                    id="newPassword"
                                    name="newPassword"
                                    type={showPasswords.new ? 'text' : 'password'}
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-12 py-2.5 bg-white/[0.05] border rounded-xl text-[#F7F7FA] placeholder-[#7E81A0] focus:outline-none focus:ring-2 transition-all duration-200 text-sm ${
                                        errors.newPassword
                                            ? 'border-red-500 focus:ring-red-500/50'
                                            : 'border-white/10 focus:ring-[#C9A24B]/50 focus:border-[#C9A24B]'
                                    }`}
                                    placeholder="Enter new password"
                                />
                                <button
                                    type="button"
                                    onClick={() => togglePasswordVisibility('new')}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#7E81A0] hover:text-[#F7F7FA] transition-colors"
                                >
                                    {showPasswords.new ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            {errors.newPassword && (
                                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                                    <AlertCircle className="h-3.5 w-3.5" />
                                    {errors.newPassword}
                                </p>
                            )}

                            {/* Password Strength Indicator */}
                            {formData.newPassword && (
                                <div className="mt-3">
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
                                            <div
                                                className={`h-full transition-all duration-300 ${getStrengthBarColor()} ${getStrengthWidth()}`}
                                            />
                                        </div>
                                        <span className={`text-xs font-medium ${passwordStrength.color}`}>
                      {passwordStrength.label}
                    </span>
                                    </div>

                                    {/* Password Requirements */}
                                    <div className="grid grid-cols-2 gap-2 mt-3">
                                        {Object.entries(passwordStrength.requirements).map(([key, met]) => (
                                            <div key={key} className="flex items-center gap-1.5">
                                                {met ? (
                                                    <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                                                ) : (
                                                    <XCircle className="w-3.5 h-3.5 text-[#7E81A0]" />
                                                )}
                                                <span className={`text-xs ${
                                                    met ? 'text-green-500' : 'text-[#7E81A0]'
                                                }`}>
                          {key === 'length' && '8+ characters'}
                                                    {key === 'uppercase' && 'Uppercase'}
                                                    {key === 'lowercase' && 'Lowercase'}
                                                    {key === 'number' && 'Number'}
                                                    {key === 'special' && 'Special character'}
                        </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#C7C9DC] mb-1.5">
                                Confirm New Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-[#7E81A0]" />
                                </div>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showPasswords.confirm ? 'text' : 'password'}
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-12 py-2.5 bg-white/[0.05] border rounded-xl text-[#F7F7FA] placeholder-[#7E81A0] focus:outline-none focus:ring-2 transition-all duration-200 text-sm ${
                                        errors.confirmPassword
                                            ? 'border-red-500 focus:ring-red-500/50'
                                            : 'border-white/10 focus:ring-[#C9A24B]/50 focus:border-[#C9A24B]'
                                    }`}
                                    placeholder="Confirm new password"
                                />
                                <button
                                    type="button"
                                    onClick={() => togglePasswordVisibility('confirm')}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#7E81A0] hover:text-[#F7F7FA] transition-colors"
                                >
                                    {showPasswords.confirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                                    <AlertCircle className="h-3.5 w-3.5" />
                                    {errors.confirmPassword}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-3 rounded-xl bg-[#C9A24B] text-[#0F1229] font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                                isLoading
                                    ? 'opacity-70 cursor-not-allowed'
                                    : 'hover:bg-[#D4B35C] hover:scale-[1.02] active:scale-[0.98]'
                            }`}
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-[#0F1229] border-t-transparent"></div>
                                    Changing Password...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4" />
                                    Change Password
                                </>
                            )}
                        </button>
                    </form>

                    {/* Back to Settings */}
                    <div className="mt-4 text-center">
                        <Link
                            to="/account/settings"
                            className="text-sm text-[#7E81A0] hover:text-[#C9A24B] transition-colors"
                        >
                            ← Back to Settings
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword