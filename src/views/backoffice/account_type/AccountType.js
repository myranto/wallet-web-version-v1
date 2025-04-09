import React, { useState } from 'react'
import useNotification from '../../../components/notification/useNotification'
import { Box, Typography } from '@mui/material'
import FormSimple from '../../../components/forms/FormSimple'
import MButton from '../../../components/forms/MButton'
import Notification from '../../../components/notification/Notification'
import ListAccountType from './ListAccountType'
import useForm from '../../../components/forms/useForm'
import { AccTypeOP } from '../../../classes/metier/AccTypeOP'

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
    <>
      <Typography variant='h3' padding={2}>Page Type de compte</Typography>
      <FormSimple variant={'outlined'} fields={namefield} submit={submit} form={forms.getForm} handleInput={forms.handleInputChange} libelle={'Valider'} />
      <Box component={'form'} noValidate sx={{
        display: 'flex', flexDirection: 'column', width: '100%', padding: 1, alignItems: 'center'
      }}>
        <MButton submit={submit} width='51%' libelle='Valider' loading={loading} />
      </Box>
      <hr></hr>
      <ListAccountType acctype={typeOP} setRefresh={setRefresh} refresh={refresh} handleResponse={handleOperation.handleResponse} />
      {handleOperation.getNotif && <Notification message={handleOperation.getMessage} success={handleOperation.getSuccess} setNotif={handleOperation.resetNotif} notif={handleOperation.getNotif} />}
    </>
  )
}

export default AccountType