import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import ToastContainer from './ToastContainer'

const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-[#0F1229]">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
                <Outlet />
            </main>
            <Footer />
            <ToastContainer />
        </div>
    )
}

export default Layout
