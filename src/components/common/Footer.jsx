import React from 'react'
import { Link } from 'react-router-dom'
import {
    Zap,
    Mail,
    Phone,
    MapPin,
    Shield,
    CheckCircle,
    ArrowRight,
    Smartphone,
    Tv,
    Wifi,
} from 'lucide-react'

// Social icons from React Icons
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    const quickLinks = [
        { name: 'About Us', path: '/about' },
        { name: 'How It Works', path: '/how-it-works' },
        { name: 'Security', path: '/security' },
        { name: 'Blog', path: '/blog' },
        { name: 'Contact', path: '/contact' },
    ]

    const billServices = [
        { name: 'Airtime & Data', icon: Smartphone },
        { name: 'Electricity Bills', icon: Zap },
        { name: 'TV Subscriptions', icon: Tv },
        { name: 'Internet Data', icon: Wifi },
    ]

    const supportLinks = [
        { name: 'Help Center', path: '/contact' },
        { name: 'FAQs', path: '/faqs' },
        // { name: 'Privacy Policy', path: '/privacy' },
        // { name: 'Terms of Service', path: '/terms' },
        // { name: 'Refund Policy', path: '/refund' },
    ]

    return (
        <footer className="bg-[#0F1229] border-t border-white/[0.06]">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8">

                    {/* Brand Column */}
                    <div className="lg:col-span-1.5">
                        <Link to="/" className="inline-flex items-center gap-2 mb-4">
                            <Zap className="w-8 h-8 text-[#C9A24B]" />
                            <span
                                className="text-2xl font-bold text-[#F7F7FA]"
                                style={{ fontFamily: "'Fraunces', serif" }}
                            >
                ZuriPay
              </span>
                        </Link>
                        <p className="text-[#7E81A0] text-sm leading-relaxed max-w-xs">
                            The easiest way to pay bills, buy airtime, and send money instantly across Nigeria.
                        </p>

                        {/* Social Links - Using React Icons */}
                        <div className="flex gap-3 mt-6">
                            <a
                                href="#"
                                className="p-2 rounded-lg bg-white/[0.05] border border-white/10 text-[#7E81A0] hover:text-[#1877F2] hover:bg-white/[0.1] transition-all duration-200"
                                aria-label="Facebook"
                            >
                                <FaFacebook className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="p-2 rounded-lg bg-white/[0.05] border border-white/10 text-[#7E81A0] hover:text-[#1DA1F2] hover:bg-white/[0.1] transition-all duration-200"
                                aria-label="Twitter"
                            >
                                <FaTwitter className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="p-2 rounded-lg bg-white/[0.05] border border-white/10 text-[#7E81A0] hover:text-[#E4405F] hover:bg-white/[0.1] transition-all duration-200"
                                aria-label="Instagram"
                            >
                                <FaInstagram className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="p-2 rounded-lg bg-white/[0.05] border border-white/10 text-[#7E81A0] hover:text-[#FF0000] hover:bg-white/[0.1] transition-all duration-200"
                                aria-label="YouTube"
                            >
                                <FaYoutube className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-[#F7F7FA] uppercase tracking-wider mb-4">
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-[#7E81A0] hover:text-[#C9A24B] transition-colors duration-200 text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Bill Services */}
                    <div>
                        <h3 className="text-sm font-semibold text-[#F7F7FA] uppercase tracking-wider mb-4">
                            Pay Bills
                        </h3>
                        <ul className="space-y-3">
                            {billServices.map((service) => (
                                <li key={service.name}>
                                    <Link
                                        to="/bills"
                                        className="text-[#7E81A0] hover:text-[#C9A24B] transition-colors duration-200 text-sm inline-flex items-center gap-2"
                                    >
                                        <service.icon className="w-4 h-4" />
                                        {service.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-sm font-semibold text-[#F7F7FA] uppercase tracking-wider mb-4">
                            Support
                        </h3>
                        <ul className="space-y-3">
                            {supportLinks.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-[#7E81A0] hover:text-[#C9A24B] transition-colors duration-200 text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact & Newsletter */}
                    <div>
                        <h3 className="text-sm font-semibold text-[#F7F7FA] uppercase tracking-wider mb-4">
                            Contact Us
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3 text-sm text-[#7E81A0]">
                                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#C9A24B]" />
                                <span>support@zuripay.com</span>
                            </div>
                            <div className="flex items-start gap-3 text-sm text-[#7E81A0]">
                                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#C9A24B]" />
                                <span>+234 800 ZURIPAY</span>
                            </div>
                            <div className="flex items-start gap-3 text-sm text-[#7E81A0]">
                                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#C9A24B]" />
                                <span>Lagos, Nigeria</span>
                            </div>
                        </div>

                        {/* Newsletter */}
                        <div className="mt-6">
                            <p className="text-sm text-[#7E81A0] mb-3">
                                Subscribe to our newsletter
                            </p>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 pr-12 text-[#F7F7FA] placeholder-[#7E81A0] focus:outline-none focus:ring-2 focus:ring-[#C9A24B]/50 focus:border-[#C9A24B] transition-all duration-200 text-sm"
                                />
                                <button className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#C9A24B] hover:text-[#D4B35C] transition-colors">
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/[0.06]">
                <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-4 text-xs text-[#7E81A0]">
                            <span>© {currentYear} ZuriPay Financial Technologies. All rights reserved.</span>
                            <span className="hidden sm:inline">|</span>
                            <div className="flex items-center gap-2">
                                <Shield className="w-3 h-3 text-[#34D399]" />
                                <span>256-bit SSL encrypted</span>
                            </div>
                            <span className="hidden sm:inline">|</span>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-3 h-3 text-[#34D399]" />
                                <span>Licensed by CBN</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 text-xs">
                            <Link to="/privacy" className="text-[#7E81A0] hover:text-[#F7F7FA] transition-colors">
                                Privacy
                            </Link>
                            <Link to="" className="text-[#7E81A0] hover:text-[#F7F7FA] transition-colors">
                                Terms
                            </Link>
                            <Link to="" className="text-[#7E81A0] hover:text-[#F7F7FA] transition-colors">
                                Cookies
                            </Link>
                            <Link to="" className="text-[#7E81A0] hover:text-[#F7F7FA] transition-colors">
                                Sitemap
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer