import {Alert, Snackbar} from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";

// composant utilisé pour gerer Notifications
export default function Notification({message = 'Action réussi', success = false, notif = false, setNotif}) {
    return (
        <Box sx={{width: 500}}>
            <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'right'}} open={notif} autoHideDuration={3000}
                      onClose={setNotif}>
                <Alert
                    onClose={setNotif}
                    severity={success ? "success" : "error"}
                    variant="filled"
                    sx={{width: '100%'}}
                >
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    )
}