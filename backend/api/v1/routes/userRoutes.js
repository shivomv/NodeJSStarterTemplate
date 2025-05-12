const express = require("express");
const router = express.Router();

// Import controllers
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  getUserDetailsAdmin,
  getAllUsers,
  updateUserRole,
  changePassword
} = require("../../../controllers/userController");

// Import middleware
const { isAuthenticatedUser, authorizeRoles } = require("../../../middlewares/auth");
const { validate } = require("../../../middlewares/validator");

// Import validation schemas
const {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
  updateUserRoleSchema
} = require("../../../validators/userValidators");

// Public routes
router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);
router.post("/password/forgot", validate(forgotPasswordSchema), forgotPassword);
router.put("/password/reset/:token", validate(resetPasswordSchema), resetPassword);
router.get("/logout", logout);

// Protected routes - require authentication
router.use(isAuthenticatedUser);

// User routes
router.get("/me", getUserDetails);
router.put("/password/change", validate(changePasswordSchema), changePassword);

// Admin routes - require admin role and admin user routes
router.use("/admin", authorizeRoles("admin"));
// Admin user routes
router.get("/admin/users", getAllUsers);
router.route("/admin/user/:id")
  .get(getUserDetailsAdmin)
  .put(validate(updateUserRoleSchema), updateUserRole);

module.exports = router;

