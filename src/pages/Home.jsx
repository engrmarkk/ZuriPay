import { Link } from 'react-router-dom'
import {
    ArrowRight,
    Zap,
    TrendingUp,
    Shield,
    Globe,
    CreditCard,
    Smartphone,
    Zap as Electricity,
    Wifi,
    Tv,
    CheckCircle,
    Wallet,
    Send,
    Users,
    Clock,
    BarChart3
} from 'lucide-react'

const stats = [
    { value: '₦2.4B+', label: 'Moved through ZuriPay last year', icon: TrendingUp },
    { value: '500K+', label: 'Active Nigerian users', icon: Users },
    { value: '99.99%', label: 'Platform uptime, audited quarterly', icon: CheckCircle },
]

const features = [
    {
        title: 'Instant Settlement',
        body: 'Funds clear in seconds, not days. Built on real-time rails, not batch jobs.',
        icon: Zap,
    },
    {
        title: 'Airtime & Data',
        body: 'Buy MTN, Glo, Airtel, and 9mobile airtime & data bundles instantly with zero stress.',
        icon: Smartphone,
    },
    {
        title: 'Electricity Bills',
        body: 'Pay Ikeja Electric, Eko Electric, Abuja DISCO, and all other PHCN/Disco providers seamlessly.',
        icon: Electricity,
    },
    {
        title: 'TV Subscriptions',
        body: 'Renew your DStv, GOtv, Startimes, and other cable TV subscriptions in seconds.',
        icon: Tv,
    },
    {
        title: 'Transparent Pricing',
        body: 'One rate, shown before you confirm. No spread games, no hidden fees.',
        icon: Shield,
    },
    {
        title: 'Built for Scale',
        body: 'From a first transfer to a thousand a day, the same rails carry you.',
        icon: BarChart3,
    },
]

