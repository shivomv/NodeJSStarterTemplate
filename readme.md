# User Authentication Template

A reusable user authentication system template built with the MERN stack (MongoDB, Express.js, React.js, Node.js). This template provides a complete user management system with features like registration, login, password reset, and role-based access control.

## Features

### User Authentication
- User registration with email
- User login with JWT authentication
- Password reset functionality with email verification
- Secure password storage with bcrypt hashing
- Role-based access control (user/admin)

### Security
- JWT for secure authentication
- HTTP-only cookies for token storage
- Password hashing with bcrypt
- Input validation and sanitization
- Protection against common web vulnerabilities

## API Endpoints

### User Routes
- `POST /api/v1/users/register` - Register a new user
- `POST /api/v1/users/login` - Login a user
- `GET /api/v1/users/logout` - Logout a user
- `POST /api/v1/users/password/forgot` - Request password reset
- `PUT /api/v1/users/password/reset/:token` - Reset password with token
- `PUT /api/v1/users/password/change` - Change password (authenticated)
- `GET /api/v1/users/me` - Get user profile (authenticated)

### Admin Routes
- `GET /api/v1/users/admin/users` - Get all users (admin only)
- `GET /api/v1/users/admin/user/:id` - Get user by ID (admin only)
- `PUT /api/v1/users/admin/user/:id` - Update user role (admin only)

## User Management Features

### User Profile Management
- Users can view their profile information
- Users can update their profile details
- Users can change their passwords securely
- Password reset functionality with email verification

### Admin Capabilities
- Admins can view all registered users
- Admins can view detailed information for any user
- Admins can update user roles (promote to admin or demote to regular user)

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- Nodemailer for email sending

### Frontend
- React.js
- React Router for navigation
- Axios for API requests
- Context API for state management

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd user-auth-template
```

2. Install dependencies
```bash
npm install
cd frontend && npm install
```

3. Configure environment variables
Create a `backend/config/config.env` file with the following variables:
```
PORT=4000
DB_URI='mongodb://localhost:27017/UserAuthTemplate'
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=5d
COOKIE_EXPIRE=5

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SERVICE=gmail
SMTP_MAIL=your_email@gmail.com
SMTP_PASSWORD=your_app_password
```

4. Run the development server
```bash
npm run dev
```

## Security Features

- JWT-based authentication with secure HTTP-only cookies
- Password hashing using bcrypt
- Protection against common web vulnerabilities
- Input validation and sanitization
- Role-based access control for admin features

## User Stories

### Regular User
- As a user, I want to create an account so I can access protected resources
- As a user, I want to log in securely to access my account
- As a user, I want to reset my password if I forget it
- As a user, I want to view and update my profile information
- As a user, I want to change my password periodically for security

### Admin User
- As an admin, I want to view all registered users in the system
- As an admin, I want to view detailed information about any user
- As an admin, I want to change user roles to grant or revoke admin privileges

## MongoDB Schema

### User Collection

```javascript
{
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"]
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"]
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false
  },
  avatar: {
    public_id: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  role: {
    type: String,
    default: "user"
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
}
```

## Project Structure

```
├── backend/
│   ├── api/
│   │   └── v1/
│   │       ├── routes/
│   │       │   ├── index.js
│   │       │   └── userRoutes.js
│   ├── config/
│   │   ├── config.env
│   │   └── database.js
│   ├── controllers/
│   │   └── userController.js
│   ├── middlewares/
│   │   ├── auth.js
│   │   ├── catchAsyncErrors.js
│   │   ├── error.js
│   │   └── validator.js
│   ├── models/
│   │   └── userModel.js
│   ├── services/
│   │   └── userService.js
│   ├── utils/
│   │   ├── ErrorHandler.js
│   │   ├── apiFeatures.js
│   │   ├── jwtToken.js
│   │   ├── logger.js
│   │   └── sendEmail.js
│   ├── validators/
│   │   └── userValidators.js
│   ├── logs/
│   │   ├── combined.log
│   │   ├── error.log
│   │   ├── exceptions.log
│   │   └── rejections.log
│   ├── app.js
│   └── server.js
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── ...
├── package.json
└── README.md
```

## Usage

This template can be used as a starting point for any application that requires user authentication. Simply clone the repository and customize it according to your needs.

## Extending the Template

You can extend this template by:

1. Adding more user profile fields
2. Implementing social login (Google, Facebook, etc.)
3. Adding two-factor authentication
4. Creating more granular role-based permissions
5. Building application-specific features on top of the authentication system

## License

This project is licensed under the ISC License.