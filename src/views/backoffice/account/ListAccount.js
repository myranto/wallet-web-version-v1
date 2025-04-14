import React, { useEffect, useState } from 'react'
import Mtable from '../../../components/List/Mtable';
import useUpdate from '../../../components/update/useUpdate';
import useDelete from '../../../components/delete/useDelete';
import DeleteElement from '../../../components/delete/DeleteElement';
import UpdateElement from '../../../components/update/UpdateElement';
import { formatCurrency } from '../../../utils/function';
import Mpaginate from '../../../components/paginate/Mpaginate';


const headColor = "white";

const ListAccount = ({ handleResponse, refresh, setRefresh, nameFields,accountOP }) => {
  const [loading, setLoading] = useState(false)
  const [account, setAccount] = useState(null)
  const [page, setPage] = useState(0)
  const [totalPage, setTotalPage] = useState(1)
  const deleteFunction = useDelete()
  const updateFunction = useUpdate()

  const column = [
    { name: "Type de compte", selector: (row) => row?.type?.type },
    { name: "Solde actuel", selector: (row) => formatCurrency(row.currentamount) },
    { name: "Date de solde", selector: (row) => new Date(row.dateamount).toLocaleDateString() }
  ];
  useEffect(() => {
    setLoading(true)
    accountOP
      .findAll('dateamount', 'desc',page)
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
      <Mpaginate totalPage={totalPage} page={page} setPage={setPage} />
      <DeleteElement 
      open={deleteFunction.getOpen} message={'Voulez-vous vraiment supprimer ' + deleteFunction.getId + '?'} setOpen={deleteFunction.handleClick} onClick={deleteOne} />
      {updateFunction.getOpen && <UpdateElement open={updateFunction.getOpen} setOpen={updateFunction.handleClick} submit={updateOne} field={nameFields} initForm={updateFunction.getBody} />}
    </>
  )
}

export default ListAccount