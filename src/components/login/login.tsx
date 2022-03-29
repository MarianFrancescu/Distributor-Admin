import { Box, TextField, FormControlLabel, Checkbox, Button, Grid, Avatar, Typography } from "@mui/material";
import React, { useState } from "react";
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';
import './login.css'

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('user', email, password);
    }

    return (
        <div className="login-card">
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