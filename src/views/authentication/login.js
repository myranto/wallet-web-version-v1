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
import useNotification from '../../components/notification/useNotification';
import useForm from '../../components/forms/useForm';
import { loggedApp, TokenUser } from '../../utils/function';


const Login = () => {
    const isMobile = useMediaQuery('(max-width:600px)');

    return (

        <SignInContainer>
            {!isMobile ?
                <Card variant="outlined">
                    <Displaying />
                </Card>
                :
                <Displaying />
            }
        </SignInContainer>
    );
}

const Displaying = () => {
    const authOperation = new AuthOperation()
    const initForm = {
        mail: 'my.randrianantoandro@gmail.com',
        password: 'myranto',
    }
    const forms = useForm(initForm)
    const [loading, setLoading] = useState(false)
    const handleOperation = useNotification()
    const navigate = useNavigate()
    const namefield = [
        { name: 'mail', libelle: 'E-mail', type: 'email', normal: true },
        { name: 'password', libelle: 'Mot de passe', type: 'password', normal: true },
    ];
    const handleSubmit = (event) => {
        setLoading(true)
        authOperation.login(forms.getForm)
            .then((data) => {
                setLoading(false)
                handleOperation.handleResponse(true, 'Connexion réussi')
                localStorage.setItem(loggedApp, JSON.stringify(data?.data))
                localStorage.setItem(TokenUser, data?.data?.token)
                // const route = data?.data?.user?.role === 1 ? '/home/admin' : '/home/request'
                setTimeout(() => {
                    navigate('/home')
                }, 300)

            })
            .catch((error) => {
                setLoading(false)
                console.log(error);
                handleOperation.handleResponse(false, error.message)
            })
    };
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
                <FormSimple width='100%' variant={'outlined'} fields={namefield} form={forms.getForm} handleInput={forms.handleInputChange} />
                <MButton submit={handleSubmit} width='100%' libelle='Connexion' loading={loading} />
                {handleOperation.getNotif && <Notification message={handleOperation.getMessage} success={handleOperation.getSuccess} setNotif={handleOperation.resetNotif} notif={handleOperation.getNotif} />}
            </Box>
        </>
    )
}
export default Login