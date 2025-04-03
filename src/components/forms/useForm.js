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
    const getForm = form
    return {
        getForm,
        handleInputChange
    }
}

export default useForm