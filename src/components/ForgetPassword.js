import React, { useState } from 'react';
import { TextField, Button, Box, InputLabel, Typography, Divider } from '@mui/material';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});

    const handleLogin = async () => {
        const newErrors = {};

        if (!email.trim()) {
            newErrors.email = 'Email is required';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                const response = await fetch('/forgot-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                });

                if (response.ok) {
                    // Email sent successfully
                    // Navigate to the password reset page
                    window.location.href = '/reset-password'; // Replace with your reset password page URL
                } else {
                    console.error('Failed to send reset link');
                }
            } catch (error) {
                console.error('Error sending reset link:', error);
            }
        }
    };

    return (
        <Box maxWidth={400} mx="auto" mt={22} p={3} border="1px solid #ccc">
            <Typography variant="h4" color="black" fontWeight="bold" gutterBottom>
                Forget Password
            </Typography>
            <Divider sx={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', marginBottom: '16px' }} />
            <Box mb={2}>
                <form mb={2} display="flex" alignItems="center" position="relative">
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
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!errors.email}
                        helperText={errors.email}
                        fullWidth
                        margin="normal"
                    />
                    <Box mt={2}>
                        <Button variant="contained" color="primary" onClick={handleLogin} fullWidth>
                            Change Password
                        </Button>
                    </Box>
                </form>
            </Box>
        </Box>
    );
};

export default ForgetPassword;
