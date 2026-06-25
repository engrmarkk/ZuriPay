import { Link, useLocation } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import {Zap} from "lucide-react";

const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/bills', label: 'Bills' },
    { to: '/contact', label: 'Contact' },
]

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false)
    const [open, setOpen] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => setOpen(false), [location])

    return (
        <header
            className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
                scrolled
                    ? 'bg-[#0F1229]/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(255,255,255,0.06)]'
                    : 'bg-transparent'
            }`}
        >
            <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2.5 group">
          <span className="relative flex h-9 w-9 items-center justify-center">
              <Zap className="w-8 h-8 text-[#C9A24B]" />
          </span>
                    <span
                        className="text-[1.35rem] tracking-tight text-[#F7F7FA]"
                        style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
                    >
            ZuriPay
          </span>
                </Link>

                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-9">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className="relative text-[0.925rem] text-[#C7C9DC] hover:text-[#F7F7FA] transition-colors duration-200 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-[#C9A24B] after:transition-all after:duration-300 hover:after:w-full"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* CTA */}
                <div className="hidden md:flex items-center gap-4">
                    <Link
                        to="/auth/login"
                        className="text-[0.925rem] text-[#C7C9DC] hover:text-[#F7F7FA] transition-colors"
                    >
                        Sign in
                    </Link>
                    <Link
                        to="/auth/signup"
                        className="text-[0.9rem] font-medium px-5 py-2.5 rounded-full bg-[#F7F7FA] text-[#0F1229] hover:bg-[#C9A24B] hover:text-[#0F1229] transition-all duration-200 shadow-sm"
                    >
                        Open an account
                    </Link>
                </div>

                {/* Mobile toggle */}
                <button
                    aria-label="Toggle menu"
                    aria-expanded={open}
                    onClick={() => setOpen((v) => !v)}
                    className="md:hidden relative h-9 w-9 flex items-center justify-center rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A24B]"
                >
          <span
              className={`absolute h-px w-5 bg-[#F7F7FA] transition-all duration-300 ${
                  open ? 'rotate-45' : '-translate-y-1.5'
              }`}
          />
                    <span
                        className={`absolute h-px w-5 bg-[#F7F7FA] transition-all duration-300 ${
                            open ? '-rotate-45' : 'translate-y-1.5'
                        }`}
                    />
                </button>
            </nav>

            {/* Mobile menu */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                    open ? 'max-h-96 border-t border-white/10' : 'max-h-0'
                } bg-[#0F1229]/95 backdrop-blur-md`}
            >
                <div className="px-6 py-6 flex flex-col gap-5">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className="text-[0.95rem] text-[#C7C9DC] hover:text-[#F7F7FA] transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                        <Link to="/login" className="text-[0.95rem] text-[#C7C9DC]">
                            Sign in
                        </Link>
                        <Link
                            to="/auth/signup"
                            className="text-center text-[0.9rem] font-medium px-5 py-3 rounded-full bg-[#F7F7FA] text-[#0F1229]"
                        >
                            Open an account
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar