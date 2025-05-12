const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const {
  createUser,
  authenticateUser,
  forgotPassword,
  resetPassword,
  changePassword,
  getUserProfile,
  getAllUsers,
  updateUserRole,
} = require("../services/userService");
const ErrorHandler = require("../utils/ErrorHandler");
const {
  logCreate,
  logUpdate,
  logDelete,
  logAuth,
} = require("../utils/auditLogger");

/**
 * User Controller
 * Handles HTTP requests and responses for user-related operations
 * Uses the service layer for business logic
 */

// Register a user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const user = await createUser(req.body);

  // Audit log for user registration
  logCreate({
    userId: user._id.toString(),
    userEmail: user.email,
    action: "register",
    entity: "user",
    entityId: user._id.toString(),
    newValues: {
      name: user.name,
      email: user.email,
      role: user.role,
    },
    ipAddress: req.auditContext?.ipAddress,
    userAgent: req.auditContext?.userAgent,
  });

  sendToken(user, 201, res);
});

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await authenticateUser(email, password);

  // Audit log for user login
  logAuth({
    userId: user._id.toString(),
    userEmail: user.email,
    action: "login",
    success: true,
    ipAddress: req.auditContext?.ipAddress,
    userAgent: req.auditContext?.userAgent,
  });

  sendToken(user, 200, res);
});

exports.logout = catchAsyncErrors(async (req, res, next) => {
  // Audit log for user logout
  if (req.user) {
    logAuth({
      userId: req.user.id,
      userEmail: req.user.email,
      action: "logout",
      success: true,
      ipAddress: req.auditContext?.ipAddress,
      userAgent: req.auditContext?.userAgent,
    });
  }

  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

// Forgot password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  // Create base URL without the path
  const resetUrl = `${req.protocol}://${req.get("host")}`;
  const result = await forgotPassword(req.body.email, resetUrl);

  // Audit log for forgot password request
  logAuth({
    userEmail: req.body.email,
    action: "forgot-password",
    success: true,
    ipAddress: req.auditContext?.ipAddress,
    userAgent: req.auditContext?.userAgent,
  });

  res.status(200).json({
    success: true,
    message: result,
  });
});

// Reset password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  const user = await resetPassword(req.params.token, req.body.password);

  // Audit log for password reset
  // Only log if auditContext is available
  if (req.auditContext) {
    logAuth({
      userId: user._id.toString(),
      userEmail: user.email,
      action: "reset-password",
      success: true,
      ipAddress: req.auditContext.ipAddress,
      userAgent: req.auditContext.userAgent,
    });
  } else {
    // Simplified logging when auditContext is not available
    logAuth({
      userId: user._id.toString(),
      userEmail: user.email,
      action: "reset-password",
      success: true,
      ipAddress: req.ip || "unknown",
      userAgent: req.headers?.["user-agent"] || "unknown",
    });
  }

  sendToken(user, 200, res);
});

// Change password
exports.changePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await changePassword(
    req.user.id,
    req.body.oldPassword,
    req.body.newPassword
  );

  // Audit log for password change
  logAuth({
    userId: user._id.toString(),
    userEmail: user.email,
    action: "change-password",
    success: true,
    ipAddress: req.auditContext?.ipAddress,
    userAgent: req.auditContext?.userAgent,
  });

  sendToken(user, 200, res);
});

// Logged in user details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await getUserProfile(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

// Get single user (admin)
exports.getUserDetailsAdmin = catchAsyncErrors(async (req, res, next) => {
  const user = await getUserProfile(req.params.id);
  res.status(200).json({
    success: true,
    user,
  });
});

// Update user role (admin)
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const userData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  // Get the user before update to capture old values
  const oldUser = await getUserProfile(req.params.id);
  const user = await updateUserRole(req.params.id, userData);

  // Audit log for user role update
  logUpdate({
    userId: req.user.id, // Admin who made the change
    userEmail: req.user.email,
    action: "update-user-role",
    entity: "user",
    entityId: req.params.id,
    oldValues: {
      name: oldUser.name,
      email: oldUser.email,
      role: oldUser.role,
    },
    newValues: {
      name: user.name,
      email: user.email,
      role: user.role,
    },
    ipAddress: req.auditContext?.ipAddress,
    userAgent: req.auditContext?.userAgent,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

// Get all users (admin)
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await getAllUsers();

  // Simple log for admin viewing all users
  const logger = require("../utils/logger");
  logger.info(`Admin ${req.user.email} (${req.user.id}) viewed all users list`);

  res.status(200).json({
    success: true,
    users,
  });
});
