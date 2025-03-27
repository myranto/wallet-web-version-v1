import { Box, CssBaseline, useMediaQuery } from "@mui/material";
import Header from "../header/Header";
import React, { Fragment, useState } from "react";

// composant de base utiliser pour toutes les pages
// afin d'avoir un design uniforme
export default function Mcontainer({ Component = null, componentName = null, socket = null }) {
    const isMobile = useMediaQuery('(max-width:600px)');
    const [open, setOpen] = React.useState(false);
    const [openD, setOpenD] = React.useState(isMobile ? true : false);
    const [drawerWidth, setDrawerWidth] = useState(!open ? '100%' : '87%');

    const toggleDrawerDiscu = () => {
        setOpenD(!openD)
    };
    const toggleDrawer = () => {
        setOpen(!open)
        if (!isMobile) {
            setDrawerWidth(open ? '100%' : '87%');
        } if (isMobile) {
            setDrawerWidth('100%');

        }
    };
    return (
        <Fragment>
            <CssBaseline />
            <Header messageOpen={toggleDrawerDiscu} drawerWidth={drawerWidth} open={open} socket={socket} toggleDrawer={toggleDrawer} currentComponent={componentName} />

            {Component &&
                <Box sx={{
                    width: drawerWidth,
                    float: 'right'
                }}>
                    <Component toggleDrawer={toggleDrawerDiscu} open={openD} socket={socket} />
                </Box>
            }
        </Fragment>
    )
}