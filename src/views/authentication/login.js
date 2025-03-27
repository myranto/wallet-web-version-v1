import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Card, SignInContainer } from '../../utils/styled'
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { AuthOperation } from '../../classes/authentication/AuthOperation';
import Loader from '../../components/loader/Loader';
import Notification from '../../components/notification/Notification';


const Login = () => {
    const isMobile = useMediaQuery('(max-width:600px)');


    return (

        <SignInContainer>
            {!isMobile &&
                <Card variant="outlined">
                    <Displaying />
                </Card>
            }
            {isMobile &&
                <Displaying />
            }
        </SignInContainer>
    );
}

const Displaying = () => {
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(null)
    const [success, setSuccess] = useState(true)
    const [notif, setNotif] = useState(false)
    const authOperation = new AuthOperation()
    const [formValues, setFormValues] = useState({
        mail: 'my.randrianantoandro@gmail.com',
        password: 'myranto',
    })

    const navigate = useNavigate()

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setFormValues({
            ...formValues,
            [name]: value,
        })
    }
    const handleSubmit = (event) => {
        setLoading(true)
        authOperation.login(formValues)
            .then((data) => {
                handleResponse(true, 'Connexion réussi')
                // login(data?.data?.user)
                // localStorage.setItem(loggedApp, JSON.stringify(data?.data?.user))
                // localStorage.setItem(TokenUser, data?.token)

                // const route = data?.data?.user?.role === 1 ? '/home/admin' : '/home/request'
                setTimeout(() => {
                    navigate('/home')
                }, 300)

            })
            .catch((error) => {
                console.log(error);
                handleResponse(false, error.message)
            })
    };
    const handleResponse = (success, message) => {
        setLoading(false)
        setSuccess(success)
        setNotif(true)
        setMessage(message)
    }
    return (
        <>
            <Typography
                component="h1"
                variant="h4"
                sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
            >
                Bienvenue, Connectez-vous !
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{
                    display: 'flex', flexDirection: 'column', width: '100%', gap: 2,
                }}
            >
                <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <TextField
                        id="email"
                        type="email"
                        name="mail"
                        value={formValues.mail}
                        onChange={handleInputChange}
                        placeholder="email@email.com"
                        autoComplete="email"
                        autoFocus
                        required
                        fullWidth
                        variant="outlined"
                        color={'primary'}
                        sx={{ ariaLabel: 'email' }}
                    />
                </FormControl>
                <FormControl>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <FormLabel htmlFor="password">Mot de passe</FormLabel>
                    </Box>
                    <TextField
                        name="password"
                        value={formValues.password}
                        onChange={handleInputChange}
                        placeholder="••••••"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        autoFocus
                        required
                        fullWidth
                        variant="outlined"
                        color={'primary'}
                    />
                </FormControl>
                {!loading &&
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        onClick={handleSubmit}
                    >
                        Connexion
                    </Button>
                }
                 <Loader onLoad={loading} />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        '& > *': {
                            m: 1,
                        },
                    }}
                >
                </Box>
                {notif && <Notification message={message} success={success} setNotif={setNotif} notif={notif} />}

            </Box>
        </>
    )
}

export default Login