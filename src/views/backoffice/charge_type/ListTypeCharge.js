import React, { useEffect, useState } from 'react'
import useUpdate from '../../../components/update/useUpdate';
import useDelete from '../../../components/delete/useDelete';
import DeleteElement from '../../../components/delete/DeleteElement';
import UpdateElement from '../../../components/update/UpdateElement';
import Mtable from '../../../components/List/Mtable';
import Mpaginate from '../../../components/paginate/Mpaginate';

const column = [
  { name: "Identifiant", selector: (row) => row.id },
  { name: "Type de charge", selector: (row) => row.libelle },
  { name: "Accronyme", selector: (row) => row.code },
  { name: "Date de création", selector: (row) => new Date(row.creationdate).toLocaleDateString() },
];

const headColor = "white";
const ListTypeCharge = ({ handleResponse, refresh, setRefresh, nameFields, typeChargeOp }) => {
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState(null)
  const [page, setPage] = useState(0)
  const [totalPage, setTotalPage] = useState(1)
  const deleteFunction = useDelete()
  const updateFunction = useUpdate()
  useEffect(() => {
    setLoading(true)
    typeChargeOp
      .findAll('creationdate', 'asc',page)
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
    typeChargeOp.deleteOne(deleteFunction.getId)
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
    typeChargeOp.updateOne(updateForm.getForm)
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
      <Mpaginate totalPage={totalPage} page={page} setPage={setPage} />
      <DeleteElement
        open={deleteFunction.getOpen} message={'Voulez-vous vraiment supprimer ' + deleteFunction.getId + '?'} setOpen={deleteFunction.handleClick} onClick={deleteOne} />
      {updateFunction.getOpen && <UpdateElement open={updateFunction.getOpen} setOpen={updateFunction.handleClick} submit={updateOne} field={nameFields} initForm={updateFunction.getBody} />}
    </>
  )
}

export default ListTypeCharge