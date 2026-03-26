# Joint Farming System - Running Status ✅

## Current Status: FULLY OPERATIONAL

### Backend (Spring Boot)
- **Status**: ✅ Running
- **Port**: 8080
- **URL**: http://localhost:8080
- **Health Check**: http://localhost:8080/api/health
- **Process ID**: Terminal 2

### Frontend (React)
- **Status**: ✅ Running
- **Port**: 3000
- **URL**: http://localhost:3000
- **Network URL**: http://192.168.56.1:3000
- **Process ID**: Terminal 4

## Verified Endpoints

### ✅ Health Check
```
GET http://localhost:8080/api/health
Response: {"message":"JFS Backend is running","status":"ok"}
```

### ✅ User Registration
```
POST http://localhost:8080/api/auth/register
Body: {
  "name": "Test Farmer",
  "email": "farmer@test.com",
  "password": "password123",
  "userType": "FARMER"
}
Response: {
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "email": "farmer@test.com",
  "name": "Test Farmer",
  "userType": "FARMER"
}
```

### ✅ User Login
```
POST http://localhost:8080/api/auth/login
Body: {
  "email": "farmer@test.com",
  "password": "password123"
}
Response: {
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "email": "farmer@test.com",
  "name": "Test Farmer",
  "userType": "FARMER"
}
```

## How to Test the Application

### 1. Access the Application
Open your browser and go to: **http://localhost:3000**

### 2. Test Sign Up
1. Click "Sign Up" in the navigation
2. Fill in the form:
   - Name: Your Name
   - Email: your@email.com
   - Password: password123 (minimum 6 characters)
   - User Type: Choose "Farmer" or "Apartment Community"
3. Click "Sign Up"
4. You should be automatically logged in and redirected to your dashboard

### 3. Test Sign In
1. Click "Logout" if you're logged in
2. Click "Sign In" in the navigation
3. Enter your credentials:
   - Email: your@email.com
   - Password: password123
4. Click "Sign In"
5. You should be redirected to your dashboard

### 4. Test Dashboards

#### Farmer Dashboard
- Add crop listings (name, quantity, price)
- View your crop listings
- See demand insights

#### Apartment Dashboard
- Place bulk orders for crops
- View your orders
- See community stats

### 5. Test Logout
- Click "Logout" in the navigation
- You should be redirected to the home page
- Navigation should show "Sign In" and "Sign Up" again

## Database Access

You can view the H2 database console at:
**http://localhost:8080/h2-console**

Connection details:
- JDBC URL: `jdbc:h2:mem:jfsdb`
- Username: `sa`
- Password: (leave empty)

## Features Implemented

✅ User Registration (Sign Up)
✅ User Login (Sign In)
✅ JWT Token Authentication
✅ Protected Routes
✅ User Type Selection (Farmer/Apartment)
✅ Automatic Dashboard Routing
✅ Logout Functionality
✅ Farmer Dashboard
✅ Apartment Dashboard
✅ CORS Configuration
✅ Error Handling
✅ Form Validation
✅ Responsive Design

## Technical Stack

### Backend
- Spring Boot 3.2.0
- Spring Security
- Spring Data JPA
- H2 Database (in-memory)
- JWT (JSON Web Tokens)
- Maven

### Frontend
- React 18.2.0
- React Router 6.20.0
- Axios 1.6.2
- CSS3

## Stopping the Application

### Stop Frontend
```bash
# The frontend is running in Terminal 4
# You can stop it from the IDE or use Ctrl+C in the terminal
```

### Stop Backend
```bash
# The backend is running in Terminal 2
# You can stop it from the IDE or use Ctrl+C in the terminal
```

## Troubleshooting

### Port Already in Use
If you get "port already in use" errors:
```bash
# For port 3000 (Frontend)
netstat -ano | Select-String ":3000"
Stop-Process -Id <PID> -Force

# For port 8080 (Backend)
netstat -ano | Select-String ":8080"
Stop-Process -Id <PID> -Force
```

### Backend Not Responding
1. Check if backend is running: http://localhost:8080/api/health
2. Check backend logs in Terminal 2
3. Restart backend: `mvn spring-boot:run` in backend folder

### Frontend Proxy Errors
1. Ensure backend is running on port 8080
2. Check package.json has `"proxy": "http://localhost:8080"`
3. Restart frontend: `npm start` in frontend folder

## Next Steps

You can now:
1. Test the authentication flow
2. Add more features to the dashboards
3. Implement crop management
4. Add order processing
5. Implement real-time notifications
6. Add payment integration
7. Enhance the UI/UX

---

**Last Updated**: March 5, 2026
**Status**: All systems operational ✅
