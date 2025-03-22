import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {Card, SignInContainer} from '../../utils/styled'
import {useNavigate} from "react-router-dom";
import {useMediaQuery} from "@mui/material";


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
    const [formValues, setFormValues] = useState({
        mail: '',
        password: '',
    })

    const navigate = useNavigate()

    const handleInputChange = (event) => {
        const {name, value} = event.target
        setFormValues({
            ...formValues,
            [name]: value,
        })
    }
    const handleSubmit = (event) => {
    };
    return (
        <>
            <Typography
                component="h1"
                variant="h4"
                sx={{width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)'}}
            >
               Bienvenue, Se connecter ?
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
                        sx={{ariaLabel: 'email'}}
                    />
                </FormControl>
                <FormControl>
                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
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
            </Box>
        </>
    )
}

export default Login