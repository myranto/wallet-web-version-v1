import { useState } from 'react'

/**
 * Use notification permet de gerer les notification de manière uniformes 
 * sans trop de répétition de code
 */
const useNotification = () => {
    const [message, setMessage] = useState(null)
    const [success, setSuccess] = useState(true)
    const [notif, setNotif] = useState(false)

    const handleResponse = (isSuccess, newMessage) => {
        setMessage(newMessage)
        setNotif(true)
        setSuccess(isSuccess)
    }

    const resetNotif = () => {
        setMessage(null)
        setNotif(false)
    }
    const getSuccess = success
    const getNotif = notif
    const getMessage = message

    return {
        getMessage, getSuccess, getNotif, resetNotif, handleResponse
    }
}

export default useNotification