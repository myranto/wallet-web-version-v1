import React, { startTransition } from 'react'
import { useNavigate } from 'react-router-dom';
import { Logout, Person, Settings } from '@mui/icons-material';
import Tooltip from '@mui/material/Tooltip';
import { Avatar, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { getProfilStorage } from '../../../utils/function';
// import { useAuth } from '../../AuthorizedRoute/AuthProvider';
// dropdown menu sur le petit icon a droite de l'header
const DropDownMenu = ({ setMessage, setNotif, setSuccess, img }) => {
    const navigate = useNavigate()
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    // const { log_out } = useAuth();
    const person = getProfilStorage()

    

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const profile = () => {
        startTransition(() => {
            navigate('/home/profile');
        });
    }
    const parameter = () => {
        startTransition(() => {
            navigate('/home/profile/password');
        });
    }
    const logout = () => {
        setMessage('déconnexion réussi')
        setNotif(true)
        setSuccess(true)
        setTimeout(() => {
            // log_out()
            startTransition(() => {
                navigate('/login');
            });
        }, 500);
    }
    const settings = [
        { name: 'Profil', icon: <Person />, click: profile },
        { name: 'Paramètre', icon: <Settings />, click: parameter },
        { name: 'Déconnexion', icon: <Logout />, click: logout }
    ];

    return (
        <>
            <Tooltip title="Voir options">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={person?.prenom} src={img} />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {/* liste des menu dans le dropdown */}
                {settings.map((setting, index) => (
                    <MenuItem key={index} onClick={() => {
                        setting.click()
                        handleCloseUserMenu()
                    }}>
                        <Typography sx={{ textAlign: 'center' }}>
                            <IconButton color={'primary'} sx={{ p: 0 }}>
                                {setting.icon}
                            </IconButton>
                            {' '}{setting.name}
                        </Typography>
                    </MenuItem>
                ))}
            </Menu>
        </>
    )
}

export default DropDownMenu