import { Box, TextField, Button, Avatar, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';
import './login.scss'
import service from '../../services/service';
import { useNavigate } from 'react-router-dom';
import {MyContext} from '../../App';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {isLoggedUser, setUserStatus} = useContext(MyContext);

    const [openSnack, setOpenSnack] = React.useState(false);

    const handleClick = () => {
        setOpenSnack(true);
    };

    const handleCloseSnack = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpenSnack(false);
    };

    const history = useNavigate();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        service.loginUser(email, password).then(data => {
            if(data.role.includes('admin') || data.role.includes('superAdmin')){
                localStorage.setItem('admin-token', data.token);
                localStorage.setItem('admin-id', data.userID);
                setUserStatus(true);
                history('/dashboard');
                }
                handleClick(); 
            }
            
        ).catch(err => console.log(err));
        
    }

    return (
        <div className="login-card">
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={openSnack} autoHideDuration={3000} onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity="error" sx={{ width: '100%' }}>
                Cannot log into account. You probably have no admin rights.
                </Alert>
            </Snackbar>
            <div className="login-container">
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    {<LockOpenRoundedIcon />}
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} className="login-box" noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                </Box>
            </div>
        </div>
    );
}

export default Login;