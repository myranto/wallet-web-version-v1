import React, { useEffect, useState } from 'react'
import { AccTypeOP } from '../../../classes/metier/AccTypeOP';
import { Pagination, Stack } from '@mui/material';
import Mtable from '../../../components/List/Mtable';


const column = [
  { name: "Type de compte", selector: (row) => row.type },
  { name: "Accronyme", selector: (row) => row.value },
  { name: "Date de création", selector: (row) => row.creation_date },
];
const headColor = "white";
const ListAccountType = ({ handleResponse }) => {
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState(null)
  const [page, setPage] = useState(0)
  const [totalPage, setTotalPage] = useState(1)
  const acctype = new AccTypeOP()

  useEffect(() => {
    setLoading(true)
    acctype
      .findAll(page)
      .then((data) => {
        setLoading(false)
        setType(data?.data?.content);
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
        data={type}
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

export default ListAccountType