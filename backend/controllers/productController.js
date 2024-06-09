const ErrorHandler = require("../utils/ErrorHandler");
const Product = require("./../models/productModel");

// Create Product   -- Admin
exports.createProduct = async (req, res, next) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json({
            success: true,
            product
        });
    } catch (error) {
        console.error(error);
        next(new ErrorHandler("Server Error", 500));
    }
};

// Get all Products
exports.getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            products
        });
    } catch (error) {
        console.error(error);
        next(new ErrorHandler("Server Error", 500));
    }
};

// Get Product By Id
exports.getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found"
            });
        }
        res.status(200).json({
            product
        });
    } catch (error) {
        console.error(error);
        next(new ErrorHandler());
    }
};

// Update Product -- Admin
exports.updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            useFindAndModify: false
        });

        if (!product) {
            return next(new ErrorHandler("Product Not Found", 404));
        }

        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        console.error(error);
        next(new ErrorHandler());
    }
};

// Delete Product -- Admin
exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Product Deleted"
        });
    } catch (error) {
        console.error(error);
        next(new ErrorHandler());
    }
};
