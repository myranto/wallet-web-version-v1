import { Box, Collapse, CssBaseline, Drawer, useMediaQuery } from "@mui/material";
import Header from "../header/Header";
import React, { Fragment, useState } from "react";
import Sidebar from "../side-bar/Sidebar";

// composant de base utiliser pour toutes les pages
// afin d'avoir un design uniforme
export default function Mcontainer({ Component = null, componentName = null, socket = null }) {
    const isMobile = useMediaQuery('(max-width:600px)');
    const [open, setOpen] = React.useState(true);
    const [openD, setOpenD] = React.useState(isMobile ? true : false);
    const [drawerWidth, setDrawerWidth] = useState(open ? 'calc(100% - 250px)' : '100%');

    const toggleDrawerDiscu = () => {
        setOpenD(!openD)
    };
    const toggleDrawer = () => {
        setOpen(!open)
        if (!isMobile) {
            setDrawerWidth(!open ? 'calc(100% - 250px)' : '100%');
        } if (isMobile) {
            setDrawerWidth('100%');

        }
    };
    return (
        <Fragment>
            <CssBaseline />
            <Header messageOpen={toggleDrawerDiscu} drawerWidth={drawerWidth} open={open} socket={socket} toggleDrawer={toggleDrawer} currentComponent={componentName} />
            <Collapse in={open}>
                <Drawer
                    open={open}
                    onClose={toggleDrawer}
                    anchor="left"
                    variant='persistent'
                >
                    <Sidebar toggleDrawer={toggleDrawer} />
                </Drawer>
            </Collapse>
            {Component &&
                <Box sx={{
                    width: drawerWidth,
                    float: 'right',
                    right: 0
                }}>
                    <Component toggleDrawer={toggleDrawerDiscu} open={openD} socket={socket} />
                </Box>
            }
        </Fragment>
    )
}