import React, { useEffect, useState, useCallback } from 'react'
import { AlertCircle, CheckCircle, XCircle, Info, X } from 'lucide-react'

const Toast = ({ id, message, type = 'info', duration = 5000, onClose }) => {
    const [isVisible, setIsVisible] = useState(false)
    const [isLeaving, setIsLeaving] = useState(false)

    const handleClose = useCallback(() => {
        setIsLeaving(true)
        setTimeout(() => {
            onClose(id)
        }, 300)
    }, [id, onClose])

    useEffect(() => {
        // Trigger entrance animation
        setIsVisible(true)

        // Auto close
        const timer = setTimeout(() => {
            handleClose()
        }, duration)

        return () => clearTimeout(timer)
    }, [duration, handleClose])

    // const handleClose = () => {
    //     setIsLeaving(true)
    //     setTimeout(() => {
    //         onClose(id)
    //     }, 300)
    // }

    const getIcon = () => {
        switch (type) {
            case 'success':
                return <CheckCircle className="w-5 h-5 text-green-500" />
            case 'error':
                return <XCircle className="w-5 h-5 text-red-500" />
            case 'warning':
                return <AlertCircle className="w-5 h-5 text-yellow-500" />
            default:
                return <Info className="w-5 h-5 text-blue-500" />
        }
    }

    const getStyles = () => {
        switch (type) {
            case 'success':
                return 'border-green-500/20 bg-green-500/10'
            case 'error':
                return 'border-red-500/20 bg-red-500/10'
            case 'warning':
                return 'border-yellow-500/20 bg-yellow-500/10'
            default:
                return 'border-blue-500/20 bg-blue-500/10'
        }
    }

    const getTextColor = () => {
        switch (type) {
            case 'success':
                return 'text-green-500'
            case 'error':
                return 'text-red-500'
            case 'warning':
                return 'text-yellow-500'
            default:
                return 'text-blue-500'
        }
    }

    return (
        <div
            className={`transform transition-all duration-300 ${
                isVisible && !isLeaving
                    ? 'translate-x-0 opacity-100'
                    : 'translate-x-full opacity-0'
            }`}
        >
            <div
                className={`relative flex items-start gap-3 p-4 rounded-xl border backdrop-blur-sm ${getStyles()} min-w-[320px] max-w-md shadow-lg`}
            >
                <div className="flex-shrink-0 mt-0.5">
                    {getIcon()}
                </div>

                <p className={`text-sm flex-1 ${getTextColor()}`}>
                    {message}
                </p>

                <button
                    onClick={handleClose}
                    className="flex-shrink-0 text-[#7E81A0] hover:text-[#F7F7FA] transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>

                {/* Progress bar */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-xl overflow-hidden"
                >
                    <div
                        className={`h-full transition-all duration-[${duration}ms] ${
                            type === 'success' ? 'bg-green-500' :
                                type === 'error' ? 'bg-red-500' :
                                    type === 'warning' ? 'bg-yellow-500' :
                                        'bg-blue-500'
                        }`}
                        style={{
                            width: isVisible ? '0%' : '100%',
                            transition: `width ${duration}ms linear`
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Toast