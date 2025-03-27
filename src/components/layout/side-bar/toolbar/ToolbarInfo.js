import { BadgeRounded, CloseRounded } from '@mui/icons-material'
import { Avatar, Box, Divider, IconButton, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import { getProfilStorage,Personrole } from '../../../../utils/function'
// import { getProfilStorage, Personrole } from '../../../../utils/Utils'
// component qui affiche une petit information concernant l'user connecter dans le side bar
const ToolbarInfo = ({ toggleDrawer = null }) => {
    const person = getProfilStorage()
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
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [person?.photo])
    return (
        <>
            <Toolbar>
                <Typography variant="h5" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', }}>
                        <IconButton  sx={{ p: 0 }}>
                            <Avatar alt={person?.prenom} src={img} />
                        </IconButton>
                        {/* <AccountCircle sx={{ fontSize: 28 }} color="primary" /> */}
                        <Typography variant="h5" component="p" sx={{ marginLeft: 1 }}>
                            My Ranto
                        </Typography>
                    </Box>
                    {/* <IconButton color="error" onClick={() => {
                        if (toggleDrawer) {
                            toggleDrawer()
                        }
                    }} >
                        <CloseRounded sx={{ fontSize: 20 }} />
                    </IconButton> */}
                </Typography>
            </Toolbar>
            {/* <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                    <BadgeRounded sx={{ fontSize: 26 }} color='primary' />
                    <Typography variant="h6" component="p" sx={{ marginLeft: 1 }}>
                        Admin
                    </Typography>
                </Typography>
            </Toolbar> */}
            <Divider />
        </>
    )
}

export default ToolbarInfo