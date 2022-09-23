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
import Grid from '@mui/material/Grid';
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

const RegistrationForm = () => {
    const [registrationErrors, setRegistrationErrors] = useState({});
    const navigate = useNavigate();

    const onChangeHandlerRegister = (e) => {
        if (registrationErrors.hasOwnProperty(e.target.name)) {
            let state = {...registrationErrors};
            delete state[e.target.name];
            setRegistrationErrors(state);
        }
    }

    const handleRegister = (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        let formObject = {};
        formData.forEach((value, key) => formObject[key] = value);
        axios.post("http://localhost:8000/api/register", formObject)
        .then(response => {
            console.log(response);
            navigate("/home");})
        .catch(error => {
            console.log("There was an error: ", error);
            setRegistrationErrors(error.response.data.errors);
            })
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
                    Create a DiviTrack Account
                </Typography>
                <Box component="form" noValidate onSubmit={handleRegister} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        {registrationErrors.hasOwnProperty('firstName') ? <div className="alert alert-danger p-1">{registrationErrors.firstName.message}</div> : ""}
                        <TextField
                        onChange={(e)=>{onChangeHandlerRegister(e)}}
                        autoComplete="given-name"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        {registrationErrors.hasOwnProperty('lastName') ? <div className="alert alert-danger p-1">{registrationErrors.lastName.message}</div> : ""}
                        <TextField
                        onChange={(e)=>{onChangeHandlerRegister(e)}}
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="family-name"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {registrationErrors.hasOwnProperty('email') ? <div className="alert alert-danger p-1">{registrationErrors.email.message}</div> : ""}
                        <TextField
                        onChange={(e)=>{onChangeHandlerRegister(e)}}
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {registrationErrors.hasOwnProperty('password') ? <div className="alert alert-danger p-1">{registrationErrors.password.message}</div> : ""}
                        <TextField
                        onChange={(e)=>{onChangeHandlerRegister(e)}}
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {registrationErrors.hasOwnProperty('confirmPassword') ? <div className="alert alert-danger p-1">{registrationErrors.confirmPassword.message}</div> : ""}
                        <TextField
                        onChange={(e)=>{onChangeHandlerRegister(e)}}
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        autoComplete="confirm-new-password"
                        />
                    </Grid>
                    </Grid>
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Sign Up
                    </Button>
                </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
            </ThemeProvider>
    )
}

export default RegistrationForm