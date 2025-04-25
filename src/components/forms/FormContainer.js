import { Box, Button, Collapse } from '@mui/material'
import React, { useState } from 'react'
import FormSimple from './FormSimple'
import MButton from './MButton'

const FormContainer = ({
    submit,
    btnLibelle,
    loading,
    variant,
    namefield,
    form,
    handleInputChange

}) => {
    const [showForm, setShowForm] = useState(false)
    const handle = () => {
        setShowForm(!showForm)
    }
    return (
        <>
            <Button
                variant="contained"
                color={!showForm ? 'primary' : 'error'}
                onClick={handle}
            >
                {!showForm ? 'Nouveau' : 'Fermer'}
            </Button>

            <Collapse in={showForm} >
                <FormSimple variant={variant} fields={namefield} form={form} handleInput={handleInputChange} />
                <Box component={'form'} noValidate sx={{
                    display: 'flex', flexDirection: 'column', width: '100%', padding: 1, alignItems: 'center'
                }}>
                    <MButton submit={submit} width='51%' libelle={btnLibelle} loading={loading} />
                </Box>
            </Collapse>
        </>
    )
}

export default FormContainer