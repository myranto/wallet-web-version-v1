import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'
import FormSimple from '../forms/FormSimple'
import useForm from '../forms/useForm'

const UpdateElement = ({ initForm, submit, setOpen, open, field }) => {    
  const forms = useForm(initForm)
  const validate = () =>{
    submit(forms)
  }
  return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={setOpen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth={"md"}
                fullWidth
            >
                <DialogTitle id="alert-dialog-title">
                    {"Modification d'un élément"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Completer le formulaire
                    </DialogContentText>
                    <Box
                        component="form"
                        // onSubmit={submit}
                        noValidate
                        sx={{
                            display: 'flex', flexDirection: 'column', width: '100%', gap: 2,
                        }}
                    >
                        <FormSimple variant={'outlined'} width='100%' fields={field} submit={submit} form={forms.getForm} handleInput={forms.handleInputChange} libelle={'Valider'} />

                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={setOpen} 
                        variant="contained" color={'error'} fullWidth>Annuler</Button>
                    <Button fullWidth variant="contained"
                        onClick={validate} 
                        autoFocus>
                        Confirmer
                    </Button>
                </DialogActions>
            </Dialog>

        </React.Fragment>
    )
}

export default UpdateElement