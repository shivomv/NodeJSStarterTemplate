const express = require("express");
const router = express.Router();
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../../../middlewares/auth");
const { getLogs } = require("../../../controllers/logController");

// Protect all log routes - require admin role
router.use(isAuthenticatedUser, authorizeRoles("admin"));

/**
 * @route   GET /api/v1/logs
 * @desc    Get consolidated logs from all log files with filtering and pagination
 * @access  Admin
 */
router.get("/", getLogs);

module.exports = router;
