import { useToast } from './useToast'

export const useToastActions = () => {
    const toast = useToast()

    const showSuccess = (message = 'Operation completed successfully! 🎉') => {
        toast.success(message)
    }

    const showError = (message = 'Something went wrong. Please try again.') => {
        toast.error(message)
    }

    const showWarning = (message = 'Please check your input.') => {
        toast.warning(message)
    }

    const showInfo = (message = 'New update available!') => {
        toast.info(message)
    }


    return {
        showSuccess,
        showError,
        showWarning,
        showInfo,
    }
}