import React, { useEffect, useState } from 'react'
import { AccountOP } from '../../../classes/metier/AccountOP';
import Mtable from '../../../components/List/Mtable';
import { Pagination, Stack } from '@mui/material';
import useUpdate from '../../../components/update/useUpdate';
import useDelete from '../../../components/delete/useDelete';
import DeleteElement from '../../../components/delete/DeleteElement';
import UpdateElement from '../../../components/update/UpdateElement';


const headColor = "white";

const ListAccount = ({ handleResponse, refresh, setRefresh, nameFields }) => {
  const [loading, setLoading] = useState(false)
  const [account, setAccount] = useState(null)
  const [page, setPage] = useState(0)
  const [totalPage, setTotalPage] = useState(1)
  const accountOP = new AccountOP()
  const deleteFunction = useDelete()
  const updateFunction = useUpdate()

  const column = [
    { name: "Type de compte", selector: (row) => row?.type?.type },
    { name: "Solde actuel", selector: (row) => row.current_amount },
    { name: "Date de solde", selector: (row) => new Date(row.date_amount).toLocaleDateString() }
  ];
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
  }, [page, refresh])
  const deleteOne = () => {
    accountOP.deleteOne(deleteFunction.getId)
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
  const updateOne = (updateForm) => {
    accountOP.updateOne(updateForm.getForm)
      .then((data) => {
        handleResponse(true, data?.data)
        updateFunction.handleClick()
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
        data={account}
        drop={deleteFunction.drop}
        update={updateFunction.openUpdate}
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
      <DeleteElement 
      open={deleteFunction.getOpen} message={'Voulez-vous vraiment supprimer ' + deleteFunction.getId + '?'} setOpen={deleteFunction.handleClick} onClick={deleteOne} />
      {updateFunction.getOpen && <UpdateElement open={updateFunction.getOpen} setOpen={updateFunction.handleClick} submit={updateOne} field={nameFields} initForm={updateFunction.getBody} />}
    </>
  )
}

export default ListAccount