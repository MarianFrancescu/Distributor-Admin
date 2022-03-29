import { Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import React from "react";
import './students.css';

function createData(firstName: string, lastName: String,
    registrationNumber: string, studyInstitution: string, faculty: string) {
    return { registrationNumber, firstName, lastName, studyInstitution, faculty };
}

const rows = [
    createData('George', 'Panait', 'lm123', 'Universitatea Politehnica Timisoara', 'Automatica si Calculatoare'),
    createData('Mihai', 'Georgel', 'lm133', 'Universitatea Politehnica Timisoara', 'Automatica si Calculatoare'),
    createData('Simu', 'Ion', 'lm113', 'Universitatea Politehnica Timisoara', 'Automatica si Calculatoare'),
    createData('Belu', 'Vlad', 'mc034', 'Universitatea de Vest Timisoara', 'Informatica'),
];

function Students() {
    return (
        <div className="students-container">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>FirstName</TableCell>
                            <TableCell align="right">LastName</TableCell>
                            <TableCell align="right">Registration Number</TableCell>
                            <TableCell align="right">Institution</TableCell>
                            <TableCell align="right">Faculty</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.firstName}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.firstName}
                                </TableCell>
                                <TableCell align="right">{row.lastName}</TableCell>
                                <TableCell align="right">{row.registrationNumber}</TableCell>
                                <TableCell align="right">{row.studyInstitution}</TableCell>
                                <TableCell align="right">{row.faculty}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Students;