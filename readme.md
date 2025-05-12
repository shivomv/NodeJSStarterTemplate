# NodeJS Starter Template

A comprehensive MERN stack (MongoDB, Express.js, React.js, Node.js) starter template with built-in user authentication, logging system, and Swagger documentation. This template provides a solid foundation for building scalable web applications with a service-based architecture.

## Features

### User Authentication System
- Complete user registration and login flow
- JWT-based authentication with HTTP-only cookies
- Password reset functionality with email verification
- Secure password storage with bcrypt hashing
- Role-based access control (user/admin)

### API Documentation
- Integrated Swagger UI for API documentation
- Accessible to unauthenticated users for viewing
- Authentication required for actual API usage
- Organized by service domains

### Logging System
- Consolidated structured logging approach
- Detailed audit logging for user activities
- Captures old/new values for update and delete operations
- Admin interface for viewing and filtering logs
- Dynamic table structure based on log types

### Architecture
- Service-based approach for better code organization
- Middleware for Swagger documentation
- Separation of concerns with controllers, services, and validators
- Centralized error handling

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
git clone https://github.com/shivomv/NodeJSStarterTemplate.git
cd NodeJSStarterTemplate
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

This NodeJS Starter Template is designed to be a foundation for all future projects, providing essential functionality out of the box:

### What's Already Defined

1. **User Authentication System**
   - Complete registration, login, and password reset flows
   - JWT-based authentication with secure HTTP-only cookies
   - Role-based access control (user/admin)

2. **API Documentation**
   - Swagger UI integration for automatic API documentation
   - Organized by service domains for better navigation
   - Authentication-aware documentation

3. **Logging System**
   - Structured logging with different log types
   - Audit logging for tracking user activities
   - Admin interface for viewing and filtering logs

4. **Project Structure**
   - Service-based architecture for better code organization
   - Clear separation of concerns (controllers, services, validators)
   - Middleware for common functionality

### How to Use This Template

1. **Clone the repository**
   ```bash
   git clone https://github.com/shivomv/NodeJSStarterTemplate.git my-new-project
   cd my-new-project
   ```

2. **Install dependencies and set up your environment**
   - Follow the installation instructions in the Getting Started section
   - Customize the environment variables for your specific project

3. **Start building your application**
   - Add your own models, controllers, and services
   - Extend the existing user system as needed
   - Implement your business logic on top of this foundation

## Extending the Template

You can extend this template by:

1. Adding more user profile fields
2. Implementing social login (Google, Facebook, etc.)
3. Adding two-factor authentication
4. Creating more granular role-based permissions
5. Building application-specific features on top of the authentication system

## License

This project is licensed under the [Creative Commons Attribution 4.0 International License (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/). See the [LICENSE](./LICENSE) file for details.

### You are free to:
- **Share** — copy and redistribute the material in any medium or format
- **Adapt** — remix, transform, and build upon the material for any purpose, even commercially

### Under the following terms:
- **Attribution** — You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.

No additional restrictions — You may not apply legal terms or technological measures that legally restrict others from doing anything the license permits.