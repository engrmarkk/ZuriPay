// components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom'
import { useToastActions } from '../hooks/useToastActions.js'
import { useEffect, useRef } from "react";

const ProtectedRoute = ({ children }) => {
    const toast = useToastActions()
    const isAuthenticated = localStorage.getItem('accessData')

    const hasShownToast = useRef(false)

    // const isAuthenticated = true
    console.log(`isAuthenticated: ${isAuthenticated}`)
    const isFromLogout = sessionStorage.getItem('isLoggingOut') === 'true'

    if (!isAuthenticated) {
        useEffect(() => {
            if (!hasShownToast.current && !isFromLogout) {
                toast.showError("You need to be logged in to access this page.")
                hasShownToast.current = true
            }
            sessionStorage.removeItem('isLoggingOut')
        }, [])
        return <Navigate to="/auth/login" replace />
    }
    hasShownToast.current = false

    return children
}

export default ProtectedRoute
