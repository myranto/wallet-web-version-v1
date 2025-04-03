import { useState } from 'react'

/**
 * Use notification permet de gerer les notification de manière uniformes 
 * sans trop de répétition de code
 */
const useNotification = () => {
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(null)
    const [success, setSuccess] = useState(true)
    const [notif, setNotif] = useState(false)

    const handleResponse = (isSuccess, newMessage) => {
        setLoading(false)
        setMessage(newMessage)
        setNotif(true)
        setSuccess(isSuccess)
    }

    const resetNotif = () => {
        setMessage(null)
        setNotif(false)
    }
    const getSuccess = success
    const getLoading = loading
    const getNotif = notif
    const getMessage = message

    return {
        getLoading, getMessage, getSuccess, getNotif, resetNotif, handleResponse, setLoading
    }
}

export default useNotification