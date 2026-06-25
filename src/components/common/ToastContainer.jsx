import React from 'react'
import { useToast } from '../../context/ToastContext'
import Toast from './Toast'

const ToastContainer = () => {
    const { toasts, removeToast } = useToast()

    return (
        <div className="fixed top-4 right-4 z-50 space-y-3 max-h-screen overflow-hidden pointer-events-none">
            <div className="space-y-3 pointer-events-auto">
                {toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        id={toast.id}
                        message={toast.message}
                        type={toast.type}
                        duration={toast.duration}
                        onClose={removeToast}
                    />
                ))}
            </div>
        </div>
    )
}

export default ToastContainer