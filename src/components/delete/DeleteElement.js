import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// composant utiliser pour supprimer des elements
// On peut aussi l'utiliser pour des actions qui ne nécessitent pas de formulaire
export default function DeleteElement({open = false, setOpen, onClick, message = "Voulez - vous vraiment supprimer ?", title="Suppression d'un élément"}) {
    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={setOpen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={setOpen}>Annuler</Button>
                    <Button onClick={onClick} autoFocus>
                        Confirmer
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}