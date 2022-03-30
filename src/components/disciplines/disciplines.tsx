import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import service from "../../services/service";
import './disciplines.scss';
import DisciplineInterface from "../../models/discipline.interface";
import { Navigate, useNavigate } from "react-router-dom";
import DisciplineAddDialog from "../discipline-add-dialog/discipline-add-dialog";

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
    const [disciplines, setDisciplines] = useState<any>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const navigation = useNavigate();

    const getDisciplinesData = async () => {
        try{
            const response = await service.getDisciplines();
            const disciplineResponse = response as DisciplineInterface[];
            setDisciplines([...disciplineResponse]);
            
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getDisciplinesData();
    }, []);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    }
    
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    const handleClickView = (id: string) => {
        navigation(`/discipline/${id}`);
    }
    const handleClickEdit = (id: string) => {
        console.log('pressed', id);
    }
    const handleClickDelete = (id: string) => {
        console.log('pressed', id);
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return(
        <div className="disciplines-container">
            <Button onClick={handleOpen}>Open modal</Button>
            <DisciplineAddDialog openModal={open} closeModal={handleClose} />
            <TableContainer component={Paper}>
                <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Discipline</TableCell>
                            <TableCell align="right">Teacher</TableCell>
                            <TableCell align="right">Study Institution</TableCell>
                            <TableCell align="right">Faculty</TableCell>
                            <TableCell align="right">Department</TableCell>
                            <TableCell align="right">Study Year</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {disciplines.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: DisciplineInterface) => (
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
                                <TableCell align="right">
                                    <button onClick={() => handleClickView(row._id as string)}>View</button>
                                    <button onClick={() => handleClickEdit(row._id as string)}>Edit</button>
                                    <button onClick={() => handleClickDelete(row._id as string)}>Delete</button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={disciplines.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );
}

export default Disciplines;