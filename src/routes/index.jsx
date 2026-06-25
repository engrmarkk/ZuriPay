import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'
import NotFound from '../pages/NotFound'
import Layout from '../components/common/Layout'
import Login from '../pages/authentications/Login'
import Register from '../pages/authentications/Register'
import Bills from '../pages/Bill'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Faq from '../pages/Faq'


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
        element: <Layout />,
        children: [
            { path: 'login', element: <Login /> },
            { path: 'signup', element: <Register /> },
            // { path: 'forgot-password', element: <ForgotPassword /> },
            // { path: 'reset-password', element: <ResetPassword /> },
        ]
    },
    {
        path: '*',
        element: <NotFound />
    }
])