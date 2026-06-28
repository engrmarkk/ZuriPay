import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useToastActions } from '../../hooks/useToastActions'
import {
    Wallet,
    Eye,
    EyeOff,
    ArrowUpRight,
    ArrowDownLeft,
    CreditCard,
    Banknote,
    Copy,
    Check,
    ChevronRight,
    Plus,
    Minus,
    Clock,
    Calendar,
    Download,
    RefreshCw,
    Lock,
    Shield,
    AlertCircle,
    Smartphone,
    Tv,
    Lightbulb,
    Wifi,
    Send,
    Receipt,
    TrendingUp,
    TrendingDown,
    Zap
} from 'lucide-react'

const Wallets = () => {
    const toast = useToastActions()
    const [isLoading, setIsLoading] = useState(true)
    const [showBalance, setShowBalance] = useState(true)
    const [balance, setBalance] = useState(245000)
    const [totalSent, setTotalSent] = useState(85000)
    const [totalReceived, setTotalReceived] = useState(330000)
    const [totalBills, setTotalBills] = useState(78000)
    const [copied, setCopied] = useState(false)
    const [activeTab, setActiveTab] = useState('overview')

    // Quick action buttons
    const quickActions = [
        { icon: Send, label: 'Send Money', color: '#6C5CE7', bgColor: 'bg-purple-500/10', borderColor: 'border-purple-500/20', path: '/account/transfer' },
        { icon: ArrowDownLeft, label: 'Receive', color: '#34D399', bgColor: 'bg-green-500/10', borderColor: 'border-green-500/20', path: '/account/receive' },
        { icon: CreditCard, label: 'Fund Wallet', color: '#F59E0B', bgColor: 'bg-yellow-500/10', borderColor: 'border-yellow-500/20', path: '/account/fund' },
        { icon: ArrowUpRight, label: 'Withdraw', color: '#EF4444', bgColor: 'bg-red-500/10', borderColor: 'border-red-500/20', path: '/account/withdraw' },
    ]

    // Recent transactions
    const recentTransactions = [
        { id: 1, type: 'received', name: 'Emeka Nwosu', amount: 45000, date: '2024-01-15 14:30', status: 'completed', description: 'Payment received' },
        { id: 2, type: 'sent', name: 'Chioma Okafor', amount: 25000, date: '2024-01-14 10:15', status: 'completed', description: 'Transfer sent' },
        { id: 3, type: 'bill', name: 'Ikeja Electric', amount: 15000, date: '2024-01-13 09:00', status: 'completed', description: 'Electricity bill' },
        { id: 4, type: 'sent', name: 'Sola Adebayo', amount: 10000, date: '2024-01-12 16:45', status: 'pending', description: 'Transfer sent' },
        { id: 5, type: 'received', name: 'MTN Airtime', amount: 5000, date: '2024-01-12 08:20', status: 'completed', description: 'Airtime purchase' },
    ]

    // Account details
    const accountDetails = {
        accountNumber: '0123456789',
        bankName: 'ZuriPay Wallet',
        accountName: 'John Doe',
        bankCode: '999'
    }

    // Wallet features
    const walletFeatures = [
        { icon: Shield, label: 'Secure', description: 'Bank-grade encryption' },
        { icon: Zap, label: 'Instant', description: 'Real-time transactions' },
        { icon: TrendingUp, label: 'Growth', description: 'Earn interest on savings' },
        { icon: Lock, label: 'Protected', description: 'FDIC insured' },
    ]

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 1000)
        return () => clearTimeout(timer)
    }, [])

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        toast.showSuccess('Copied to clipboard! 📋')
        setTimeout(() => setCopied(false), 3000)
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount)
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

    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C9A24B] mx-auto"></div>
                    <p className="text-[#7E81A0] mt-4">Loading wallet...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#0F1229] text-[#F7F7FA]">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-bold" style={{ fontFamily: "'Fraunces', serif" }}>
                            My Wallet
                        </h1>
                        <p className="text-[#7E81A0] text-sm">Manage your funds and transactions</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => {
                                toast.showInfo('Refreshing wallet...')
                                setIsLoading(true)
                                setTimeout(() => setIsLoading(false), 1000)
                            }}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 hover:bg-white/[0.1] transition-colors text-sm"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Refresh
                        </button>
                    </div>
                </div>

                {/* Balance Card */}
                <div className="relative bg-gradient-to-r from-[#6C5CE7]/20 via-[#C9A24B]/20 to-[#6C5CE7]/20 rounded-3xl p-6 sm:p-8 border border-white/10 mb-8 overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A24B]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#6C5CE7]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                    <div className="relative">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Wallet className="w-5 h-5 text-[#C9A24B]" />
                                    <span className="text-sm text-[#C7C9DC]">Available Balance</span>
                                    <button
                                        onClick={() => setShowBalance(!showBalance)}
                                        className="ml-2 p-1 rounded-lg hover:bg-white/[0.05] transition-colors"
                                    >
                                        {showBalance ? <Eye className="w-4 h-4 text-[#7E81A0]" /> : <EyeOff className="w-4 h-4 text-[#7E81A0]" />}
                                    </button>
                                </div>
                                <div className="text-4xl sm:text-5xl font-bold" style={{ fontFamily: "'Fraunces', serif" }}>
                                    {showBalance ? formatCurrency(balance) : '****'}
                                </div>
                                <div className="text-sm text-[#7E81A0] mt-1">Available for transactions</div>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <button
                                    onClick={() => toast.showInfo('Fund wallet coming soon!')}
                                    className="px-6 py-2.5 rounded-xl bg-[#C9A24B] text-[#0F1229] text-sm font-medium hover:bg-[#D4B35C] transition-colors flex items-center gap-2"
                                >
                                    <Plus className="w-4 h-4" />
                                    Fund Wallet
                                </button>
                                <button
                                    onClick={() => toast.showInfo('Withdraw coming soon!')}
                                    className="px-6 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-[#F7F7FA] text-sm font-medium hover:bg-white/[0.1] transition-colors flex items-center gap-2"
                                >
                                    <Minus className="w-4 h-4" />
                                    Withdraw
                                </button>
                            </div>
                        </div>

                        {/* Account Details */}
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="bg-white/[0.03] rounded-xl p-4 border border-white/10">
                                <div className="text-xs text-[#7E81A0] mb-1">Account Name</div>
                                <div className="text-sm font-medium text-[#F7F7FA]">{accountDetails.accountName}</div>
                            </div>
                            <div className="bg-white/[0.03] rounded-xl p-4 border border-white/10">
                                <div className="text-xs text-[#7E81A0] mb-1">Account Number</div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-[#F7F7FA]">{accountDetails.accountNumber}</span>
                                    <button
                                        onClick={() => handleCopy(accountDetails.accountNumber)}
                                        className="text-[#7E81A0] hover:text-[#C9A24B] transition-colors"
                                    >
                                        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                            <div className="bg-white/[0.03] rounded-xl p-4 border border-white/10">
                                <div className="text-xs text-[#7E81A0] mb-1">Bank</div>
                                <div className="text-sm font-medium text-[#F7F7FA]">{accountDetails.bankName}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
                        <div className="text-xs text-[#7E81A0] flex items-center gap-1">
                            <TrendingDown className="w-3 h-3 text-red-500" />
                            Total Sent
                        </div>
                        <div className="text-lg font-bold text-red-500 mt-1">{formatCurrency(totalSent)}</div>
                    </div>
                    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
                        <div className="text-xs text-[#7E81A0] flex items-center gap-1">
                            <TrendingUp className="w-3 h-3 text-green-500" />
                            Total Received
                        </div>
                        <div className="text-lg font-bold text-green-500 mt-1">{formatCurrency(totalReceived)}</div>
                    </div>
                    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
                        <div className="text-xs text-[#7E81A0] flex items-center gap-1">
                            <Receipt className="w-3 h-3 text-blue-500" />
                            Total Bills
                        </div>
                        <div className="text-lg font-bold text-blue-500 mt-1">{formatCurrency(totalBills)}</div>
                    </div>
                    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
                        <div className="text-xs text-[#7E81A0] flex items-center gap-1">
                            <Banknote className="w-3 h-3 text-[#C9A24B]" />
                            Balance
                        </div>
                        <div className="text-lg font-bold text-[#C9A24B] mt-1">{formatCurrency(balance)}</div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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

                {/* Wallet Features */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-4">Wallet Features</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {walletFeatures.map((feature) => {
                            const Icon = feature.icon
                            return (
                                <div key={feature.label} className="bg-white/[0.03] border border-white/10 rounded-xl p-4 text-center hover:bg-white/[0.06] transition-colors">
                                    <div className="flex justify-center mb-2">
                                        <div className="p-2 rounded-lg bg-[#C9A24B]/10">
                                            <Icon className="w-5 h-5 text-[#C9A24B]" />
                                        </div>
                                    </div>
                                    <h3 className="text-sm font-medium">{feature.label}</h3>
                                    <p className="text-xs text-[#7E81A0] mt-1">{feature.description}</p>
                                </div>
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
                            {recentTransactions.map((transaction) => (
                                <div
                                    key={transaction.id}
                                    className="flex items-center gap-4 p-4 hover:bg-white/[0.03] transition-colors"
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
        </div>
    )
}

export default Wallets