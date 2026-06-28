import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useToastActions } from '../../hooks/useToastActions'
import {
    ArrowUpRight,
    ArrowDownLeft,
    Receipt,
    Clock,
    Calendar,
    ChevronLeft,
    ChevronRight,
    Search,
    Filter,
    X,
    Download,
    TrendingUp,
    TrendingDown,
    Wallet,
    CheckCircle,
    XCircle,
    AlertCircle,
    Eye,
    ChevronDown,
    Smartphone,
    Tv,
    Lightbulb,
    Wifi,
    Send,
    Zap,
    User,
    Mail,
    Phone,
    Copy,
    Check,
    ExternalLink,
    Printer
} from 'lucide-react'

const Transactions = () => {
    const toast = useToastActions()
    const [isLoading, setIsLoading] = useState(true)
    const [transactions, setTransactions] = useState([])
    const [filteredTransactions, setFilteredTransactions] = useState([])

    // Filter states
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [selectedStatus, setSelectedStatus] = useState('all')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [showFilters, setShowFilters] = useState(false)

    // Pagination
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(10)

    // Modal states
    const [selectedTransaction, setSelectedTransaction] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [copied, setCopied] = useState(false)

    // Statistics
    const [stats, setStats] = useState({
        totalTransactions: 0,
        totalSent: 0,
        totalReceived: 0,
        totalBills: 0,
        pendingCount: 0,
        failedCount: 0,
        successfulCount: 0
    })

    // Mock data - replace with API call
    const mockTransactions = [
        { id: 1, type: 'sent', name: 'Chioma Okafor', amount: 25000, date: '2024-01-15 14:30', status: 'completed', category: 'transfer', description: 'Transfer to Chioma', reference: 'TXN-2024-001', fee: 50, balance: 125000 },
        { id: 2, type: 'received', name: 'Emeka Nwosu', amount: 45000, date: '2024-01-14 10:15', status: 'completed', category: 'transfer', description: 'Payment from Emeka', reference: 'TXN-2024-002', fee: 0, balance: 100000 },
        { id: 3, type: 'bill', name: 'Ikeja Electric', amount: 15000, date: '2024-01-13 09:00', status: 'completed', category: 'electricity', description: 'Electricity bill payment', reference: 'BILL-2024-003', fee: 100, balance: 145000 },
        { id: 4, type: 'sent', name: 'Sola Adebayo', amount: 10000, date: '2024-01-12 16:45', status: 'pending', category: 'transfer', description: 'Transfer to Sola', reference: 'TXN-2024-004', fee: 50, balance: 155000 },
        { id: 5, type: 'bill', name: 'MTN Airtime', amount: 5000, date: '2024-01-12 08:20', status: 'completed', category: 'airtime', description: 'Airtime purchase', reference: 'BILL-2024-005', fee: 25, balance: 165000 },
        { id: 6, type: 'bill', name: 'DStv', amount: 16500, date: '2024-01-11 13:30', status: 'completed', category: 'tv', description: 'DStv subscription', reference: 'BILL-2024-006', fee: 100, balance: 170000 },
        { id: 7, type: 'sent', name: 'Tunde Balogun', amount: 30000, date: '2024-01-10 11:00', status: 'failed', category: 'transfer', description: 'Transfer to Tunde', reference: 'TXN-2024-007', fee: 0, balance: 186500 },
        { id: 8, type: 'received', name: 'Glo Data', amount: 2000, date: '2024-01-10 07:45', status: 'completed', category: 'data', description: 'Data purchase', reference: 'BILL-2024-008', fee: 10, balance: 216500 },
        { id: 9, type: 'bill', name: 'Eko Electric', amount: 12000, date: '2024-01-09 15:20', status: 'completed', category: 'electricity', description: 'Electricity bill', reference: 'BILL-2024-009', fee: 100, balance: 218500 },
        { id: 10, type: 'sent', name: 'Funmi Adeleke', amount: 5000, date: '2024-01-09 09:30', status: 'completed', category: 'transfer', description: 'Transfer to Funmi', reference: 'TXN-2024-010', fee: 25, balance: 230500 },
        { id: 11, type: 'received', name: 'Airtel Airtime', amount: 3000, date: '2024-01-08 14:00', status: 'completed', category: 'airtime', description: 'Airtime purchase', reference: 'BILL-2024-011', fee: 15, balance: 235500 },
        { id: 12, type: 'sent', name: 'Oluwafemi Ojo', amount: 15000, date: '2024-01-07 11:30', status: 'pending', category: 'transfer', description: 'Transfer to Oluwafemi', reference: 'TXN-2024-012', fee: 50, balance: 238500 },
    ]

    // Categories for filter
    const categories = [
        { id: 'all', label: 'All', icon: Zap },
        { id: 'transfer', label: 'Transfers', icon: Send },
        { id: 'airtime', label: 'Airtime', icon: Smartphone },
        { id: 'data', label: 'Data', icon: Wifi },
        { id: 'electricity', label: 'Electricity', icon: Lightbulb },
        { id: 'tv', label: 'Cable TV', icon: Tv },
    ]

    const statusOptions = [
        { id: 'all', label: 'All' },
        { id: 'completed', label: 'Successful' },
        { id: 'pending', label: 'Pending' },
        { id: 'failed', label: 'Failed' },
    ]

    useEffect(() => {
        const timer = setTimeout(() => {
            setTransactions(mockTransactions)
            setFilteredTransactions(mockTransactions)
            calculateStats(mockTransactions)
            setIsLoading(false)
        }, 1000)
        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        applyFilters()
    }, [searchTerm, selectedCategory, selectedStatus, startDate, endDate, transactions])

    const calculateStats = (data) => {
        const total = data.length
        const sent = data.filter(t => t.type === 'sent').reduce((sum, t) => sum + t.amount, 0)
        const received = data.filter(t => t.type === 'received').reduce((sum, t) => sum + t.amount, 0)
        const bills = data.filter(t => t.type === 'bill').reduce((sum, t) => sum + t.amount, 0)
        const pending = data.filter(t => t.status === 'pending').length
        const failed = data.filter(t => t.status === 'failed').length
        const successful = data.filter(t => t.status === 'completed').length

        setStats({
            totalTransactions: total,
            totalSent: sent,
            totalReceived: received,
            totalBills: bills,
            pendingCount: pending,
            failedCount: failed,
            successfulCount: successful
        })
    }

    const applyFilters = () => {
        let filtered = [...transactions]

        if (searchTerm) {
            const term = searchTerm.toLowerCase()
            filtered = filtered.filter(t =>
                t.name.toLowerCase().includes(term) ||
                t.description.toLowerCase().includes(term) ||
                t.amount.toString().includes(term) ||
                t.id.toString().includes(term) ||
                t.reference.toLowerCase().includes(term)
            )
        }

        if (selectedCategory !== 'all') {
            filtered = filtered.filter(t => t.category === selectedCategory)
        }

        if (selectedStatus !== 'all') {
            filtered = filtered.filter(t => t.status === selectedStatus)
        }

        if (startDate) {
            filtered = filtered.filter(t => t.date.split(' ')[0] >= startDate)
        }
        if (endDate) {
            filtered = filtered.filter(t => t.date.split(' ')[0] <= endDate)
        }

        setFilteredTransactions(filtered)
        setCurrentPage(1)
    }

    const clearFilters = () => {
        setSearchTerm('')
        setSelectedCategory('all')
        setSelectedStatus('all')
        setStartDate('')
        setEndDate('')
    }

    const openModal = (transaction) => {
        setSelectedTransaction(transaction)
        setIsModalOpen(true)
        document.body.style.overflow = 'hidden'
    }

    const closeModal = () => {
        setIsModalOpen(false)
        document.body.style.overflow = 'unset'
        setTimeout(() => setSelectedTransaction(null), 300)
    }

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        toast.showSuccess('Copied to clipboard! 📋')
        setTimeout(() => setCopied(false), 3000)
    }

    const getTransactionIcon = (type) => {
        switch (type) {
            case 'sent':
                return <ArrowUpRight className="w-5 h-5 text-red-500" />
            case 'received':
                return <ArrowDownLeft className="w-5 h-5 text-green-500" />
            case 'bill':
                return <Receipt className="w-5 h-5 text-blue-500" />
            default:
                return <Clock className="w-5 h-5 text-gray-500" />
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
                return 'bg-green-500/10 text-green-500 border-green-500/20'
            case 'pending':
                return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
            case 'failed':
                return 'bg-red-500/10 text-red-500 border-red-500/20'
            default:
                return 'bg-gray-500/10 text-gray-500 border-gray-500/20'
        }
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed':
                return <CheckCircle className="w-4 h-4" />
            case 'pending':
                return <Clock className="w-4 h-4" />
            case 'failed':
                return <XCircle className="w-4 h-4" />
            default:
                return <AlertCircle className="w-4 h-4" />
        }
    }

    const getCategoryLabel = (category) => {
        const found = categories.find(c => c.id === category)
        return found ? found.label : category
    }

    const getCategoryIcon = (category) => {
        const found = categories.find(c => c.id === category)
        return found ? found.icon : Zap
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-NG', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
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

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem)
    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C9A24B] mx-auto"></div>
                    <p className="text-[#7E81A0] mt-4">Loading transactions...</p>
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
                            Transactions
                        </h1>
                        <p className="text-[#7E81A0] text-sm">View and manage all your transactions</p>
                    </div>
                    <button
                        onClick={() => toast.showInfo('Downloading...')}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 hover:bg-white/[0.1] transition-colors text-sm"
                    >
                        <Download className="w-4 h-4" />
                        Export CSV
                    </button>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
                    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-[#C9A24B]">{stats.totalTransactions}</div>
                        <div className="text-xs text-[#7E81A0]">Total</div>
                    </div>
                    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-green-500">{formatCurrency(stats.totalReceived)}</div>
                        <div className="text-xs text-[#7E81A0] flex items-center justify-center gap-1">
                            <ArrowDownLeft className="w-3 h-3" /> Received
                        </div>
                    </div>
                    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-red-500">{formatCurrency(stats.totalSent)}</div>
                        <div className="text-xs text-[#7E81A0] flex items-center justify-center gap-1">
                            <ArrowUpRight className="w-3 h-3" /> Sent
                        </div>
                    </div>
                    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-blue-500">{formatCurrency(stats.totalBills)}</div>
                        <div className="text-xs text-[#7E81A0] flex items-center justify-center gap-1">
                            <Receipt className="w-3 h-3" /> Bills
                        </div>
                    </div>
                    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-yellow-500">{stats.pendingCount}</div>
                        <div className="text-xs text-[#7E81A0] flex items-center justify-center gap-1">
                            <Clock className="w-3 h-3" /> Pending
                        </div>
                    </div>
                    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-red-500">{stats.failedCount}</div>
                        <div className="text-xs text-[#7E81A0] flex items-center justify-center gap-1">
                            <XCircle className="w-3 h-3" /> Failed
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 mb-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7E81A0]" />
                            <input
                                type="text"
                                placeholder="Search by name, description, amount, reference..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-white/[0.05] border border-white/10 rounded-xl text-[#F7F7FA] placeholder-[#7E81A0] focus:outline-none focus:ring-2 focus:ring-[#C9A24B]/50 focus:border-[#C9A24B] transition-all duration-200 text-sm"
                            />
                        </div>

                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 hover:bg-white/[0.1] transition-colors text-sm whitespace-nowrap"
                        >
                            <Filter className="w-4 h-4" />
                            Filters
                            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                        </button>

                        {(searchTerm || selectedCategory !== 'all' || selectedStatus !== 'all' || startDate || endDate) && (
                            <button
                                onClick={clearFilters}
                                className="flex items-center gap-1 px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-colors text-sm text-red-500"
                            >
                                <X className="w-4 h-4" />
                                Clear
                            </button>
                        )}
                    </div>

                    {showFilters && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 pt-4 border-t border-white/[0.06]">
                            <div>
                                <label className="block text-xs text-[#7E81A0] mb-1.5">Category</label>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-full px-3 py-2 bg-white/[0.05] border border-white/10 rounded-xl text-[#F7F7FA] focus:outline-none focus:ring-2 focus:ring-[#C9A24B]/50 focus:border-[#C9A24B] transition-all duration-200 text-sm"
                                >
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>{cat.label}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs text-[#7E81A0] mb-1.5">Status</label>
                                <select
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                    className="w-full px-3 py-2 bg-white/[0.05] border border-white/10 rounded-xl text-[#F7F7FA] focus:outline-none focus:ring-2 focus:ring-[#C9A24B]/50 focus:border-[#C9A24B] transition-all duration-200 text-sm"
                                >
                                    {statusOptions.map((status) => (
                                        <option key={status.id} value={status.id}>{status.label}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs text-[#7E81A0] mb-1.5">From Date</label>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="w-full px-3 py-2 bg-white/[0.05] border border-white/10 rounded-xl text-[#F7F7FA] focus:outline-none focus:ring-2 focus:ring-[#C9A24B]/50 focus:border-[#C9A24B] transition-all duration-200 text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs text-[#7E81A0] mb-1.5">To Date</label>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="w-full px-3 py-2 bg-white/[0.05] border border-white/10 rounded-xl text-[#F7F7FA] focus:outline-none focus:ring-2 focus:ring-[#C9A24B]/50 focus:border-[#C9A24B] transition-all duration-200 text-sm"
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Results count */}
                <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-[#7E81A0]">
                        Showing {filteredTransactions.length} transactions
                    </p>
                </div>

                {/* Transactions Table */}
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                            <tr className="border-b border-white/[0.06]">
                                <th className="text-left text-xs font-medium text-[#7E81A0] uppercase tracking-wider px-4 py-3">Transaction</th>
                                <th className="text-left text-xs font-medium text-[#7E81A0] uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Category</th>
                                <th className="text-left text-xs font-medium text-[#7E81A0] uppercase tracking-wider px-4 py-3 hidden md:table-cell">Date</th>
                                <th className="text-left text-xs font-medium text-[#7E81A0] uppercase tracking-wider px-4 py-3">Status</th>
                                <th className="text-right text-xs font-medium text-[#7E81A0] uppercase tracking-wider px-4 py-3">Amount</th>
                                <th className="text-right text-xs font-medium text-[#7E81A0] uppercase tracking-wider px-4 py-3">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {currentItems.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-12">
                                        <div className="flex flex-col items-center">
                                            <Receipt className="w-12 h-12 text-[#7E81A0] mb-3" />
                                            <p className="text-[#7E81A0]">No transactions found</p>
                                            <p className="text-sm text-[#7E81A0] mt-1">Try adjusting your filters</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                currentItems.map((transaction) => (
                                    <tr key={transaction.id} className="border-b border-white/[0.06] hover:bg-white/[0.03] transition-colors">
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-xl bg-white/[0.05]">
                                                    {getTransactionIcon(transaction.type)}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium">{transaction.name}</div>
                                                    <div className="text-xs text-[#7E81A0]">{transaction.description}</div>
                                                    <div className="text-xs text-[#7E81A0] sm:hidden mt-1">
                                                        {formatDate(transaction.date)}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 hidden sm:table-cell">
                        <span className="text-xs text-[#7E81A0]">
                          {getCategoryLabel(transaction.category)}
                        </span>
                                        </td>
                                        <td className="px-4 py-3 hidden md:table-cell">
                                            <div className="text-xs text-[#7E81A0]">{formatDate(transaction.date)}</div>
                                        </td>
                                        <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(transaction.status)}`}>
                          {getStatusIcon(transaction.status)}
                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                        </span>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <div className={`text-sm font-semibold ${getTransactionColor(transaction.type)}`}>
                                                {transaction.type === 'sent' ? '-' : transaction.type === 'received' ? '+' : ''}
                                                {formatCurrency(transaction.amount)}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <button
                                                onClick={() => openModal(transaction)}
                                                className="p-2 rounded-lg hover:bg-white/[0.05] transition-colors"
                                            >
                                                <Eye className="w-4 h-4 text-[#7E81A0] hover:text-[#F7F7FA] transition-colors" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {filteredTransactions.length > 0 && (
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-4 border-t border-white/[0.06]">
                            <div className="text-sm text-[#7E81A0]">
                                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredTransactions.length)} of {filteredTransactions.length} transactions
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => paginate(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="p-2 rounded-lg bg-white/[0.05] border border-white/10 hover:bg-white/[0.1] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>

                                <div className="flex items-center gap-1">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                                        <button
                                            key={number}
                                            onClick={() => paginate(number)}
                                            className={`w-8 h-8 rounded-lg text-sm transition-colors ${
                                                currentPage === number
                                                    ? 'bg-[#C9A24B] text-[#0F1229]'
                                                    : 'hover:bg-white/[0.05] text-[#7E81A0] hover:text-[#F7F7FA]'
                                            }`}
                                        >
                                            {number}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={() => paginate(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="p-2 rounded-lg bg-white/[0.05] border border-white/10 hover:bg-white/[0.1] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Transaction Detail Modal */}
            {isModalOpen && selectedTransaction && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
                    onClick={closeModal}
                >
                    <div
                        className="bg-[#0F1229] border border-white/10 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
                            <div className="flex items-center gap-3">
                                <div className="p-3 rounded-xl bg-white/[0.05]">
                                    {getTransactionIcon(selectedTransaction.type)}
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold" style={{ fontFamily: "'Fraunces', serif" }}>
                                        Transaction Details
                                    </h2>
                                    <p className="text-xs text-[#7E81A0]">ID: {selectedTransaction.reference}</p>
                                </div>
                            </div>
                            <button
                                onClick={closeModal}
                                className="p-2 rounded-lg hover:bg-white/[0.05] transition-colors"
                            >
                                <X className="w-5 h-5 text-[#7E81A0]" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6">
                            {/* Amount Section */}
                            <div className="text-center mb-6 pb-6 border-b border-white/[0.06]">
                                <p className="text-sm text-[#7E81A0]">Amount</p>
                                <div className={`text-4xl font-bold mt-1 ${getTransactionColor(selectedTransaction.type)}`}>
                                    {selectedTransaction.type === 'sent' ? '-' : selectedTransaction.type === 'received' ? '+' : ''}
                                    {formatCurrency(selectedTransaction.amount)}
                                </div>
                                <div className="flex items-center justify-center gap-2 mt-2">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedTransaction.status)}`}>
                    {getStatusIcon(selectedTransaction.status)}
                      {selectedTransaction.status.charAt(0).toUpperCase() + selectedTransaction.status.slice(1)}
                  </span>
                                    <span className="text-xs text-[#7E81A0]">
                    {formatDate(selectedTransaction.date)}
                  </span>
                                </div>
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-white/[0.03] rounded-xl p-4 border border-white/10">
                                    <p className="text-xs text-[#7E81A0] mb-1">Transaction Type</p>
                                    <p className="text-sm font-medium capitalize">{selectedTransaction.type}</p>
                                </div>

                                <div className="bg-white/[0.03] rounded-xl p-4 border border-white/10">
                                    <p className="text-xs text-[#7E81A0] mb-1">Category</p>
                                    <p className="text-sm font-medium flex items-center gap-2">
                                        {(() => {
                                            const Icon = getCategoryIcon(selectedTransaction.category)
                                            return <Icon className="w-4 h-4" />
                                        })()}
                                        {getCategoryLabel(selectedTransaction.category)}
                                    </p>
                                </div>

                                <div className="bg-white/[0.03] rounded-xl p-4 border border-white/10 md:col-span-2">
                                    <p className="text-xs text-[#7E81A0] mb-1">Counterparty</p>
                                    <p className="text-sm font-medium">{selectedTransaction.name}</p>
                                    <p className="text-xs text-[#7E81A0] mt-1">{selectedTransaction.description}</p>
                                </div>

                                <div className="bg-white/[0.03] rounded-xl p-4 border border-white/10">
                                    <p className="text-xs text-[#7E81A0] mb-1">Reference</p>
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-mono text-[#C9A24B]">{selectedTransaction.reference}</p>
                                        <button
                                            onClick={() => handleCopy(selectedTransaction.reference)}
                                            className="p-1 rounded hover:bg-white/[0.05] transition-colors"
                                        >
                                            {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3 text-[#7E81A0]" />}
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-white/[0.03] rounded-xl p-4 border border-white/10">
                                    <p className="text-xs text-[#7E81A0] mb-1">Fee</p>
                                    <p className="text-sm font-medium">{formatCurrency(selectedTransaction.fee || 0)}</p>
                                </div>

                                <div className="bg-white/[0.03] rounded-xl p-4 border border-white/10 md:col-span-2">
                                    <p className="text-xs text-[#7E81A0] mb-1">Balance After</p>
                                    <p className="text-sm font-medium">{formatCurrency(selectedTransaction.balance || 0)}</p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-white/[0.06]">
                                <button
                                    onClick={() => {
                                        toast.showInfo('Printing receipt...')
                                    }}
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 hover:bg-white/[0.1] transition-colors text-sm"
                                >
                                    <Printer className="w-4 h-4" />
                                    Print Receipt
                                </button>
                                <button
                                    onClick={() => {
                                        toast.showInfo('Downloading receipt...')
                                    }}
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 hover:bg-white/[0.1] transition-colors text-sm"
                                >
                                    <Download className="w-4 h-4" />
                                    Download PDF
                                </button>
                                <button
                                    onClick={() => {
                                        toast.showInfo('Sharing transaction...')
                                    }}
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 hover:bg-white/[0.1] transition-colors text-sm"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    Share
                                </button>
                                {selectedTransaction.status === 'failed' && (
                                    <button
                                        onClick={() => {
                                            toast.showInfo('Retrying transaction...')
                                        }}
                                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C9A24B] text-[#0F1229] hover:bg-[#D4B35C] transition-colors text-sm font-medium ml-auto"
                                    >
                                        <AlertCircle className="w-4 h-4" />
                                        Retry Payment
                                    </button>
                                )}
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

export default Transactions