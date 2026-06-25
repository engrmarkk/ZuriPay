import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    Zap,
    Smartphone,
    Tv,
    Wifi,
    Droplet,
    Lightbulb,
    ArrowRight,
    CheckCircle,
    Shield,
    Clock,
    Wallet,
    Users,
    CreditCard,
    Search,
    ChevronRight,
    Sparkles,
    Star,
    TrendingUp,
    Receipt,
    AlertCircle
} from 'lucide-react'
import { useToastActions } from '../hooks/useToastActions'

const Bills = () => {
    const [activeCategory, setActiveCategory] = useState('all')
    const [searchTerm, setSearchTerm] = useState('')

    const categories = [
        { id: 'all', label: 'All', icon: Zap },
        { id: 'airtime', label: 'Airtime & Data', icon: Smartphone },
        { id: 'electricity', label: 'Electricity', icon: Lightbulb },
        { id: 'tv', label: 'TV Subscriptions', icon: Tv },
        { id: 'internet', label: 'Internet', icon: Wifi },
    ]

    const billServices = [
        {
            id: 1,
            category: 'airtime',
            name: 'MTN Airtime',
            description: 'Buy MTN airtime instantly',
            icon: Smartphone,
            color: '#F59E0B',
            bgColor: 'bg-yellow-500/10',
            borderColor: 'border-yellow-500/20',
            providers: ['MTN'],
            popular: true
        },
        {
            id: 2,
            category: 'airtime',
            name: 'Glo Airtime',
            description: 'Buy Glo airtime instantly',
            icon: Smartphone,
            color: '#3B82F6',
            bgColor: 'bg-blue-500/10',
            borderColor: 'border-blue-500/20',
            providers: ['Glo'],
            popular: false
        },
        {
            id: 3,
            category: 'airtime',
            name: 'Airtel Airtime',
            description: 'Buy Airtel airtime instantly',
            icon: Smartphone,
            color: '#EF4444',
            bgColor: 'bg-red-500/10',
            borderColor: 'border-red-500/20',
            providers: ['Airtel'],
            popular: false
        },
        {
            id: 4,
            category: 'airtime',
            name: '9mobile Airtime',
            description: 'Buy 9mobile airtime instantly',
            icon: Smartphone,
            color: '#8B5CF6',
            bgColor: 'bg-purple-500/10',
            borderColor: 'border-purple-500/20',
            providers: ['9mobile'],
            popular: false
        },
        {
            id: 5,
            category: 'electricity',
            name: 'Ikeja Electric',
            description: 'Pay Ikeja Electric bills',
            icon: Lightbulb,
            color: '#F59E0B',
            bgColor: 'bg-amber-500/10',
            borderColor: 'border-amber-500/20',
            providers: ['Ikeja Electric'],
            popular: true
        },
        {
            id: 6,
            category: 'electricity',
            name: 'Eko Electric',
            description: 'Pay Eko Electric bills',
            icon: Lightbulb,
            color: '#10B981',
            bgColor: 'bg-emerald-500/10',
            borderColor: 'border-emerald-500/20',
            providers: ['Eko Electric'],
            popular: true
        },
        {
            id: 7,
            category: 'electricity',
            name: 'Abuja DISCO',
            description: 'Pay Abuja DISCO bills',
            icon: Lightbulb,
            color: '#6366F1',
            bgColor: 'bg-indigo-500/10',
            borderColor: 'border-indigo-500/20',
            providers: ['Abuja DISCO'],
            popular: false
        },
        {
            id: 8,
            category: 'electricity',
            name: 'Port Harcourt DISCO',
            description: 'Pay Port Harcourt DISCO bills',
            icon: Lightbulb,
            color: '#EC4899',
            bgColor: 'bg-pink-500/10',
            borderColor: 'border-pink-500/20',
            providers: ['Port Harcourt DISCO'],
            popular: false
        },
        {
            id: 9,
            category: 'tv',
            name: 'DStv',
            description: 'Renew DStv subscription',
            icon: Tv,
            color: '#E74C3C',
            bgColor: 'bg-red-500/10',
            borderColor: 'border-red-500/20',
            providers: ['DStv'],
            popular: true
        },
        {
            id: 10,
            category: 'tv',
            name: 'GOtv',
            description: 'Renew GOtv subscription',
            icon: Tv,
            color: '#F39C12',
            bgColor: 'bg-orange-500/10',
            borderColor: 'border-orange-500/20',
            providers: ['GOtv'],
            popular: true
        },
        {
            id: 11,
            category: 'tv',
            name: 'Startimes',
            description: 'Renew Startimes subscription',
            icon: Tv,
            color: '#1ABC9C',
            bgColor: 'bg-teal-500/10',
            borderColor: 'border-teal-500/20',
            providers: ['Startimes'],
            popular: false
        },
        {
            id: 12,
            category: 'internet',
            name: 'Spectranet',
            description: 'Pay Spectranet internet bills',
            icon: Wifi,
            color: '#2ECC71',
            bgColor: 'bg-green-500/10',
            borderColor: 'border-green-500/20',
            providers: ['Spectranet'],
            popular: false
        },
        {
            id: 13,
            category: 'internet',
            name: 'Smile',
            description: 'Pay Smile internet bills',
            icon: Wifi,
            color: '#9B59B6',
            bgColor: 'bg-purple-500/10',
            borderColor: 'border-purple-500/20',
            providers: ['Smile'],
            popular: false
        },
    ]

    const toast = useToastActions()

    const filteredServices = billServices.filter(service => {
        const matchesCategory = activeCategory === 'all' || service.category === activeCategory
        const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.description.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesCategory && matchesSearch
    })

    const popularServices = billServices.filter(service => service.popular)

    return (
        <div className="min-h-screen bg-[#0F1229] text-[#F7F7FA]">
            {/* Hero Section */}
            <section className="relative px-6 lg:px-10 pt-20 pb-16 border-b border-white/[0.06]">
                <div
                    className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full opacity-30 blur-3xl"
                    style={{
                        background: 'radial-gradient(circle, #6C5CE7 0%, transparent 70%)',
                    }}
                />

                <div className="relative max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                        <div className="lg:max-w-xl">
                            <span className="inline-flex items-center gap-2 text-[0.78rem] tracking-wide uppercase text-[#C9A24B] mb-4">
                                <span className="h-px w-6 bg-[#C9A24B]" />
                                Pay Bills in Seconds
                            </span>
                            <h1
                                className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
                                style={{ fontFamily: "'Fraunces', serif" }}
                            >
                                All Your Bills
                                <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A24B] to-[#6C5CE7]">
                                    One Platform
                                </span>
                            </h1>
                            <p className="mt-4 text-lg text-[#C7C9DC] max-w-md">
                                Pay airtime, electricity, TV subscriptions, and more. Instant confirmation, zero stress.
                            </p>

                            <div className="mt-8 flex flex-wrap items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-[#34D399]" />
                                    <span className="text-sm text-[#C7C9DC]">Instant delivery</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Shield className="w-5 h-5 text-[#34D399]" />
                                    <span className="text-sm text-[#C7C9DC]">Secure payments</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Receipt className="w-5 h-5 text-[#34D399]" />
                                    <span className="text-sm text-[#C7C9DC]">E-receipts</span>
                                </div>
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
                            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 text-center">
                                <Users className="w-8 h-8 text-[#C9A24B] mx-auto mb-2" />
                                <div className="text-2xl font-bold">500K+</div>
                                <div className="text-xs text-[#7E81A0]">Happy customers</div>
                            </div>
                            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 text-center">
                                <TrendingUp className="w-8 h-8 text-[#C9A24B] mx-auto mb-2" />
                                <div className="text-2xl font-bold">₦2B+</div>
                                <div className="text-xs text-[#7E81A0]">Bills paid</div>
                            </div>
                            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 text-center col-span-2">
                                <Zap className="w-8 h-8 text-[#C9A24B] mx-auto mb-2" />
                                <div className="text-2xl font-bold">99.9%</div>
                                <div className="text-xs text-[#7E81A0]">Success rate</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Search & Filter */}
            <section className="px-6 lg:px-10 py-8 border-b border-white/[0.06]">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                        {/* Search */}
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7E81A0]" />
                            <input
                                type="text"
                                placeholder="Search bills..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-white/[0.05] border border-white/10 rounded-xl text-[#F7F7FA] placeholder-[#7E81A0] focus:outline-none focus:ring-2 focus:ring-[#C9A24B]/50 focus:border-[#C9A24B] transition-all duration-200"
                            />
                        </div>

                        {/* Categories - ✅ Now working */}
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => {
                                const Icon = category.icon
                                const isActive = activeCategory === category.id
                                return (
                                    <button
                                        key={category.id}
                                        onClick={() => setActiveCategory(category.id)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                                            isActive
                                                ? 'bg-[#C9A24B] text-[#0F1229]'
                                                : 'bg-white/[0.05] text-[#7E81A0] hover:text-[#F7F7FA] hover:bg-white/[0.1]'
                                        }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        {category.label}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Popular Services - ✅ Removed /:id links */}
            <section className="px-6 lg:px-10 py-12 border-b border-white/[0.06]">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-bold flex items-center gap-2">
                                <Star className="w-6 h-6 text-[#C9A24B] fill-[#C9A24B]" />
                                Popular Services
                            </h2>
                            <p className="text-sm text-[#7E81A0] mt-1">Most used bills on ZuriPay</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {popularServices.map((service) => {
                            const Icon = service.icon
                            return (
                                <div
                                    key={service.id}
                                    className={`${service.bgColor} ${service.borderColor} border rounded-2xl p-4 hover:scale-[1.02] transition-all duration-200 group cursor-pointer`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-xl bg-white/[0.05]`} style={{ color: service.color }}>
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-sm font-medium truncate">{service.name}</h3>
                                            <p className="text-xs text-[#7E81A0] truncate">{service.description}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* All Services Grid - ✅ Removed /:id links */}
            <section className="px-6 lg:px-10 py-12">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                        <Sparkles className="w-6 h-6 text-[#C9A24B]" />
                        All Bill Services
                        <span className="text-sm font-normal text-[#7E81A0] ml-2">
                            ({filteredServices.length} services)
                        </span>
                    </h2>

                    {filteredServices.length === 0 ? (
                        <div className="text-center py-16">
                            <AlertCircle className="w-16 h-16 text-[#7E81A0] mx-auto mb-4" />
                            <h3 className="text-xl font-medium">No services found</h3>
                            <p className="text-[#7E81A0] mt-2">Try adjusting your search or filter</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {filteredServices.map((service) => {
                                const Icon = service.icon
                                return (
                                    <div
                                        key={service.id}
                                        onClick={() => toast.showSuccess("Welcome to Bill")}
                                        className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 hover:bg-white/[0.06] hover:border-[#C9A24B]/30 transition-all duration-200 group cursor-pointer"
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <div className={`p-3 rounded-xl ${service.bgColor}`} style={{ color: service.color }}>
                                                <Icon className="w-6 h-6" />
                                            </div>
                                            {service.popular && (
                                                <span className="text-[10px] font-medium text-[#C9A24B] bg-[#C9A24B]/10 px-2 py-0.5 rounded-full">
                                                    Popular
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="text-base font-semibold mb-1">{service.name}</h3>
                                        <p className="text-sm text-[#7E81A0]">{service.description}</p>
                                        <div className="mt-3 flex items-center justify-between">
                                            <span className="text-xs text-[#7E81A0]">
                                                {service.providers.join(', ')}
                                            </span>
                                            <ChevronRight className="w-4 h-4 text-[#7E81A0] group-hover:text-[#C9A24B] transition-colors" />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* How It Works */}
            <section className="px-6 lg:px-10 py-16 border-t border-white/[0.06]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold" style={{ fontFamily: "'Fraunces', serif" }}>
                            How It Works
                        </h2>
                        <p className="text-[#7E81A0] mt-2">Pay your bills in 3 simple steps</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                step: '01',
                                title: 'Select Bill',
                                description: 'Choose from our list of billers or search for your specific provider',
                                icon: Search
                            },
                            {
                                step: '02',
                                title: 'Enter Details',
                                description: 'Input your meter number, phone number, or account details',
                                icon: CreditCard
                            },
                            {
                                step: '03',
                                title: 'Confirm & Pay',
                                description: 'Review the amount and confirm payment. Get instant confirmation',
                                icon: CheckCircle
                            }
                        ].map((item) => {
                            const Icon = item.icon
                            return (
                                <div key={item.step} className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 text-center">
                                    <div className="text-4xl font-bold text-[#C9A24B]/20 mb-4" style={{ fontFamily: "'Fraunces', serif" }}>
                                        {item.step}
                                    </div>
                                    <div className="flex justify-center mb-4">
                                        <div className="p-3 rounded-full bg-[#C9A24B]/10 text-[#C9A24B]">
                                            <Icon className="w-8 h-8" />
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                                    <p className="text-sm text-[#7E81A0]">{item.description}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-6 lg:px-10 py-16 border-t border-white/[0.06]">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="bg-gradient-to-r from-[#6C5CE7]/10 to-[#C9A24B]/10 rounded-3xl p-12 border border-white/10">
                        <Wallet className="w-16 h-16 text-[#C9A24B] mx-auto mb-4" />
                        <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Fraunces', serif" }}>
                            Ready to Pay Your Bills?
                        </h2>
                        <p className="text-[#C7C9DC] max-w-md mx-auto mb-8">
                            Join thousands of Nigerians who trust ZuriPay for their daily bill payments
                        </p>
                        <Link
                            to="/auth/signup"
                            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#F7F7FA] text-[#0F1229] font-medium hover:bg-[#C9A24B] transition-colors duration-200"
                        >
                            Get Started
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Bills