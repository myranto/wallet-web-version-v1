import { Box, Card, CardContent, Typography } from '@mui/material'
import React from 'react'

const Index = () => {
  return (
    <>
      {/* <TableContainer > */}
      <Card sx={{ maxWidth: '100vw'  }}>
        <CardContent sx={{ height: '90vh', overflowY: 'hidden' }}>
          {/* <BreadCrumbs /> */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Typography>Coucou admin</Typography>
          </Box>
        </CardContent>
      </Card>
    {/* </TableContainer> */}
    </>
  )
}

export default Index