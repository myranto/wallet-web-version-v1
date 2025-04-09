import React, { useState } from 'react'
import useNotification from '../../../components/notification/useNotification'
import { TypeOperationOP } from '../../../classes/metier/TypeOperationOP'
import useForm from '../../../components/forms/useForm'
import { Box, Typography } from '@mui/material'
import FormSimple from '../../../components/forms/FormSimple'
import MButton from '../../../components/forms/MButton'
import Notification from '../../../components/notification/Notification'
import ListTypeOperation from './ListTypeOperation'

const TypeOperation = () => {
  const handleOperation = useNotification()
  const [loading, setLoading] = useState(false)
  const [refresh, setRefresh] = useState(0)
  const typeOpe = new TypeOperationOP()
  const initForm = {
    libelle: '',
    code: '',
    creation_date: ''
  }
  const namefield = [
    { name: 'libelle', libelle: 'Type d\'opération :', type: 'text', normal: true },
    { name: 'code', libelle: 'Accronyme :', type: 'text', normal: true },
    { name: 'creation_date', libelle: 'Date création :', type: 'datetime-local', normal: true },
  ]
  const forms = useForm(initForm)
  const submit = (e) => {
    e.preventDefault()
    console.log(forms.getForm)
    setLoading(true)
    typeOpe.create(forms.getForm)
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
      <Typography variant='h3' padding={2}>Page type d'opération</Typography>
      <FormSimple variant={'outlined'} fields={namefield} submit={submit} form={forms.getForm} handleInput={forms.handleInputChange} libelle={'Valider'} />
      <Box component={'form'} noValidate sx={{
        display: 'flex', flexDirection: 'column', width: '100%', padding: 1, alignItems: 'center'
      }}>
        <MButton submit={submit} width='51%' libelle='Valider' loading={loading} />
      </Box>
      <hr></hr>
      <ListTypeOperation handleResponse={handleOperation.handleResponse} refresh={refresh} setRefresh={setRefresh} nameFields={namefield} />
      {handleOperation.getNotif && <Notification message={handleOperation.getMessage} success={handleOperation.getSuccess} setNotif={handleOperation.resetNotif} notif={handleOperation.getNotif} />}
    </>
  )
}

export default TypeOperation