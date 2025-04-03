import React, { useState } from 'react'
import useNotification from '../../../components/notification/useNotification'
import { Box, Card, CardContent, Typography } from '@mui/material'
import FormSimple from '../../../components/forms/FormSimple'
import MButton from '../../../components/forms/MButton'
import Notification from '../../../components/notification/Notification'
import ListAccountType from './ListAccountType'

const AccountType = () => {
  const handleOperation = useNotification()
  const [loading, setLoading] = useState(false)
  const initForm = {
    type: '',
    value: ''
  }
  const [form, setForm] = useState(initForm)
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const namefield = [
    { name: 'type', libelle: 'Type de compte :', type: 'text', normal: true },
    { name: 'value', libelle: 'Accronyme :', type: 'text', normal: true },
  ];
  const submit = (e) => {
    e.preventDefault()
    console.log(form)
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 300)
  }
  return (
    <Card sx={{ maxWidth: '100vw' }}>
      <CardContent sx={{ overflowY: 'hidden' }}>
        {/* <BreadCrumbs /> */}
        <Typography variant='h3' padding={2}>Page Type de compte</Typography>
        <FormSimple variant={'outlined'} fields={namefield} submit={submit} form={form} handleInput={handleInputChange} libelle={'Valider'} />
        <Box component={'form'} noValidate sx={{
          display: 'flex', flexDirection: 'column', width: '100%', padding: 1, alignItems: 'center'
        }}>
          <MButton submit={submit} width='51%' libelle='Valider' loading={loading} />
        </Box>
        <hr></hr>
        <ListAccountType handleResponse={handleOperation.handleResponse} />
        {handleOperation.getNotif && <Notification message={handleOperation.getMessage} success={handleOperation.getSuccess} setNotif={handleOperation.resetNotif} notif={handleOperation.getNotif} />}
      </CardContent>
    </Card>
  )
}

export default AccountType