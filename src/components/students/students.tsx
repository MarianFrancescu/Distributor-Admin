import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Button,
  Tooltip,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./students.scss";
import service from "../../services/service";
import UserInterface from "../../models/user.interface";
import { useNavigate } from "react-router-dom";
import StudentDeleteDialog from "../student-delete-dialog/student-delete-dialog";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import PersonIcon from "@mui/icons-material/Person";

function Students() {
  const [students, setStudents] = useState<any>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const handleOpenDeleteDialog = () => setOpenDeleteDialog(true);
  const handleCloseDeleteDialog = () => setOpenDeleteDialog(false);
  const [userID, setUserID] = useState("");
  const setUserFunction = (id: string) => setUserID(id);
  const navigation = useNavigate();

  const [search, setSearch] = useState("");

  const handleSearch = (event: any) => {
    setSearch(event.target.value);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClickEdit = (id: string) => {
    navigation(`/student/${id}`);
  };

  const handleClickDelete = (id: string) => {
    setUserFunction(id);
    handleOpenDeleteDialog();
  };

  const getStudentsData = async () => {
    try {
      const response = await service.getUsers();
      const studentResponse = response as UserInterface[];
      setStudents([...studentResponse]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStudentsData();
  }, [openDeleteDialog]);

  return (
    <div className="students-container">
      <div className="students-card">
        <div className="students-box">
          <StudentDeleteDialog
            openModal={openDeleteDialog}
            userID={userID}
            closeModal={handleCloseDeleteDialog}
          />
          <div className="search-box__student">
            <label htmlFor="search">
              Search by student name
              <input id="search" type="text" onChange={handleSearch} />
            </label>
          </div>
          <TableContainer className="table-container" component={Paper}>
            <Table
              stickyHeader
              sx={{ minWidth: 650 }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>FirstName</TableCell>
                  <TableCell align="center">LastName</TableCell>
                  <TableCell align="center">Registration Number</TableCell>
                  <TableCell align="center">Institution</TableCell>
                  <TableCell align="center">Faculty</TableCell>
                  <TableCell align="center">Role</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students
                  .filter(
                    (student: UserInterface) =>
                      !search ||
                      student?.lastName
                        ?.toString()
                        .toLowerCase()
                        .includes(search.toString().toLowerCase()) ||
                      student?.firstName
                        ?.toString()
                        .toLowerCase()
                        .includes(search.toString().toLowerCase())
                  )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: UserInterface) => (
                    <TableRow
                      key={row.firstName}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.firstName}
                      </TableCell>
                      <TableCell align="center">{row.lastName}</TableCell>
                      <TableCell align="center">
                        {row.registrationNumber}
                      </TableCell>
                      <TableCell align="center">
                        {row.studyInstitution}
                      </TableCell>
                      <TableCell align="center">{row.faculty}</TableCell>
                      <TableCell align="center">
                        {row.role === "superAdmin" ? (
                          <Tooltip title="superAdmin">
                            <IconButton>
                              <SupervisedUserCircleIcon />
                            </IconButton>
                          </Tooltip>
                        ) : row.role === "admin" ? (
                          <Tooltip title="admin">
                            <IconButton>
                              <AdminPanelSettingsIcon />
                            </IconButton>
                          </Tooltip>
                        ) : (
                          <Tooltip title="basic">
                            <IconButton>
                              <PersonIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <div className="actions-wrapper">
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => handleClickEdit(row._id as string)}
                          >
                            Edit
                          </Button>
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => handleClickDelete(row._id as string)}
                          >
                            Delete
                          </Button>
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
            count={students.length}
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

export default Students;
