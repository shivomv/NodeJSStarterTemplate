const User = require('../models/userModel');
const ErrorHandler = require('../utils/ErrorHandler');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

/**
 * Service layer for user-related operations
 * Separates business logic from controllers for better maintainability and testability
 */

/**
 * Create a new user
 * @param {Object} userData - User data including name, email, password, etc.
 * @returns {Promise<Object>} - Created user object
 */
exports.createUser = async (userData) => {
  // Business logic for user creation
  const user = await User.create({
    name: userData.name,
    email: userData.email,
    password: userData.password,
    role: userData.role || "user",
    avatar: {
      public_id: userData.avatar?.public_id || "default_id",
      url: userData.avatar?.url || "default_url"
    }
  });

  return user;
};

/**
 * Authenticate a user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} - Authenticated user object
 */
exports.authenticateUser = async (email, password) => {
  // Check if email and password are provided
  if (!email || !password) {
    throw new ErrorHandler("Please enter email and password", 400);
  }

  // Find user by email
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ErrorHandler("Invalid email or password", 401);
  }

  // Check if password matches
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    throw new ErrorHandler("Invalid email or password", 401);
  }

  return user;
};

/**
 * Get user profile by ID
 * @param {string} userId - User ID
 * @returns {Promise<Object>} - User object
 */
exports.getUserProfile = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ErrorHandler("User not found", 404);
  }

  return user;
};

/**
 * Get all users (admin only)
 * @returns {Promise<Array>} - Array of user objects
 */
exports.getAllUsers = async () => {
  return await User.find();
};

/**
 * Update user role (admin only)
 * @param {string} userId - User ID
 * @param {Object} userData - Updated user data
 * @returns {Promise<Object>} - Updated user object
 */
exports.updateUserRole = async (userId, userData) => {
  const user = await User.findByIdAndUpdate(
    userId,
    {
      name: userData.name,
      email: userData.email,
      role: userData.role
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false
    }
  );

  if (!user) {
    throw new ErrorHandler("User not found", 404);
  }

  return user;
};

/**
 * Change user password
 * @param {string} userId - User ID
 * @param {string} oldPassword - Current password
 * @param {string} newPassword - New password
 * @returns {Promise<Object>} - Updated user object
 */
exports.changePassword = async (userId, oldPassword, newPassword) => {
  const user = await User.findById(userId).select("+password");

  if (!user) {
    throw new ErrorHandler("User not found", 404);
  }

  const isPasswordMatched = await user.comparePassword(oldPassword);

  if (!isPasswordMatched) {
    throw new ErrorHandler("Old password is incorrect", 400);
  }

  user.password = newPassword;
  await user.save();

  return user;
};

/**
 * Generate password reset token and send email
 * @param {string} email - User email
 * @param {string} resetUrl - Base URL for reset link
 * @returns {Promise<string>} - Success message
 */
exports.forgotPassword = async (email, resetUrl) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new ErrorHandler("User not found with this email", 404);
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // Create reset password url that points to the frontend route
  const resetPasswordUrl = `${resetUrl}/reset-password/${resetToken}`;

  // Create a nicely formatted HTML email with a button
  // Create a nicely formatted HTML email with a decorative card
  const htmlMessage = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      text-align: center;
      background-color: #f5f7fa;
    }
    .container {
      background-color: #ffffff;
      border-radius: 12px;
      padding: 40px 30px;
      border: 1px solid #e0e0e0;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
      position: relative;
      overflow: hidden;
    }
    .container::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 6px;
      background: linear-gradient(90deg, #4f46e5, #7c3aed);
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
      position: relative;
    }
    .logo {
      font-size: 28px;
      font-weight: bold;
      color: #4f46e5;
      margin-bottom: 5px;
      letter-spacing: 0.5px;
    }
    .logo-accent {
      color: #7c3aed;
    }
    .header h2 {
      font-size: 24px;
      color: #1f2937;
      margin: 10px 0;
      font-weight: 600;
    }
    .header::after {
      content: '';
      display: block;
      width: 60px;
      height: 3px;
      background: linear-gradient(90deg, #4f46e5, #7c3aed);
      margin: 15px auto 0;
      border-radius: 3px;
    }
    .button-container {
      text-align: center;
      margin: 35px 0;
    }
    .button {
      display: inline-block;
      background: linear-gradient(90deg, #4f46e5, #7c3aed);
      color: white !important;
      text-decoration: none;
      padding: 14px 32px;
      border-radius: 50px;
      font-weight: bold;
      font-size: 16px;
      letter-spacing: 0.5px;
      box-shadow: 0 4px 10px rgba(79, 70, 229, 0.3);
      transition: transform 0.2s;
    }
    .button:hover {
      transform: translateY(-2px);
    }
    .message-content {
      padding: 0 15px;
      color: #4b5563;
    }
    .message-content p {
      margin: 16px 0;
      line-height: 1.7;
    }
    .security-notice {
      background-color: #f8fafc;
      border-left: 3px solid #4f46e5;
      padding: 12px 15px;
      margin: 25px 0;
      text-align: left;
      border-radius: 0 6px 6px 0;
    }
    .security-notice p {
      margin: 8px 0;
      font-size: 14px;
      color: #64748b;
    }
    .footer {
      margin-top: 35px;
      font-size: 12px;
      color: #94a3b8;
      text-align: center;
      border-top: 1px solid #e2e8f0;
      padding-top: 20px;
    }
    .link-fallback {
      margin-top: 20px;
      font-size: 13px;
      word-break: break-all;
      background-color: #f8fafc;
      padding: 12px;
      border-radius: 6px;
    }
    .link-fallback a {
      color: #4f46e5;
      text-decoration: none;
    }
   
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">User<span class="logo-accent">Auth</span></div>
      <h2>Password Reset Request</h2>
    </div>

    <div class="message-content">
      <p>Hello,</p>

      <p>We received a request to reset your password. Click the button below to create a new password:</p>
    </div>

    <div class="button-container">
      <a href="${resetPasswordUrl}" class="button">Reset Password</a>
    </div>

    <div class="security-notice">
      <p><strong>Security Notice:</strong> This link will expire in 15 minutes for security reasons.</p>
      <p>If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.</p>
    </div>

    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} UserAuth. All rights reserved.</p>
      <p>This is an automated message, please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
  `;

  // Plain text version as fallback
  const message = `
Password Reset Request

Hello,

We received a request to reset your password. Please click the link below to create a new password:

${resetPasswordUrl}

This link will expire in 15 minutes for security reasons.

If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.

© ${new Date().getFullYear()} UserAuth. All rights reserved.
This is an automated message, please do not reply to this email.
  `;

  try {
    // Send email with HTML content and plain text fallback
    await sendEmail(email, "Password Reset", htmlMessage, message);
    return "Email sent successfully";
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    throw new ErrorHandler(error.message, 500);
  }
};

/**
 * Reset password using token
 * @param {string} token - Reset token
 * @param {string} newPassword - New password
 * @returns {Promise<Object>} - Updated user object
 */
exports.resetPassword = async (token, newPassword) => {
  // Hash the token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    throw new ErrorHandler("Reset Password Token is invalid or has expired", 400);
  }

  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  return user;
};
