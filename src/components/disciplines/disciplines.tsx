import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import React from "react";
import './disciplines.css';

function createData(name: string, teacher: string,
    studyInstitution: string, faculty: string, department: string, studyYear: number) {
    return { name, teacher, studyInstitution, faculty, department, studyYear };
}

const rows = [
    createData('Modelare si Simulare', 'Holban Stefan', 'Universitatea Politehnica Timisoara', 'Automatica si Calculatoare', 'Calculatoare si Tehnologia Informatiei', 2),
    createData('Matematici Speciale', 'Nicu', 'Universitatea Politehnica Timisoara', 'Automatica si Calculatoare', 'Calculatoare si Tehnologia Informatiei', 1),
    createData('Analiza Algoritmi', 'Capricescu', 'Universitatea de Vest Timisoara', 'Automatica', 'Calculatoare', 2),
];

function Disciplines() {
    return(
        <div className="disciplines-container">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Discipline</TableCell>
                            <TableCell align="right">Teacher</TableCell>
                            <TableCell align="right">Study Institution</TableCell>
                            <TableCell align="right">Faculty</TableCell>
                            <TableCell align="right">Department</TableCell>
                            <TableCell align="right">Study Year</TableCell>
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
                                <TableCell align="right">{row.teacher}</TableCell>
                                <TableCell align="right">{row.studyInstitution}</TableCell>
                                <TableCell align="right">{row.faculty}</TableCell>
                                <TableCell align="right">{row.department}</TableCell>
                                <TableCell align="right">{row.studyYear}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Disciplines;