import React, { useState } from 'react'
import useNotification from '../../../components/notification/useNotification'
import { TypeChargeOP } from '../../../classes/metier/TypeChargeOP'
import useForm from '../../../components/forms/useForm'
import { Card, CardContent, Typography } from '@mui/material'
import Notification from '../../../components/notification/Notification'
import ListTypeCharge from './ListTypeCharge'
import FormContainer from '../../../components/forms/FormContainer'

const TypeCharge = () => {
  const handleOperation = useNotification()
  const [loading, setLoading] = useState(false)
  const [refresh, setRefresh] = useState(0)
  const typeChargeOp = new TypeChargeOP()
  const initForm = {
    libelle: '',
    code: '',
    creationdate: ''
  }
  const namefield = [
    { name: 'libelle', libelle: 'Type de charge :', type: 'text', normal: true },
    { name: 'code', libelle: 'Accronyme :', type: 'text', normal: true },
    { name: 'creationdate', libelle: 'Date création :', type: 'datetime-local', normal: true },
  ];
  const forms = useForm(initForm)

  const submit = (e) => {
    e.preventDefault()
    console.log(forms.getForm)
    setLoading(true)
    typeChargeOp.create(forms.getForm)
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
          <Typography variant='h3' padding={2}>Page type charge</Typography>
          
          <FormContainer btnLibelle={'Valider'}
                    form={forms.getForm}
                    handleInputChange={forms.handleInputChange}
                    loading={loading}
                    namefield={namefield}
                    submit={submit}
                    variant={'outlined'}
                />
          <hr></hr>
          <ListTypeCharge typeChargeOp={typeChargeOp} handleResponse={handleOperation.handleResponse} refresh={refresh} setRefresh={setRefresh} nameFields={namefield} />
          {handleOperation.getNotif && <Notification message={handleOperation.getMessage} success={handleOperation.getSuccess} setNotif={handleOperation.resetNotif} notif={handleOperation.getNotif} />}
        </CardContent>
      </Card>
    </>
  )
}

export default TypeCharge