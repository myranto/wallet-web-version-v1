import { Delete, Edit } from '@mui/icons-material'
import { IconButton, TableCell, TableRow } from '@mui/material'
import React from 'react'
import { StyledTableRow, StyledTableCell } from '../../utils/styled';

const Mtbody = ({ data, column, update, drop }) => {
    return (
        <>
            {data?.map((row, index) => (
                <StyledTableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    {column?.map((col, i) =>
                        <StyledTableCell align='left'  key={i} scope="row">
                            {col?.selector(row)}
                        </StyledTableCell>
                    )}
                    {(update || drop) &&
                        <>
                            <StyledTableCell align='center' component={'th'} scope='row'>
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
                            </StyledTableCell>
                        </>
                    }
                </StyledTableRow>
            ))}
        </>
    )
}

export default Mtbody