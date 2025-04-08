import React, { useEffect, useState } from 'react'
import useNotification from '../../../components/notification/useNotification'
import { TypeOperationOP } from '../../../classes/metier/TypeOperationOP'
import { convertDtoToItems } from '../../../utils/function'
import { AccTypeOP } from '../../../classes/metier/AccTypeOP'
import { CreditOP } from '../../../classes/metier/CreditOP'
import useForm from '../../../components/forms/useForm'
import { Box, Typography } from '@mui/material'
import FormSimple from '../../../components/forms/FormSimple'
import MButton from '../../../components/forms/MButton'
import Notification from '../../../components/notification/Notification'
import ListCredit from './ListCredit'

const Credit = () => {
    const handleOperation = useNotification()
    const [loading, setLoading] = useState(false)
    const [refresh, setRefresh] = useState(0)
    const [account, setAccount] = useState(null)
    const [operation, setOperation] = useState(null)
    const operationOP = new TypeOperationOP()
    const acctype = new AccTypeOP()
    const creditOP = new CreditOP()
    const initForm = {
        customer_id: 'CUS00004',
        start_date: '',
        end_date: '',
        amount: '',
        account_id: '',
        operation_id: ''
    }
    const forms = useForm(initForm)
    useEffect(() => {
        operationOP
            .findAll()
            .then((data) => {
                setOperation(convertDtoToItems(data?.data));
            })
            .catch((error) => {
                // handleResponse(false, error.message)
                setLoading(false)
                console.log(error)
            });
        acctype
            .findAll()
            .then((data) => {
                setAccount(convertDtoToItems(data?.data));
            })
            .catch((error) => {
                // handleResponse(false, error.message)
                setLoading(false)
                console.log(error)
            });
    }, [])
    const namefield = [
        { name: 'amount', libelle: 'Montant :', type: 'number', normal: true },
        { name: 'account_id', libelle: 'Type de compte :', type: 'select', normal: false, items: account },
        { name: 'operation_id', libelle: 'Type d\'opération:', type: 'select', normal: false, items: operation },
        { name: 'start_date', libelle: 'Date début :', type: 'datetime-local', normal: true },
        { name: 'end_date', libelle: 'Date fin :', type: 'datetime-local', normal: true },
    ];
    const submit = (e) => {
        e.preventDefault()
        console.log(forms.getForm)
        setLoading(true)
        creditOP.create(forms.getForm)
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
        setTimeout(() => {
            setLoading(false)
        }, 300)
    }
    return (
        <>
            <Typography variant='h3' padding={2}>Page crédit</Typography>
            <FormSimple variant={'outlined'} fields={namefield} submit={submit} form={forms.getForm} handleInput={forms.handleInputChange} libelle={'Valider'} />
            <Box component={'form'} noValidate sx={{
                display: 'flex', flexDirection: 'column', width: '100%', padding: 1, alignItems: 'center'
            }}>
                <MButton submit={submit} width='51%' libelle='Valider' loading={loading} />
            </Box>
            <hr></hr>
            <ListCredit handleResponse={handleOperation.handleResponse} account_types={account} operations_type={operation} refresh={refresh} setRefresh={setRefresh} nameFields={namefield} />
            {handleOperation.getNotif && <Notification message={handleOperation.getMessage} success={handleOperation.getSuccess} setNotif={handleOperation.resetNotif} notif={handleOperation.getNotif} />}
        </>
    )
}

export default Credit