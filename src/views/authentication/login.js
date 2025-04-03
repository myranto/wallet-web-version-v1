import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Card, SignInContainer } from '../../utils/styled';
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { AuthOperation } from '../../classes/authentication/AuthOperation';
import Notification from '../../components/notification/Notification';
import FormSimple from '../../components/forms/FormSimple';
import MButton from '../../components/forms/MButton';


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
    const initForm = {
        mail: 'my.randrianantoandro@gmail.com',
        password: 'myranto',
    }
    const [formValues, setFormValues] = useState(initForm)

    const navigate = useNavigate()
    const handleInputChange = (event) => {
        const { name, value } = event.target
        setFormValues({
            ...formValues,
            [name]: value,
        })
    }
    const namefield = [
        { name: 'mail', libelle: 'E-mail', type: 'email', normal: true },
        { name: 'password', libelle: 'Mot de passe', type: 'password', normal: true },
    ];
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
                <FormSimple width='100%' variant={'outlined'} fields={namefield} form={formValues} handleInput={handleInputChange} />
                <MButton submit={handleSubmit} width='100%' libelle='Connexion' loading={loading} />

                {notif && <Notification message={message} success={success} setNotif={setNotif} notif={notif} />}

            </Box>
        </>
    )
}

export default Login