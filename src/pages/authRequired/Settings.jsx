import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useToastActions } from '../../hooks/useToastActions'
import {
    Settings,
    Lock,
    Shield,
    Bell,
    Globe,
    Smartphone,
    Eye,
    EyeOff,
    ChevronRight,
    CheckCircle,
    AlertCircle,
    Moon,
    Sun,
    Monitor,
    Mail,
    Phone,
    User,
    Key,
    Fingerprint,
    Database,
    Download,
    LogOut,
    Zap,
    ArrowLeft,
    Save,
    X,
    RefreshCw,
    Clock,
    FileText,
    Users,
    Wallet,
    CreditCard,
    MessageCircle,
    HelpCircle,
    Calendar
} from 'lucide-react'

const SettingsPage = () => {
    const toast = useToastActions()
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    // Settings states
    const [settings, setSettings] = useState({
        // Security
        twoFactorAuth: true,
        biometricLogin: false,
        sessionTimeout: '30',

        // Notifications
        emailNotifications: true,
        pushNotifications: true,
        smsNotifications: false,
        transactionAlerts: true,
        promotionalEmails: false,

        // Preferences
        theme: 'dark',
        language: 'English',
        currency: 'NGN',
        dateFormat: 'DD/MM/YYYY',

        // Privacy
        showBalance: true,
        shareData: false,
        activityStatus: true
    })

    // Security sections
    const securitySections = [
        {
            icon: Lock,
            label: 'Change Password',
            description: 'Update your password regularly',
            path: '/account/settings/change-password'
        },
        // {
        //     icon: Fingerprint,
        //     label: 'Biometric Login',
        //     description: 'Use fingerprint or face ID',
        //     isToggle: true,
        //     key: 'biometricLogin'
        // },
        // {
        //     icon: Clock,
        //     label: 'Session Timeout',
        //     description: 'Auto logout after inactivity',
        //     isSelect: true,
        //     key: 'sessionTimeout',
        //     options: ['15', '30', '60', '120']
        // },
        // {
        //     icon: Key,
        //     label: 'API Keys',
        //     description: 'Manage API access tokens',
        //     path: '/account/settings/api-keys'
        // }
    ]

    // Notification sections
    const notificationSections = [
        {
            icon: Mail,
            label: 'Email Notifications',
            description: 'Receive updates via email',
            isToggle: true,
            key: 'emailNotifications'
        },
        // {
        //     icon: Bell,
        //     label: 'Push Notifications',
        //     description: 'Receive push notifications',
        //     isToggle: true,
        //     key: 'pushNotifications'
        // },
        {
            icon: Smartphone,
            label: 'SMS Notifications',
            description: 'Receive SMS alerts',
            isToggle: true,
            key: 'smsNotifications'
        },
        {
            icon: CreditCard,
            label: 'Transaction Alerts',
            description: 'Get notified for all transactions',
            isToggle: true,
            key: 'transactionAlerts'
        },
        {
            icon: Mail,
            label: 'Promotional Emails',
            description: 'Receive offers and updates',
            isToggle: true,
            key: 'promotionalEmails'
        }
    ]

    // Preference sections
    const preferenceSections = [
        // {
        //     icon: Moon,
        //     label: 'Theme',
        //     description: 'Choose your theme preference',
        //     isSelect: true,
        //     key: 'theme',
        //     options: ['Light', 'Dark', 'System']
        // },
        {
            icon: Globe,
            label: 'Language',
            description: 'Select your preferred language',
            isSelect: true,
            key: 'language',
            options: ['English']
        },
        {
            icon: Wallet,
            label: 'Currency',
            description: 'Choose your currency',
            isSelect: true,
            key: 'currency',
            options: ['NGN']
        }
    ]

    // Privacy sections
    const privacySections = [
        {
            icon: Eye,
            label: 'Show Balance',
            description: 'Display balance on dashboard',
            isToggle: true,
            key: 'showBalance'
        },
        // {
        //     icon: Shield,
        //     label: 'Share Data',
        //     description: 'Allow data sharing for analytics',
        //     isToggle: true,
        //     key: 'shareData'
        // },
        {
            icon: User,
            label: 'Activity Status',
            description: 'Show when you\'re active',
            isToggle: true,
            key: 'activityStatus'
        }
    ]

    const handleToggle = (key) => {
        setSettings(prev => ({
            ...prev,
            [key]: !prev[key]
        }))
        toast.showInfo(`${key} updated successfully!`)
    }

    const handleSelect = (key, value) => {
        setSettings(prev => ({
            ...prev,
            [key]: value
        }))
        toast.showInfo(`${key} updated successfully!`)
    }

    const handleSaveAll = () => {
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
            toast.showSuccess('Settings saved successfully! 🎉')
        }, 1500)
    }

    const renderToggle = (section) => (
        <div className="flex items-center justify-between p-4 rounded-xl hover:bg-white/[0.03] transition-colors">
            <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-white/[0.05] mt-0.5">
                    <section.icon className="w-4 h-4 text-[#C9A24B]" />
                </div>
                <div>
                    <h4 className="text-sm font-medium">{section.label}</h4>
                    <p className="text-xs text-[#7E81A0]">{section.description}</p>
                </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    checked={settings[section.key]}
                    onChange={() => handleToggle(section.key)}
                    className="sr-only peer"
                />
                <div className="w-11 h-6 bg-white/[0.1] rounded-full peer peer-checked:bg-[#C9A24B] transition-colors duration-200">
                    <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-all duration-200 ${
                        settings[section.key] ? 'translate-x-5' : 'translate-x-0'
                    }`} />
                </div>
            </label>
        </div>
    )

    const renderSelect = (section) => (
        <div className="flex items-center justify-between p-4 rounded-xl hover:bg-white/[0.03] transition-colors">
            <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-white/[0.05] mt-0.5">
                    <section.icon className="w-4 h-4 text-[#C9A24B]" />
                </div>
                <div>
                    <h4 className="text-sm font-medium">{section.label}</h4>
                    <p className="text-xs text-[#7E81A0]">{section.description}</p>
                </div>
            </div>
            <select
                value={settings[section.key]}
                onChange={(e) => handleSelect(section.key, e.target.value)}
                className="px-3 py-1.5 bg-white/[0.05] border border-white/10 rounded-lg text-[#F7F7FA] text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A24B]/50 focus:border-[#C9A24B] transition-all duration-200"
            >
                {section.options.map((option) => (
                    <option key={option} value={option} className="bg-[#0F1229]">
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )

    const renderLink = (section) => (
        <Link
            to={section.path}
            className="flex items-center justify-between p-4 rounded-xl hover:bg-white/[0.03] transition-colors group"
        >
            <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-white/[0.05] mt-0.5">
                    <section.icon className="w-4 h-4 text-[#C9A24B]" />
                </div>
                <div>
                    <h4 className="text-sm font-medium">{section.label}</h4>
                    <p className="text-xs text-[#7E81A0]">{section.description}</p>
                </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#7E81A0] group-hover:text-[#C9A24B] transition-colors" />
        </Link>
    )

    const renderSection = (section) => {
        if (section.isToggle) return renderToggle(section)
        if (section.isSelect) return renderSelect(section)
        return renderLink(section)
    }

    return (
        <div className="min-h-screen bg-[#0F1229] text-[#F7F7FA]">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-bold" style={{ fontFamily: "'Fraunces', serif" }}>
                            Settings
                        </h1>
                        <p className="text-[#7E81A0] text-sm">Manage your account preferences</p>
                    </div>
                </div>

                {/* Security */}
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 mb-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Shield className="w-5 h-5 text-[#C9A24B]" />
                        <h2 className="text-lg font-semibold">Security</h2>
                    </div>
                    <div className="divide-y divide-white/[0.06]">
                        {securitySections.map((section) => (
                            <div key={section.label}>
                                {renderSection(section)}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Notifications */}
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 mb-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Bell className="w-5 h-5 text-[#C9A24B]" />
                        <h2 className="text-lg font-semibold">Notifications</h2>
                    </div>
                    <div className="divide-y divide-white/[0.06]">
                        {notificationSections.map((section) => (
                            <div key={section.label}>
                                {renderToggle(section)}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Preferences */}
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 mb-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Settings className="w-5 h-5 text-[#C9A24B]" />
                        <h2 className="text-lg font-semibold">Preferences</h2>
                    </div>
                    <div className="divide-y divide-white/[0.06]">
                        {preferenceSections.map((section) => (
                            <div key={section.label}>
                                {renderSelect(section)}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Privacy */}
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 mb-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Lock className="w-5 h-5 text-[#C9A24B]" />
                        <h2 className="text-lg font-semibold">Privacy</h2>
                    </div>
                    <div className="divide-y divide-white/[0.06]">
                        {privacySections.map((section) => (
                            <div key={section.label}>
                                {renderToggle(section)}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Account Actions */}
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Database className="w-5 h-5 text-[#C9A24B]" />
                        <h2 className="text-lg font-semibold">Account Actions</h2>
                    </div>
                    <div className="divide-y divide-white/[0.06]">
                        <button
                            onClick={() => toast.showInfo('Downloading account data...')}
                            className="flex items-center justify-between w-full p-4 rounded-xl hover:bg-white/[0.03] transition-colors group"
                        >
                            <div className="flex items-start gap-3">
                                <div className="p-2 rounded-lg bg-white/[0.05] mt-0.5">
                                    <Download className="w-4 h-4 text-[#C9A24B]" />
                                </div>
                                <div className="text-left">
                                    <h4 className="text-sm font-medium">Download Account Data</h4>
                                    <p className="text-xs text-[#7E81A0]">Export all your account data</p>
                                </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-[#7E81A0] group-hover:text-[#C9A24B] transition-colors" />
                        </button>
                        <button
                            onClick={() => {
                                if (window.confirm('Are you sure you want to delete your account? This action cannot be undone!')) {
                                    toast.showError('Account deletion requested')
                                }
                            }}
                            className="flex items-center justify-between w-full p-4 rounded-xl hover:bg-red-500/10 transition-colors group"
                        >
                            <div className="flex items-start gap-3">
                                <div className="p-2 rounded-lg bg-red-500/10 mt-0.5">
                                    <X className="w-4 h-4 text-red-500" />
                                </div>
                                <div className="text-left">
                                    <h4 className="text-sm font-medium text-red-500">Delete Account</h4>
                                    <p className="text-xs text-[#7E81A0]">Permanently delete your account</p>
                                </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-red-500/50 group-hover:text-red-500 transition-colors" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingsPage