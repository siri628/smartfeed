# Smart Feedback System - Backend

Spring Boot REST API for the Smart Feedback Management System.

## Overview

This backend provides RESTful APIs for managing customer feedback, including sentiment analysis and analytics endpoints.

## Technologies Used

- **Spring Boot 3.2.0** - Main framework
- **Spring Web** - REST API endpoints
- **Spring Data JPA** - Database operations
- **Spring Security** - Security configuration
- **MySQL** - Database
- **Lombok** - Reduce boilerplate code
- **Maven** - Build tool

## Project Structure

```
backend/
├── src/main/java/com/feedback/
│   ├── SmartFeedbackSystemApplication.java  # Main application class
│   ├── config/
│   │   └── SecurityConfig.java              # Security configuration
│   ├── controller/
│   │   └── FeedbackController.java          # REST API endpoints
│   ├── dto/
│   │   └── FeedbackDTO.java                 # Data Transfer Object
│   ├── entity/
│   │   └── Feedback.java                    # JPA Entity
│   ├── repository/
│   │   └── FeedbackRepository.java          # JPA Repository
│   └── service/
│       └── FeedbackService.java             # Business logic
├── src/main/resources/
│   └── application.properties               # Configuration
└── pom.xml                                  # Maven dependencies
```

## Database Setup

1. **Install MySQL Server**
2. **Create Database:**
   ```sql
   CREATE DATABASE feedback_db;
   ```

3. **Update Configuration**
   Edit `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/feedback_db
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

## Running the Application

### Prerequisites
- Java 17 or higher
- Maven 3.6 or higher
- MySQL Server

### Steps

1. **Clone/Download the project**
2. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

3. **Build the project:**
   ```bash
   mvn clean install
   ```

4. **Run the application:**
   ```bash
   mvn spring-boot:run
   ```

The application will start on `http://localhost:8080`

## API Endpoints

### Base URL
```
http://localhost:8080/api/feedback
```

### Feedback Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/feedback` | Submit new feedback |
| GET | `/api/feedback` | Get all feedback |
| GET | `/api/feedback/{id}` | Get feedback by ID |
| DELETE | `/api/feedback/{id}` | Delete feedback |

### Filtering & Search

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/feedback/rating/{rating}` | Filter by rating (1-5) |
| GET | `/api/feedback/category/{category}` | Filter by category |
| GET | `/api/feedback/sentiment/{sentiment}` | Filter by sentiment |
| GET | `/api/feedback/search?query={query}` | Search feedback |

### Analytics

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/feedback/analytics/ratings` | Get ratings distribution |
| GET | `/api/feedback/analytics/sentiments` | Get sentiment distribution |

## Request/Response Examples

### Submit Feedback
**Request:**
```json
POST /api/feedback
{
  "name": "John Doe",
  "email": "john@example.com",
  "rating": 5,
  "message": "Great service! Very satisfied with the product.",
  "category": "Product Quality"
}
```

**Response:**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "rating": 5,
  "message": "Great service! Very satisfied with the product.",
  "category": "Product Quality",
  "sentiment": "positive",
  "createdAt": "2024-01-15T10:30:00"
}
```

### Get All Feedback
**Request:**
```http
GET /api/feedback
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "rating": 5,
    "message": "Great service! Very satisfied with the product.",
    "category": "Product Quality",
    "sentiment": "positive",
    "createdAt": "2024-01-15T10:30:00"
  }
]
```

## Sentiment Analysis

The system automatically analyzes feedback sentiment using keyword-based logic:

### Positive Keywords
good, great, excellent, amazing, fantastic, wonderful, best, love, perfect, awesome, nice, happy, satisfied

### Negative Keywords
bad, terrible, awful, horrible, worst, hate, disappointed, poor, sad, angry, frustrated, useless, waste

### Logic
- Count positive and negative keywords in the message
- If positive > negative: "positive"
- If negative > positive: "negative"
- Otherwise: "neutral"

## Configuration

### Application Properties

```properties
# Server Configuration
server.port=8080

# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/feedback_db
spring.datasource.username=root
spring.datasource.password=password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# CORS Configuration
spring.web.cors.allowed-origins=http://localhost:3000
spring.web.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
spring.web.cors.allowed-headers=*
spring.web.cors.allow-credentials=true
```

## Testing

### Run Unit Tests
```bash
mvn test
```

### Run Integration Tests
```bash
mvn test -Dtest=**/*IntegrationTest
```

### Test Coverage
```bash
mvn jacoco:report
```

## Building for Production

1. **Build the JAR:**
   ```bash
   mvn clean package
   ```

2. **Run the JAR:**
   ```bash
   java -jar target/smart-feedback-system-0.0.1-SNAPSHOT.jar
   ```

## Environment Variables

You can override configuration using environment variables:

```bash
export SPRING_DATASOURCE_URL=jdbc:mysql://your-db-host:3306/feedback_db
export SPRING_DATASOURCE_USERNAME=your-username
export SPRING_DATASOURCE_PASSWORD=your-password
export SERVER_PORT=8080
```

## Security

### CORS Configuration
- Allowed origins: `http://localhost:3000`
- Allowed methods: GET, POST, PUT, DELETE, OPTIONS
- Allowed headers: All headers
- Credentials: Enabled

### Authentication
Currently configured for development with permitAll(). For production, implement proper authentication.

## Database Schema

### Feedback Table
```sql
CREATE TABLE feedback (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    message TEXT NOT NULL,
    category VARCHAR(255),
    sentiment VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Error Handling

The application returns appropriate HTTP status codes:

- `200 OK` - Successful request
- `201 Created` - Resource created successfully
- `204 No Content` - Resource deleted successfully
- `400 Bad Request` - Invalid input data
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## Logging

The application uses Spring Boot's default logging configuration. Logs are printed to the console.

To enable file logging, add to `application.properties`:
```properties
logging.file.name=logs/application.log
logging.level.com.feedback=DEBUG
```

## Performance Considerations

- Database indexes are automatically created for foreign keys
- Consider adding indexes for frequently queried fields (rating, sentiment, category)
- Use pagination for large datasets
- Implement caching for analytics data

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check MySQL server is running
   - Verify database credentials
   - Ensure database exists

2. **Port Already in Use**
   - Change server port in application.properties
   - Kill process using the port

3. **CORS Issues**
   - Verify frontend URL matches allowed origins
   - Check browser developer tools for CORS errors

4. **Build Failures**
   - Clean and rebuild: `mvn clean install`
   - Check Java version compatibility

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes
4. Add tests
5. Submit pull request

## License

This project is licensed under the MIT License.
