import React, { useEffect, useState } from 'react'
import { TypeOperationOP } from '../../../classes/metier/TypeOperationOP';
import useUpdate from '../../../components/update/useUpdate';
import useDelete from '../../../components/delete/useDelete';
import DeleteElement from '../../../components/delete/DeleteElement';
import UpdateElement from '../../../components/update/UpdateElement';
import Mtable from '../../../components/List/Mtable';
import { Pagination, Stack } from '@mui/material';

const column = [
  { name: "Identifiant", selector: (row) => row.id },
  { name: "Type d'opération", selector: (row) => row.libelle },
  { name: "Accronyme", selector: (row) => row.code },
  { name: "Date de création", selector: (row) => new Date(row.creationdate).toLocaleDateString() },
];
const headColor = "white";

const ListTypeOperation = ({ handleResponse, refresh, setRefresh, nameFields,typeOpe }) => {
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState(null)
  const [page, setPage] = useState(0)
  const [totalPage, setTotalPage] = useState(1)
  const deleteFunction = useDelete()
  const updateFunction = useUpdate()
  useEffect(() => {
    setLoading(true)
    typeOpe
      .findAll('creationdate', 'asc',page)
      .then((data) => {
        setLoading(false)
        console.log(data?.data?.content?.length);

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
    typeOpe.deleteOne(deleteFunction.getId)
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
    typeOpe.updateOne(updateForm.getForm)
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
        data={type}
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

export default ListTypeOperation