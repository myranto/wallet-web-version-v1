import React, { useEffect, useState } from 'react'
import useNotification from '../../../components/notification/useNotification'
import { AccTypeOP } from '../../../classes/metier/AccTypeOP'
import { TransferOP } from '../../../classes/metier/TransferOP'
import { convertDtoToItems, getProfilStorage } from '../../../utils/function'
import useForm from '../../../components/forms/useForm'
import ListTransfer from './ListTransfer'
import { Card, CardContent, Typography } from '@mui/material'
import Notification from '../../../components/notification/Notification'
import FormContainer from '../../../components/forms/FormContainer'

const Transfer = () => {
    const handleOperation = useNotification()
    const [loading, setLoading] = useState(false)
    const [refresh, setRefresh] = useState(0)
    const [type, setType] = useState(null)

    const acctype = new AccTypeOP()
    const transferOP = new TransferOP()
    const person = getProfilStorage()
    const initForm = {
        customer: person?.id,
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
        { name: 'amount', libelle: 'Montant :', type: 'number', normal: true, validator: { checking: (value) => value < 0, error: 'Montant doit etre supérieur à 0' } },
        { name: 'debit_account', libelle: 'Compte de débit:', type: 'select', normal: false, items: type },
        { name: 'credit_account', libelle: 'Compte de credit:', type: 'select', normal: false, items: type },
        { name: 'start_date', libelle: 'Date début :', type: 'datetime-local', normal: true },
        { name: 'end_date', libelle: 'Date fin :', type: 'datetime-local', normal: true },
    ];
    const submit = (e) => {
        e.preventDefault()
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
            <Card sx={{ maxWidth: '100vw' }}>
                <CardContent sx={{ overflowY: 'hidden' }}>
                    <Typography variant='h3' padding={2}>Page transfert</Typography>
                    <FormContainer btnLibelle={'Valider'}
                        form={forms.getForm}
                        handleInputChange={forms.handleInputChange}
                        loading={loading}
                        namefield={namefield}
                        submit={submit}
                        variant={'outlined'}
                    />
                    <hr></hr>
                    <ListTransfer transferOP={transferOP} handleResponse={handleOperation.handleResponse} refresh={refresh} setRefresh={setRefresh} nameFields={namefield} />
                    {handleOperation.getNotif && <Notification message={handleOperation.getMessage} success={handleOperation.getSuccess} setNotif={handleOperation.resetNotif} notif={handleOperation.getNotif} />}
                </CardContent>
            </Card>
        </>
    )
}

export default Transfer