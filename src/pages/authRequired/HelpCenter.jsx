import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useToastActions } from '../../hooks/useToastActions'
import {
    ArrowLeft,
    HelpCircle,
    Ticket,
    Plus,
    Search,
    Filter,
    ChevronDown,
    ChevronUp,
    ChevronLeft,
    ChevronRight,
    Clock,
    CheckCircle,
    AlertCircle,
    XCircle,
    MessageCircle,
    Send,
    Smartphone,
    Wifi,
    Lightbulb,
    Tv,
    Trophy,
    Wallet,
    CreditCard,
    User,
    Mail,
    Phone,
    Calendar,
    FileText,
    Eye,
    X,
    Loader,
    Zap,
    Shield,
    Users,
    RefreshCw
} from 'lucide-react'

const HelpCenter = () => {
    const navigate = useNavigate()
    const toast = useToastActions()
    const [isLoading, setIsLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('tickets') // 'tickets' or 'new'
    const [selectedTicket, setSelectedTicket] = useState(null)
    const [showTicketModal, setShowTicketModal] = useState(false)
    const [isFetchingTransactions, setIsFetchingTransactions] = useState(false)

    // Ticket form state
    const [ticketForm, setTicketForm] = useState({
        category: '',
        subject: '',
        description: '',
        transactionId: ''
    })
    const [formErrors, setFormErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Pagination for tickets
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(5)

    // Filter
    const [filterCategory, setFilterCategory] = useState('all')
    const [searchTerm, setSearchTerm] = useState('')

    // Transactions state
    const [transactions, setTransactions] = useState([])
    const [filteredTransactions, setFilteredTransactions] = useState([])
    const [selectedTransaction, setSelectedTransaction] = useState(null)
    const [transactionPage, setTransactionPage] = useState(1)
    const [transactionItemsPerPage] = useState(5)
    const [showTransactionSelect, setShowTransactionSelect] = useState(false)

    // Mock tickets data
    const [tickets, setTickets] = useState([
        {
            id: 'TKT-2024-001',
            category: 'transfer',
            subject: 'Failed Transfer to Chioma Okafor',
            description: 'I tried to send ₦25,000 to Chioma Okafor but the transaction failed. The money was deducted from my account but not received on her end.',
            status: 'resolved',
            createdAt: '2024-01-15 14:30',
            updatedAt: '2024-01-16 10:00',
            transactionId: 'TXN-2024-001',
            messages: [
                { sender: 'user', message: 'I tried to send ₦25,000 to Chioma Okafor but the transaction failed.', time: '2024-01-15 14:30' },
                { sender: 'support', message: 'We have reviewed your transaction. The funds have been reversed to your wallet. Please check your balance.', time: '2024-01-16 10:00' }
            ]
        },
        {
            id: 'TKT-2024-002',
            category: 'airtime',
            subject: 'Airtime Not Delivered',
            description: 'I purchased ₦5,000 airtime for 08012345678 (MTN) but I haven\'t received it. It\'s been over 30 minutes.',
            status: 'in-progress',
            createdAt: '2024-01-14 09:15',
            updatedAt: '2024-01-14 14:00',
            transactionId: 'TXN-2024-005',
            messages: [
                { sender: 'user', message: 'I purchased ₦5,000 airtime for 08012345678 (MTN) but I haven\'t received it.', time: '2024-01-14 09:15' },
                { sender: 'support', message: 'We are investigating this issue. We will get back to you within 24 hours.', time: '2024-01-14 14:00' }
            ]
        },
        {
            id: 'TKT-2024-003',
            category: 'electricity',
            subject: 'Duplicate Electricity Bill Payment',
            description: 'I paid my Ikeja Electric bill twice by mistake. The first payment went through but I was charged again on the second attempt.',
            status: 'pending',
            createdAt: '2024-01-13 11:00',
            updatedAt: '2024-01-13 11:00',
            transactionId: 'TXN-2024-009',
            messages: [
                { sender: 'user', message: 'I paid my Ikeja Electric bill twice by mistake.', time: '2024-01-13 11:00' }
            ]
        },
        {
            id: 'TKT-2024-004',
            category: 'wallet',
            subject: 'Wallet Funding Issue',
            description: 'I tried to fund my wallet with ₦50,000 but the transaction was declined. My bank shows the money was deducted.',
            status: 'resolved',
            createdAt: '2024-01-12 16:20',
            updatedAt: '2024-01-13 09:00',
            transactionId: 'TXN-2024-012',
            messages: [
                { sender: 'user', message: 'I tried to fund my wallet with ₦50,000 but the transaction was declined.', time: '2024-01-12 16:20' },
                { sender: 'support', message: 'The transaction was declined by your bank. The funds have been reversed. Please try again or use a different payment method.', time: '2024-01-13 09:00' }
            ]
        },
        {
            id: 'TKT-2024-005',
            category: 'data',
            subject: 'Data Bundle Not Activated',
            description: 'I purchased a 5GB data bundle for my phone but it hasn\'t been activated. I need this urgently for work.',
            status: 'in-progress',
            createdAt: '2024-01-11 08:00',
            updatedAt: '2024-01-11 13:30',
            transactionId: 'TXN-2024-015',
            messages: [
                { sender: 'user', message: 'I purchased a 5GB data bundle for my phone but it hasn\'t been activated.', time: '2024-01-11 08:00' },
                { sender: 'support', message: 'We have escalated this to the network provider. We will update you shortly.', time: '2024-01-11 13:30' }
            ]
        },
        {
            id: 'TKT-2024-006',
            category: 'tv',
            subject: 'DStv Subscription Not Renewed',
            description: 'I paid for my DStv Premium subscription but the service was not renewed. My decoder is showing "Subscription Expired".',
            status: 'pending',
            createdAt: '2024-01-10 15:00',
            updatedAt: '2024-01-10 15:00',
            transactionId: 'TXN-2024-018',
            messages: [
                { sender: 'user', message: 'I paid for my DStv Premium subscription but the service was not renewed.', time: '2024-01-10 15:00' }
            ]
        }
    ])

    // Categories for ticket creation
    const categories = [
        { id: 'transfer', label: 'Transfer', icon: Wallet },
        { id: 'airtime', label: 'Airtime', icon: Smartphone },
        { id: 'data', label: 'Data', icon: Wifi },
        { id: 'electricity', label: 'Electricity', icon: Lightbulb },
        { id: 'tv', label: 'Cable TV', icon: Tv },
        { id: 'betting', label: 'Betting', icon: Trophy },
        { id: 'wallet', label: 'Wallet', icon: CreditCard },
        { id: 'other', label: 'Other', icon: HelpCircle }
    ]

    // Mock transactions data
    const mockTransactions = {
        transfer: [
            { id: 'TXN-2024-001', type: 'sent', name: 'Chioma Okafor', amount: 25000, date: '2024-01-15 14:30', status: 'failed', description: 'Transfer to Chioma Okafor' },
            { id: 'TXN-2024-002', type: 'sent', name: 'Emeka Nwosu', amount: 45000, date: '2024-01-14 10:15', status: 'completed', description: 'Transfer to Emeka Nwosu' },
            { id: 'TXN-2024-003', type: 'received', name: 'Tunde Balogun', amount: 10000, date: '2024-01-13 16:45', status: 'completed', description: 'Received from Tunde Balogun' },
            { id: 'TXN-2024-004', type: 'sent', name: 'Funmi Adeleke', amount: 5000, date: '2024-01-12 09:30', status: 'pending', description: 'Transfer to Funmi Adeleke' },
            { id: 'TXN-2024-005', type: 'sent', name: 'Oluwafemi Ojo', amount: 15000, date: '2024-01-11 11:30', status: 'failed', description: 'Transfer to Oluwafemi Ojo' },
            { id: 'TXN-2024-006', type: 'received', name: 'Blessing Eze', amount: 20000, date: '2024-01-10 10:00', status: 'completed', description: 'Received from Blessing Eze' },
            { id: 'TXN-2024-007', type: 'sent', name: 'Chidi Okonkwo', amount: 35000, date: '2024-01-09 09:00', status: 'completed', description: 'Transfer to Chidi Okonkwo' },
            { id: 'TXN-2024-008', type: 'sent', name: 'Sola Adebayo', amount: 8000, date: '2024-01-08 14:20', status: 'failed', description: 'Transfer to Sola Adebayo' },
        ],
        airtime: [
            { id: 'TXN-2024-009', network: 'MTN', phone: '08012345678', amount: 5000, date: '2024-01-14 09:15', status: 'failed', description: 'MTN Airtime Purchase' },
            { id: 'TXN-2024-010', network: 'Glo', phone: '08123456789', amount: 1000, date: '2024-01-13 08:00', status: 'completed', description: 'Glo Airtime Purchase' },
            { id: 'TXN-2024-011', network: 'Airtel', phone: '07034567890', amount: 2000, date: '2024-01-12 10:30', status: 'completed', description: 'Airtel Airtime Purchase' },
            { id: 'TXN-2024-012', network: 'MTN', phone: '09045678901', amount: 5000, date: '2024-01-11 12:00', status: 'pending', description: 'MTN Airtime Purchase' },
            { id: 'TXN-2024-013', network: '9mobile', phone: '08056789012', amount: 3000, date: '2024-01-10 15:45', status: 'completed', description: '9mobile Airtime Purchase' },
        ],
        data: [
            { id: 'TXN-2024-014', network: 'MTN', phone: '08012345678', plan: '5GB', amount: 2000, date: '2024-01-11 08:00', status: 'failed', description: 'MTN 5GB Data Purchase' },
            { id: 'TXN-2024-015', network: 'Glo', phone: '08123456789', plan: '2GB', amount: 800, date: '2024-01-10 14:20', status: 'completed', description: 'Glo 2GB Data Purchase' },
            { id: 'TXN-2024-016', network: 'Airtel', phone: '07034567890', plan: '1GB', amount: 500, date: '2024-01-09 09:00', status: 'completed', description: 'Airtel 1GB Data Purchase' },
            { id: 'TXN-2024-017', network: 'MTN', phone: '09045678901', plan: '10GB', amount: 4000, date: '2024-01-08 16:30', status: 'pending', description: 'MTN 10GB Data Purchase' },
        ],
        electricity: [
            { id: 'TXN-2024-018', disco: 'Ikeja Electric', meter: '1234567890', amount: 15000, date: '2024-01-13 11:00', status: 'completed', description: 'Ikeja Electric Bill Payment' },
            { id: 'TXN-2024-019', disco: 'Eko Electric', meter: '0987654321', amount: 12000, date: '2024-01-12 09:30', status: 'failed', description: 'Eko Electric Bill Payment' },
            { id: 'TXN-2024-020', disco: 'Abuja DISCO', meter: '1122334455', amount: 8000, date: '2024-01-11 14:00', status: 'completed', description: 'Abuja DISCO Bill Payment' },
            { id: 'TXN-2024-021', disco: 'Ikeja Electric', meter: '5566778899', amount: 10000, date: '2024-01-10 10:15', status: 'pending', description: 'Ikeja Electric Bill Payment' },
        ],
        tv: [
            { id: 'TXN-2024-022', provider: 'DStv', smartCard: '1234567890', package: 'Premium', amount: 37000, date: '2024-01-10 15:00', status: 'failed', description: 'DStv Premium Subscription' },
            { id: 'TXN-2024-023', provider: 'GOtv', smartCard: '0987654321', package: 'Supa', amount: 11000, date: '2024-01-09 12:00', status: 'completed', description: 'GOtv Supa Subscription' },
            { id: 'TXN-2024-024', provider: 'Startimes', smartCard: '1122334455', package: 'Nova', amount: 7500, date: '2024-01-08 09:30', status: 'completed', description: 'Startimes Nova Subscription' },
        ],
        betting: [
            { id: 'TXN-2024-025', provider: 'Bet9ja', username: 'johnade', amount: 10000, date: '2024-01-09 12:30', status: 'failed', description: 'Bet9ja Wallet Funding' },
            { id: 'TXN-2024-026', provider: 'SportyBet', username: 'johnade', amount: 5000, date: '2024-01-08 10:00', status: 'completed', description: 'SportyBet Wallet Funding' },
            { id: 'TXN-2024-027', provider: 'BetKing', username: 'johnade', amount: 20000, date: '2024-01-07 14:30', status: 'pending', description: 'BetKing Wallet Funding' },
        ],
        wallet: [
            { id: 'TXN-2024-028', type: 'fund', amount: 50000, method: 'Bank Transfer', date: '2024-01-12 16:20', status: 'failed', description: 'Wallet Funding' },
            { id: 'TXN-2024-029', type: 'fund', amount: 25000, method: 'Debit Card', date: '2024-01-11 11:00', status: 'completed', description: 'Wallet Funding' },
            { id: 'TXN-2024-030', type: 'withdraw', amount: 10000, method: 'Bank Transfer', date: '2024-01-10 08:00', status: 'pending', description: 'Wallet Withdrawal' },
            { id: 'TXN-2024-031', type: 'fund', amount: 15000, method: 'Bank Transfer', date: '2024-01-09 13:30', status: 'completed', description: 'Wallet Funding' },
        ],
        other: [
            { id: 'TXN-2024-032', description: 'General transaction', amount: 1000, date: '2024-01-15 12:00', status: 'completed' },
            { id: 'TXN-2024-033', description: 'Miscellaneous payment', amount: 2500, date: '2024-01-14 09:00', status: 'failed' },
        ]
    }

    const getStatusConfig = (status) => {
        const configs = {
            pending: { label: 'Pending', icon: Clock, color: 'text-yellow-500', bgColor: 'bg-yellow-500/10', borderColor: 'border-yellow-500/20' },
            'in-progress': { label: 'In Progress', icon: Loader, color: 'text-blue-500', bgColor: 'bg-blue-500/10', borderColor: 'border-blue-500/20' },
            resolved: { label: 'Resolved', icon: CheckCircle, color: 'text-green-500', bgColor: 'bg-green-500/10', borderColor: 'border-green-500/20' },
            closed: { label: 'Closed', icon: XCircle, color: 'text-gray-500', bgColor: 'bg-gray-500/10', borderColor: 'border-gray-500/20' }
        }
        return configs[status] || configs.pending
    }

    const getCategoryLabel = (categoryId) => {
        const cat = categories.find(c => c.id === categoryId)
        return cat ? cat.label : categoryId
    }

    const getCategoryIcon = (categoryId) => {
        const cat = categories.find(c => c.id === categoryId)
        return cat ? cat.icon : HelpCircle
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 800)
        return () => clearTimeout(timer)
    }, [])

    // Filter tickets
    const getFilteredTickets = () => {
        let filtered = tickets

        if (filterCategory !== 'all') {
            filtered = filtered.filter(t => t.category === filterCategory)
        }

        if (searchTerm) {
            const term = searchTerm.toLowerCase()
            filtered = filtered.filter(t =>
                t.subject.toLowerCase().includes(term) ||
                t.id.toLowerCase().includes(term) ||
                t.description.toLowerCase().includes(term)
            )
        }

        return filtered
    }

    const filteredTickets = getFilteredTickets()

    // Pagination for tickets
    const totalPages = Math.ceil(filteredTickets.length / itemsPerPage)
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentTickets = filteredTickets.slice(indexOfFirstItem, indexOfLastItem)

    // Pagination for transactions
    const transactionTotalPages = Math.ceil(filteredTransactions.length / transactionItemsPerPage)
    const transactionIndexOfLastItem = transactionPage * transactionItemsPerPage
    const transactionIndexOfFirstItem = transactionIndexOfLastItem - transactionItemsPerPage
    const currentTransactions = filteredTransactions.slice(transactionIndexOfFirstItem, transactionIndexOfLastItem)

    const getPageNumbers = (total, current, setPage) => {
        const pages = []
        const maxVisible = 5
        let start = Math.max(1, current - Math.floor(maxVisible / 2))
        let end = Math.min(total, start + maxVisible - 1)

        if (end - start < maxVisible - 1) {
            start = Math.max(1, end - maxVisible + 1)
        }

        if (start > 1) {
            pages.push(1)
            if (start > 2) pages.push('...')
        }

        for (let i = start; i <= end; i++) {
            pages.push(i)
        }

        if (end < total) {
            if (end < total - 1) pages.push('...')
            pages.push(total)
        }

        return pages
    }

    const handlePageChange = (page) => {
        setCurrentPage(page)
        document.getElementById('ticket-list')?.scrollIntoView({ behavior: 'smooth' })
    }

    const handleTransactionPageChange = (page) => {
        setTransactionPage(page)
    }

    // Handle form change
    const handleFormChange = (e) => {
        const { name, value } = e.target
        setTicketForm(prev => ({ ...prev, [name]: value }))
        if (formErrors[name]) {
            setFormErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    // ✅ Handle category selection - fetch transactions
    const handleCategorySelect = (categoryId) => {
        setTicketForm(prev => ({ ...prev, category: categoryId, transactionId: '' }))
        setSelectedTransaction(null)
        setFormErrors(prev => ({ ...prev, category: '' }))

        // Fetch transactions for this category
        if (categoryId !== 'other' && mockTransactions[categoryId]) {
            setIsFetchingTransactions(true)
            setShowTransactionSelect(true)
            setTransactionPage(1)

            // Simulate API call
            setTimeout(() => {
                setTransactions(mockTransactions[categoryId] || [])
                setFilteredTransactions(mockTransactions[categoryId] || [])
                setIsFetchingTransactions(false)
            }, 500)
        } else if (categoryId === 'other') {
            setShowTransactionSelect(false)
            setTransactions([])
            setFilteredTransactions([])
        }
    }

    // ✅ Handle transaction selection
    const handleTransactionSelect = (transaction) => {
        setSelectedTransaction(transaction)
        setTicketForm(prev => ({ ...prev, transactionId: transaction.id }))
        toast.showInfo(`Transaction ${transaction.id} selected`)
    }

    // Validate form
    const validateForm = () => {
        const errors = {}

        if (!ticketForm.category) {
            errors.category = 'Please select a category'
        }

        if (!ticketForm.subject || ticketForm.subject.length < 5) {
            errors.subject = 'Subject must be at least 5 characters'
        }

        if (!ticketForm.description || ticketForm.description.length < 20) {
            errors.description = 'Description must be at least 20 characters'
        }

        // Only validate transaction if not 'other' category
        if (ticketForm.category !== 'other' && !ticketForm.transactionId) {
            errors.transactionId = 'Please select a transaction'
        }

        setFormErrors(errors)
        return Object.keys(errors).length === 0
    }

    // Handle submit ticket
    const handleSubmitTicket = async () => {
        if (!validateForm()) {
            return
        }

        setIsSubmitting(true)

        try {
            await new Promise(resolve => setTimeout(resolve, 2000))

            const newTicket = {
                id: `TKT-2024-${String(tickets.length + 1).padStart(3, '0')}`,
                category: ticketForm.category,
                subject: ticketForm.subject,
                description: ticketForm.description,
                status: 'pending',
                createdAt: new Date().toLocaleString('en-NG'),
                updatedAt: new Date().toLocaleString('en-NG'),
                transactionId: ticketForm.transactionId || 'N/A',
                messages: [
                    { sender: 'user', message: ticketForm.description, time: new Date().toLocaleString('en-NG') }
                ]
            }

            setTickets(prev => [newTicket, ...prev])
            setTicketForm({
                category: '',
                subject: '',
                description: '',
                transactionId: ''
            })
            setSelectedTransaction(null)
            setShowTransactionSelect(false)
            setTransactions([])
            setFilteredTransactions([])
            setActiveTab('tickets')
            setFilterCategory('all')
            setSearchTerm('')
            toast.showSuccess('Ticket created successfully! 🎫')

        } catch (error) {
            toast.showError('Failed to create ticket. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    // View ticket details
    const handleViewTicket = (ticket) => {
        setSelectedTicket(ticket)
        setShowTicketModal(true)
    }

    // Format date
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

    // Format currency
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
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C9A24B] mx-auto"></div>
                    <p className="text-[#7E81A0] mt-4">Loading help center...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#0F1229] text-[#F7F7FA]">
            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate('/account/dashboard')}
                            className="p-2 rounded-xl hover:bg-white/[0.05] transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 text-[#7E81A0]" />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold" style={{ fontFamily: "'Fraunces', serif" }}>
                                Help Center
                            </h1>
                            <p className="text-xs text-[#7E81A0]">
                                Get support for your issues
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            setActiveTab('new')
                            setTicketForm({
                                category: '',
                                subject: '',
                                description: '',
                                transactionId: ''
                            })
                            setSelectedTransaction(null)
                            setShowTransactionSelect(false)
                            setTransactions([])
                            setFilteredTransactions([])
                            setFormErrors({})
                        }}
                        className="px-4 py-2.5 rounded-xl bg-[#C9A24B] text-[#0F1229] text-sm font-medium hover:bg-[#D4B35C] transition-colors flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        New Ticket
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-[#C9A24B]">{tickets.length}</div>
                        <div className="text-xs text-[#7E81A0]">Total</div>
                    </div>
                    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-yellow-500">{tickets.filter(t => t.status === 'pending').length}</div>
                        <div className="text-xs text-[#7E81A0]">Pending</div>
                    </div>
                    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-blue-500">{tickets.filter(t => t.status === 'in-progress').length}</div>
                        <div className="text-xs text-[#7E81A0]">In Progress</div>
                    </div>
                    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-green-500">{tickets.filter(t => t.status === 'resolved' || t.status === 'closed').length}</div>
                        <div className="text-xs text-[#7E81A0]">Resolved</div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6 border-b border-white/[0.06]">
                    <button
                        onClick={() => setActiveTab('tickets')}
                        className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 ${
                            activeTab === 'tickets'
                                ? 'border-[#C9A24B] text-[#F7F7FA]'
                                : 'border-transparent text-[#7E81A0] hover:text-[#F7F7FA]'
                        }`}
                    >
                        <Ticket className="w-4 h-4 inline mr-2" />
                        My Tickets
                    </button>
                    <button
                        onClick={() => setActiveTab('new')}
                        className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 ${
                            activeTab === 'new'
                                ? 'border-[#C9A24B] text-[#F7F7FA]'
                                : 'border-transparent text-[#7E81A0] hover:text-[#F7F7FA]'
                        }`}
                    >
                        <Plus className="w-4 h-4 inline mr-2" />
                        New Ticket
                    </button>
                </div>

                {/* Tickets List */}
                {activeTab === 'tickets' && (
                    <>
                        {/* Filters */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-6">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7E81A0]" />
                                <input
                                    type="text"
                                    placeholder="Search tickets..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-white/[0.05] border border-white/10 rounded-xl text-[#F7F7FA] placeholder-[#7E81A0] focus:outline-none focus:ring-2 focus:ring-[#C9A24B]/50 focus:border-[#C9A24B] transition-all duration-200 text-sm"
                                />
                            </div>
                            <select
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                className="px-4 py-2.5 bg-white/[0.05] border border-white/10 rounded-xl text-[#F7F7FA] focus:outline-none focus:ring-2 focus:ring-[#C9A24B]/50 focus:border-[#C9A24B] transition-all duration-200 text-sm"
                            >
                                <option value="all">All Categories</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                                ))}
                            </select>
                        </div>

                        {/* Ticket List */}
                        <div id="ticket-list" className="space-y-3">
                            {currentTickets.length === 0 ? (
                                <div className="text-center py-16 bg-white/[0.03] border border-white/10 rounded-2xl">
                                    <Ticket className="w-16 h-16 text-[#7E81A0] mx-auto mb-4" />
                                    <h3 className="text-xl font-medium">No tickets found</h3>
                                    <p className="text-sm text-[#7E81A0] mt-2">
                                        {searchTerm || filterCategory !== 'all'
                                            ? 'Try adjusting your filters'
                                            : 'Create your first support ticket'}
                                    </p>
                                </div>
                            ) : (
                                currentTickets.map((ticket) => {
                                    const statusConfig = getStatusConfig(ticket.status)
                                    const StatusIcon = statusConfig.icon
                                    const CategoryIcon = getCategoryIcon(ticket.category)

                                    return (
                                        <div
                                            key={ticket.id}
                                            className="bg-white/[0.03] border border-white/10 rounded-xl p-4 hover:bg-white/[0.06] transition-all duration-200 cursor-pointer"
                                            onClick={() => handleViewTicket(ticket)}
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <CategoryIcon className="w-4 h-4 text-[#C9A24B]" />
                                                        <span className="text-xs font-medium text-[#C9A24B]">
                                                            {getCategoryLabel(ticket.category)}
                                                        </span>
                                                        <span className="text-xs text-[#7E81A0]">•</span>
                                                        <span className="text-xs text-[#7E81A0]">{ticket.id}</span>
                                                    </div>
                                                    <h4 className="text-sm font-medium mt-1">{ticket.subject}</h4>
                                                    <p className="text-xs text-[#7E81A0] mt-1 line-clamp-2">{ticket.description}</p>
                                                    <div className="flex items-center gap-3 mt-2">
                                                        <span className="text-xs text-[#7E81A0] flex items-center gap-1">
                                                            <Clock className="w-3 h-3" />
                                                            {formatDate(ticket.createdAt)}
                                                        </span>
                                                        {ticket.transactionId && ticket.transactionId !== 'N/A' && (
                                                            <span className="text-xs text-[#7E81A0]">
                                                                TXN: {ticket.transactionId}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                                                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${statusConfig.color} ${statusConfig.bgColor} ${statusConfig.borderColor}`}>
                                                        <StatusIcon className="w-3 h-3" />
                                                        {statusConfig.label}
                                                    </span>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            handleViewTicket(ticket)
                                                        }}
                                                        className="text-xs text-[#7E81A0] hover:text-[#C9A24B] transition-colors flex items-center gap-1"
                                                    >
                                                        <Eye className="w-3 h-3" />
                                                        View
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            )}
                        </div>

                        {/* Pagination for Tickets */}
                        {filteredTickets.length > 0 && totalPages > 1 && (
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-white/[0.06]">
                                <div className="text-sm text-[#7E81A0]">
                                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredTickets.length)} of {filteredTickets.length}
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="p-2 rounded-lg bg-white/[0.05] border border-white/10 hover:bg-white/[0.1] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>
                                    <div className="flex items-center gap-1">
                                        {getPageNumbers(totalPages, currentPage, setCurrentPage).map((page, index) => (
                                            page === '...' ? (
                                                <span key={`ellipsis-${index}`} className="px-2 text-[#7E81A0]">...</span>
                                            ) : (
                                                <button
                                                    key={page}
                                                    onClick={() => handlePageChange(page)}
                                                    className={`w-8 h-8 rounded-lg text-sm transition-colors ${
                                                        currentPage === page
                                                            ? 'bg-[#C9A24B] text-[#0F1229]'
                                                            : 'hover:bg-white/[0.05] text-[#7E81A0] hover:text-[#F7F7FA]'
                                                    }`}
                                                >
                                                    {page}
                                                </button>
                                            )
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="p-2 rounded-lg bg-white/[0.05] border border-white/10 hover:bg-white/[0.1] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}

                {/* New Ticket Form */}
                {activeTab === 'new' && (
                    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                        <h2 className="text-xl font-bold mb-6" style={{ fontFamily: "'Fraunces', serif" }}>
                            Create New Ticket
                        </h2>

                        <form onSubmit={(e) => { e.preventDefault(); handleSubmitTicket() }} className="space-y-5">
                            {/* Category Selection */}
                            <div>
                                <label className="block text-sm font-medium text-[#C7C9DC] mb-2">
                                    Category <span className="text-red-500">*</span>
                                </label>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {categories.map((cat) => {
                                        const Icon = cat.icon
                                        const isSelected = ticketForm.category === cat.id
                                        return (
                                            <button
                                                key={cat.id}
                                                type="button"
                                                onClick={() => handleCategorySelect(cat.id)}
                                                className={`p-3 rounded-xl border transition-all duration-200 text-center ${
                                                    isSelected
                                                        ? 'bg-[#C9A24B]/10 border-[#C9A24B] text-[#C9A24B]'
                                                        : 'bg-white/[0.03] border-white/10 text-[#7E81A0] hover:text-[#F7F7FA] hover:bg-white/[0.06]'
                                                }`}
                                            >
                                                <Icon className="w-5 h-5 mx-auto mb-1" />
                                                <span className="text-xs font-medium">{cat.label}</span>
                                            </button>
                                        )
                                    })}
                                </div>
                                {formErrors.category && (
                                    <p className="mt-1.5 text-xs text-red-500">{formErrors.category}</p>
                                )}
                            </div>

                            {/* Transaction Selection - Show when category is selected */}
                            {showTransactionSelect && (
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="block text-sm font-medium text-[#C7C9DC]">
                                            Select Transaction <span className="text-red-500">*</span>
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsFetchingTransactions(true)
                                                setTimeout(() => {
                                                    setFilteredTransactions(transactions)
                                                    setIsFetchingTransactions(false)
                                                }, 500)
                                            }}
                                            className="text-xs text-[#C9A24B] hover:text-[#D4B35C] transition-colors flex items-center gap-1"
                                        >
                                            <RefreshCw className="w-3 h-3" />
                                            Refresh
                                        </button>
                                    </div>

                                    {isFetchingTransactions ? (
                                        <div className="flex items-center justify-center py-8">
                                            <Loader className="w-6 h-6 animate-spin text-[#C9A24B]" />
                                            <span className="text-sm text-[#7E81A0] ml-2">Loading transactions...</span>
                                        </div>
                                    ) : filteredTransactions.length === 0 ? (
                                        <div className="text-center py-8 bg-white/[0.03] border border-white/10 rounded-xl">
                                            <p className="text-sm text-[#7E81A0]">No transactions found for this category</p>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="max-h-60 overflow-y-auto space-y-2 custom-scrollbar">
                                                {currentTransactions.map((transaction) => {
                                                    const isSelected = selectedTransaction?.id === transaction.id
                                                    return (
                                                        <button
                                                            key={transaction.id}
                                                            type="button"
                                                            onClick={() => handleTransactionSelect(transaction)}
                                                            className={`w-full p-3 rounded-xl border transition-all duration-200 text-left ${
                                                                isSelected
                                                                    ? 'bg-[#C9A24B]/10 border-[#C9A24B]'
                                                                    : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06]'
                                                            }`}
                                                        >
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex-1 min-w-0">
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="text-sm font-medium">{transaction.id}</span>
                                                                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                                                                            transaction.status === 'completed' ? 'bg-green-500/10 text-green-500' :
                                                                                transaction.status === 'failed' ? 'bg-red-500/10 text-red-500' :
                                                                                    'bg-yellow-500/10 text-yellow-500'
                                                                        }`}>
                                                                            {transaction.status}
                                                                        </span>
                                                                    </div>
                                                                    <p className="text-xs text-[#7E81A0] mt-0.5 truncate">
                                                                        {transaction.description || transaction.name || transaction.provider || transaction.disco || ''}
                                                                    </p>
                                                                    <div className="flex items-center gap-3 mt-1">
                                                                        <span className="text-xs text-[#C9A24B]">{formatCurrency(transaction.amount)}</span>
                                                                        <span className="text-xs text-[#7E81A0]">{formatDate(transaction.date)}</span>
                                                                    </div>
                                                                </div>
                                                                {isSelected && (
                                                                    <CheckCircle className="w-5 h-5 text-[#C9A24B] flex-shrink-0 ml-2" />
                                                                )}
                                                            </div>
                                                        </button>
                                                    )
                                                })}
                                            </div>
                                            {/* Transaction Pagination */}
                                            {filteredTransactions.length > transactionItemsPerPage && (
                                                <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/[0.06]">
                                                    <div className="text-xs text-[#7E81A0]">
                                                        Showing {transactionIndexOfFirstItem + 1} to {Math.min(transactionIndexOfLastItem, filteredTransactions.length)} of {filteredTransactions.length}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleTransactionPageChange(transactionPage - 1)}
                                                            disabled={transactionPage === 1}
                                                            className="p-1 rounded hover:bg-white/[0.05] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                        >
                                                            <ChevronLeft className="w-4 h-4" />
                                                        </button>
                                                        {getPageNumbers(transactionTotalPages, transactionPage, setTransactionPage).map((page, index) => (
                                                            page === '...' ? (
                                                                <span key={`tx-ellipsis-${index}`} className="px-1 text-xs text-[#7E81A0]">...</span>
                                                            ) : (
                                                                <button
                                                                    key={page}
                                                                    type="button"
                                                                    onClick={() => handleTransactionPageChange(page)}
                                                                    className={`w-6 h-6 rounded text-xs transition-colors ${
                                                                        transactionPage === page
                                                                            ? 'bg-[#C9A24B] text-[#0F1229]'
                                                                            : 'hover:bg-white/[0.05] text-[#7E81A0] hover:text-[#F7F7FA]'
                                                                    }`}
                                                                >
                                                                    {page}
                                                                </button>
                                                            )
                                                        ))}
                                                        <button
                                                            type="button"
                                                            onClick={() => handleTransactionPageChange(transactionPage + 1)}
                                                            disabled={transactionPage === transactionTotalPages}
                                                            className="p-1 rounded hover:bg-white/[0.05] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                        >
                                                            <ChevronRight className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )}
                                    {formErrors.transactionId && (
                                        <p className="mt-1.5 text-xs text-red-500">{formErrors.transactionId}</p>
                                    )}
                                </div>
                            )}

                            {/* Subject */}
                            <div>
                                <label className="block text-sm font-medium text-[#C7C9DC] mb-1.5">
                                    Subject <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={ticketForm.subject}
                                    onChange={handleFormChange}
                                    placeholder="Brief summary of your issue"
                                    className={`w-full px-4 py-3 bg-white/[0.05] border rounded-xl text-[#F7F7FA] placeholder-[#7E81A0] focus:outline-none focus:ring-2 transition-all duration-200 text-sm ${
                                        formErrors.subject
                                            ? 'border-red-500 focus:ring-red-500/50'
                                            : 'border-white/10 focus:ring-[#C9A24B]/50 focus:border-[#C9A24B]'
                                    }`}
                                />
                                {formErrors.subject && (
                                    <p className="mt-1.5 text-xs text-red-500">{formErrors.subject}</p>
                                )}
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-[#C7C9DC] mb-1.5">
                                    Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="description"
                                    rows="5"
                                    value={ticketForm.description}
                                    onChange={handleFormChange}
                                    placeholder="Please describe your issue in detail. Include any relevant information that can help us resolve your issue faster."
                                    className={`w-full px-4 py-3 bg-white/[0.05] border rounded-xl text-[#F7F7FA] placeholder-[#7E81A0] focus:outline-none focus:ring-2 transition-all duration-200 text-sm resize-none ${
                                        formErrors.description
                                            ? 'border-red-500 focus:ring-red-500/50'
                                            : 'border-white/10 focus:ring-[#C9A24B]/50 focus:border-[#C9A24B]'
                                    }`}
                                />
                                {formErrors.description && (
                                    <p className="mt-1.5 text-xs text-red-500">{formErrors.description}</p>
                                )}
                                <p className="text-xs text-[#7E81A0] mt-1.5">
                                    Minimum 20 characters. Include details like error messages, steps to reproduce, etc.
                                </p>
                            </div>

                            {/* Selected Transaction Display */}
                            {selectedTransaction && (
                                <div className="bg-[#C9A24B]/10 border border-[#C9A24B]/20 rounded-xl p-3 flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-[#7E81A0]">Selected Transaction</p>
                                        <p className="text-sm font-medium">{selectedTransaction.id}</p>
                                        <p className="text-xs text-[#7E81A0]">{formatCurrency(selectedTransaction.amount)} • {formatDate(selectedTransaction.date)}</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSelectedTransaction(null)
                                            setTicketForm(prev => ({ ...prev, transactionId: '' }))
                                        }}
                                        className="text-xs text-red-500 hover:text-red-400 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            )}

                            {/* Submit Buttons */}
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setActiveTab('tickets')
                                        setTicketForm({
                                            category: '',
                                            subject: '',
                                            description: '',
                                            transactionId: ''
                                        })
                                        setSelectedTransaction(null)
                                        setShowTransactionSelect(false)
                                        setTransactions([])
                                        setFilteredTransactions([])
                                        setFormErrors({})
                                    }}
                                    className="flex-1 py-3.5 rounded-xl bg-white/[0.05] border border-white/10 text-[#F7F7FA] font-medium text-sm hover:bg-white/[0.1] transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`flex-1 py-3.5 rounded-xl bg-[#C9A24B] text-[#0F1229] font-medium text-sm transition-colors flex items-center justify-center gap-2 ${
                                        isSubmitting
                                            ? 'opacity-70 cursor-not-allowed'
                                            : 'hover:bg-[#D4B35C]'
                                    }`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader className="w-4 h-4 animate-spin" />
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4" />
                                            Submit Ticket
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>

            {/* Ticket Detail Modal */}
            {showTicketModal && selectedTicket && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
                    onClick={() => setShowTicketModal(false)}
                >
                    <div
                        className="bg-[#0F1229] border border-white/10 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-[#C9A24B]/10">
                                    <Ticket className="w-5 h-5 text-[#C9A24B]" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold" style={{ fontFamily: "'Fraunces', serif" }}>
                                        Ticket Details
                                    </h2>
                                    <p className="text-xs text-[#7E81A0]">{selectedTicket.id}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowTicketModal(false)}
                                className="p-2 rounded-lg hover:bg-white/[0.05] transition-colors"
                            >
                                <X className="w-5 h-5 text-[#7E81A0]" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 space-y-4">
                            {/* Status & Category */}
                            <div className="flex flex-wrap items-center gap-3">
                                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusConfig(selectedTicket.status).color} ${getStatusConfig(selectedTicket.status).bgColor} ${getStatusConfig(selectedTicket.status).borderColor}`}>
                                    {(() => {
                                        const Icon = getStatusConfig(selectedTicket.status).icon
                                        return <Icon className="w-3 h-3" />
                                    })()}
                                    {getStatusConfig(selectedTicket.status).label}
                                </span>
                                <span className="text-xs text-[#7E81A0]">•</span>
                                <span className="text-xs font-medium text-[#C9A24B]">
                                    {getCategoryLabel(selectedTicket.category)}
                                </span>
                                {selectedTicket.transactionId && selectedTicket.transactionId !== 'N/A' && (
                                    <>
                                        <span className="text-xs text-[#7E81A0]">•</span>
                                        <span className="text-xs text-[#7E81A0]">TXN: {selectedTicket.transactionId}</span>
                                    </>
                                )}
                            </div>

                            {/* Subject */}
                            <h3 className="text-lg font-semibold">{selectedTicket.subject}</h3>

                            {/* Messages */}
                            <div className="space-y-3 max-h-60 overflow-y-auto">
                                {selectedTicket.messages.map((msg, index) => (
                                    <div
                                        key={index}
                                        className={`p-4 rounded-xl ${msg.sender === 'support' ? 'bg-[#C9A24B]/10 border border-[#C9A24B]/20 ml-8' : 'bg-white/[0.03] border border-white/10 mr-8'}`}
                                    >
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`text-xs font-medium ${msg.sender === 'support' ? 'text-[#C9A24B]' : 'text-[#7E81A0]'}`}>
                                                {msg.sender === 'support' ? 'Support Team' : 'You'}
                                            </span>
                                            <span className="text-xs text-[#7E81A0]">•</span>
                                            <span className="text-xs text-[#7E81A0]">{formatDate(msg.time)}</span>
                                        </div>
                                        <p className="text-sm text-[#C7C9DC]">{msg.message}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Reply */}
                            <div className="border-t border-white/[0.06] pt-4">
                                <div className="flex gap-3">
                                    <input
                                        type="text"
                                        placeholder="Add a reply..."
                                        className="flex-1 px-4 py-2.5 bg-white/[0.05] border border-white/10 rounded-xl text-[#F7F7FA] placeholder-[#7E81A0] focus:outline-none focus:ring-2 focus:ring-[#C9A24B]/50 focus:border-[#C9A24B] transition-all duration-200 text-sm"
                                    />
                                    <button
                                        onClick={() => toast.showInfo('Reply sent!')}
                                        className="px-4 py-2.5 rounded-xl bg-[#C9A24B] text-[#0F1229] text-sm font-medium hover:bg-[#D4B35C] transition-colors"
                                    >
                                        <Send className="w-4 h-4" />
                                    </button>
                                </div>
                                <p className="text-xs text-[#7E81A0] mt-2">Support team will respond within 24 hours</p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 border-t border-white/[0.06] pt-4">
                                <button
                                    onClick={() => setShowTicketModal(false)}
                                    className="flex-1 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-[#F7F7FA] text-sm font-medium hover:bg-white/[0.1] transition-colors"
                                >
                                    Close
                                </button>
                                {selectedTicket.status === 'pending' && (
                                    <button
                                        onClick={() => {
                                            toast.showInfo('Ticket escalated!')
                                            setShowTicketModal(false)
                                        }}
                                        className="flex-1 py-2.5 rounded-xl bg-[#C9A24B] text-[#0F1229] text-sm font-medium hover:bg-[#D4B35C] transition-colors"
                                    >
                                        Escalate
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Animations CSS */}
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out;
                }
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
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

export default HelpCenter