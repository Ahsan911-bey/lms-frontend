# Frontend Migration Guide: Fake Auth to Real Spring Security & JWT

This guide outlines the changes required in the frontend application to switch from the temporary "Fake Auth" to the production-ready **Spring Security + JWT Authentication** system.

## 1. Authentication Flow Overview

| Feature | Old (Fake Auth) | New (Real Auth) |
| :--- | :--- | :--- |
| **Login Mechanism** | Client-side check or simple mock endpoint | **POST request** to backend to get **JWT Token** |
| **Session** | Stored custom flag/object in LocalStorage | Store **JWT Token** in LocalStorage/Cookies |
| **Protection** | Client-side routing checks only | **JWT in Header** (`Authorization: Bearer <token>`) |

## 2. API Endpoints

### Login Endpoints (POST Only)
The backend now exposes three distinct login endpoints. Ensure you use the correct JSON body format.

#### Admin Login
- **URL**: `${API_BASE_URL}/admin/login`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "id": 1,
    "password": "admin123"
  }
  ```

#### Teacher Login
- **URL**: `${API_BASE_URL}/teacher/login`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "id": 1,
    "password": "password"
  }
  ```

#### Student Login
- **URL**: `${API_BASE_URL}/student/login`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "id": 1,
    "regNo": "CS-001",
    "password": "password"
  }
  ```

### New Response Format
All login endpoints return the following structure on success (Status 200):
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJh...",
  "email": "user@example.com",
  "role": "STUDENT" // or TEACHER, ADMIN
}
```

## 3. Implementation Steps for Frontend Developer

### Step 1: Update Login Function
Replace the fake login logic with an API call:
```javascript
// Example using fetch
const login = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}/student/login`, { // Choose correct endpoint based on user type
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });

  if (!response.ok) throw new Error('Login failed');

  const data = await response.json();
  // STORE THIS TOKEN SAFELY
  localStorage.setItem('jwt_token', data.token);
  localStorage.setItem('user_role', data.role);
};
```

### Step 2: Attach Token to Requests
Create an interceptor (if using Axios) or a wrapper (if using Fetch) to attach the token to **every** authenticated request.

```javascript
// Axios Interceptor Example
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('jwt_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Authorization: Bearer <token>
  }
  return config;
});
```

### Step 3: Handle 401 Unauthorized
If the backend returns a `401 Unauthorized` status (e.g., token expired), the frontend should automatically log the user out and redirect them to the login page.

---

## 4. CORS Configuration
The backend has been configured to allow requests from:
- `http://localhost:3000`
- `https://lms-main.vercel.app`

Ensure your frontend runs on one of these origins during development and production.
