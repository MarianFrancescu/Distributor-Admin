import { Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import React, { useEffect, useState } from "react";
import './students.css';
import service from '../../services/service';
import UserInterface from '../../models/user.interface';

function Students() {
    const [students, setStudents] = useState<any>([]);

    const getStudentsData = async () => {

        try{
            const response = await service.getUsers();
            const studentResponse = response as UserInterface[];
            setStudents([...studentResponse]);
            
        } catch(error) {
            console.log(error);
        }
        
    }

    useEffect(() => {
        getStudentsData();  
    }, []);
    
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
                        {students.map((row: UserInterface) => (
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