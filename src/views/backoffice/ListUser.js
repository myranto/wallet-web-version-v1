import * as React from 'react';
import { Pagination, Stack } from '@mui/material';
import Mtable from '../../components/List/Mtable';

function createData(name, mail, phone, role) {
    const res = {
        name: name,
        mail: mail,
        phone: phone,
        role: {
            role:role
        }
    }
    return res;
}
const column = [
    {name:'name', selector:(row) => row.name},
    {name:'mail', selector:(row) => row.mail},
    {name:'phone', selector:(row) => row.phone},
    {name:'role', selector:(row) => row.role.role},
]

const rows = [
    createData('Frozen yoghurt', 'Frozen yoghurt', 'Frozen yoghurt', 'Frozen yoghurt'),
    createData('Ice cream sandwich', 'Ice cream sandwich', 'Ice cream sandwich', 'Ice cream sandwich'),
    createData('Eclair', 'Eclair', 'Eclair', 'Eclair'),
    createData('Cupcake', 'Cupcake', 'Cupcake', 'Cupcake'),
    createData('Gingerbread', 'Gingerbread', 'Gingerbread', 'Gingerbread'),
];
const headColor = 'white'
export default function ListUser() {
    return (
        <>
            <Mtable color={headColor} column={column} data={rows} drop={true} update={true} />
            <Stack spacing={2} alignItems={'center'}>
                <Pagination count={10}
                    // page={page}
                    // onChange={(event, value) => setPage(value)}
                    // color={'primary'}
                />
            </Stack>
        </>
    );
}
