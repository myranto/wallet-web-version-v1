import React, { useEffect, useState } from 'react'
import useNotification from '../../../components/notification/useNotification'
import { TypeOperationOP } from '../../../classes/metier/TypeOperationOP'
import { AccTypeOP } from '../../../classes/metier/AccTypeOP'
import { TypeChargeOP } from '../../../classes/metier/TypeChargeOP'
import { ChargeOP } from '../../../classes/metier/ChargeOP'
import useForm from '../../../components/forms/useForm'
import { convertDtoToItems } from '../../../utils/function'
import { Card, CardContent, Typography } from '@mui/material'
import Notification from '../../../components/notification/Notification'
import ListCharge from './ListCharge'
import FormContainer from '../../../components/forms/FormContainer'

const Charge = () => {
  const handleOperation = useNotification()
  const [loading, setLoading] = useState(false)
  const [refresh, setRefresh] = useState(0)

  const [account, setAccount] = useState(null)
  const [operation, setOperation] = useState(null)
  const [tcharge, setTcharge] = useState(null)

  const operationOP = new TypeOperationOP()
  const acctype = new AccTypeOP()
  const typeChargeOp = new TypeChargeOP()
  const chargeOP = new ChargeOP()
  const initForm = {
    customer_id: 'CUS00004',
    start_date: '',
    end_date: '',
    amount: '',
    account_id: '',
    type_charge: '',
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
    typeChargeOp
      .findAll()
      .then((data) => {

        setTcharge(convertDtoToItems(data?.data));
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
    { name: 'type_charge', libelle: 'Type de charge:', type: 'select', normal: false, items: tcharge },
    { name: 'operation_id', libelle: 'Type d\'opération:', type: 'select', normal: false, items: operation },
    { name: 'start_date', libelle: 'Date début :', type: 'datetime-local', normal: true },
    { name: 'end_date', libelle: 'Date fin :', type: 'datetime-local', normal: true },
  ];
  const submit = (e) => {
    e.preventDefault()
    console.log(forms.getForm)
    setLoading(true)
    chargeOP.create(forms.getForm)
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

    <Card sx={{ maxWidth: '100vw' }}>
      <CardContent sx={{ overflowY: 'hidden' }}>
        <Typography variant='h3' padding={2}>Page charge</Typography>
        <FormContainer btnLibelle={'Valider'}
          form={forms.getForm}
          handleInputChange={forms.handleInputChange}
          loading={loading}
          namefield={namefield}
          submit={submit}
          variant={'outlined'}
        />
        <hr></hr>
        <ListCharge chargeOP={chargeOP} handleResponse={handleOperation.handleResponse} refresh={refresh} setRefresh={setRefresh} nameFields={namefield} />
        {handleOperation.getNotif && <Notification message={handleOperation.getMessage} success={handleOperation.getSuccess} setNotif={handleOperation.resetNotif} notif={handleOperation.getNotif} />}
      </CardContent>
    </Card>
  )
}

export default Charge