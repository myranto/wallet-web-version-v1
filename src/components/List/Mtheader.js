import { TableCell, TableRow } from '@mui/material'
import React from 'react'

const Mtheader = ({data, color, action}) => {
    return (
        <TableRow>
            {data?.map((row) =>
                <TableCell align='left' sx={{ color: color }}>{row?.name}</TableCell>
            )}
            {action && 
                <TableCell align='right' sx={{ color: color }}>action</TableCell>
            }
        </TableRow>
    )
}

export default Mtheader