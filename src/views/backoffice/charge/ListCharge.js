import React, { useEffect, useState } from 'react'
import DeleteElement from '../../../components/delete/DeleteElement';
import UpdateElement from '../../../components/update/UpdateElement';
import useUpdate from '../../../components/update/useUpdate';
import useDelete from '../../../components/delete/useDelete';
import Mtable from '../../../components/List/Mtable';
import { Pagination, Stack } from '@mui/material';
import { formatCurrency } from '../../../utils/function';
const headColor = "white";

const ListCharge = ({ handleResponse, refresh, setRefresh, nameFields, chargeOP }) => {
  const [loading, setLoading] = useState(false)
  const [charge, setCharge] = useState(null)
  const [page, setPage] = useState(0)
  const [totalPage, setTotalPage] = useState(1)

  const deleteFunction = useDelete()
  const updateFunction = useUpdate()

  const column = [
    { name: "Identifiant", selector: (row) => row.id },
    { name: "Type de compte", selector: (row) => row?.account?.type},
    { name: "Type de charge", selector: (row) => row?.tcharge?.libelle },
    { name: "Type d' opération", selector: (row) => row?.toperation?.libelle },
    { name: "Montant", selector: (row) => formatCurrency(row.amount) },
    { name: "Date début", selector: (row) => new Date(row.start_date).toLocaleDateString() },
    { name: "Date fin", selector: (row) => new Date(row.end_date).toLocaleDateString() }
  ];
  useEffect(() => {
    setLoading(true)
    chargeOP
      .findAll('creationdate', 'asc',page)
      .then((data) => {
        setLoading(false)
        setCharge(data?.data?.content);
        setTotalPage(data?.data?.totalPages)
      })
      .catch((error) => {
        handleResponse(false, error.message)
        setLoading(false)
        console.log(error)

      });
  }, [page, refresh])
  const deleteOne = () => {
    chargeOP.deleteOne(deleteFunction.getId)
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
    chargeOP.updateOne(updateForm.getForm)
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
        data={charge}
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

export default ListCharge