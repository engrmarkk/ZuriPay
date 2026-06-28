import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToastActions } from '../../../../hooks/useToastActions'
import {
    ArrowLeft,
    Smartphone,
    Phone,
    Banknote,
    Shield,
    Send,
    CheckCircle,
    AlertCircle,
    Eye,
    EyeOff,
    Loader,
    X,
    ChevronDown,
    Zap,
    Users,
    Clock
} from 'lucide-react'

const Airtime = () => {
    const navigate = useNavigate()
    const toast = useToastActions()

    // State
    const [step, setStep] = useState(1) // 1: Form, 2: Confirm, 3: Success
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [isVerifying, setIsVerifying] = useState(false)

    // Form data
    const [formData, setFormData] = useState({
        network: '',
        phoneNumber: '',
        amount: '',
        pin: ''
    })

    // Errors
    const [errors, setErrors] = useState({})
    const [pinError, setPinError] = useState('')

    // Success state
    const [transactionRef, setTransactionRef] = useState('')
    const [networkLogo, setNetworkLogo] = useState('')

    // Networks
    const networks = [
        {
            id: 'mtn',
            name: 'MTN',
            code: 'MTN',
            color: '#F59E0B',
            bgColor: 'bg-yellow-500/10',
            borderColor: 'border-yellow-500/20',
            textColor: 'text-yellow-500',
            logo: '📱'
        },
        {
            id: 'glo',
            name: 'Glo',
            code: 'GLO',
            color: '#3B82F6',
            bgColor: 'bg-blue-500/10',
            borderColor: 'border-blue-500/20',
            textColor: 'text-blue-500',
            logo: '📶'
        },
        {
            id: 'airtel',
            name: 'Airtel',
            code: 'AIRTEL',
            color: '#EF4444',
            bgColor: 'bg-red-500/10',
            borderColor: 'border-red-500/20',
            textColor: 'text-red-500',
            logo: '📡'
        },
        {
            id: 'nineMobile',
            name: '9mobile',
            code: '9MOBILE',
            color: '#8B5CF6',
            bgColor: 'bg-purple-500/10',
            borderColor: 'border-purple-500/20',
            textColor: 'text-purple-500',
            logo: '📲'
        }
    ]

    // Quick amounts
    const quickAmounts = [50, 100, 200, 500, 1000, 2000, 5000]

    // Handle network selection
    const handleNetworkSelect = (network) => {
        setFormData(prev => ({ ...prev, network: network.id }))
        setNetworkLogo(network.logo)
        if (errors.network) {
            setErrors(prev => ({ ...prev, network: '' }))
        }
    }

    // Handle phone number input (only digits, max 11)
    const handlePhoneChange = (e) => {
        const value = e.target.value.replace(/\D/g, '')
        if (value.length <= 11) {
            setFormData(prev => ({ ...prev, phoneNumber: value }))
            if (errors.phoneNumber) {
                setErrors(prev => ({ ...prev, phoneNumber: '' }))
            }
        }
    }

    // Handle amount input (only digits)
    const handleAmountChange = (e) => {
        const value = e.target.value.replace(/\D/g, '')
        setFormData(prev => ({ ...prev, amount: value }))
        if (errors.amount) {
            setErrors(prev => ({ ...prev, amount: '' }))
        }
    }

    // Handle quick amount selection
    const handleQuickAmount = (amount) => {
        setFormData(prev => ({ ...prev, amount: amount.toString() }))
        if (errors.amount) {
            setErrors(prev => ({ ...prev, amount: '' }))
        }
    }

    // Handle pin change
    const handlePinChange = (e) => {
        const value = e.target.value.replace(/\D/g, '')
        if (value.length <= 4) {
            setFormData(prev => ({ ...prev, pin: value }))
            setPinError('')
        }
    }

    // Validate form (Step 1)
    const validateForm = () => {
        const newErrors = {}

        if (!formData.network) {
            newErrors.network = 'Please select a network'
        }

        if (!formData.phoneNumber) {
            newErrors.phoneNumber = 'Phone number is required'
        } else if (formData.phoneNumber.length < 10 || formData.phoneNumber.length > 11) {
            newErrors.phoneNumber = 'Please enter a valid phone number (10-11 digits)'
        } else if (!/^0[7-9][0-9]{8,9}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Please enter a valid Nigerian phone number'
        }

        if (!formData.amount) {
            newErrors.amount = 'Please enter an amount'
        } else if (parseInt(formData.amount) < 50) {
            newErrors.amount = 'Minimum amount is ₦50'
        } else if (parseInt(formData.amount) > 10000) {
            newErrors.amount = 'Maximum amount is ₦10,000'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    // Handle continue to step 2
    const handleContinue = () => {
        if (validateForm()) {
            setStep(2)
        }
    }

    // Handle send (Step 2)
    const handleSend = async () => {
        if (!formData.pin || formData.pin.length !== 4) {
            setPinError('Please enter your 4-digit PIN')
            return
        }

        setIsLoading(true)

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000))

            // Generate transaction reference
            const ref = 'AIR-' + Date.now().toString().slice(-8) + '-' + Math.random().toString(36).substring(2, 6).toUpperCase()
            setTransactionRef(ref)

            setStep(3)
            toast.showSuccess('Airtime purchased successfully! 🎉')

        } catch (error) {
            toast.showError('Purchase failed. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount)
    }

    // Format phone number
    const formatPhoneNumber = (number) => {
        if (number.length <= 4) return number
        if (number.length <= 7) return `${number.slice(0, 4)} ${number.slice(4)}`
        return `${number.slice(0, 4)} ${number.slice(4, 7)} ${number.slice(7)}`
    }

    // Get network details
    const getNetworkDetails = (networkId) => {
        return networks.find(n => n.id === networkId)
    }

    // Reset form
    const handleNewPurchase = () => {
        setStep(1)
        setFormData({
            network: '',
            phoneNumber: '',
            amount: '',
            pin: ''
        })
        setErrors({})
        setPinError('')
        setTransactionRef('')
        setNetworkLogo('')
    }

    const selectedNetwork = getNetworkDetails(formData.network)

    // Render step 1: Form
    const renderStep1 = () => (
        <div className="space-y-5">
            {/* Network Selection */}
            <div>
                <label className="block text-sm font-medium text-[#C7C9DC] mb-2">
                    Select Network
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {networks.map((network) => {
                        const isSelected = formData.network === network.id
                        return (
                            <button
                                key={network.id}
                                type="button"
                                onClick={() => handleNetworkSelect(network)}
                                className={`p-3 rounded-xl border transition-all duration-200 text-center ${
                                    isSelected
                                        ? `${network.bgColor} ${network.borderColor} border-2`
                                        : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06]'
                                }`}
                            >
                                <div className="text-2xl mb-1">{network.logo}</div>
                                <div className={`text-sm font-medium ${isSelected ? network.textColor : 'text-[#F7F7FA]'}`}>
                                    {network.name}
                                </div>
                            </button>
                        )
                    })}
                </div>
                {errors.network && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.network}
                    </p>
                )}
            </div>

            {/* Phone Number */}
            <div>
                <label className="block text-sm font-medium text-[#C7C9DC] mb-1.5">
                    Phone Number
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="w-5 h-5 text-[#7E81A0]" />
                    </div>
                    <input
                        type="text"
                        value={formatPhoneNumber(formData.phoneNumber)}
                        onChange={handlePhoneChange}
                        placeholder="0801 234 5678"
                        className={`w-full pl-10 pr-4 py-3 bg-white/[0.05] border rounded-xl text-[#F7F7FA] placeholder-[#7E81A0] focus:outline-none focus:ring-2 transition-all duration-200 text-sm font-mono ${
                            errors.phoneNumber
                                ? 'border-red-500 focus:ring-red-500/50'
                                : 'border-white/10 focus:ring-[#C9A24B]/50 focus:border-[#C9A24B]'
                        }`}
                        maxLength={14}
                    />
                </div>
                {errors.phoneNumber && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.phoneNumber}
                    </p>
                )}
                <p className="text-xs text-[#7E81A0] mt-1.5">
                    Enter a valid Nigerian phone number (e.g., 08012345678)
                </p>
            </div>

            {/* Amount */}
            <div>
                <label className="block text-sm font-medium text-[#C7C9DC] mb-1.5">
                    Amount (₦)
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Banknote className="w-5 h-5 text-[#7E81A0]" />
                    </div>
                    <input
                        type="text"
                        value={formData.amount}
                        onChange={handleAmountChange}
                        placeholder="Enter amount"
                        className={`w-full pl-10 pr-4 py-3 bg-white/[0.05] border rounded-xl text-[#F7F7FA] placeholder-[#7E81A0] focus:outline-none focus:ring-2 transition-all duration-200 text-sm ${
                            errors.amount
                                ? 'border-red-500 focus:ring-red-500/50'
                                : 'border-white/10 focus:ring-[#C9A24B]/50 focus:border-[#C9A24B]'
                        }`}
                    />
                </div>
                {errors.amount && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.amount}
                    </p>
                )}

                {/* Quick Amounts */}
                <div className="flex flex-wrap gap-2 mt-3">
                    {quickAmounts.map((amount) => (
                        <button
                            key={amount}
                            type="button"
                            onClick={() => handleQuickAmount(amount)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                                parseInt(formData.amount) === amount
                                    ? 'bg-[#C9A24B] text-[#0F1229]'
                                    : 'bg-white/[0.05] text-[#7E81A0] hover:bg-white/[0.1] hover:text-[#F7F7FA]'
                            }`}
                        >
                            ₦{amount}
                        </button>
                    ))}
                </div>
                <p className="text-xs text-[#7E81A0] mt-2">
                    Min: ₦50 | Max: ₦10,000
                </p>
            </div>

            {/* Continue Button */}
            <button
                onClick={handleContinue}
                className="w-full py-3.5 rounded-xl bg-[#C9A24B] text-[#0F1229] font-medium text-sm hover:bg-[#D4B35C] transition-colors flex items-center justify-center gap-2"
            >
                Continue
                <Send className="w-4 h-4" />
            </button>
        </div>
    )

    // Render step 2: Confirm
    const renderStep2 = () => (
        <div className="space-y-6">
            {/* Purchase Summary */}
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-3 pb-3 border-b border-white/[0.06]">
                    <div className="text-3xl">{selectedNetwork?.logo}</div>
                    <div>
                        <div className="text-sm font-medium">{selectedNetwork?.name}</div>
                        <div className="text-xs text-[#7E81A0]">Airtime Purchase</div>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-[#7E81A0]">Phone Number</span>
                    <span className="text-sm font-mono">{formatPhoneNumber(formData.phoneNumber)}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-[#7E81A0]">Amount</span>
                    <span className="text-lg font-bold text-[#C9A24B]">{formatCurrency(parseInt(formData.amount))}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-[#7E81A0]">Fee</span>
                    <span className="text-sm text-[#7E81A0]">Free</span>
                </div>
                <div className="border-t border-white/[0.06] pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                        <span className="text-[#F7F7FA]">Total</span>
                        <span className="text-[#C9A24B]">{formatCurrency(parseInt(formData.amount))}</span>
                    </div>
                </div>
                <button
                    onClick={() => setStep(1)}
                    className="text-xs text-[#C9A24B] hover:text-[#D4B35C] transition-colors"
                >
                    Edit details
                </button>
            </div>

            {/* PIN Input */}
            <div>
                <label className="block text-sm font-medium text-[#C7C9DC] mb-1.5">
                    Enter Transaction PIN
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Shield className="w-5 h-5 text-[#7E81A0]" />
                    </div>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.pin}
                        onChange={handlePinChange}
                        placeholder="Enter 4-digit PIN"
                        className={`w-full pl-10 pr-12 py-3 bg-white/[0.05] border rounded-xl text-[#F7F7FA] placeholder-[#7E81A0] focus:outline-none focus:ring-2 transition-all duration-200 text-sm text-center tracking-[1rem] font-mono ${
                            pinError
                                ? 'border-red-500 focus:ring-red-500/50'
                                : 'border-white/10 focus:ring-[#C9A24B]/50 focus:border-[#C9A24B]'
                        }`}
                        maxLength={4}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#7E81A0] hover:text-[#F7F7FA] transition-colors"
                    >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                </div>
                {pinError && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {pinError}
                    </p>
                )}
                <p className="text-xs text-[#7E81A0] mt-1.5">Enter your 4-digit transaction PIN to confirm</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
                <button
                    onClick={() => setStep(1)}
                    className="flex-1 py-3.5 rounded-xl bg-white/[0.05] border border-white/10 text-[#F7F7FA] font-medium text-sm hover:bg-white/[0.1] transition-colors"
                    disabled={isLoading}
                >
                    Back
                </button>
                <button
                    onClick={handleSend}
                    disabled={isLoading}
                    className={`flex-1 py-3.5 rounded-xl bg-[#C9A24B] text-[#0F1229] font-medium text-sm transition-colors flex items-center justify-center gap-2 ${
                        isLoading
                            ? 'opacity-70 cursor-not-allowed'
                            : 'hover:bg-[#D4B35C]'
                    }`}
                >
                    {isLoading ? (
                        <>
                            <Loader className="w-4 h-4 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        <>
                            <Send className="w-4 h-4" />
                            Buy Airtime
                        </>
                    )}
                </button>
            </div>
        </div>
    )

    // Render step 3: Success
    const renderStep3 = () => (
        <div className="text-center py-8 animate-fadeIn">
            {/* Success Animation */}
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

            <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Fraunces', serif" }}>
                Airtime Purchased! 🎉
            </h2>
            <p className="text-[#7E81A0] text-sm mb-6">
                Airtime has been sent successfully
            </p>

            {/* Transaction Details */}
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 text-left space-y-3 mb-6">
                <div className="flex items-center gap-3 pb-3 border-b border-white/[0.06]">
                    <div className="text-3xl">{selectedNetwork?.logo}</div>
                    <div>
                        <div className="text-sm font-medium">{selectedNetwork?.name}</div>
                        <div className="text-xs text-[#7E81A0]">Airtime Purchase</div>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-[#7E81A0]">Phone Number</span>
                    <span className="text-sm font-mono">{formatPhoneNumber(formData.phoneNumber)}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-[#7E81A0]">Amount</span>
                    <span className="text-lg font-bold text-[#C9A24B]">{formatCurrency(parseInt(formData.amount))}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-[#7E81A0]">Reference</span>
                    <span className="text-sm font-mono text-[#C9A24B]">{transactionRef}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-[#7E81A0]">Date</span>
                    <span className="text-sm">{new Date().toLocaleString('en-NG')}</span>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
                <button
                    onClick={handleNewPurchase}
                    className="flex-1 py-3.5 rounded-xl bg-[#C9A24B] text-[#0F1229] font-medium text-sm hover:bg-[#D4B35C] transition-colors flex items-center justify-center gap-2"
                >
                    <Smartphone className="w-4 h-4" />
                    Buy Again
                </button>
                <button
                    onClick={() => navigate('/account/dashboard')}
                    className="flex-1 py-3.5 rounded-xl bg-white/[0.05] border border-white/10 text-[#F7F7FA] font-medium text-sm hover:bg-white/[0.1] transition-colors flex items-center justify-center gap-2"
                >
                    Dashboard
                </button>
            </div>
        </div>
    )

    return (
        <div className="min-h-screen bg-[#0F1229] text-[#F7F7FA]">
            <div className="max-w-lg mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <button
                        onClick={() => step === 1 ? navigate('/account/dashboard') : setStep(1)}
                        className="p-2 rounded-xl hover:bg-white/[0.05] transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-[#7E81A0]" />
                    </button>
                    <div>
                        <h1 className="text-xl font-bold" style={{ fontFamily: "'Fraunces', serif" }}>
                            {step === 1 ? 'Buy Airtime' : step === 2 ? 'Confirm Purchase' : 'Success'}
                        </h1>
                        <p className="text-xs text-[#7E81A0]">
                            {step === 1 && 'Select network and enter details'}
                            {step === 2 && 'Review and confirm your purchase'}
                            {step === 3 && 'Airtime purchased successfully'}
                        </p>
                    </div>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center gap-2 mb-6">
                    {[1, 2, 3].map((s) => (
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
                            {s < 3 && (
                                <div className={`flex-1 h-0.5 mx-2 transition-colors ${
                                    s < step ? 'bg-[#C9A24B]' : 'bg-white/[0.05]'
                                }`} />
                            )}
                        </div>
                    ))}
                </div>

                {/* Content */}
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                    {step === 1 && renderStep1()}
                    {step === 2 && renderStep2()}
                    {step === 3 && renderStep3()}
                </div>

                {/* Footer Info */}
                {step < 3 && (
                    <div className="mt-4 text-center">
                        <div className="flex items-center justify-center gap-2 text-xs text-[#7E81A0]">
                            <Shield className="w-3.5 h-3.5" />
                            <span>256-bit encrypted transaction</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Animations CSS */}
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                @keyframes ping-slow {
                    0% { transform: scale(0.95); opacity: 1; }
                    100% { transform: scale(1.5); opacity: 0; }
                }
                @keyframes ping-slower {
                    0% { transform: scale(0.95); opacity: 0.5; }
                    100% { transform: scale(1.8); opacity: 0; }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.4s ease-out;
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

export default Airtime