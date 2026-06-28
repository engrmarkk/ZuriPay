import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    return (
        <div className="min-h-screen bg-[#0F1229]">
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            <div className="lg:ml-64">
                <Topbar toggleSidebar={toggleSidebar} />
                <main className="p-4 md:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default DashboardLayout