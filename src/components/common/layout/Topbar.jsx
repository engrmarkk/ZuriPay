import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    Menu,
    Bell,
    User,
    Search,
    ChevronDown,
    LogOut,
    Settings,
    HelpCircle,
    Zap
} from 'lucide-react'

const Topbar = ({ toggleSidebar }) => {
    const [showDropdown, setShowDropdown] = useState(false)
    const [showNotifications, setShowNotifications] = useState(false)

    const notifications = [
        { id: 1, message: 'Payment of ₦25,000 received', time: '2 min ago', read: false },
        { id: 2, message: 'Airtime purchase successful', time: '15 min ago', read: false },
        { id: 3, message: 'Electricity bill paid', time: '1 hour ago', read: true },
        { id: 4, message: 'Welcome to ZuriPay!', time: '2 hours ago', read: true },
    ]

    const unreadCount = notifications.filter(n => !n.read).length

    return (
        <header className="bg-[#0F1229] border-b border-white/[0.06] sticky top-0 z-30">
            <div className="flex items-center justify-between px-4 h-16">
                {/* Left side */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded-lg hover:bg-white/[0.05] transition-colors lg:hidden"
                    >
                        <Menu className="w-5 h-5 text-[#F7F7FA]" />
                    </button>
                    <div className="hidden lg:block">
                        <h1 className="text-lg font-semibold" style={{ fontFamily: "'Fraunces', serif" }}>
                            Account
                        </h1>
                    </div>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-3">

                    {/* Notifications */}
                    <div className="relative">
                        <button
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="p-2 rounded-lg hover:bg-white/[0.05] transition-colors relative"
                        >
                            <Bell className="w-5 h-5 text-[#F7F7FA]" />
                            {unreadCount > 0 && (
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            )}
                        </button>

                        {/* Notifications dropdown */}
                        {showNotifications && (
                            <div className="absolute right-0 mt-2 w-80 bg-[#0F1229] border border-white/10 rounded-2xl shadow-xl overflow-hidden z-50">
                                <div className="p-4 border-b border-white/[0.06]">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold">Notifications</h3>
                                        <button className="text-xs text-[#C9A24B] hover:text-[#D4B35C] transition-colors">
                                            Mark all read
                                        </button>
                                    </div>
                                </div>
                                <div className="max-h-96 overflow-y-auto">
                                    {notifications.map((notif) => (
                                        <div
                                            key={notif.id}
                                            className={`p-4 border-b border-white/[0.06] hover:bg-white/[0.03] transition-colors cursor-pointer ${
                                                !notif.read ? 'bg-[#C9A24B]/5' : ''
                                            }`}
                                        >
                                            <p className={`text-sm ${!notif.read ? 'text-[#F7F7FA]' : 'text-[#7E81A0]'}`}>
                                                {notif.message}
                                            </p>
                                            <p className="text-xs text-[#7E81A0] mt-1">{notif.time}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-3 text-center border-t border-white/[0.06]">
                                    <Link to="/account/notifications" className="text-xs text-[#C9A24B] hover:text-[#D4B35C] transition-colors">
                                        View all notifications
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* User dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/[0.05] transition-colors"
                        >
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#C9A24B] to-[#6C5CE7] flex items-center justify-center text-sm font-bold text-[#0F1229]">
                                JD
                            </div>
                            <ChevronDown className="w-4 h-4 text-[#7E81A0] hidden sm:block" />
                        </button>

                        {/* User dropdown menu */}
                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-56 bg-[#0F1229] border border-white/10 rounded-2xl shadow-xl overflow-hidden z-50">
                                <div className="p-4 border-b border-white/[0.06]">
                                    <p className="font-semibold text-sm">John Doe</p>
                                    <p className="text-xs text-[#7E81A0]">john.doe@email.com</p>
                                </div>
                                <div className="p-2">
                                    <Link
                                        to="/account/profile"
                                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/[0.05] transition-colors"
                                    >
                                        <User className="w-4 h-4 text-[#7E81A0]" />
                                        <span className="text-sm">Profile</span>
                                    </Link>
                                    <Link
                                        to="/account/settings"
                                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/[0.05] transition-colors"
                                    >
                                        <Settings className="w-4 h-4 text-[#7E81A0]" />
                                        <span className="text-sm">Settings</span>
                                    </Link>
                                    <Link
                                        to="/account/help"
                                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/[0.05] transition-colors"
                                    >
                                        <HelpCircle className="w-4 h-4 text-[#7E81A0]" />
                                        <span className="text-sm">Help Center</span>
                                    </Link>
                                </div>
                                <div className="p-2 border-t border-white/[0.06]">
                                    <Link
                                        to="/logout"
                                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-500/10 hover:text-red-500 transition-colors"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        <span className="text-sm">Logout</span>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Topbar