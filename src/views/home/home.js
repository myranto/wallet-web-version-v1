import { Box, Card, CardContent, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { formatCurrency, getProfilStorage } from '../../utils/function'
import { AccountOP } from '../../classes/metier/AccountOP'
import Mtable from '../../components/List/Mtable'
import useNotification from '../../components/notification/useNotification'
import Notification from '../../components/notification/Notification'
const headColor = "white";

const Home = () => {
  const [list, setList] = useState(null)
  const accountOP = new AccountOP()
  const person = getProfilStorage()
  const handleOperation = useNotification()

  const [loading, setLoading] = useState(false)

  const column = [
    { name: "Client", selector: (row) => row.customer_id },
    { name: "Montant", selector: (row) => formatCurrency(row.amount) },
    { name: "Type de compte", selector: (row) => row.account_id },
  ];
  useEffect(() => {
    setLoading(true)
    // accountOP.findCurrentBalance(person?.id)
    accountOP.findCurrentBalance('CUS00004')
      .then((data) => {
        setLoading(false)
        setList(data?.data)
      })
      .catch((error) => {
        console.log(error);
        handleOperation.handleResponse(false, error.message)

      })
  }, [])
  return (
    <Card sx={{ maxWidth: '100vw' }}>
      <CardContent sx={{ height: '90vh', overflowY: 'hidden' }}>
        {/* <BreadCrumbs /> */}
        {/* <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        > */}
          <Typography>Home admin</Typography>
          <Mtable
            color={headColor}
            column={column}
            data={list}
            drop={false}
            update={false}
            loading={loading}
          />
        {/* </Box> */}
        {handleOperation.getNotif && <Notification message={handleOperation.getMessage} success={handleOperation.getSuccess} setNotif={handleOperation.resetNotif} notif={handleOperation.getNotif} />}

      </CardContent>
    </Card>
  )
}

export default Home