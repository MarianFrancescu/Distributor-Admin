import { Box, Card, CardContent, Typography, CardActions, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import InstitutionAddDialog from "../institution-add-dialog/institution-add-dialog";
import './institutions.scss';
import service from "../../services/service";
import Institution from "../../models/institution.interface";
import { useNavigate } from "react-router-dom";
import InstitutionDeleteDialog from "../institution-delete-dialog/institution-delete-dialog";
import AddCircleIcon from '@mui/icons-material/AddCircle';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

function Institutions() {

    const [institutions, setInstitutions] = useState<any>([]);
    const navigation = useNavigate();

    const getInstitutionsData = async () => {
        try {
            const response = await service.getInstitutions();
            const institutionsResponse = response as Institution[];
            setInstitutions([...institutionsResponse]);

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
    const [institutionName, setInstitutionName] = useState('');
    const setInstitutionNameFunction = (id: string) => setInstitutionName(id);

    const handleClickEdit = (institutionID: string) => {
        navigation(`/institution/${institutionID}`);
    }

    const handleClickDelete = (name: string) => {
        setInstitutionNameFunction(name);
        handleOpenDeleteDialog();
    }

    useEffect(() => {
        getInstitutionsData();
    }, [open, openDeleteDialog]);

    return (
        <div className="institution-container">
            <Button variant="contained" className="dialog-button" startIcon={<AddCircleIcon />} onClick={handleOpen}>Add institution</Button>
            <InstitutionAddDialog openModal={open} closeModal={handleClose} />
            <InstitutionDeleteDialog openModal={openDeleteDialog} studyInstitution={institutionName} closeModal={handleCloseDeleteDialog} />
            <div className="institution-cards">
                <div className="grid-cards">
                    {
                        institutions.map((institution: Institution, index: number) => (
                            <Card sx={{ minWidth: 275, maxWidth: 350 }} key={index}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                                        {institution?.studyInstitution}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        No. of faculties: {institution.faculties.length}
                                    </Typography>
                                    <Typography variant="body2">
                                        well meaning and kindly.
                                        <br />
                                        {/* {'"a benevolent smile"'} */}
                                    </Typography>
                                </CardContent>
                                <CardActions className="actions-card">
                                    <Button variant="contained" onClick={() => handleClickEdit(institution._id as string)} size="small">Edit</Button>
                                    <Button variant="contained" color="error" onClick={() => handleClickDelete(institution.studyInstitution as string)}>Delete</Button>
                                </CardActions>
                            </Card>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default Institutions;