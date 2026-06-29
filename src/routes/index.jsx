import { createBrowserRouter, Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import NotFound from '../pages/NotFound'
import Layout from '../components/common/Layout'
import Login from '../pages/authentications/Login'
import Register from '../pages/authentications/Register'
import VerifyEmail from '../pages/authentications/VerifyEmail.jsx'
import ForgotPassword from '../pages/authentications/ForgotPassword.jsx'
import EmailVerificationStatus from '../pages/authentications/VerificationStatus.jsx'
import Bills from '../pages/Bill'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Faq from '../pages/Faq'
import Dashboard from '../pages/authRequired/Dashboard'
import DashboardLayout from '../components/common/layout/DashboardLayout'
import ProtectedRoute from '../middlewares/ProtectedRoute.jsx'
import UnProtectedRoute from '../middlewares/UnProtectedRoute.jsx'
import Transactions from '../pages/authRequired/Transactions'
import Wallets from '../pages/authRequired/Wallets'
import Profile from '../pages/authRequired/Profile'
import SettingsPage from '../pages/authRequired/Settings'
import ChangePassword from '../pages/authRequired/ChangePassword'
import Transfer from '../pages/authRequired/payment/Transfer'
import Airtime from '../pages/authRequired/payment/bills/Airtime'
import Data from '../pages/authRequired/payment/bills/Data'
import Electricity from '../pages/authRequired/payment/bills/Electricity'
import Cable from '../pages/authRequired/payment/bills/Cable'
import Betting from '../pages/authRequired/payment/bills/Betting'
import Notification from '../pages/authRequired/Notification'
import HelpCenter from '../pages/authRequired/HelpCenter'


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: 'bills', element: <Bills /> },
            { path: 'about', element: <About /> },
            { path: 'contact', element: <Contact /> },
            { path: 'faqs', element: <Faq /> },
        ]
    },
    {
        path: '/auth',
        element: (
            <UnProtectedRoute>
            <Layout />
            </UnProtectedRoute>
        ),
        children: [
            { path: 'login', element: <Login /> },
            { path: 'signup', element: <Register /> },
            { path: 'verify-email/:email', element: <VerifyEmail /> },
            { path: 'forgot-password', element: <ForgotPassword /> },
            { path: 'verify-status', element: <EmailVerificationStatus /> },
            // { path: 'reset-password', element: <ResetPassword /> },
        ]
    },
    {
        path: '*',
        element: <NotFound />
    },
    {
        path: '/account',
        element: (
            <ProtectedRoute>
                <DashboardLayout />
            </ProtectedRoute>
        ),
        children: [
            { index: true, element: <Navigate to="/account/dashboard" replace /> },
            { path: 'dashboard', element: <Dashboard /> },
            { path: 'transactions', element: <Transactions /> },
            { path: 'wallets', element: <Wallets /> },
            { path: 'profile', element: <Profile /> },
            { path: 'notifications', element: <Notification /> },
            { path: 'help', element: <HelpCenter /> },
            {
                path: 'settings',
                children: [
                    { index: true, element: <SettingsPage /> },
                    { path: 'change-password', element: <ChangePassword /> },
                ]
            },
            {
                path: 'pay',
                children: [
                    { index: true, element: <Navigate to="/pay/transfer" replace /> },
                    { path: 'transfer', element: <Transfer /> },
                    { path: 'airtime', element: <Airtime /> },
                    { path: 'data', element: <Data /> },
                    { path: 'electricity', element: <Electricity /> },
                    { path: 'cable', element: <Cable /> },
                    { path: 'betting', element: <Betting /> },
                ]
            },
        ]
    }
])