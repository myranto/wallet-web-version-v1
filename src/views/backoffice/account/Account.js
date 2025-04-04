import React, { useState } from 'react'
import useNotification from '../../../components/notification/useNotification'
import useForm from '../../../components/forms/useForm'
import { Box, Typography } from '@mui/material'
import FormSimple from '../../../components/forms/FormSimple'
import MButton from '../../../components/forms/MButton'
import Notification from '../../../components/notification/Notification'
import ListAccount from './ListAccount'

const Account = () => {
    const handleOperation = useNotification()
    const [loading, setLoading] = useState(false)
    const initForm = {
        current_amount: '',
        date_amount: '',
        customer_id: '',
        type_id: ''
    }
    const typesItems = [
        { name: 'Courant', value: 'C' },
        { name: 'Epargne', value: 'E' },
    ]
    const forms = useForm(initForm)
    const namefield = [
        { name: 'current_amount', libelle: 'Solde :', type: 'number', normal: true },
        { name: 'date_amount', libelle: 'Date solde :', type: 'date', normal: true },
        { name: 'type_id', libelle: 'Type de compte :', type: 'select', normal: false, items: typesItems },
    ];
    const submit = (e) => {
        e.preventDefault()
        console.log(forms.getForm)
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 300)
    }
    return (
        <>
                <Typography variant='h3' padding={2}>Page compte</Typography>
                <FormSimple variant={'outlined'} fields={namefield} submit={submit} form={forms.getForm} handleInput={forms.handleInputChange} libelle={'Valider'} />
                <Box component={'form'} noValidate sx={{
                    display: 'flex', flexDirection: 'column', width: '100%', padding: 1, alignItems: 'center'
                }}>
                    <MButton submit={submit} width='51%' libelle='Valider' loading={loading} />
                </Box>
                <hr></hr>
                <ListAccount handleResponse={handleOperation.handleResponse} />
                {handleOperation.getNotif && <Notification message={handleOperation.getMessage} success={handleOperation.getSuccess} setNotif={handleOperation.resetNotif} notif={handleOperation.getNotif} />}
        </>
    )
}

export default Account