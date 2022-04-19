import React, { useEffect, useState } from "react";
import './dashboard.scss';
import service from "../../services/service";

function Dashboard() {

    const [usersLength, setUsersLength] = useState(0);
    const [institutionsLength, setInstitutionsLength] = useState(0);
    const [disciplinesLength, setDisciplinesLength] = useState(0);

    const getUsersLength = async () => {
        try {
            const response = await service.getNumberOfUsers();
            const lengthResponse = response;
            setUsersLength(lengthResponse);
        } catch(err) {
            console.log(err);
        }
    }

    const getDisciplinesLength = async () => {
        try {
            const response = await service.getNumberOfDisciplines();
            const lengthResponse = response;
            setDisciplinesLength(lengthResponse);
        } catch(err) {
            console.log(err);
        }
    }

    const getInstitutionsLength = async () => {
        try {
            const response = await service.getNumberOfInstitutions();
            const lengthResponse = response;
            setInstitutionsLength(lengthResponse);
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getUsersLength();
        getDisciplinesLength();
        getInstitutionsLength();
    }, []);

    return(
        <div className="dashboard-container">
            <div className="institutions">
                No. of institutions: {institutionsLength}
            </div>
            <div className="disciplines">
                No. of disciplines: {disciplinesLength}
            </div>
            <div className="users">
                No. of users: {usersLength}
            </div>
        </div>
    );
}

export default Dashboard;