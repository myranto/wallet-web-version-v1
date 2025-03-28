import { AccountCircle, Mail, Phone, PsychologyAlt } from '@mui/icons-material'
import { Box, Button, Card, CardContent, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React from 'react'
import ListUser from './ListUser'

const Users = () => {
    return (
        <Card sx={{ maxWidth: '100vw' }}>
            <CardContent sx={{ overflowY: 'hidden' }}>
                {/* <BreadCrumbs /> */}
                <Typography variant='h3' padding={2}>Page utilisateur</Typography>
                <Box
                    sx={{
                        display: 'flex', flexDirection: 'column', width: '100%', gap: 2, alignItems:'center'
                    }}
                >
                    <Typography variant='h5' padding={1}>Création d'utilisateur</Typography>


                    <Box sx={{ width: '50%', maxWidth: '100%', display: 'flex', alignItems: 'flex-end' }}>
                        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField fullWidth label="Nom :" variant='standard' id="Nom" />
                    </Box>
                    <Box sx={{ width: '50%', maxWidth: '100%', display: 'flex', alignItems: 'flex-end' }}>
                        <Mail sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField fullWidth label="E-mail :" variant='standard' id="mail" />
                    </Box>
                    <Box sx={{ width: '50%', maxWidth: '100%', display: 'flex', alignItems: 'flex-end' }}>
                        <Phone sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField fullWidth label="Téléphone :" variant='standard' id="phone" />
                    </Box>
                    <Box sx={{ width: '50%', maxWidth: '100%', display: 'flex', alignItems: 'flex-end' }}>
                        {/* <InputLabel id="demo-simple-select-standard-label">Role</InputLabel> */}
                        <PsychologyAlt sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <FormControl fullWidth variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-standard-label">Role</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                // value={}
                                // onChange={handleChange}
                                label="Age"
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '50%', maxWidth: '100%' }}>
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                        // onClick={handleSubmit}
                        >
                            Valider
                        </Button>
                    </Box>
                </Box>
                <hr></hr>
                <br></br>
                <ListUser />
            </CardContent>
        </Card>
    )
}

export default Users