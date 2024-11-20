const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

// Add item to cart
exports.addToCart = catchAsyncErrors(async (req, res, next) => {
    const { productId, quantity } = req.body;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    // Check if sufficient stock
    if (product.stock < quantity) {
        return next(new ErrorHandler("Insufficient product stock", 400));
    }

    // Find user's cart or create new one
    let cart = await Cart.findOne({ user: req.user._id });
    
    if (!cart) {
        cart = await Cart.create({
            user: req.user._id,
            items: [],
            totalPrice: 0
        });
    }

    // Check if product already in cart
    const existingItem = cart.items.find(item => 
        item.product.toString() === productId
    );

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.items.push({
            product: productId,
            quantity
        });
    }

    // Calculate total price
    cart.totalPrice = cart.items.reduce((total, item) => {
        return total + (product.price * item.quantity);
    }, 0);

    await cart.save();

    res.status(200).json({
        success: true,
        cart
    });
});

// Get cart items
exports.getCartItems = catchAsyncErrors(async (req, res, next) => {
    const cart = await Cart.findOne({ user: req.user._id })
        .populate('items.product', 'name price images');

    if (!cart) {
        return next(new ErrorHandler("Cart not found", 404));
    }

    res.status(200).json({
        success: true,
        cart
    });
});

// Update cart item quantity
exports.updateCartItem = catchAsyncErrors(async (req, res, next) => {
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
        return next(new ErrorHandler("Cart not found", 404));
    }

    const item = cart.items.find(item => 
        item.product.toString() === productId
    );

    if (!item) {
        return next(new ErrorHandler("Item not found in cart", 404));
    }

    // Check product stock
    const product = await Product.findById(productId);
    if (product.stock < quantity) {
        return next(new ErrorHandler("Insufficient product stock", 400));
    }

    item.quantity = quantity;

    // Recalculate total price
    cart.totalPrice = cart.items.reduce((total, item) => {
        return total + (product.price * item.quantity);
    }, 0);

    await cart.save();

    res.status(200).json({
        success: true,
        cart
    });
});

// Remove item from cart
exports.removeFromCart = catchAsyncErrors(async (req, res, next) => {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
        return next(new ErrorHandler("Cart not found", 404));
    }

    cart.items = cart.items.filter(item => 
        item.product.toString() !== productId
    );

    // Recalculate total price
    const product = await Product.findById(productId);
    cart.totalPrice = cart.items.reduce((total, item) => {
        return total + (product.price * item.quantity);
    }, 0);

    await cart.save();

    res.status(200).json({
        success: true,
        message: "Item removed from cart",
        cart
    });
});

// Clear cart
exports.clearCart = catchAsyncErrors(async (req, res, next) => {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
        return next(new ErrorHandler("Cart not found", 404));
    }

    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    res.status(200).json({
        success: true,
        message: "Cart cleared successfully"
    });
});
