import React, { useState } from 'react'
import useNotification from '../../../components/notification/useNotification'
import { Card, CardContent, Typography } from '@mui/material'
import Notification from '../../../components/notification/Notification'
import ListAccountType from './ListAccountType'
import useForm from '../../../components/forms/useForm'
import { AccTypeOP } from '../../../classes/metier/AccTypeOP'
import FormContainer from '../../../components/forms/FormContainer'

const AccountType = () => {
  const handleOperation = useNotification()
  const [loading, setLoading] = useState(false)
  const [refresh, setRefresh] = useState(0)
  const initForm = {
    type: '',
    code: ''
  }
  const forms = useForm(initForm)
  const namefield = [
    { name: 'type', libelle: 'Type de compte :', type: 'text', normal: true },
    { name: 'code', libelle: 'Accronyme :', type: 'text', normal: true },
  ];
  const typeOP = new AccTypeOP()
  const submit = (e) => {
    e.preventDefault()
    setLoading(true)
    typeOP.create(forms.getForm)
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
        <Typography variant='h3' padding={2}>Page Type de compte</Typography>
        
        <FormContainer btnLibelle={'Valider'}
          form={forms.getForm}
          handleInputChange={forms.handleInputChange}
          loading={loading}
          namefield={namefield}
          submit={submit}
          variant={'outlined'}
        />
        <hr></hr>
        <ListAccountType acctype={typeOP} setRefresh={setRefresh} refresh={refresh} handleResponse={handleOperation.handleResponse} />
        {handleOperation.getNotif && <Notification message={handleOperation.getMessage} success={handleOperation.getSuccess} setNotif={handleOperation.resetNotif} notif={handleOperation.getNotif} />}
      </CardContent>
    </Card>
  )
}

export default AccountType