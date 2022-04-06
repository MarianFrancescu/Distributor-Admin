import { Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TablePagination, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import './students.scss';
import service from '../../services/service';
import UserInterface from '../../models/user.interface';
import { useNavigate } from "react-router-dom";
import StudentDeleteDialog from "../student-delete-dialog/student-delete-dialog";

function Students() {
    const [students, setStudents] = useState<any>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const handleOpenDeleteDialog = () => setOpenDeleteDialog(true);
    const handleCloseDeleteDialog = () => setOpenDeleteDialog(false);
    const [userID, setUserID] = useState('');
    const setUserFunction = (id: string) => setUserID(id);
    const navigation = useNavigate();

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    const handleClickEdit = (id: string) => {
        navigation(`/student/${id}`);
    }

    const handleClickDelete = (id: string) => {
        setUserFunction(id);
        handleOpenDeleteDialog();
    }

    const getStudentsData = async () => {

        try {
            const response = await service.getUsers();
            const studentResponse = response as UserInterface[];
            setStudents([...studentResponse]);

        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        getStudentsData();
    }, [openDeleteDialog]);

    return (
        <div className="students-container">
            <div className="students-box">
            <StudentDeleteDialog openModal={openDeleteDialog} userID={userID} closeModal={handleCloseDeleteDialog} />
                <TableContainer component={Paper}>
                    <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>FirstName</TableCell>
                                <TableCell align="right">LastName</TableCell>
                                <TableCell align="right">Registration Number</TableCell>
                                <TableCell align="right">Institution</TableCell>
                                <TableCell align="right">Faculty</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {students.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: UserInterface) => ( 
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
                                    <TableCell align="right">
                                            <Button size="small" variant="outlined" onClick={() => handleClickEdit(row._id as string)}>Edit</Button>
                                            <Button size="small" variant="outlined" onClick={() => handleClickDelete(row._id as string)}>Delete</Button>
                                        </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={students.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
            </div>
        </div>
    );
}

export default Students;