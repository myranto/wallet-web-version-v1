import React, { useEffect, useState } from 'react'
import useUpdate from '../../../components/update/useUpdate';
import useDelete from '../../../components/delete/useDelete';
import DeleteElement from '../../../components/delete/DeleteElement';
import UpdateElement from '../../../components/update/UpdateElement';
import { Pagination, Stack } from '@mui/material';
import Mtable from '../../../components/List/Mtable';
import { formatCurrency } from '../../../utils/function';

const headColor = "white";
const ListTransfer = ({ handleResponse, refresh, setRefresh, nameFields, transferOP }) => {
    const [loading, setLoading] = useState(false)
    const [transfer, setTransfer] = useState(null)
    const [page, setPage] = useState(0)
    const [totalPage, setTotalPage] = useState(1)

    const deleteFunction = useDelete()
    const updateFunction = useUpdate()

    const column = [
        { name: "Identifiant", selector: (row) => row.id },
        { name: "Compte debit", selector: (row) => row?.debit?.type },
        { name: "Compte credit", selector: (row) => row?.credit?.type },
        { name: "Montant", selector: (row) => formatCurrency(row.amount) },
        { name: "Date début", selector: (row) => new Date(row.start_date).toLocaleDateString() },
        { name: "Date fin", selector: (row) => new Date(row.end_date).toLocaleDateString() }
    ];
    useEffect(() => {
        setLoading(true)
        transferOP
            .findAll('creationdate', 'asc',page)
            .then((data) => {
                setLoading(false)
                setTransfer(data?.data?.content);
                setTotalPage(data?.data?.totalPages)
            })
            .catch((error) => {
                handleResponse(false, error.message)
                setLoading(false)
                console.log(error)

            });
    }, [page, refresh])
    const deleteOne = () => {
        transferOP.deleteOne(deleteFunction.getId)
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
        
        transferOP.updateOne(updateForm.getForm)
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
                data={transfer}
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

export default ListTransfer