import React, { useEffect, useState } from 'react'
import { AccountOP } from '../../../classes/metier/AccountOP';
import Mtable from '../../../components/List/Mtable';
import { Pagination, Stack } from '@mui/material';

const column = [
  { name: "Type de compte", selector: (row) => row.type_id },
  { name: "Solde actuel", selector: (row) => row.current_amount },
  { name: "Date de solde", selector: (row) => row.date_amount }
];
const headColor = "white";

const ListAccount = ({ handleResponse }) => {
  const [loading, setLoading] = useState(false)
  const [account, setAccount] = useState(null)
  const [page, setPage] = useState(0)
  const [totalPage, setTotalPage] = useState(1)
  const accountOP = new AccountOP()


  useEffect(() => {
    setLoading(true)
    accountOP
      .findAll(page)
      .then((data) => {
        setLoading(false)
        setAccount(data?.data?.content);
        setTotalPage(data?.data?.totalPages)
      })
      .catch((error) => {
        handleResponse(false, error.message)
        setLoading(false)
        console.log(error)

      });
  }, [page])

  return (
    <>
      <Mtable
        color={headColor}
        column={column}
        data={account}
        drop={true}
        update={true}
        loading={loading}
      />
      <Stack spacing={2} alignItems={"center"}>
        <Pagination
          count={totalPage}
          page={page}
          onChange={(event, value) => setPage(value)}
          color={'primary'}
        />
      </Stack>
    </>
  )
}

export default ListAccount