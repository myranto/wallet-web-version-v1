import { Box, Button, FormControl, FormLabel, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'

const FormSimple = ({ fields, handleInput, form, submit, libelle, variant }) => {
    return (
        <Box component={'form'} noValidate sx={{
            display: 'flex', flexDirection: 'column', width: '100%', gap: 2, alignItems: 'center'
        }}>
            {fields.map((row, index) => (
                <>
                    {
                        row?.normal &&
                        <FormControl key={index} sx={{ width: '50%', maxWidth: '100%', display: 'flex', alignItems: 'flex-start' }}>
                            <FormLabel htmlFor={row.name}>{row.libelle}</FormLabel>
                            <TextField
                                name={row.name}
                                value={form[row.name]}
                                onChange={handleInput}
                                placeholder={'Entrez '+row.libelle}
                                type={row.type}
                                id={row.name}
                                autoComplete={row.libelle}
                                required
                                fullWidth
                                variant={variant}
                                color="primary"
                            />
                        </FormControl>
                    }
                    {!row?.normal && row?.type === 'select' &&
                        <Box sx={{ width: '50%', maxWidth: '100%', alignItems:'center'}}>
                            <FormControl variant={variant} fullWidth key={index}  >
                                <InputLabel id="demo-simple-select-standard-label">{row.libelle}</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    name={row.name}
                                    value={form[row.name]}
                                    onChange={handleInput}
                                    label={row.libelle}
                                    id={row.name}
                                >
                                    {row?.items?.map((item, index) =>
                                        <MenuItem key={index} value={item?.value}>{item?.name}</MenuItem>

                                    )}
                                </Select>
                            </FormControl>
                        </Box>
                    }

                </>
            ))}
            <Button sx={{ width: '50%', maxWidth: '100%' }} type="button" fullWidth variant="contained" onClick={submit}>
                {libelle}
            </Button>
        </Box>
    )
}

export default FormSimple