import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    Mail,
    Phone,
    MapPin,
    Send,
    CheckCircle,
    AlertCircle,
    Clock,
    MessageCircle,
    ArrowRight,
    Zap,
    Globe,
    Headphones,
    FileText,
    Users,
    Building,
    Calendar
} from 'lucide-react'

// Social icons from React Icons
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa'

const Contact = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    })
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const validateForm = () => {
        const newErrors = {}

        if (!formData.fullName) {
            newErrors.fullName = 'Full name is required'
        } else if (formData.fullName.length < 2) {
            newErrors.fullName = 'Name must be at least 2 characters'
        }

        if (!formData.email) {
            newErrors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address'
        }

        if (!formData.subject) {
            newErrors.subject = 'Subject is required'
        }

        if (!formData.message) {
            newErrors.message = 'Message is required'
        } else if (formData.message.length < 10) {
            newErrors.message = 'Message must be at least 10 characters'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setIsLoading(true)

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500))
            console.log('Contact form submitted:', formData)
            setIsSuccess(true)
            setFormData({
                fullName: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            })
            setTimeout(() => setIsSuccess(false), 5000)
        } catch (error) {
            console.error('Contact error:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }
    }

    const contactMethods = [
        {
            icon: Headphones,
            title: 'Customer Support',
            description: 'We\'re here to help 24/7',
            details: '+234 800 ZURIPAY',
            link: 'tel:+2348009874729',
            color: '#C9A24B'
        },
        {
            icon: Mail,
            title: 'Email Us',
            description: 'We\'ll respond within 24 hours',
            details: 'support@zuripay.com',
            link: 'mailto:support@zuripay.com',
            color: '#6C5CE7'
        },
        {
            icon: MapPin,
            title: 'Visit Us',
            description: 'Come say hello',
            details: 'Lagos, Nigeria',
            link: '#',
            color: '#34D399'
        },
    ]

    const faqs = [
        {
            question: 'How do I create a ZuriPay account?',
            answer: 'Click on the "Get Started" button or "Sign Up" link, fill in your details, verify your email, and you\'re ready to go!'
        },
        {
            question: 'Is ZuriPay licensed by the CBN?',
            answer: 'Yes! ZuriPay is fully licensed and regulated by the Central Bank of Nigeria. Your funds and data are secure.'
        },
        {
            question: 'How long does it take to pay a bill?',
            answer: 'Bill payments are processed instantly. You\'ll receive a confirmation notification immediately after payment.'
        },
        {
            question: 'What payment methods do you support?',
            answer: 'We support bank transfers, debit cards, and wallet funding from all Nigerian banks.'
        },
    ]

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

                <div className="relative max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 text-[0.78rem] tracking-wide uppercase text-[#C9A24B] mb-4">
              <span className="h-px w-6 bg-[#C9A24B]" />
              Contact Us
            </span>
                        <h1
                            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
                            style={{ fontFamily: "'Fraunces', serif" }}
                        >
                            We'd Love to Hear
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A24B] to-[#6C5CE7]">
                From You
              </span>
                        </h1>
                        <p className="mt-4 text-lg text-[#C7C9DC] max-w-2xl mx-auto">
                            Have questions, feedback, or just want to say hello? Reach out to us and we'll get back to you as soon as possible.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Methods */}
            <section className="px-6 lg:px-10 py-16 border-b border-white/[0.06]">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {contactMethods.map((method) => {
                            const Icon = method.icon
                            return (
                                <a
                                    key={method.title}
                                    href={method.link}
                                    className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 text-center hover:bg-white/[0.06] transition-all duration-200 group"
                                >
                                    <div className="flex justify-center mb-4">
                                        <div className="p-4 rounded-full bg-white/[0.05]" style={{ color: method.color }}>
                                            <Icon className="w-8 h-8" />
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-semibold group-hover:text-[#C9A24B] transition-colors">
                                        {method.title}
                                    </h3>
                                    <p className="text-sm text-[#7E81A0] mt-1">{method.description}</p>
                                    <p className="text-sm font-medium mt-2 text-[#C9A24B]">{method.details}</p>
                                </a>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Contact Form & Map */}
            <section className="px-6 lg:px-10 py-16 border-b border-white/[0.06]">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div>
              <span className="text-[0.78rem] tracking-wide uppercase text-[#C9A24B] flex items-center gap-2">
                <Send className="w-4 h-4" />
                Send a Message
              </span>
                            <h2
                                className="text-2xl lg:text-3xl font-bold mt-4 mb-6"
                                style={{ fontFamily: "'Fraunces', serif" }}
                            >
                                Get in Touch
                            </h2>

                            {isSuccess && (
                                <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-green-500 font-medium">Message sent successfully!</p>
                                        <p className="text-sm text-[#7E81A0]">We'll get back to you within 24 hours.</p>
                                    </div>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="fullName" className="block text-sm font-medium text-[#C7C9DC] mb-1.5">
                                        Full Name *
                                    </label>
                                    <input
                                        id="fullName"
                                        name="fullName"
                                        type="text"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2.5 bg-white/[0.05] border rounded-xl text-[#F7F7FA] placeholder-[#7E81A0] focus:outline-none focus:ring-2 transition-all duration-200 text-sm ${
                                            errors.fullName
                                                ? 'border-red-500 focus:ring-red-500/50'
                                                : 'border-white/10 focus:ring-[#C9A24B]/50 focus:border-[#C9A24B]'
                                        }`}
                                        placeholder="John Doe"
                                    />
                                    {errors.fullName && (
                                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                                            <AlertCircle className="h-3.5 w-3.5" />
                                            {errors.fullName}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-[#C7C9DC] mb-1.5">
                                        Email Address *
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2.5 bg-white/[0.05] border rounded-xl text-[#F7F7FA] placeholder-[#7E81A0] focus:outline-none focus:ring-2 transition-all duration-200 text-sm ${
                                            errors.email
                                                ? 'border-red-500 focus:ring-red-500/50'
                                                : 'border-white/10 focus:ring-[#C9A24B]/50 focus:border-[#C9A24B]'
                                        }`}
                                        placeholder="you@example.com"
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                                            <AlertCircle className="h-3.5 w-3.5" />
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-[#C7C9DC] mb-1.5">
                                        Phone Number (Optional)
                                    </label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 bg-white/[0.05] border border-white/10 rounded-xl text-[#F7F7FA] placeholder-[#7E81A0] focus:outline-none focus:ring-2 focus:ring-[#C9A24B]/50 focus:border-[#C9A24B] transition-all duration-200 text-sm"
                                        placeholder="08012345678"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-[#C7C9DC] mb-1.5">
                                        Subject *
                                    </label>
                                    <input
                                        id="subject"
                                        name="subject"
                                        type="text"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2.5 bg-white/[0.05] border rounded-xl text-[#F7F7FA] placeholder-[#7E81A0] focus:outline-none focus:ring-2 transition-all duration-200 text-sm ${
                                            errors.subject
                                                ? 'border-red-500 focus:ring-red-500/50'
                                                : 'border-white/10 focus:ring-[#C9A24B]/50 focus:border-[#C9A24B]'
                                        }`}
                                        placeholder="How can we help?"
                                    />
                                    {errors.subject && (
                                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                                            <AlertCircle className="h-3.5 w-3.5" />
                                            {errors.subject}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-[#C7C9DC] mb-1.5">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="4"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2.5 bg-white/[0.05] border rounded-xl text-[#F7F7FA] placeholder-[#7E81A0] focus:outline-none focus:ring-2 transition-all duration-200 text-sm resize-none ${
                                            errors.message
                                                ? 'border-red-500 focus:ring-red-500/50'
                                                : 'border-white/10 focus:ring-[#C9A24B]/50 focus:border-[#C9A24B]'
                                        }`}
                                        placeholder="Write your message here..."
                                    />
                                    {errors.message && (
                                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                                            <AlertCircle className="h-3.5 w-3.5" />
                                            {errors.message}
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`w-full py-3 rounded-xl bg-[#F7F7FA] text-[#0F1229] font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                                        isLoading
                                            ? 'opacity-70 cursor-not-allowed'
                                            : 'hover:bg-[#C9A24B] hover:scale-[1.02] active:scale-[0.98]'
                                    }`}
                                >
                                    {isLoading ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Send Message
                                            <Send className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Info Side */}
                        <div>
                            <div className="space-y-6">
                                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                        <Clock className="w-5 h-5 text-[#C9A24B]" />
                                        Business Hours
                                    </h3>
                                    <div className="space-y-2 text-sm text-[#C7C9DC]">
                                        <div className="flex justify-between">
                                            <span>Monday - Friday</span>
                                            <span>9:00 AM - 6:00 PM</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Saturday</span>
                                            <span>10:00 AM - 4:00 PM</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Sunday</span>
                                            <span className="text-[#7E81A0]">Closed</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                        <MessageCircle className="w-5 h-5 text-[#C9A24B]" />
                                        Quick Responses
                                    </h3>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex items-start gap-3 text-[#C7C9DC]">
                                            <span className="text-[#C9A24B]">•</span>
                                            <span>Average response time: <strong>24 hours</strong></span>
                                        </div>
                                        <div className="flex items-start gap-3 text-[#C7C9DC]">
                                            <span className="text-[#C9A24B]">•</span>
                                            <span>Support languages: <strong>English, Pidgin</strong></span>
                                        </div>
                                        <div className="flex items-start gap-3 text-[#C7C9DC]">
                                            <span className="text-[#C9A24B]">•</span>
                                            <span>We reply to all messages within <strong>1 business day</strong></span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                        <Users className="w-5 h-5 text-[#C9A24B]" />
                                        Connect With Us
                                    </h3>
                                    <div className="flex gap-3">
                                        <a
                                            href="#"
                                            className="p-3 rounded-xl bg-white/[0.05] border border-white/10 text-[#7E81A0] hover:text-[#1877F2] hover:bg-[#1877F2]/10 hover:border-[#1877F2]/30 transition-all duration-200"
                                            aria-label="Facebook"
                                        >
                                            <FaFacebook className="w-5 h-5" />
                                        </a>
                                        <a
                                            href="#"
                                            className="p-3 rounded-xl bg-white/[0.05] border border-white/10 text-[#7E81A0] hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10 hover:border-[#1DA1F2]/30 transition-all duration-200"
                                            aria-label="Twitter"
                                        >
                                            <FaTwitter className="w-5 h-5" />
                                        </a>
                                        <a
                                            href="#"
                                            className="p-3 rounded-xl bg-white/[0.05] border border-white/10 text-[#7E81A0] hover:text-[#E4405F] hover:bg-[#E4405F]/10 hover:border-[#E4405F]/30 transition-all duration-200"
                                            aria-label="Instagram"
                                        >
                                            <FaInstagram className="w-5 h-5" />
                                        </a>
                                        <a
                                            href="#"
                                            className="p-3 rounded-xl bg-white/[0.05] border border-white/10 text-[#7E81A0] hover:text-[#FF0000] hover:bg-[#FF0000]/10 hover:border-[#FF0000]/30 transition-all duration-200"
                                            aria-label="YouTube"
                                        >
                                            <FaYoutube className="w-5 h-5" />
                                        </a>
                                        <a
                                            href="#"
                                            className="p-3 rounded-xl bg-white/[0.05] border border-white/10 text-[#7E81A0] hover:text-[#0A66C2] hover:bg-[#0A66C2]/10 hover:border-[#0A66C2]/30 transition-all duration-200"
                                            aria-label="LinkedIn"
                                        >
                                            <FaLinkedin className="w-5 h-5" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQs */}
            <section className="px-6 lg:px-10 py-16 border-b border-white/[0.06]">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
            <span className="text-[0.78rem] tracking-wide uppercase text-[#C9A24B] flex items-center justify-center gap-2">
              <FileText className="w-4 h-4" />
              FAQs
            </span>
                        <h2
                            className="text-3xl lg:text-4xl font-bold mt-4"
                            style={{ fontFamily: "'Fraunces', serif" }}
                        >
                            Frequently Asked Questions
                        </h2>
                        <p className="text-[#7E81A0] mt-2">Quick answers to common questions</p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.06] transition-colors">
                                <h3 className="text-lg font-semibold mb-2 text-[#F7F7FA]">
                                    {faq.question}
                                </h3>
                                <p className="text-sm text-[#C7C9DC] leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-8">
                        <p className="text-sm text-[#7E81A0]">
                            Still have questions?{' '}
                            <Link to="/auth/signup" className="text-[#C9A24B] hover:text-[#D4B35C] transition-colors font-medium">
                                Reach out to us
                            </Link>
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-6 lg:px-10 py-16">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="bg-gradient-to-r from-[#6C5CE7]/10 to-[#C9A24B]/10 rounded-3xl p-12 border border-white/10">
                        <Building className="w-16 h-16 text-[#C9A24B] mx-auto mb-4" />
                        <h2
                            className="text-3xl lg:text-4xl font-bold mb-4"
                            style={{ fontFamily: "'Fraunces', serif" }}
                        >
                            Let's Build Something Amazing
                        </h2>
                        <p className="text-[#C7C9DC] max-w-md mx-auto mb-8">
                            Have a partnership idea or want to collaborate? We'd love to hear from you.
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

export default Contact