import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    ChevronDown,
    ChevronUp,
    Search,
    HelpCircle,
    CreditCard,
    Smartphone,
    Shield,
    Wallet,
    Zap,
    Users,
    Clock,
    ArrowRight,
    MessageCircle,
    FileText,
    BookOpen,
    Globe,
    CheckCircle,
    AlertCircle,
    Sparkles,
    Target,
    Lightbulb
} from 'lucide-react'

const FAQ = () => {
    const [activeCategory, setActiveCategory] = useState('all')
    const [searchTerm, setSearchTerm] = useState('')
    const [openQuestions, setOpenQuestions] = useState([])

    const categories = [
        { id: 'all', label: 'All', icon: HelpCircle },
        { id: 'account', label: 'Account', icon: Users },
        { id: 'payments', label: 'Payments', icon: CreditCard },
        { id: 'bills', label: 'Bill Payments', icon: Smartphone },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'wallet', label: 'Wallet', icon: Wallet },
    ]

    const faqs = [
        {
            id: 1,
            category: 'account',
            question: 'How do I create a ZuriPay account?',
            answer: 'Creating a ZuriPay account is simple! Click on the "Get Started" button or "Sign Up" link on our homepage. Fill in your full name, email address, phone number, and create a secure password. Verify your email address, and you\'re ready to start using ZuriPay!'
        },
        {
            id: 2,
            category: 'account',
            question: 'Do I need a bank account to use ZuriPay?',
            answer: 'Yes, you need a bank account to fund your ZuriPay wallet. You can link any Nigerian bank account to your ZuriPay account for seamless transactions and bill payments.'
        },
        {
            id: 3,
            category: 'account',
            question: 'How do I reset my password?',
            answer: 'To reset your password, click on "Forgot Password" on the login page. Enter your registered email address, and we\'ll send you a password reset link. Follow the instructions in the email to create a new password.'
        },
        {
            id: 4,
            category: 'account',
            question: 'Can I have multiple ZuriPay accounts?',
            answer: 'Each individual is allowed to have one ZuriPay account. This helps us maintain security and comply with regulatory requirements.'
        },
        {
            id: 5,
            category: 'payments',
            question: 'How do I send money using ZuriPay?',
            answer: 'To send money, log in to your ZuriPay account, click on "Send Money," enter the recipient\'s phone number or ZuriPay ID, input the amount, and confirm the transaction. The recipient will receive the funds instantly.'
        },
        {
            id: 6,
            category: 'payments',
            question: 'How long do transactions take?',
            answer: 'All ZuriPay transactions are processed instantly. You and the recipient will receive confirmation immediately after the transaction is completed.'
        },
        {
            id: 7,
            category: 'payments',
            question: 'What is the transaction limit?',
            answer: 'Transaction limits depend on your account verification level. Basic accounts have daily limits, while fully verified accounts have higher limits. You can check your limits in your account settings.'
        },
        {
            id: 8,
            category: 'payments',
            question: 'Can I cancel a transaction?',
            answer: 'Once a transaction is completed, it cannot be cancelled. Please double-check all details before confirming any transaction. If you made a mistake, contact our support team immediately.'
        },
        {
            id: 9,
            category: 'bills',
            question: 'What bills can I pay on ZuriPay?',
            answer: 'You can pay a wide range of bills including: Airtime (MTN, Glo, Airtel, 9mobile), Data bundles, Electricity bills (Ikeja Electric, Eko Electric, Abuja DISCO, etc.), TV subscriptions (DStv, GOtv, Startimes), and Internet bills (Spectranet, Smile).'
        },
        {
            id: 10,
            category: 'bills',
            question: 'How do I pay my electricity bill?',
            answer: 'To pay your electricity bill, go to the Bills section, select "Electricity," choose your Disco (e.g., Ikeja Electric), enter your meter number, input the amount, and confirm payment. You\'ll receive an instant confirmation.'
        },
        {
            id: 11,
            category: 'bills',
            question: 'How do I buy airtime?',
            answer: 'Buying airtime is easy! Go to the Bills section, select "Airtime," choose your network provider (MTN, Glo, Airtel, or 9mobile), enter the phone number, select the amount, and confirm. The airtime is delivered instantly.'
        },
        {
            id: 12,
            category: 'bills',
            question: 'Do I get a receipt for bill payments?',
            answer: 'Yes! You\'ll receive an electronic receipt for every bill payment. Receipts are saved in your transaction history and can be downloaded anytime from your ZuriPay account.'
        },
        {
            id: 13,
            category: 'security',
            question: 'Is ZuriPay secure?',
            answer: 'Absolutely! ZuriPay uses bank-grade 256-bit encryption to protect your data and transactions. We are fully licensed by the Central Bank of Nigeria and comply with all financial regulations.'
        },
        {
            id: 14,
            category: 'security',
            question: 'How does ZuriPay protect my personal information?',
            answer: 'We take your privacy seriously. Your personal information is encrypted and stored securely. We never share your information with third parties without your consent. Our security protocols are regularly audited and updated.'
        },
        {
            id: 15,
            category: 'security',
            question: 'What should I do if I suspect fraudulent activity?',
            answer: 'If you notice any suspicious activity on your account, immediately contact our support team at support@zuripay.com or call +234 800 ZURIPAY. We\'ll investigate and secure your account.'
        },
        {
            id: 16,
            category: 'security',
            question: 'Does ZuriPay have two-factor authentication?',
            answer: 'Yes! ZuriPay offers two-factor authentication (2FA) for an extra layer of security. You can enable 2FA in your account settings using your phone number or authenticator app.'
        },
        {
            id: 17,
            category: 'wallet',
            question: 'How do I fund my ZuriPay wallet?',
            answer: 'You can fund your wallet by transferring money from your bank account to your ZuriPay wallet using the provided account details. You can also fund via debit card or bank transfer directly within the app.'
        },
        {
            id: 18,
            category: 'wallet',
            question: 'How do I withdraw money from ZuriPay?',
            answer: 'To withdraw funds, go to the Wallet section, click on "Withdraw," enter the amount, select your bank account, and confirm. The funds will be transferred to your bank account within minutes.'
        },
        {
            id: 19,
            category: 'wallet',
            question: 'Are there fees for wallet transactions?',
            answer: 'We maintain transparent pricing. Deposits are free. Withdrawals and bill payments have minimal fees, which are clearly shown before you confirm any transaction. There are no hidden charges.'
        },
        {
            id: 20,
            category: 'wallet',
            question: 'What is the minimum balance required?',
            answer: 'There is no minimum balance requirement for ZuriPay accounts. You can maintain any balance in your wallet, and there are no maintenance fees.'
        },
    ]

    const toggleQuestion = (id) => {
        setOpenQuestions(prev =>
            prev.includes(id)
                ? prev.filter(qId => qId !== id)
                : [...prev, id]
        )
    }

    const filteredFaqs = faqs.filter(faq => {
        const matchesCategory = activeCategory === 'all' || faq.category === activeCategory
        const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesCategory && matchesSearch
    })

    const groupedFaqs = categories
        .filter(cat => cat.id !== 'all')
        .map(cat => ({
            ...cat,
            count: faqs.filter(f => f.category === cat.id).length
        }))

    return (
        <div className="min-h-screen bg-[#0F1229] text-[#F7F7FA]">
            {/* Hero Section */}
            <section className="relative px-6 lg:px-10 pt-20 pb-16 border-b border-white/[0.06]">
                <div
                    className="pointer-events-none absolute -top-40 left-[-10%] h-[520px] w-[520px] rounded-full opacity-30 blur-3xl"
                    style={{
                        background: 'radial-gradient(circle, #6C5CE7 0%, transparent 70%)',
                    }}
                />
                <div
                    className="pointer-events-none absolute -bottom-40 right-[-10%] h-[520px] w-[520px] rounded-full opacity-20 blur-3xl"
                    style={{
                        background: 'radial-gradient(circle, #C9A24B 0%, transparent 70%)',
                    }}
                />

                <div className="relative max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 text-[0.78rem] tracking-wide uppercase text-[#C9A24B] mb-4">
            <span className="h-px w-6 bg-[#C9A24B]" />
            Help Center
          </span>
                    <h1
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
                        style={{ fontFamily: "'Fraunces', serif" }}
                    >
                        Frequently Asked
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A24B] to-[#6C5CE7]">
              Questions
            </span>
                    </h1>
                    <p className="mt-4 text-lg text-[#C7C9DC] max-w-2xl mx-auto">
                        Find answers to the most common questions about ZuriPay. Can't find what you're looking for? Reach out to our support team.
                    </p>

                    {/* Search */}
                    <div className="mt-8 max-w-xl mx-auto">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7E81A0]" />
                            <input
                                type="text"
                                placeholder="Search for answers..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-white/[0.05] border border-white/10 rounded-xl text-[#F7F7FA] placeholder-[#7E81A0] focus:outline-none focus:ring-2 focus:ring-[#C9A24B]/50 focus:border-[#C9A24B] transition-all duration-200"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Category Stats */}
            <section className="px-6 lg:px-10 py-8 border-b border-white/[0.06]">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                        {groupedFaqs.map((cat) => {
                            const Icon = cat.icon
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`p-4 rounded-xl border transition-all duration-200 ${
                                        activeCategory === cat.id
                                            ? 'bg-[#C9A24B]/10 border-[#C9A24B] text-[#C9A24B]'
                                            : 'bg-white/[0.03] border-white/10 text-[#7E81A0] hover:text-[#F7F7FA] hover:border-white/20'
                                    }`}
                                >
                                    <Icon className="w-6 h-6 mx-auto mb-2" />
                                    <div className="text-xs font-medium">{cat.label}</div>
                                    <div className="text-[10px] opacity-60">{cat.count} questions</div>
                                </button>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* FAQs */}
            <section className="px-6 lg:px-10 py-16">
                <div className="max-w-7xl mx-auto">
                    {filteredFaqs.length === 0 ? (
                        <div className="text-center py-16">
                            <AlertCircle className="w-16 h-16 text-[#7E81A0] mx-auto mb-4" />
                            <h3 className="text-xl font-medium">No results found</h3>
                            <p className="text-[#7E81A0] mt-2">
                                Try adjusting your search or filter to find what you're looking for.
                            </p>
                            <button
                                onClick={() => {
                                    setSearchTerm('')
                                    setActiveCategory('all')
                                }}
                                className="mt-4 text-[#C9A24B] hover:text-[#D4B35C] transition-colors"
                            >
                                Clear filters
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {filteredFaqs.map((faq) => {
                                const isOpen = openQuestions.includes(faq.id)
                                return (
                                    <div
                                        key={faq.id}
                                        className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden hover:bg-white/[0.06] transition-colors"
                                    >
                                        <button
                                            onClick={() => toggleQuestion(faq.id)}
                                            className="w-full px-6 py-4 flex items-start justify-between gap-4 text-left"
                                        >
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-[#C9A24B] bg-[#C9A24B]/10 px-2 py-0.5 rounded-full">
                            {categories.find(c => c.id === faq.category)?.label}
                          </span>
                                                </div>
                                                <h3 className="text-base font-semibold mt-1.5 text-[#F7F7FA]">
                                                    {faq.question}
                                                </h3>
                                            </div>
                                            <div className="flex-shrink-0 mt-1">
                                                {isOpen ? (
                                                    <ChevronUp className="w-5 h-5 text-[#C9A24B]" />
                                                ) : (
                                                    <ChevronDown className="w-5 h-5 text-[#7E81A0]" />
                                                )}
                                            </div>
                                        </button>

                                        {isOpen && (
                                            <div className="px-6 pb-4">
                                                <div className="pt-2 border-t border-white/[0.06]">
                                                    <p className="text-sm text-[#C7C9DC] leading-relaxed">
                                                        {faq.answer}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* Still Have Questions */}
            <section className="px-6 lg:px-10 py-16 border-t border-white/[0.06]">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-r from-[#6C5CE7]/10 to-[#C9A24B]/10 rounded-3xl p-12 border border-white/10 text-center">
                        <HelpCircle className="w-16 h-16 text-[#C9A24B] mx-auto mb-4" />
                        <h2
                            className="text-3xl font-bold mb-4"
                            style={{ fontFamily: "'Fraunces', serif" }}
                        >
                            Still Have Questions?
                        </h2>
                        <p className="text-[#C7C9DC] max-w-md mx-auto mb-8">
                            Our support team is ready to help. We'll get back to you within 24 hours.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                to="/contact"
                                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#F7F7FA] text-[#0F1229] font-medium hover:bg-[#C9A24B] transition-colors duration-200"
                            >
                                Contact Us
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <a
                                href="mailto:support@zuripay.com"
                                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/15 text-[#F7F7FA] font-medium hover:border-white/40 transition-colors duration-200"
                            >
                                Email Support
                            </a>
                        </div>
                        <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-[#7E81A0]">
                            <span>📞 +234 800 ZURIPAY</span>
                            <span>✉️ support@zuripay.com</span>
                            <span>🕐 24/7 Support</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default FAQ