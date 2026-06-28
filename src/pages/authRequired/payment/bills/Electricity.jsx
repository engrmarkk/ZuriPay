import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToastActions } from '../../../../hooks/useToastActions'
import {
    ArrowLeft,
    Lightbulb,
    Zap,
    Building,
    User,
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
    Home,
    MapPin,
    FileText,
    Smartphone
} from 'lucide-react'

const Electricity = () => {
    const navigate = useNavigate()
    const toast = useToastActions()

    // State
    const [step, setStep] = useState(1) // 1: Form, 2: Confirm, 3: Success
    const [isLoading, setIsLoading] = useState(false)
    const [isResolving, setIsResolving] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    // Form data
    const [formData, setFormData] = useState({
        disco: '',
        meterType: 'prepaid', // 'prepaid' or 'postpaid'
        meterNumber: '',
        amount: '',
        customerName: '',
        customerAddress: '',
        pin: ''
    })

    // Errors
    const [errors, setErrors] = useState({})
    const [pinError, setPinError] = useState('')

    // Success state
    const [transactionRef, setTransactionRef] = useState('')

    // DISCOs (Electricity Distribution Companies in Nigeria)
    const discos = [
        {
            id: 'ikeja',
            name: 'Ikeja Electric',
            code: 'IE',
            color: '#F59E0B',
            bgColor: 'bg-yellow-500/10',
            borderColor: 'border-yellow-500/20',
            textColor: 'text-yellow-500',
            logo: '⚡',
            states: ['Lagos (Mainland)'],
            address: '12A Awolowo Way, Ikeja, Lagos'
        },
        {
            id: 'eko',
            name: 'Eko Electric',
            code: 'EKEDC',
            color: '#34D399',
            bgColor: 'bg-emerald-500/10',
            borderColor: 'border-emerald-500/20',
            textColor: 'text-emerald-500',
            logo: '💡',
            states: ['Lagos (Island, Badagry)'],
            address: '24 Marina Road, Lagos Island, Lagos'
        },
        {
            id: 'abuja',
            name: 'Abuja DISCO',
            code: 'AEDC',
            color: '#6366F1',
            bgColor: 'bg-indigo-500/10',
            borderColor: 'border-indigo-500/20',
            textColor: 'text-indigo-500',
            logo: '🏛️',
            states: ['Abuja FCT', 'Niger', 'Kogi'],
            address: 'Plot 411, Ahmadu Bello Way, Abuja'
        },
        {
            id: 'ph',
            name: 'Port Harcourt DISCO',
            code: 'PHED',
            color: '#EC4899',
            bgColor: 'bg-pink-500/10',
            borderColor: 'border-pink-500/20',
            textColor: 'text-pink-500',
            logo: '🌊',
            states: ['Rivers', 'Bayelsa', 'Akwa Ibom'],
            address: '36 Aba Road, Port Harcourt, Rivers'
        },
        {
            id: 'ibadan',
            name: 'Ibadan DISCO',
            code: 'IBEDC',
            color: '#F97316',
            bgColor: 'bg-orange-500/10',
            borderColor: 'border-orange-500/20',
            textColor: 'text-orange-500',
            logo: '🏙️',
            states: ['Oyo', 'Ogun', 'Osun', 'Kwara', 'Niger'],
            address: '4, Oba Adebimpe Road, Ibadan, Oyo'
        },
        {
            id: 'enugu',
            name: 'Enugu DISCO',
            code: 'EEDC',
            color: '#8B5CF6',
            bgColor: 'bg-purple-500/10',
            borderColor: 'border-purple-500/20',
            textColor: 'text-purple-500',
            logo: '⛰️',
            states: ['Enugu', 'Anambra', 'Ebonyi', 'Imo'],
            address: '23 Okpara Avenue, Enugu'
        },
        {
            id: 'benin',
            name: 'Benin DISCO',
            code: 'BEDC',
            color: '#14B8A6',
            bgColor: 'bg-teal-500/10',
            borderColor: 'border-teal-500/20',
            textColor: 'text-teal-500',
            logo: '🏝️',
            states: ['Edo', 'Delta', 'Ondo', 'Ekiti'],
            address: '80A Akpakpava Road, Benin City, Edo'
        },
        {
            id: 'jos',
            name: 'Jos DISCO',
            code: 'JEDC',
            color: '#3B82F6',
            bgColor: 'bg-blue-500/10',
            borderColor: 'border-blue-500/20',
            textColor: 'text-blue-500',
            logo: '⛰️',
            states: ['Plateau', 'Bauchi', 'Borno', 'Yobe'],
            address: '4 Old Airport Road, Jos, Plateau'
        }
    ]

    // Resolve timeout ref
    const resolveTimeoutRef = useRef(null)

    // Auto-resolve customer when meter number and DISCO are provided
    useEffect(() => {
        const { disco, meterNumber, customerName } = formData

        if (resolveTimeoutRef.current) {
            clearTimeout(resolveTimeoutRef.current)
            resolveTimeoutRef.current = null
        }

        const shouldResolve =
            disco &&
            meterNumber &&
            meterNumber.length >= 7 &&
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
    }, [formData.disco, formData.meterNumber])

    // Handle DISCO selection
    const handleDiscoSelect = (discoId) => {
        setFormData(prev => ({
            ...prev,
            disco: discoId,
            customerName: '',
            customerAddress: ''
        }))
        if (errors.disco) {
            setErrors(prev => ({ ...prev, disco: '' }))
        }
    }

    // Handle meter number input (only digits, max 11)
    const handleMeterNumberChange = (e) => {
        const value = e.target.value.replace(/\D/g, '')
        if (value.length <= 11) {
            setFormData(prev => ({
                ...prev,
                meterNumber: value,
                customerName: '',
                customerAddress: ''
            }))
            if (errors.meterNumber) {
                setErrors(prev => ({ ...prev, meterNumber: '' }))
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

    // Handle meter type change
    const handleMeterTypeChange = (type) => {
        setFormData(prev => ({ ...prev, meterType: type }))
        // Reset meter number when switching types (different formats)
        setFormData(prev => ({ ...prev, meterNumber: '', customerName: '', customerAddress: '' }))
    }

    // Resolve customer
    const resolveCustomer = async () => {
        const { disco, meterNumber, meterType } = formData

        if (!disco) {
            setErrors(prev => ({ ...prev, disco: 'Please select a DISCO' }))
            return
        }

        if (!meterNumber || meterNumber.length < 7) {
            setErrors(prev => ({ ...prev, meterNumber: 'Please enter a valid meter number' }))
            return
        }

        setIsResolving(true)

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500))

            // Mock customer resolution
            const mockNames = [
                'John Adeyemi',
                'Chioma Okafor',
                'Emeka Nwosu',
                'Tunde Balogun',
                'Funmi Adeleke',
                'Oluwafemi Ojo',
                'Blessing Eze',
                'Chidi Okonkwo',
                'Grace Ogunleye',
                'Segun Ogunyemi'
            ]
            const mockAddresses = [
                '12A Adeola Street, Ikeja, Lagos',
                '5B Marine Road, Apapa, Lagos',
                '7C Ahmadu Bello Way, Abuja',
                '15D Aba Road, Port Harcourt',
                '3E Oba Adebimpe Road, Ibadan',
                '8F Okpara Avenue, Enugu',
                '10G Akpakpava Road, Benin City',
                '4H Old Airport Road, Jos'
            ]

            const randomName = mockNames[Math.floor(Math.random() * mockNames.length)]
            const randomAddress = mockAddresses[Math.floor(Math.random() * mockAddresses.length)]

            setFormData(prev => ({
                ...prev,
                customerName: randomName,
                customerAddress: randomAddress
            }))
            toast.showSuccess('Customer verified successfully! ✅')

        } catch (error) {
            toast.showError('Failed to verify customer. Please try again.')
            setFormData(prev => ({ ...prev, customerName: '', customerAddress: '' }))
        } finally {
            setIsResolving(false)
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

    // Get selected DISCO details
    const selectedDisco = discos.find(d => d.id === formData.disco)

    // Validate form (Step 1)
    const validateForm = () => {
        const newErrors = {}

        if (!formData.disco) {
            newErrors.disco = 'Please select a DISCO'
        }

        if (!formData.meterNumber) {
            newErrors.meterNumber = 'Meter number is required'
        } else if (formData.meterNumber.length < 7) {
            newErrors.meterNumber = 'Please enter a valid meter number (minimum 7 digits)'
        }

        if (!formData.customerName) {
            newErrors.customerName = 'Please resolve customer details first'
        }

        if (!formData.amount) {
            newErrors.amount = 'Please enter an amount'
        } else if (parseInt(formData.amount) < 100) {
            newErrors.amount = 'Minimum amount is ₦100'
        } else if (parseInt(formData.amount) > 200000) {
            newErrors.amount = 'Maximum amount is ₦200,000'
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
            const ref = 'ELE-' + Date.now().toString().slice(-8) + '-' + Math.random().toString(36).substring(2, 6).toUpperCase()
            setTransactionRef(ref)

            setStep(3)
            toast.showSuccess('Electricity bill paid successfully! 🎉')

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

    // Format meter number with spaces
    const formatMeterNumber = (number) => {
        if (number.length <= 4) return number
        if (number.length <= 7) return `${number.slice(0, 4)} ${number.slice(4)}`
        return `${number.slice(0, 4)} ${number.slice(4, 7)} ${number.slice(7)}`
    }

    // Reset form
    const handleNewPayment = () => {
        setStep(1)
        setFormData({
            disco: '',
            meterType: 'prepaid',
            meterNumber: '',
            amount: '',
            customerName: '',
            customerAddress: '',
            pin: ''
        })
        setErrors({})
        setPinError('')
        setTransactionRef('')
    }

    // Render step 1: Form
    const renderStep1 = () => (
        <div className="space-y-5">
            {/* DISCO Selection */}
            <div>
                <label className="block text-sm font-medium text-[#C7C9DC] mb-2">
                    Select Electricity Company (DISCO)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {discos.map((disco) => {
                        const isSelected = formData.disco === disco.id
                        return (
                            <button
                                key={disco.id}
                                type="button"
                                onClick={() => handleDiscoSelect(disco.id)}
                                className={`p-3 rounded-xl border transition-all duration-200 text-center ${
                                    isSelected
                                        ? `${disco.bgColor} ${disco.borderColor} border-2`
                                        : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06]'
                                }`}
                            >
                                <div className="text-2xl mb-1">{disco.logo}</div>
                                <div className={`text-xs font-medium ${isSelected ? disco.textColor : 'text-[#F7F7FA]'}`}>
                                    {disco.name}
                                </div>
                            </button>
                        )
                    })}
                </div>
                {errors.disco && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.disco}
                    </p>
                )}
            </div>

            {/* Meter Type */}
            {selectedDisco && (
                <div>
                    <label className="block text-sm font-medium text-[#C7C9DC] mb-2">
                        Meter Type
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            onClick={() => handleMeterTypeChange('prepaid')}
                            className={`p-3 rounded-xl border transition-all duration-200 text-center ${
                                formData.meterType === 'prepaid'
                                    ? 'bg-[#C9A24B]/10 border-[#C9A24B]/30 text-[#C9A24B]'
                                    : 'bg-white/[0.03] border-white/10 text-[#7E81A0] hover:text-[#F7F7FA]'
                            }`}
                        >
                            <div className="text-lg mb-1">💳</div>
                            <div className="text-sm font-medium">Prepaid</div>
                            <div className="text-xs opacity-60">Enter 10-11 digits</div>
                        </button>
                        <button
                            type="button"
                            onClick={() => handleMeterTypeChange('postpaid')}
                            className={`p-3 rounded-xl border transition-all duration-200 text-center ${
                                formData.meterType === 'postpaid'
                                    ? 'bg-[#C9A24B]/10 border-[#C9A24B]/30 text-[#C9A24B]'
                                    : 'bg-white/[0.03] border-white/10 text-[#7E81A0] hover:text-[#F7F7FA]'
                            }`}
                        >
                            <div className="text-lg mb-1">📄</div>
                            <div className="text-sm font-medium">Postpaid</div>
                            <div className="text-xs opacity-60">Enter 8-11 digits</div>
                        </button>
                    </div>
                </div>
            )}

            {/* Meter Number */}
            {selectedDisco && (
                <div>
                    <label className="block text-sm font-medium text-[#C7C9DC] mb-1.5">
                        Meter Number
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FileText className="w-5 h-5 text-[#7E81A0]" />
                        </div>
                        <input
                            type="text"
                            value={formatMeterNumber(formData.meterNumber)}
                            onChange={handleMeterNumberChange}
                            placeholder={formData.meterType === 'prepaid' ? '1234 5678 90' : '1234 5678 901'}
                            className={`w-full pl-10 pr-4 py-3 bg-white/[0.05] border rounded-xl text-[#F7F7FA] placeholder-[#7E81A0] focus:outline-none focus:ring-2 transition-all duration-200 text-sm font-mono ${
                                errors.meterNumber
                                    ? 'border-red-500 focus:ring-red-500/50'
                                    : 'border-white/10 focus:ring-[#C9A24B]/50 focus:border-[#C9A24B]'
                            }`}
                            maxLength={14}
                        />
                    </div>
                    {errors.meterNumber && (
                        <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {errors.meterNumber}
                        </p>
                    )}
                    <p className="text-xs text-[#7E81A0] mt-1.5">
                        {formData.meterType === 'prepaid'
                            ? 'Prepaid meter: 10-11 digits'
                            : 'Postpaid meter: 8-11 digits'}
                    </p>
                </div>
            )}

            {/* Resolve Status */}
            {formData.disco && formData.meterNumber && formData.meterNumber.length >= 7 && (
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
                        <User className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-[#F7F7FA]">{formData.customerName}</span>
                    </div>
                    {formData.customerAddress && (
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-green-500" />
                            <span className="text-xs text-[#7E81A0]">{formData.customerAddress}</span>
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
                <p className="text-xs text-[#7E81A0] mt-1.5">
                    Min: ₦100 | Max: ₦200,000
                </p>
            </div>

            {/* Continue Button */}
            <button
                onClick={handleContinue}
                disabled={!formData.customerName || isResolving}
                className={`w-full py-3.5 rounded-xl font-medium text-sm transition-colors flex items-center justify-center gap-2 ${
                    formData.customerName && !isResolving
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
            {/* Payment Summary */}
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-3 pb-3 border-b border-white/[0.06]">
                    <div className="text-3xl">{selectedDisco?.logo}</div>
                    <div>
                        <div className="text-sm font-medium">{selectedDisco?.name}</div>
                        <div className="text-xs text-[#7E81A0]">Electricity Bill Payment</div>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-[#7E81A0]">Meter Type</span>
                    <span className="text-sm font-medium capitalize">{formData.meterType}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-[#7E81A0]">Meter Number</span>
                    <span className="text-sm font-mono">{formatMeterNumber(formData.meterNumber)}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-[#7E81A0]">Customer Name</span>
                    <span className="text-sm font-medium">{formData.customerName}</span>
                </div>
                {formData.customerAddress && (
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-[#7E81A0]">Address</span>
                        <span className="text-sm text-right text-[#7E81A0] max-w-[60%]">{formData.customerAddress}</span>
                    </div>
                )}
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
                            Pay Bill
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
                Electricity Bill Paid! 🎉
            </h2>
            <p className="text-[#7E81A0] text-sm mb-6">
                Your electricity bill has been paid successfully
            </p>

            {/* Transaction Details */}
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 text-left space-y-3 mb-6">
                <div className="flex items-center gap-3 pb-3 border-b border-white/[0.06]">
                    <div className="text-3xl">{selectedDisco?.logo}</div>
                    <div>
                        <div className="text-sm font-medium">{selectedDisco?.name}</div>
                        <div className="text-xs text-[#7E81A0]">Electricity Bill Payment</div>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-[#7E81A0]">Meter Number</span>
                    <span className="text-sm font-mono">{formatMeterNumber(formData.meterNumber)}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-[#7E81A0]">Customer</span>
                    <span className="text-sm font-medium">{formData.customerName}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-[#7E81A0]">Amount Paid</span>
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
                    onClick={handleNewPayment}
                    className="flex-1 py-3.5 rounded-xl bg-[#C9A24B] text-[#0F1229] font-medium text-sm hover:bg-[#D4B35C] transition-colors flex items-center justify-center gap-2"
                >
                    <Lightbulb className="w-4 h-4" />
                    Pay Another
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
                            {step === 1 ? 'Pay Electricity' : step === 2 ? 'Confirm Payment' : 'Success'}
                        </h1>
                        <p className="text-xs text-[#7E81A0]">
                            {step === 1 && 'Select DISCO and enter meter details'}
                            {step === 2 && 'Review and confirm your payment'}
                            {step === 3 && 'Payment completed successfully'}
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

export default Electricity