import { Accordion, AccordionDetails, AccordionSummary, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import React, { startTransition, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

import ToolbarInfo from './toolbar/ToolbarInfo';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { admin_pages } from '../../../utils/menuitem';
import { getProfilStorage } from '../../../utils/function';

const Sidebar = ({ toggleDrawer }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const person = getProfilStorage()
    const showBackGround = (row) => {
        return location.pathname === row.link ? '#80d8ff' : 'white'
    }
    const showMenu = () => {
        // recuperer la page à afficher selon le role de la personne connecter
        return admin_pages
    }
    
    return (
        <Box
            sx={{ width: 250, zIndex: 1001 }} role="presentation"
        // onClick={toggleDrawer}
        >
            <ToolbarInfo toggleDrawer={toggleDrawer} />
            <List>
                {showMenu()?.map((row, index) => (
                    <>
                        {row?.dropDown ?

                            <>
                                <Accordion key={index} sx={{ boxShadow: 'none', '&:before': { display: 'none' } }} >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel2-content"
                                        id="panel2-header"
                                    >
                                        <ListItemIcon>
                                            {row?.icon}
                                        </ListItemIcon>
                                        <Typography>{row.name}</Typography>
                                    </AccordionSummary>
                                    {row.dropDown.map((r, index) =>
                                        <AccordionDetails key={index}
                                            sx={{ backgroundColor: showBackGround(row) }}

                                        >
                                            <ListItemButton onClick={() => {
                                                startTransition(() => {
                                                    navigate(r?.link);
                                                });
                                                // toggleDrawer()
                                            }}
                                                selected={location.pathname === r.link}
                                            >
                                                <ListItemIcon>
                                                    {r?.icon}
                                                </ListItemIcon>
                                                <ListItemText primary={r?.name} />
                                            </ListItemButton>
                                        </AccordionDetails>
                                    )}

                                </Accordion>
                            </> :
                            <ListItem key={index} disablePadding
                                sx={{ backgroundColor: showBackGround(row) }}

                            >
                                <ListItemButton onClick={() => {
                                    startTransition(() => {
                                        navigate(row?.link);
                                    });
                                    // toggleDrawer()
                                }}
                                    selected={location.pathname === row.link}
                                >
                                    <ListItemIcon>
                                        {row?.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={row?.name} />
                                </ListItemButton>
                            </ListItem>
                        }
                    </>
                ))}
            </List>
        </Box>
    )
}

export default Sidebar