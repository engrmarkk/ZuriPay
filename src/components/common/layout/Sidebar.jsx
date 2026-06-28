import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
    Zap,
    LayoutDashboard,
    Send,
    Smartphone,
    Wifi,
    Lightbulb,
    Tv,
    Receipt,
    Wallet,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Users,
    CreditCard,
    History,
    Bell,
    HelpCircle
} from 'lucide-react'
import { useToastActions } from "../../../hooks/useToastActions.js";

const Sidebar = ({ isOpen, setIsOpen }) => {
    const navigate = useNavigate()
    const toast  = useToastActions()
    const location = useLocation()
    const [isCollapsed, setIsCollapsed] = useState(false)

    // handle logout, remove accessData from localStorage
    const handleLogout = () => {
        console.log('Logout clicked')
        localStorage.removeItem('accessData')
        console.log('accessData removed')
        navigate('/auth/login')
        toast.showSuccess('You have been logged out')
        setIsOpen(false)
    }

    const navItems = [
        { path: '/account/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/account/pay/transfer', icon: Send, label: 'Transfer' },
        { path: '/account/pay/betting', icon: Smartphone, label: 'Betting' },
        { path: '/account/pay/airtime', icon: Smartphone, label: 'Airtime' },
        { path: '/account/pay/data', icon: Wifi, label: 'Data' },
        { path: '/account/pay/electricity', icon: Lightbulb, label: 'Electricity' },
        { path: '/account/pay/cable', icon: Tv, label: 'Cable TV' },
        { path: '/account/transactions', icon: Receipt, label: 'Transactions' },
        { path: '/account/wallets', icon: Wallet, label: 'Wallet' },
        { path: '/account/profile', icon: Users, label: 'Profile' },
        { path: '/account/settings', icon: Settings, label: 'Settings' },
    ]

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed)
    }

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed left-0 top-0 h-full bg-[#0F1229] border-r border-white/[0.06] z-50 transition-all duration-300 ${
                    isCollapsed ? 'w-20' : 'w-64'
                } ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
            >
                {/* Logo */}
                <div className={`flex items-center h-16 px-4 border-b border-white/[0.06] ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
                    <Link to="/dashboard" className="flex items-center gap-2">
                        <Zap className="w-8 h-8 text-[#C9A24B] flex-shrink-0" />
                        {!isCollapsed && (
                            <span className="text-xl font-bold" style={{ fontFamily: "'Fraunces', serif" }}>
                ZuriPay
              </span>
                        )}
                    </Link>
                    <button
                        onClick={toggleSidebar}
                        className="hidden lg:flex p-1 rounded-lg hover:bg-white/[0.05] transition-colors"
                    >
                        {isCollapsed ? <ChevronRight className="w-4 h-4 text-[#7E81A0]" /> : <ChevronLeft className="w-4 h-4 text-[#7E81A0]" />}
                    </button>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-8rem)]">
                    {navItems.map((item) => {
                        const Icon = item.icon
                        const isActive = location.pathname === item.path ||
                            (item.path !== '/dashboard' && location.pathname.startsWith(item.path))

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                                    isActive
                                        ? 'bg-[#C9A24B]/10 text-[#C9A24B]'
                                        : 'text-[#7E81A0] hover:text-[#F7F7FA] hover:bg-white/[0.05]'
                                } ${isCollapsed ? 'justify-center' : ''}`}
                                title={isCollapsed ? item.label : ''}
                            >
                                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-[#C9A24B]' : ''}`} />
                                {!isCollapsed && <span className="text-sm">{item.label}</span>}
                            </Link>
                        )
                    })}
                </nav>

                {/* Bottom section */}
                <div className={`absolute bottom-0 left-0 right-0 p-4 border-t border-white/[0.06] ${isCollapsed ? 'text-center' : ''}`}>
                    <button
                        onClick={handleLogout}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#7E81A0] hover:text-red-500 hover:bg-red-500/10 cursor-pointer transition-all duration-200 w-full ${
                            isCollapsed ? 'justify-center' : ''
                        }`}
                        title={isCollapsed ? 'Logout' : ''}
                    >
                        <LogOut className="w-5 h-5 flex-shrink-0" />
                        {!isCollapsed && <span className="text-sm">Logout</span>}
                    </button>
                </div>
            </aside>
        </>
    )
}

export default Sidebar