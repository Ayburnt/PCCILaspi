# Authentication System Setup Guide

## Backend Setup

### 1. Install Dependencies
```bash
cd backend/admin
pip install -r requirements.txt
```

### 2. Configure Environment Variables
Edit `.env` file and update:
- `DATABASE_URL`: Your PostgreSQL connection string
- `SECRET_KEY`: Generate a secure key using: `openssl rand -hex 32`

### 3. Initialize Database
The database tables will be created automatically when you start the server.

### 4. Start the Backend Server
```bash
uvicorn main:app --reload --port 8000
```

The API will be available at: `http://localhost:8000`
API Documentation: `http://localhost:8000/docs`

## Frontend Setup

### 1. The route is already configured in App.jsx
Navigate to: `http://localhost:5173/admin/login`

## API Endpoints

### Authentication Routes
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user info (requires token)
- `POST /api/auth/logout` - Logout user

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR UNIQUE NOT NULL,
    username VARCHAR UNIQUE NOT NULL,
    hashed_password VARCHAR NOT NULL,
    full_name VARCHAR,
    role VARCHAR NOT NULL DEFAULT 'member', -- 'admin' or 'member'
    is_active INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```

## User Roles
- **Member**: Regular user access
- **Admin**: Administrative access

## Security Features
- Password hashing with bcrypt
- JWT token authentication
- Role-based access control
- Protected routes

## Usage

### Sign Up
Users can register with:
- Username
- Email
- Password
- Full Name (optional)
- Role (member/admin)

### Sign In
Users login with:
- Username
- Password

### Protected Routes
Use the JWT token in Authorization header:
```
Authorization: Bearer <token>
```

## Testing with curl

### Register a new admin user:
```bash
curl -X POST http://localhost:8000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@example.com",
    "password": "securepassword",
    "full_name": "Admin User",
    "role": "admin"
  }'
```

### Login:
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "securepassword"
  }'
```

### Get current user:
```bash
curl -X GET http://localhost:8000/api/auth/me \
  -H "Authorization: Bearer <your_token_here>"
```
