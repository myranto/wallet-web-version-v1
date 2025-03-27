import {Alert, Snackbar} from "@mui/material";
import Box from "@mui/material/Box";
import React, {useEffect} from "react";

// composant utilisé pour gerer Notifications
export default function Notification({message = 'Action réussi', success = false, notif = false, setNotif}) {
    useEffect(() => {
        if (message !== null) {
            setNotif(true)
        }
    }, [message, setNotif])
    return (
        <Box sx={{width: 500}}>
            <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'right'}} open={notif} autoHideDuration={3000}
                      onClose={() => setNotif(false)}>
                <Alert
                    onClose={() => setNotif(false)}
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