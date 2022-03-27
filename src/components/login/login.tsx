import React, {Component} from "react";
import './login.css'

class Login extends Component<{}, any>{
    constructor(props: any){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.state = {
            email: "",
            password: ""
        }
    }

    handleSubmit(e: any) {
        e.preventDefault()
        console.log('user', this.state.email, this.state.password);
    }

    handleFieldChange(event: any) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    render() {
        return(
            <div>
                <form onSubmit={this.handleSubmit} className="login-container">
                    <label>
                        Email
                        <input type="text" name="email" onChange={this.handleFieldChange} placeholder="email"/>
                    </label>
                    <label>
                        Password
                        <input type="password" name="password" onChange={this.handleFieldChange} placeholder="password"/>
                    </label>
                    <div>
                        <input type="submit" value="Submit" />
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;