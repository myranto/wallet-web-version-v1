import * as React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Message, Person, SupportAgent, Wallet } from "@mui/icons-material";
// import Notification from "../../notification/Notification";
import './header.css'
import Sidebar from '../side-bar/Sidebar';
import DropDownMenu from '../drop-down-menu/DropDownMenu';
import { Collapse, Drawer, useMediaQuery } from '@mui/material';
import { getProfilStorage, Personrole } from '../../../utils/function';
// import { UserOperation } from '../../../classes/users/UserOperation';

// import HeaderNotification from '../../notification/HeaderNotification/HeaderNotification';
// import ChatNotification from '../../notification/ChatNotification/ChatNotification';
// composant utiliser pour avoir un header dynamique et uniforme pour toute les pages
function Header({ messageOpen, currentComponent = null, toggleDrawer, drawerWidth, open, socket = null }) {
    const person = getProfilStorage()
    const isMobile = useMediaQuery('(max-width:600px)');
    const [message, setMessage] = useState(null)
    const [success, setSuccess] = useState(true)
    const [notif, setNotif] = useState(false)
    // const userOperation = new UserOperation()
    const [img, setImg] = useState(null)
    // React.useEffect(() => {
    //     userOperation.getFiles(person?.photo)
    //         .then((data) => {
    //             setImg(data);

    //         })
    //         .catch((error) => {
    //             console.log(error);

    //         })
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [person?.photo])
    return (
        <AppBar
            // position="static"
            sx={{
                position: 'relative',
                backdropFilter: 'blur(10px)',
                width: drawerWidth,
                left: open ? '250px' : 0,
                zIndex: (theme) => theme.zIndex.drawer - 1
            }}
        >
            <Container maxWidth="xxl">
                <Toolbar disableGutters>
                    <Wallet sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        WALLET
                    </Typography>
                    {/*menu pour les pages */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={toggleDrawer}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        {isMobile && currentComponent === 'Discussion' &&
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={messageOpen}
                                color="inherit"
                            >
                                <Message />
                            </IconButton>
                        }
                        
                    </Box>


                    {/* partie droite de l'header */}
                    <Person sx={{ display: { xs: 'none', md: 'flex' } }} />
                    <Box sx={{
                        flexGrow: 0
                    }}>
                        <Button color="inherit">My Ranto
                            <label
                                variant="h5"
                                className="hide-on-mobile"
                                style={{
                                    marginRight: '1rem',
                                    fontFamily: 'monospace',
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                /Admin
                            </label>
                        </Button>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
                        {/* {person?.role > 1 && <ChatNotification socket={socket} person={person} />} */}
                        {/* <HeaderNotification socket={socket} /> */}
                        <DropDownMenu img={img} setMessage={setMessage} setNotif={setNotif} setSuccess={setSuccess} />

                    </Box>
                </Toolbar>
            </Container>
            {/* {notif && <Notification message={message} success={success} setNotif={setNotif} notif={notif} />} */}
        </AppBar>
    );
}

export default Header;
