import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useToastActions } from '../../hooks/useToastActions'
import {
    Eye,
    EyeOff,
    Wallet,
    Send,
    Smartphone,
    Wifi,
    Lightbulb,
    Tv,
    ArrowUpRight,
    ArrowDownLeft,
    Clock,
    CreditCard,
    Users,
    Calendar,
    ChevronRight,
    Copy,
    CheckCircle,
    Zap,
    TrendingUp,
    Receipt,
    Plus,
    Minus,
    Banknote,
    Phone,
    Mail,
    Shield,
    Key,
    X,
    Check,
    AlertCircle
} from 'lucide-react'

const Dashboard = () => {
    const toast = useToastActions()
    const [showBalance, setShowBalance] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const [balance, setBalance] = useState(125000)
    const [hasTransactionPin, setHasTransactionPin] = useState(false)
    const [showPinModal, setShowPinModal] = useState(false)
    const [pin, setPin] = useState(['', '', '', ''])
    const [confirmPin, setConfirmPin] = useState(['', '', '', ''])
    const [pinError, setPinError] = useState('')
    const [isSettingPin, setIsSettingPin] = useState(false)
    const [showPin, setShowPin] = useState(false)
    const [showConfirmPin, setShowConfirmPin] = useState(false)
    const [user, setUser] = useState({
        name: 'John Doe',
        email: 'john.doe@email.com',
        phone: '08012345678',
        accountNumber: '0123456789',
        bankName: 'ZuriPay Wallet'
    })

    // Recent transactions
    const recentTransactions = [
        {
            id: 1,
            type: 'sent',
            name: 'Chioma Okafor',
            amount: 25000,
            date: '2024-01-15 14:30',
            status: 'completed',
            description: 'Transfer to Chioma'
        },
        {
            id: 2,
            type: 'received',
            name: 'Emeka Nwosu',
            amount: 45000,
            date: '2024-01-14 10:15',
            status: 'completed',
            description: 'Payment from Emeka'
        },
        {
            id: 3,
            type: 'bill',
            name: 'Ikeja Electric',
            amount: 15000,
            date: '2024-01-13 09:00',
            status: 'completed',
            description: 'Electricity bill payment'
        },
        {
            id: 4,
            type: 'sent',
            name: 'Sola Adebayo',
            amount: 10000,
            date: '2024-01-12 16:45',
            status: 'pending',
            description: 'Transfer to Sola'
        },
        {
            id: 5,
            type: 'received',
            name: 'Airtel Airtime',
            amount: 5000,
            date: '2024-01-12 08:20',
            status: 'completed',
            description: 'Airtime purchase'
        },
        {
            id: 6,
            type: 'bill',
            name: 'DStv',
            amount: 16500,
            date: '2024-01-11 13:30',
            status: 'completed',
            description: 'DStv subscription'
        },
        {
            id: 7,
            type: 'sent',
            name: 'Tunde Balogun',
            amount: 30000,
            date: '2024-01-10 11:00',
            status: 'failed',
            description: 'Transfer to Tunde'
        },
        {
            id: 8,
            type: 'received',
            name: 'Glo Data',
            amount: 2000,
            date: '2024-01-10 07:45',
            status: 'completed',
            description: 'Data purchase'
        },
        {
            id: 9,
            type: 'bill',
            name: 'Eko Electric',
            amount: 12000,
            date: '2024-01-09 15:20',
            status: 'completed',
            description: 'Electricity bill'
        },
        {
            id: 10,
            type: 'sent',
            name: 'Funmi Adeleke',
            amount: 5000,
            date: '2024-01-09 09:30',
            status: 'completed',
            description: 'Transfer to Funmi'
        }
    ]

    // Quick action buttons
    const quickActions = [
        { icon: Send, label: 'Transfer', color: '#6C5CE7', bgColor: 'bg-purple-500/10', borderColor: 'border-purple-500/20', path: '/account/pay/transfer' },
        { icon: Smartphone, label: 'Airtime', color: '#F59E0B', bgColor: 'bg-yellow-500/10', borderColor: 'border-yellow-500/20', path: '/account/pay/airtime' },
        { icon: Wifi, label: 'Data', color: '#34D399', bgColor: 'bg-green-500/10', borderColor: 'border-green-500/20', path: '/account/pay/data' },
        { icon: Lightbulb, label: 'Electricity', color: '#F472B6', bgColor: 'bg-pink-500/10', borderColor: 'border-pink-500/20', path: '/account/pay/electricity' },
        { icon: Tv, label: 'Cable TV', color: '#60A5FA', bgColor: 'bg-blue-500/10', borderColor: 'border-blue-500/20', path: '/account/pay/cable' },
    ]

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
            setHasTransactionPin(false)
        }, 1000)
        return () => clearTimeout(timer)
    }, [])

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text)
        toast.showSuccess('Copied to clipboard! 📋')
    }

    // ✅ Handle PIN input with validation (only digits)
    const handlePinChange = (index, value, type) => {
        // ✅ Only allow digits
        if (!/^\d*$/.test(value)) return

        // ✅ Limit to 1 character
        if (value.length > 1) return

        const newPin = [...pin]
        newPin[index] = value
        setPin(newPin)
        setPinError('')

        // Auto-focus next input
        if (value && index < 3) {
            const nextInput = document.getElementById(`pin-${index + 1}`)
            if (nextInput) nextInput.focus()
        }
    }

    // ✅ Handle Confirm PIN input
    const handleConfirmPinChange = (index, value) => {
        if (!/^\d*$/.test(value)) return
        if (value.length > 1) return

        const newConfirmPin = [...confirmPin]
        newConfirmPin[index] = value
        setConfirmPin(newConfirmPin)
        setPinError('')

        if (value && index < 3) {
            const nextInput = document.getElementById(`confirm-pin-${index + 1}`)
            if (nextInput) nextInput.focus()
        }
    }

    // ✅ Handle keydown for backspace navigation
    const handlePinKeyDown = (index, e, type) => {
        if (e.key === 'Backspace' && !pin[index] && index > 0) {
            const prevInput = document.getElementById(`pin-${index - 1}`)
            if (prevInput) prevInput.focus()
        }
    }

    const handleConfirmPinKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !confirmPin[index] && index > 0) {
            const prevInput = document.getElementById(`confirm-pin-${index - 1}`)
            if (prevInput) prevInput.focus()
        }
    }

    // ✅ Validate and set PIN
    const handleSetPin = async () => {
        const pinString = pin.join('')
        const confirmPinString = confirmPin.join('')

        // ✅ Check if PIN is exactly 4 digits
        if (pinString.length !== 4) {
            setPinError('Please enter a 4-digit PIN')
            return
        }

        // ✅ Check if Confirm PIN is exactly 4 digits
        if (confirmPinString.length !== 4) {
            setPinError('Please confirm your 4-digit PIN')
            return
        }

        // ✅ Check if PIN contains only digits (already validated by input)
        if (!/^\d{4}$/.test(pinString)) {
            setPinError('PIN must contain only numbers')
            return
        }

        // ✅ Check if PIN matches Confirm PIN
        if (pinString !== confirmPinString) {
            setPinError('PINs do not match. Please try again.')
            // Clear confirm PIN fields
            setConfirmPin(['', '', '', ''])
            // Focus first confirm PIN input
            document.getElementById('confirm-pin-0')?.focus()
            return
        }

        setIsSettingPin(true)

        try {
            await new Promise(resolve => setTimeout(resolve, 1500))

            setHasTransactionPin(true)
            setShowPinModal(false)
            setPin(['', '', '', ''])
            setConfirmPin(['', '', '', ''])
            toast.showSuccess('Transaction PIN set successfully! 🔐')
        } catch (error) {
            toast.showError('Failed to set PIN. Please try again.')
        } finally {
            setIsSettingPin(false)
        }
    }

    const handleSkip = () => {
        setShowPinModal(false)
        setPin(['', '', '', ''])
        setConfirmPin(['', '', '', ''])
        toast.showInfo('You can set your transaction PIN later in Settings')
    }

    const handleCancel = () => {
        setShowPinModal(false)
        setPin(['', '', '', ''])
        setConfirmPin(['', '', '', ''])
        setPinError('')
    }

    const getTransactionIcon = (type) => {
        switch (type) {
            case 'sent':
                return <ArrowUpRight className="w-4 h-4 text-red-500" />
            case 'received':
                return <ArrowDownLeft className="w-4 h-4 text-green-500" />
            case 'bill':
                return <Receipt className="w-4 h-4 text-blue-500" />
            default:
                return <Clock className="w-4 h-4 text-gray-500" />
        }
    }

    const getTransactionColor = (type) => {
        switch (type) {
            case 'sent':
                return 'text-red-500'
            case 'received':
                return 'text-green-500'
            case 'bill':
                return 'text-blue-500'
            default:
                return 'text-gray-500'
        }
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return 'bg-green-500/10 text-green-500'
            case 'pending':
                return 'bg-yellow-500/10 text-yellow-500'
            case 'failed':
                return 'bg-red-500/10 text-red-500'
            default:
                return 'bg-gray-500/10 text-gray-500'
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-NG', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount)
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#0F1229] flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C9A24B] mx-auto"></div>
                    <p className="text-[#7E81A0] mt-4">Loading your dashboard...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#0F1229] text-[#F7F7FA]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold" style={{ fontFamily: "'Fraunces', serif" }}>
                            Welcome back, {user.name.split(' ')[0]} 👋
                        </h1>
                        <p className="text-[#7E81A0] text-sm">Here's what's happening with your money</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => toast.showInfo('Refreshing...')}
                            className="p-2 rounded-xl bg-white/[0.05] border border-white/10 hover:bg-white/[0.1] transition-colors"
                        >
                            <TrendingUp className="w-5 h-5 text-[#7E81A0]" />
                        </button>
                        <Link
                            to="/account/profile"
                            className="p-2 rounded-xl bg-white/[0.05] border border-white/10 hover:bg-white/[0.1] transition-colors"
                        >
                            <Users className="w-5 h-5 text-[#7E81A0]" />
                        </Link>
                    </div>
                </div>

                {/* Transaction PIN Prompt */}
                {!hasTransactionPin && (
                    <div className="bg-gradient-to-r from-[#C9A24B]/10 to-[#6C5CE7]/10 border border-[#C9A24B]/20 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-3">
                            <div className="p-2 rounded-xl bg-[#C9A24B]/10 flex-shrink-0">
                                <Shield className="w-5 h-5 text-[#C9A24B]" />
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-[#F7F7FA]">Set Up Transaction PIN</h4>
                                <p className="text-xs text-[#7E81A0] mt-0.5">
                                    Secure your transactions by setting a 4-digit PIN. You'll need it for transfers and payments.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <button
                                onClick={() => setShowPinModal(true)}
                                className="flex-1 sm:flex-none px-6 py-2 rounded-xl bg-[#C9A24B] text-[#0F1229] text-sm font-medium hover:bg-[#D4B35C] transition-colors"
                            >
                                Set PIN
                            </button>
                            <button
                                onClick={handleSkip}
                                className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-[#7E81A0] text-sm hover:text-[#F7F7FA] hover:bg-white/[0.1] transition-colors"
                            >
                                Skip
                            </button>
                        </div>
                    </div>
                )}

                {/* Balance Card */}
                <div className="relative bg-gradient-to-r from-[#6C5CE7]/20 via-[#C9A24B]/20 to-[#6C5CE7]/20 rounded-3xl p-6 sm:p-8 border border-white/10 mb-8 overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A24B]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#6C5CE7]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                    <div className="relative">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <Wallet className="w-5 h-5 text-[#C9A24B]" />
                                <span className="text-sm text-[#C7C9DC]">Available Balance</span>
                            </div>
                            <button
                                onClick={() => setShowBalance(!showBalance)}
                                className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] transition-colors"
                            >
                                {showBalance ? <Eye className="w-4 h-4 text-[#7E81A0]" /> : <EyeOff className="w-4 h-4 text-[#7E81A0]" />}
                            </button>
                        </div>

                        <div className="flex items-end gap-4">
                            <div>
                                <div className="text-4xl font-bold" style={{ fontFamily: "'Fraunces', serif" }}>
                                    {showBalance ? formatCurrency(balance) : '****'}
                                </div>
                                <div className="text-sm text-[#7E81A0] mt-1">Available for withdrawal</div>
                            </div>
                            {/*<button*/}
                            {/*    onClick={() => toast.showSuccess('Balance refreshed!')}*/}
                            {/*    className="px-4 py-2 rounded-xl bg-[#C9A24B] text-[#0F1229] text-sm font-medium hover:bg-[#D4B35C] transition-colors"*/}
                            {/*>*/}
                            {/*    Fund Wallet*/}
                            {/*</button>*/}
                        </div>

                        {/* Account Details */}
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="bg-white/[0.03] rounded-xl p-4 border border-white/10">
                                <div className="text-xs text-[#7E81A0] mb-1">Account Name</div>
                                <div className="text-sm font-medium text-[#F7F7FA]">{user.name}</div>
                            </div>
                            <div className="bg-white/[0.03] rounded-xl p-4 border border-white/10">
                                <div className="text-xs text-[#7E81A0] mb-1">Account Number</div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-[#F7F7FA]">{user.accountNumber}</span>
                                    <button
                                        onClick={() => handleCopy(user.accountNumber)}
                                        className="text-[#7E81A0] hover:text-[#C9A24B] transition-colors"
                                    >
                                        <Copy className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <div className="bg-white/[0.03] rounded-xl p-4 border border-white/10">
                                <div className="text-xs text-[#7E81A0] mb-1">Bank</div>
                                <div className="text-sm font-medium text-[#F7F7FA]">{user.bankName}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                        {quickActions.map((action) => {
                            const Icon = action.icon
                            return (
                                <Link
                                    key={action.label}
                                    to={action.path}
                                    className={`${action.bgColor} ${action.borderColor} border rounded-2xl p-4 text-center hover:scale-[1.02] transition-all duration-200 group`}
                                >
                                    <div className="flex justify-center mb-2">
                                        <div className="p-3 rounded-xl bg-white/[0.05]" style={{ color: action.color }}>
                                            <Icon className="w-6 h-6" />
                                        </div>
                                    </div>
                                    <span className="text-sm font-medium">{action.label}</span>
                                </Link>
                            )
                        })}
                    </div>
                </div>

                {/* Recent Transactions */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold">Recent Transactions</h2>
                        <Link
                            to="/account/transactions"
                            className="text-sm text-[#C9A24B] hover:text-[#D4B35C] transition-colors flex items-center gap-1"
                        >
                            View All
                            <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
                        <div className="divide-y divide-white/[0.06]">
                            {recentTransactions.slice(0, 10).map((transaction) => (
                                <div
                                    key={transaction.id}
                                    className="flex items-center gap-4 p-4 hover:bg-white/[0.03] transition-colors cursor-pointer"
                                    onClick={() => toast.showInfo(`Viewing ${transaction.description}`)}
                                >
                                    <div className={`p-2 rounded-xl bg-white/[0.05] ${getStatusColor(transaction.status)}`}>
                                        {getTransactionIcon(transaction.type)}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium">{transaction.name}</span>
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full ${getStatusColor(transaction.status)}`}>
                                                {transaction.status}
                                            </span>
                                        </div>
                                        <div className="text-xs text-[#7E81A0] flex items-center gap-2">
                                            <Clock className="w-3 h-3" />
                                            {formatDate(transaction.date)}
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <div className={`text-sm font-semibold ${getTransactionColor(transaction.type)}`}>
                                            {transaction.type === 'sent' ? '-' : transaction.type === 'received' ? '+' : ''}
                                            {formatCurrency(transaction.amount)}
                                        </div>
                                        <div className="text-xs text-[#7E81A0]">{transaction.type}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ✅ Transaction PIN Modal - Two Inputs */}
            {showPinModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
                >
                    <div
                        className="bg-[#0F1229] border border-white/10 rounded-3xl max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-[#C9A24B]/10">
                                    <Key className="w-5 h-5 text-[#C9A24B]" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold" style={{ fontFamily: "'Fraunces', serif" }}>
                                        Set Transaction PIN
                                    </h2>
                                    <p className="text-xs text-[#7E81A0]">Enter and confirm your 4-digit PIN</p>
                                </div>
                            </div>
                            <button
                                onClick={handleCancel}
                                className="p-2 rounded-lg hover:bg-white/[0.05] transition-colors"
                            >
                                <X className="w-5 h-5 text-[#7E81A0]" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6">
                            {/* Set PIN */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-[#C7C9DC] mb-2">
                                    Enter PIN
                                </label>
                                <div className="flex justify-center gap-3">
                                    {[0, 1, 2, 3].map((index) => (
                                        <input
                                            key={index}
                                            id={`pin-${index}`}
                                            type={showPin ? 'text' : 'password'}
                                            maxLength={1}
                                            value={pin[index]}
                                            onChange={(e) => handlePinChange(index, e.target.value, 'pin')}
                                            onKeyDown={(e) => handlePinKeyDown(index, e, 'pin')}
                                            className={`w-14 h-14 text-center text-2xl font-bold bg-white/[0.05] border rounded-xl text-[#F7F7FA] focus:outline-none focus:ring-2 focus:ring-[#C9A24B]/50 focus:border-[#C9A24B] transition-all duration-200 ${
                                                pinError ? 'border-red-500 focus:ring-red-500/50' : 'border-white/10'
                                            }`}
                                            autoFocus={index === 0}
                                        />
                                    ))}
                                </div>
                                <div className="flex justify-between mt-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowPin(!showPin)}
                                        className="text-xs text-[#7E81A0] hover:text-[#C9A24B] transition-colors flex items-center gap-1"
                                    >
                                        {showPin ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                                        {showPin ? 'Hide PIN' : 'Show PIN'}
                                    </button>
                                    <span className="text-xs text-[#7E81A0]">4 digits required</span>
                                </div>
                            </div>

                            {/* Confirm PIN */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-[#C7C9DC] mb-2">
                                    Confirm PIN
                                </label>
                                <div className="flex justify-center gap-3">
                                    {[0, 1, 2, 3].map((index) => (
                                        <input
                                            key={index}
                                            id={`confirm-pin-${index}`}
                                            type={showConfirmPin ? 'text' : 'password'}
                                            maxLength={1}
                                            value={confirmPin[index]}
                                            onChange={(e) => handleConfirmPinChange(index, e.target.value)}
                                            onKeyDown={(e) => handleConfirmPinKeyDown(index, e)}
                                            className={`w-14 h-14 text-center text-2xl font-bold bg-white/[0.05] border rounded-xl text-[#F7F7FA] focus:outline-none focus:ring-2 focus:ring-[#C9A24B]/50 focus:border-[#C9A24B] transition-all duration-200 ${
                                                pinError ? 'border-red-500 focus:ring-red-500/50' : 'border-white/10'
                                            }`}
                                        />
                                    ))}
                                </div>
                                <div className="flex justify-between mt-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPin(!showConfirmPin)}
                                        className="text-xs text-[#7E81A0] hover:text-[#C9A24B] transition-colors flex items-center gap-1"
                                    >
                                        {showConfirmPin ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                                        {showConfirmPin ? 'Hide PIN' : 'Show PIN'}
                                    </button>
                                </div>
                            </div>

                            {/* Error Message */}
                            {pinError && (
                                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 mb-4">
                                    <p className="text-xs text-red-500 flex items-center gap-2">
                                        <AlertCircle className="w-4 h-4" />
                                        {pinError}
                                    </p>
                                </div>
                            )}

                            {/* Security Note */}
                            <div className="bg-[#C9A24B]/5 border border-[#C9A24B]/20 rounded-xl p-3 mb-4">
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
                                    onClick={handleCancel}
                                    className="flex-1 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-[#F7F7FA] text-sm font-medium hover:bg-white/[0.1] transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSetPin}
                                    disabled={isSettingPin}
                                    className={`flex-1 py-3 rounded-xl bg-[#C9A24B] text-[#0F1229] text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                                        isSettingPin
                                            ? 'opacity-70 cursor-not-allowed'
                                            : 'hover:bg-[#D4B35C]'
                                    }`}
                                >
                                    {isSettingPin ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#0F1229] border-t-transparent"></div>
                                            Setting...
                                        </>
                                    ) : (
                                        <>
                                            <Check className="w-4 h-4" />
                                            Set PIN
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Animation CSS */}
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out;
                }
            `}</style>
        </div>
    )
}

export default Dashboard