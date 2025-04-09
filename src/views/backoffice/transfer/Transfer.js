import React, { useEffect, useState } from 'react'
import useNotification from '../../../components/notification/useNotification'
import { AccTypeOP } from '../../../classes/metier/AccTypeOP'
import { TransferOP } from '../../../classes/metier/TransferOP'
import { convertDtoToItems } from '../../../utils/function'
import useForm from '../../../components/forms/useForm'
import ListTransfer from './ListTransfer'
import MButton from '../../../components/forms/MButton'
import { Box, Typography } from '@mui/material'
import FormSimple from '../../../components/forms/FormSimple'
import Notification from '../../../components/notification/Notification'

const Transfer = () => {
    const handleOperation = useNotification()
    const [loading, setLoading] = useState(false)
    const [refresh, setRefresh] = useState(0)
    const [type, setType] = useState(null)

    const acctype = new AccTypeOP()
    const transferOP = new TransferOP()

    const initForm = {
        customer: 'CUS00004',
        start_date: '',
        end_date: '',
        amount: '',
        debit_account: '',
        credit_account: ''
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
        { name: 'amount', libelle: 'Montant :', type: 'number', normal: true },
        { name: 'debit_account', libelle: 'Compte de débit:', type: 'select', normal: false, items: type },
        { name: 'credit_account', libelle: 'Compte de credit:', type: 'select', normal: false, items: type },
        { name: 'start_date', libelle: 'Date début :', type: 'datetime-local', normal: true },
        { name: 'end_date', libelle: 'Date fin :', type: 'datetime-local', normal: true },
    ];
    const submit = (e) => {
        e.preventDefault()
        console.log(forms.getForm)
        setLoading(true)
        transferOP.create(forms.getForm)
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
            <Typography variant='h3' padding={2}>Page transfert</Typography>
            <FormSimple variant={'outlined'} fields={namefield} submit={submit} form={forms.getForm} handleInput={forms.handleInputChange} libelle={'Valider'} />
            <Box component={'form'} noValidate sx={{
                display: 'flex', flexDirection: 'column', width: '100%', padding: 1, alignItems: 'center'
            }}>
                <MButton submit={submit} width='51%' libelle='Valider' loading={loading} />
            </Box>
            <hr></hr>
            <ListTransfer handleResponse={handleOperation.handleResponse} refresh={refresh} setRefresh={setRefresh} nameFields={namefield} />
            {handleOperation.getNotif && <Notification message={handleOperation.getMessage} success={handleOperation.getSuccess} setNotif={handleOperation.resetNotif} notif={handleOperation.getNotif} />}
        </>
    )
}

export default Transfer