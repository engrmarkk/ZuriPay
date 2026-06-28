// components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom'

const UnProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('accessData')
    // const isAuthenticated = true
    console.log(`isAuthenticated: ${isAuthenticated}`)

    if (isAuthenticated) {
        return <Navigate to="/account/dashboard" replace />
    }

    return children
}

export default UnProtectedRoute
