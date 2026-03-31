# Smart Feedback Management System

A full-stack application for collecting, analyzing, and managing customer feedback with sentiment analysis and analytics dashboard.

## Project Structure

```
smart-feedback-system/
├── frontend/          # React frontend application
├── backend/           # Spring Boot backend API
└── README.md         # This file
```

## Features

### Frontend (React)
- **Home Page**: Landing page with navigation to different sections
- **Submit Feedback Page**: Form for users to submit feedback with validation
- **Admin Dashboard**: View, filter, search, and manage all feedback
- **Analytics Page**: Visual charts showing feedback statistics and sentiment analysis
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Built with Material-UI components

### Backend (Spring Boot)
- **REST APIs**: Complete CRUD operations for feedback management
- **Sentiment Analysis**: Automatic sentiment detection using keyword-based analysis
- **Database Integration**: MySQL with JPA/Hibernate
- **Security**: Basic Spring Security configuration
- **CORS Support**: Enabled for frontend integration

## Quick Start

### Prerequisites
- Java 17 or higher
- Node.js 16 or higher
- MySQL Server
- Maven

### Database Setup

1. Install MySQL Server
2. Create database:
```sql
CREATE DATABASE feedback_db;
```

3. Update database credentials in `backend/src/main/resources/application.properties`:
```properties
spring.datasource.username=your_mysql_username
spring.datasource.password=your_mysql_password
```

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Build and run the application:
```bash
mvn clean install
mvn spring-boot:run
```

The backend API will be available at `http://localhost:8080`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will be available at `http://localhost:3000`

## API Endpoints

### Feedback Management
- `POST /api/feedback` - Submit new feedback
- `GET /api/feedback` - Get all feedback
- `GET /api/feedback/{id}` - Get feedback by ID
- `DELETE /api/feedback/{id}` - Delete feedback

### Filtering & Search
- `GET /api/feedback/rating/{rating}` - Get feedback by rating
- `GET /api/feedback/category/{category}` - Get feedback by category
- `GET /api/feedback/sentiment/{sentiment}` - Get feedback by sentiment
- `GET /api/feedback/search?query={query}` - Search feedback

### Analytics
- `GET /api/feedback/analytics/ratings` - Get ratings distribution
- `GET /api/feedback/analytics/sentiments` - Get sentiment distribution

## Usage

1. **Submit Feedback**: Navigate to "Submit Feedback" page and fill out the form
2. **View Dashboard**: Go to "Admin Dashboard" to see all submitted feedback
3. **Analyze Data**: Visit "Analytics" page to view charts and statistics

## Technology Stack

### Frontend
- React 18
- Material-UI (MUI)
- React Router
- Axios
- Recharts
- React Hooks

### Backend
- Spring Boot 3.2.0
- Spring Web
- Spring Data JPA
- Spring Security
- MySQL Connector
- Lombok
- Maven

## Database Schema

### Feedback Table
- `id` (Long, Primary Key, Auto-increment)
- `name` (String, Not Null)
- `email` (String, Not Null)
- `rating` (Integer, Not Null, 1-5)
- `message` (Text, Not Null)
- `category` (String, Optional)
- `sentiment` (String, Auto-calculated)
- `createdAt` (Timestamp, Auto-generated)

## Sentiment Analysis

The system uses keyword-based sentiment analysis:
- **Positive Words**: good, great, excellent, amazing, fantastic, wonderful, best, love, perfect, awesome, nice, happy, satisfied
- **Negative Words**: bad, terrible, awful, horrible, worst, hate, disappointed, poor, sad, angry, frustrated, useless, waste
- **Neutral**: Default when no strong positive/negative indicators found

## Development

### Running Tests

**Backend:**
```bash
cd backend
mvn test
```

**Frontend:**
```bash
cd frontend
npm test
```

### Building for Production

**Backend:**
```bash
cd backend
mvn clean package
```

**Frontend:**
```bash
cd frontend
npm run build
```

## Configuration

### Backend Configuration
- Database settings: `backend/src/main/resources/application.properties`
- Server port: Default 8080
- CORS: Configured for localhost:3000

### Frontend Configuration
- API base URL: `src/services/api.js`
- Development server port: Default 3000

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure MySQL server is running
   - Check database credentials in application.properties
   - Verify database exists and user has permissions

2. **CORS Issues**
   - Ensure backend is running on port 8080
   - Check CORS configuration in SecurityConfig.java

3. **Frontend Build Errors**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check Node.js version compatibility

4. **Backend Build Errors**
   - Ensure Java 17+ is installed
   - Check Maven version compatibility
   - Verify all dependencies in pom.xml

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions, please create an issue in the repository.
