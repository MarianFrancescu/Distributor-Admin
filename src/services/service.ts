import axios from "axios";
import Discipline from "../models/discipline.interface";
import Institution from "../models/institution.interface";
import User from "../models/user.interface";
// const apiUrl = 'http://localhost:8080/';
const apiUrl = 'http://54.174.30.45:8080/';

export default {
    loginUser(email: string, password: string) {
        return axios.post(`${apiUrl}login`, {
            email: email,
            password: password
        }).then(
            (response) => response.data
        ).catch(err => console.log(err))
    },

    getUsers() {
        return axios.get(`${apiUrl}users`)
            .then(response => response.data)
            .catch(err => console.log(err));
    },

    getUser(userID: string) {
        return axios.get(`${apiUrl}user/${userID}`)
            .then(response => response.data)
            .catch(err => console.log(err));
    },

    updateUser(userID: string, user: User) {
        return axios.patch(`${apiUrl}updateUser/${userID}`, user)
            .then(response => response.data)
            .catch(err => console.log(err));
    },

    deleteUser(userID: string) {
        return axios.delete(`${apiUrl}deleteUser/${userID}`)
            .then(response => response.data)
            .catch(err => console.log(err));
    },

    getNumberOfUsers() {
        return axios.get(`${apiUrl}users/length`)
            .then(response => response.data)
            .catch(err => console.log(err));
    },

    getDisciplines() {
        return axios.get(`${apiUrl}disciplines`)
            .then(response => response.data)
            .catch(err => console.log(err));
    },

    getDiscipline(disciplineID: string) {
        return axios.get(`${apiUrl}discipline/${disciplineID}`)
            .then(response => response.data)
            .catch(err => console.log(err));
    },

    addDisicpline(discipline: Discipline) {
        return axios.post(`${apiUrl}addDiscipline`, discipline)
            .then(response => response.data)
            .catch(err => console.log(err));
    },

    updateDiscipline(disciplineID: string, discipline: Discipline) {
        return axios.patch(`${apiUrl}updateDiscipline/${disciplineID}`, discipline)
            .then(response => response.data)
            .catch(err => console.log(err));
    },

    deleteDiscipline(disciplineID: string) {
        return axios.delete(`${apiUrl}deleteDiscipline/${disciplineID}`)
            .then(response => response.data)
            .catch(err => console.log(err));
    },

    getNumberOfDisciplines() {
        return axios.get(`${apiUrl}disciplines/length`)
            .then(response => response.data)
            .catch(err => console.log(err));
    },

    getInstitutions() {
        return axios.get(`${apiUrl}institutions`)
            .then(response => response.data)
            .catch(err => console.log(err));
    },

    getInstitution(id: string) {
        return axios.get(`${apiUrl}institution/${id}`)
            .then(response => response.data)
            .catch(err => console.log(err));
    },

    addInstitution(studyInstitution: string, faculties: Array<any>) {
        return axios.post(`${apiUrl}institution/add`, {
            studyInstitution: studyInstitution,
            faculties: faculties
        }).then(response => response.data)
          .catch(err => console.log(err));
    },

    updateInstitution(institutionID: string, institution: Institution) {
        return axios.patch(`${apiUrl}institution/${institutionID}/update`, institution)
            .then(response => response.data)
            .catch(err => console.log(err));
    },

    deleteInstitution(institutionName: string) {
        return axios.delete(`${apiUrl}institution/${institutionName}/delete`)
            .then(response => response.data)
            .catch(err => console.log(err));
    },

    getNumberOfInstitutions() {
        return axios.get(`${apiUrl}institutions/length`)
            .then(response => response.data)
            .catch(err => console.log(err));
    },

}