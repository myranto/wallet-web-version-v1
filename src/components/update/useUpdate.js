import { useState } from "react"

const useUpdate = () =>{
    const [open, setOpen] = useState(false)
    const [body, setBody] = useState(null)
    const handleClick = () => {
        setOpen(!open)
    }
    const openUpdate = (form) => {
        setOpen(true)
        setBody(form)
    }
    const getOpen = open
    const getBody = body
    return {
        getOpen,
        getBody,
        handleClick,
        openUpdate
    }
}
export default useUpdate