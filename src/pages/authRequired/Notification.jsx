import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useToastActions } from '../../hooks/useToastActions'
import {
    ArrowLeft,
    Bell,
    CheckCircle,
    AlertCircle,
    Clock,
    XCircle,
    Send,
    Wallet,
    Smartphone,
    Lightbulb,
    Tv,
    Wifi,
    Trophy,
    CreditCard,
    Users,
    Calendar,
    ChevronRight,
    Check,
    X,
    Filter,
    Zap,
    Gift,
    Shield,
    Info,
    MessageCircle,
    Settings,
    Trash2,
    Download,
    Eye,
    EyeOff,
    ChevronLeft,
    ChevronRight as ChevronRightIcon
} from 'lucide-react'

const Notifications = () => {
    const navigate = useNavigate()
    const toast = useToastActions()
    const [isLoading, setIsLoading] = useState(true)
    const [filter, setFilter] = useState('all')
    const [selectedNotifications, setSelectedNotifications] = useState([])
    const [selectAll, setSelectAll] = useState(false)

    // Pagination
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(5)

    // Mock notifications data
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: 'success',
            icon: CheckCircle,
            iconColor: 'text-green-500',
            bgColor: 'bg-green-500/10',
            title: 'Transfer Successful',
            message: '₦25,000 sent to Chioma Okafor',
            time: '2 minutes ago',
            date: '2024-01-15 14:30',
            read: false,
            category: 'transaction',
        },
        {
            id: 2,
            type: 'info',
            icon: Bell,
            iconColor: 'text-blue-500',
            bgColor: 'bg-blue-500/10',
            title: 'Airtime Purchased',
            message: '₦5,000 airtime bought for 08012345678 (MTN)',
            time: '15 minutes ago',
            date: '2024-01-15 13:45',
            read: false,
            category: 'bill',
        },
        {
            id: 3,
            type: 'success',
            icon: Wallet,
            iconColor: 'text-green-500',
            bgColor: 'bg-green-500/10',
            title: 'Wallet Funded',
            message: '₦50,000 added to your wallet',
            time: '1 hour ago',
            date: '2024-01-15 12:30',
            read: true,
            category: 'wallet',
        },
        {
            id: 4,
            type: 'warning',
            icon: AlertCircle,
            iconColor: 'text-yellow-500',
            bgColor: 'bg-yellow-500/10',
            title: 'Low Balance Alert',
            message: 'Your wallet balance is below ₦10,000',
            time: '2 hours ago',
            date: '2024-01-15 11:00',
            read: true,
            category: 'alert',
        },
        {
            id: 5,
            type: 'error',
            icon: XCircle,
            iconColor: 'text-red-500',
            bgColor: 'bg-red-500/10',
            title: 'Transaction Failed',
            message: 'Transfer to Tunde Balogun failed. Please try again.',
            time: '3 hours ago',
            date: '2024-01-15 10:15',
            read: true,
            category: 'transaction',
        },
        {
            id: 6,
            type: 'info',
            icon: Lightbulb,
            iconColor: 'text-amber-500',
            bgColor: 'bg-amber-500/10',
            title: 'Electricity Bill Paid',
            message: '₦15,000 paid to Ikeja Electric',
            time: '5 hours ago',
            date: '2024-01-15 08:30',
            read: true,
            category: 'bill',
        },
        {
            id: 7,
            type: 'success',
            icon: Smartphone,
            iconColor: 'text-purple-500',
            bgColor: 'bg-purple-500/10',
            title: 'Data Purchased',
            message: '5GB data bundle purchased for 08012345678',
            time: '1 day ago',
            date: '2024-01-14 16:20',
            read: true,
            category: 'bill',
        },
        {
            id: 8,
            type: 'info',
            icon: Gift,
            iconColor: 'text-pink-500',
            bgColor: 'bg-pink-500/10',
            title: 'Referral Bonus',
            message: 'You earned ₦500 from referring Emeka Nwosu',
            time: '2 days ago',
            date: '2024-01-13 09:00',
            read: true,
            category: 'reward',
        },
        {
            id: 9,
            type: 'warning',
            icon: Shield,
            iconColor: 'text-blue-500',
            bgColor: 'bg-blue-500/10',
            title: 'Security Alert',
            message: 'New login detected from Chrome on Lagos, Nigeria',
            time: '3 days ago',
            date: '2024-01-12 22:45',
            read: true,
            category: 'security',
        },
        {
            id: 10,
            type: 'success',
            icon: Tv,
            iconColor: 'text-red-500',
            bgColor: 'bg-red-500/10',
            title: 'Cable TV Renewed',
            message: 'DStv Premium subscription renewed for 30 days',
            time: '4 days ago',
            date: '2024-01-11 14:30',
            read: true,
            category: 'bill',
        },
        {
            id: 11,
            type: 'info',
            icon: Trophy,
            iconColor: 'text-yellow-500',
            bgColor: 'bg-yellow-500/10',
            title: 'Betting Account Funded',
            message: '₦10,000 added to your Bet9ja wallet',
            time: '5 days ago',
            date: '2024-01-10 10:00',
            read: true,
            category: 'betting',
        },
        {
            id: 12,
            type: 'success',
            icon: CreditCard,
            iconColor: 'text-green-500',
            bgColor: 'bg-green-500/10',
            title: 'Card Added',
            message: 'New debit card added to your account',
            time: '1 week ago',
            date: '2024-01-08 15:00',
            read: true,
            category: 'wallet',
        },
        {
            id: 13,
            type: 'info',
            icon: MessageCircle,
            iconColor: 'text-teal-500',
            bgColor: 'bg-teal-500/10',
            title: 'Support Ticket',
            message: 'Your support ticket #1234 has been resolved',
            time: '1 week ago',
            date: '2024-01-07 11:00',
            read: true,
            category: 'alert',
        },
        {
            id: 14,
            type: 'success',
            icon: Users,
            iconColor: 'text-indigo-500',
            bgColor: 'bg-indigo-500/10',
            title: 'Welcome Bonus',
            message: 'You received ₦1,000 welcome bonus!',
            time: '2 weeks ago',
            date: '2024-01-01 00:00',
            read: true,
            category: 'reward',
        }
    ])

    const filters = [
        { id: 'all', label: 'All', count: notifications.length },
        { id: 'unread', label: 'Unread', count: notifications.filter(n => !n.read).length },
        { id: 'transaction', label: 'Transactions', count: notifications.filter(n => n.category === 'transaction').length },
        { id: 'bill', label: 'Bills', count: notifications.filter(n => n.category === 'bill').length },
        { id: 'wallet', label: 'Wallet', count: notifications.filter(n => n.category === 'wallet').length },
        { id: 'alert', label: 'Alerts', count: notifications.filter(n => n.category === 'alert').length }
    ]

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 800)
        return () => clearTimeout(timer)
    }, [])

    // Reset to page 1 when filter changes
    useEffect(() => {
        setCurrentPage(1)
    }, [filter])

    const getFilteredNotifications = () => {
        if (filter === 'all') return notifications
        if (filter === 'unread') return notifications.filter(n => !n.read)
        return notifications.filter(n => n.category === filter)
    }

    const filteredNotifications = getFilteredNotifications()

    // Pagination logic
    const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage)
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = filteredNotifications.slice(indexOfFirstItem, indexOfLastItem)

    const handlePageChange = (page) => {
        setCurrentPage(page)
        // Scroll to top of list
        document.getElementById('notifications-list')?.scrollIntoView({ behavior: 'smooth' })
    }

    const getPageNumbers = () => {
        const pages = []
        const maxVisible = 5
        let start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
        let end = Math.min(totalPages, start + maxVisible - 1)

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

        if (end < totalPages) {
            if (end < totalPages - 1) pages.push('...')
            pages.push(totalPages)
        }

        return pages
    }

    const handleMarkAsRead = (id) => {
        setNotifications(prev =>
            prev.map(n =>
                n.id === id ? { ...n, read: true } : n
            )
        )
        toast.showInfo('Marked as read')
    }

    const handleMarkAllAsRead = () => {
        setNotifications(prev =>
            prev.map(n => ({ ...n, read: true }))
        )
        toast.showSuccess('All notifications marked as read! ✅')
    }

    const handleDelete = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id))
        toast.showInfo('Notification deleted')
    }

    const handleDeleteSelected = () => {
        if (selectedNotifications.length === 0) {
            toast.showWarning('No notifications selected')
            return
        }
        setNotifications(prev => prev.filter(n => !selectedNotifications.includes(n.id)))
        setSelectedNotifications([])
        setSelectAll(false)
        toast.showSuccess(`${selectedNotifications.length} notifications deleted`)
    }

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedNotifications([])
        } else {
            setSelectedNotifications(currentItems.map(n => n.id))
        }
        setSelectAll(!selectAll)
    }

    const handleSelect = (id) => {
        if (selectedNotifications.includes(id)) {
            setSelectedNotifications(prev => prev.filter(n => n.id !== id))
        } else {
            setSelectedNotifications(prev => [...prev, id])
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C9A24B] mx-auto"></div>
                    <p className="text-[#7E81A0] mt-4">Loading notifications...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#0F1229] text-[#F7F7FA]">
            <div className="max-w-4xl mx-auto px-4 py-8">
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
                                Notifications
                            </h1>
                            <p className="text-xs text-[#7E81A0]">
                                Stay updated with your account activity
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleMarkAllAsRead}
                            className="p-2 rounded-xl bg-white/[0.05] border border-white/10 hover:bg-white/[0.1] transition-colors text-sm flex items-center gap-2"
                        >
                            <Check className="w-4 h-4" />
                            <span className="hidden sm:inline">Mark All Read</span>
                        </button>
                        <button
                            onClick={handleDeleteSelected}
                            className="p-2 rounded-xl bg-white/[0.05] border border-white/10 hover:bg-red-500/10 hover:border-red-500/20 transition-colors text-sm flex items-center gap-2 text-red-500"
                        >
                            <Trash2 className="w-4 h-4" />
                            <span className="hidden sm:inline">Delete</span>
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-[#C9A24B]">{notifications.length}</div>
                        <div className="text-xs text-[#7E81A0]">Total</div>
                    </div>
                    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-blue-500">{notifications.filter(n => !n.read).length}</div>
                        <div className="text-xs text-[#7E81A0]">Unread</div>
                    </div>
                    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-green-500">{notifications.filter(n => n.type === 'success').length}</div>
                        <div className="text-xs text-[#7E81A0]">Successful</div>
                    </div>
                    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-yellow-500">{notifications.filter(n => n.type === 'warning').length}</div>
                        <div className="text-xs text-[#7E81A0]">Alerts</div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {filters.map((f) => (
                        <button
                            key={f.id}
                            onClick={() => setFilter(f.id)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 ${
                                filter === f.id
                                    ? 'bg-[#C9A24B] text-[#0F1229]'
                                    : 'bg-white/[0.05] text-[#7E81A0] hover:text-[#F7F7FA] hover:bg-white/[0.1]'
                            }`}
                        >
                            {f.label}
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                                filter === f.id
                                    ? 'bg-[#0F1229]/20 text-[#0F1229]'
                                    : 'bg-white/[0.05] text-[#7E81A0]'
                            }`}>
                                {f.count}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Select All */}
                {filteredNotifications.length > 0 && (
                    <div className="flex items-center gap-3 mb-4">
                        <button
                            onClick={handleSelectAll}
                            className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                                selectAll
                                    ? 'bg-[#C9A24B] border-[#C9A24B]'
                                    : 'border-white/20 hover:border-white/40'
                            }`}
                        >
                            {selectAll && <Check className="w-3 h-3 text-[#0F1229]" />}
                        </button>
                        <span className="text-sm text-[#7E81A0]">Select all</span>
                        {selectedNotifications.length > 0 && (
                            <span className="text-xs text-[#C9A24B]">
                                {selectedNotifications.length} selected
                            </span>
                        )}
                    </div>
                )}

                {/* Notifications List */}
                <div id="notifications-list">
                    {currentItems.length === 0 ? (
                        <div className="text-center py-16 bg-white/[0.03] border border-white/10 rounded-2xl">
                            <Bell className="w-16 h-16 text-[#7E81A0] mx-auto mb-4" />
                            <h3 className="text-xl font-medium">No notifications</h3>
                            <p className="text-sm text-[#7E81A0] mt-2">
                                {filter === 'all'
                                    ? 'You\'re all caught up!'
                                    : `No ${filter} notifications found`}
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {currentItems.map((notification) => {
                                const Icon = notification.icon
                                const isSelected = selectedNotifications.includes(notification.id)

                                return (
                                    <div
                                        key={notification.id}
                                        className={`bg-white/[0.03] border rounded-xl p-4 transition-all duration-200 hover:bg-white/[0.06] ${
                                            notification.read
                                                ? 'border-white/10 opacity-70'
                                                : 'border-[#C9A24B]/30 bg-[#C9A24B]/5'
                                        } ${isSelected ? 'border-[#C9A24B] bg-[#C9A24B]/10' : ''}`}
                                    >
                                        <div className="flex items-start gap-4">
                                            {/* Checkbox */}
                                            <button
                                                onClick={() => handleSelect(notification.id)}
                                                className={`w-5 h-5 rounded border flex items-center justify-center transition-colors mt-1 flex-shrink-0 ${
                                                    isSelected
                                                        ? 'bg-[#C9A24B] border-[#C9A24B]'
                                                        : 'border-white/20 hover:border-white/40'
                                                }`}
                                            >
                                                {isSelected && <Check className="w-3 h-3 text-[#0F1229]" />}
                                            </button>

                                            {/* Icon */}
                                            <div className={`p-2 rounded-xl ${notification.bgColor} flex-shrink-0`}>
                                                <Icon className={`w-5 h-5 ${notification.iconColor}`} />
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-2">
                                                    <div>
                                                        <h4 className={`text-sm font-medium ${notification.read ? 'text-[#C7C9DC]' : 'text-[#F7F7FA]'}`}>
                                                            {notification.title}
                                                        </h4>
                                                        <p className="text-sm text-[#7E81A0] mt-0.5">
                                                            {notification.message}
                                                        </p>
                                                        <div className="flex items-center gap-3 mt-1.5">
                                                            <span className="text-xs text-[#7E81A0] flex items-center gap-1">
                                                                <Clock className="w-3 h-3" />
                                                                {notification.time}
                                                            </span>
                                                            {!notification.read && (
                                                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#C9A24B] text-[#0F1229]">
                                                                    New
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-1 flex-shrink-0">
                                                        {!notification.read && (
                                                            <button
                                                                onClick={() => handleMarkAsRead(notification.id)}
                                                                className="p-1.5 rounded-lg hover:bg-white/[0.05] transition-colors text-[#7E81A0] hover:text-[#C9A24B]"
                                                                title="Mark as read"
                                                            >
                                                                <Check className="w-4 h-4" />
                                                            </button>
                                                        )}
                                                        <button
                                                            onClick={() => handleDelete(notification.id)}
                                                            className="p-1.5 rounded-lg hover:bg-white/[0.05] transition-colors text-[#7E81A0] hover:text-red-500"
                                                            title="Delete"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>

                {/* ✅ Pagination */}
                {filteredNotifications.length > 0 && totalPages > 1 && (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-white/[0.06]">
                        <div className="text-sm text-[#7E81A0]">
                            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredNotifications.length)} of {filteredNotifications.length}
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
                                {getPageNumbers().map((page, index) => (
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
                                <ChevronRightIcon className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Notifications