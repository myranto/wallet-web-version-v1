import { Skeleton, TableCell, TableRow } from '@mui/material'
import React from 'react'

const TSkeleton = ({ column, data = [1, 2, 1, 2, 1, 2, 1, 2], update, drop }) => {
    return (
        <>
            {data.map((row, index) =>
                <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    {column?.map((col, i) =>
                        <TableCell align='left' component="th" key={i} scope="row">
                            <Skeleton animation="wave" />
                        </TableCell>
                    )}
                    {(update || drop) &&
                        <TableCell align='left' component="th" scope="row">
                            <Skeleton animation="wave" />
                        </TableCell>
                    }
                </TableRow>

            )}
        </>
    )
}

export default TSkeleton