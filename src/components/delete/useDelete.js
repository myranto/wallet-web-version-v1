import { useState } from "react"

const useDelete = () => {
    const [open, setOpen] = useState(false)
    const [id, setId] = useState(null)
    const handleClick = () => {
        setOpen(!open)
    }
    const drop = (ids) => {
        handleClick()
        setId(ids)
        console.log(ids);
        
    }
    const getOpen = open
    const getId = id
    
    return {
        getOpen,
        handleClick,
        getId,
        drop
    }

}
export default useDelete