import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import service from "../../services/service";
import './disciplines.scss';
import DisciplineInterface from "../../models/discipline.interface";
import { Navigate, useNavigate } from "react-router-dom";
import DisciplineAddDialog from "../discipline-add-dialog/discipline-add-dialog";
import DisciplineDeleteDialog from "../discipline-delete-dialog/discipline-delete-dialog";
import AddCircleIcon from '@mui/icons-material/AddCircle';

function createData(name: string, teacher: string,
    studyInstitution: string, faculty: string, department: string, studyYear: number) {
    return { name, teacher, studyInstitution, faculty, department, studyYear };
}

function Disciplines() {
    const [disciplines, setDisciplines] = useState<any>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const navigation = useNavigate();

    const [search, setSearch] = useState('');

    const handleSearch = (event: any) => {
        setSearch(event.target.value);
    };

    const getDisciplinesData = async () => {
        try {
            const response = await service.getDisciplines();
            const disciplineResponse = response as DisciplineInterface[];
            setDisciplines([...disciplineResponse]);

        } catch (error) {
            console.log(error);
        }
    }

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const handleOpenDeleteDialog = () => setOpenDeleteDialog(true);
    const handleCloseDeleteDialog = () => setOpenDeleteDialog(false);
    const [disciplineID, setDisciplineID] = useState('');
    const setDisciplineFunction = (id: string) => setDisciplineID(id);

    useEffect(() => {
        getDisciplinesData();
    }, [open, openDeleteDialog]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    const handleClickEdit = (id: string) => {
        navigation(`/discipline/${id}`);
    }

    const handleClickDelete = (id: string) => {
        setDisciplineFunction(id);
        handleOpenDeleteDialog();
    }

    return (
        <div className="disciplines-container">
            <div className="disciplines-card">
                <div className="disciplines-box">
                    <DisciplineAddDialog openModal={open} closeModal={handleClose} />
                    <DisciplineDeleteDialog openModal={openDeleteDialog} disciplineID={disciplineID} closeModal={handleCloseDeleteDialog} />
                    <div className="search-box">
                        <label htmlFor="search">
                            Search by discipline
                            <input className="field" id="search" type="text" placeholder="Discipline name" onChange={handleSearch} />
                        </label>
                    <Button className="button__container" startIcon={<AddCircleIcon />} onClick={handleOpen}>Add discipline</Button>
                    </div>
                    <TableContainer className="table-container" component={Paper}>
                        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Discipline</TableCell>
                                    <TableCell align="left">Teacher</TableCell>
                                    <TableCell align="left">Study Institution</TableCell>
                                    <TableCell align="left">Faculty</TableCell>
                                    <TableCell align="left">Department</TableCell>
                                    <TableCell align="left">Study Year</TableCell>
                                    <TableCell align="left">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {disciplines.filter((discipline: DisciplineInterface) => !search ||
                                    discipline?.name?.toString().toLowerCase().includes(search.toString().toLowerCase())
                                ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: DisciplineInterface) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="left">{row.teacher}</TableCell>
                                        <TableCell align="left">{row.studyInstitution}</TableCell>
                                        <TableCell align="left">{row.faculty}</TableCell>
                                        <TableCell align="left">{row.department}</TableCell>
                                        <TableCell align="left">{row.studyYear}</TableCell>
                                        <TableCell align="left">
                                            <div className="actions-wrapper">
                                            <Button size="small" variant="outlined" onClick={() => handleClickEdit(row._id as string)}>Edit</Button>
                                            <Button size="small" variant="outlined" color="error" onClick={() => handleClickDelete(row._id as string)}>Delete</Button>
                                            </div>
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
            </div>
        </div>
    );
}

export default Disciplines;