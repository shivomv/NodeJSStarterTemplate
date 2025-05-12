const User = require("../models/userModel");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken")
exports.isAuthenticatedUser = catchAsyncErrors(
    async (req, res, next) => {
        const { token } = req.cookies;

        // Check if token exists
        if (!token) {
            return next(new ErrorHandler("Please login to access this resource", 401));
        }

        try {
            // Verify token
            const decodedData = jwt.verify(token, process.env.JWT_SECRET);

            // Find user
            const user = await User.findById(decodedData.id);

            // Check if user exists
            if (!user) {
                return next(new ErrorHandler("User not found. Please login again", 401));
            }

            // Set user in request
            req.user = user;
            next();
        } catch (error) {
            // Handle JWT errors
            if (error.name === "JsonWebTokenError") {
                return next(new ErrorHandler("Invalid token. Please login again", 401));
            }

            if (error.name === "TokenExpiredError") {
                return next(new ErrorHandler("Token expired. Please login again", 401));
            }

            // Handle other errors
            return next(new ErrorHandler("Authentication error. Please login again", 401));
        }
    }
)

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        // Check if user exists and has a role
        if (!req.user || !req.user.role) {
            return next(new ErrorHandler("User role not defined. Please login again", 401));
        }

        // Check if user's role is authorized
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(
                `Access denied. Your role (${req.user.role}) does not have permission to access this resource.`,
                403
            ));
        }

        next();
    }
}
