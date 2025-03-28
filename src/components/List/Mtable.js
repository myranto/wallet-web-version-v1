import { Paper, Table, TableBody, TableContainer, TableHead } from '@mui/material'
import React from 'react'
import Mtbody from './Mtbody'
import MtHeader from './Mtheader'

const Mtable = ({ column, data, update, drop, color }) => {
  const action = drop || update ? true : false
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: '#1976d2' }}>
          <MtHeader color={color} data={column} action={action} />
        </TableHead>
        <TableBody>
          <Mtbody column={column} data={data} drop={drop} update={update} />
        </TableBody>
      </Table>

    </TableContainer>
  )
}

export default Mtable