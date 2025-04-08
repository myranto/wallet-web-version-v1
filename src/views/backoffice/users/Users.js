import { Box, Card, CardContent, Typography } from '@mui/material'
import React, { useState } from 'react'
import ListUser from './ListUser'
import FormSimple from '../../../components/forms/FormSimple'
import MButton from '../../../components/forms/MButton'
import Notification from '../../../components/notification/Notification'
import useNotification from '../../../components/notification/useNotification'
import useForm from '../../../components/forms/useForm'
import { roleItems } from '../../../utils/function'

/*
Utilisation de form généralisé simple
tout d'abord initialiser la form, c'est à dire l'objet
*/
const Users = () => {
    const handleOperation = useNotification()
    const [loading, setLoading] = useState(false)
    const initForm = {
        name: '',
        mail: '',
        phone: '',
        role: ''
    }
    const forms = useForm(initForm)

    /*
        générer la liste des champs, pour l'instant on encore que 
        les forms de type simple(number, text, password, email)
        et le type select
        les autres types serant accessibles au prochains amélioration
    */
    const namefield = [
        { name: 'name', libelle: 'Nom :', type: 'text', normal: true },
        { name: 'mail', libelle: 'E-mail :', type: 'email', normal: true },
        { name: 'phone', libelle: 'Téléphone :', type: 'text', normal: true },
        { name: 'role', libelle: 'Role :', type: 'select', normal: false, items: roleItems },
    ];
    // générer la function qui valide l'opération
    const submit = (e) => {
        e.preventDefault()
        console.log(forms.getForm)
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 300)
    }

    return (
        <Card sx={{ maxWidth: '100vw' }}>
            <CardContent sx={{ overflowY: 'hidden' }}>
                {/* <BreadCrumbs /> */}
                <Typography variant='h3' padding={2}>Page utilisateur</Typography>
                <FormSimple variant={'outlined'} fields={namefield} submit={submit} form={forms.getForm} handleInput={forms.handleInputChange} libelle={'Valider'} />
                <Box component={'form'} noValidate sx={{
                    display: 'flex', flexDirection: 'column', width: '100%', padding: 1, alignItems: 'center'
                }}>
                    <MButton submit={submit} width='51%' libelle='Valider' loading={loading} />
                </Box>
                <hr></hr>
                <ListUser handleResponse={handleOperation.handleResponse} />
                {handleOperation.getNotif && <Notification message={handleOperation.getMessage} success={handleOperation.getSuccess} setNotif={handleOperation.resetNotif} notif={handleOperation.getNotif} />}

            </CardContent>
        </Card>
    )
}

export default Users