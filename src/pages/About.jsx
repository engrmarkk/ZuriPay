import React from 'react'
import { Link } from 'react-router-dom'
import {
    Zap,
    Shield,
    Users,
    Globe,
    Award,
    Heart,
    CheckCircle,
    ArrowRight,
    Clock,
    Smartphone,
    Lock,
    TrendingUp,
    Wallet,
    Send,
    Star,
    Sparkles,
    Target,
    Eye,
    Lightbulb,
    Handshake,
    Rocket,
    Coffee,
    Mail,
    Phone,
    MapPin,
} from 'lucide-react'

// Social icons from React Icons
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa'

const About = () => {
    const stats = [
        { value: '500K+', label: 'Active Users', icon: Users },
        { value: '₦2B+', label: 'Transactions Processed', icon: TrendingUp },
        { value: '99.9%', label: 'Uptime', icon: Shield },
        { value: '50+', label: 'Team Members', icon: Heart },
    ]

    const values = [
        {
            title: 'Trust & Transparency',
            description: 'We believe in complete transparency. Every fee, every rate, every policy is clearly communicated upfront.',
            icon: Shield,
            color: '#C9A24B'
        },
        {
            title: 'Customer First',
            description: 'Our customers are at the heart of everything we do. We build products that solve real problems.',
            icon: Heart,
            color: '#EF4444'
        },
        {
            title: 'Innovation',
            description: 'We continuously innovate to bring you the best financial solutions tailored for Nigerians.',
            icon: Lightbulb,
            color: '#F59E0B'
        },
        {
            title: 'Security',
            description: 'Your security is our priority. We use bank-grade encryption to protect your data and transactions.',
            icon: Lock,
            color: '#34D399'
        },
        {
            title: 'Integrity',
            description: 'We do the right thing, even when no one is watching. Ethical business is good business.',
            icon: Handshake,
            color: '#6C5CE7'
        },
        {
            title: 'Excellence',
            description: 'We strive for excellence in everything we do. Good is never good enough.',
            icon: Award,
            color: '#EC4899'
        },
    ]

    const team = [
        {
            name: 'Mark Adeyemi',
            role: 'CEO & Co-Founder',
            bio: '15+ years in fintech, former VP at Paystack',
            image: '/team/mark.jpg'
        },
        {
            name: 'Chioma Okafor',
            role: 'CTO & Co-Founder',
            bio: 'Ex-Google engineer, passionate about financial inclusion',
            image: '/team/chioma.jpg'
        },
        {
            name: 'Emeka Nwosu',
            role: 'Head of Product',
            bio: 'Product leader with 10+ years in African fintech',
            image: '/team/emeka.jpg'
        },
        {
            name: 'Sola Adebayo',
            role: 'Head of Operations',
            bio: 'Operations expert, previously at Flutterwave',
            image: '/team/sola.jpg'
        },
    ]

    const milestones = [
        {
            year: '2021',
            title: 'Founded',
            description: 'ZuriPay was founded with a mission to simplify payments for Nigerians'
        },
        {
            year: '2022',
            title: 'First 100K Users',
            description: 'Reached 100,000 active users across Nigeria'
        },
        {
            year: '2023',
            title: 'Licensed by CBN',
            description: 'Obtained full regulatory approval from the Central Bank of Nigeria'
        },
        {
            year: '2024',
            title: '₦2B in Transactions',
            description: 'Processed over ₦2 billion in transactions and bill payments'
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
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                        <div className="lg:max-w-xl">
              <span className="inline-flex items-center gap-2 text-[0.78rem] tracking-wide uppercase text-[#C9A24B] mb-4">
                <span className="h-px w-6 bg-[#C9A24B]" />
                About Us
              </span>
                            <h1
                                className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
                                style={{ fontFamily: "'Fraunces', serif" }}
                            >
                                Building the Future
                                <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A24B] to-[#6C5CE7]">
                  of Payments in Nigeria
                </span>
                            </h1>
                            <p className="mt-4 text-lg text-[#C7C9DC] max-w-md">
                                We're on a mission to make financial services accessible, affordable,
                                and reliable for every Nigerian.
                            </p>
                            <div className="mt-8 flex flex-wrap gap-4">
                                <Link
                                    to="/auth/signup"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F7F7FA] text-[#0F1229] font-medium hover:bg-[#C9A24B] transition-colors duration-200"
                                >
                                    Get Started
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 text-[#F7F7FA] font-medium hover:border-white/40 transition-colors duration-200"
                                >
                                    Contact Us
                                </Link>
                            </div>
                        </div>

                        <div className="relative w-full lg:w-auto">
                            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                                <div className="flex items-center gap-6 mb-6">
                                    <div className="p-4 rounded-2xl bg-[#C9A24B]/10">
                                        <Globe className="w-12 h-12 text-[#C9A24B]" />
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold">🇳🇬</div>
                                        <div className="text-sm text-[#7E81A0]">Proudly Nigerian</div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center p-4 rounded-xl bg-white/[0.03] border border-white/10">
                                        <div className="text-2xl font-bold text-[#C9A24B]">500K+</div>
                                        <div className="text-xs text-[#7E81A0]">Users</div>
                                    </div>
                                    <div className="text-center p-4 rounded-xl bg-white/[0.03] border border-white/10">
                                        <div className="text-2xl font-bold text-[#C9A24B]">50+</div>
                                        <div className="text-xs text-[#7E81A0]">Team</div>
                                    </div>
                                    <div className="text-center p-4 rounded-xl bg-white/[0.03] border border-white/10 col-span-2">
                                        <div className="text-2xl font-bold text-[#C9A24B]">₦2B+</div>
                                        <div className="text-xs text-[#7E81A0]">Transactions</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="px-6 lg:px-10 py-16 border-b border-white/[0.06]">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat) => {
                            const Icon = stat.icon
                            return (
                                <div key={stat.label} className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 text-center hover:bg-white/[0.06] transition-colors">
                                    <Icon className="w-8 h-8 text-[#C9A24B] mx-auto mb-3" />
                                    <div className="text-2xl lg:text-3xl font-bold">{stat.value}</div>
                                    <div className="text-sm text-[#7E81A0] mt-1">{stat.label}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Our Mission */}
            <section className="px-6 lg:px-10 py-16 border-b border-white/[0.06]">
                <div className="max-w-4xl mx-auto text-center">
          <span className="text-[0.78rem] tracking-wide uppercase text-[#C9A24B] flex items-center justify-center gap-2">
            <Target className="w-4 h-4" />
            Our Mission
          </span>
                    <h2
                        className="text-3xl lg:text-4xl font-bold mt-4"
                        style={{ fontFamily: "'Fraunces', serif" }}
                    >
                        Simplifying Financial Services
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A24B] to-[#6C5CE7]">
              for Every Nigerian
            </span>
                    </h2>
                    <p className="mt-6 text-lg text-[#C7C9DC] leading-relaxed">
                        ZuriPay was born from a simple belief: every Nigerian deserves access to
                        fast, secure, and affordable financial services. We're building the
                        infrastructure that makes this possible.
                    </p>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                            <Eye className="w-8 h-8 text-[#C9A24B] mx-auto mb-3" />
                            <h3 className="font-semibold">Our Vision</h3>
                            <p className="text-sm text-[#7E81A0] mt-2">
                                A Nigeria where everyone can manage their finances seamlessly
                            </p>
                        </div>
                        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                            <Lightbulb className="w-8 h-8 text-[#C9A24B] mx-auto mb-3" />
                            <h3 className="font-semibold">Our Approach</h3>
                            <p className="text-sm text-[#7E81A0] mt-2">
                                Simple, innovative solutions designed for the Nigerian market
                            </p>
                        </div>
                        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                            <Heart className="w-8 h-8 text-[#C9A24B] mx-auto mb-3" />
                            <h3 className="font-semibold">Our Promise</h3>
                            <p className="text-sm text-[#7E81A0] mt-2">
                                Reliable, secure, and transparent service every time
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="px-6 lg:px-10 py-16 border-b border-white/[0.06]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
            <span className="text-[0.78rem] tracking-wide uppercase text-[#C9A24B] flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" />
              Our Values
            </span>
                        <h2
                            className="text-3xl lg:text-4xl font-bold mt-4"
                            style={{ fontFamily: "'Fraunces', serif" }}
                        >
                            What Drives Us
                        </h2>
                        <p className="text-[#7E81A0] mt-2">The principles that guide everything we do</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {values.map((value) => {
                            const Icon = value.icon
                            return (
                                <div key={value.title} className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.06] transition-all duration-300 group">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 rounded-xl bg-white/[0.05]" style={{ color: value.color }}>
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-[#F7F7FA] group-hover:text-[#C9A24B] transition-colors">
                                                {value.title}
                                            </h3>
                                            <p className="text-sm text-[#7E81A0] mt-1 leading-relaxed">
                                                {value.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Timeline / Milestones */}
            <section className="px-6 lg:px-10 py-16 border-b border-white/[0.06]">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
            <span className="text-[0.78rem] tracking-wide uppercase text-[#C9A24B] flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" />
              Our Journey
            </span>
                        <h2
                            className="text-3xl lg:text-4xl font-bold mt-4"
                            style={{ fontFamily: "'Fraunces', serif" }}
                        >
                            Milestones
                        </h2>
                    </div>

                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[#C9A24B]/20" />

                        <div className="space-y-8">
                            {milestones.map((milestone, index) => (
                                <div key={milestone.year} className={`relative flex flex-col md:flex-row ${
                                    index % 2 === 0 ? 'md:pr-12' : 'md:pl-12 md:flex-row-reverse'
                                }`}>
                                    {/* Timeline dot */}
                                    <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-[#C9A24B] -translate-x-1/2 mt-1.5" />

                                    <div className={`ml-12 md:ml-0 flex-1 ${
                                        index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                                    }`}>
                                        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.06] transition-colors">
                                            <div className="text-2xl font-bold text-[#C9A24B]" style={{ fontFamily: "'Fraunces', serif" }}>
                                                {milestone.year}
                                            </div>
                                            <h3 className="text-lg font-semibold mt-1">{milestone.title}</h3>
                                            <p className="text-sm text-[#7E81A0] mt-1">{milestone.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="px-6 lg:px-10 py-16 border-b border-white/[0.06]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
            <span className="text-[0.78rem] tracking-wide uppercase text-[#C9A24B] flex items-center justify-center gap-2">
              <Users className="w-4 h-4" />
              Meet the Team
            </span>
                        <h2
                            className="text-3xl lg:text-4xl font-bold mt-4"
                            style={{ fontFamily: "'Fraunces', serif" }}
                        >
                            The People Behind ZuriPay
                        </h2>
                        <p className="text-[#7E81A0] mt-2">Passionate about building the future of payments</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {team.map((member) => (
                            <div key={member.name} className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 text-center hover:bg-white/[0.06] transition-colors group">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#C9A24B] to-[#6C5CE7] mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-[#0F1229]">
                                    {member.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <h3 className="font-semibold group-hover:text-[#C9A24B] transition-colors">
                                    {member.name}
                                </h3>
                                <p className="text-sm text-[#C9A24B]">{member.role}</p>
                                <p className="text-xs text-[#7E81A0] mt-2">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="px-6 lg:px-10 py-16 border-b border-white/[0.06]">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
              <span className="text-[0.78rem] tracking-wide uppercase text-[#C9A24B] flex items-center gap-2">
                <Star className="w-4 h-4" />
                Why Choose Us
              </span>
                            <h2
                                className="text-3xl lg:text-4xl font-bold mt-4"
                                style={{ fontFamily: "'Fraunces', serif" }}
                            >
                                Built for Nigerians,
                                <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A24B] to-[#6C5CE7]">
                  By Nigerians
                </span>
                            </h2>
                            <p className="mt-4 text-[#C7C9DC] leading-relaxed">
                                We understand the unique challenges and opportunities in the Nigerian
                                financial landscape. Our solutions are designed specifically for you.
                            </p>
                            <ul className="mt-6 space-y-3">
                                {[
                                    '100% Nigerian-owned and operated',
                                    'Licensed by the Central Bank of Nigeria',
                                    'Bank-grade security and encryption',
                                    '24/7 customer support in English and Pidgin',
                                    'Designed for the Nigerian market',
                                ].map((item) => (
                                    <li key={item} className="flex items-start gap-3 text-[#C7C9DC]">
                                        <CheckCircle className="w-5 h-5 text-[#C9A24B] flex-shrink-0 mt-0.5" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                                <Shield className="w-8 h-8 text-[#C9A24B] mb-3" />
                                <h3 className="font-semibold">Secure</h3>
                                <p className="text-sm text-[#7E81A0] mt-1">Bank-grade protection</p>
                            </div>
                            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                                <Smartphone className="w-8 h-8 text-[#C9A24B] mb-3" />
                                <h3 className="font-semibold">Simple</h3>
                                <p className="text-sm text-[#7E81A0] mt-1">Easy to use interface</p>
                            </div>
                            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                                <Send className="w-8 h-8 text-[#C9A24B] mb-3" />
                                <h3 className="font-semibold">Fast</h3>
                                <p className="text-sm text-[#7E81A0] mt-1">Instant transactions</p>
                            </div>
                            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                                <Wallet className="w-8 h-8 text-[#C9A24B] mb-3" />
                                <h3 className="font-semibold">Affordable</h3>
                                <p className="text-sm text-[#7E81A0] mt-1">Fair, transparent fees</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Media Section */}
            <section className="px-6 lg:px-10 py-16 border-b border-white/[0.06]">
                <div className="max-w-4xl mx-auto text-center">
          <span className="text-[0.78rem] tracking-wide uppercase text-[#C9A24B] flex items-center justify-center gap-2 mb-4">
            <Globe className="w-4 h-4" />
            Connect With Us
          </span>
                    <h2
                        className="text-3xl lg:text-4xl font-bold mb-6"
                        style={{ fontFamily: "'Fraunces', serif" }}
                    >
                        Follow Our Journey
                    </h2>
                    <p className="text-[#C7C9DC] max-w-md mx-auto mb-8">
                        Stay updated with the latest news, features, and updates from ZuriPay
                    </p>

                    <div className="flex justify-center gap-4 flex-wrap">
                        <a
                            href="#"
                            className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-[#1877F2]/10 hover:border-[#1877F2]/30 transition-all duration-200 group"
                            aria-label="Facebook"
                        >
                            <FaFacebook className="w-8 h-8 text-[#7E81A0] group-hover:text-[#1877F2] transition-colors" />
                        </a>
                        <a
                            href="#"
                            className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-[#1DA1F2]/10 hover:border-[#1DA1F2]/30 transition-all duration-200 group"
                            aria-label="Twitter"
                        >
                            <FaTwitter className="w-8 h-8 text-[#7E81A0] group-hover:text-[#1DA1F2] transition-colors" />
                        </a>
                        <a
                            href="#"
                            className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-[#E4405F]/10 hover:border-[#E4405F]/30 transition-all duration-200 group"
                            aria-label="Instagram"
                        >
                            <FaInstagram className="w-8 h-8 text-[#7E81A0] group-hover:text-[#E4405F] transition-colors" />
                        </a>
                        <a
                            href="#"
                            className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-[#FF0000]/10 hover:border-[#FF0000]/30 transition-all duration-200 group"
                            aria-label="YouTube"
                        >
                            <FaYoutube className="w-8 h-8 text-[#7E81A0] group-hover:text-[#FF0000] transition-colors" />
                        </a>
                        <a
                            href="#"
                            className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-[#0A66C2]/10 hover:border-[#0A66C2]/30 transition-all duration-200 group"
                            aria-label="LinkedIn"
                        >
                            <FaLinkedin className="w-8 h-8 text-[#7E81A0] group-hover:text-[#0A66C2] transition-colors" />
                        </a>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-6 lg:px-10 py-16">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="bg-gradient-to-r from-[#6C5CE7]/10 to-[#C9A24B]/10 rounded-3xl p-12 border border-white/10">
                        <Coffee className="w-16 h-16 text-[#C9A24B] mx-auto mb-4" />
                        <h2
                            className="text-3xl lg:text-4xl font-bold mb-4"
                            style={{ fontFamily: "'Fraunces', serif" }}
                        >
                            Ready to Join Us?
                        </h2>
                        <p className="text-[#C7C9DC] max-w-md mx-auto mb-8">
                            Be part of the financial revolution. Join thousands of Nigerians using ZuriPay.
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

export default About