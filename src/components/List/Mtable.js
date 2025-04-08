import { Paper, Table, TableBody, TableContainer, TableHead, Typography } from '@mui/material'
import React from 'react'
import Mtbody from './Mtbody'
import MtHeader from './Mtheader'
import TSkeleton from '../loader/TSkeleton'

const Mtable = ({ column, data, update, drop, color, loading }) => {
  const action = drop || update ? true : false
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: '#1976d2' }}>
          <MtHeader color={color} data={column} action={action} />
        </TableHead>
        <TableBody>
          {!loading ? <Mtbody column={column} data={data} drop={drop} update={update} />
            : <TSkeleton column={column} drop={drop} update={update} />
          }
        </TableBody>
      </Table>
      {!loading && (data?.length <= 0 || !data) &&
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)',  textAlign: 'center' }}
        >
          Aucune donnée!
        </Typography>}

    </TableContainer>
  )
}

export default Mtable