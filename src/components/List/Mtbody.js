import { Delete, Edit } from '@mui/icons-material'
import { IconButton, TableCell, TableRow } from '@mui/material'
import React from 'react'

const Mtbody = ({ data, column, update, drop }) => {
    return (
        <>
            {data?.map((row, index) => (
                <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    {column?.map((col, i) =>
                        <TableCell align='left' component="th" key={i} scope="row">
                            {col?.selector(row)}
                        </TableCell>
                    )}
                    {(update || drop) &&
                        <>
                            <TableCell align='left' component={'th'} scope='row'>
                                {update &&
                                    <IconButton
                                        size="large"
                                        aria-haspopup="true"
                                        color="primary"
                                    // onClick={() => {
                                    //     handleOpen()
                                    //     setBody(row)
                                    //     setUpdate(true)
                                    // }}
                                    >
                                        <Edit />
                                    </IconButton>
                                }
                                {drop &&
                                    <IconButton
                                        size="large"
                                        aria-haspopup="true"
                                        color="error"
                                    // onClick={() => {
                                    //     handleOpen()
                                    //     setBody(row)
                                    //     setUpdate(true)
                                    // }}
                                    >
                                        <Delete />
                                    </IconButton>
                                }
                            </TableCell>
                        </>
                    }
                </TableRow>
            ))}
        </>
    )
}

export default Mtbody