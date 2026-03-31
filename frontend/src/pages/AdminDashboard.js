import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Alert,
  CircularProgress,
  Tooltip,
  Pagination
} from '@mui/material';
import { Delete, Search, Refresh } from '@mui/icons-material';
import { feedbackAPI } from '../services/api';

const AdminDashboard = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRating, setFilterRating] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterSentiment, setFilterSentiment] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const itemsPerPage = 10;

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive': return 'success';
      case 'negative': return 'error';
      default: return 'default';
    }
  };

  const getRatingColor = (rating) => {
    if (rating >= 4) return 'success';
    if (rating >= 3) return 'warning';
    return 'error';
  };

  const fetchFeedback = async () => {
    setLoading(true);
    setError('');
    try {
      let response;
      
      if (searchQuery) {
        response = await feedbackAPI.searchFeedback(searchQuery);
      } else if (filterRating) {
        response = await feedbackAPI.getFeedbackByRating(parseInt(filterRating));
      } else if (filterCategory) {
        response = await feedbackAPI.getFeedbackByCategory(filterCategory);
      } else if (filterSentiment) {
        response = await feedbackAPI.getFeedbackBySentiment(filterSentiment);
      } else {
        response = await feedbackAPI.getAllFeedback();
      }
      
      setFeedbackList(response.data);
      setTotalPages(Math.ceil(response.data.length / itemsPerPage));
    } catch (err) {
      setError('Failed to fetch feedback data');
      console.error('Error fetching feedback:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      try {
        await feedbackAPI.deleteFeedback(id);
        fetchFeedback();
      } catch (err) {
        setError('Failed to delete feedback');
        console.error('Error deleting feedback:', err);
      }
    }
  };

  const handleSearch = () => {
    setPage(1);
    fetchFeedback();
  };

  const clearFilters = () => {
    setSearchQuery('');
    setFilterRating('');
    setFilterCategory('');
    setFilterSentiment('');
    setPage(1);
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  useEffect(() => {
    if (!searchQuery && !filterRating && !filterCategory && !filterSentiment) {
      fetchFeedback();
    }
  }, [page]);

  const paginatedFeedback = feedbackList.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" component="h1" gutterBottom color="primary">
        Admin Dashboard
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Filters & Search
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <TextField
            label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            sx={{ minWidth: 200 }}
          />

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Rating</InputLabel>
            <Select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              label="Rating"
            >
              <MenuItem value="">
                <em>All Ratings</em>
              </MenuItem>
              {[1, 2, 3, 4, 5].map(rating => (
                <MenuItem key={rating} value={rating}>
                  {rating} Star{rating > 1 ? 's' : ''}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Sentiment</InputLabel>
            <Select
              value={filterSentiment}
              onChange={(e) => setFilterSentiment(e.target.value)}
              label="Sentiment"
            >
              <MenuItem value="">
                <em>All Sentiments</em>
              </MenuItem>
              <MenuItem value="positive">Positive</MenuItem>
              <MenuItem value="negative">Negative</MenuItem>
              <MenuItem value="neutral">Neutral</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            onClick={handleSearch}
            startIcon={<Search />}
          >
            Search
          </Button>

          <Button
            variant="outlined"
            onClick={clearFilters}
          >
            Clear Filters
          </Button>

          <Button
            variant="outlined"
            onClick={fetchFeedback}
            startIcon={<Refresh />}
          >
            Refresh
          </Button>
        </Box>
      </Paper>

      <Paper elevation={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Sentiment</TableCell>
                <TableCell>Message</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : paginatedFeedback.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    No feedback found
                  </TableCell>
                </TableRow>
              ) : (
                paginatedFeedback.map((feedback) => (
                  <TableRow key={feedback.id}>
                    <TableCell>{feedback.id}</TableCell>
                    <TableCell>{feedback.name}</TableCell>
                    <TableCell>{feedback.email}</TableCell>
                    <TableCell>
                      <Chip 
                        label={`${feedback.rating}★`} 
                        color={getRatingColor(feedback.rating)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{feedback.category || 'N/A'}</TableCell>
                    <TableCell>
                      <Chip 
                        label={feedback.sentiment} 
                        color={getSentimentColor(feedback.sentiment)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Tooltip title={feedback.message}>
                        <Box 
                          sx={{ 
                            maxWidth: 200, 
                            overflow: 'hidden', 
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {feedback.message}
                        </Box>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      {new Date(feedback.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(feedback.id)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(event, value) => setPage(value)}
              color="primary"
            />
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default AdminDashboard;
