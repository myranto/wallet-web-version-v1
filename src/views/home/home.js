import { Box, Card, CardContent, Typography } from '@mui/material'
import React from 'react'

const Home = () => {
  return (
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
            <Typography>Home admin</Typography>
          </Box>
        </CardContent>
      </Card>
  )
}

export default Home