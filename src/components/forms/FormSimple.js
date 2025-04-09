import { Box, FormControl, FormLabel, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'
import { formatDateForInput } from '../../utils/function'

const FormSimple = ({ fields, handleInput, form, variant, width = '50%' }) => {
    return (
        <Box component={'form'} noValidate sx={{
            display: 'flex', flexDirection: 'column', width: '100%', gap: 2, alignItems: 'center'
        }}>
            {fields.map((row, index) => (
                <>
                    {
                        row?.normal &&
                        <FormControl key={index} sx={{ width: width, maxWidth: '100%', display: 'flex', alignItems: 'flex-start' }}>
                            <FormLabel htmlFor={row.name}>{row.libelle}</FormLabel>
                            <TextField
                                name={row.name}
                                value={row.type === 'datetime-local' ? formatDateForInput(form[row.name]) : form[row.name]}
                                onChange={handleInput}
                                placeholder={'Entrez ' + row.libelle}
                                type={row.type}
                                id={row.name}
                                autoComplete={row.libelle}
                                required
                                fullWidth
                                error={false}
                                variant={variant}
                                color="primary"
                            />
                        </FormControl>
                    }
                    {!row?.normal && row?.type === 'select' &&
                        <Box sx={{ width: width, maxWidth: '100%', alignItems: 'center' }}>
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

        </Box>
    )
}

export default FormSimple