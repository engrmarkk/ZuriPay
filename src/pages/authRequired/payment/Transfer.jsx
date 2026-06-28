import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useToastActions } from '../../../hooks/useToastActions'
import {
    ArrowLeft,
    Search,
    ChevronDown,
    ChevronUp,
    User,
    Building,
    Wallet,
    Send,
    CheckCircle,
    AlertCircle,
    Shield,
    Banknote,
    ArrowRight,
    X,
    Eye,
    EyeOff,
    Loader,
    Sparkles,
    Star,
    Zap,
    Users,
    Plus,
    Trash2,
    Save
} from 'lucide-react'

const Transfer = () => {
    const navigate = useNavigate()
    const toast = useToastActions()

    // State
    const [step, setStep] = useState(1) // 1: Form, 2: Confirm, 3: Success
    const [isLoading, setIsLoading] = useState(false)
    const [isVerifying, setIsVerifying] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showBeneficiaryModal, setShowBeneficiaryModal] = useState(false)
    const [selectedBeneficiary, setSelectedBeneficiary] = useState(null)
    const [saveBeneficiary, setSaveBeneficiary] = useState(false) // ✅ Save beneficiary checkbox
    const [showSavePrompt, setShowSavePrompt] = useState(false)

    // Form data
    const [formData, setFormData] = useState({
        accountNumber: '',
        bankCode: '',
        bankName: '',
        amount: '',
        narration: '',
        pin: '',
        recipientName: ''
    })

    // Bank list
    const [banks, setBanks] = useState([])
    const [filteredBanks, setFilteredBanks] = useState([])
    const [showBankDropdown, setShowBankDropdown] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')

    // Beneficiaries
    const [beneficiaries, setBeneficiaries] = useState([
        { id: 1, name: 'Chioma Okafor', accountNumber: '0123456789', bankCode: '001', bankName: 'Access Bank' },
        { id: 2, name: 'Emeka Nwosu', accountNumber: '9876543210', bankCode: '003', bankName: 'GTBank' },
        { id: 3, name: 'Tunde Balogun', accountNumber: '1122334455', bankCode: '004', bankName: 'Zenith Bank' },
        { id: 4, name: 'Funmi Adeleke', accountNumber: '5566778899', bankCode: '002', bankName: 'First Bank of Nigeria' },
        { id: 5, name: 'Oluwafemi Ojo', accountNumber: '9988776655', bankCode: '005', bankName: 'UBA' },
    ])
    const [filteredBeneficiaries, setFilteredBeneficiaries] = useState([])
    const [beneficiarySearch, setBeneficiarySearch] = useState('')

    // Fees
    const [fees, setFees] = useState({
        transferFee: 50,
        vat: 7.50,
        total: 57.50
    })

    // Errors
    const [errors, setErrors] = useState({})
    const [pinError, setPinError] = useState('')

    // Success state
    const [transactionRef, setTransactionRef] = useState('')

    // Refs
    const bankDropdownRef = useRef(null)
    const resolveTimeoutRef = useRef(null)

    // Mock banks data
    const mockBanks = [
        { code: '001', name: 'Access Bank' },
        { code: '002', name: 'First Bank of Nigeria' },
        { code: '003', name: 'GTBank' },
        { code: '004', name: 'Zenith Bank' },
        { code: '005', name: 'UBA' },
        { code: '006', name: 'Stanbic IBTC' },
        { code: '007', name: 'Fidelity Bank' },
        { code: '008', name: 'First City Monument Bank' },
        { code: '009', name: 'Union Bank' },
        { code: '010', name: 'Sterling Bank' },
        { code: '011', name: 'Wema Bank' },
        { code: '012', name: 'Heritage Bank' },
        { code: '013', name: 'Keystone Bank' },
        { code: '014', name: 'Polaris Bank' },
        { code: '015', name: 'EcoBank' },
        { code: '016', name: 'FCMB' },
        { code: '017', name: 'Providus Bank' },
        { code: '018', name: 'SunTrust Bank' },
        { code: '019', name: 'Titan Trust Bank' },
        { code: '020', name: 'Globus Bank' },
    ]

    // Load banks
    useEffect(() => {
        setBanks(mockBanks)
        setFilteredBanks(mockBanks)
        setFilteredBeneficiaries(beneficiaries)
    }, [])

    // Filter banks on search
    useEffect(() => {
        if (searchTerm) {
            const filtered = banks.filter(bank =>
                bank.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                bank.code.includes(searchTerm)
            )
            setFilteredBanks(filtered)
        } else {
            setFilteredBanks(banks)
        }
    }, [searchTerm, banks])

    // Filter beneficiaries on search
    useEffect(() => {
        if (beneficiarySearch) {
            const filtered = beneficiaries.filter(b =>
                b.name.toLowerCase().includes(beneficiarySearch.toLowerCase()) ||
                b.accountNumber.includes(beneficiarySearch) ||
                b.bankName.toLowerCase().includes(beneficiarySearch.toLowerCase())
            )
            setFilteredBeneficiaries(filtered)
        } else {
            setFilteredBeneficiaries(beneficiaries)
        }
    }, [beneficiarySearch, beneficiaries])

    // Auto-resolve account when account number and bank are provided
    useEffect(() => {
        const { accountNumber, bankCode, recipientName } = formData

        if (resolveTimeoutRef.current) {
            clearTimeout(resolveTimeoutRef.current)
            resolveTimeoutRef.current = null
        }

        const shouldResolve =
            accountNumber &&
            accountNumber.length === 10 &&
            bankCode &&
            !recipientName &&
            !isVerifying

        if (shouldResolve) {
            resolveTimeoutRef.current = setTimeout(() => {
                resolveAccount()
            }, 500)
        }

        return () => {
            if (resolveTimeoutRef.current) {
                clearTimeout(resolveTimeoutRef.current)
                resolveTimeoutRef.current = null
            }
        }
    }, [formData.accountNumber, formData.bankCode])

    // Click outside dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (bankDropdownRef.current && !bankDropdownRef.current.contains(event.target)) {
                setShowBankDropdown(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    // Handle account number input (only digits)
    const handleAccountNumberChange = (e) => {
        const value = e.target.value.replace(/\D/g, '')
        if (value.length <= 10) {
            setFormData(prev => ({
                ...prev,
                accountNumber: value,
                recipientName: ''
            }))
            // Reset save checkbox when account number changes
            setSaveBeneficiary(false)
            setShowSavePrompt(false)
            if (errors.accountNumber) {
                setErrors(prev => ({ ...prev, accountNumber: '' }))
            }
        }
    }

    // Handle amount input (only digits and decimal)
    const handleAmountChange = (e) => {
        const value = e.target.value.replace(/[^0-9.]/g, '')
        const parts = value.split('.')
        if (parts.length > 2) return
        if (parts[1] && parts[1].length > 2) return

        setFormData(prev => ({ ...prev, amount: value }))
        if (errors.amount) {
            setErrors(prev => ({ ...prev, amount: '' }))
        }
    }

    // Handle bank selection
    const handleBankSelect = (bank) => {
        setFormData(prev => ({
            ...prev,
            bankCode: bank.code,
            bankName: bank.name,
            recipientName: ''
        }))
        setSaveBeneficiary(false)
        setShowSavePrompt(false)
        setShowBankDropdown(false)
        setSearchTerm('')
        if (errors.bankCode) {
            setErrors(prev => ({ ...prev, bankCode: '' }))
        }
    }

    // Handle beneficiary selection
    const handleBeneficiarySelect = (beneficiary) => {
        setSelectedBeneficiary(beneficiary)
        setFormData(prev => ({
            ...prev,
            accountNumber: beneficiary.accountNumber,
            bankCode: beneficiary.bankCode,
            bankName: beneficiary.bankName,
            recipientName: beneficiary.name
        }))
        setSaveBeneficiary(false)
        setShowSavePrompt(false)
        setShowBeneficiaryModal(false)
        setBeneficiarySearch('')
        toast.showSuccess(`Beneficiary ${beneficiary.name} selected! ✅`)
    }

    // Handle beneficiary removal
    const handleRemoveBeneficiary = (id) => {
        if (window.confirm('Are you sure you want to remove this beneficiary?')) {
            setBeneficiaries(prev => prev.filter(b => b.id !== id))
            if (selectedBeneficiary?.id === id) {
                setSelectedBeneficiary(null)
                setFormData(prev => ({
                    ...prev,
                    accountNumber: '',
                    bankCode: '',
                    bankName: '',
                    recipientName: ''
                }))
            }
            toast.showSuccess('Beneficiary removed!')
        }
    }

    // Resolve account
    const resolveAccount = async () => {
        const { accountNumber, bankCode } = formData

        if (!accountNumber || accountNumber.length !== 10) {
            setErrors(prev => ({ ...prev, accountNumber: 'Please enter a valid 10-digit account number' }))
            return
        }

        if (!bankCode) {
            setErrors(prev => ({ ...prev, bankCode: 'Please select a bank' }))
            return
        }

        if (formData.recipientName) return

        setIsVerifying(true)

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

            // Check if this account is already a beneficiary
            const isExistingBeneficiary = beneficiaries.some(b =>
                b.accountNumber === accountNumber && b.bankCode === bankCode
            )

            setFormData(prev => ({ ...prev, recipientName: randomName }))
            toast.showSuccess('Account resolved successfully! ✅')

            // ✅ Show save prompt if not already a beneficiary
            if (!isExistingBeneficiary) {
                setShowSavePrompt(true)
                setSaveBeneficiary(true) // Auto-check the checkbox
            }

        } catch (error) {
            toast.showError('Failed to resolve account. Please try again.')
            setFormData(prev => ({ ...prev, recipientName: '' }))
        } finally {
            setIsVerifying(false)
        }
    }

    // ✅ Handle saving beneficiary on transfer completion
    const handleSaveBeneficiary = () => {
        if (!saveBeneficiary) return

        const { accountNumber, bankCode, bankName, recipientName } = formData

        // Check if already exists
        const exists = beneficiaries.some(b =>
            b.accountNumber === accountNumber && b.bankCode === bankCode
        )

        if (!exists && recipientName) {
            const newBeneficiary = {
                id: Date.now(),
                name: recipientName,
                accountNumber: accountNumber,
                bankCode: bankCode,
                bankName: bankName
            }
            setBeneficiaries(prev => [...prev, newBeneficiary])
            toast.showSuccess(`${recipientName} saved as beneficiary! 💾`)
        }
    }

    // Validate form (Step 1)
    const validateForm = () => {
        const newErrors = {}

        if (!formData.accountNumber || formData.accountNumber.length !== 10) {
            newErrors.accountNumber = 'Please enter a valid 10-digit account number'
        }

        if (!formData.bankCode) {
            newErrors.bankCode = 'Please select a bank'
        }

        if (!formData.recipientName) {
            newErrors.recipientName = 'Please resolve account first'
        }

        if (!formData.amount || parseFloat(formData.amount) <= 0) {
            newErrors.amount = 'Please enter a valid amount'
        }

        if (parseFloat(formData.amount) > 500000) {
            newErrors.amount = 'Amount exceeds daily limit of ₦500,000'
        }

        if (!formData.narration) {
            newErrors.narration = 'Please enter a narration'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    // Handle continue to step 2
    const handleContinue = () => {
        if (validateForm()) {
            const amount = parseFloat(formData.amount)
            const transferFee = amount <= 5000 ? 25 : 50
            const vat = transferFee * 0.075
            setFees({
                transferFee,
                vat: Math.round(vat * 100) / 100,
                total: transferFee + Math.round(vat * 100) / 100
            })
            setStep(2)
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

    // Handle send (Step 2)
    const handleSend = async () => {
        if (!formData.pin || formData.pin.length !== 4) {
            setPinError('Please enter your 4-digit PIN')
            return
        }

        setIsLoading(true)

        try {
            await new Promise(resolve => setTimeout(resolve, 2000))

            // ✅ Save beneficiary if checkbox is checked
            await handleSaveBeneficiary()

            const ref = 'ZUR-' + Date.now().toString().slice(-8) + '-' + Math.random().toString(36).substring(2, 6).toUpperCase()
            setTransactionRef(ref)

            setStep(3)
            toast.showSuccess('Transfer successful! 🎉')

        } catch (error) {
            toast.showError('Transfer failed. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount)
    }

    // Format account number with spaces
    const formatAccountNumber = (number) => {
        return number.replace(/(\d{4})(?=\d)/g, '$1 ')
    }

    // Reset transfer
    const handleNewTransfer = () => {
        setStep(1)
        setFormData({
            accountNumber: '',
            bankCode: '',
            bankName: '',
            amount: '',
            narration: '',
            pin: '',
            recipientName: ''
        })
        setSelectedBeneficiary(null)
        setSaveBeneficiary(false)
        setShowSavePrompt(false)
        setErrors({})
        setPinError('')
        setTransactionRef('')
    }

    // Render step 1: Form
    const renderStep1 = () => (
        <div className="space-y-4">
            {/* Beneficiary Selection */}
            <div>
                <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-sm font-medium text-[#C7C9DC]">
                        Select Beneficiary
                    </label>
                    <button
                        type="button"
                        onClick={() => setShowBeneficiaryModal(true)}
                        className="text-xs text-[#C9A24B] hover:text-[#D4B35C] transition-colors flex items-center gap-1"
                    >
                        <Users className="w-3 h-3" />
                        View All
                    </button>
                </div>
                {selectedBeneficiary ? (
                    <div className="bg-[#C9A24B]/10 border border-[#C9A24B]/20 rounded-xl p-3 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium">{selectedBeneficiary.name}</p>
                            <p className="text-xs text-[#7E81A0]">{formatAccountNumber(selectedBeneficiary.accountNumber)} • {selectedBeneficiary.bankName}</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => {
                                setSelectedBeneficiary(null)
                                setFormData(prev => ({
                                    ...prev,
                                    accountNumber: '',
                                    bankCode: '',
                                    bankName: '',
                                    recipientName: ''
                                }))
                                setSaveBeneficiary(false)
                                setShowSavePrompt(false)
                            }}
                            className="text-red-500 hover:text-red-400 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={() => setShowBeneficiaryModal(true)}
                        className="w-full px-4 py-3 bg-white/[0.03] border border-dashed border-white/20 rounded-xl text-[#7E81A0] text-sm hover:border-[#C9A24B]/50 hover:text-[#F7F7FA] transition-colors flex items-center justify-center gap-2"
                    >
                        <Users className="w-4 h-4" />
                        Select from beneficiaries or enter new
                    </button>
                )}
            </div>

            {/* OR Divider */}
            {!selectedBeneficiary && (
                <div className="flex items-center gap-4">
                    <div className="flex-1 h-px bg-white/[0.06]"></div>
                    <span className="text-xs text-[#7E81A0]">OR Enter New</span>
                    <div className="flex-1 h-px bg-white/[0.06]"></div>
                </div>
            )}

            {/* Account Number */}
            <div>
                <label className="block text-sm font-medium text-[#C7C9DC] mb-1.5">
                    Account Number
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="w-5 h-5 text-[#7E81A0]" />
                    </div>
                    <input
                        type="text"
                        name="accountNumber"
                        value={formatAccountNumber(formData.accountNumber)}
                        onChange={handleAccountNumberChange}
                        placeholder="0123 4567 8901"
                        className={`w-full pl-10 pr-4 py-3 bg-white/[0.05] border rounded-xl text-[#F7F7FA] placeholder-[#7E81A0] focus:outline-none focus:ring-2 transition-all duration-200 text-sm font-mono ${
                            errors.accountNumber
                                ? 'border-red-500 focus:ring-red-500/50'
                                : 'border-white/10 focus:ring-[#C9A24B]/50 focus:border-[#C9A24B]'
                        }`}
                        maxLength={14}
                        disabled={!!selectedBeneficiary}
                    />
                </div>
                {errors.accountNumber && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.accountNumber}
                    </p>
                )}
            </div>

            {/* Bank Selection */}
            <div className="relative" ref={bankDropdownRef}>
                <label className="block text-sm font-medium text-[#C7C9DC] mb-1.5">
                    Select Bank
                </label>
                <button
                    type="button"
                    onClick={() => setShowBankDropdown(!showBankDropdown)}
                    className={`w-full px-4 py-3 bg-white/[0.05] border rounded-xl text-[#F7F7FA] text-left focus:outline-none focus:ring-2 transition-all duration-200 flex items-center justify-between ${
                        errors.bankCode
                            ? 'border-red-500 focus:ring-red-500/50'
                            : 'border-white/10 focus:ring-[#C9A24B]/50 focus:border-[#C9A24B]'
                    }`}
                    disabled={!!selectedBeneficiary}
                >
                    <span className={formData.bankName ? 'text-[#F7F7FA]' : 'text-[#7E81A0]'}>
                        {formData.bankName || 'Select a bank'}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-[#7E81A0] transition-transform ${showBankDropdown ? 'rotate-180' : ''}`} />
                </button>
                {errors.bankCode && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.bankCode}
                    </p>
                )}

                {showBankDropdown && !selectedBeneficiary && (
                    <div className="absolute z-10 w-full mt-1 bg-[#0F1229] border border-white/10 rounded-xl shadow-xl max-h-60 overflow-hidden">
                        <div className="p-2 border-b border-white/[0.06]">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7E81A0]" />
                                <input
                                    type="text"
                                    placeholder="Search banks..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2 bg-white/[0.05] border border-white/10 rounded-lg text-[#F7F7FA] placeholder-[#7E81A0] focus:outline-none focus:ring-2 focus:ring-[#C9A24B]/50 focus:border-[#C9A24B] transition-all duration-200 text-sm"
                                />
                            </div>
                        </div>
                        <div className="overflow-y-auto max-h-48">
                            {filteredBanks.map((bank) => (
                                <button
                                    key={bank.code}
                                    onClick={() => handleBankSelect(bank)}
                                    className="w-full px-4 py-2.5 text-left hover:bg-white/[0.05] transition-colors flex items-center justify-between text-sm"
                                >
                                    <span>{bank.name}</span>
                                    <span className="text-xs text-[#7E81A0]">{bank.code}</span>
                                </button>
                            ))}
                            {filteredBanks.length === 0 && (
                                <div className="px-4 py-8 text-center text-sm text-[#7E81A0]">
                                    No banks found
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Auto-resolve status */}
            {formData.accountNumber && formData.accountNumber.length === 10 && formData.bankCode && (
                <div className="flex items-center gap-2 text-sm">
                    {isVerifying ? (
                        <>
                            <Loader className="w-4 h-4 animate-spin text-[#C9A24B]" />
                            <span className="text-[#7E81A0]">Verifying account...</span>
                        </>
                    ) : formData.recipientName ? (
                        <div className="flex items-center gap-2 text-green-500">
                            <CheckCircle className="w-4 h-4" />
                            <span>Account verified: {formData.recipientName}</span>
                        </div>
                    ) : (
                        <span className="text-[#7E81A0]">Waiting for verification...</span>
                    )}
                </div>
            )}

            {/* Recipient Name */}
            {formData.recipientName && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3 flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <div>
                        <p className="text-sm text-[#F7F7FA]">{formData.recipientName}</p>
                        <p className="text-xs text-[#7E81A0]">Account verified</p>
                    </div>
                </div>
            )}
            {errors.recipientName && (
                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.recipientName}
                </p>
            )}

            {/* ✅ Save Beneficiary Checkbox */}
            {formData.recipientName && showSavePrompt && (
                <div className="bg-[#C9A24B]/5 border border-[#C9A24B]/20 rounded-xl p-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={saveBeneficiary}
                            onChange={(e) => setSaveBeneficiary(e.target.checked)}
                            className="w-4 h-4 rounded border-white/10 bg-white/[0.05] text-[#C9A24B] focus:ring-[#C9A24B] focus:ring-offset-0 focus:ring-offset-[#0F1229] cursor-pointer"
                        />
                        <div>
                            <span className="text-sm text-[#F7F7FA]">Save as beneficiary</span>
                            <p className="text-xs text-[#7E81A0]">Save {formData.recipientName} for faster future transfers</p>
                        </div>
                    </label>
                </div>
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
                        name="amount"
                        value={formData.amount}
                        onChange={handleAmountChange}
                        placeholder="0.00"
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
                    Minimum: ₦100 | Maximum: ₦500,000
                </p>
            </div>

            {/* Narration */}
            <div>
                <label className="block text-sm font-medium text-[#C7C9DC] mb-1.5">
                    Narration
                </label>
                <input
                    type="text"
                    name="narration"
                    value={formData.narration}
                    onChange={handleChange}
                    placeholder="What's this for?"
                    className={`w-full px-4 py-3 bg-white/[0.05] border rounded-xl text-[#F7F7FA] placeholder-[#7E81A0] focus:outline-none focus:ring-2 transition-all duration-200 text-sm ${
                        errors.narration
                            ? 'border-red-500 focus:ring-red-500/50'
                            : 'border-white/10 focus:ring-[#C9A24B]/50 focus:border-[#C9A24B]'
                    }`}
                />
                {errors.narration && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.narration}
                    </p>
                )}
            </div>

            {/* Continue Button */}
            <button
                onClick={handleContinue}
                disabled={!formData.recipientName || isVerifying}
                className={`w-full py-3.5 rounded-xl font-medium text-sm transition-colors flex items-center justify-center gap-2 ${
                    formData.recipientName && !isVerifying
                        ? 'bg-[#C9A24B] text-[#0F1229] hover:bg-[#D4B35C]'
                        : 'bg-white/[0.05] text-[#7E81A0] cursor-not-allowed'
                }`}
            >
                {isVerifying ? (
                    <>
                        <Loader className="w-4 h-4 animate-spin" />
                        Verifying...
                    </>
                ) : (
                    <>
                        Continue
                        <ArrowRight className="w-4 h-4" />
                    </>
                )}
            </button>
        </div>
    )

    // Render step 2: Confirm
    const renderStep2 = () => (
        <div className="space-y-6">
            {/* Recipient Summary */}
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-center">
                    <span className="text-sm text-[#7E81A0]">Recipient</span>
                    <span className="text-sm font-medium">{formData.recipientName}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-[#7E81A0]">Account</span>
                    <span className="text-sm font-mono">{formatAccountNumber(formData.accountNumber)}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-[#7E81A0]">Bank</span>
                    <span className="text-sm">{formData.bankName}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-[#7E81A0]">Amount</span>
                    <span className="text-lg font-bold text-[#C9A24B]">{formatCurrency(parseFloat(formData.amount))}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-[#7E81A0]">Narration</span>
                    <span className="text-sm text-[#C7C9DC]">{formData.narration}</span>
                </div>
                {saveBeneficiary && (
                    <div className="flex items-center gap-2 text-xs text-[#C9A24B]">
                        <Save className="w-3 h-3" />
                        Will be saved as beneficiary
                    </div>
                )}
                <button
                    onClick={() => setStep(1)}
                    className="text-xs text-[#C9A24B] hover:text-[#D4B35C] transition-colors"
                >
                    Edit details
                </button>
            </div>

            {/* Fees Breakdown */}
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
                <h4 className="text-sm font-medium text-[#C7C9DC] mb-3">Transaction Breakdown</h4>
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-[#7E81A0]">Transfer Fee</span>
                        <span className="text-[#F7F7FA]">{formatCurrency(fees.transferFee)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-[#7E81A0]">VAT (7.5%)</span>
                        <span className="text-[#F7F7FA]">{formatCurrency(fees.vat)}</span>
                    </div>
                    <div className="border-t border-white/[0.06] pt-2 mt-2">
                        <div className="flex justify-between font-semibold">
                            <span className="text-[#F7F7FA]">Total</span>
                            <span className="text-[#C9A24B]">{formatCurrency(parseFloat(formData.amount) + fees.total)}</span>
                        </div>
                        <p className="text-xs text-[#7E81A0] mt-1">You will be charged {formatCurrency(parseFloat(formData.amount) + fees.total)} including fees</p>
                    </div>
                </div>
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
                            Send Money
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
                Transfer Successful! 🎉
            </h2>
            <p className="text-[#7E81A0] text-sm mb-6">
                Your money has been sent successfully
            </p>

            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 text-left space-y-3 mb-6">
                <div className="flex justify-between items-center">
                    <span className="text-sm text-[#7E81A0]">Amount</span>
                    <span className="text-lg font-bold text-[#C9A24B]">{formatCurrency(parseFloat(formData.amount))}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-[#7E81A0]">Recipient</span>
                    <span className="text-sm font-medium">{formData.recipientName}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-[#7E81A0]">Bank</span>
                    <span className="text-sm">{formData.bankName}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-[#7E81A0]">Reference</span>
                    <span className="text-sm font-mono text-[#C9A24B]">{transactionRef}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-[#7E81A0]">Date</span>
                    <span className="text-sm">{new Date().toLocaleString('en-NG')}</span>
                </div>
                {saveBeneficiary && (
                    <div className="flex items-center gap-2 text-green-500 border-t border-white/[0.06] pt-3 mt-2">
                        <Save className="w-4 h-4" />
                        <span className="text-sm font-medium">Saved as beneficiary</span>
                    </div>
                )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
                <button
                    onClick={handleNewTransfer}
                    className="flex-1 py-3.5 rounded-xl bg-[#C9A24B] text-[#0F1229] font-medium text-sm hover:bg-[#D4B35C] transition-colors flex items-center justify-center gap-2"
                >
                    <Send className="w-4 h-4" />
                    New Transfer
                </button>
                <button
                    onClick={() => navigate('/account/dashboard')}
                    className="flex-1 py-3.5 rounded-xl bg-white/[0.05] border border-white/10 text-[#F7F7FA] font-medium text-sm hover:bg-white/[0.1] transition-colors flex items-center justify-center gap-2"
                >
                    <Wallet className="w-4 h-4" />
                    Dashboard
                </button>
            </div>
        </div>
    )

    // Beneficiary Modal
    const renderBeneficiaryModal = () => (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
            onClick={() => setShowBeneficiaryModal(false)}
        >
            <div
                className="bg-[#0F1229] border border-white/10 rounded-3xl max-w-md w-full max-h-[80vh] shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-[#C9A24B]/10">
                            <Users className="w-5 h-5 text-[#C9A24B]" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold" style={{ fontFamily: "'Fraunces', serif" }}>
                                Beneficiaries
                            </h2>
                            <p className="text-xs text-[#7E81A0]">
                                {beneficiaries.length} saved beneficiaries
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowBeneficiaryModal(false)}
                        className="p-2 rounded-lg hover:bg-white/[0.05] transition-colors"
                    >
                        <X className="w-5 h-5 text-[#7E81A0]" />
                    </button>
                </div>

                <div className="p-4">
                    <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7E81A0]" />
                        <input
                            type="text"
                            placeholder="Search beneficiaries..."
                            value={beneficiarySearch}
                            onChange={(e) => setBeneficiarySearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white/[0.05] border border-white/10 rounded-xl text-[#F7F7FA] placeholder-[#7E81A0] focus:outline-none focus:ring-2 focus:ring-[#C9A24B]/50 focus:border-[#C9A24B] transition-all duration-200 text-sm"
                        />
                    </div>

                    <div className="max-h-64 overflow-y-auto space-y-2 custom-scrollbar">
                        {filteredBeneficiaries.length === 0 ? (
                            <div className="text-center py-8 text-[#7E81A0]">
                                <Users className="w-12 h-12 mx-auto mb-2 opacity-20" />
                                <p className="text-sm">No beneficiaries found</p>
                                <p className="text-xs">Add a new beneficiary by entering their details</p>
                            </div>
                        ) : (
                            filteredBeneficiaries.map((beneficiary) => (
                                <div
                                    key={beneficiary.id}
                                    className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] transition-colors"
                                >
                                    <button
                                        onClick={() => handleBeneficiarySelect(beneficiary)}
                                        className="flex-1 text-left"
                                    >
                                        <p className="text-sm font-medium">{beneficiary.name}</p>
                                        <p className="text-xs text-[#7E81A0]">
                                            {formatAccountNumber(beneficiary.accountNumber)} • {beneficiary.bankName}
                                        </p>
                                    </button>
                                    <button
                                        onClick={() => handleRemoveBeneficiary(beneficiary.id)}
                                        className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors text-[#7E81A0] hover:text-red-500"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <div className="min-h-screen bg-[#0F1229] text-[#F7F7FA]">
            <div className="max-w-lg mx-auto px-4 py-8">
                <div className="flex items-center gap-3 mb-6">
                    <button
                        onClick={() => step === 1 ? navigate('/account/dashboard') : setStep(1)}
                        className="p-2 rounded-xl hover:bg-white/[0.05] transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-[#7E81A0]" />
                    </button>
                    <div>
                        <h1 className="text-xl font-bold" style={{ fontFamily: "'Fraunces', serif" }}>
                            {step === 1 ? 'Transfer Money' : step === 2 ? 'Confirm Transfer' : 'Success'}
                        </h1>
                        <p className="text-xs text-[#7E81A0]">
                            {step === 1 && 'Enter recipient details to continue'}
                            {step === 2 && 'Review and confirm your transfer'}
                            {step === 3 && 'Transfer completed successfully'}
                        </p>
                    </div>
                </div>

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

                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                    {step === 1 && renderStep1()}
                    {step === 2 && renderStep2()}
                    {step === 3 && renderStep3()}
                </div>

                {step < 3 && (
                    <div className="mt-4 text-center">
                        <div className="flex items-center justify-center gap-2 text-xs text-[#7E81A0]">
                            <Shield className="w-3.5 h-3.5" />
                            <span>256-bit encrypted transaction</span>
                        </div>
                    </div>
                )}
            </div>

            {showBeneficiaryModal && renderBeneficiaryModal()}

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out;
                }
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

export default Transfer