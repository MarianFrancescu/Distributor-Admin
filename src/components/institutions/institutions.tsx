import { Box, Card, CardContent, Typography, CardActions, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import InstitutionAddDialog from "../institution-add-dialog/institution-add-dialog";
import './institutions.scss';
import service from "../../services/service";
import Institution from "../../models/institution.interface";

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

    const getInstitutionsData = async () => {
        try {
            const response = await service.getInstitutions();
            const institutionsReponse = response as Institution[];
            setInstitutions([...institutionsReponse]);

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

    return (
        <div className="institution-container">
            <Button onClick={handleOpen}>Open modal</Button>
            <InstitutionAddDialog openModal={open} closeModal={handleClose} />
            {
                institutions.map((institution: Institution) => (
            
                
            <Card sx={{ minWidth: 275, maxWidth: 450 }}>
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
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
                ))}
        </div>
    );
}

export default Institutions;