import React, { useState } from 'react'
import useNotification from '../../../components/notification/useNotification'
import { TypeChargeOP } from '../../../classes/metier/TypeChargeOP'
import useForm from '../../../components/forms/useForm'
import { Box, Typography } from '@mui/material'
import FormSimple from '../../../components/forms/FormSimple'
import MButton from '../../../components/forms/MButton'
import Notification from '../../../components/notification/Notification'
import ListTypeCharge from './ListTypeCharge'

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
      <Typography variant='h3' padding={2}>Page type charge</Typography>
      <FormSimple variant={'outlined'} fields={namefield} submit={submit} form={forms.getForm} handleInput={forms.handleInputChange} libelle={'Valider'} />
      <Box component={'form'} noValidate sx={{
        display: 'flex', flexDirection: 'column', width: '100%', padding: 1, alignItems: 'center'
      }}>
        <MButton submit={submit} width='51%' libelle='Valider' loading={loading} />
      </Box>
      <hr></hr>
      <ListTypeCharge handleResponse={handleOperation.handleResponse} refresh={refresh} setRefresh={setRefresh} nameFields={namefield} />
      {handleOperation.getNotif && <Notification message={handleOperation.getMessage} success={handleOperation.getSuccess} setNotif={handleOperation.resetNotif} notif={handleOperation.getNotif} />}
    </>
  )
}

export default TypeCharge