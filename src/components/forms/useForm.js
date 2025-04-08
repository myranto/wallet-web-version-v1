import { useState } from "react";

const useForm = ( initForm ) => {
    const [form, setForm] = useState(initForm)
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setForm({
            ...form,
            [name]: value,
        });
    };
    const resetForm = () =>{
        setForm(initForm)
    }
    const getForm = form
    return {
        getForm,
        resetForm,
        handleInputChange
    }
}

export default useForm