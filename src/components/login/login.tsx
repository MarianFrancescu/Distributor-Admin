import React, {useState} from "react";
import './login.css'

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('user', email, password);
    }

    const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        setPassword(event.target.value);
    }

    return(
        <div>
            <form onSubmit={e => { handleSubmit(e) }} className="login-container">
                <label>
                    Email
                    <input type="text" name="email" onChange={handleFieldChange} placeholder="email"/>
                </label>
                <label>
                    Password
                    <input type="password" name="password" onChange={handleFieldChange} placeholder="password"/>
                </label>
                <div>
                    <input type="submit" value="Submit" />
                </div>
            </form>
        </div>
    );
}

export default Login;