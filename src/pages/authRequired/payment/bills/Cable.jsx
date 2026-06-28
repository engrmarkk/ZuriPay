import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToastActions } from '../../../../hooks/useToastActions'
import {
    ArrowLeft,
    Tv,
    Monitor,
    Smartphone,
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
    Users,
    Star,
    Zap,
    Wifi,
    Film,
    Play,
    Music,
    Globe
} from 'lucide-react'

const Cable = () => {
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
        package: '',
        smartCardNumber: '',
        customerName: '',
        customerPhone: '',
        amount: 0,
        pin: ''
    })

    // Errors
    const [errors, setErrors] = useState({})
    const [pinError, setPinError] = useState('')

    // Success state
    const [transactionRef, setTransactionRef] = useState('')

    // Cable providers with packages
    const providers = [
        {
            id: 'dstv',
            name: 'DStv',
            code: 'DStv',
            color: '#E74C3C',
            bgColor: 'bg-red-500/10',
            borderColor: 'border-red-500/20',
            textColor: 'text-red-500',
            logo: '📡',
            description: 'Premium entertainment',
            packages: [
                { id: 'dstv-premium', name: 'Premium', price: 37000, channels: '200+', description: 'All channels including sports, movies, and series' },
                { id: 'dstv-compact-plus', name: 'Compact Plus', price: 25000, channels: '170+', description: 'Best of sports, movies, and entertainment' },
                { id: 'dstv-compact', name: 'Compact', price: 19000, channels: '140+', description: 'Great value with popular channels' },
                { id: 'dstv-confam', name: 'Confam', price: 12500, channels: '110+', description: 'Affordable with great variety' },
                { id: 'dstv-yanga', name: 'Yanga', price: 8500, channels: '85+', description: 'Budget-friendly entertainment' },
                { id: 'dstv-padi', name: 'Padi', price: 5500, channels: '65+', description: 'Essential entertainment package' },
                { id: 'dstv-waw', name: 'Waw', price: 3500, channels: '45+', description: 'Basic entertainment package' },
            ]
        },
        {
            id: 'gotv',
            name: 'GOtv',
            code: 'GOtv',
            color: '#F39C12',
            bgColor: 'bg-orange-500/10',
            borderColor: 'border-orange-500/20',
            textColor: 'text-orange-500',
            logo: '📺',
            description: 'Affordable family entertainment',
            packages: [
                { id: 'gotv-supa-plus', name: 'Supa Plus', price: 15000, channels: '95+', description: 'Premium GOtv package with all channels' },
                { id: 'gotv-supa', name: 'Supa', price: 11000, channels: '70+', description: 'Great value with popular channels' },
                { id: 'gotv-max', name: 'Max', price: 7800, channels: '55+', description: 'Family entertainment package' },
                { id: 'gotv-jolli', name: 'Jolli', price: 4800, channels: '40+', description: 'Affordable family package' },
                { id: 'gotv-jinja', name: 'Jinja', price: 3000, channels: '25+', description: 'Basic entertainment package' },
                { id: 'gotv-small', name: 'Small', price: 1800, channels: '15+', description: 'Budget-friendly package' },
            ]
        },
        {
            id: 'startimes',
            name: 'Startimes',
            code: 'Startimes',
            color: '#1ABC9C',
            bgColor: 'bg-teal-500/10',
            borderColor: 'border-teal-500/20',
            textColor: 'text-teal-500',
            logo: '⭐',
            description: 'Affordable digital TV',
            packages: [
                { id: 'startimes-premium', name: 'Premium', price: 12500, channels: '120+', description: 'All channels including sports and movies' },
                { id: 'startimes-nova', name: 'Nova', price: 7500, channels: '80+', description: 'Popular channels package' },
                { id: 'startimes-basic', name: 'Basic', price: 4500, channels: '50+', description: 'Essential channels package' },
                { id: 'startimes-lite', name: 'Lite', price: 2500, channels: '30+', description: 'Budget-friendly package' },
            ]
        },
        {
            id: 'trend',
            name: 'Trend TV',
            code: 'TrendTV',
            color: '#8B5CF6',
            bgColor: 'bg-purple-500/10',
            borderColor: 'border-purple-500/20',
            textColor: 'text-purple-500',
            logo: '📱',
            description: 'Modern digital TV',
            packages: [
                { id: 'trend-premium', name: 'Premium', price: 15000, channels: '150+', description: 'All channels package' },
                { id: 'trend-pro', name: 'Pro', price: 10000, channels: '100+', description: 'Popular channels package' },
                { id: 'trend-basic', name: 'Basic', price: 6000, channels: '60+', description: 'Essential channels package' },
            ]
        },
        {
            id: 'telediaspora',
            name: 'Telediaspora',
            code: 'Telediaspora',
            color: '#3B82F6',
            bgColor: 'bg-blue-500/10',
            borderColor: 'border-blue-500/20',
            textColor: 'text-blue-500',
            logo: '🌍',
            description: 'Nigerian diaspora TV',
            packages: [
                { id: 'telediaspora-premium', name: 'Premium', price: 12000, channels: '100+', description: 'All channels package' },
                { id: 'telediaspora-standard', name: 'Standard', price: 7000, channels: '70+', description: 'Popular channels package' },
            ]
        }
    ]

    // Resolve timeout ref
    const resolveTimeoutRef = useRef(null)

    // Auto-resolve customer when smart card number, provider, and package are provided
    useEffect(() => {
        const { provider, smartCardNumber, package: pkg, customerName } = formData

        if (resolveTimeoutRef.current) {
            clearTimeout(resolveTimeoutRef.current)
            resolveTimeoutRef.current = null
        }

        const shouldResolve =
            provider &&
            pkg &&
            smartCardNumber &&
            smartCardNumber.length >= 10 &&
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
    }, [formData.provider, formData.package, formData.smartCardNumber])

    // Handle provider selection
    const handleProviderSelect = (providerId) => {
        setFormData(prev => ({
            ...prev,
            provider: providerId,
            package: '', // Reset package when provider changes
            smartCardNumber: '', // Reset smart card number
            customerName: '',
            customerPhone: '',
            amount: 0
        }))
        if (errors.provider) {
            setErrors(prev => ({ ...prev, provider: '' }))
        }
    }

    // Handle package selection
    const handlePackageSelect = (packageId) => {
        const selectedProvider = providers.find(p => p.id === formData.provider)
        const selectedPackage = selectedProvider?.packages.find(p => p.id === packageId)

        setFormData(prev => ({
            ...prev,
            package: packageId,
            amount: selectedPackage?.price || 0,
            smartCardNumber: '', // Reset smart card number when package changes
            customerName: '',
            customerPhone: ''
        }))
        if (errors.package) {
            setErrors(prev => ({ ...prev, package: '' }))
        }
    }

    // Handle smart card number input (only digits)
    const handleSmartCardChange = (e) => {
        const value = e.target.value.replace(/\D/g, '')
        if (value.length <= 15) {
            setFormData(prev => ({
                ...prev,
                smartCardNumber: value,
                customerName: '',
                customerPhone: ''
            }))
            if (errors.smartCardNumber) {
                setErrors(prev => ({ ...prev, smartCardNumber: '' }))
            }
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
        const { provider, smartCardNumber } = formData

        if (!provider) {
            setErrors(prev => ({ ...prev, provider: 'Please select a provider' }))
            return
        }

        if (!smartCardNumber || smartCardNumber.length < 10) {
            setErrors(prev => ({ ...prev, smartCardNumber: 'Please enter a valid smart card number' }))
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
            const mockPhones = [
                '08012345678',
                '08123456789',
                '07034567890',
                '09045678901',
                '08056789012',
                '08167890123',
                '07078901234',
                '09089012345'
            ]

            const randomName = mockNames[Math.floor(Math.random() * mockNames.length)]
            const randomPhone = mockPhones[Math.floor(Math.random() * mockPhones.length)]

            setFormData(prev => ({
                ...prev,
                customerName: randomName,
                customerPhone: randomPhone
            }))
            toast.showSuccess('Customer verified successfully! ✅')

        } catch (error) {
            toast.showError('Failed to verify customer. Please try again.')
            setFormData(prev => ({ ...prev, customerName: '', customerPhone: '' }))
        } finally {
            setIsResolving(false)
        }
    }

    // Get selected provider and package details
    const selectedProvider = providers.find(p => p.id === formData.provider)
    const selectedPackage = selectedProvider?.packages.find(p => p.id === formData.package)

    // Validate form (Step 1)
    const validateForm = () => {
        const newErrors = {}

        if (!formData.provider) {
            newErrors.provider = 'Please select a provider'
        }

        if (!formData.package) {
            newErrors.package = 'Please select a package'
        }

        if (!formData.smartCardNumber) {
            newErrors.smartCardNumber = 'Smart card number is required'
        } else if (formData.smartCardNumber.length < 10) {
            newErrors.smartCardNumber = 'Please enter a valid smart card number (minimum 10 digits)'
        }

        if (!formData.customerName) {
            newErrors.customerName = 'Please resolve customer details first'
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

            const ref = 'CBL-' + Date.now().toString().slice(-8) + '-' + Math.random().toString(36).substring(2, 6).toUpperCase()
            setTransactionRef(ref)

            setStep(3)
            toast.showSuccess('Subscription renewed successfully! 🎉')

        } catch (error) {
            toast.showError('Payment failed. Please try again.')
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

    // Format smart card number with spaces
    const formatSmartCard = (number) => {
        if (number.length <= 4) return number
        if (number.length <= 8) return `${number.slice(0, 4)} ${number.slice(4)}`
        if (number.length <= 12) return `${number.slice(0, 4)} ${number.slice(4, 8)} ${number.slice(8)}`
        return `${number.slice(0, 4)} ${number.slice(4, 8)} ${number.slice(8, 12)} ${number.slice(12)}`
    }

    // Reset form
    const handleNewSubscription = () => {
        setStep(1)
        setFormData({
            provider: '',
            package: '',
            smartCardNumber: '',
            customerName: '',
            customerPhone: '',
            amount: 0,
            pin: ''
        })
        setErrors({})
        setPinError('')
        setTransactionRef('')
    }

    // Render step 1: Form
    const renderStep1 = () => (
        <div className="space-y-5">
            {/* Provider Selection */}
            <div>
                <label className="block text-sm font-medium text-[#C7C9DC] mb-2">
                    Select Provider
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

            {/* ✅ Package Selection - Revealed immediately after provider selection */}
            {selectedProvider && (
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-[#C7C9DC]">
                            Select Package
                        </label>
                        <span className="text-xs text-[#7E81A0]">
                            {selectedProvider.packages.length} packages
                        </span>
                    </div>
                    <div className="max-h-60 overflow-y-auto pr-1 space-y-2 custom-scrollbar">
                        {selectedProvider.packages.map((pkg) => {
                            const isSelected = formData.package === pkg.id
                            return (
                                <button
                                    key={pkg.id}
                                    type="button"
                                    onClick={() => handlePackageSelect(pkg.id)}
                                    className={`w-full p-3 rounded-xl border transition-all duration-200 text-left ${
                                        isSelected
                                            ? `${selectedProvider.bgColor} ${selectedProvider.borderColor} border-2`
                                            : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06]'
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold text-sm">{pkg.name}</span>
                                                <span className={`text-xs px-2 py-0.5 rounded-full ${isSelected ? selectedProvider.bgColor : 'bg-white/[0.05]'}`}>
                                                    {pkg.channels}
                                                </span>
                                            </div>
                                            <div className="text-xs text-[#7E81A0] mt-0.5 truncate">
                                                {pkg.description}
                                            </div>
                                        </div>
                                        <div className={`font-bold ml-2 ${isSelected ? selectedProvider.textColor : 'text-[#F7F7FA]'}`}>
                                            {formatCurrency(pkg.price)}
                                        </div>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                    {errors.package && (
                        <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {errors.package}
                        </p>
                    )}
                </div>
            )}

            {/* Smart Card Number - Only shown after package is selected */}
            {selectedProvider && formData.package && (
                <div>
                    <label className="block text-sm font-medium text-[#C7C9DC] mb-1.5">
                        Smart Card / IUC Number
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Tv className="w-5 h-5 text-[#7E81A0]" />
                        </div>
                        <input
                            type="text"
                            value={formatSmartCard(formData.smartCardNumber)}
                            onChange={handleSmartCardChange}
                            placeholder="1234 5678 9012"
                            className={`w-full pl-10 pr-4 py-3 bg-white/[0.05] border rounded-xl text-[#F7F7FA] placeholder-[#7E81A0] focus:outline-none focus:ring-2 transition-all duration-200 text-sm font-mono ${
                                errors.smartCardNumber
                                    ? 'border-red-500 focus:ring-red-500/50'
                                    : 'border-white/10 focus:ring-[#C9A24B]/50 focus:border-[#C9A24B]'
                            }`}
                            maxLength={19}
                        />
                    </div>
                    {errors.smartCardNumber && (
                        <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {errors.smartCardNumber}
                        </p>
                    )}
                    <p className="text-xs text-[#7E81A0] mt-1.5">
                        Enter your smart card number (10-15 digits)
                    </p>
                </div>
            )}

            {/* Resolve Status */}
            {formData.provider && formData.package && formData.smartCardNumber && formData.smartCardNumber.length >= 10 && (
                <div className="flex items-center gap-2 text-sm">
                    {isResolving ? (
                        <>
                            <Loader className="w-4 h-4 animate-spin text-[#C9A24B]" />
                            <span className="text-[#7E81A0]">Verifying customer...</span>
                        </>
                    ) : formData.customerName ? (
                        <div className="flex items-center gap-2 text-green-500">
                            <CheckCircle className="w-4 h-4" />
                            <span>Customer verified: {formData.customerName}</span>
                        </div>
                    ) : (
                        <span className="text-[#7E81A0]">Waiting for verification...</span>
                    )}
                </div>
            )}

            {/* Customer Details */}
            {formData.customerName && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3 space-y-2">
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-[#F7F7FA]">{formData.customerName}</span>
                    </div>
                    {formData.customerPhone && (
                        <div className="flex items-center gap-2">
                            <Smartphone className="w-4 h-4 text-green-500" />
                            <span className="text-xs text-[#7E81A0]">{formData.customerPhone}</span>
                        </div>
                    )}
                </div>
            )}
            {errors.customerName && (
                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.customerName}
                </p>
            )}

            {/* Continue Button */}
            <button
                onClick={handleContinue}
                disabled={!formData.customerName || !formData.package || isResolving}
                className={`w-full py-3.5 rounded-xl font-medium text-sm transition-colors flex items-center justify-center gap-2 ${
                    formData.customerName && formData.package && !isResolving
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
            {/* Subscription Summary */}
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-3 pb-3 border-b border-white/[0.06]">
                    <div className="text-3xl">{selectedProvider?.logo}</div>
                    <div>
                        <div className="text-sm font-medium">{selectedProvider?.name}</div>
                        <div className="text-xs text-[#7E81A0]">Cable TV Subscription</div>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-[#7E81A0]">Package</span>
                    <span className="text-sm font-medium">{selectedPackage?.name}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-[#7E81A0]">Channels</span>
                    <span className="text-sm">{selectedPackage?.channels}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-[#7E81A0]">Smart Card</span>
                    <span className="text-sm font-mono">{formatSmartCard(formData.smartCardNumber)}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-[#7E81A0]">Customer Name</span>
                    <span className="text-sm font-medium">{formData.customerName}</span>
                </div>
                {formData.customerPhone && (
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-[#7E81A0]">Phone</span>
                        <span className="text-sm">{formData.customerPhone}</span>
                    </div>
                )}
                <div className="flex justify-between items-center">
                    <span className="text-sm text-[#7E81A0]">Amount</span>
                    <span className="text-lg font-bold text-[#C9A24B]">{formatCurrency(formData.amount)}</span>
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
                            Subscribe
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
                Subscription Renewed! 🎉
            </h2>
            <p className="text-[#7E81A0] text-sm mb-6">
                Your cable TV subscription has been renewed successfully
            </p>

            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 text-left space-y-3 mb-6">
                <div className="flex items-center gap-3 pb-3 border-b border-white/[0.06]">
                    <div className="text-3xl">{selectedProvider?.logo}</div>
                    <div>
                        <div className="text-sm font-medium">{selectedProvider?.name}</div>
                        <div className="text-xs text-[#7E81A0]">Cable TV Subscription</div>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-[#7E81A0]">Package</span>
                    <span className="text-sm font-medium">{selectedPackage?.name}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-[#7E81A0]">Channels</span>
                    <span className="text-sm">{selectedPackage?.channels}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-[#7E81A0]">Smart Card</span>
                    <span className="text-sm font-mono">{formatSmartCard(formData.smartCardNumber)}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-[#7E81A0]">Customer</span>
                    <span className="text-sm font-medium">{formData.customerName}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-[#7E81A0]">Amount Paid</span>
                    <span className="text-lg font-bold text-[#C9A24B]">{formatCurrency(formData.amount)}</span>
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
                    onClick={handleNewSubscription}
                    className="flex-1 py-3.5 rounded-xl bg-[#C9A24B] text-[#0F1229] font-medium text-sm hover:bg-[#D4B35C] transition-colors flex items-center justify-center gap-2"
                >
                    <Tv className="w-4 h-4" />
                    Subscribe Again
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
                            {step === 1 ? 'Cable TV' : step === 2 ? 'Confirm Subscription' : 'Success'}
                        </h1>
                        <p className="text-xs text-[#7E81A0]">
                            {step === 1 && 'Select provider and package'}
                            {step === 2 && 'Review and confirm your subscription'}
                            {step === 3 && 'Subscription completed successfully'}
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

export default Cable