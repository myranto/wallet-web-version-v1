import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Pagination, Stack } from '@mui/material';

function createData(name, mail, phone, role) {
    return { name, mail, phone, role };
}

const rows = [
    createData('Frozen yoghurt', 'Frozen yoghurt', 'Frozen yoghurt', 'Frozen yoghurt'),
    createData('Ice cream sandwich', 'Ice cream sandwich', 'Ice cream sandwich', 'Ice cream sandwich'),
    createData('Eclair', 'Eclair', 'Eclair', 'Eclair'),
    createData('Cupcake', 'Cupcake', 'Cupcake', 'Cupcake'),
    createData('Gingerbread', 'Gingerbread', 'Gingerbread', 'Gingerbread'),
];

export default function ListUser() {
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{ backgroundColor: '#00e5ff' }}>
                        <TableRow>
                            <TableCell>Nom</TableCell>
                            <TableCell align="right">Mail</TableCell>
                            <TableCell align="right">Téléphone</TableCell>
                            <TableCell align="right">Role</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.mail}</TableCell>
                                <TableCell align="right">{row.phone}</TableCell>
                                <TableCell align="right">{row.role}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </TableContainer>
            <Stack spacing={2}>
                <Pagination count={10} />
            </Stack>
        </>
    );
}
