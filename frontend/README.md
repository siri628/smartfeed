# Smart Feedback System - Frontend

React frontend application for the Smart Feedback Management System.

## Overview

This frontend provides a modern, responsive interface for submitting feedback and managing it through admin dashboards with analytics.

## Technologies Used

- **React 18** - UI framework
- **Material-UI (MUI)** - UI component library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Recharts** - Chart library
- **React Hooks** - State management

## Project Structure

```
frontend/
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── pages/
│   │   ├── Home.js              # Landing page
│   │   ├── SubmitFeedback.js    # Feedback submission form
│   │   ├── AdminDashboard.js    # Admin management dashboard
│   │   └── Analytics.js         # Analytics and charts
│   ├── services/
│   │   └── api.js               # API service layer
│   ├── App.js                   # Main application component
│   └── index.js                 # Application entry point
├── package.json                 # Dependencies and scripts
└── README.md                    # This file
```

## Features

### Pages

1. **Home Page** (`/`)
   - Landing page with navigation cards
   - Overview of system features
   - Quick access to all main sections

2. **Submit Feedback** (`/submit-feedback`)
   - Form with validation
   - Rating system (1-5 stars)
   - Category selection
   - Email and name fields
   - Success/error handling

3. **Admin Dashboard** (`/admin`)
   - View all feedback in table format
   - Filter by rating, category, sentiment
   - Search functionality
   - Delete feedback
   - Pagination
   - Real-time refresh

4. **Analytics** (`/analytics`)
   - Bar chart for ratings distribution
   - Pie chart for sentiment analysis
   - Statistics cards
   - Detailed breakdowns

### UI Components

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Material-UI Theme**: Consistent design system
- **Loading States**: Spinners and skeleton screens
- **Error Handling**: User-friendly error messages
- **Form Validation**: Real-time validation feedback

## Prerequisites

- Node.js 16 or higher
- npm or yarn

## Installation and Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm start
   ```

4. **Open browser:**
   Navigate to `http://localhost:3000`

## Available Scripts

```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm run eject      # Eject from Create React App (one-way operation)
```

## API Integration

The frontend communicates with the backend through the API service layer located in `src/services/api.js`.

### API Endpoints Used

```javascript
// Feedback Management
POST /api/feedback                    # Submit feedback
GET /api/feedback                     # Get all feedback
GET /api/feedback/{id}                # Get feedback by ID
DELETE /api/feedback/{id}             # Delete feedback

// Filtering & Search
GET /api/feedback/rating/{rating}     # Filter by rating
GET /api/feedback/category/{category} # Filter by category
GET /api/feedback/sentiment/{sentiment} # Filter by sentiment
GET /api/feedback/search?query={query} # Search feedback

// Analytics
GET /api/feedback/analytics/ratings   # Get ratings distribution
GET /api/feedback/analytics/sentiments # Get sentiment distribution
```

### API Configuration

Base URL is configured in `src/services/api.js`:
```javascript
const API_BASE_URL = 'http://localhost:8080/api';
```

## Component Details

### Home Component
- **Purpose**: Landing page and navigation hub
- **Features**: Feature cards, navigation buttons
- **Dependencies**: Material-UI components

### SubmitFeedback Component
- **Purpose**: Form for submitting feedback
- **Features**: Form validation, rating component, category selection
- **State**: Form data, loading states, error/success messages
- **Validation**: Email format, required fields

### AdminDashboard Component
- **Purpose**: Manage and view all feedback
- **Features**: Table view, filters, search, pagination, delete functionality
- **State**: Feedback list, filters, pagination, loading states
- **Components**: Material-UI Table, Chip, IconButton

### Analytics Component
- **Purpose**: Display feedback analytics
- **Features**: Charts (bar, pie), statistics cards, detailed breakdowns
- **Charts**: Recharts library for visualizations
- **State**: Analytics data, loading states

## Styling

### Material-UI Theme
Custom theme configured in `src/index.js`:
```javascript
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});
```

### Responsive Design
- Uses Material-UI's responsive grid system
- Mobile-first approach
- Breakpoints: xs, sm, md, lg, xl

## State Management

The application uses React Hooks for state management:

- **useState**: Component-level state
- **useEffect**: Side effects and API calls
- **useNavigate**: Navigation between pages

### Example State Management
```javascript
const [feedbackList, setFeedbackList] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState('');

useEffect(() => {
  fetchFeedback();
}, []);
```

## Error Handling

### API Errors
- Network errors handled with try-catch blocks
- User-friendly error messages displayed
- Retry functionality where appropriate

### Form Validation
- Real-time validation feedback
- Required field validation
- Email format validation
- Custom validation rules

## Performance Considerations

### Optimization Techniques
- Component memoization where needed
- Efficient API calls with proper loading states
- Pagination for large datasets
- Debounced search functionality

### Bundle Size
- Code splitting with React.lazy
- Optimized dependencies
- Production build optimization

## Testing

### Running Tests
```bash
npm test
```

### Test Coverage
Tests should cover:
- Component rendering
- Form validation
- API integration
- User interactions

### Example Test Structure
```javascript
import { render, screen } from '@testing-library/react';
import SubmitFeedback from '../pages/SubmitFeedback';

test('renders submit feedback form', () => {
  render(<SubmitFeedback />);
  expect(screen.getByText('Submit Your Feedback')).toBeInTheDocument();
});
```

## Building for Production

1. **Create production build:**
   ```bash
   npm run build
   ```

2. **Deploy build folder:**
   The `build` folder contains optimized static files

3. **Serve with static server:**
   ```bash
   npx serve -s build
   ```

## Environment Variables

Create `.env` file in root directory:
```
REACT_APP_API_URL=http://localhost:8080/api
```

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Common Issues

1. **API Connection Errors**
   - Ensure backend is running on port 8080
   - Check CORS configuration in backend
   - Verify API base URL in api.js

2. **Build Errors**
   - Clear node_modules: `rm -rf node_modules`
   - Reinstall dependencies: `npm install`
   - Check Node.js version compatibility

3. **Routing Issues**
   - Ensure BrowserRouter is wrapping the app
   - Check route definitions in App.js
   - Verify navigation functions

4. **Styling Issues**
   - Check Material-UI imports
   - Verify theme configuration
   - Clear browser cache

## Development Tips

### Code Organization
- Keep components in separate files
- Use descriptive component names
- Follow React naming conventions
- Organize imports alphabetically

### Best Practices
- Use functional components with hooks
- Implement proper error boundaries
- Add loading states for async operations
- Use semantic HTML elements
- Follow accessibility guidelines

### Debugging
- Use React DevTools browser extension
- Console.log for debugging (remove in production)
- Network tab for API debugging
- Component state inspection

## Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Add tests
5. Ensure build passes
6. Submit pull request

## License

This project is licensed under the MIT License.
