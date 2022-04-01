import axios from "axios";
const apiUrl = 'http://localhost:8080/';

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

    deleteDiscipline(disciplineID: string) {
        return axios.delete(`${apiUrl}deleteDiscipline/${disciplineID}`)
            .then(response => response.data)
            .catch(err => console.log(err));
    },

    getInstitutions() {
        return axios.get(`${apiUrl}institutions`)
            .then(response => response.data)
            .catch(err => console.log(err));
    }

}