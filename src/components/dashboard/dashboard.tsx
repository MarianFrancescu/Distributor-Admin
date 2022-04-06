import React, { useEffect, useState } from "react";
import './dashboard.scss';
import service from "../../services/service";
import User from "../../models/user.interface";
import Institution from "../../models/institution.interface";
import Discipline from "../../models/discipline.interface";

function Dashboard() {

    const [usersLength, setUsersLength] = useState(0);
    const [institutionsLength, setInstitutionsLength] = useState(0);
    const [disciplinesLength, setDisciplinesLength] = useState(0);

    const getUsersData = async () => {
        try{
            const response = await service.getUsers();
            const usersResponse = response as User[];
            const usersLength = usersResponse.length;
            setUsersLength(usersLength);
        } catch(err) {
            (console.log(err))
        }
    }

    const getInstitutionsData = async () => {
        try{
            const response = await service.getInstitutions();
            const institutionsResponse = response as Institution[];
            setInstitutionsLength(institutionsResponse.length);
        } catch(err) {
            (console.log(err))
        }
    }

    const getDisciplinesData = async () => {
        try{
            const response = await service.getDisciplines();
            const disciplinesResponse = response as Discipline[];
            setDisciplinesLength(disciplinesResponse.length);
        } catch(err) {
            (console.log(err))
        }
    }

    useEffect(() => {
        getUsersData();
        getInstitutionsData();
        getDisciplinesData();
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