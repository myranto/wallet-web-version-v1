import { Card, CardContent, Typography } from '@mui/material'
import React, { useState } from 'react'
import ListUser from './ListUser'
import FormSimple from '../../components/forms/FormSimple'

/*
Utilisation de form généralisé simple
tout d'abord initialiser la form, c'est à dire l'objet
*/
const Users = () => {
    const initForm = {
        name: '',
        mail: '',
        phone: '',
        role: ''
    }
    const [form, setForm] = useState(initForm)
    /*
    créé la function qui update la valeur de form
    */
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setForm({
            ...form,
            [name]: value,
        });
    };
    const roleItems = [
        { name: 'Administrateur', value: 'A' },
        { name: 'Client', value: 'C' },
    ]
    /*
        générer la liste des champs, pour l'instant on encore que 
        les forms de type simple(number, text, password, email)
        et le type select
        les autres types serant accessibles au prochains amélioration
    */
    const namefield = [
        { name: 'name', libelle: 'Nom', type: 'text', normal: true },
        { name: 'mail', libelle: 'E-mail', type: 'email', normal: true },
        { name: 'phone', libelle: 'Téléphone', type: 'text', normal: true },
        { name: 'role', libelle: 'Role', type: 'select', normal: false, items: roleItems },
    ];
    // générer la function qui valide l'opération
    const submit = (e) => {
        e.preventDefault()
        console.log(form)
    }

    return (
        <Card sx={{ maxWidth: '100vw' }}>
            <CardContent sx={{ overflowY: 'hidden' }}>
                {/* <BreadCrumbs /> */}
                <Typography variant='h3' padding={2}>Page utilisateur</Typography>
                <FormSimple variant={'outlined'} fields={namefield} submit={submit} form={form} handleInput={handleInputChange} libelle={'Valider'} />

                <hr></hr>
                <br></br>
                <ListUser />
            </CardContent>
        </Card>
    )
}

export default Users