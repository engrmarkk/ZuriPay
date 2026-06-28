import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToastActions } from '../../../../hooks/useToastActions'
import {
    ArrowLeft,
    Trophy,
    Users,
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
    Clock,
    Calendar,
    Star,
    Zap,
    Gamepad,
    Target,
    Award
} from 'lucide-react'

const Betting = () => {
    const navigate = useNavigate()
    const toast = useToastActions()

    // State
    const [step, setStep] = useState(1) // 1: Form, 2: Confirm, 3: Success
    const [isLoading, setIsLoading] = useState(false)
    const [isResolving, setIsResolving] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    // Form data
    const [formData, setFormData] = useState({
        provider: '',
        username: '',
        amount: '',
        customerName: '',
        pin: ''
    })

    // Errors
    const [errors, setErrors] = useState({})
    const [pinError, setPinError] = useState('')

    // Success state
    const [transactionRef, setTransactionRef] = useState('')

    // Betting providers
    const providers = [
        {
            id: 'bet9ja',
            name: 'Bet9ja',
            code: 'BET9JA',
            color: '#E74C3C',
            bgColor: 'bg-red-500/10',
            borderColor: 'border-red-500/20',
            textColor: 'text-red-500',
            logo: '⚽',
            description: 'Nigeria\'s leading sports betting platform',
            minAmount: 100,
            maxAmount: 500000
        },
        {
            id: 'sportybet',
            name: 'SportyBet',
            code: 'SPORTYBET',
            color: '#F59E0B',
            bgColor: 'bg-yellow-500/10',
            borderColor: 'border-yellow-500/20',
            textColor: 'text-yellow-500',
            logo: '🏆',
            description: 'Fast and reliable sports betting',
            minAmount: 100,
            maxAmount: 300000
        },
        {
            id: 'betking',
            name: 'BetKing',
            code: 'BETKING',
            color: '#3B82F6',
            bgColor: 'bg-blue-500/10',
            borderColor: 'border-blue-500/20',
            textColor: 'text-blue-500',
            logo: '👑',
            description: 'Premium betting experience',
            minAmount: 100,
            maxAmount: 400000
        },
        {
            id: '1xbet',
            name: '1xBet',
            code: '1XBET',
            color: '#10B981',
            bgColor: 'bg-emerald-500/10',
            borderColor: 'border-emerald-500/20',
            textColor: 'text-emerald-500',
            logo: '🌍',
            description: 'Global betting platform with local touch',
            minAmount: 100,
            maxAmount: 500000
        },
        {
            id: 'betway',
            name: 'Betway',
            code: 'BETWAY',
            color: '#8B5CF6',
            bgColor: 'bg-purple-500/10',
            borderColor: 'border-purple-500/20',
            textColor: 'text-purple-500',
            logo: '🎯',
            description: 'International betting trusted in Nigeria',
            minAmount: 100,
            maxAmount: 350000
        },
        {
            id: 'n1bet',
            name: 'N1Bet',
            code: 'N1BET',
            color: '#EC4899',
            bgColor: 'bg-pink-500/10',
            borderColor: 'border-pink-500/20',
            textColor: 'text-pink-500',
            logo: '🎮',
            description: 'Modern betting with great odds',
            minAmount: 100,
            maxAmount: 250000
        }
    ]

    // Resolve timeout ref
    const resolveTimeoutRef = useRef(null)

    // Auto-resolve customer when username and provider are provided
    useEffect(() => {
        const { provider, username, customerName } = formData

        if (resolveTimeoutRef.current) {
            clearTimeout(resolveTimeoutRef.current)
            resolveTimeoutRef.current = null
        }

        const shouldResolve =
            provider &&
            username &&
            username.length >= 3 &&
            !customerName &&
            !isResolving

        if (shouldResolve) {
            resolveTimeoutRef.current = setTimeout(() => {
                resolveCustomer()
            }, 500)
        }

        return () => {
            if (resolveTimeoutRef.current) {
                clearTimeout(resolveTimeoutRef.current)
                resolveTimeoutRef.current = null
            }
        }
    }, [formData.provider, formData.username])

    // Handle provider selection
    const handleProviderSelect = (providerId) => {
        setFormData(prev => ({
            ...prev,
            provider: providerId,
            username: '',
            customerName: ''
        }))
        if (errors.provider) {
            setErrors(prev => ({ ...prev, provider: '' }))
        }
    }

    // Handle username input
    const handleUsernameChange = (e) => {
        const value = e.target.value
        setFormData(prev => ({
            ...prev,
            username: value,
            customerName: ''
        }))
        if (errors.username) {
            setErrors(prev => ({ ...prev, username: '' }))
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

    // Handle pin change
    const handlePinChange = (e) => {
        const value = e.target.value.replace(/\D/g, '')
        if (value.length <= 4) {
            setFormData(prev => ({ ...prev, pin: value }))
            setPinError('')
        }
    }

    // Resolve customer
    const resolveCustomer = async () => {
        const { provider, username } = formData

        if (!provider) {
            setErrors(prev => ({ ...prev, provider: 'Please select a provider' }))
            return
        }

        if (!username || username.length < 3) {
            setErrors(prev => ({ ...prev, username: 'Please enter a valid username' }))
            return
        }

        setIsResolving(true)

        try {
            await new Promise(resolve => setTimeout(resolve, 1500))

            const mockNames = [
                'John Adeyemi',
                'Chioma Okafor',
                'Emeka Nwosu',
                'Tunde Balogun',
                'Funmi Adeleke',
                'Oluwafemi Ojo',
                'Blessing Eze',
                'Chidi Okonkwo'
            ]

            const randomName = mockNames[Math.floor(Math.random() * mockNames.length)]

            setFormData(prev => ({
                ...prev,
                customerName: randomName
            }))
            toast.showSuccess('Account verified successfully! ✅')

        } catch (error) {
            toast.showError('Failed to verify account. Please try again.')
            setFormData(prev => ({ ...prev, customerName: '' }))
        } finally {
            setIsResolving(false)
        }
    }

    // Get selected provider details
    const selectedProvider = providers.find(p => p.id === formData.provider)

    // Validate form (Step 1)
    const validateForm = () => {
        const newErrors = {}

        if (!formData.provider) {
            newErrors.provider = 'Please select a provider'
        }

        if (!formData.username) {
            newErrors.username = 'Username is required'
        } else if (formData.username.length < 3) {
            newErrors.username = 'Username must be at least 3 characters'
        }

        if (!formData.customerName) {
            newErrors.customerName = 'Please resolve account first'
        }

        if (!formData.amount) {
            newErrors.amount = 'Please enter an amount'
        } else if (parseInt(formData.amount) < (selectedProvider?.minAmount || 100)) {
            newErrors.amount = `Minimum amount is ₦${selectedProvider?.minAmount || 100}`
        } else if (parseInt(formData.amount) > (selectedProvider?.maxAmount || 500000)) {
            newErrors.amount = `Maximum amount is ₦${selectedProvider?.maxAmount || 500000}`
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
            await new Promise(resolve => setTimeout(resolve, 2000))

            const ref = 'BET-' + Date.now().toString().slice(-8) + '-' + Math.random().toString(36).substring(2, 6).toUpperCase()
            setTransactionRef(ref)

            setStep(3)
            toast.showSuccess('Betting account funded successfully! 🎉')

        } catch (error) {
            toast.showError('Funding failed. Please try again.')
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

    // Reset form
    const handleNewFunding = () => {
        setStep(1)
        setFormData({
            provider: '',
            username: '',
            amount: '',
            customerName: '',
            pin: ''
        })
        setErrors({})
        setPinError('')
        setTransactionRef('')
    }

    // Quick amounts
    const quickAmounts = [1000, 2000, 5000, 10000, 20000, 50000]

    // Render step 1: Form
    const renderStep1 = () => (
        <div className="space-y-5">
            {/* Provider Selection */}
            <div>
                <label className="block text-sm font-medium text-[#C7C9DC] mb-2">
                    Select Betting Platform
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {providers.map((provider) => {
                        const isSelected = formData.provider === provider.id
                        return (
                            <button
                                key={provider.id}
                                type="button"
                                onClick={() => handleProviderSelect(provider.id)}
                                className={`p-3 rounded-xl border transition-all duration-200 text-center ${
                                    isSelected
                                        ? `${provider.bgColor} ${provider.borderColor} border-2`
                                        : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06]'
                                }`}
                            >
                                <div className="text-2xl mb-1">{provider.logo}</div>
                                <div className={`text-xs font-medium ${isSelected ? provider.textColor : 'text-[#F7F7FA]'}`}>
                                    {provider.name}
                                </div>
                            </button>
                        )
                    })}
                </div>
                {errors.provider && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.provider}
                    </p>
                )}
            </div>

            {/* Username */}
            {selectedProvider && (
                <div>
                    <label className="block text-sm font-medium text-[#C7C9DC] mb-1.5">
                        Username
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Users className="w-5 h-5 text-[#7E81A0]" />
                        </div>
                        <input
                            type="text"
                            value={formData.username}
                            onChange={handleUsernameChange}
                            placeholder="Enter your username"
                            className={`w-full pl-10 pr-4 py-3 bg-white/[0.05] border rounded-xl text-[#F7F7FA] placeholder-[#7E81A0] focus:outline-none focus:ring-2 transition-all duration-200 text-sm ${
                                errors.username
                                    ? 'border-red-500 focus:ring-red-500/50'
                                    : 'border-white/10 focus:ring-[#C9A24B]/50 focus:border-[#C9A24B]'
                            }`}
                        />
                    </div>
                    {errors.username && (
                        <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {errors.username}
                        </p>
                    )}
                    <p className="text-xs text-[#7E81A0] mt-1.5">
                        Enter your {selectedProvider.name} username
                    </p>
                </div>
            )}

            {/* Resolve Status */}
            {formData.provider && formData.username && formData.username.length >= 3 && (
                <div className="flex items-center gap-2 text-sm">
                    {isResolving ? (
                        <>
                            <Loader className="w-4 h-4 animate-spin text-[#C9A24B]" />
                            <span className="text-[#7E81A0]">Verifying account...</span>
                        </>
                    ) : formData.customerName ? (
                        <div className="flex items-center gap-2 text-green-500">
                            <CheckCircle className="w-4 h-4" />
                            <span>Account verified: {formData.customerName}</span>
                        </div>
                    ) : (
                        <span className="text-[#7E81A0]">Waiting for verification...</span>
                    )}
                </div>
            )}

            {/* Customer Details */}
            {formData.customerName && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3">
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-[#F7F7FA]">{formData.customerName}</span>
                    </div>
                </div>
            )}
            {errors.customerName && (
                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.customerName}
                </p>
            )}

            {/* Amount */}
            {selectedProvider && formData.customerName && (
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
                            placeholder={`Min ₦${selectedProvider.minAmount}`}
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
                                onClick={() => {
                                    setFormData(prev => ({ ...prev, amount: amount.toString() }))
                                    if (errors.amount) {
                                        setErrors(prev => ({ ...prev, amount: '' }))
                                    }
                                }}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                                    parseInt(formData.amount) === amount
                                        ? 'bg-[#C9A24B] text-[#0F1229]'
                                        : 'bg-white/[0.05] text-[#7E81A0] hover:bg-white/[0.1] hover:text-[#F7F7FA]'
                                }`}
                            >
                                ₦{amount.toLocaleString()}
                            </button>
                        ))}
                    </div>
                    <p className="text-xs text-[#7E81A0] mt-2">
                        Min: ₦{selectedProvider.minAmount} | Max: ₦{selectedProvider.maxAmount.toLocaleString()}
                    </p>
                </div>
            )}

            {/* Continue Button */}
            <button
                onClick={handleContinue}
                disabled={!formData.customerName || !formData.amount || isResolving}
                className={`w-full py-3.5 rounded-xl font-medium text-sm transition-colors flex items-center justify-center gap-2 ${
                    formData.customerName && formData.amount && !isResolving
                        ? 'bg-[#C9A24B] text-[#0F1229] hover:bg-[#D4B35C]'
                        : 'bg-white/[0.05] text-[#7E81A0] cursor-not-allowed'
                }`}
            >
                {isResolving ? (
                    <>
                        <Loader className="w-4 h-4 animate-spin" />
                        Verifying...
                    </>
                ) : (
                    <>
                        Continue
                        <Send className="w-4 h-4" />
                    </>
                )}
            </button>
        </div>
    )

    // Render step 2: Confirm
    const renderStep2 = () => (
        <div className="space-y-6">
            {/* Funding Summary */}
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-3 pb-3 border-b border-white/[0.06]">
                    <div className="text-3xl">{selectedProvider?.logo}</div>
                    <div>
                        <div className="text-sm font-medium">{selectedProvider?.name}</div>
                        <div className="text-xs text-[#7E81A0]">Wallet Funding</div>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-[#7E81A0]">Username</span>
                    <span className="text-sm font-medium">{formData.username}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-[#7E81A0]">Account Name</span>
                    <span className="text-sm font-medium">{formData.customerName}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-[#7E81A0]">Amount</span>
                    <span className="text-lg font-bold text-[#C9A24B]">{formatCurrency(parseInt(formData.amount))}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-[#7E81A0]">Fee</span>
                    <span className="text-sm text-[#7E81A0]">Free</span>
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
                            Fund Wallet
                        </>
                    )}
                </button>
            </div>
        </div>
    )

    // Render step 3: Success
    const renderStep3 = () => (
        <div className="text-center py-8 animate-fadeIn">
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
                Wallet Funded! 🎉
            </h2>
            <p className="text-[#7E81A0] text-sm mb-6">
                Your betting wallet has been funded successfully
            </p>

            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 text-left space-y-3 mb-6">
                <div className="flex items-center gap-3 pb-3 border-b border-white/[0.06]">
                    <div className="text-3xl">{selectedProvider?.logo}</div>
                    <div>
                        <div className="text-sm font-medium">{selectedProvider?.name}</div>
                        <div className="text-xs text-[#7E81A0]">Wallet Funding</div>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-[#7E81A0]">Username</span>
                    <span className="text-sm font-medium">{formData.username}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-[#7E81A0]">Account Name</span>
                    <span className="text-sm font-medium">{formData.customerName}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-[#7E81A0]">Amount Funded</span>
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

            <div className="flex flex-col sm:flex-row gap-3">
                <button
                    onClick={handleNewFunding}
                    className="flex-1 py-3.5 rounded-xl bg-[#C9A24B] text-[#0F1229] font-medium text-sm hover:bg-[#D4B35C] transition-colors flex items-center justify-center gap-2"
                >
                    <Trophy className="w-4 h-4" />
                    Fund Again
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
                            {step === 1 ? 'Fund Betting' : step === 2 ? 'Confirm Funding' : 'Success'}
                        </h1>
                        <p className="text-xs text-[#7E81A0]">
                            {step === 1 && 'Select platform and enter details'}
                            {step === 2 && 'Review and confirm your funding'}
                            {step === 3 && 'Wallet funded successfully'}
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
                /* Custom scrollbar */
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255,255,255,0.05);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #C9A24B;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #D4B35C;
                }
            `}</style>
        </div>
    )
}

export default Betting