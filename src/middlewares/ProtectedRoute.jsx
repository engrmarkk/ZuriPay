// components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom'
import { useToastActions } from '../hooks/useToastActions.js'
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
    const toast = useToastActions()
    const isAuthenticated = localStorage.getItem('accessData')
    // const isAuthenticated = true
    console.log(`isAuthenticated: ${isAuthenticated}`)

    if (!isAuthenticated) {
        useEffect(() => {
            toast.showError("You need to be logged in to access this page.")
        }, [])
        return <Navigate to="/auth/login" replace />
    }

    return children
}

export default ProtectedRoute
