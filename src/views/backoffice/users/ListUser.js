import React, { useEffect, useState } from "react";
import Mtable from "../../../components/List/Mtable";
import { getNameField } from "../../../utils/function";
import useUpdate from '../../../components/update/useUpdate';
import useDelete from '../../../components/delete/useDelete';
import DeleteElement from '../../../components/delete/DeleteElement';
import UpdateElement from '../../../components/update/UpdateElement';
import Mpaginate from "../../../components/paginate/Mpaginate";

// utilisation de la table généralisé

/*
tout d'abord, avoir les données
*/

/*
Ensuite générer la liste des columns
dans la partie selector, indiqué comment accéder au donnée que l'on veut afficher
*/
const column = [
  { name: "Identifiant", selector: (row) => row.id },
  { name: "Nom", selector: (row) => row.name },
  { name: "E-mail", selector: (row) => row.mail },
  { name: "Téléphone", selector: (row) => row.phone },
  { name: "Role", selector: (row) => getNameField(row.role) },
];

/**
 *
 * Ensuite générer les function update et delete row si besoin et les mettre en props de update
 * et drop
 * A noter que la liste sera en amélioration continue
 */
const headColor = "white";
export default function ListUser({handleResponse, refresh, setRefresh, nameFields, userOp}) {
  const [loading, setLoading] = useState(false)
  const [users, setusers] = useState(null);
  const [page, setPage] = useState(0)
  const [totalPage, setTotalPage] = useState(1)
  const deleteFunction = useDelete()
  const updateFunction = useUpdate()

  useEffect(() => {
    setLoading(true)
    userOp
      .findAll('creationdate', 'asc',page)
      .then((data) => {
        setLoading(false)
        setusers(data?.data?.content);
        setTotalPage(data?.data?.totalPages)
        
      })
      .catch((error) => {
        handleResponse(false, error.message)
        setLoading(false)
        console.log(error)

      });
  }, [page, refresh]);

  const deleteOne = () => {
    userOp.deleteOne(deleteFunction.getId)
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
    userOp.updateOne(updateForm.getForm)
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
        data={users}
        drop={deleteFunction.drop}
        update={updateFunction.openUpdate}
        loading={loading}
      />
      <Mpaginate totalPage={totalPage} page={page} setPage={setPage} />
      <DeleteElement open={deleteFunction.getOpen} message={'Voulez-vous vraiment supprimer ' + deleteFunction.getId + '?'} setOpen={deleteFunction.handleClick} onClick={deleteOne} />
      {updateFunction.getOpen && <UpdateElement open={updateFunction.getOpen} setOpen={updateFunction.handleClick} submit={updateOne} field={nameFields} initForm={updateFunction.getBody} />}
    </>
  );
}
