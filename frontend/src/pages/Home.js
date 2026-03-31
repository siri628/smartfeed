import React from 'react';
import { Box, Container, Typography, Button, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Feedback, Assessment, Dashboard } from '@mui/icons-material';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h2" component="h1" gutterBottom color="primary">
          Smart Feedback Management System
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Collect, analyze, and manage customer feedback efficiently with our intelligent system
        </Typography>
        
        <Grid container spacing={4} sx={{ mt: 6 }}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Feedback sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Submit Feedback
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Share your thoughts and help us improve our services
              </Typography>
              <Button 
                variant="contained" 
                onClick={() => navigate('/submit-feedback')}
                sx={{ mt: 'auto' }}
              >
                Give Feedback
              </Button>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Dashboard sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Admin Dashboard
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Manage and view all submitted feedback in one place
              </Typography>
              <Button 
                variant="contained" 
                onClick={() => navigate('/admin')}
                sx={{ mt: 'auto' }}
              >
                View Dashboard
              </Button>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Assessment sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Analytics
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Get insights from feedback with detailed analytics
              </Typography>
              <Button 
                variant="contained" 
                onClick={() => navigate('/analytics')}
                sx={{ mt: 'auto' }}
              >
                View Analytics
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
