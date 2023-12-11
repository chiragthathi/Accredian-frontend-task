import React, { useState } from 'react';
import { TextField, Button, Box, InputLabel, Typography, Divider } from '@mui/material';
import { Link } from 'react-router-dom';

const SignUpForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});

    const handleNameChange = (event) => setName(event.target.value);
    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);
    const handleConfirmPasswordChange = (event) => setConfirmPassword(event.target.value);

    const validateInput = () => {
        const newErrors = {};

        if (name.length < 3) {
            newErrors.name = 'Username must be at least 3 characters long.';
        }

        if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            newErrors.email = 'Invalid email address.';
        }

        if (password.length < 5) {
            newErrors.password = 'Password must be at least 5 characters long.';
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSignUp = async (event) => {
        event.preventDefault();

        const isValid = validateInput();
        if (!isValid) {
            return;
        }
        const paylord = JSON.stringify({ username: name, email: email, password: password });
        console.log(paylord)

        // Send user data to server
        const response = await fetch('http://localhost:5000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            },
            mode: "cors",
            referrerPolicy: "origin-when-cross-origin",
            body: paylord,
        }); 

        const data = await response.json();
        console.log(data)

        if (data.success) {
            alert('Sign-up successful!');
            console.log('Sign-up successful!');
        } else {
            // Display errors
            console.error('Sign-up failed:', data.errors);
            setErrors({ general: 'There was an error creating your account.' });
        }
    };

    return (
        <Box maxWidth={400} mx="auto" mt={18} p={3} border="1px solid #ccc">
            <Typography variant="h4" color="black" fontWeight="bold" gutterBottom>
                Sign Up
            </Typography>
            <Divider sx={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', marginBottom: '16px' }} />
            <Box mb={2}>
                <form onSubmit={SignUpForm}>
                    <Box display="flex" alignItems="center">
                        <InputLabel htmlFor="name" style={{ marginRight: '8px', marginBottom: '-17px', color: 'black' }}>
                            Name
                        </InputLabel>
                        <Typography
                            variant="inherit"
                            color="error"
                            style={{
                                position: 'absolute',
                                top: '15em',
                                left: '608px', // Adjust this value to align it properly
                            }}
                        >
                            *
                        </Typography>
                    </Box>
                    <TextField
                        id="name"
                        value={name}
                        //onChange={(e) => setName(e.target.value)}
                        onChange={handleNameChange}
                        error={!!errors.name}
                        helperText={errors.name}
                        fullWidth
                        margin="normal"
                    />
                    <Box display="flex" alignItems="center">
                        <InputLabel htmlFor="email" style={{ marginRight: '8px', marginBottom: '-17px', color: 'black' }}>
                            Email
                        </InputLabel>
                        <Typography
                            variant="inherit"
                            color="error"
                            style={{
                                position: 'absolute',
                                top: '20.3em',
                                left: '606px', // Adjust this value to align it properly
                            }}
                        >
                            *
                        </Typography>
                    </Box>
                    <TextField
                        id="email"
                        value={email}
                        //onChange={(e) => setEmail(e.target.value)}
                        onChange={handleEmailChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        fullWidth
                        margin="normal"
                        type="email"

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
                                top: '-0em',
                                left: '72px', // Adjust this value to align it properly
                            }}
                        >
                            *
                        </Typography>
                    </Box>
                    <TextField
                        id="password"
                        value={password}
                        //onChange={(e) => setPassword(e.target.value)}
                        onChange={handlePasswordChange}
                        error={!!errors.password}
                        helperText={errors.password}
                        fullWidth
                        margin="normal"
                        type="password"
                    />

                    <Box display="flex" alignItems="center" position="relative">
                        <InputLabel htmlFor="password" style={{ marginRight: '8px', marginBottom: '-17px', color: 'black' }}>
                            Confirm Password
                        </InputLabel>
                        <TextField
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword}
                            fullWidth
                            margin="normal"
                            type="password"
                        />
                    </Box>
                </form>
            </Box>
            <Button variant="contained" color="primary" onClick={handleSignUp} fullWidth>
                Sign Up
            </Button>
            <div style={{ marginTop: '9px' }}>
                Already a user? <Link to="/">Login in</Link>
            </div>
        </Box>
    );
};

export default SignUpForm;
