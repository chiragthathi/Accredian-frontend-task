import React, { useState } from 'react';
import { TextField, Button, Box, InputLabel, Typography, Divider } from '@mui/material';
import { Link } from 'react-router-dom';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const handleUsernameChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);

    const handleLogin = async (event) => {
        event.preventDefault();

        const newErrors = {};

        if (!email.trim()) {
            newErrors.email = 'Email is required';
        }

        if (!password.trim()) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        console.log(newErrors)

        if (Object.keys(newErrors).length === 0) {
            try {
                const response = await fetch('http://localhost:5000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "*",
                    },
                    mode: "cors",
                    referrerPolicy: "origin-when-cross-origin",
                    body: JSON.stringify({ email, password }),
                });

                const data = await response.json();
                console.log(data) 

                if (data.auth) {
                    alert('Login successful!');
                    console.log('Login successful.');
                    // Handle successful login logic (e.g., store token, navigate to dashboard)
                } else {
                    console.error('Login failed:', data.error);
                    // Handle login failure logic (e.g., display error message)
                }
            } catch (error) {
                console.error('Error:', error);
                // Handle network errors or other exceptions
            }
        }
    };

    return (
        <Box maxWidth={400} mx="auto" mt={22} p={3} border="1px solid #ccc">
            <Typography variant="h4" color="black" fontWeight="bold" gutterBottom>
                Login
            </Typography>
            <Divider sx={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', marginBottom: '16px' }} />
            <Box mb={2}>
                <form onSubmit={handleLogin} mb={2} display="flex" alignItems="center" position="relative">
                    <Box display="flex" alignItems="center">
                        <InputLabel htmlFor="email" style={{ marginRight: '8px', marginBottom: '-17px', color: 'black' }}>
                            Email
                        </InputLabel>
                        <Typography
                            variant="inherit"
                            color="error"
                            style={{
                                position: 'absolute',
                                top: '16.8em',
                                left: '605px', // Adjust this value to align it properly
                            }}
                        >
                            *
                        </Typography>
                    </Box>
                    <TextField
                        id="email"
                        value={email}
                        //onChange={(e) => setEmail(e.target.value)}
                        onChange={handleUsernameChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        fullWidth
                        margin="normal"
                    />

                    <Box display="flex" alignItems="center" position="relative">
                        <InputLabel htmlFor="password" style={{ marginRight: '8px', marginBottom: '-17px', color: 'black' }}>
                            Password
                        </InputLabel>
                        <Typography
                            variant="inherit"
                            color="error"
                            style={{
                                position: 'absolute',
                                top: '-0.2em',
                                left: '71px', // Adjust this value to align it properly
                            }}
                        >
                            *
                        </Typography>
                    </Box>
                    <TextField
                        id="password"
                        value={password}
                        // onChange={(e) => setPassword(e.target.value)}
                        onChange={handlePasswordChange}
                        error={!!errors.password}
                        helperText={errors.password}
                        fullWidth
                        margin="normal"
                        type="password"
                    />

                    <Box mt={2}>
                        <Button variant="contained" color="primary" onClick={handleLogin} fullWidth>
                            Login
                        </Button>
                        <div style={{ color: 'blue', marginTop: '9px', textDecoration: 'none' }}>
                            <Link to="/signup" style={{ color: 'blue', textDecoration: 'none' }}>Sign Up</Link>
                        </div>
                        <div style={{ color: 'black', marginTop: '9px', textDecoration: 'none' }}>
                            <Link to="/ForgetPassword" style={{ color: 'black', textDecoration: 'none' }}>Forget Password</Link>
                        </div>
                    </Box>
                </form>
            </Box>
        </Box>
    );
};

export default LoginForm;
