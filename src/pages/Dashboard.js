// src/pages/Dashboard.js

import React from 'react';
import { Container, Button, AppBar, Toolbar, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import StoreIcon from '@mui/icons-material/Store'; // Icon for Products
import CategoryIcon from '@mui/icons-material/Category'; // Icon for Categories
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // Icon for Login

const Dashboard = () => {
  const router = useRouter();

  const handleNavigate = (path) => {
    router.push(path); // Use Next.js router to navigate to the specified path
  };



  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Button 
            color="inherit" 
            onClick={() => handleNavigate('/product-management')}
            startIcon={<StoreIcon />}
          >
            Products
          </Button>
          <Button 
            color="inherit" 
            onClick={() => handleNavigate('/Category-management')}
            startIcon={<CategoryIcon />}
          >
            Categories
          </Button>
          <Button 
            color="inherit" 
            onClick={() => handleNavigate('/Login')}
            startIcon={<ExitToAppIcon />}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Typography variant="h4" align="center" style={{ marginTop: '2rem' }}>
          Welcome to the Home
        </Typography>
      </Container>
    </Container>
  );
};

export default Dashboard;