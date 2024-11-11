const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");

//Register a user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password, role } = req.body;
    const user = await User.create({
        name,
        email,
        password,
        role,
        avatar: {
            public_id: "this is a sample id",
            url: "profile pic url"
        }
    });

    sendToken(user, 201, res)
});

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        return next(new Error("Please enter email and password"));
    }

    // Find user by email
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new Error("Invalid email or password"));
    }

    // Check if password matches
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new Error("Invalid email or password"));
    }
    sendToken(user, 200, res)
});

exports.logout = catchAsyncErrors(
    async (req, res, next) => {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true
        });
        res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    }
)