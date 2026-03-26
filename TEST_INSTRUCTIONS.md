# Testing Sign In and Sign Up

## Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Build and run the Spring Boot application:
```bash
mvn clean install
mvn spring-boot:run
```

The backend will start on http://localhost:8080

## Frontend Setup

1. Open a new terminal and navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies (if not already done):
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The frontend will start on http://localhost:3000

## Testing Authentication

### Test Sign Up:
1. Go to http://localhost:3000/signup
2. Fill in the form:
   - Name: Test User
   - Email: test@example.com
   - Password: password123
   - User Type: Select either "Farmer" or "Apartment Community"
3. Click "Sign Up"
4. You should be redirected to the appropriate dashboard

### Test Sign In:
1. Go to http://localhost:3000/signin
2. Use the credentials you just created:
   - Email: test@example.com
   - Password: password123
3. Click "Sign In"
4. You should be redirected to your dashboard

### Test Logout:
1. Click the "Logout" button in the navigation bar
2. You should be redirected to the home page
3. The navigation should show "Sign In" and "Sign Up" again

## Verify Backend Endpoints

You can test the backend directly using curl:

### Register:
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Farmer",
    "email": "farmer@test.com",
    "password": "password123",
    "userType": "FARMER"
  }'
```

### Login:
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "farmer@test.com",
    "password": "password123"
  }'
```

## Common Issues

1. **CORS errors**: Make sure both frontend (port 3000) and backend (port 8080) are running
2. **Connection refused**: Ensure the backend is running on port 8080
3. **Email already exists**: Use a different email or restart the backend (H2 database is in-memory)
4. **Invalid credentials**: Check that you're using the correct email and password

## Database Console

You can view the H2 database console at:
http://localhost:8080/h2-console

- JDBC URL: jdbc:h2:mem:jfsdb
- Username: sa
- Password: (leave empty)
