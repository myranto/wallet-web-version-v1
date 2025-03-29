import React, { useEffect, useState } from "react";
import { Pagination, Stack } from "@mui/material";
import Mtable from "../../components/List/Mtable";
import { CustomerOp } from "../../classes/metier/CustomerOp";

// utilisation de la table généralisé

/*
tout d'abord, avoir les données
*/

function createData(name, mail, phone, role) {
  const res = {
    name: name,
    mail: mail,
    phone: phone,
    role: {
      role: role,
    },
  };
  return res;
}

/*
Ensuite générer la liste des columns
dans la partie selector, indiqué comment accéder au donnée que l'on veut afficher
*/
const column = [
  { name: "name", selector: (row) => row.name },
  { name: "mail", selector: (row) => row.mail },
  { name: "phone", selector: (row) => row.phone },
  { name: "role", selector: (row) => row.role },
];

const rows = [
  createData(
    "Frozen yoghurt",
    "Frozen yoghurt",
    "Frozen yoghurt",
    "Frozen yoghurt"
  ),
  createData(
    "Ice cream sandwich",
    "Ice cream sandwich",
    "Ice cream sandwich",
    "Ice cream sandwich"
  ),
  createData("Eclair", "Eclair", "Eclair", "Eclair"),
  createData("Cupcake", "Cupcake", "Cupcake", "Cupcake"),
  createData("Gingerbread", "Gingerbread", "Gingerbread", "Gingerbread"),
];
/**
 *
 * Ensuite générer les function update et delete row si besoin et les mettre en props de update
 * et drop
 * A noter que la liste sera en amélioration continue
 */
const headColor = "white";
export default function ListUser() {
  const [users, setusers] = useState(null);
  const [page, setPage] = useState(0)
  const [totalPage, setTotalPage] = useState(1)
  const userOp = new CustomerOp();

  useEffect(() => {
    userOp
      .findAll(page)
      .then((data) => {
        setusers(data?.data?.content);
        setTotalPage(data?.data?.totalPages)
        
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <Mtable
        color={headColor}
        column={column}
        data={users}
        drop={true}
        update={true}
      />
      <Stack spacing={2} alignItems={"center"}>
        <Pagination
          count={totalPage}
          // page={page}
          // onChange={(event, value) => setPage(value)}
          // color={'primary'}
        />
      </Stack>
    </>
  );
}
