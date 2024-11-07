// src/pages/Login.js

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { TextField, Button, Typography, Container, Snackbar } from '@mui/material';
import { useRouter } from 'next/router'; // Import useRouter from next/router
import Alert from '@mui/material/Alert'; // Import Alert for feedback messages

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter(); // Create a router instance
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // State for error message
  const [openSnackbar, setOpenSnackbar] = useState(false); // State for Snackbar visibility

  const handleLogin = () => {
    if (!username || !password) {
      setError('Username and Password are required');
      setOpenSnackbar(true);
      return;
    }

    // Simulate a login action
    dispatch(login({ username, password })); // Include password in the dispatch
    router.push('/Dashboard'); // Navigate to Dashboard after successful login
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4">Login</Typography>
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>

      {/* Snackbar for displaying error messages */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;