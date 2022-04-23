import React, { useEffect, useState } from "react";
import "./dashboard.scss";
import service from "../../services/service";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

function Dashboard() {
  const [usersLength, setUsersLength] = useState(0);
  const [institutionsLength, setInstitutionsLength] = useState(0);
  const [disciplinesLength, setDisciplinesLength] = useState(0);

  const getUsersLength = async () => {
    try {
      const response = await service.getNumberOfUsers();
      const lengthResponse = response;
      setUsersLength(lengthResponse);
    } catch (err) {
      console.log(err);
    }
  };

  const getDisciplinesLength = async () => {
    try {
      const response = await service.getNumberOfDisciplines();
      const lengthResponse = response;
      setDisciplinesLength(lengthResponse);
    } catch (err) {
      console.log(err);
    }
  };

  const getInstitutionsLength = async () => {
    try {
      const response = await service.getNumberOfInstitutions();
      const lengthResponse = response;
      setInstitutionsLength(lengthResponse);
    } catch (err) {
      console.log(err);
    }
  };

  const userImage = require('../../assets/users.png');
  const institutionImage = require('../../assets/institution.png');
  const disciplineImage = require('../../assets/disciplines.png');

  useEffect(() => {
    getUsersLength();
    getDisciplinesLength();
    getInstitutionsLength();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="institutions">
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="200"
            image={institutionImage}
            alt="institutions"
          />
          <CardContent className="card-container">
            <Typography gutterBottom variant="h5" component="div">
            Total institutions
            </Typography>
            <Typography variant="body2" color="text.secondary">
            {institutionsLength}
            </Typography>
          </CardContent>
        </Card>
      </div>
      <div className="disciplines">
      <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="200"
            image={disciplineImage}
            alt="disciplines"
          />
          <CardContent className="card-container">
            <Typography gutterBottom variant="h5" component="div">
            Total disciplines
            </Typography>
            <Typography variant="body2" color="text.secondary">
            {disciplinesLength}
            </Typography>
          </CardContent>
        </Card>
      </div>
      <div className="users">
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="200"
            image={userImage}
            alt="users"
          />
          <CardContent className="card-container">
            <Typography gutterBottom variant="h5" component="div">
            Total users
            </Typography>
            <Typography variant="body2" color="text.secondary">
             {usersLength}
            </Typography>
          </CardContent>

        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
