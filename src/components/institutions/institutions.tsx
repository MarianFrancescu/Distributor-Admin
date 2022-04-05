import { Box, Card, CardContent, Typography, CardActions, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import InstitutionAddDialog from "../institution-add-dialog/institution-add-dialog";
import './institutions.scss';
import service from "../../services/service";
import Institution from "../../models/institution.interface";
import { useNavigate } from "react-router-dom";

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
            console.log(institutionsResponse);
            setInstitutions([...institutionsResponse]);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getInstitutionsData();
    }, []);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleClickEdit = (institution: string) => {
        console.log(institution)
        navigation(`/institution/${institution}`);
    }

    return (
        <div className="institution-container">
            <Button onClick={handleOpen}>Open modal</Button>
            <InstitutionAddDialog openModal={open} closeModal={handleClose} />
            {
                institutions.map((institution: Institution, index: number) => (
            
                
            <Card sx={{ minWidth: 275, maxWidth: 450 }} key={index}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {institution?.studyInstitution}
                    </Typography>
                    <Typography variant="h5" component="div">
                        be{bull}nev{bull}o{bull}lent
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        fdsfds
                    </Typography>
                    <Typography variant="body2">
                        well meaning and kindly.
                        <br />
                        {'"a benevolent smile"'}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={() => handleClickEdit(institution.studyInstitution as string)} size="small">Edit</Button>
                </CardActions>
            </Card>
                ))}
        </div>
    );
}

export default Institutions;