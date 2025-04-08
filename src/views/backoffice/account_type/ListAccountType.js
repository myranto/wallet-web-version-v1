import React, { useEffect, useState } from 'react'
import { AccTypeOP } from '../../../classes/metier/AccTypeOP';
import { Pagination, Stack } from '@mui/material';
import Mtable from '../../../components/List/Mtable';
import useDelete from '../../../components/delete/useDelete';
import DeleteElement from '../../../components/delete/DeleteElement';

const column = [
  { name: "Identifiant", selector: (row) => row.id },
  { name: "Type de compte", selector: (row) => row.type },
  { name: "Accronyme", selector: (row) => row.code },
  { name: "Date de création", selector: (row) => new Date(row.creation_date).toLocaleDateString() },
];
const headColor = "white";
const ListAccountType = ({ handleResponse, refresh, setRefresh }) => {
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState(null)
  const [page, setPage] = useState(0)
  const [totalPage, setTotalPage] = useState(1)
  const acctype = new AccTypeOP()
  const deleteFunction = useDelete()

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
  }, [page, refresh])
  const deleteOne = () => {
    acctype.deleteOne(deleteFunction.getId)
      .then((data) => {
        handleResponse(true, data?.data)
        deleteFunction.handleClick()
        setRefresh(prev => prev + 1)
      })
      .catch((error) => {
        handleResponse(false, error.message)
        console.log(error)
      });
  }
  return (
    <>
      <Mtable
        color={headColor}
        column={column}
        data={type}
        drop={deleteFunction.drop}
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
      <DeleteElement open={deleteFunction.getOpen} message={'Voulez-vous vraiment supprimer ' + deleteFunction.getId + '?'} setOpen={deleteFunction.handleClick} onClick={deleteOne} />
    </>
  )
}

export default ListAccountType