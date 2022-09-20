import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="">
            DiviTrack
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        },
    });

const LoginForm = () => {
    const [loginErrors, setLoginErrors] = useState([]);
    const navigate = useNavigate();

    const onChangeHandlerLogin = (e) => {
        if (loginErrors.length !== 0) {
            setLoginErrors([]);
        };
    }

    const handleLogin = (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.currentTarget);
        let formObject = {};
        formData.forEach((value, key) => formObject[key] = value);

        axios.post("http://localhost:8000/api/login", formObject)
        .then(response => {
            console.log(response);
            navigate("/portfolio");})
        .catch(error => {
            console.log("There was an error: ", error);
            setLoginErrors(error.response.data.errors);})
    }

    return (
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
                {loginErrors.hasOwnProperty('auth') ? <div className="alert alert-danger p-1 mt-1 mb-0">{loginErrors.auth.message}</div> : ""}  
                <TextField
                onChange={(e)=>{onChangeHandlerLogin(e)}}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                />
                <TextField
                onChange={(e)=>{onChangeHandlerLogin(e)}}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
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
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    </ThemeProvider>
    )
}

export default LoginForm;