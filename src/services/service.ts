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
    }

}