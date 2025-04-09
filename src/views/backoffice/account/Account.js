import React, { useEffect, useState } from 'react'
import useNotification from '../../../components/notification/useNotification'
import useForm from '../../../components/forms/useForm'
import { Box, Typography } from '@mui/material'
import FormSimple from '../../../components/forms/FormSimple'
import MButton from '../../../components/forms/MButton'
import Notification from '../../../components/notification/Notification'
import ListAccount from './ListAccount'
import { convertDtoToItems } from '../../../utils/function'
import { AccountOP } from '../../../classes/metier/AccountOP'
import { AccTypeOP } from '../../../classes/metier/AccTypeOP'

const Account = () => {
    const handleOperation = useNotification()
    const [loading, setLoading] = useState(false)
    const [refresh, setRefresh] = useState(0)
    const [type, setType] = useState(null)

    const accountOP = new AccountOP()
    const acctype = new AccTypeOP()
    const initForm = {
        currentamount: '',
        dateamount: '',
        customer_id: 'CUS00004',
        type_id: ''
    }
    useEffect(() => {
        acctype
            .findAll()
            .then((data) => {
                setType(convertDtoToItems(data?.data));
            })
            .catch((error) => {
                // handleResponse(false, error.message)
                setLoading(false)
                console.log(error)
            });
    }, [])
    const forms = useForm(initForm)
    const namefield = [
        { name: 'currentamount', libelle: 'Solde :', type: 'number', normal: true },
        { name: 'type_id', libelle: 'Type de compte :', type: 'select', normal: false, items: type },
        { name: 'dateamount', libelle: 'Date solde :', type: 'datetime-local', normal: true },
    ];
    const submit = (e) => {
        e.preventDefault()
        console.log(forms.getForm)
        setLoading(true)
        accountOP.create(forms.getForm)
            .then((data) => {
                setLoading(false)
                handleOperation.handleResponse(true, 'Création réussi!')
                forms.resetForm()
                setRefresh(prev => prev + 1)
            })
            .catch((error) => {
                setLoading(false)
                console.log(error);
                handleOperation.handleResponse(false, error.message)
            })
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
            <ListAccount accountOP={accountOP} handleResponse={handleOperation.handleResponse} refresh={refresh} setRefresh={setRefresh} nameFields={namefield} />
            {handleOperation.getNotif && <Notification message={handleOperation.getMessage} success={handleOperation.getSuccess} setNotif={handleOperation.resetNotif} notif={handleOperation.getNotif} />}
        </>
    )
}

export default Account