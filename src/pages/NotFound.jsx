import { Link, useNavigate } from 'react-router-dom'

const NotFound = () => {
    // if its logged in, navigate to dashboard if not, to homepage
    const navigate = useNavigate()
    // handle redirect function
    const handleRedirect = () => {
        const isAuthenticated = localStorage.getItem('accessData')
        if (isAuthenticated) {
            navigate('/account/dashboard')
        } else {
            navigate('/')
        }
    }
    return (
        <div className="min-h-screen bg-[#0F1229] text-[#F7F7FA] flex items-center justify-center px-6">
            <div className="text-center max-w-md">
        <span
            className="text-[5rem] sm:text-[6.5rem] leading-none text-transparent bg-clip-text bg-gradient-to-r from-[#C9A24B] to-[#6C5CE7]"
            style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
        >
          404
        </span>

                <svg viewBox="0 0 240 40" className="w-48 mx-auto my-6 opacity-70">
                    <path
                        d="M0,28 C20,28 24,12 44,12 C64,12 68,32 88,32 C108,32 112,8 132,8 C152,8 156,24 176,24 C196,24 200,16 220,16 C228,16 232,20 240,18"
                        fill="none"
                        stroke="#7E81A0"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                    />
                </svg>

                <h1
                    className="text-[1.6rem]"
                    style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
                >
                    This ledger entry doesn't exist.
                </h1>
                <p className="mt-3 text-[0.95rem] text-[#9295B3] leading-relaxed">
                    The page you're looking for was moved, renamed, or never settled.
                    Let's get you back on the rails.
                </p>

                <button
                    onClick={handleRedirect}
                    className="mt-8 inline-block px-7 py-3 rounded-full bg-[#F7F7FA] text-[#0F1229] font-medium text-[0.9rem] hover:bg-[#C9A24B] transition-colors duration-200"
                >
                    Back to home
                </button>
            </div>
        </div>
    )
}

export default NotFound