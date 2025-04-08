import React, { useEffect, useState } from "react";
import { Pagination, Stack } from "@mui/material";
import Mtable from "../../../components/List/Mtable";
import { CustomerOp } from "../../../classes/metier/CustomerOp";
import { getRole } from "../../../utils/function";

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
  { name: "Role", selector: (row) => getRole(row.role) },
];

/**
 *
 * Ensuite générer les function update et delete row si besoin et les mettre en props de update
 * et drop
 * A noter que la liste sera en amélioration continue
 */
const headColor = "white";
export default function ListUser({handleResponse}) {
  const [loading, setLoading] = useState(false)
  const [users, setusers] = useState(null);
  const [page, setPage] = useState(0)
  const [totalPage, setTotalPage] = useState(1)
  const userOp = new CustomerOp();

  useEffect(() => {
    setLoading(true)
    userOp
      .findAll(page)
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
  }, [page]);

  return (
    <>
      <Mtable
        color={headColor}
        column={column}
        data={users}
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
  );
}