const Home = () => {
    return (
        <div className="text-[#F7F7FA] overflow-hidden">
            {/* HERO */}
            <section className="relative pt-36 pb-28 px-6 lg:px-10">
                <div
                    className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full opacity-30 blur-3xl"
                />

                <div className="relative max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
                    <div>
                        <span className="inline-flex items-center gap-2 text-[0.78rem] tracking-wide uppercase text-[#C9A24B] mb-6">
                            <span className="h-px w-6 bg-[#C9A24B]" />
                            Regulated &middot; Real-time &middot; Nigeria
                        </span>

                        <h1
                            className="text-[2.75rem] sm:text-[3.5rem] lg:text-[4.1rem] leading-[1.05] tracking-tight"
                            style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
                        >
                            Money that moves
                            <br />
                            <span className="text-yellow-500 bg-clip-text bg-gradient-to-r from-[#C9A24B] to-[#6C5CE7]">
                                at the speed of trust.
                            </span>
                        </h1>

                        <p className="mt-7 text-[1.05rem] text-[#C7C9DC] max-w-md leading-relaxed">
                            ZuriPay gives Nigerians one platform for every payment, payout,
                            and bill &mdash; settled instantly, priced honestly, audited
                            continuously.
                        </p>

                        <div className="mt-9 flex flex-wrap items-center gap-4">
                            <Link
                                to="/signup"
                                className="px-7 py-3.5 rounded-full bg-[#F7F7FA] text-[#0F1229] font-medium text-[0.95rem] hover:bg-[#C9A24B] transition-colors duration-200 inline-flex items-center gap-2"
                            >
                                Open an account
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link
                                to="/contact"
                                className="px-7 py-3.5 rounded-full border border-white/15 text-[#F7F7FA] font-medium text-[0.95rem] hover:border-white/40 transition-colors duration-200"
                            >
                                Talk to sales
                            </Link>
                        </div>

                        <p className="mt-6 text-[0.8rem] text-[#7E81A0] flex items-center gap-2">
                            <Wallet className="w-4 h-4" />
                            No card required &middot; Live in under 10 minutes
                        </p>
                    </div>

                    {/* Phone Image - Replacing the ledger line */}
                    <div className="relative flex justify-center items-center">
                        {/* Ambient glow behind phone */}
                        <div
                            className="absolute -inset-10 rounded-full opacity-40 blur-2xl"
                            style={{
                                background: 'radial-gradient(circle, #C9A24B 0%, transparent 70%)',
                            }}
                        />

                        {/* Floating elements around phone */}
                        <div className="absolute -top-8 -right-8 animate-float-slow">
                            <div className="p-3 rounded-full bg-[#34D399]/10 border border-[#34D399]/20">
                                <Send className="w-5 h-5 text-[#34D399]" />
                            </div>
                        </div>
                        <div className="absolute -bottom-8 -left-8 animate-float">
                            <div className="p-3 rounded-full bg-[#6C5CE7]/10 border border-[#6C5CE7]/20">
                                <CheckCircle className="w-5 h-5 text-[#6C5CE7]" />
                            </div>
                        </div>
                        <div className="absolute top-1/2 -left-12 -translate-y-1/2 animate-float-slower">
                            <div className="p-2 rounded-full bg-[#C9A24B]/10 border border-[#C9A24B]/20">
                                <Zap className="w-4 h-4 text-[#C9A24B]" />
                            </div>
                        </div>
                        <div className="absolute top-1/3 -right-10 animate-float">
                            <div className="p-2 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/20">
                                <Shield className="w-4 h-4 text-[#F59E0B]" />
                            </div>
                        </div>

                        {/* Phone Image */}
                        <img
                            src="/phon.png"
                            alt="ZuriPay Mobile App"
                            className="relative w-[280px] sm:w-[320px] lg:w-[400px] h-auto object-contain drop-shadow-2xl"
                            style={{
                                filter: 'drop-shadow(0 20px 60px rgba(201, 162, 75, 0.15))'
                            }}
                        />

                        {/* Glow reflection on phone */}
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background: 'linear-gradient(135deg, rgba(201, 162, 75, 0.05) 0%, transparent 50%, rgba(108, 92, 231, 0.05) 100%)',
                                borderRadius: '48px',
                            }}
                        />
                    </div>
                </div>

                <style>{`
                    @keyframes drawLine {
                        to { stroke-dashoffset: 0; }
                    }
                    @keyframes float {
                        0%, 100% { transform: translateY(0px); }
                        50% { transform: translateY(-10px); }
                    }
                    @keyframes float-slow {
                        0%, 100% { transform: translateY(0px); }
                        50% { transform: translateY(-15px); }
                    }
                    @keyframes float-slower {
                        0%, 100% { transform: translateY(0px); }
                        50% { transform: translateY(-8px); }
                    }
                    .animate-float {
                        animation: float 3s ease-in-out infinite;
                    }
                    .animate-float-slow {
                        animation: float-slow 4s ease-in-out infinite;
                    }
                    .animate-float-slower {
                        animation: float-slower 5s ease-in-out infinite;
                    }
                    @media (prefers-reduced-motion: reduce) {
                        * { animation-duration: 0.01ms !important; }
                    }
                `}</style>
            </section>

            {/* STATS */}
            <section className="px-6 lg:px-10 py-16 border-t border-white/[0.06]">
                <div className="max-w-7xl mx-auto grid sm:grid-cols-3 gap-10">
                    {stats.map((s) => (
                        <div key={s.label} className="flex items-start gap-4">
                            <div className="p-3 rounded-lg bg-white/[0.05] border border-white/10">
                                <s.icon className="w-5 h-5 text-[#C9A24B]" />
                            </div>
                            <div>
                                <div
                                    className="text-[2.25rem] text-[#F7F7FA]"
                                    style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
                                >
                                    {s.value}
                                </div>
                                <p className="mt-2 text-[0.9rem] text-[#7E81A0]">{s.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* FEATURES */}
            <section className="px-6 lg:px-10 py-24 border-t border-white/[0.06]">
                <div className="max-w-7xl mx-auto">
                    <div className="max-w-xl mb-14">
                        <span className="text-[0.78rem] tracking-wide uppercase text-[#C9A24B] flex items-center gap-2">
                            <Globe className="w-4 h-4" />
                            Why Nigerians choose ZuriPay
                        </span>
                        <h2
                            className="mt-4 text-[2rem] sm:text-[2.5rem] leading-tight"
                            style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
                        >
                            Infrastructure that earns trust quietly.
                        </h2>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
                        {features.map((f) => (
                            <div
                                key={f.title}
                                className="bg-[#0F1229] p-7 hover:bg-white/[0.03] transition-colors duration-200"
                            >
                                <div className="p-2 rounded-lg bg-white/[0.05] border border-white/10 w-fit mb-4">
                                    <f.icon className="w-5 h-5 text-[#C9A24B]" />
                                </div>
                                <h3 className="text-[1.05rem] font-medium text-[#F7F7FA]">
                                    {f.title}
                                </h3>
                                <p className="mt-3 text-[0.9rem] text-[#9295B3] leading-relaxed">
                                    {f.body}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* BILL PAYMENT HIGHLIGHT */}
            <section className="px-6 lg:px-10 py-24 border-t border-white/[0.06]">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-[0.78rem] tracking-wide uppercase text-[#C9A24B] flex items-center gap-2">
                                <CreditCard className="w-4 h-4" />
                                Pay all your bills
                            </span>
                            <h2
                                className="mt-4 text-[2rem] sm:text-[2.5rem] leading-tight"
                                style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
                            >
                                One app for all your
                                <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A24B] to-[#6C5CE7]">
                                    Nigerian bills
                                </span>
                            </h2>
                            <p className="mt-5 text-[#C7C9DC] leading-relaxed">
                                Say goodbye to multiple apps and long queues. ZuriPay lets you
                                handle all your daily transactions in one place.
                            </p>
                            <ul className="mt-8 space-y-4">
                                {[
                                    'Buy airtime for all networks (MTN, Glo, Airtel, 9mobile)',
                                    'Purchase data bundles for any network',
                                    'Pay electricity bills for all DISCOs nationwide',
                                    'Renew DStv, GOtv, and Startimes subscriptions',
                                    'Send money instantly to any bank in Nigeria'
                                ].map((item) => (
                                    <li key={item} className="flex items-start gap-3 text-[0.95rem] text-[#C7C9DC]">
                                        <CheckCircle className="w-5 h-5 text-[#C9A24B] flex-shrink-0 mt-0.5" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <Link
                                to="/signup"
                                className="mt-10 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#F7F7FA] text-[#0F1229] font-medium hover:bg-[#C9A24B] transition-colors duration-200"
                            >
                                Start paying bills
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                        <div className="relative">
                            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm">
                                <div className="space-y-4">
                                    {[
                                        { icon: Smartphone, label: 'Airtime & Data', color: '#34D399' },
                                        { icon: Electricity, label: 'Electricity Bills', color: '#F59E0B' },
                                        { icon: Tv, label: 'TV Subscriptions', color: '#6C5CE7' },
                                    ].map((service) => (
                                        <div
                                            key={service.label}
                                            className="flex items-center justify-between p-4 rounded-xl border border-white/10 hover:border-white/20 transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-lg bg-white/[0.05]" style={{ color: service.color }}>
                                                    <service.icon className="w-5 h-5" />
                                                </div>
                                                <span className="text-[#F7F7FA]">{service.label}</span>
                                            </div>
                                            <span className="text-[0.8rem] text-[#7E81A0]">pay now →</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="px-6 lg:px-10 py-24 border-t border-white/[0.06]">
                <div className="max-w-4xl mx-auto text-center">
                    <h2
                        className="text-[2.25rem] sm:text-[2.75rem] leading-tight"
                        style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
                    >
                        Ready to move money differently?
                    </h2>
                    <p className="mt-5 text-[#C7C9DC] max-w-md mx-auto">
                        Join thousands of Nigerians using ZuriPay for seamless payments and bills.
                    </p>
                    <Link
                        to="/signup"
                        className="mt-9 inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#F7F7FA] text-[#0F1229] font-medium hover:bg-[#C9A24B] transition-colors duration-200"
                    >
                        Open an account
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default Home