import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from 'recharts';
import { feedbackAPI } from '../services/api';

const Analytics = () => {
  const [ratingsData, setRatingsData] = useState([]);
  const [sentimentsData, setSentimentsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const COLORS = {
    positive: '#4caf50',
    negative: '#f44336',
    neutral: '#ff9800'
  };

  const ratingColors = ['#f44336', '#ff9800', '#ffc107', '#8bc34a', '#4caf50'];

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    setLoading(true);
    setError('');
    try {
      const [ratingsResponse, sentimentsResponse] = await Promise.all([
        feedbackAPI.getRatingsAnalytics(),
        feedbackAPI.getSentimentsAnalytics()
      ]);

      const ratingsArray = Object.entries(ratingsResponse.data).map(([rating, count]) => ({
        rating: `${rating} Star${rating > 1 ? 's' : ''}`,
        count: count,
        value: parseInt(rating)
      }));

      const sentimentsArray = Object.entries(sentimentsResponse.data).map(([sentiment, count]) => ({
        name: sentiment.charAt(0).toUpperCase() + sentiment.slice(1),
        value: count,
        sentiment: sentiment
      }));

      setRatingsData(ratingsArray);
      setSentimentsData(sentimentsArray);
    } catch (err) {
      setError('Failed to fetch analytics data');
      console.error('Error fetching analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  const getTotalFeedback = () => {
    return ratingsData.reduce((sum, item) => sum + item.count, 0);
  };

  const getAverageRating = () => {
    if (ratingsData.length === 0) return 0;
    const totalRating = ratingsData.reduce((sum, item) => sum + (item.value * item.count), 0);
    return (totalRating / getTotalFeedback()).toFixed(1);
  };

  const getDominantSentiment = () => {
    if (sentimentsData.length === 0) return 'N/A';
    return sentimentsData.reduce((max, item) => item.value > max.value ? item : max).name;
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom color="primary">
        Feedback Analytics
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Feedback
              </Typography>
              <Typography variant="h4">
                {getTotalFeedback()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Average Rating
              </Typography>
              <Typography variant="h4">
                {getAverageRating()}★
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Dominant Sentiment
              </Typography>
              <Typography variant="h4">
                {getDominantSentiment()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Categories
              </Typography>
              <Typography variant="h4">
                {ratingsData.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Ratings Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ratingsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="rating" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" name="Number of Reviews">
                  {ratingsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={ratingColors[index]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Sentiment Analysis
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sentimentsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sentimentsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[entry.sentiment]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Detailed Statistics
            </Typography>
            <Grid container spacing={2}>
              {ratingsData.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.rating}>
                  <Box sx={{ p: 2, border: 1, borderColor: 'grey.300', borderRadius: 1 }}>
                    <Typography variant="subtitle1" color="primary">
                      {item.rating}
                    </Typography>
                    <Typography variant="h6">
                      {item.count} reviews
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {getTotalFeedback() > 0 ? ((item.count / getTotalFeedback()) * 100).toFixed(1) : 0}% of total
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Sentiment Breakdown
            </Typography>
            <Grid container spacing={2}>
              {sentimentsData.map((item) => (
                <Grid item xs={12} sm={4} key={item.sentiment}>
                  <Box sx={{ p: 2, border: 1, borderColor: 'grey.300', borderRadius: 1 }}>
                    <Typography variant="subtitle1" sx={{ color: COLORS[item.sentiment] }}>
                      {item.name}
                    </Typography>
                    <Typography variant="h6">
                      {item.value} reviews
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {getTotalFeedback() > 0 ? ((item.value / getTotalFeedback()) * 100).toFixed(1) : 0}% of total
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Analytics;
