import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useToastActions } from '../../hooks/useToastActions'
import {
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Camera,
    Edit,
    Save,
    X,
    CheckCircle,
    AlertCircle,
    Shield,
    Smartphone,
    CreditCard,
    Wallet,
    LogOut,
    ChevronRight,
    Settings,
    Lock,
    Key,
    Globe,
    Users,
    Star,
    Award,
    Clock,
    FileText,
    Bell,
    Eye,
    EyeOff,
    Copy,
    Check,
    Zap,
    ArrowUpRight,
    ArrowDownLeft,
    Download,
    TrendingUp,
    TrendingDown,
    BarChart3,
    Percent,
    Circle,
    ChevronDown,
    ChevronUp,
    Fingerprint,
    Loader
} from 'lucide-react'

const Profile = () => {
    const toast = useToastActions()
    const [isEditing, setIsEditing] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [copied, setCopied] = useState(false)
    const [showLimits, setShowLimits] = useState(false)
    const [showUpgradeModal, setShowUpgradeModal] = useState(false)
    const [bvn, setBvn] = useState('')
    const [bvnError, setBvnError] = useState('')
    const [isVerifying, setIsVerifying] = useState(false)
    const fileInputRef = useRef(null)

    // User profile data
    const [profile, setProfile] = useState({
        fullName: 'John Adeyemi',
        email: 'john.adeyemi@email.com',
        phone: '08012345678',
        address: 'Lagos, Nigeria',
        dateJoined: 'January 15, 2024',
        accountNumber: '0123456789',
        bankName: 'ZuriPay Wallet',
        tier: 2, // 1, 2, or 3
        verified: true,
        bio: 'Passionate about financial inclusion and building the future of payments in Nigeria.',
        avatar: null
    })

    const [formData, setFormData] = useState({
        fullName: profile.fullName,
        email: profile.email,
        phone: profile.phone,
        address: profile.address,
        bio: profile.bio
    })

    // Tier/Limits configuration
    const tierConfig = {
        1: {
            label: 'Tier 1',
            icon: Star,
            color: '#F59E0B',
            bgColor: 'bg-yellow-500/10',
            borderColor: 'border-yellow-500/20',
            textColor: 'text-yellow-500',
            limits: {
                dailyTransactionLimit: '₦50,000',
                dailyTransferLimit: '₦30,000',
                maxBalance: '₦200,000',
                maxTransferPerTransaction: '₦30,000',
                maxBillPayment: '₦50,000',
                monthlyLimit: '₦500,000'
            },
            requirements: [
                'Basic KYC verification',
            ]
        },
        2: {
            label: 'Tier 2',
            icon: Shield,
            color: '#3B82F6',
            bgColor: 'bg-blue-500/10',
            borderColor: 'border-blue-500/20',
            textColor: 'text-blue-500',
            limits: {
                dailyTransactionLimit: '₦500,000',
                dailyTransferLimit: '₦300,000',
                maxBalance: '₦2,000,000',
                maxTransferPerTransaction: '₦300,000',
                maxBillPayment: '₦500,000',
                monthlyLimit: '₦5,000,000'
            },
            requirements: [
                'Email verification'
            ]
        },
        3: {
            label: 'Tier 3',
            icon: Award,
            color: '#10B981',
            bgColor: 'bg-green-500/10',
            borderColor: 'border-green-500/20',
            textColor: 'text-green-500',
            limits: {
                dailyTransactionLimit: '₦5,000,000',
                dailyTransferLimit: '₦3,000,000',
                maxBalance: '₦20,000,000',
                maxTransferPerTransaction: '₦3,000,000',
                maxBillPayment: '₦5,000,000',
                monthlyLimit: '₦50,000,000'
            },
            requirements: [
                'BVN verification'
            ]
        }
    }

    const currentTier = tierConfig[profile.tier]
    const nextTier = profile.tier < 3 ? tierConfig[profile.tier + 1] : null

    // Account stats
    const stats = [
        { label: 'Total Transactions', value: '156', icon: FileText },
        { label: 'Total Sent', value: '₦450,000', icon: ArrowUpRight },
        { label: 'Total Received', value: '₦680,000', icon: ArrowDownLeft },
        { label: 'Member Since', value: '2024', icon: Calendar },
    ]

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSave = () => {
        setIsLoading(true)

        setTimeout(() => {
            setProfile(prev => ({
                ...prev,
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                bio: formData.bio
            }))
            setIsEditing(false)
            setIsLoading(false)
            toast.showSuccess('Profile updated successfully! 🎉')
        }, 1500)
    }

    const handleCancel = () => {
        setFormData({
            fullName: profile.fullName,
            email: profile.email,
            phone: profile.phone,
            address: profile.address,
            bio: profile.bio
        })
        setIsEditing(false)
    }

    const handleAvatarClick = () => {
        fileInputRef.current?.click()
    }

    const handleAvatarChange = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (event) => {
                setProfile(prev => ({
                    ...prev,
                    avatar: event.target?.result
                }))
                toast.showSuccess('Profile picture updated! 📸')
            }
            reader.readAsDataURL(file)
        }
    }

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        toast.showSuccess('Copied to clipboard! 📋')
        setTimeout(() => setCopied(false), 3000)
    }

    const getInitials = (name) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)
    }

    // ✅ Open Upgrade Modal
    const handleUpgradeClick = () => {
        setShowUpgradeModal(true)
        setBvn('')
        setBvnError('')
    }

    // ✅ Close Upgrade Modal
    const handleCloseModal = () => {
        setShowUpgradeModal(false)
        setBvn('')
        setBvnError('')
        setIsVerifying(false)
    }

    // ✅ Handle BVN Input (only digits, max 11 characters)
    const handleBvnChange = (e) => {
        const value = e.target.value.replace(/\D/g, '') // Only digits
        if (value.length <= 11) {
            setBvn(value)
            setBvnError('')
        }
    }

    // ✅ Format BVN with spaces (e.g., 12345678901 → 1234 5678 901)
    const formatBvn = (bvn) => {
        const cleaned = bvn.replace(/\D/g, '')
        const parts = []
        for (let i = 0; i < cleaned.length; i += 4) {
            parts.push(cleaned.slice(i, i + 4))
        }
        return parts.join(' ')
    }

    // ✅ Validate and Submit BVN
    const handleVerifyBvn = async () => {
        const cleanBvn = bvn.replace(/\D/g, '')

        // Validate BVN length (11 digits)
        if (cleanBvn.length !== 11) {
            setBvnError('BVN must be exactly 11 digits')
            return
        }

        setIsVerifying(true)

        try {
            // Simulate API call to verify BVN
            await new Promise(resolve => setTimeout(resolve, 2000))

            // Simulate successful verification
            // In production, this would call your backend API
            // const response = await fetch('/api/verify-bvn', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ bvn: cleanBvn })
            // })
            // const data = await response.json()

            // if (response.status === 200) {
            //     // Success - upgrade user
            //     setProfile(prev => ({ ...prev, tier: 3 }))
            //     toast.showSuccess('BVN verified successfully! 🎉 You are now Tier 3')
            //     handleCloseModal()
            // } else {
            //     setBvnError(data.message || 'Invalid BVN. Please try again.')
            // }

            // Simulate success
            setProfile(prev => ({ ...prev, tier: 3 }))
            toast.showSuccess('BVN verified successfully! 🎉 You are now Tier 3')
            handleCloseModal()

        } catch (error) {
            setBvnError('Failed to verify BVN. Please try again.')
        } finally {
            setIsVerifying(false)
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C9A24B] mx-auto"></div>
                    <p className="text-[#7E81A0] mt-4">Saving changes...</p>
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
                            Profile
                        </h1>
                        <p className="text-[#7E81A0] text-sm">Manage your personal information</p>
                    </div>
                    {/*<div className="flex items-center gap-3">*/}
                    {/*    {!isEditing ? (*/}
                    {/*        <button*/}
                    {/*            onClick={() => setIsEditing(true)}*/}
                    {/*            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C9A24B] text-[#0F1229] text-sm font-medium hover:bg-[#D4B35C] transition-colors"*/}
                    {/*        >*/}
                    {/*            <Edit className="w-4 h-4" />*/}
                    {/*            Edit Profile*/}
                    {/*        </button>*/}
                    {/*    ) : (*/}
                    {/*        <>*/}
                    {/*            <button*/}
                    {/*                onClick={handleCancel}*/}
                    {/*                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-[#F7F7FA] text-sm font-medium hover:bg-white/[0.1] transition-colors"*/}
                    {/*            >*/}
                    {/*                <X className="w-4 h-4" />*/}
                    {/*                Cancel*/}
                    {/*            </button>*/}
                    {/*            <button*/}
                    {/*                onClick={handleSave}*/}
                    {/*                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C9A24B] text-[#0F1229] text-sm font-medium hover:bg-[#D4B35C] transition-colors"*/}
                    {/*            >*/}
                    {/*                <Save className="w-4 h-4" />*/}
                    {/*                Save Changes*/}
                    {/*            </button>*/}
                    {/*        </>*/}
                    {/*    )}*/}
                    {/*</div>*/}
                </div>

                {/* Profile Card */}
                <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-8 mb-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                        {/* Avatar */}
                        <div className="relative">
                            <div
                                className="w-24 h-24 rounded-full bg-gradient-to-r from-[#C9A24B] to-[#6C5CE7] flex items-center justify-center text-3xl font-bold text-[#0F1229] cursor-pointer hover:opacity-80 transition-opacity"
                                onClick={handleAvatarClick}
                            >
                                {profile.avatar ? (
                                    <img
                                        src={profile.avatar}
                                        alt={profile.fullName}
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                ) : (
                                    getInitials(profile.fullName)
                                )}
                            </div>
                            <button
                                onClick={handleAvatarClick}
                                className="absolute bottom-0 right-0 p-2 rounded-full bg-[#C9A24B] text-[#0F1229] hover:bg-[#D4B35C] transition-colors"
                            >
                                <Camera className="w-4 h-4" />
                            </button>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleAvatarChange}
                            />
                        </div>

                        {/* User Info */}
                        <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3">
                                <h2 className="text-2xl font-bold" style={{ fontFamily: "'Fraunces', serif" }}>
                                    {profile.fullName}
                                </h2>
                                {profile.verified && (
                                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-xs border border-green-500/20">
                                        <CheckCircle className="w-3 h-3" />
                                        Verified
                                    </span>
                                )}
                            </div>
                            <div className="flex flex-wrap gap-4 mt-2 text-sm text-[#7E81A0]">
                                <div className="flex items-center gap-1.5">
                                    <Mail className="w-4 h-4" />
                                    {profile.email}
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Phone className="w-4 h-4" />
                                    {profile.phone}
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <MapPin className="w-4 h-4" />
                                    {profile.address}
                                </div>
                            </div>
                            <p className="text-sm text-[#C7C9DC] mt-3 max-w-2xl">{profile.bio}</p>
                        </div>
                    </div>
                </div>

                {/* Tier/Limits Section */}
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <Award className="w-6 h-6 text-[#C9A24B]" />
                            <h2 className="text-lg font-semibold">Account Level</h2>
                        </div>
                        <button
                            onClick={() => setShowLimits(!showLimits)}
                            className="text-sm text-[#7E81A0] hover:text-[#C9A24B] transition-colors flex items-center gap-1"
                        >
                            {showLimits ? 'Hide Limits' : 'View Limits'}
                            {showLimits ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                    </div>

                    {/* Current Tier */}
                    <div className={`${currentTier.bgColor} ${currentTier.borderColor} border rounded-xl p-4 mb-4`}>
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-white/[0.05]">
                                    <currentTier.icon className="w-6 h-6" style={{ color: currentTier.color }} />
                                </div>
                                <div>
                                    <div className="text-sm font-medium" style={{ color: currentTier.color }}>
                                        {currentTier.label}
                                    </div>
                                    <div className="text-xs text-[#7E81A0]">
                                        {profile.tier === 3 ? 'Maximum level' : `Level ${profile.tier} of 3`}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3].map((level) => (
                                        <div
                                            key={level}
                                            className={`w-3 h-3 rounded-full ${
                                                level <= profile.tier
                                                    ? 'bg-[#C9A24B]'
                                                    : 'bg-white/[0.1]'
                                            }`}
                                        />
                                    ))}
                                </div>
                                {nextTier && (
                                    <button
                                        onClick={handleUpgradeClick}
                                        className="px-4 py-1.5 rounded-lg bg-[#C9A24B] text-[#0F1229] text-xs font-medium hover:bg-[#D4B35C] transition-colors"
                                    >
                                        Upgrade to {nextTier.label}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Requirements */}
                    <div className="mb-4">
                        <h4 className="text-xs font-medium text-[#7E81A0] uppercase tracking-wider mb-2">
                            Requirements for {currentTier.label}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {currentTier.requirements.map((req, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs text-[#C7C9DC]"
                                >
                                    <CheckCircle className="w-3 h-3 text-green-500" />
                                    {req}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Transaction Limits */}
                    {showLimits && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4 pt-4 border-t border-white/[0.06]">
                            <div className="bg-white/[0.03] rounded-xl p-3">
                                <div className="text-xs text-[#7E81A0]">Daily Transaction Limit</div>
                                <div className="text-sm font-semibold mt-1">{currentTier.limits.dailyTransactionLimit}</div>
                            </div>
                            <div className="bg-white/[0.03] rounded-xl p-3">
                                <div className="text-xs text-[#7E81A0]">Daily Transfer Limit</div>
                                <div className="text-sm font-semibold mt-1">{currentTier.limits.dailyTransferLimit}</div>
                            </div>
                            <div className="bg-white/[0.03] rounded-xl p-3">
                                <div className="text-xs text-[#7E81A0]">Max Balance</div>
                                <div className="text-sm font-semibold mt-1">{currentTier.limits.maxBalance}</div>
                            </div>
                            <div className="bg-white/[0.03] rounded-xl p-3">
                                <div className="text-xs text-[#7E81A0]">Max Per Transfer</div>
                                <div className="text-sm font-semibold mt-1">{currentTier.limits.maxTransferPerTransaction}</div>
                            </div>
                            <div className="bg-white/[0.03] rounded-xl p-3">
                                <div className="text-xs text-[#7E81A0]">Max Bill Payment</div>
                                <div className="text-sm font-semibold mt-1">{currentTier.limits.maxBillPayment}</div>
                            </div>
                            <div className="bg-white/[0.03] rounded-xl p-3">
                                <div className="text-xs text-[#7E81A0]">Monthly Limit</div>
                                <div className="text-sm font-semibold mt-1">{currentTier.limits.monthlyLimit}</div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                    {stats.map((stat) => {
                        const Icon = stat.icon
                        return (
                            <div key={stat.label} className="bg-white/[0.03] border border-white/10 rounded-xl p-4 text-center">
                                <Icon className="w-4 h-4 text-[#C9A24B] mx-auto mb-1" />
                                <div className="text-lg font-bold">{stat.value}</div>
                                <div className="text-xs text-[#7E81A0]">{stat.label}</div>
                            </div>
                        )
                    })}
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Edit Form */}
                        {isEditing ? (
                            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                                <h3 className="text-lg font-semibold mb-6">Edit Profile</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-[#C7C9DC] mb-1.5">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2.5 bg-white/[0.05] border border-white/10 rounded-xl text-[#F7F7FA] placeholder-[#7E81A0] focus:outline-none focus:ring-2 focus:ring-[#C9A24B]/50 focus:border-[#C9A24B] transition-all duration-200 text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#C7C9DC] mb-1.5">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            disabled
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2.5 bg-white/[0.05] border border-white/10 rounded-xl text-[#F7F7FA] placeholder-[#7E81A0] focus:outline-none focus:ring-2 focus:ring-[#C9A24B]/50 focus:border-[#C9A24B] transition-all duration-200 text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#C7C9DC] mb-1.5">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            disabled
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2.5 bg-white/[0.05] border border-white/10 rounded-xl text-[#F7F7FA] placeholder-[#7E81A0] focus:outline-none focus:ring-2 focus:ring-[#C9A24B]/50 focus:border-[#C9A24B] transition-all duration-200 text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#C7C9DC] mb-1.5">
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2.5 bg-white/[0.05] border border-white/10 rounded-xl text-[#F7F7FA] placeholder-[#7E81A0] focus:outline-none focus:ring-2 focus:ring-[#C9A24B]/50 focus:border-[#C9A24B] transition-all duration-200 text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#C7C9DC] mb-1.5">
                                            Bio
                                        </label>
                                        <textarea
                                            name="bio"
                                            rows="3"
                                            value={formData.bio}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2.5 bg-white/[0.05] border border-white/10 rounded-xl text-[#F7F7FA] placeholder-[#7E81A0] focus:outline-none focus:ring-2 focus:ring-[#C9A24B]/50 focus:border-[#C9A24B] transition-all duration-200 text-sm resize-none"
                                            placeholder="Tell us about yourself..."
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* Account Information */}
                                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 mb-6">
                                    <h3 className="text-lg font-semibold mb-4">Account Information</h3>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <div className="text-xs text-[#7E81A0] mb-1">Full Name</div>
                                            <div className="text-sm font-medium">{profile.fullName}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-[#7E81A0] mb-1">Email</div>
                                            <div className="text-sm font-medium">{profile.email}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-[#7E81A0] mb-1">Phone</div>
                                            <div className="text-sm font-medium">{profile.phone}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-[#7E81A0] mb-1">Address</div>
                                            <div className="text-sm font-medium">{profile.address}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-[#7E81A0] mb-1">Account Number</div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium">{profile.accountNumber}</span>
                                                <button
                                                    onClick={() => handleCopy(profile.accountNumber)}
                                                    className="text-[#7E81A0] hover:text-[#C9A24B] transition-colors"
                                                >
                                                    {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-[#7E81A0] mb-1">Member Since</div>
                                            <div className="text-sm font-medium">{profile.dateJoined}</div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Actions */}
                        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                            <div className="space-y-3">
                                <Link
                                    to="/account/wallet"
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.03] transition-colors group"
                                >
                                    <Wallet className="w-4 h-4 text-[#C9A24B]" />
                                    <span className="text-sm">Go to Wallet</span>
                                    <ChevronRight className="w-4 h-4 text-[#7E81A0] group-hover:text-[#C9A24B] transition-colors ml-auto" />
                                </Link>
                                <Link
                                    to="/account/transactions"
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.03] transition-colors group"
                                >
                                    <FileText className="w-4 h-4 text-[#C9A24B]" />
                                    <span className="text-sm">View Transactions</span>
                                    <ChevronRight className="w-4 h-4 text-[#7E81A0] group-hover:text-[#C9A24B] transition-colors ml-auto" />
                                </Link>
                                <Link
                                    to="/account/settings"
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.03] transition-colors group"
                                >
                                    <Settings className="w-4 h-4 text-[#C9A24B]" />
                                    <span className="text-sm">Settings</span>
                                    <ChevronRight className="w-4 h-4 text-[#7E81A0] group-hover:text-[#C9A24B] transition-colors ml-auto" />
                                </Link>
                            </div>
                        </div>

                        {/* Account Actions */}
                        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                            <h3 className="text-lg font-semibold mb-4">Account</h3>
                            <div className="space-y-3">
                                <button
                                    onClick={() => {
                                        toast.showInfo('Downloading account data...')
                                    }}
                                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.03] transition-colors group"
                                >
                                    <Download className="w-4 h-4 text-[#C9A24B]" />
                                    <span className="text-sm">Download Data</span>
                                    <ChevronRight className="w-4 h-4 text-[#7E81A0] group-hover:text-[#C9A24B] transition-colors ml-auto" />
                                </button>
                                <button
                                    onClick={() => {
                                        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                                            toast.showError('Account deletion requested')
                                        }
                                    }}
                                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/10 transition-colors group"
                                >
                                    <X className="w-4 h-4 text-red-500" />
                                    <span className="text-sm text-red-500">Delete Account</span>
                                    <ChevronRight className="w-4 h-4 text-red-500/50 group-hover:text-red-500 transition-colors ml-auto" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ✅ BVN Verification Modal */}
            {showUpgradeModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
                    onClick={handleCloseModal}
                >
                    <div
                        className="bg-[#0F1229] border border-white/10 rounded-3xl max-w-md w-full shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-[#C9A24B]/10">
                                    <Fingerprint className="w-5 h-5 text-[#C9A24B]" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold" style={{ fontFamily: "'Fraunces', serif" }}>
                                        Verify BVN
                                    </h2>
                                    <p className="text-xs text-[#7E81A0]">
                                        Enter your 11-digit BVN to upgrade to {nextTier?.label}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={handleCloseModal}
                                className="p-2 rounded-lg hover:bg-white/[0.05] transition-colors"
                                disabled={isVerifying}
                            >
                                <X className="w-5 h-5 text-[#7E81A0]" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6">
                            {/* BVN Input */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-[#C7C9DC] mb-2">
                                    Bank Verification Number (BVN)
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Fingerprint className="w-5 h-5 text-[#7E81A0]" />
                                    </div>
                                    <input
                                        type="text"
                                        value={formatBvn(bvn)}
                                        onChange={handleBvnChange}
                                        placeholder="1234 5678 901"
                                        className={`w-full pl-10 pr-4 py-3 bg-white/[0.05] border rounded-xl text-[#F7F7FA] placeholder-[#7E81A0] focus:outline-none focus:ring-2 transition-all duration-200 text-sm font-mono ${
                                            bvnError
                                                ? 'border-red-500 focus:ring-red-500/50'
                                                : 'border-white/10 focus:ring-[#C9A24B]/50 focus:border-[#C9A24B]'
                                        }`}
                                        disabled={isVerifying}
                                        maxLength={14} // 11 digits + 3 spaces
                                    />
                                </div>
                                {bvnError && (
                                    <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
                                        <AlertCircle className="w-3.5 h-3.5" />
                                        {bvnError}
                                    </p>
                                )}
                                <p className="text-xs text-[#7E81A0] mt-2">
                                    <CheckCircle className="w-3 h-3 inline-block mr-1 text-green-500" />
                                    BVN is securely encrypted and used for verification only
                                </p>
                            </div>

                            {/* Security Note */}
                            <div className="bg-[#C9A24B]/5 border border-[#C9A24B]/20 rounded-xl p-3 mb-4">
                                <div className="flex items-start gap-2">
                                    <Shield className="w-4 h-4 text-[#C9A24B] flex-shrink-0 mt-0.5" />
                                    <p className="text-xs text-[#C7C9DC]">
                                        Your BVN is encrypted and stored securely. It will be used to verify your identity and upgrade your account tier.
                                    </p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                                <button
                                    onClick={handleCloseModal}
                                    className="flex-1 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-[#F7F7FA] text-sm font-medium hover:bg-white/[0.1] transition-colors"
                                    disabled={isVerifying}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleVerifyBvn}
                                    disabled={isVerifying || bvn.replace(/\D/g, '').length !== 11}
                                    className={`flex-1 py-3 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                                        isVerifying || bvn.replace(/\D/g, '').length !== 11
                                            ? 'opacity-50 cursor-not-allowed bg-[#C9A24B] text-[#0F1229]'
                                            : 'bg-[#C9A24B] text-[#0F1229] hover:bg-[#D4B35C]'
                                    }`}
                                >
                                    {isVerifying ? (
                                        <>
                                            <Loader className="w-4 h-4 animate-spin" />
                                            Verifying...
                                        </>
                                    ) : (
                                        <>
                                            <Check className="w-4 h-4" />
                                            Verify & Upgrade
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

export default Profile