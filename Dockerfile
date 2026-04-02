# Use official OpenJDK 17 runtime as a parent image
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy maven wrapper and pom.xml for dependency caching
COPY backend/mvnw backend/mvnw
COPY backend/.mvn backend/.mvn
COPY backend/pom.xml backend/pom.xml

# Download dependencies
RUN cd backend && ./mvnw dependency:go-offline -B

# Copy source code
COPY backend/src backend/src

# Build the application
RUN cd backend && ./mvnw clean package -DskipTests

# Expose port
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "backend/target/smart-feedback-system.jar", "--spring.profiles.active=render"]
